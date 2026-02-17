import { useCallback, useRef, useState } from "react";
import { Usb, Zap, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { boards } from "../lib/flashing/manifest";
import {
  isWebSerialSupported,
  requestPort,
  disconnectTransport,
  createTransport,
} from "../lib/flashing/webSerial";
import { flashBoard } from "../lib/flashing/flasher";
import type { FlashSession } from "../lib/flashing/flasher";
import type { BoardProfile, FlashProgress } from "../lib/flashing/types";

const initialProgress: FlashProgress = {
  stage: "idle",
  percentage: 0,
  currentFileIndex: 0,
  totalFiles: 0,
  bytesWritten: 0,
  bytesTotal: 0,
};

export default function ModernFlasher() {
  const supported = isWebSerialSupported();

  const [selectedBoard, setSelectedBoard] = useState<BoardProfile | null>(
    boards[0] || null
  );
  const [port, setPort] = useState<SerialPort | null>(null);
  const [progress, setProgress] = useState<FlashProgress>(initialProgress);
  const [logs, setLogs] = useState<string[]>([]);

  const sessionRef = useRef<FlashSession | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const addLog = useCallback((line: string) => {
    setLogs((prev) => [...prev, line]);
    
    // Only auto-scroll if user hasn't manually scrolled up
    if (autoScroll && logContainerRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        if (logContainerRef.current) {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
      });
    }
  }, [autoScroll]);

  // Detect if user manually scrolled
  const handleLogScroll = useCallback(() => {
    if (!logContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    
    // Re-enable auto-scroll if user scrolls back to bottom
    setAutoScroll(isNearBottom);
  }, []);

  const isBusy = [
    "connecting",
    "preparing",
    "erasing",
    "flashing",
    "verifying",
  ].includes(progress.stage);

  const handleConnect = useCallback(async () => {
    setProgress({ ...initialProgress, stage: "connecting", percentage: 0 });
    setLogs([]);
    addLog("Requesting serial port...");

    const selected = await requestPort();
    if (!selected) {
      addLog("No port selected — cancelled by user.");
      setProgress(initialProgress);
      return;
    }

    setPort(selected);
    addLog("Port selected. Ready to update.");
    setProgress({ ...initialProgress, stage: "connected", percentage: 0 });
  }, [addLog]);

  const handleDisconnect = useCallback(async () => {
    if (sessionRef.current) {
      sessionRef.current.abort();
      sessionRef.current = null;
    }
    if (port) {
      try {
        const transport = createTransport(port);
        await disconnectTransport(transport);
      } catch {
        // port might already be closed
      }
    }
    setPort(null);
    setProgress(initialProgress);
    addLog("Disconnected.");
  }, [port, addLog]);

  const handleFlash = useCallback(async () => {
    if (!port || !selectedBoard) return;

    const session = await flashBoard(port, selectedBoard, addLog, setProgress);
    sessionRef.current = session;
  }, [port, selectedBoard, addLog]);

  const boardOptions = boards.map((b) => ({
    value: b.id,
    label: b.name,
    description: b.description,
  }));

  const getStatusIcon = () => {
    if (progress.stage === "error")
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (progress.stage === "done")
      return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    if (isBusy) return <Loader2 className="h-5 w-5 animate-spin text-orange-500" />;
    return null;
  };

  const getStatusText = () => {
    const stages = {
      idle: "Bereit zum Aktualisieren",
      connecting: "Verbinde mit Gerät...",
      connected: "Verbunden",
      preparing: "Lade Update herunter...",
      erasing: "Bereite Gerät vor...",
      flashing: "Installiere Update...",
      verifying: "Überprüfe...",
      done: "Update abgeschlossen! Drücke RESET auf deinem Gerät zum Starten.",
      error: "Fehler aufgetreten",
    };
    return stages[progress.stage];
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8" translate="no">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Board Selection */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-gray-700 ">
            1. Wähle dein Gerät
          </label>
          <Select
            value={selectedBoard?.id || ""}
            onValueChange={(id) => {
              const board = boards.find((b) => b.id === id);
              if (board) setSelectedBoard(board);
            }}
            options={boardOptions}
            placeholder="Gerät auswählen"
            disabled={isBusy}
          />
        </div>

        {/* Connection & Flash Controls */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-gray-700 ">
            2. Verbinden & Aktualisieren
          </label>
          <div className="flex flex-wrap gap-3">
            {!port ? (
              <Button
                onClick={handleConnect}
                disabled={!supported || isBusy}
                variant="outline"
                size="lg"
              >
                <Usb className="h-5 w-5" />
                {isBusy && progress.stage === "connecting"
                  ? "Verbinde..."
                  : "Gerät verbinden"}
              </Button>
            ) : (
              <Button
                onClick={handleDisconnect}
                disabled={isBusy}
                variant="outline"
                size="lg"
              >
                Trennen
              </Button>
            )}

            <Button
              onClick={handleFlash}
              disabled={!port || !selectedBoard || isBusy || progress.stage === "done"}
              variant="primary"
              size="lg"
            >
              <Zap className="h-5 w-5" />
              {isBusy && progress.stage !== "connecting"
                ? "Aktualisiere..."
                : progress.stage === "done"
                  ? "✓ Aktualisiert"
                  : "Jetzt aktualisieren"}
            </Button>
          </div>
        </div>

        {/* Progress */}
        {(isBusy || progress.stage === "done" || progress.stage === "error") && (
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 ">
                {getStatusIcon()}
                {getStatusText()}
              </div>
              {progress.stage !== "error" && (
                <span className="text-sm font-mono text-gray-500 ">
                  {progress.percentage}%
                </span>
              )}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 ">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  progress.stage === "error"
                    ? "bg-red-500"
                    : progress.stage === "done"
                      ? "bg-emerald-500"
                      : "bg-orange-500"
                }`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            {progress.stage === "flashing" && progress.totalFiles > 0 && (
              <p className="mt-2 text-xs text-gray-500 ">
                Part {progress.currentFileIndex + 1} of {progress.totalFiles}
                {progress.bytesTotal > 0 && (
                  <>
                    {" "}
                    · {Math.round(progress.bytesWritten / 1024)}KB /{" "}
                    {Math.round(progress.bytesTotal / 1024)}KB
                  </>
                )}
              </p>
            )}
            {progress.error && (
              <p className="mt-2 text-sm text-red-600 ">
                {progress.error}
              </p>
            )}
          </div>
        )}

        {/* Console */}
        {logs.length > 0 && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 ">
                Konsole
              </label>
              {!autoScroll && (
                <button
                  onClick={() => {
                    setAutoScroll(true);
                    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-orange-600 hover:text-orange-500 "
                >
                  ↓ Nach unten springen
                </button>
              )}
            </div>
            <div
              ref={logContainerRef}
              onScroll={handleLogScroll}
              className="h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-xs leading-relaxed "
              translate="no"
            >
              {logs.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("ERROR")
                      ? "text-red-600 "
                      : line.startsWith("✓")
                        ? "text-emerald-600 "
                        : "text-gray-700 "
                  }
                >
                  {line}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import type { FlashProgress, FlashStage } from "../lib/flashing/types";

interface Props {
  isWebSerialSupported: boolean;
  isConnected: boolean;
  progress: FlashProgress;
  selectedBoardId: string | null;
  onConnect: () => void;
  onFlash: () => void;
  onDisconnect: () => void;
}

const stageLabels: Record<FlashStage, string> = {
  idle: "Ready",
  connecting: "Connecting...",
  connected: "Connected",
  preparing: "Downloading firmware...",
  erasing: "Erasing flash...",
  flashing: "Writing firmware...",
  verifying: "Verifying...",
  done: "Complete!",
  error: "Error",
};

function isBusy(stage: FlashStage): boolean {
  return ["connecting", "preparing", "erasing", "flashing", "verifying"].includes(stage);
}

export default function FlashControls({
  isWebSerialSupported: supported,
  isConnected,
  progress,
  selectedBoardId,
  onConnect,
  onFlash,
  onDisconnect,
}: Props) {
  const busy = isBusy(progress.stage);
  const done = progress.stage === "done";
  const error = progress.stage === "error";
  const showProgress = busy || done || error;

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-400">
        2. Connect &amp; Install
      </h2>

      {!supported && (
        <div className="mb-4 rounded-lg border border-amber-800/50 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
          <strong>WebSerial not supported.</strong> Please use{" "}
          <span className="font-semibold">Google Chrome</span> or{" "}
          <span className="font-semibold">Microsoft Edge</span> on desktop to
          flash your device.
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {/* Connect / Disconnect */}
        {!isConnected ? (
          <button
            disabled={!supported || busy}
            onClick={onConnect}
            className="rounded-lg bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy && progress.stage === "connecting" ? (
              <span className="flex items-center gap-2">
                <Spinner /> Connecting...
              </span>
            ) : (
              "Connect"
            )}
          </button>
        ) : (
          <button
            disabled={busy}
            onClick={onDisconnect}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Disconnect
          </button>
        )}

        {/* Install Firmware */}
        <button
          disabled={!isConnected || !selectedBoardId || busy || done}
          onClick={onFlash}
          className="rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy && progress.stage !== "connecting" ? (
            <span className="flex items-center gap-2">
              <Spinner /> Installing...
            </span>
          ) : done ? (
            "✓ Installed"
          ) : (
            "Install Firmware"
          )}
        </button>
      </div>

      {/* Progress bar */}
      {showProgress && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span
              className={
                error
                  ? "text-red-400"
                  : done
                    ? "text-emerald-400"
                    : "text-zinc-400"
              }
            >
              {stageLabels[progress.stage]}
            </span>
            {!error && (
              <span className="font-mono text-zinc-500">
                {progress.percentage}%
              </span>
            )}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                error
                  ? "bg-red-500"
                  : done
                    ? "bg-emerald-500"
                    : "bg-orange-500"
              }`}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          {error && progress.error && (
            <p className="mt-2 text-xs text-red-400">{progress.error}</p>
          )}
          {progress.stage === "flashing" && progress.totalFiles > 0 && (
            <p className="mt-1 text-[11px] text-zinc-500">
              Part {progress.currentFileIndex + 1} of {progress.totalFiles}
              {progress.bytesTotal > 0 && (
                <>
                  {" "}
                  &middot;{" "}
                  {Math.round(progress.bytesWritten / 1024)}KB /{" "}
                  {Math.round(progress.bytesTotal / 1024)}KB
                </>
              )}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

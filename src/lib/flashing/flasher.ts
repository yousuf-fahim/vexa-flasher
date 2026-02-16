/**
 * High-level flash orchestration.
 *
 * Ties together: manifest config → binary download → esptool-js write.
 * Swap out the esptool-js calls here if you ever migrate to a different lib.
 */

import { ESPLoader } from "esptool-js";
import type { IEspLoaderTerminal, FlashOptions } from "esptool-js";
import { createTransport, disconnectTransport } from "./webSerial";
import type { BoardProfile, FlashProgress, FlashStage } from "./types";

/** Callback to receive log lines from the flasher. */
export type LogCallback = (line: string) => void;

/** Callback to receive progress updates. */
export type ProgressCallback = (progress: FlashProgress) => void;

function makeProgress(
  stage: FlashStage,
  percentage: number,
  extra?: Partial<FlashProgress>,
): FlashProgress {
  return {
    stage,
    percentage,
    currentFileIndex: 0,
    totalFiles: 0,
    bytesWritten: 0,
    bytesTotal: 0,
    ...extra,
  };
}

/**
 * Download a binary file from a URL and return it as a binary string
 * (what esptool-js expects in FlashOptions.fileArray[].data).
 */
async function fetchBinary(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to download ${url}: ${res.status} ${res.statusText}\n\n` +
      `Make sure firmware files exist in public/firmware/ directory.\n` +
      `See FIRMWARE-SETUP.md for instructions.`
    );
  }
  const blob = await res.blob();
  
  // Validate file size
  if (blob.size === 0) {
    throw new Error(`Downloaded file is empty: ${url}`);
  }
  
  if (blob.size < 100) {
    throw new Error(
      `Downloaded file is suspiciously small (${blob.size} bytes): ${url}\n` +
      `This might be an HTML error page instead of a binary file.`
    );
  }
  
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Failed to read ${url}`));
    reader.readAsBinaryString(blob);
  });
}

export interface FlashSession {
  /** Abort the current flash operation (best-effort). */
  abort: () => void;
}

/**
 * Run the full flash pipeline for a given board profile and serial port.
 *
 * Steps:
 *  1. Create Transport from port
 *  2. Instantiate ESPLoader, connect, detect chip, upload stub
 *  3. Download all binary parts from manifest URLs
 *  4. Write flash with progress reporting
 *  5. Reset the chip
 *  6. Disconnect
 */
export async function flashBoard(
  port: SerialPort,
  board: BoardProfile,
  onLog: LogCallback,
  onProgress: ProgressCallback,
): Promise<FlashSession> {
  let aborted = false;
  const session: FlashSession = {
    abort: () => {
      aborted = true;
    },
  };

  const transport = createTransport(port);

  const terminal: IEspLoaderTerminal = {
    clean: () => {},
    write: (data: string) => onLog(data),
    writeLine: (data: string) => onLog(data),
  };

  try {
    // ── 1. Connect ────────────────────────────────────────────
    onProgress(makeProgress("connecting", 0));
    onLog("Connecting to device...");

    const loader = new ESPLoader({
      transport,
      baudrate: board.baudRate,
      romBaudrate: 115200,
      terminal,
    });

    await loader.main();
    onLog(`Chip detected: ${loader.chip.CHIP_NAME}`);
    onProgress(makeProgress("connected", 5));

    if (aborted) throw new Error("Aborted by user");

    // ── 2. Download firmware binaries ─────────────────────────
    onProgress(makeProgress("preparing", 10));
    onLog(`Downloading ${board.parts.length} firmware file(s)...`);
    onLog("⚠ If download fails, check that firmware files exist in public/firmware/");

    const fileArray: { data: string; address: number }[] = [];

    for (let i = 0; i < board.parts.length; i++) {
      const part = board.parts[i];
      onLog(`  Downloading: ${part.label} from ${part.url}`);
      
      try {
        const data = await fetchBinary(part.url);
        fileArray.push({ data, address: part.offset });
        onLog(`  ✓ ${part.label}: ${data.length} bytes downloaded`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Failed to download ${part.label}:\n${message}`);
      }

      if (aborted) throw new Error("Aborted by user");
    }
    
    onLog(`✓ All ${fileArray.length} firmware files downloaded successfully`);
    onLog(`Total size: ${fileArray.reduce((sum, f) => sum + f.data.length, 0)} bytes`);

    // ── 3. Flash ──────────────────────────────────────────────
    onProgress(
      makeProgress("flashing", 20, {
        totalFiles: fileArray.length,
      }),
    );
    onLog("Writing firmware to flash...");

    const flashOptions: FlashOptions = {
      fileArray,
      flashSize: board.flashSize,
      flashMode: board.flashMode,
      flashFreq: board.flashFreq,
      eraseAll: board.eraseAll,
      compress: true,
      reportProgress: (fileIndex, written, total) => {
        const fileProgress = total > 0 ? written / total : 0;
        const overallBase = 20;
        const overallRange = 75;
        const perFile = overallRange / fileArray.length;
        const overall =
          overallBase + fileIndex * perFile + fileProgress * perFile;

        onProgress(
          makeProgress("flashing", Math.min(Math.round(overall), 95), {
            currentFileIndex: fileIndex,
            totalFiles: fileArray.length,
            bytesWritten: written,
            bytesTotal: total,
          }),
        );
      },
    };

    await loader.writeFlash(flashOptions);

    if (aborted) throw new Error("Aborted by user");

    // ── 4. Done ───────────────────────────────────────────────
    onProgress(makeProgress("done", 100));
    onLog("Flash complete! Resetting device...");

    try {
      await loader.after();
      onLog("Device reset successfully.");
    } catch {
      onLog("Note: Auto-reset not available.");
    }

    onLog("✓ Firmware installed successfully!");
    onLog("");
    onLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    onLog("  NEXT STEP: Press the RESET button on your board");
    onLog("  (or unplug and replug USB) to start the new firmware.");
    onLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    onLog(`ERROR: ${message}`);
    onProgress(
      makeProgress("error", 0, {
        error: message,
      }),
    );
  } finally {
    try {
      await disconnectTransport(transport);
    } catch {
      // ignore cleanup errors
    }
  }

  return session;
}

/**
 * Supported ESP chip families.
 * Add more as needed.
 */
export type ChipFamily =
  | "esp32"
  | "esp32-s2"
  | "esp32-s3"
  | "esp32-c3"
  | "esp32-c6"
  | "esp32-h2"
  | "esp8266";

/**
 * A single binary part to flash at a specific offset.
 */
export interface FlashPart {
  /** Human-readable label, e.g. "Bootloader" or "Firmware" */
  label: string;
  /** Flash offset in bytes (hex-friendly: use 0x1000, 0x10000 etc.) */
  offset: number;
  /**
   * URL to the .bin file.
   * Can be absolute or relative to the site root.
   * TODO: Replace with your actual firmware URLs.
   */
  url: string;
}

/**
 * A board profile that maps a Vexaminer variant to its flash config.
 */
export interface BoardProfile {
  /** Unique identifier, e.g. "vexaminer-esp32" */
  id: string;
  /** Display name shown in the UI */
  name: string;
  /** Short description of this variant */
  description: string;
  /** Target chip family */
  chipFamily: ChipFamily;
  /** Baud rate for flashing (921600 is common for ESP32) */
  baudRate: number;
  /** Flash mode: "dio", "qio", "dout", "qout" */
  flashMode: string;
  /** Flash frequency: "40m", "80m" */
  flashFreq: string;
  /** Flash size: "4MB", "8MB", "16MB", etc. */
  flashSize: string;
  /** Whether to erase entire flash before writing */
  eraseAll: boolean;
  /** Binary parts to flash, in order */
  parts: FlashPart[];
}

/**
 * Overall state of the flash operation.
 */
export type FlashStage =
  | "idle"
  | "connecting"
  | "connected"
  | "preparing"
  | "erasing"
  | "flashing"
  | "verifying"
  | "done"
  | "error";

export interface FlashProgress {
  stage: FlashStage;
  /** 0-100 overall percentage */
  percentage: number;
  /** Current part index being flashed */
  currentFileIndex: number;
  /** Total number of parts */
  totalFiles: number;
  /** Bytes written for current part */
  bytesWritten: number;
  /** Total bytes for current part */
  bytesTotal: number;
  /** Error message if stage === 'error' */
  error?: string;
}

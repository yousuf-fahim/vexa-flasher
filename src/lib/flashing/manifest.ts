import type { BoardProfile } from "./types";

/**
 * ============================================================
 *  VEXAMINER BOARD MANIFEST
 * ============================================================
 *
 *  EASY SETUP: To add a new board, just copy-paste a board object
 *  and update the values. That's it!
 *
 *  Binary files location:
 *    - Place .bin files in: public/firmware/<board-id>/
 *    - URLs will be: /firmware/<board-id>/filename.bin
 *
 *  Example: For "esp32-2432s028r", put files in:
 *    public/firmware/esp32-2432s028r/bootloader.bin
 *    public/firmware/esp32-2432s028r/partitions.bin
 *    etc.
 * ============================================================
 */

export const boards: BoardProfile[] = [
  // ── VexaMiner v2 (Production Board) ────────────
  {
    id: "vexaminer-v2",
    name: "VexaMiner v2",
    description: "Latest VexaMiner board with 2.8\" display",
    chipFamily: "esp32",
    baudRate: 460800,
    flashMode: "dio",
    flashFreq: "40m",
    flashSize: "4MB",
    eraseAll: false,
    parts: [
      {
        label: "Bootloader",
        offset: 0x1000,
        url: "/firmware/vexaminer-v2/bootloader.bin",
      },
      {
        label: "Partition Table",
        offset: 0x8000,
        url: "/firmware/vexaminer-v2/partitions.bin",
      },
      {
        label: "Boot App",
        offset: 0xe000,
        url: "/firmware/vexaminer-v2/boot_app0.bin",
      },
      {
        label: "Firmware",
        offset: 0x10000,
        url: "/firmware/vexaminer-v2/firmware.bin",
      },
    ],
  },

  // ── TO ADD MORE BOARDS: Copy the block above and change values ──
  // Example:
  // {
  //   id: "esp32-new-board",
  //   name: "ESP32 New Board",
  //   description: "Description of the new board",
  //   chipFamily: "esp32",
  //   baudRate: 921600,
  //   flashMode: "dio",
  //   flashFreq: "40m",
  //   flashSize: "4MB",
  //   eraseAll: false,
  //   parts: [
  //     { label: "Bootloader", offset: 0x1000, url: "/firmware/esp32-new-board/bootloader.bin" },
  //     { label: "Partition Table", offset: 0x8000, url: "/firmware/esp32-new-board/partitions.bin" },
  //     { label: "Firmware", offset: 0x10000, url: "/firmware/esp32-new-board/firmware.bin" },
  //   ],
  // },
];

/**
 * Look up a board by its ID.
 */
export function getBoardById(id: string): BoardProfile | undefined {
  return boards.find((b) => b.id === id);
}

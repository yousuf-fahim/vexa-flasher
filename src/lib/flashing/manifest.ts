import type { BoardProfile } from "./types";

/**
 * ============================================================
 *  VEXAMINER DEVICE MANIFEST
 * ============================================================
 *
 *  EASY SETUP: To add a new device, just copy-paste a device object
 *  and update the values. That's it!
 *
 *  Binary files location:
 *    - Place .bin files in: public/firmware/<device-id>/
 *    - URLs will be: /firmware/<device-id>/filename.bin
 *
 *  Example: For "vexaminer-v2", put files in:
 *    public/firmware/vexaminer-v2/bootloader.bin
 *    public/firmware/vexaminer-v2/partitions.bin
 *    etc.
 * ============================================================
 */

export const boards: BoardProfile[] = [
  // ── VexaMiner v2 (Production Board) ────────────
  {
    id: "vexaminer-v2",
    name: "VexaMiner v2",
    description: "Latest VexaMiner with 2.8\" display",
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

  // ── TO ADD MORE DEVICES: Copy the block above and change values ──
  // Example:
  // {
  //   id: "vexaminer-v3",
  //   name: "VexaMiner v3",
  //   description: "Description of the new device",
  //   chipFamily: "esp32",
  //   baudRate: 460800,
  //   flashMode: "dio",
  //   flashFreq: "40m",
  //   flashSize: "4MB",
  //   eraseAll: false,
  //   parts: [
  //     { label: "Bootloader", offset: 0x1000, url: "/firmware/vexaminer-v3/bootloader.bin" },
  //     { label: "Partition Table", offset: 0x8000, url: "/firmware/vexaminer-v3/partitions.bin" },
  //     { label: "Firmware", offset: 0x10000, url: "/firmware/vexaminer-v3/firmware.bin" },
  //   ],
  // },
];

/**
 * Look up a device by its ID.
 */
export function getBoardById(id: string): BoardProfile | undefined {
  return boards.find((b) => b.id === id);
}

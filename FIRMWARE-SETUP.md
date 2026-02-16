# Firmware Setup Guide

## ⚠️ CRITICAL: Must Add Firmware Files Before Flashing!

Your flasher is configured for **VexaMiner v2**. The firmware files are **REQUIRED** before you can flash any boards.

## Step 1: Copy Firmware Files

You need to copy 4 binary files from your `FLASH_PACKAGE` directory:

```powershell
# PowerShell (Windows)
Copy-Item "FLASH_PACKAGE\ESP32-2432S028R_factory\*.bin" -Destination "public\firmware\vexaminer-v2\" -Force
```

Or manually copy these files:
- `bootloader.bin` → `public/firmware/vexaminer-v2/bootloader.bin`
- `partitions.bin` → `public/firmware/vexaminer-v2/partitions.bin`
- `boot_app0.bin` → `public/firmware/vexaminer-v2/boot_app0.bin`
- `firmware.bin` → `public/firmware/vexaminer-v2/firmware.bin`

### Step 2: Verify Files Exist

```powershell
Get-ChildItem "public\firmware\vexaminer-v2\"
```

You should see 4 `.bin` files. If not, the flasher will fail!

### Step 3: Rebuild (Important!)

After adding firmware files, rebuild:

```bash
npm run build
```

Then restart dev server:

```bash
npm run dev
```

### Step 4: Test in Browser

Open `http://localhost:5173` in Chrome/Edge:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to flash
4. Check for 404 errors on firmware files
5. If you see 404s, files are in wrong location

### Step 3: Deploy

```bash
npm run build
vercel  # or push to GitHub for Netlify/Cloudflare Pages
```

---

## Adding More Boards

To add a new board variant:

### 1. Create Firmware Directory

```bash
mkdir public/firmware/your-board-id
```

### 2. Add Firmware Files

Copy your `.bin` files to the new directory.

### 3. Update Manifest

Edit `src/lib/flashing/manifest.ts` and add a new board object:

```ts
{
  id: "your-board-id",
  name: "Your Board Name",
  description: "Short description shown in dropdown",
  chipFamily: "esp32",  // or esp32-s3, esp32-c3, etc.
  baudRate: 921600,
  flashMode: "dio",
  flashFreq: "40m",
  flashSize: "4MB",
  eraseAll: false,
  parts: [
    { label: "Bootloader", offset: 0x1000, url: "/firmware/your-board-id/bootloader.bin" },
    { label: "Partition Table", offset: 0x8000, url: "/firmware/your-board-id/partitions.bin" },
    { label: "Firmware", offset: 0x10000, url: "/firmware/your-board-id/firmware.bin" },
  ],
},
```

That's it! The dropdown will automatically show the new board.

---

## Current Board Configuration

**Board:** ESP32-2432S028R  
**Chip:** ESP32 (WROOM-32)  
**Flash Size:** 4MB  
**Baud Rate:** 921600  

**Flash Layout:**
- 0x1000 — Bootloader
- 0x8000 — Partition Table
- 0xe000 — Boot App
- 0x10000 — Application Firmware

---

## Troubleshooting

### "Failed to download firmware"

Check that `.bin` files exist in `public/firmware/esp32-2432s028r/`:

```bash
ls public/firmware/esp32-2432s028r/
```

You should see 4 files:
- bootloader.bin
- partitions.bin
- boot_app0.bin
- firmware.bin

### "404 Not Found" in console

The firmware URLs in the manifest don't match the actual file locations. Check:
1. File names match exactly (case-sensitive on Linux)
2. Files are in the correct directory
3. Directory name matches the board ID in manifest

### Build includes firmware files

Vite automatically copies everything in `public/` to `dist/` during build. Your firmware files will be included in the production bundle.

---

## Using External CDN

If you prefer to host firmware on a CDN:

1. Upload `.bin` files to your CDN/GitHub Releases
2. Update URLs in `manifest.ts` to absolute URLs:

```ts
parts: [
  { label: "Bootloader", offset: 0x1000, url: "https://cdn.vexa-miner.com/firmware/v1.0/bootloader.bin" },
  // ...
]
```

3. Ensure CORS headers allow your flasher domain

---

## File Size Considerations

Typical firmware sizes:
- Bootloader: ~30KB
- Partition Table: ~3KB
- Boot App: ~8KB
- Firmware: 500KB - 2MB

Total: Usually under 2.5MB per board variant.

If hosting multiple boards, consider using a CDN to reduce your hosting costs.

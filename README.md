# VexaMiner Web Flasher

Browser-based firmware flasher for VexaMiner ESP32 boards using WebSerial.

## Setup

```bash
npm install
npm run dev
```

## Adding Firmware

Place `.bin` files in `public/firmware/vexaminer-v2/`:
- bootloader.bin
- partitions.bin
- boot_app0.bin
- firmware.bin

Edit `src/lib/flashing/manifest.ts` to configure boards.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy

```bash
vercel --prod
```

Or push to GitHub and connect to Vercel/Netlify.

## Browser Support

Chrome/Edge only (WebSerial API required).

## Tech Stack

Vite + React + TypeScript + Tailwind + esptool-js

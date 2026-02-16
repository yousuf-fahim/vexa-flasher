# VexaMiner Web Flasher

A modern, browser-based firmware flasher for VexaMiner ESP32 boards. Uses **WebSerial** and **esptool-js** to flash firmware directly from Chrome/Edge — no desktop tools required.

## Features

- 🎨 Modern UI with light theme (desktop) and dark theme (mobile)
- 📱 Responsive design optimized for all devices
- 🔽 Dropdown board selector (easy to add more boards)
- ⚡ Fast flashing with real-time progress
- 📊 Live console output
- ❓ Built-in FAQ and troubleshooting

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add firmware files (see FIRMWARE-SETUP.md)
# Copy your .bin files to public/firmware/esp32-2432s028r/

# 3. Start dev server
npm run dev
```

Open `http://localhost:5173` in **Chrome** or **Edge**.

## Production Build

```bash
npm run build
npm run preview   # local preview of the built site
```

The output goes to `dist/` — deploy it to any static host.

## Deploy

### Vercel / Netlify

Just connect your repo. Both auto-detect Vite and build from `dist/`.

### GitHub Pages

```bash
npm run build
# push dist/ to gh-pages branch, or use a GitHub Action
```

### Manual / Any Static Host

Upload the contents of `dist/` to your web root.

---

## Configuration

### Board Profiles & Firmware URLs

**All board config lives in a single file:**

```
src/lib/flashing/manifest.ts
```

Each board profile specifies:

| Field         | Description                                      |
|---------------|--------------------------------------------------|
| `id`          | Unique slug (internal use)                       |
| `name`        | Display name in the UI                           |
| `description` | Short blurb on the board card                    |
| `chipFamily`  | `esp32`, `esp32-s3`, `esp32-c3`, `esp8266`, etc. |
| `baudRate`    | Flash baud rate (921600 recommended)             |
| `flashMode`   | `dio`, `qio`, `dout`, `qout`                    |
| `flashFreq`   | `40m`, `80m`                                     |
| `flashSize`   | `4MB`, `8MB`, `16MB`                             |
| `eraseAll`    | `true` to erase entire flash before writing      |
| `parts`       | Array of `{ label, offset, url }` binaries       |

**Example:**

```ts
{
  id: "vexaminer-esp32",
  name: "Vexaminer ESP32",
  description: "Original Vexaminer board",
  chipFamily: "esp32",
  baudRate: 921600,
  flashMode: "dio",
  flashFreq: "80m",
  flashSize: "4MB",
  eraseAll: false,
  parts: [
    { label: "Bootloader",      offset: 0x1000,  url: "/firmware/vexaminer-esp32/bootloader.bin" },
    { label: "Partition Table",  offset: 0x8000,  url: "/firmware/vexaminer-esp32/partition-table.bin" },
    { label: "Firmware",         offset: 0x10000, url: "/firmware/vexaminer-esp32/firmware.bin" },
  ],
}
```

### Firmware Binary Files

Put `.bin` files in `public/firmware/<board-id>/` for relative URLs, or use absolute URLs to a CDN / release server.

### USB VID/PID Filters

Edit `src/lib/flashing/webSerial.ts` — the `requestPort()` function has a TODO where you can add USB vendor/product ID filters to narrow the browser's serial port picker.

### Branding & Colors

- **Logo:** `public/logo.svg` — VexaMiner logo integrated
- **Accent color:** Orange `#f97627` from the logo (Tailwind's `orange-600`)
- **Neutral palette:** `zinc-950` background, `zinc-900` cards
- **Hero background:** Circuit board pattern matching Bitronics aesthetic
- **Site title:** `index.html` `<title>` tag

---

## Project Structure

```
src/
├── main.tsx                    # React bootstrap
├── App.tsx                     # Root component, state management
├── index.css                   # Tailwind entry + color notes
├── vite-env.d.ts               # TypeScript env types
├── components/
│   ├── Header.tsx              # Top bar with VexaMiner logo
│   ├── Hero.tsx                # Hero section with circuit board background
│   ├── BoardSelector.tsx       # Board variant selection cards
│   ├── FlashControls.tsx       # Connect/Install buttons + progress
│   ├── LogConsole.tsx          # Monospaced console output
│   ├── BrowserWarning.tsx      # Full-page unsupported-browser message
│   └── Troubleshooting.tsx     # Collapsible FAQ
└── lib/
    └── flashing/
        ├── types.ts            # TypeScript types (BoardProfile, FlashPart, etc.)
        ├── manifest.ts         # ★ Board config — edit this file ★
        ├── webSerial.ts        # WebSerial port selection wrapper
        └── flasher.ts          # High-level flash orchestration (esptool-js)
```

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4**
- **esptool-js** (Espressif's official JS implementation of esptool)

## Browser Support

| Browser        | Supported |
|----------------|-----------|
| Chrome 89+     | ✅        |
| Edge 89+       | ✅        |
| Firefox        | ❌        |
| Safari         | ❌        |
| Mobile browsers| ❌        |

## License

Private — Vexaminer project.

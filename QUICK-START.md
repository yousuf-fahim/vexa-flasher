# Quick Start Checklist

Get your Vexaminer Web Flasher deployed in 3 steps.

---

## Step 1: Add Your Firmware

### Option A: Host on Same Site (Easiest)

1. Place your `.bin` files here:
   ```
   public/firmware/vexaminer-esp32/bootloader.bin
   public/firmware/vexaminer-esp32/partition-table.bin
   public/firmware/vexaminer-esp32/firmware.bin
   
   public/firmware/vexaminer-s3/bootloader.bin
   public/firmware/vexaminer-s3/partition-table.bin
   public/firmware/vexaminer-s3/firmware.bin
   ```

2. Edit `src/lib/flashing/manifest.ts`:
   ```ts
   // URLs are already set to /firmware/... — just add the files!
   ```

### Option B: Host on CDN

1. Upload `.bin` files to your CDN/GitHub Releases

2. Edit `src/lib/flashing/manifest.ts`:
   ```ts
   parts: [
     { 
       label: "Bootloader", 
       offset: 0x1000, 
       url: "https://releases.vexa-miner.com/v1.0/bootloader.bin" 
     },
     // ... update all URLs
   ]
   ```

---

## Step 2: Test Locally

```bash
# Install dependencies (if not done already)
npm install

# Start dev server
npm run dev

# Open http://localhost:5173 in Chrome/Edge
```

### With Hardware (Recommended)

1. Plug in an ESP32 board
2. Select your board variant
3. Click "Connect" → pick serial port
4. Click "Install Firmware"
5. Verify it completes successfully

### Without Hardware (Limited)

- You can test the UI
- Board selection works
- Connect button opens serial picker (but no devices)
- Can't test actual flashing

---

## Step 3: Deploy

### Vercel (Recommended - 2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. "New site from Git" → select repo
4. Click "Deploy"

### Cloudflare Pages

1. Push code to GitHub
2. Cloudflare Dashboard → Pages → "Create project"
3. Connect repo → Deploy

---

## Optional Tweaks

### Add USB Filters (Recommended)

Edit `src/lib/flashing/webSerial.ts`:

```ts
filters: filters ?? [
  { usbVendorId: 0x1a86, usbProductId: 0x7523 },  // CH340
  { usbVendorId: 0x10c4, usbProductId: 0xea60 },  // CP2102
  { usbVendorId: 0x303a },                         // Espressif USB
],
```

This narrows the serial port picker to only show ESP boards.

### Customize Hero Text

Edit `src/components/Hero.tsx`:

```tsx
<h1>Flash Your Board</h1>
<p>Your custom tagline here...</p>
```

---

## Verify Deployment

After deploying:

- [ ] Visit your URL
- [ ] Check logo displays
- [ ] Check board cards render
- [ ] Click "Connect" → serial picker opens
- [ ] (With hardware) Flash a board end-to-end

---

## Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firmware 404 errors
- Check URLs in `manifest.ts`
- Check files exist in `public/firmware/`
- Check CORS headers if using external CDN

### "Browser not supported"
- Use Chrome or Edge (desktop)
- WebSerial requires HTTPS (except localhost)

---

## Need Help?

- **Setup:** See `README.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Testing:** See `QA-TEST-REPORT.md`
- **Architecture:** See `PROJECT-SUMMARY.md`

---

**That's it!** Your flasher should be live and working.

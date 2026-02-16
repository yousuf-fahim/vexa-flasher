# Deployment Guide - Vexaminer Web Flasher

This guide covers deploying the Vexaminer Web Flasher to various static hosting platforms.

---

## Pre-Deployment Checklist

Before deploying, ensure you've completed:

- [ ] Added real firmware `.bin` files (see [Adding Firmware](#adding-firmware))
- [ ] Updated `src/lib/flashing/manifest.ts` with correct URLs and offsets
- [ ] Tested with physical ESP32 hardware
- [ ] (Optional) Added USB VID/PID filters in `src/lib/flashing/webSerial.ts`
- [ ] Run `npm run build` successfully

---

## Adding Firmware

### Option 1: Host Binaries on the Same Site (Recommended for Small Files)

1. Place your `.bin` files in `public/firmware/`:
   ```
   public/
   └── firmware/
       ├── vexaminer-esp32/
       │   ├── bootloader.bin
       │   ├── partition-table.bin
       │   └── firmware.bin
       └── vexaminer-s3/
           ├── bootloader.bin
           ├── partition-table.bin
           └── firmware.bin
   ```

2. Update `manifest.ts` with relative URLs:
   ```ts
   parts: [
     { label: "Bootloader", offset: 0x1000, url: "/firmware/vexaminer-esp32/bootloader.bin" },
     // ...
   ]
   ```

3. Build — Vite will copy `public/` contents to `dist/`

### Option 2: Host Binaries on a CDN (Recommended for Large Files)

1. Upload `.bin` files to:
   - GitHub Releases
   - AWS S3 + CloudFront
   - Cloudflare R2
   - Any CDN

2. Update `manifest.ts` with absolute URLs:
   ```ts
   parts: [
     { label: "Bootloader", offset: 0x1000, url: "https://releases.vexa-miner.com/v1.0/bootloader.bin" },
     // ...
   ]
   ```

3. **Important:** Ensure CORS headers allow your flasher domain:
   ```
   Access-Control-Allow-Origin: https://flasher.vexa-miner.com
   ```

---

## Deployment Options

### 1. Vercel (Easiest)

**Steps:**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → "New Project"
3. Import your repo
4. Vercel auto-detects Vite — no config needed
5. Click "Deploy"

**Custom Domain:**
- Project Settings → Domains → Add `flasher.vexa-miner.com`
- Update DNS with Vercel's nameservers or CNAME

**Environment:**
- No environment variables needed (pure static site)

**Build Command:** `npm run build` (default)  
**Output Directory:** `dist` (default)

---

### 2. Netlify

**Steps:**

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site"
3. Connect your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy"

**Custom Domain:**
- Site Settings → Domain Management → Add custom domain

**Redirects (optional):**
Create `public/_redirects`:
```
/*    /index.html   200
```
This enables client-side routing (not needed for this app, but good practice).

---

### 3. GitHub Pages

**Steps:**

1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://<username>.github.io/<repo-name>/"
   }
   ```

3. Update `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: "/<repo-name>/",  // e.g., "/vexa-flasher/"
     plugins: [react(), tailwindcss()],
   });
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repo settings:
   - Settings → Pages → Source: `gh-pages` branch

**Custom Domain:**
- Add `CNAME` file to `public/` with your domain
- Update DNS with GitHub's IPs

---

### 4. Cloudflare Pages

**Steps:**

1. Push code to GitHub
2. Go to Cloudflare dashboard → Pages → "Create a project"
3. Connect your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click "Save and Deploy"

**Custom Domain:**
- Project → Custom Domains → Add your domain
- Cloudflare auto-configures DNS if domain is on Cloudflare

**Advantages:**
- Free unlimited bandwidth
- Global CDN
- Built-in analytics

---

### 5. AWS S3 + CloudFront (Advanced)

**Steps:**

1. Build:
   ```bash
   npm run build
   ```

2. Create S3 bucket:
   ```bash
   aws s3 mb s3://flasher.vexa-miner.com
   ```

3. Upload:
   ```bash
   aws s3 sync dist/ s3://flasher.vexa-miner.com --delete
   ```

4. Enable static website hosting in S3 console

5. Create CloudFront distribution pointing to S3 bucket

6. Update DNS to point to CloudFront

**CORS (if hosting binaries on S3):**
Add bucket policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::flasher.vexa-miner.com/*"
    }
  ]
}
```

---

## Post-Deployment

### 1. Test in Production

- [ ] Visit your deployed URL
- [ ] Check browser console for errors
- [ ] Test board selection
- [ ] Test Connect button (should open serial picker)
- [ ] (With hardware) Test full flash flow

### 2. Monitor

**Browser Console Errors:**
- Check for 404s on firmware URLs
- Check for CORS errors (if using CDN)

**Analytics (Optional):**
Add [Plausible](https://plausible.io) or [Fathom](https://usefathom.com):
```html
<!-- In index.html <head> -->
<script defer data-domain="flasher.vexa-miner.com" src="https://plausible.io/js/script.js"></script>
```

### 3. SSL Certificate

All platforms above provide free SSL automatically. Ensure:
- Site loads over HTTPS
- No mixed content warnings
- WebSerial requires HTTPS (except localhost)

---

## Updating Firmware

### If Using Same-Site Hosting (public/firmware/)

1. Replace `.bin` files in `public/firmware/`
2. Rebuild:
   ```bash
   npm run build
   ```
3. Redeploy (push to GitHub, or run deploy command)

### If Using CDN

1. Upload new `.bin` files to CDN
2. Update URLs in `manifest.ts` (if needed)
3. Rebuild and redeploy

**Cache Busting:**
- Add version to filename: `firmware-v1.1.bin`
- Or use query param: `firmware.bin?v=1.1`

---

## Troubleshooting

### "Failed to download firmware"
- Check firmware URLs are correct
- Check CORS headers if using external CDN
- Open browser DevTools → Network tab to see exact error

### "WebSerial not supported"
- User is on Safari/Firefox → show them the warning
- User is on HTTP (not HTTPS) → deploy with SSL

### "Device not detected"
- USB driver issue (Windows) → link to CH340/CP210x drivers
- Wrong USB cable (charge-only) → tell user to try different cable

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Recommended Setup

For vexa-miner.com:

1. **Main site:** `vexa-miner.com` (marketing, docs)
2. **Flasher:** `flasher.vexa-miner.com` (this app)
3. **Firmware CDN:** `releases.vexa-miner.com` or GitHub Releases

**Why separate subdomain for flasher?**
- Keeps main site clean
- Easier to update flasher independently
- Better analytics separation

---

## Security Considerations

### Firmware Integrity

**Problem:** User could MITM firmware downloads and flash malicious code.

**Solutions:**

1. **HTTPS only** (enforced by WebSerial anyway)
2. **Subresource Integrity (SRI)** — not applicable to dynamic fetches
3. **MD5 Checksum Verification:**
   ```ts
   // In manifest.ts
   parts: [
     { 
       label: "Firmware", 
       offset: 0x10000, 
       url: "/firmware/app.bin",
       md5: "a1b2c3d4..." // Add expected MD5
     }
   ]
   ```
   Then verify in `flasher.ts` before writing.

4. **Sign Firmware:** Use ESP32's secure boot (advanced)

### Content Security Policy (Optional)

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  connect-src 'self' https://releases.vexa-miner.com;
">
```

---

## Cost Estimates

| Platform | Free Tier | Bandwidth | Build Minutes |
|----------|-----------|-----------|---------------|
| Vercel | ✅ | 100GB/mo | Unlimited |
| Netlify | ✅ | 100GB/mo | 300 min/mo |
| GitHub Pages | ✅ | 100GB/mo | N/A (local build) |
| Cloudflare Pages | ✅ | Unlimited | 500 builds/mo |

**Recommendation:** Cloudflare Pages (unlimited bandwidth, fast global CDN)

---

## Example: Full Vercel Deployment

```bash
# 1. Ensure code is ready
npm run build

# 2. Install Vercel CLI (optional)
npm i -g vercel

# 3. Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? vexa-flasher
# - Directory? ./
# - Override build command? No
# - Override output directory? No

# 4. Production deployment
vercel --prod

# 5. Add custom domain in Vercel dashboard
```

**Done!** Your flasher is live at `https://vexa-flasher.vercel.app` (or your custom domain).

---

## Need Help?

- **Vite Docs:** https://vite.dev/guide/static-deploy
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **esptool-js Issues:** https://github.com/espressif/esptool-js/issues

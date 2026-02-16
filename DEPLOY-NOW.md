# Deploy to Vercel - Quick Guide

## Option 1: Vercel CLI (Recommended)

Open a **new terminal** (not in Cursor) and run:

```bash
cd "c:\Users\FAHIM\OneDrive\Documents\PROJECTS\vexa-flasher"
vercel
```

**Follow the prompts:**

1. **Set up and deploy?** → Yes
2. **Which scope?** → yousuf-fahims-projects
3. **Link to existing project?** → No
4. **Project name?** → vexa-flasher (or your preferred name)
5. **Directory?** → ./ (press Enter)
6. **Override settings?** → No (press Enter)

**Result:** You'll get a preview URL like `https://vexa-flasher-abc123.vercel.app`

### Deploy to Production

After testing the preview:

```bash
vercel --prod
```

This deploys to your production domain.

---

## Option 2: Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - VexaMiner Web Flasher"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vexa-flasher.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repo
4. Vercel auto-detects Vite settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click "Deploy"

**Done!** Your site will be live in ~2 minutes.

---

## Option 3: Direct Upload (No Git)

If you don't want to use Git:

```bash
vercel --prod
```

Follow the prompts in an interactive terminal (outside Cursor).

---

## After Deployment

### Test Your Live Site

1. Visit your Vercel URL
2. Open DevTools (F12) → Network tab
3. Try flashing a board
4. Check for:
   - ✅ Firmware files load (200 OK)
   - ✅ No 404 errors
   - ✅ WebSerial works
   - ✅ Flash completes successfully

### Add Custom Domain

In Vercel dashboard:
1. Go to your project
2. Settings → Domains
3. Add `flasher.vexa-miner.com`
4. Update DNS:
   - Type: CNAME
   - Name: flasher
   - Value: cname.vercel-dns.com

---

## Troubleshooting

### "Firmware files not found (404)"

Your firmware files need to be in the build output. Check:

```bash
# After building, verify files are in dist/
ls dist/firmware/vexaminer-v2/
```

If missing, ensure files are in `public/firmware/vexaminer-v2/` before building.

### "WebSerial not working on deployed site"

Vercel automatically provides HTTPS, which is required for WebSerial. This should work out of the box.

### "Build fails on Vercel"

Check the build logs. Common issues:
- Missing dependencies (run `npm install` locally first)
- TypeScript errors (run `npm run build` locally to verify)

---

## Current Build Status

✅ **Ready to deploy:**
- TypeScript: No errors
- Build: Success (324KB / 103KB gzipped)
- Firmware directory: Created at `public/firmware/vexaminer-v2/`
- Configuration: Complete

⚠ **Before deploying:**
- Ensure firmware `.bin` files are in `public/firmware/vexaminer-v2/`
- Run `npm run build` to verify they're included in `dist/`

---

## Quick Deploy Commands

```bash
# Preview deployment (test first)
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

## Recommended: GitHub + Vercel Auto-Deploy

This gives you:
- Automatic deployments on every push
- Preview deployments for branches
- Easy rollbacks
- Collaboration

**Setup:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Every push to `main` auto-deploys

---

**Need help?** Open a new terminal (outside Cursor) and run `vercel` - it needs interactive mode for first-time setup.

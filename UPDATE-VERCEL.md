# How to Update Vercel After Changes

## Quick Answer

Just run:

```bash
vercel --prod
```

That's it! Vercel will rebuild and redeploy.

---

## Detailed Guide

### Method 1: Vercel CLI (Fastest)

After making any changes:

```bash
# 1. Build locally to verify (optional but recommended)
npm run build

# 2. Deploy to production
vercel --prod
```

**That's it!** Your site updates in ~2 minutes.

### Method 2: Git Push (Automatic)

If you connected Vercel to GitHub:

```bash
git add .
git commit -m "Update firmware/design/etc"
git push
```

Vercel automatically detects the push and redeploys. No manual commands needed!

---

## Common Update Scenarios

### Updating Firmware Files

```bash
# 1. Replace .bin files in public/firmware/vexaminer-v2/
# 2. Rebuild
npm run build

# 3. Deploy
vercel --prod
```

### Changing Board Config

```bash
# 1. Edit src/lib/flashing/manifest.ts
# 2. Deploy
vercel --prod
```

### Design Changes

```bash
# 1. Edit components
# 2. Test locally: npm run dev
# 3. Deploy
vercel --prod
```

---

## Preview vs Production

### Preview Deployment (Test First)

```bash
vercel
```

- Creates a temporary preview URL
- Test before going live
- URL: `https://vexa-flasher-abc123.vercel.app`

### Production Deployment

```bash
vercel --prod
```

- Updates your main domain
- URL: `https://vexa-flasher.vercel.app` (or your custom domain)

---

## Vercel Dashboard

You can also trigger deployments from https://vercel.com:

1. Go to your project
2. Click "Deployments" tab
3. Click "Redeploy" on any previous deployment
4. Or push to GitHub (if connected)

---

## Rollback

If something breaks:

```bash
# List recent deployments
vercel ls

# Rollback to a previous deployment
vercel rollback <deployment-url>
```

Or use the Vercel dashboard:
1. Go to Deployments
2. Find a working deployment
3. Click "..." → "Promote to Production"

---

## Environment Variables

If you need to add env vars (e.g., for analytics):

```bash
vercel env add VARIABLE_NAME
```

Or in Vercel dashboard:
- Project Settings → Environment Variables

---

## Custom Domain

After deploying, add your custom domain:

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add `flasher.vexa-miner.com`
3. Update DNS:
   - Type: CNAME
   - Name: flasher
   - Value: cname.vercel-dns.com

Updates to custom domains are automatic after initial setup.

---

## Typical Workflow

```bash
# 1. Make changes locally
# Edit files...

# 2. Test locally
npm run dev

# 3. Build to verify
npm run build

# 4. Deploy
vercel --prod

# Done! Site updates in ~2 minutes
```

---

## Troubleshooting

### "Build failed on Vercel"

Check build logs in Vercel dashboard. Common issues:
- Missing dependencies (run `npm install` locally)
- TypeScript errors (run `npm run build` locally first)

### "Changes not showing"

- Clear browser cache (Ctrl+Shift+R)
- Check deployment status in Vercel dashboard
- Verify correct deployment is promoted to production

### "Firmware files missing on deployed site"

Ensure files are in `public/firmware/` **before** running `vercel --prod`.
Vercel copies everything from `public/` to the deployed site.

---

## Quick Reference

| Command | What it does |
|---------|--------------|
| `vercel` | Preview deployment (test URL) |
| `vercel --prod` | Production deployment (main URL) |
| `vercel ls` | List deployments |
| `vercel logs` | View deployment logs |
| `vercel rollback` | Rollback to previous version |

---

**TL;DR:** After any change, just run `vercel --prod` and you're done!

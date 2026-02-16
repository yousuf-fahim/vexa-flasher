# Fixes Applied - VexaMiner Web Flasher

## Issues Addressed

### 1. ✅ Light Mode Enabled
**Issue:** Dark theme on desktop wasn't ideal  
**Fix:** Changed to light mode for all devices  
**File:** `src/index.css`

```css
/* Before: Mobile dark, desktop light */
/* After: Light mode everywhere */
:root {
  color-scheme: light;
}
```

### 2. ✅ Logo Size Increased
**Issue:** Logo looked smaller than nav buttons  
**Fix:** Increased from `h-8/h-10` to `h-10/h-12`  
**File:** `src/components/Navigation.tsx`

```tsx
// Before: h-8 sm:h-10
// After:  h-10 sm:h-12
<img src="/logo.svg" alt="VexaMiner" className="h-10 w-auto sm:h-12" />
```

### 3. ✅ Board Name Changed
**Issue:** "ESP32-2432S028R" exposes exact model  
**Fix:** Changed to "VexaMiner v2"  
**File:** `src/lib/flashing/manifest.ts`

```ts
// Before:
id: "esp32-2432s028r",
name: "ESP32-2432S028R",
description: "2.8\" TFT Display Board with Touch (Factory Version)",

// After:
id: "vexaminer-v2",
name: "VexaMiner v2",
description: "Latest VexaMiner board with 2.8\" display",
```

**Firmware directory renamed:**
- Old: `public/firmware/esp32-2432s028r/`
- New: `public/firmware/vexaminer-v2/`

### 4. ⚠️ CRITICAL: Firmware Files Missing
**Issue:** Board not responding after flash  
**Root Cause:** No firmware files in directory — flasher downloaded 404 pages instead of binaries  
**Why it said "success":** Error handling didn't catch download failures properly

**Fixes Applied:**

#### A. Better Error Handling
**File:** `src/lib/flashing/flasher.ts`

Added validation:
- Check HTTP status (404 = clear error)
- Validate file size (0 bytes = empty file)
- Detect HTML error pages (< 100 bytes = suspicious)
- Show clear error messages with instructions

```ts
// Now throws clear errors:
"Failed to download /firmware/vexaminer-v2/bootloader.bin: 404 Not Found

Make sure firmware files exist in public/firmware/ directory.
See FIRMWARE-SETUP.md for instructions."
```

#### B. Better Logging
Added progress messages:
- "⚠ If download fails, check that firmware files exist"
- Shows URL being downloaded
- Shows file size after download
- Shows total size of all files

#### C. Documentation Updated
- `CRITICAL-FIRMWARE-ISSUE.md` — Explains what happened
- `FIRMWARE-SETUP.md` — Updated with new paths
- `public/firmware/vexaminer-v2/README.md` — Quick reference

---

## How to Fix Your Board

### Option 1: Reflash with Correct Firmware

**Step 1: Copy firmware files**
```powershell
Copy-Item "FLASH_PACKAGE\ESP32-2432S028R_factory\*.bin" -Destination "public\firmware\vexaminer-v2\" -Force
```

**Step 2: Verify files**
```powershell
Get-ChildItem "public\firmware\vexaminer-v2\*.bin"
```
Should show 4 files:
- bootloader.bin
- partitions.bin
- boot_app0.bin
- firmware.bin

**Step 3: Rebuild**
```bash
npm run build
```

**Step 4: Restart dev server**
```bash
# Stop with Ctrl+C, then:
npm run dev
```

**Step 5: Test in browser**
1. Open `http://localhost:5173`
2. Open DevTools (F12) → Network tab
3. Try flashing
4. Check for 404 errors
5. Should see firmware files loading (200 OK)

**Step 6: Flash board**
- Hold BOOT button
- Connect USB
- Click "Connect Device"
- Click "Install Firmware"
- Release BOOT when you see "Connecting..."
- Wait for completion

### Option 2: Use Desktop Flasher (If Board is Bricked)

If the board is completely unresponsive:

```powershell
cd FLASH_PACKAGE\ESP32-2432S028R_factory
.\flash_ESP32-2432S028R_factory.bat
```

This will restore factory firmware.

---

## What Changed in Code

### manifest.ts
```diff
- id: "esp32-2432s028r",
- name: "ESP32-2432S028R",
+ id: "vexaminer-v2",
+ name: "VexaMiner v2",

- url: "/firmware/esp32-2432s028r/bootloader.bin",
+ url: "/firmware/vexaminer-v2/bootloader.bin",
```

### flasher.ts
```diff
+ // Validate HTTP response
+ if (!res.ok) {
+   throw new Error(
+     `Failed to download ${url}: ${res.status} ${res.statusText}\n\n` +
+     `Make sure firmware files exist in public/firmware/ directory.\n` +
+     `See FIRMWARE-SETUP.md for instructions.`
+   );
+ }

+ // Validate file size
+ if (blob.size === 0) {
+   throw new Error(`Downloaded file is empty: ${url}`);
+ }

+ if (blob.size < 100) {
+   throw new Error(
+     `Downloaded file is suspiciously small (${blob.size} bytes): ${url}\n` +
+     `This might be an HTML error page instead of a binary file.`
+   );
+ }
```

### Navigation.tsx
```diff
- className="h-8 w-auto sm:h-10"
+ className="h-10 w-auto sm:h-12"
```

### index.css
```diff
- /* Mobile-first: dark theme */
- @media (max-width: 768px) {
-   :root {
-     color-scheme: dark;
-   }
- }
- 
- /* Desktop: light theme */
- @media (min-width: 769px) {
-   :root {
-     color-scheme: light;
-   }
- }

+ :root {
+   color-scheme: light;
+ }
```

---

## Testing Checklist

Before flashing again:

- [ ] Firmware files exist in `public/firmware/vexaminer-v2/`
- [ ] 4 files present: bootloader, partitions, boot_app0, firmware
- [ ] Rebuilt with `npm run build`
- [ ] Dev server restarted
- [ ] Browser DevTools open (F12 → Network tab)
- [ ] No 404 errors when clicking "Install Firmware"
- [ ] Files show as downloaded (200 OK) in Network tab
- [ ] Console shows file sizes (not 0 bytes)

---

## Build Status

✅ **TypeScript:** No errors  
✅ **Build:** Success (325KB / 103KB gzipped)  
✅ **Changes Applied:**
- Light mode enabled
- Logo size increased
- Board name changed to "VexaMiner v2"
- Error handling improved
- Documentation updated

---

## Summary

**What was wrong:**
- Firmware files missing → board flashed with nothing/corrupted data
- Error handling didn't catch 404s properly
- Said "success" even though download failed

**What's fixed:**
- Better error messages
- File validation (size, HTTP status)
- Clear instructions in errors
- Documentation updated
- Light mode enabled
- Logo bigger
- Board name hidden

**What you need to do:**
1. Copy firmware files to `public/firmware/vexaminer-v2/`
2. Rebuild and restart dev server
3. Reflash your board (hold BOOT button)

**If board is bricked:**
- Use desktop flasher: `FLASH_PACKAGE\ESP32-2432S028R_factory\flash_ESP32-2432S028R_factory.bat`

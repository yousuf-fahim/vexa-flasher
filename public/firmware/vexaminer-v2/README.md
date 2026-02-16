# VexaMiner v2 Firmware

## ⚠️ REQUIRED FILES

Place these 4 firmware files here:

- `bootloader.bin` (offset 0x1000)
- `partitions.bin` (offset 0x8000)
- `boot_app0.bin` (offset 0xe000)
- `firmware.bin` (offset 0x10000)

## Quick Copy

```powershell
# From project root:
Copy-Item "FLASH_PACKAGE\ESP32-2432S028R_factory\*.bin" -Destination "public\firmware\vexaminer-v2\" -Force
```

## Verify

```powershell
Get-ChildItem "public\firmware\vexaminer-v2\*.bin"
```

You should see 4 files. If not, flashing will fail!

## After Adding Files

1. Rebuild: `npm run build`
2. Restart dev server: `npm run dev`
3. Test in browser with DevTools open (F12 → Network tab)
4. Check for 404 errors on firmware files

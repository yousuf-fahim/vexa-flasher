@echo off
setlocal enabledelayedexpansion
echo ================================================
echo    Flash VexaMiner to ESP32-2432S028 (2USB)
echo    (2.8" Display - 2USB Variant)
echo ================================================
echo.

cd /d "%~dp0"

:: Check if factory.bin exists in firmware\dev folder
if not exist "firmware\dev\ESP32_2432S028_2USB_factory.bin" (
    echo Factory firmware not found. Building...
    echo.
    C:\Users\FAHIM\.platformio\penv\Scripts\platformio.exe run -e ESP32_2432S028_2USB
    if errorlevel 1 (
        echo.
        echo [ERROR] Build failed! Check errors above.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Build successful!
) else (
    echo [OK] Found pre-built firmware: firmware\dev\ESP32_2432S028_2USB_factory.bin
)

echo.
echo ================================================
echo    Detecting COM Port...
echo ================================================
echo.

:: Auto-detect CH340 COM port
set "COMPORT="
for /f "tokens=1,2 delims==" %%a in ('wmic path Win32_PnPEntity where "Caption like '%%CH340%%'" get Caption /value 2^>nul ^| find "COM"') do (
    for %%p in (%%b) do (
        set "line=%%p"
        for /f "tokens=2 delims=()" %%c in ("!line!") do set "COMPORT=%%c"
    )
)

if not defined COMPORT (
    echo Could not auto-detect COM port.
    set /p COMPORT="Enter COM port (e.g., COM6): "
) else (
    echo Detected: !COMPORT!
)

echo.
echo ================================================
echo    Entering Boot Mode
echo ================================================
echo.
echo IMPORTANT - Follow these steps exactly:
echo.
echo   1. Unplug USB cable
echo   2. Hold the BOOT button
echo   3. While holding BOOT, plug in USB cable
echo   4. Wait 2 seconds, then release BOOT
echo   5. Press any key below to flash
echo.
pause

echo.
echo [Flashing to !COMPORT!] Please wait...
echo.

:: Use factory.bin for simple single-file flash at address 0x0
python C:\Users\FAHIM\.platformio\packages\tool-esptoolpy\esptool.py --chip esp32 --port !COMPORT! --baud 460800 --before default_reset --after hard_reset write_flash -z 0x0 firmware\dev\ESP32_2432S028_2USB_factory.bin

if errorlevel 1 (
    echo.
    echo [WARN] Flash failed at high speed. Retrying at lower baud rate...
    python C:\Users\FAHIM\.platformio\packages\tool-esptoolpy\esptool.py --chip esp32 --port !COMPORT! --baud 115200 write_flash -z 0x0 firmware\dev\ESP32_2432S028_2USB_factory.bin
    
    if errorlevel 1 (
        echo.
        echo [ERROR] Flash failed!
        echo    Try: Unplug, hold BOOT, plug in, release BOOT, then run again
        pause
        exit /b 1
    )
)

echo.
echo ================================================
echo    [SUCCESS] DONE! Your VexaMiner is ready!
echo ================================================
echo.
echo Board: ESP32_2432S028_2USB (NM Miner - 2USB Variant)
echo Note: This board has inverted colors by default.
echo.
echo The device will restart automatically.
echo Connect to "VexaMinerAP" WiFi to configure.
echo.
pause

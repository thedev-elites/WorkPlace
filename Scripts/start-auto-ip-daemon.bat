@echo off
title MongoDB IP Update Daemon
echo Starting MongoDB IP Update Daemon...
echo This window will minimize but the service will continue running in the background.
echo.
echo The service will automatically check if your IP has changed every 15 minutes.
echo If a change is detected, it will open MongoDB Atlas in your browser.
echo.
echo To stop the service, close this window.
echo.
timeout /t 5

:: Run the Node.js daemon script
start /min cmd /c "node "%~dp0auto-ip-daemon.js" & pause"

:: Exit this window
exit 
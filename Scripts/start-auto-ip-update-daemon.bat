@echo off
title MongoDB Atlas IP Whitelist Auto-Updater
echo Starting MongoDB Atlas IP Whitelist Auto-Updater...
echo This window will remain open and automatically update your IP in MongoDB Atlas.
echo Please do not close this window while you want to keep your IP updated.
echo.
echo Press Ctrl+C to stop the daemon if needed.
echo.

node "%~dp0auto-ip-update-daemon.js"

echo.
echo Daemon has stopped. Press any key to exit.
pause > nul 
@echo off
title Automated Development Environment Starter
echo.
echo ======================================================
echo         Automated Development Environment
echo ======================================================
echo.
echo This will start:
echo  1. MongoDB Atlas IP Whitelist Updater
echo  2. Backend Server
echo  3. Frontend Development Server
echo.
echo All services will run in separate windows.
echo.
echo Starting services automatically...

echo.
echo Starting MongoDB Atlas IP Whitelist Updater...
start "MongoDB Atlas IP Updater" cmd /k "cd %~dp0.. && npm run auto-update-ip"

echo Starting Backend Server...
timeout /t 3 > nul
start "Backend Server" cmd /k "cd %~dp0.. && npm run backend"

echo Starting Frontend Server...
timeout /t 3 > nul
start "Frontend Server" cmd /k "cd %~dp0.. && npm run frontend"

echo.
echo All services have been started!
echo You can close this window now.
echo.
echo (To stop all services, close their respective windows)
echo. 
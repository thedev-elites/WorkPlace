@echo off
echo Fetching your current IP address...
powershell -command "Invoke-RestMethod -Uri 'https://api.ipify.org?format=json' | Select-Object -ExpandProperty ip | Set-Clipboard; Invoke-RestMethod -Uri 'https://api.ipify.org?format=json' | Select-Object -ExpandProperty ip"
echo.
echo Your IP address has been copied to the clipboard for easy pasting.
echo.
echo To whitelist this IP in MongoDB Atlas:
echo 1. Go to: https://cloud.mongodb.com/
echo 2. Click "Network Access" in the left sidebar
echo 3. Click "+ ADD IP ADDRESS"
echo 4. Paste your IP address or click "ADD CURRENT IP ADDRESS"
echo 5. Click "Confirm"
echo.
pause 
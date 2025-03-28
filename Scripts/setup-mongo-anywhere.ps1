# Script to open MongoDB Atlas and help set up "Allow connections from anywhere" for development
$projectId = $null

# Read the project ID from .env file
$envPath = Join-Path -Path (Split-Path -Parent $PSScriptRoot) -ChildPath "backend\.env"
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        if ($_ -match "MONGODB_PROJECT_ID=(.+)") {
            $projectId = $matches[1]
        }
    }
}

# Construct the Atlas URL
$atlasUrl = if ($projectId) {
    "https://cloud.mongodb.com/v2/$projectId#/security/network/accessList"
} else {
    "https://cloud.mongodb.com"
}

# Notify the user
Write-Host "`nThis script will help you set up MongoDB Atlas to allow connections from anywhere.`n" -ForegroundColor Cyan
Write-Host "This is recommended for development environments only!`n" -ForegroundColor Yellow
Write-Host "Steps:" -ForegroundColor White
Write-Host "1. The MongoDB Atlas dashboard will open in your browser" -ForegroundColor White
Write-Host "2. If prompted, log in to your MongoDB Atlas account" -ForegroundColor White
Write-Host "3. Click '+ ADD IP ADDRESS'" -ForegroundColor White
Write-Host "4. Click 'ALLOW ACCESS FROM ANYWHERE'" -ForegroundColor White
Write-Host "5. Click 'Confirm'" -ForegroundColor White
Write-Host "`nAfter completing these steps, you will no longer need to update your IP address.`n" -ForegroundColor Green

# Confirm with the user
$confirm = Read-Host "Do you want to open MongoDB Atlas now? (y/n)"

if ($confirm -eq "y" -or $confirm -eq "Y") {
    # Open Atlas in the default browser
    Start-Process $atlasUrl
    
    Write-Host "`nMongoDB Atlas has been opened in your browser.`n" -ForegroundColor Green
    Write-Host "Once you've allowed access from anywhere, your application will be able to connect from any IP address." -ForegroundColor Green
} else {
    Write-Host "`nOperation cancelled. You can run this script again later if needed.`n" -ForegroundColor Yellow
}

pause 
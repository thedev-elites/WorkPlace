const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

// Configuration
const CHECK_INTERVAL = 15 * 60 * 1000; // Check every 15 minutes
const IP_CACHE_FILE = path.join(__dirname, '.last_ip_address');
const LOG_FILE = path.join(__dirname, 'ip-daemon.log');

// Log function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  
  // Log to console
  console.log(message);
  
  // Append to log file
  fs.appendFileSync(LOG_FILE, logMessage);
}

// Get current IP address
async function getCurrentIP() {
  try {
    const services = [
      'https://api.ipify.org?format=json',
      'https://api.my-ip.io/ip.json',
      'https://api64.ipify.org?format=json'
    ];
    
    for (const service of services) {
      try {
        const response = await axios.get(service, { timeout: 5000 });
        if (response.data && response.data.ip) {
          return response.data.ip;
        }
      } catch (err) {
        log(`Service ${service} failed: ${err.message}`);
      }
    }
    
    throw new Error('All IP detection services failed');
  } catch (error) {
    log(`Error getting current IP: ${error.message}`);
    return null;
  }
}

// Check if IP has changed since last check
async function checkIPChange() {
  const currentIP = await getCurrentIP();
  
  if (!currentIP) {
    log('Could not determine current IP address.');
    return;
  }
  
  log(`Current IP: ${currentIP}`);
  
  // Check if cached IP exists
  let cachedIP = null;
  try {
    if (fs.existsSync(IP_CACHE_FILE)) {
      cachedIP = fs.readFileSync(IP_CACHE_FILE, 'utf8').trim();
      log(`Last known IP: ${cachedIP}`);
    }
  } catch (error) {
    log(`Error reading cached IP: ${error.message}`);
  }
  
  // If IP has changed or no cached IP exists
  if (currentIP !== cachedIP) {
    log('IP has changed. Updating MongoDB Atlas whitelist...');
    
    // Open the MongoDB Atlas whitelist page in browser
    const atlasURL = 'https://cloud.mongodb.com/v2/' + 
      (process.env.MONGODB_PROJECT_ID || '') + 
      '#/security/network/accessList';
    
    try {
      // For Windows
      exec(`start "" "${atlasURL}"`, (error) => {
        if (error) {
          log(`Error opening browser: ${error.message}`);
        } else {
          log('Opened MongoDB Atlas in browser');
        }
      });
      
      // After opening browser, show notification
      const notifyCommand = `
        powershell -Command "Add-Type -AssemblyName System.Windows.Forms; 
        [System.Windows.Forms.MessageBox]::Show('Your IP address has changed to ${currentIP}. Atlas dashboard has been opened to update the whitelist.', 
        'MongoDB IP Whitelist Update Required', 
        [System.Windows.Forms.MessageBoxButtons]::OK, 
        [System.Windows.Forms.MessageBoxIcon]::Warning);"
      `;
      
      exec(notifyCommand, (error) => {
        if (error) {
          log(`Error showing notification: ${error.message}`);
        }
      });
      
      // Save the new IP to cache
      fs.writeFileSync(IP_CACHE_FILE, currentIP);
    } catch (error) {
      log(`Error in browser automation: ${error.message}`);
    }
  } else {
    log('IP has not changed. No action needed.');
  }
}

// Main function to start the daemon
async function startDaemon() {
  log('Starting MongoDB Atlas IP whitelist daemon...');
  
  // Run first check immediately
  await checkIPChange();
  
  // Then set up interval for regular checks
  setInterval(checkIPChange, CHECK_INTERVAL);
  
  log(`Daemon running. Will check IP every ${CHECK_INTERVAL / 60000} minutes.`);
}

// Run the daemon
startDaemon(); 
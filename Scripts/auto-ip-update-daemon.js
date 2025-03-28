const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

// Configuration
const MONGODB_PUBLIC_KEY = process.env.MONGODB_PUBLIC_KEY;
const MONGODB_PRIVATE_KEY = process.env.MONGODB_PRIVATE_KEY;
const MONGODB_PROJECT_ID = process.env.MONGODB_PROJECT_ID;
const IP_CACHE_FILE = path.join(__dirname, '.last_ip_address');
const LOG_FILE = path.join(__dirname, 'ip-daemon.log');

// Check interval - 15 minutes by default
const CHECK_INTERVAL = 15 * 60 * 1000;

// MongoDB Atlas API endpoint
const API_ENDPOINT = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${MONGODB_PROJECT_ID}/accessList`;

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
        if (response.data && (response.data.ip || response.data.success)) {
          return response.data.ip || response.data;
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

// Get all current whitelisted IPs
async function getWhitelistedIPs() {
  try {
    const response = await axios.get(API_ENDPOINT, {
      auth: {
        username: MONGODB_PUBLIC_KEY,
        password: MONGODB_PRIVATE_KEY
      }
    });
    
    return response.data.results;
  } catch (error) {
    log(`Error fetching whitelisted IPs: ${error.response?.data?.detail || error.message}`);
    return [];
  }
}

// Add IP to MongoDB Atlas whitelist
async function addIPToWhitelist(ip, comment = 'Added automatically by IP updater daemon') {
  try {
    // Format IP for API - MongoDB requires CIDR notation
    const formattedIP = ip.includes('/') ? ip : `${ip}/32`;
    
    const response = await axios.post(API_ENDPOINT, 
      [{ 
        ipAddress: formattedIP, 
        comment: comment 
      }],
      {
        auth: {
          username: MONGODB_PUBLIC_KEY,
          password: MONGODB_PRIVATE_KEY
        }
      }
    );
    
    log(`Successfully added IP ${formattedIP} to whitelist`);
    return true;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      log(`IP ${ip} is already in the whitelist`);
      return true;
    }
    
    log(`Error adding IP to whitelist: ${error.response?.data?.detail || error.message}`);
    return false;
  }
}

// Check for IP changes and update MongoDB Atlas
async function checkAndUpdateIP() {
  log('Checking for IP changes...');
  
  // Check if credentials are available
  if (!MONGODB_PUBLIC_KEY || !MONGODB_PRIVATE_KEY || !MONGODB_PROJECT_ID) {
    log('ERROR: MongoDB Atlas API credentials missing. Please check your .env file.');
    log('Required variables: MONGODB_PUBLIC_KEY, MONGODB_PRIVATE_KEY, MONGODB_PROJECT_ID');
    return;
  }
  
  // Get current IP
  const currentIP = await getCurrentIP();
  if (!currentIP) {
    log('Could not determine current IP address. Will try again later.');
    return;
  }
  
  log(`Current IP address: ${currentIP}`);
  
  // Get cached IP if exists
  let cachedIP = null;
  try {
    if (fs.existsSync(IP_CACHE_FILE)) {
      cachedIP = fs.readFileSync(IP_CACHE_FILE, 'utf8').trim();
      log(`Last known IP: ${cachedIP}`);
    }
  } catch (error) {
    log(`Error reading cached IP: ${error.message}`);
  }
  
  // If IP has not changed, no need to update
  if (currentIP === cachedIP) {
    log('IP has not changed. No action needed.');
    return;
  }
  
  // IP has changed or no cached IP, update whitelist
  log('IP has changed or not previously recorded. Updating MongoDB Atlas whitelist...');
  
  // Add the IP to whitelist
  const success = await addIPToWhitelist(currentIP);
  
  if (success) {
    // Update cached IP
    fs.writeFileSync(IP_CACHE_FILE, currentIP);
    log('IP update process completed successfully.');
    
    // Get updated whitelist
    const whitelistedIPs = await getWhitelistedIPs();
    log(`Current MongoDB Atlas whitelist has ${whitelistedIPs.length} entries.`);
  } else {
    log('Failed to update IP in MongoDB Atlas whitelist. Will try again later.');
  }
}

// Main function - Start the daemon
async function startDaemon() {
  log('Starting MongoDB Atlas IP Whitelist Auto-Update Daemon...');
  
  // Run first check immediately
  await checkAndUpdateIP();
  
  // Set interval for subsequent checks
  setInterval(checkAndUpdateIP, CHECK_INTERVAL);
  
  log(`Daemon running. Will check IP every ${CHECK_INTERVAL / 60000} minutes.`);
}

// Start the daemon
startDaemon(); 
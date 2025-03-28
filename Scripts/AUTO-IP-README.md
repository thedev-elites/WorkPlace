# MongoDB Atlas IP Whitelist Automation

This guide explains how to set up automatic IP whitelist management for MongoDB Atlas so that you don't have to manually update your IP address.

## Option 1: Allow Access from Anywhere (Recommended for Development)

The simplest solution for development environments is to allow MongoDB Atlas to accept connections from any IP address.

1. Run this command from the project root:
   ```
   npm run allow-all-ips
   ```

2. Follow the on-screen instructions to set up MongoDB Atlas to allow connections from anywhere (`0.0.0.0/0`).

**Pros:**
- Completely eliminates IP whitelist issues
- No setup required
- Works regardless of network changes

**Cons:**
- Less secure (not recommended for production databases)

## Option 2: Automatic IP Monitoring Daemon

This solution runs a background service that monitors your IP address and automatically opens the MongoDB Atlas dashboard when your IP changes.

1. Run this command to start the monitoring daemon:
   ```
   npm run start-ip-daemon
   ```

2. The daemon will minimize to your taskbar and run in the background.

3. When your IP changes, it will automatically:
   - Open the MongoDB Atlas dashboard in your browser
   - Display a notification with your new IP address
   - Prompt you to click the "Add Current IP Address" button

**Pros:**
- Semi-automatic IP address management
- More secure than allowing all IPs
- Logs IP address changes

**Cons:**
- Still requires clicking the "Add Current IP Address" button in the browser
- Requires the daemon to be running

## Option 3: Automatic Startup on Windows Login

You can configure the IP monitoring daemon to start automatically when you log in to Windows.

1. Run this command to create a startup shortcut:
   ```
   npm run setup-startup
   ```

2. A shortcut will be created in your Windows Startup folder.

3. The monitoring daemon will now start automatically when you log in to Windows.

**Pros:**
- No need to manually start the daemon
- Ensures IP monitoring is always active
- One-time setup

**Cons:**
- Same limitations as Option 2
- Only works on Windows

## Manual IP Checking

If you prefer to manually check your IP address when needed:

1. Run this command:
   ```
   npm run check-ip
   ```

2. Your current IP address will be displayed and copied to your clipboard.

3. Follow the on-screen instructions to update your MongoDB Atlas whitelist.

## Troubleshooting

If you still have problems connecting to MongoDB Atlas:

1. Ensure you've properly set up your MongoDB Atlas IP whitelist
2. Check the IP daemon logs in `scripts/ip-daemon.log`
3. Make sure your MongoDB URI in the `.env` file is correct
4. Check if your MongoDB Atlas cluster is running properly
5. Verify your network connection

For persistent issues, consider using the "Allow Access from Anywhere" option for development. 
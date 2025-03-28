# MongoDB Atlas IP Address Updater

This tool automatically manages your IP addresses in MongoDB Atlas's IP whitelist. It ensures that when your IP address changes, your MongoDB Atlas whitelist is updated so your application continues to have access to your databases.

## Features

- **Automatic IP Detection**: Detects your current public IP address using multiple reliable services
- **API-based Updates**: Uses MongoDB Atlas API to add your IP to the whitelist
- **Daemon Mode**: Can run in the background to monitor for IP changes
- **Manual Update**: Can be run on-demand to update your IP
- **IP Change Tracking**: Keeps track of your last known IP to avoid unnecessary updates

## Prerequisites

1. MongoDB Atlas account with API access enabled
2. Project with appropriate permissions
3. API Public and Private keys

## Setup

1. Make sure your MongoDB Atlas API credentials are set in the `backend/.env` file:

```
MONGODB_PUBLIC_KEY=your_public_key
MONGODB_PRIVATE_KEY=your_private_key
MONGODB_PROJECT_ID=your_project_id
```

2. Install required dependencies:

```
npm install axios dotenv
```

## Usage

### One-time IP Update

To update your IP address once:

```
npm run update-mongo-ip
```

This will:
- Detect your current IP address
- Add it to your MongoDB Atlas whitelist if it's not already there
- Show current whitelist entries

### Automatic IP Updating (Daemon)

To continuously monitor and update your IP address:

```
npm run auto-update-ip
```

This will:
- Start a background process that checks your IP every 15 minutes
- Automatically update MongoDB Atlas when your IP changes
- Log all actions to a file (Scripts/ip-daemon.log)

Keep the terminal window open while you're working - the daemon will run as long as the window is open.

### Running at System Startup

To have the auto-updater start when you log in:

```
npm run setup-startup
```

This will create a shortcut in your startup folder to automatically launch the IP updater when you log in.

## Troubleshooting

If you encounter any issues:

1. Check the log files:
   - Scripts/ip-daemon.log (for the daemon)
   - Scripts/ip-update.log (for one-time updates)

2. Verify your API credentials in backend/.env

3. Check your MongoDB Atlas project settings to confirm you have the correct permissions

## Manual Atlas IP Whitelist Management

If you need to manually manage your IP whitelist:

1. Go to the MongoDB Atlas dashboard
2. Navigate to Network Access
3. Use the "Add IP Address" button
4. Add your current IP or use "ADD CURRENT IP ADDRESS" button 
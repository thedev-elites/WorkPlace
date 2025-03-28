# MongoDB Atlas IP Whitelist Helper

This directory contains tools to help manage your MongoDB Atlas IP whitelist, making it easier to deal with changing IP addresses.

## Simple IP Tool (Recommended)

The easiest way to whitelist your IP in MongoDB Atlas:

1. Run the `current-ip.bat` file in this directory by double-clicking it
2. Your current IP will be displayed and copied to your clipboard automatically
3. Follow the on-screen instructions to whitelist your IP in MongoDB Atlas

This batch file requires no setup and works immediately.

## Improving your MongoDB Experience

If you regularly need to update your IP whitelist in MongoDB Atlas, consider these options:

### Option 1: Set Your IP Whitelist to Allow Access from Anywhere (Development Only)

For development environments, you can set your MongoDB Atlas whitelist to `0.0.0.0/0` which allows connections from any IP address.

1. Go to MongoDB Atlas dashboard
2. Click "Network Access" in the left sidebar
3. Click "ADD IP ADDRESS"
4. Click "ALLOW ACCESS FROM ANYWHERE"
5. Confirm your choice

⚠️ **Warning**: This is less secure and not recommended for production databases.

### Option 2: Use Temporary Access for Your Current IP

MongoDB Atlas allows you to add IPs with automatic expiration:

1. Go to MongoDB Atlas dashboard
2. Click "Network Access" in the left sidebar
3. Click "ADD IP ADDRESS"
4. Enter your IP or click "ADD CURRENT IP ADDRESS"
5. Check "Temporary Access"
6. Set an expiration time (e.g., 1 week)
7. Confirm your choice

### Option 3: Configure a VPC Peering or Private Endpoint

For production applications, consider using:
- VPC Peering
- Private Endpoints
- Network Peering

These options create secure, dedicated connections between your application infrastructure and MongoDB Atlas.

## MongoDB Atlas Security Best Practices

1. Use IP whitelisting with specific IPs when possible
2. Enable two-factor authentication for all users
3. Create database users with appropriate permission levels
4. Use TLS/SSL for all connections
5. Consider IP whitelist auto-expiration for temporary access
6. Regularly audit access logs and security settings 
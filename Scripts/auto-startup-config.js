const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define startup items
const startupItems = [
  {
    name: 'MongoDB Atlas IP Updater',
    command: 'npm run auto-update-ip',
    enabled: true,
    description: 'Keeps MongoDB Atlas IP whitelist updated with your current IP'
  },
  {
    name: 'Backend Server',
    command: 'npm run backend',
    enabled: true,
    description: 'Starts the backend Node.js server'
  },
  {
    name: 'Frontend Dev Server',
    command: 'npm run frontend',
    enabled: true, 
    description: 'Starts the frontend development server'
  },
  {
    name: 'Full Development Environment',
    command: 'npm run dev',
    enabled: false, // Disabled by default as it runs both frontend and backend
    description: 'Starts both frontend and backend servers concurrently'
  }
];

// Get startup folder path
function getStartupFolder() {
  const username = process.env.USERNAME || process.env.USER;
  return path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');
}

// Create VBS script content for a given startup item
function createVbsScript(item) {
  const projectPath = path.resolve(__dirname, '..');
  const vbsContent = `
Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "${projectPath.replace(/\\/g, '\\\\')}"
WshShell.Run "cmd.exe /k title ${item.name} && cd ${projectPath.replace(/\\/g, '\\\\')}" & " && ${item.command}", 1, False
Set WshShell = Nothing
  `;
  
  return vbsContent;
}

// Create startup shortcuts for enabled items
function createStartupShortcuts() {
  const startupFolder = getStartupFolder();
  console.log(`Using startup folder: ${startupFolder}`);
  
  if (!fs.existsSync(startupFolder)) {
    console.error(`Startup folder not found: ${startupFolder}`);
    return;
  }
  
  // Process each startup item
  startupItems.forEach(item => {
    if (item.enabled) {
      const shortcutName = `Automated_${item.name.replace(/\s+/g, '_')}.vbs`;
      const shortcutPath = path.join(startupFolder, shortcutName);
      
      // Create VBS script
      const vbsContent = createVbsScript(item);
      
      // Write the file
      try {
        fs.writeFileSync(shortcutPath, vbsContent);
        console.log(`✅ Created startup item for "${item.name}" at ${shortcutPath}`);
      } catch (error) {
        console.error(`❌ Failed to create startup item for "${item.name}": ${error.message}`);
      }
    } else {
      console.log(`⏭️ Skipping disabled startup item: "${item.name}"`);
    }
  });
  
  console.log('\nStartup configuration complete!');
  console.log('The following items will start automatically when you log in:');
  startupItems.filter(item => item.enabled).forEach(item => {
    console.log(`- ${item.name} (${item.description})`);
  });
  
  console.log('\nTo modify these settings, edit the "startupItems" array in Scripts/auto-startup-config.js');
}

// Run the configuration
createStartupShortcuts(); 
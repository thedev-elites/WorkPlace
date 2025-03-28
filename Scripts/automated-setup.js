const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask a question and get user response
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Run a command with a promise
function runCommand(command, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`);
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        console.error(`stderr: ${stderr}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn(`Warning: ${stderr}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

// Check MongoDB Atlas credentials
async function checkMongoDBCredentials() {
  const envPath = path.join(__dirname, '..', 'backend', '.env');
  let envExists = false;
  
  try {
    envExists = fs.existsSync(envPath);
    
    if (envExists) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const hasMongoCreds = envContent.includes('MONGODB_PUBLIC_KEY') && 
                            envContent.includes('MONGODB_PRIVATE_KEY') && 
                            envContent.includes('MONGODB_PROJECT_ID');
      
      if (hasMongoCreds) {
        console.log('✅ MongoDB Atlas API credentials found in .env file.');
        return true;
      }
    }
    
    console.log('⚠️ MongoDB Atlas API credentials not found or incomplete.');
    
    // Ask for credentials
    console.log('\nPlease enter your MongoDB Atlas credentials:');
    const publicKey = await askQuestion('MongoDB Public API Key: ');
    const privateKey = await askQuestion('MongoDB Private API Key: ');
    const projectID = await askQuestion('MongoDB Project ID: ');
    
    // Create or update .env file
    let envContent = '';
    
    if (envExists) {
      envContent = fs.readFileSync(envPath, 'utf8');
      
      // Update credentials if they exist, otherwise add them
      envContent = envContent.replace(/MONGODB_PUBLIC_KEY=.*\n/, `MONGODB_PUBLIC_KEY=${publicKey}\n`);
      envContent = envContent.replace(/MONGODB_PRIVATE_KEY=.*\n/, `MONGODB_PRIVATE_KEY=${privateKey}\n`);
      envContent = envContent.replace(/MONGODB_PROJECT_ID=.*\n/, `MONGODB_PROJECT_ID=${projectID}\n`);
      
      // Add credentials if they don't exist in the file
      if (!envContent.includes('MONGODB_PUBLIC_KEY=')) {
        envContent += `\n# MongoDB Atlas API credentials\nMONGODB_PUBLIC_KEY=${publicKey}\n`;
      }
      if (!envContent.includes('MONGODB_PRIVATE_KEY=')) {
        envContent += `MONGODB_PRIVATE_KEY=${privateKey}\n`;
      }
      if (!envContent.includes('MONGODB_PROJECT_ID=')) {
        envContent += `MONGODB_PROJECT_ID=${projectID}\n`;
      }
    } else {
      // Create a new .env file with these credentials
      envContent = `# MongoDB Atlas API credentials\nMONGODB_PUBLIC_KEY=${publicKey}\nMONGODB_PRIVATE_KEY=${privateKey}\nMONGODB_PROJECT_ID=${projectID}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ MongoDB Atlas API credentials saved to .env file.');
    return true;
  } catch (error) {
    console.error('❌ Error setting up MongoDB credentials:', error.message);
    return false;
  }
}

// Main setup function
async function setup() {
  console.log('=================================================');
  console.log('         AUTOMATED PROJECT SETUP');
  console.log('=================================================');
  console.log('\nThis script will set up everything you need to run the project.');
  
  try {
    // 1. Install dependencies
    console.log('\n📦 Installing project dependencies...');
    await runCommand('npm run install-all');
    console.log('✅ Dependencies installed successfully.');
    
    // 2. Check MongoDB Atlas credentials
    console.log('\n🔑 Checking MongoDB Atlas credentials...');
    await checkMongoDBCredentials();
    
    // 3. Run IP updater once
    console.log('\n🌐 Updating MongoDB Atlas IP whitelist...');
    await runCommand('npm run update-mongo-ip');
    
    // 4. Configure auto-startup automatically
    console.log('\n🚀 Auto-startup configuration');
    console.log('Automatically configuring auto-startup for all services...');
    await runCommand('npm run configure-auto-startup');
    console.log('✅ Auto-startup configured successfully.');
    
    // 5. Start all services automatically
    console.log('\n🚀 Starting all services automatically...');
    // Use the batch file to start all services in separate windows
    await runCommand('npm run start-all-windows');
    
    console.log('\n=================================================');
    console.log('             SETUP COMPLETE!');
    console.log('=================================================');
    console.log('\nYou can now use the following commands:');
    console.log('- npm run start-all-windows   : Start all services in separate windows');
    console.log('- npm run auto-update-ip      : Start the MongoDB IP updater');
    console.log('- npm run dev                 : Start backend and frontend');
    console.log('- npm run update-mongo-ip     : Update MongoDB Atlas IP once');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

// Run the setup process
setup(); 
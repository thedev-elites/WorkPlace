const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Ensure we're connecting to the 'internshala_jobs' database
    let uri = process.env.MONGODB_URI;
    
    // If the URI doesn't specify a database name, add it
    if (!uri.includes('/internshala_jobs?')) {
      uri = uri.replace('/?', '/internshala_jobs?');
    }
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    
    // Provide more helpful error message for IP whitelist issues
    if (error.message.includes('IP whitelist')) {
      console.error('\n---------------------------------------------------------------');
      console.error('MONGODB ATLAS IP WHITELIST ERROR:');
      console.error('1. Go to: https://cloud.mongodb.com/');
      console.error('2. Sign in with your MongoDB Atlas credentials');
      console.error('3. Select your project/cluster');
      console.error('4. Click "Network Access" in the left sidebar');
      console.error('5. Click "ADD IP ADDRESS"');
      console.error('6. Choose "ALLOW ACCESS FROM ANYWHERE" (for development)');
      console.error('   or "ADD CURRENT IP ADDRESS" (more secure)');
      console.error('7. Click "Confirm"');
      console.error('8. Restart your server after IP is added');
      console.error('---------------------------------------------------------------\n');
    }
    
    // Don't exit process here, let the application handle it
    return null;
  }
};

module.exports = connectDB; 
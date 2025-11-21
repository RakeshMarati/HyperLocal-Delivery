const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are recommended for Mongoose 6+
      // No need for useNewUrlParser, useUnifiedTopology in newer versions
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('\n⚠️  Please check:');
    console.error('1. Your IP address is whitelisted in MongoDB Atlas');
    console.error('2. Your MongoDB connection string is correct');
    console.error('3. Your network connection is active\n');
    // Don't exit process - let server start but handle DB errors in routes
    // process.exit(1);
  }
};

module.exports = connectDB;


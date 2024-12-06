// database.js
const mongoose = require('mongoose');

// Define your MongoDB URI (replace with your actual URI, this is just an example)
const uri = process.env.MONGO_URI ;

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,  // Timeout for server selection (30 seconds)
    socketTimeoutMS: 45000,           // Socket timeout (45 seconds)
    connectTimeoutMS: 30000,          // Connection timeout (30 seconds)
};

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        // Try to connect to MongoDB
        await mongoose.connect(uri, options);
        console.log('MongoDB connected successfully');
    } catch (err) {
        // If there is an error, log it and exit the process
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit with a failure status code
    }
};

module.exports = connectDB;


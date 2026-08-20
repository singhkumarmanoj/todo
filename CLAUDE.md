@AGENTS.md





import mongoose from "mongoose";
import dns from 'dns';

// Force IPv4 and use reliable DNS servers
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Fixed: 1.1.1.1 not 1.1.11

let isConnected = false; // Track connection state

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.URI!, {
            dbName: "todoapp",
            bufferCommands: false,
            serverSelectionTimeoutMS: 30000, // Add timeout
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000,
        });

        isConnected = true;
        console.log(`✅ MongoDB connected: ${db.connection.host}`);

        // Handle connection events
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false;
        });

    } catch (error) {
        console.error("Mongodb connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectDB;
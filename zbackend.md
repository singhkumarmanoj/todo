>work for connection to backend
import mongoose from "mongoose";
import dns from 'dns';

// Fix DNS issues
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

let isConnected = false;

const connectDB = async () => {
    // 1. If already connected, reuse it
    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        if (!process.env.URI) {
            throw new Error("MONGODB_URI not found in environment variables");
        }

        console.log("🔄 Connecting to MongoDB...");

        // 2. Connect to MongoDB
        const db = await mongoose.connect(process.env.URI!, {
            dbName: "todoapp",
            serverSelectionTimeoutMS: 30000,
        });

        isConnected = true;
        console.log(`✅ MongoDB connected: ${db.connection.host}`);
        return db; // ⬅️ IMPORTANT: Return the connection!

        // 3. Update connection status when it changes
        mongoose.connection.on('disconnected', () => {
            console.log('❌ Disconnected');
            isConnected = false;
        });

    } catch (error: any) {
        // 🔍 DEBUG: Log the FULL error



        console.error("❌ Connection failed:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Full error:", error);
        


        // Don't throw generic error, throw the actual error
        throw error;
    }
};

export default connectDB;
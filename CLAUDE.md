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








"use client";
import { CircleX } from "lucide-react";
import { useState, useEffect } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data.tasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div className="p-2 w-80 ml-2 mr-2 bg-gray-950 rounded">
      <h2 className="text-blue-700 mb-2 text-md font-bold">Task Lists</h2>
      <ul className="list-disc list-inside text-amber-200">
        {tasks.map((task) => (
          <li className="flex justify-between pl-2 pr-3"  key={task._id}>
            {/* <span>{task.title}</span> */}
            {task.title}
            {/* <CircleX /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

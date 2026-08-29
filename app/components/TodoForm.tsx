"use client";
import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const data= await res.json();
    console.log("Task saved:", data);
    setTitle("");

    // hide after 3 seconds
    };

    const handleClick = ()=> {
      setStatus("Message is sending...");

      setTimeout(() => {
        setStatus("...");
      }, 2000);
    };

  return (
  
    <div className="bg-gray-900 w-100 h-30 m-4 p-5 rounded-xl">
      <h2 className="text-xl font-bold text-blue-900">Todo Submitted from here </h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
  
        <input
          // type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
          className="flex-1 border rounded px-3 py-2 w-64"
          />
        <button onClick={handleClick} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Task
        </button>

        <p className="w-full">{status}
        </p>


      </form>
    </div>
  )
}
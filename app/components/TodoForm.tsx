"use client";
import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [success, setSuccess] =  useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const data= await res.json();
    console.log("Task saved:", data);
    setTitle("");
    setSuccess(true);

    // hide after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
    };

  return (
  
    <div className="bg-amber-800 w-100 h-30 m-4 p-5 rounded-2xl">
      <h2>This is form of Todo </h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
  
        <input
          // type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
          className="border rounded px-3 py-2 w-64"
          />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add
        </button>
      </form>
      {success && (
        <p >Task Added successful ! </p>
      )}
    </div>
  )
}
"use client";
import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");     // task title
  const [status, setStatus] = useState("");   //sending...
  //
  const [error, setError] = useState("");     // validation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    //
    if(title.trim() === ""){
      setError("input can't be field ");
      setStatus("");
      setTimeout(() => {
        setError("");
        
      }, 1500);

      return;
    
    }

    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const data= await res.json();
    console.log("Task saved:", data);
    setTitle("");

    };

    const handleClick = ()=> {
      setStatus("sending to atlas ...");

      setTimeout(() => {
        setStatus("");
        
      }, 3000);
      return;
    };

  return (
  
    <div className="bg-gray-900 w-auto h-50 m-4 p-5 rounded-xl">
      <h2 className="text-xl font-bold text-blue-700">Todo Submitted from here </h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2  ">
  
        <input
          // type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
          className="flex-1 border rounded px-3 py-2 max-w-auto"
          />
        <button onClick={handleClick} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-auto">
          Submit Task
        </button>

        {/* <p className="w-full"> {status} </p> */}

      </form>
        <div className="block">
      {status && <p className="mt-2 text-green-700">{status}</p>}
      {error && <p className="mt-2 text-red-800">{error}</p>}
        </div>
    </div>
  )
}
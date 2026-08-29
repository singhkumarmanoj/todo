"use client";
import { useState } from "react";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") {
      setError("Input cannot be empty");
      return;
    }
    setError("");
    // proceed with API call or logic
    console.log("Submitting:", title);
  };

  return (
    <div className="p-4 bg-gray-800 rounded">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-2 rounded border"
        placeholder="Enter a task..."
      />
      <button
        onClick={handleSubmit}
        className="ml-1 px-1 py-1 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
      {error && <p className="mt-2 text-red-400">{error} empty</p>}
    </div>
  );
}


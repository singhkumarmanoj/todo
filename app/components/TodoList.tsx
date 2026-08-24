"use client";
import { useState } from "react";

export default function TaskList() {
  const [tasks] = useState([
    { id: 1, title: "Learn Next.js" },
    { id: 2, title: "Build Todo App" },
    { id: 3, title: "Deploy to Vercel" },
  ]);

  return (
    <div className="p-4 bg-amber-900 rounded">
      <h2 className="text-white mb-2">Task Lists</h2>
      <ul className="list-disc list-inside text-gray-200">
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

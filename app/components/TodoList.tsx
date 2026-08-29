"use client";
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
    <div className="p-2 w-80 bg-gray-950 rounded">
      <h2 className="text-blue-700 mb-2 text-md font-bold">Task Lists</h2>
      <ul className="list-disc list-inside text-amber-200">
        {tasks.map((task) => (
          <li  key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

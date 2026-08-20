"use client";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("❌ Failed to load tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h2 className="text-xl">Your pending tasks are as below</h2>
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
        key={task._id}
        className="flex justify-between w-60 bg-green-700 shadow p-3 rounded"
        >
          <span>{task.title}</span>
          <span className={task.completed ? "text-white" : "text-gray-300"}>
          
            {task.completed ? "✅ Done" : "⏳ Pending"}
          </span>
        </li>
      ))}
    </ul>
      </div>
  );
}

"use client";
import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return <p className="text-white p-4">Loading tasks...</p>;
  }

  return (
    <div className="w-120 bg-gray-700 rounded-3xl p-4">
      <h2 className="text-xl text-white mb-4">📋 Todo List</h2>
      
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks found</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between bg-green-700 shadow p-3 rounded"
            >
              <span className="text-white">{task.title}</span>
              <span className={task.completed ? "text-green-200" : "text-yellow-200"}>
                {task.completed ? "✅ Done" : "⏳ Pending"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
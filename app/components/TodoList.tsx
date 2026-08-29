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
      <h2 className="text-blue-700 mb-2 text-md font-bold">Task Lists(del not working)</h2>
      <ul className="list-disc list-inside text-amber-200">
        {tasks.map((task) => (
          <li className="flex items-center justify-between gap-1"  key={task._id}>
              <p className="bg-blue-700 w-2 h-2 rounded-3xl"></p>
              <span className="flex-1">{task.title}</span>
               {/* {task.title} */}
              <CircleX  className="flex-1 cursor-pointer" size={20} />
          </li>
        ))}
      </ul>
    </div>
  );
}

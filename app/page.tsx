"use client";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
// import List from "./components/List";

export default function Home() {
  const [dbConnected, setDbConnected ] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDb = async () => {
      try{
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setDbConnected(data.dbConnected);

      } catch{
        setDbConnected(false);
      }
    };
    checkDb();
  },[] );

  return (
    <main className="min-h-screen bg-gray-800 flex flex-col items-center pt-2">
    
      <div className="flex justify-center h-10 items-center  gap-0.5">
        <h1 className="text-2xl font-bold ">My to do Application</h1>
        <p className={dbConnected ?  "bg-green-500 w-3 h-3 rounded-xl" : "bg-red-600 w-3 h-3 rounded-xl "}>{dbConnected ? "" : "" }</p>
      </div>

      <TodoForm />
      <TodoList />
    </main>
  );
}

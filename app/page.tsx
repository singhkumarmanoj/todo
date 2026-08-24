"use client";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-800 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">My to do Application</h1>
      <p className="text-red-600">mongo atlas is not connected</p>
      <TodoForm />
      {/* <TodoList /> */}
    </main>
  );
}

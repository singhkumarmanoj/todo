"use client";
import { useEffect, useState } from "react";

export default function DbStatus() {
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDb = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setDbConnected(data.dbConnected);
      } catch {
        setDbConnected(false);
      }
    };
    checkDb();
  }, []);

  return (
    <p className={dbConnected ? "text-green-400" : "text-red-400"}>
      {dbConnected ? "✅ Connected" : "❌ Not Connected"}
    </p>
  );
}

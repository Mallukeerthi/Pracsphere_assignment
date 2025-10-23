"use client";

import { useEffect, useState } from "react";

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}

export default function DashboardClient({ user }: { user: any }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 🔹 Fetch all tasks when dashboard loads
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then(setTasks)
      .catch(() => console.error("Failed to load tasks"));
  }, []);

  // 🔹 Add new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, dueDate }),
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 700, margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Welcome, {user?.name ?? user?.email}
      </h1>

      <form
        onSubmit={handleAddTask}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "1rem",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <h3>Your Tasks</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((t) => (
          <li
            key={t._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{t.title}</strong> – {t.status}
            <br />
            <small>{t.description}</small>
            <br />
            <small>Due: {t.dueDate}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

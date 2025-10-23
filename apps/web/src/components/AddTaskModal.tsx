"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function AddTaskModal({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title || !description || !dueDate) return alert("All fields required");
    setLoading(true);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, dueDate, status, userId: "demo" }),
    });

    if (res.ok) {
      setOpen(false);
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("todo");
      onTaskAdded();
    } else {
      alert("Failed to add task");
    }

    setLoading(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition">
          + Add Task
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#1e1b4b] p-6 rounded-xl border border-indigo-500/30 shadow-2xl w-[90%] max-w-md">
          <Dialog.Title className="text-lg font-semibold text-indigo-300 mb-4">
            Add New Task
          </Dialog.Title>

          <div className="space-y-3">
            <input
              className="w-full px-3 py-2 rounded bg-[#312e81] text-white border border-indigo-400/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full px-3 py-2 rounded bg-[#312e81] text-white border border-indigo-400/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Task description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="date"
              className="w-full px-3 py-2 rounded bg-[#312e81] text-white border border-indigo-400/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select
              className="w-full px-3 py-2 rounded bg-[#312e81] text-white border border-indigo-400/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="editing">Editing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <Dialog.Close asChild>
              <button className="px-3 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700/40">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleAddTask}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

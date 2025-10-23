'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('❌ Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title || !description || !dueDate) {
      alert('Please fill all fields');
      return;
    }
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (res.ok) {
        await res.json();
        setTitle('');
        setDescription('');
        setDueDate('');
        fetchTasks();
      } else {
        console.error('❌ Failed to add task:', await res.text());
      }
    } catch (err) {
      console.error('❌ Error adding task:', err);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6 md:p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Task Manager Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create, track, and complete your tasks with ease.</p>
      </div>

      {/* Form card */}
      <div className="mb-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40
                       dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400
                       dark:focus:border-blue-400 dark:focus:ring-blue-400/30"
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[90px] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40
                       dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400
                       dark:focus:border-blue-400 dark:focus:ring-blue-400/30"
          />

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40
                         dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100
                         dark:focus:border-blue-400 dark:focus:ring-blue-400/30"
            />
            <button
              onClick={handleAddTask}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white shadow-md transition hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-400 dark:hover:to-indigo-400"
            >
              <Plus size={16} />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Task list */}
      <h2 className="mb-3 text-lg font-medium text-slate-900 dark:text-slate-100">Your Tasks</h2>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((t) => {
            const status = (t.status || 'pending').toLowerCase();
            const isDone = status === 'done' || status === 'completed';
            const badgeClass = isDone
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20'
              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/20';

            return (
              <div
                key={t._id || t.id}
                className="group flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm ring-1 ring-transparent transition
                           hover:-translate-y-[1px] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              >
                <div>
                  <strong className="block group-hover:text-slate-950 dark:group-hover:text-white">{t.title}</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t.description}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}
                  </p>
                </div>
                <span className={`h-fit rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}`}>
                  {status}
                </span>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            You don’t have any tasks yet. Create your first one above.
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  CheckCircle2,
  Circle,
  Trash2,
  Calendar,
  ArrowUpDown,
  Plus,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status?: 'pending' | 'done' | 'completed';
  createdAt?: string;
};

type StatusFilter = 'all' | 'pending' | 'done' | 'completed';
type SortKey = 'dueAsc' | 'dueDesc' | 'createdDesc' | 'createdAsc';

const formatDate = (iso?: string) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d);
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortKey>('dueAsc');
  const [workingId, setWorkingId] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tasks', { cache: 'no-store' });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch tasks', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const base = tasks.filter((t) => {
      const tStatus = (t.status || 'pending').toLowerCase() as StatusFilter;
      const statusOk = status === 'all' ? true : tStatus === status;
      const qOk =
        !qLower ||
        t.title?.toLowerCase().includes(qLower) ||
        t.description?.toLowerCase().includes(qLower);
      return statusOk && qOk;
    });

    const sorted = [...base].sort((a, b) => {
      const aDue = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const bDue = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      const aCreated = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bCreated = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      switch (sort) {
        case 'dueAsc':
          return aDue - bDue;
        case 'dueDesc':
          return bDue - aDue;
        case 'createdAsc':
          return aCreated - bCreated;
        case 'createdDesc':
          return bCreated - aCreated;
        default:
          return 0;
      }
    });

    return sorted;
  }, [tasks, q, status, sort]);

  const toggleStatus = async (task: Task) => {
    const nextStatus =
      (task.status || 'pending') === 'pending' ? 'done' : 'pending';

    setWorkingId(task._id);
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error(await res.text());
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: nextStatus } : t))
      );
    } catch (e) {
      console.error('Failed to update task', e);
    } finally {
      setWorkingId(null);
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    setWorkingId(id);
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      console.error('Failed to delete task', e);
    } finally {
      setWorkingId(null);
    }
  };

  const counts = useMemo(() => {
    const now = Date.now();
    // Optional: to make "overdue" mean strictly before today 00:00:
    // const startOfToday = new Date(); startOfToday.setHours(0,0,0,0); const cutoff = startOfToday.getTime();
    const overdue = tasks.filter((t) => {
      const isDone = (t.status || 'pending') !== 'pending';
      if (isDone || !t.dueDate) return false;
      const dueTs = new Date(t.dueDate).getTime();
      return dueTs < now; // or dueTs < cutoff for midnight cutoff
    }).length;

    const pending = tasks.filter((t) => (t.status || 'pending') === 'pending').length;
    const done = tasks.length - pending;
    return { total: tasks.length, pending, done, overdue };
  }, [tasks]);

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Search, filter, and manage all your tasks.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          title="Add a new task"
        >
          <Plus size={16} />
          Add Task
        </Link>
      </div>

      {/* Toolbar */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or description"
            className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-slate-900 shadow-sm outline-none transition
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                       dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400
                       dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'pending', 'done', 'completed'] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={[
                'rounded-full px-3 py-1.5 text-sm transition border',
                status === s
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800',
              ].join(' ')}
            >
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-slate-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 shadow-sm outline-none transition
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                       dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
          >
            <option value="dueAsc">Due date ↑</option>
            <option value="dueDesc">Due date ↓</option>
            <option value="createdDesc">Recently added</option>
            <option value="createdAsc">Oldest first</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {counts.total} total • {counts.pending} pending • {counts.done} done •
        <span className={`ml-2 ${counts.overdue ? 'text-rose-600 dark:text-rose-400 font-medium' : ''}`}>
          {counts.overdue} overdue
        </span>
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 w-full animate-pulse rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            />
          ))
        ) : filtered.length ? (
          filtered.map((t) => {
            const status = (t.status || 'pending').toLowerCase();
            const isDone = status === 'done' || status === 'completed';
            const dueTs = t.dueDate ? new Date(t.dueDate).getTime() : NaN;
            const now = Date.now();
            const isOverdue = !isDone && Number.isFinite(dueTs) && dueTs < now;

            const statusBadge = isDone
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/20'
              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/20';

            const overdueBadge =
              'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-400/20';

            return (
              <div
                key={t._id}
                className={[
                  'group relative flex items-start justify-between gap-4 rounded-xl border p-4 text-slate-900 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md dark:text-slate-100',
                  isOverdue
                    ? 'border-rose-200 bg-rose-50/40 dark:border-rose-800 dark:bg-rose-900/20'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900',
                ].join(' ')}
              >
                {/* Left accent bar */}
                <span
                  className={[
                    'absolute left-0 top-0 h-full w-1 rounded-l-xl',
                    isOverdue
                      ? 'bg-rose-500'
                      : isDone
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-700',
                  ].join(' ')}
                />

                <div className="flex min-w-0 items-start gap-3">
                  <button
                    title={isDone ? 'Mark as pending' : 'Mark as done'}
                    onClick={() => toggleStatus(t)}
                    disabled={workingId === t._id}
                    className={`mt-0.5 rounded-full p-1.5 transition ${
                      isDone
                        ? 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/20'
                        : 'text-slate-400 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong
                        className={`truncate ${
                          isDone ? 'line-through text-slate-500 dark:text-slate-400' : ''
                        }`}
                      >
                        {t.title}
                      </strong>

                      {/* Status badge */}
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge}`}>
                        {status}
                      </span>

                      {/* Overdue badge */}
                      {isOverdue && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${overdueBadge}`}>
                          <AlertTriangle size={14} />
                          overdue
                        </span>
                      )}
                    </div>

                    <p className="truncate text-sm text-slate-600 dark:text-slate-300">{t.description}</p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar size={14} />
                      <span>
                        Due {formatDate(t.dueDate)}
                        {isOverdue && <span className="ml-1 text-rose-600 dark:text-rose-400">(past due)</span>}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => deleteTask(t._id)}
                    disabled={workingId === t._id}
                    className="rounded-md p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:text-red-300 dark:hover:bg-red-900/20"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No tasks match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
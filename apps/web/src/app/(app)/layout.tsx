'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import {
  LayoutDashboard,
  ListTodo,
  User as UserIcon,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  User2,
  Mail,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

/* Inline Profile Dropdown */
function getInitial(name?: string | null, email?: string | null) {
  const src = (name || email || 'U').trim();
  return src.charAt(0).toUpperCase();
}

function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const name = session?.user?.name || session?.user?.email?.split('@')[0] || 'User';
  const email = session?.user?.email || '';
  const initial = getInitial(session?.user?.name, session?.user?.email);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 pl-1 pr-2 text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white dark:bg-blue-500">
          {initial}
        </span>
        <ChevronDown size={16} className="text-slate-400" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95"
        >
          {/* Header */}
          <div className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white dark:bg-blue-500">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {status === 'loading' ? 'Loading…' : name}
              </div>
              <div className="flex items-center gap-1 truncate text-xs text-slate-500 dark:text-slate-400">
                <Mail size={14} />
                <span className="truncate">{email || '—'}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <User2 size={16} />
            View Profile
          </Link>

          <button
            role="menuitem"
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-700 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Hydration-safe theme state
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('ps-theme');
      const prefers =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      const init = stored ? stored === 'dark' : !!prefers;
      setDarkMode(init);
      document.documentElement.classList.toggle('dark', init);
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('ps-theme', darkMode ? 'dark' : 'light');
    } catch {}
  }, [darkMode, mounted]);

  const isDark = mounted ? darkMode : false;

  // Title by route
  const titleMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/tasks': 'Tasks',
    '/profile': 'Profile',
  };
  const currentTitle = titleMap[pathname] ?? 'Task Manager';

  const displayName =
    status === 'authenticated'
      ? session?.user?.name || session?.user?.email?.split('@')[0] || 'User'
      : 'User';

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        <div className="flex h-full flex-col justify-between">
          <div>
            <h1 className="mb-8 flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">🌐</span>
              <span className="bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
                PracSphere
              </span>
            </h1>

            <nav className="space-y-1">
              {[
                { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
                { name: 'Tasks', href: '/tasks', icon: ListTodo },
                { name: 'Profile', href: '/profile', icon: UserIcon },
              ].map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'flex items-center gap-3 rounded-lg px-4 py-2 transition-colors border-l-2',
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-slate-800 dark:text-slate-100'
                        : 'border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                    ].join(' ')}
                  >
                    <link.icon size={20} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-red-700 shadow-sm transition hover:bg-red-50 dark:border-red-800/60 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-900/30"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="relative flex-1">
        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-60">
          <div className="h-full w-full bg-[radial-gradient(40rem_20rem_at_80%_-10%,rgba(37,99,235,0.07),transparent),radial-gradient(30rem_16rem_at_0%_20%,rgba(14,165,233,0.06),transparent)] dark:bg-[radial-gradient(40rem_20rem_at_80%_-10%,rgba(59,130,246,0.09),transparent),radial-gradient(30rem_16rem_at_0%_20%,rgba(56,189,248,0.07),transparent)]" />
        </div>

        {/* Topbar (glass) */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/75 px-6 py-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{currentTitle}</h2>
          <div className="flex items-center gap-3">
            <p className="text-slate-700 dark:text-slate-300">
              {status === 'loading' ? (
                'Loading…'
              ) : (
                <>
                  Hello, <span className="font-semibold capitalize">{displayName}</span>
                </>
              )}
            </p>

            <button
              onClick={() => setDarkMode((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-slate-700 shadow-sm transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle dark mode"
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'} Mode</span>
            </button>

            <UserMenu />
          </div>
        </header>

        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ChevronDown, LogOut, User2, Mail } from 'lucide-react';

function getInitial(name?: string | null, email?: string | null) {
  const src = (name || email || 'U').trim();
  return src.charAt(0).toUpperCase();
}

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const name =
    session?.user?.name ||
    session?.user?.email?.split('@')[0] ||
    'User';

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
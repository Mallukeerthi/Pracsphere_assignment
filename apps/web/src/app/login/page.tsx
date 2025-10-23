'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-black">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
              {/* Brand mark */}
              <span className="text-lg">🌐</span>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Sign in to your PracSphere account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white/90 px-3 py-2.5 pl-10 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50
                             dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-400
                             dark:focus:border-indigo-400 dark:focus:ring-indigo-400/40"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white/90 px-3 py-2.5 pl-10 pr-10 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50
                             dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-400
                             dark:focus:border-indigo-400 dark:focus:ring-indigo-400/40"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 grid place-items-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/50"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-white shadow-md transition
                         hover:from-indigo-500 hover:to-violet-500
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
                         disabled:opacity-60"
            >
              <LogIn
                size={18}
                className={`transition ${loading ? 'animate-pulse' : 'group-hover:translate-x-0.5'}`}
              />
              <span>{loading ? 'Signing in…' : 'Login'}</span>
            </button>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300">
                {error}
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Don’t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
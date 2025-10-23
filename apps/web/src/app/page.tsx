// app/page.tsx (or src/app/page.tsx)
import type { Metadata } from "next";
import Link from "next/link";
import type { SVGProps } from "react";

export const metadata: Metadata = {
  title: "PracSphere Tasks — A calm personal task manager",
  description:
    "Capture tasks, set due dates, and focus. A simple, distraction‑free task manager for individuals.",
};

const features = [
  { title: "Quick capture", desc: "Add tasks in seconds with a clean, fast UI.", Icon: IconInbox },
  { title: "Due dates", desc: "Stay on top of deadlines with gentle reminders.", Icon: IconCalendar },
  { title: "Tags & priority", desc: "Group tasks with tags and set what matters most.", Icon: IconTag },
  { title: "Repeating tasks", desc: "Automate daily, weekly, or monthly routines.", Icon: IconRepeat },
  { title: "Focus mode", desc: "Work through tasks one at a time—without noise.", Icon: IconFocus },
  { title: "Dark mode", desc: "Looks great day or night. Respects system theme.", Icon: IconSunMoon },
];

export default function Home() {
  return (
    <div className="relative">
      <Header />

      {/* Hero (no right-side tasks box, improved contrast) */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Organize your day. Finish what matters.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Capture tasks, set due dates, and focus without distractions. Simple, fast, and personal.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Get started
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white/95 transition hover:bg-white/15"
            >
              View features
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/85">
            {["Quick capture", "Due dates", "Priorities", "Focus mode"].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <IconCheck className="h-4 w-4 text-indigo-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Center quote with accent color */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <figure className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <blockquote className="text-xl italic text-indigo-700 dark:text-indigo-300">
            “Your mind is for having ideas, not holding them.”
          </blockquote>
          <figcaption className="mt-2 text-sm text-slate-600 dark:text-slate-400">— David Allen</figcaption>
        </figure>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-8 sm:pb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Everything you need, nothing you don’t
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            A calm workflow that helps you capture, organize, and complete.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-700 dark:text-indigo-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Start section */}
      <section id="start" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Start in three steps</h3>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "Add tasks", desc: "Write what you need to do—keep it simple." },
              { step: "2", title: "Organize", desc: "Add due dates, tags, or set priority if needed." },
              { step: "3", title: "Focus", desc: "Enter focus mode and work through tasks calmly." },
            ].map((s) => (
              <li key={s.step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="mb-1 text-sm text-slate-500 dark:text-slate-400">Step {s.step}</div>
                <div className="font-medium text-slate-900 dark:text-white">{s.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{s.desc}</div>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Open app
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* Header + Footer */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white">
            <IconCheck className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
            PracSphere Tasks
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Features
          </Link>
          <Link
            href="signup"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Get started
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-12">
      <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300 md:flex-row">
        <span className="font-medium text-slate-800 dark:text-slate-200">PracSphere Tasks</span>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link>
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Terms</Link>
        </div>
        <p className="text-xs">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

/* Icons */

function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 010-1.414z" />
    </svg>
  );
}
function IconInbox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v5h-5a3 3 0 01-6 0H3V7zm0 7h6a5 5 0 009.9 0H21v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3z" />
    </svg>
  );
}
function IconCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v3H4V6a2 2 0 012-2h1V3a1 1 0 011-1zM4 10h18v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9z" />
    </svg>
  );
}
function IconTag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10.586 2a2 2 0 00-1.414.586L2.586 9.172a2 2 0 000 2.828l9.414 9.414a2 2 0 002.828 0l6.586-6.586a2 2 0 000-2.828L13.414 2.586A2 2 0 0012 2H10.586zM8 8a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  );
}
function IconRepeat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4 7h10l-2-2 2-2 5 5-5 5-2-2 2-2H6a2 2 0 00-2 2v3H2v-3a4 4 0 014-4zm16 10H10l2 2-2 2-5-5 5-5 2 2-2 2h8a2 2 0 012 2v3h2v-3a4 4 0 00-4-4z" />
    </svg>
  );
}
function IconFocus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 9h2a6 6 0 016-6V1a8 8 0 00-8 8zm8 14v-2a6 6 0 006-6h2a8 8 0 01-8 8zM3 15h2a6 6 0 006 6v2a8 8 0 01-8-8zm16-6a6 6 0 00-6-6V1a8 8 0 018 8h-2z" />
    </svg>
  );
}
function IconSunMoon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.95 19.05l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8zM20 13h3v-2h-3v2zm-2.55 7.46l1.41-1.41-1.79-1.8-1.42 1.42 1.8 1.79zM12 6a6 6 0 100 12A6 6 0 0012 6zm7.05-1.05l-1.41-1.41-1.8 1.79 1.42 1.42 1.79-1.8zM13 1h-2v3h2V1z" />
    </svg>
  );
}
function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" />
    </svg>
  );
}
"use client";

import Link from "next/link";
import { ApplicationForm } from "@/components/apply/ApplicationForm";

export default function ApplyPage() {
  return (
    <main className="relative min-h-screen bg-ink text-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/3 top-0 h-[60vh] w-[60vh] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -left-1/4 bottom-0 h-[50vh] w-[50vh] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-bone/10 px-6 py-5 md:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-bot text-[12px] uppercase tracking-mono">
              <span className="grid grid-cols-2 gap-0.5" aria-hidden>
                <span className="block h-2 w-2 bg-pink" />
                <span className="block h-2 w-2 bg-accent" />
                <span className="block h-2 w-2 bg-accent" />
                <span className="block h-2 w-2 bg-pink" />
              </span>
              <span>
                <span className="font-medium">Blank Collar</span>
                <span className="text-bone/50">{" "}/ VC</span>
              </span>
            </Link>
            <Link
              href="/"
              className="font-bot text-[12px] uppercase tracking-mono text-bone/60 hover:text-bone"
            >
              ← Back to site
            </Link>
          </div>
        </header>

        <div className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-2 flex items-center gap-3 font-bot text-[11px] uppercase tracking-mono text-accent">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent" />
              Application
            </div>
            <h1 className="text-4xl font-medium tracking-tighter md:text-6xl">
              Tell us what you&apos;re building.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone/70">
              ~7 minutes. Auto-saves as you go. We respond in 14 days max — yes,
              no, or an honest reason why.
            </p>
          </div>

          <div className="mt-12">
            <ApplicationForm />
          </div>
        </div>

        <footer className="border-t border-bone/10 px-6 py-8 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 font-bot text-[11px] uppercase tracking-mono text-bone/45">
            <span>© Blank Collar VC</span>
            <span>Work is for bots. Life is for humans.</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

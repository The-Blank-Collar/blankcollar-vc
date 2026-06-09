"use client";

import Link from "next/link";
import { LazyMotion, domAnimation } from "framer-motion";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { LangSwitchDark } from "@/components/LangSwitch";
import { useDict, useLang } from "@/lib/lang";

export function ApplyContent() {
  const t = useDict();
  const lang = useLang();
  const homeHref = lang === "de" ? "/de" : "/";

  return (
    <main className="relative min-h-screen bg-ink text-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/3 top-0 h-[60vh] w-[60vh] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -left-1/4 bottom-0 h-[50vh] w-[50vh] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-bone/10 px-6 py-5 md:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <Link
              href={homeHref}
              className="flex items-center gap-2.5 font-bot text-[12px] uppercase tracking-mono"
            >
              <span className="grid grid-cols-2 gap-0.5" aria-hidden>
                <span className="block h-2 w-2 bg-pink" />
                <span className="block h-2 w-2 bg-accent" />
                <span className="block h-2 w-2 bg-accent" />
                <span className="block h-2 w-2 bg-pink" />
              </span>
              <span>
                <span className="font-medium">blankcollar</span>
                <span className="text-bone/50">{" "}/ vc</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <LangSwitchDark basePath="/apply" />
              <Link
                href={homeHref}
                className="font-bot text-[12px] uppercase tracking-mono text-bone/60 hover:text-bone"
              >
                {t.common.backToSite}
              </Link>
            </div>
          </div>
        </header>

        <div className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-2 flex items-center gap-3 font-bot text-[11px] uppercase tracking-mono text-accent">
              <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent" />
              {t.apply.eyebrow}
            </div>
            <h1 className="text-4xl font-medium tracking-tighter md:text-6xl">
              {t.apply.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone/70">
              {t.apply.sub}
            </p>
          </div>

          <div className="mt-12">
            {/* framer-motion is scoped to this route (the multi-step form's
                AnimatePresence) so the homepage never loads it. */}
            <LazyMotion features={domAnimation} strict>
              <ApplicationForm />
            </LazyMotion>
          </div>
        </div>

        <footer className="border-t border-bone/10 px-6 py-8 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 font-bot text-[11px] uppercase tracking-mono text-bone/45">
            <span>© blankcollar.vc</span>
            <span>{t.footer.motto}</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

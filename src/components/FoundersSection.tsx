"use client";

import { m } from "framer-motion";
import { useDict } from "@/lib/lang";

const ease = [0.22, 1, 0.36, 1] as const;

export function FoundersSection() {
  const t = useDict();

  return (
    <section className="relative bg-bone-soft px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 flex items-center gap-3 eyebrow text-ink/60"
        >
          <span className="h-px w-8 bg-ink/30" />
          {t.founders.eyebrow}
        </m.div>

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-medium text-display-md text-balance">
              <span className="block">{t.founders.h1}</span>
              <span className="block text-ink/40">{t.founders.h2}</span>
            </h2>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-ink/75 md:text-lg">
              <p className="text-balance">{t.founders.p1}</p>
              <p className="text-balance">{t.founders.p2}</p>
            </div>
          </div>

          <div className="md:col-span-6 md:pl-8">
            <div className="relative">
              <div className="absolute left-3 top-3 bottom-3 w-px bg-ink/15" aria-hidden />
              <div className="space-y-7">
                {t.founders.milestones.map((milestone, i) => (
                  <m.div
                    key={milestone.stage}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                    className="relative pl-10"
                  >
                    <span
                      className={`absolute left-1.5 top-2 grid h-3 w-3 place-items-center rounded-full ${
                        i === t.founders.milestones.length - 1
                          ? "bg-accent ring-4 ring-accent/25"
                          : "bg-ink"
                      }`}
                      aria-hidden
                    />
                    <div className="font-bot text-[11px] uppercase tracking-mono text-ink/55">
                      {milestone.stage}
                    </div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink/80 md:text-base">
                      {milestone.body}
                    </p>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

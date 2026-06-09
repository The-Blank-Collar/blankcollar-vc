"use client";

import { Reveal } from "@/components/Reveal";
import { NetworkGraphic } from "./NetworkGraphic";
import { useDict } from "@/lib/lang";

export function NetworkSection() {
  const t = useDict();

  return (
    <section className="relative bg-ink text-bone px-6 py-24 md:px-10 md:py-36">
      <div className="absolute inset-0 -z-0" aria-hidden>
        <div className="absolute -left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal
          as="div"
          y={10}
          duration={0.6}
          className="mb-12 flex items-center gap-3 eyebrow text-bone/60"
        >
          <span className="h-px w-8 bg-bone/30" />
          {t.netSection.eyebrow}
        </Reveal>

        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 className="font-medium text-display-md text-balance">
              <span className="block">{t.netSection.h1}</span>
              <span className="block text-bone/50">{t.netSection.h2}</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-bone/70 md:text-lg text-balance">
              {t.netSection.p1}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-bone/70 md:text-lg text-balance">
              {t.netSection.p2}
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-bone/15 bg-bone/10 sm:grid-cols-3">
              {t.netSection.stats.map((s, i) => (
                <Reveal
                  as="div"
                  key={s.label}
                  y={12}
                  delay={i * 0.06}
                  duration={0.6}
                  className="bg-ink p-4"
                >
                  <div className="text-xl font-medium tracking-tighter text-bone md:text-2xl">
                    {s.n}
                  </div>
                  <div className="mt-1 font-bot text-[10px] uppercase tracking-mono text-bone/55">
                    {s.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 text-bone">
            <NetworkGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}

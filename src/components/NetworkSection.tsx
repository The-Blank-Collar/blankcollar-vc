"use client";

import { motion } from "framer-motion";
import { NetworkGraphic } from "./NetworkGraphic";

const ease = [0.22, 1, 0.36, 1] as const;

export function NetworkSection() {
  return (
    <section className="relative bg-ink text-bone px-6 py-24 md:px-10 md:py-36">
      <div className="absolute inset-0 -z-0" aria-hidden>
        <div className="absolute -left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 flex items-center gap-3 eyebrow text-bone/60"
        >
          <span className="h-px w-8 bg-bone/30" />
          07b — FYI
        </motion.div>

        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 className="font-medium text-display-md text-balance">
              <span className="block">We know a lot</span>
              <span className="block text-bone/50">of investors.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-bone/70 md:text-lg text-balance">
              Not a sales pitch — just useful to know. After years of building
              and exiting our own startups, we&apos;ve kept the contacts: seed
              funds, Series A, family offices, the right angels.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-bone/70 md:text-lg text-balance">
              We don&apos;t co-invest, and we&apos;re not selling a
              &quot;network.&quot; But when you&apos;re ready to raise the next
              round, we&apos;ll make warm intros to the right ones — directly,
              not via a portal.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-bone/15 bg-bone/10 sm:grid-cols-3">
              {[
                { n: "Direct", label: "Relationships, not a portal" },
                { n: "Pre-seed → B", label: "Across follow-on stages" },
                { n: "Warm only", label: "We make the intro, not you" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                  className="bg-ink p-4"
                >
                  <div className="text-xl font-medium tracking-tighter text-bone md:text-2xl">
                    {s.n}
                  </div>
                  <div className="mt-1 font-bot text-[10px] uppercase tracking-mono text-bone/55">
                    {s.label}
                  </div>
                </motion.div>
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

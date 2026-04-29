"use client";

import { motion } from "framer-motion";
import { NetworkGraphic } from "./NetworkGraphic";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { n: "26+", label: "Co-investors in the network" },
  { n: "Pre-seed → Series B", label: "Across every follow-on stage" },
  { n: "0 cold emails", label: "We open the room for you" },
];

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
          07b — The Network
        </motion.div>

        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 className="font-medium text-display-md text-balance">
              <span className="block">When it&apos;s time</span>
              <span className="block">for the next round,</span>
              <span className="block text-bone/50">you don&apos;t start cold.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-bone/70 md:text-lg text-balance">
              Our cheque is the start. The harder problem — the seed and Series
              A round 12–18 months later — is what most pre-seed funds leave
              you to figure out alone.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-bone/70 md:text-lg text-balance">
              We don&apos;t. We co-invest with seed and Series A funds across
              Europe and the US, and warm-intro every portfolio company into
              the rooms that matter — before the round opens.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-bone/15 bg-bone/10 sm:grid-cols-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                  className="bg-ink p-4"
                >
                  <div className="text-2xl font-medium tracking-tighter text-bone md:text-3xl">
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

"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: "01",
    label: "Apply",
    body: "Send us a paragraph and a link. No deck required, no warm intro needed.",
    detail: "~5 min",
  },
  {
    n: "02",
    label: "Decision",
    body: "We respond in 14 days max. Yes, no, or honest reason why.",
    detail: "≤ 14 days",
  },
  {
    n: "03",
    label: "Capital wired",
    body: "Up to $25K, founder-friendly terms. SAFE or equivalent.",
    detail: "≤ $25K",
  },
  {
    n: "04",
    label: "Operators activated",
    body: "Your embedded team from theblankcollar.com plugs in week one.",
    detail: "Day 1",
  },
  {
    n: "05",
    label: "OS deployed",
    body: "Free seat on blankcollar.ai. Memory, agents, routines — running for you.",
    detail: "Free, forever",
  },
];

export function ProcessFlow() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease, delay: reduce ? 0 : i * 0.08 }}
            className="group relative flex flex-col gap-4 bg-bone p-8 md:gap-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-bot text-[11px] uppercase tracking-mono text-ink/50">
                Step {step.n}
              </span>
              <span className="font-bot text-[11px] uppercase tracking-mono text-ink/40 tabular">
                {step.detail}
              </span>
            </div>
            <h3 className="text-2xl font-medium tracking-tighter md:text-[28px]">
              {step.label}
            </h3>
            <p className="text-ink/70 text-[15px] leading-relaxed">{step.body}</p>
            {i < steps.length - 1 && (
              <motion.div
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.6,
                  ease,
                  delay: reduce ? 0 : i * 0.08 + 0.4,
                }}
                className="absolute right-0 top-1/2 hidden h-px w-6 origin-left bg-ink/30 md:block"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

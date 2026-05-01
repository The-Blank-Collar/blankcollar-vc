"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Tier = {
  id: string;
  name: string;
  audience: string;
  capital: string;
  features: string[];
  emphasis?: boolean;
};

const tiers: Tier[] = [
  {
    id: "access",
    name: "The Access",
    audience: "For founders who already have capital",
    capital: "Knowledge + OS",
    features: [
      "Full access to theblankcollar.com playbooks",
      "Configured seat on blankcollar.ai — your agentic OS",
      "Pitch deck, data room, business model — co-built",
      "Warm intros to seed / Series A when ready",
    ],
  },
  {
    id: "full-stack",
    name: "The Full Stack",
    audience: "For founders who need the lift",
    capital: "Up to CHF 50'000 + everything in The Access",
    features: [
      "Up to CHF 50'000 on a founder-friendly SAFE",
      "Full access to theblankcollar.com playbooks",
      "Configured seat on blankcollar.ai — your agentic OS",
      "Pitch deck, data room, business model — co-built",
      "Warm intros to seed / Series A when ready",
    ],
    emphasis: true,
  },
];

function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.15" />
      <path
        d="M4.5 8.5l2.5 2.5L11.5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InvestmentTiers() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease, delay: i * 0.1 }}
          className={`relative flex flex-col rounded-3xl border p-7 md:p-9 ${
            tier.emphasis
              ? "border-accent bg-bone shadow-[0_24px_60px_-20px_rgba(232,255,92,0.55)]"
              : "border-ink/12 bg-bone-soft/40"
          }`}
        >
          {tier.emphasis && (
            <div className="absolute -top-3 left-7 rounded-full bg-accent px-2.5 py-1 font-bot text-[10px] uppercase tracking-mono text-ink">
              Most common
            </div>
          )}

          <div className="mb-2 font-bot text-[11px] uppercase tracking-mono text-ink/55">
            {tier.audience}
          </div>
          <h3 className="text-3xl font-medium tracking-tighter text-ink md:text-4xl">
            {tier.name}
          </h3>

          <div className="my-6 flex items-baseline gap-2 border-b border-ink/10 pb-6">
            <span className="text-2xl font-medium tracking-tighter text-ink md:text-3xl">
              {tier.capital}
            </span>
          </div>

          <ul className="flex-1 space-y-3 text-[15px] leading-relaxed text-ink/80">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className={`mt-0.5 ${tier.emphasis ? "text-ink" : "text-ink/55"}`}>
                  <CheckGlyph />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

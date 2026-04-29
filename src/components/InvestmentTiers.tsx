"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Tier = {
  id: string;
  name: string;
  audience: string;
  capital: string;
  knowledge: boolean;
  os: boolean;
  features: string[];
  emphasis?: boolean;
};

const tiers: Tier[] = [
  {
    id: "os-pass",
    name: "The OS Pass",
    audience: "Funded · Already incorporated",
    capital: "No cheque",
    knowledge: true,
    os: true,
    features: [
      "Full access to theblankcollar.com playbooks",
      "Configured seat on blankcollar.ai — your agentic OS",
      "Network intros for follow-on rounds",
      "Light advisory equity (≤ 0.5%) or fee-based",
    ],
  },
  {
    id: "full-stack",
    name: "The Full Stack",
    audience: "Pre-seed · First-time or repeat",
    capital: "Up to CHF 50K",
    knowledge: true,
    os: true,
    features: [
      "Up to CHF 50K on founder-friendly SAFE",
      "Pitch deck, data room, business model — co-built",
      "Configured agentic OS, day one",
      "Warm intros to seed / Series A when ready",
    ],
    emphasis: true,
  },
  {
    id: "cheque",
    name: "The Cheque",
    audience: "Pre-seed · You've done this before",
    capital: "Up to CHF 50K",
    knowledge: false,
    os: false,
    features: [
      "Up to CHF 50K on a clean SAFE",
      "Decision in 14 days, max",
      "Quarterly check-in only — your call",
      "Network intros remain open if you want them",
    ],
  },
];

function CheckGlyph({ on }: { on: boolean }) {
  if (on) {
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
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 opacity-30" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function InvestmentTiers() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease, delay: i * 0.08 }}
          className={`relative flex flex-col rounded-3xl border p-6 md:p-7 ${
            tier.emphasis
              ? "border-accent bg-bone shadow-[0_24px_60px_-20px_rgba(232,255,92,0.6)]"
              : "border-ink/12 bg-bone-soft/40"
          }`}
        >
          {tier.emphasis && (
            <div className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-1 font-bot text-[10px] uppercase tracking-mono text-ink">
              Most common
            </div>
          )}

          <div className="mb-1 font-bot text-[11px] uppercase tracking-mono text-ink/50">
            {tier.audience}
          </div>
          <h3 className="text-2xl font-medium tracking-tighter text-ink md:text-3xl">
            {tier.name}
          </h3>

          <div className="my-6 flex items-baseline gap-2 border-b border-ink/10 pb-6">
            <span className="text-3xl font-medium tracking-tighter text-ink md:text-4xl">
              {tier.capital}
            </span>
          </div>

          <div className="mb-5 flex flex-wrap gap-2 font-bot text-[11px] uppercase tracking-mono">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${tier.knowledge ? "border-ink/15 text-ink" : "border-ink/10 text-ink/30 line-through"}`}>
              <CheckGlyph on={tier.knowledge} /> Knowledge
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${tier.os ? "border-ink/15 text-ink" : "border-ink/10 text-ink/30 line-through"}`}>
              <CheckGlyph on={tier.os} /> Agentic OS
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${tier.capital !== "No cheque" ? "border-ink/15 text-ink" : "border-ink/10 text-ink/30 line-through"}`}>
              <CheckGlyph on={tier.capital !== "No cheque"} /> Capital
            </span>
          </div>

          <ul className="flex-1 space-y-3 text-[14px] leading-relaxed text-ink/75">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { m } from "framer-motion";
import { useDict } from "@/lib/lang";

const ease = [0.22, 1, 0.36, 1] as const;

const glyphs = [
  // Pitch deck — slide stack
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="6" width="16" height="11" rx="1.5" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="13" x2="13" y2="13" />
    </svg>
  ),
  // Data room — folder/cabinet
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="5" width="16" height="14" rx="1.5" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  ),
  // Business model — diagram
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="7" height="6" />
      <rect x="14" y="4" width="7" height="6" />
      <rect x="3" y="14" width="7" height="6" />
      <rect x="14" y="14" width="7" height="6" />
      <line x1="10" y1="7" x2="14" y2="7" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" />
    </svg>
  ),
  // Cap table — pie / equity
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v8l6 4" />
    </svg>
  ),
  // Fundraising plan — checklist
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <path d="M9 9l1.5 1.5L13 8" />
      <line x1="9" y1="14" x2="16" y2="14" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),
  // Hiring playbook — people
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
      <path d="M14 19c0-2 2-4 4-4s3 1 3 3" />
    </svg>
  ),
  // Customer discovery — magnifier
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <line x1="15.5" y1="15.5" x2="20" y2="20" />
    </svg>
  ),
  // Pricing & packaging — tiers
  (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="14" width="4" height="6" />
      <rect x="10" y="9" width="4" height="11" />
      <rect x="16" y="4" width="4" height="16" />
    </svg>
  ),
];

export function FounderToolkit() {
  const t = useDict();
  const items = t.toolkit.items;

  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <m.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease, delay: i * 0.04 }}
          className="group flex flex-col gap-3 bg-bone p-6 transition-colors hover:bg-bone-soft md:p-7"
        >
          <div className="text-ink/70 transition-colors group-hover:text-ink">
            {glyphs[i]}
          </div>
          <h3 className="text-lg font-medium tracking-tighter text-ink md:text-xl">
            {item.label}
          </h3>
          <p className="text-[14px] leading-relaxed text-ink/65">{item.body}</p>
        </m.div>
      ))}
    </div>
  );
}

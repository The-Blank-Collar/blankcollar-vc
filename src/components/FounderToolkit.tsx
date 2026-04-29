"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Item = {
  n: string;
  label: string;
  body: string;
  glyph: "deck" | "dataroom" | "model" | "cap" | "fundraise" | "hiring" | "interview" | "pricing";
};

const items: Item[] = [
  {
    n: "01",
    label: "Pitch deck",
    body: "A narrative that opens doors, not a 30-slide PDF that closes them.",
    glyph: "deck",
  },
  {
    n: "02",
    label: "Data room",
    body: "The 12 things investors actually want — pre-built, kept tidy.",
    glyph: "dataroom",
  },
  {
    n: "03",
    label: "Business model",
    body: "Unit economics, pricing, moats — defensible from day zero.",
    glyph: "model",
  },
  {
    n: "04",
    label: "Cap table & SAFEs",
    body: "Clean structure now so the seed round doesn't unravel later.",
    glyph: "cap",
  },
  {
    n: "05",
    label: "Fundraising plan",
    body: "Investor list, sequence, story, timing — built like a sales pipeline.",
    glyph: "fundraise",
  },
  {
    n: "06",
    label: "Hiring playbook",
    body: "First five hires, JDs, comp ranges, scorecards.",
    glyph: "hiring",
  },
  {
    n: "07",
    label: "Customer discovery",
    body: "The interviews that surface real demand, not polite enthusiasm.",
    glyph: "interview",
  },
  {
    n: "08",
    label: "Pricing & packaging",
    body: "What to charge, why, and how to change it without losing customers.",
    glyph: "pricing",
  },
];

function Glyph({ kind }: { kind: Item["glyph"] }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "deck":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="24" height="16" rx="1" />
          <line x1="8" y1="11" x2="20" y2="11" />
          <line x1="8" y1="15" x2="16" y2="15" />
          <line x1="12" y1="22" x2="12" y2="26" />
          <line x1="20" y1="22" x2="20" y2="26" />
          <line x1="10" y1="26" x2="22" y2="26" />
        </svg>
      );
    case "dataroom":
      return (
        <svg {...common}>
          <path d="M5 9 L5 25 L27 25 L27 12 L17 12 L14 9 Z" />
          <line x1="9" y1="17" x2="23" y2="17" />
          <line x1="9" y1="20" x2="19" y2="20" />
        </svg>
      );
    case "model":
      return (
        <svg {...common}>
          <line x1="5" y1="25" x2="27" y2="25" />
          <line x1="5" y1="5" x2="5" y2="25" />
          <rect x="8" y="18" width="3" height="7" />
          <rect x="13" y="13" width="3" height="12" />
          <rect x="18" y="9" width="3" height="16" />
          <rect x="23" y="6" width="3" height="19" />
        </svg>
      );
    case "cap":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" />
          <path d="M16 5 A 11 11 0 0 1 25.5 21" stroke="currentColor" />
          <line x1="16" y1="16" x2="16" y2="5" />
          <line x1="16" y1="16" x2="25.5" y2="21" />
        </svg>
      );
    case "fundraise":
      return (
        <svg {...common}>
          <line x1="5" y1="22" x2="11" y2="16" />
          <line x1="11" y1="16" x2="17" y2="20" />
          <line x1="17" y1="20" x2="27" y2="8" />
          <polyline points="22,8 27,8 27,13" />
        </svg>
      );
    case "hiring":
      return (
        <svg {...common}>
          <circle cx="11" cy="13" r="4" />
          <path d="M4 26 c 0 -5 4 -8 7 -8 s 7 3 7 8" />
          <circle cx="22" cy="11" r="3" />
          <path d="M18 22 c 0 -3 2 -5 4 -5 s 4 2 4 5" />
        </svg>
      );
    case "interview":
      return (
        <svg {...common}>
          <path d="M5 8 h 14 a 2 2 0 0 1 2 2 v 8 a 2 2 0 0 1 -2 2 h -8 l -4 4 v -4 h -2 a 2 2 0 0 1 -2 -2 v -8 a 2 2 0 0 1 2 -2 z" />
          <circle cx="9" cy="14" r="0.8" fill="currentColor" />
          <circle cx="13" cy="14" r="0.8" fill="currentColor" />
          <circle cx="17" cy="14" r="0.8" fill="currentColor" />
        </svg>
      );
    case "pricing":
      return (
        <svg {...common}>
          <path d="M16 6 v 20" />
          <path d="M21 10 c -1.5 -1.5 -4 -2 -6 -2 c -3 0 -5 1.5 -5 3.5 c 0 4.5 11 3 11 7.5 c 0 2 -2 3.5 -5 3.5 c -2.5 0 -5 -1 -6.5 -2.5" />
        </svg>
      );
  }
}

export function FounderToolkit() {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease, delay: (i % 4) * 0.05 }}
          className="group flex flex-col gap-4 bg-bone p-6 transition-colors hover:bg-bone-soft md:p-7"
        >
          <div className="flex items-center justify-between">
            <span className="font-bot text-[11px] uppercase tracking-mono text-ink/45">
              {item.n}
            </span>
            <span className="text-ink/85 transition-transform group-hover:scale-105">
              <Glyph kind={item.glyph} />
            </span>
          </div>
          <h3 className="text-xl font-medium tracking-tighter md:text-2xl">
            {item.label}
          </h3>
          <p className="text-[14px] leading-relaxed text-ink/65 md:text-[15px]">
            {item.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

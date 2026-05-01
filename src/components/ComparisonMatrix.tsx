"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const rows = [
  { feature: "Cheque size", trad: "CHF 50'000 – 250'000 (often diluted)", us: "Up to CHF 50'000, founder-friendly" },
  { feature: "Decision time", trad: "Weeks of meetings", us: "14 days, max" },
  { feature: "After the wire", trad: "Quarterly check-ins", us: "Hands-on help on the hard things" },
  { feature: "Pitch deck & data room", trad: "“Send us when ready”", us: "Co-built with you, week one" },
  { feature: "Business model help", trad: "Intros to advisors", us: "Pricing, unit economics, moats" },
  { feature: "AI / automation", trad: "“Have you tried ChatGPT?”", us: "We set up blankcollar.ai for you" },
  { feature: "Hiring help", trad: "Intros to recruiters", us: "Playbooks, JDs, comp benchmarks" },
  { feature: "Board involvement", trad: "Observer seat", us: "None at this stage" },
  { feature: "Network", trad: "LP intros", us: "Knowledge + agents + portfolio" },
];

export function ComparisonMatrix() {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10">
      <div className="grid grid-cols-3 border-b border-ink/10 bg-bone-soft/60">
        <div className="font-bot text-[11px] uppercase tracking-mono text-ink/50 px-5 py-4 md:px-8 md:py-5">
          Feature
        </div>
        <div className="font-bot text-[11px] uppercase tracking-mono text-ink/50 px-5 py-4 md:px-8 md:py-5 border-l border-ink/10">
          Traditional pre-seed
        </div>
        <div className="font-bot text-[11px] uppercase tracking-mono text-ink px-5 py-4 md:px-8 md:py-5 border-l border-ink/10 bg-accent/30">
          blankcollar.vc
        </div>
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={row.feature}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5, ease, delay: i * 0.04 }}
          className="grid grid-cols-3 border-b border-ink/10 last:border-b-0 hover:bg-ink/[0.02] transition-colors"
        >
          <div className="px-5 py-5 md:px-8 md:py-6 text-[15px] md:text-base text-ink/80">
            {row.feature}
          </div>
          <div className="px-5 py-5 md:px-8 md:py-6 text-[15px] md:text-base text-ink/55 border-l border-ink/10 italic">
            {row.trad}
          </div>
          <div className="px-5 py-5 md:px-8 md:py-6 text-[15px] md:text-base text-ink border-l border-ink/10 bg-accent/[0.08] font-medium">
            {row.us}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

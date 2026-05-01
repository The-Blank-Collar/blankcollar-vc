"use client";

import { motion } from "framer-motion";
import { useDict } from "@/lib/lang";

const ease = [0.22, 1, 0.36, 1] as const;

export function ComparisonMatrix() {
  const t = useDict();
  const rows = t.compare.rows;

  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10">
      <div className="hidden md:grid md:grid-cols-3 border-b border-ink/10 bg-bone-soft/60">
        <div className="font-bot text-[11px] uppercase tracking-mono text-ink/50 px-5 py-4 md:px-8 md:py-5">
          {t.compare.headerFeature}
        </div>
        <div className="font-bot text-[11px] uppercase tracking-mono text-ink/50 px-5 py-4 md:px-8 md:py-5 border-l border-ink/10">
          {t.compare.headerTrad}
        </div>
        <div className="font-bot text-[11px] uppercase tracking-mono text-ink px-5 py-4 md:px-8 md:py-5 border-l border-ink/10 bg-accent/30">
          {t.compare.headerUs}
        </div>
      </div>

      {rows.map((row, i) => (
        <motion.div
          key={row.feature}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, ease, delay: i * 0.04 }}
          className="border-b border-ink/10 last:border-b-0 transition-colors md:grid md:grid-cols-3 md:hover:bg-ink/[0.02]"
        >
          <div className="px-5 py-4 md:px-8 md:py-6 text-base font-medium text-ink md:font-normal md:text-[15px] md:text-ink/80">
            {row.feature}
          </div>
          <div className="px-5 pb-3 md:px-8 md:py-6 md:border-l md:border-ink/10 md:flex md:items-center">
            <span className="md:hidden font-bot text-[10px] uppercase tracking-mono text-ink/45 mr-2">
              {t.compare.inlineTradLabel}
            </span>
            <span className="text-[14px] md:text-[15px] text-ink/55 italic">{row.trad}</span>
          </div>
          <div className="px-5 pb-4 md:px-8 md:py-6 md:border-l md:border-ink/10 md:bg-accent/[0.08] md:flex md:items-center">
            <span className="md:hidden font-bot text-[10px] uppercase tracking-mono mr-2">
              <span className="rounded bg-accent/40 px-1.5 py-0.5">blankcollar.vc</span>
            </span>
            <span className="text-[14px] md:text-[15px] md:text-base text-ink font-medium">{row.us}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

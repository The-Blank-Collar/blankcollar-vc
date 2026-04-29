"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Company = {
  name: string;
  domain: string;
  url: string;
  category: string;
  body: string;
  origin: string;
};

const companies: Company[] = [
  {
    name: "Numarics",
    domain: "numarics.com",
    url: "https://numarics.com",
    category: "Fintech / Accounting",
    body: "AI-native accounting for SMEs and fiduciary partners. Now powering its successor, Money Key.",
    origin: "CH",
  },
  {
    name: "Cybee.ai",
    domain: "cybee.ai",
    url: "https://cybee.ai",
    category: "Cybersecurity",
    body: "Cybersecurity & compliance for SMBs. SOC 2, GDPR, ISO 27001 — automated, in plain language.",
    origin: "CH",
  },
  {
    name: "iQTax",
    domain: "iqtax.ch",
    url: "https://iqtax.ch",
    category: "AI Tax",
    body: "The AI platform for Swiss tax declarations. Upload, file, done — in minutes, not hours.",
    origin: "CH",
  },
  {
    name: "Alletta",
    domain: "alletta.ch",
    url: "https://alletta.ch",
    category: "InsurTech",
    body: "First fully digital, AI-powered health & legal insurance platform in Switzerland.",
    origin: "CH",
  },
  {
    name: "Visorway",
    domain: "visorway.ai",
    url: "https://visorway.ai",
    category: "AI Consulting",
    body: "AI-native consulting. One AI advisor in front of full IT and ESG advisory engines.",
    origin: "EU",
  },
];

export function Portfolio() {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 divide-y divide-ink/10">
      {companies.map((c, i) => (
        <motion.a
          key={c.name}
          href={c.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.6, ease, delay: i * 0.05 }}
          className="group grid grid-cols-12 items-baseline gap-4 px-5 py-6 transition-colors hover:bg-bone-soft md:gap-6 md:px-8 md:py-8"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="text-2xl font-medium tracking-tighter md:text-3xl">
              {c.name}
            </div>
            <div className="mt-1 font-bot text-[11px] uppercase tracking-mono text-ink/45">
              {c.domain}
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 font-bot text-[11px] uppercase tracking-mono text-ink/55">
            {c.category}
          </div>
          <div className="col-span-12 md:col-span-6 text-[15px] leading-relaxed text-ink/75 md:text-base">
            {c.body}
          </div>
          <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-2 font-bot text-[11px] uppercase tracking-mono text-ink/45">
            <span>{c.origin}</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

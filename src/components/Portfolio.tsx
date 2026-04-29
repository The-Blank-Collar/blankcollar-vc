"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Status = "exited" | "active";

type Company = {
  name: string;
  domain: string;
  url: string;
  category: string;
  body: string;
  origin: string;
  status: Status;
};

const companies: Company[] = [
  {
    name: "Numarics",
    domain: "numarics.com",
    url: "https://numarics.com",
    category: "Fintech / Accounting",
    body: "AI-native accounting for SMEs and fiduciary partners. Built, scaled, exited — now powering its successor, Money Key.",
    origin: "CH",
    status: "exited",
  },
  {
    name: "Cybee.ai",
    domain: "cybee.ai",
    url: "https://cybee.ai",
    category: "Cybersecurity",
    body: "Cybersecurity & compliance for SMBs. SOC 2, GDPR, ISO 27001 — automated, in plain language.",
    origin: "CH",
    status: "active",
  },
  {
    name: "iQTax",
    domain: "iqtax.ch",
    url: "https://iqtax.ch",
    category: "AI Tax",
    body: "The AI platform for Swiss tax declarations. Upload, file, done — in minutes, not hours.",
    origin: "CH",
    status: "active",
  },
  {
    name: "Alletta",
    domain: "alletta.ch",
    url: "https://alletta.ch",
    category: "InsurTech",
    body: "First fully digital, AI-powered health & legal insurance platform in Switzerland.",
    origin: "CH",
    status: "active",
  },
  {
    name: "Visorway",
    domain: "visorway.ai",
    url: "https://visorway.ai",
    category: "AI Consulting",
    body: "AI-native consulting. One AI advisor in front of full IT and ESG advisory engines.",
    origin: "EU",
    status: "active",
  },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "exited") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-pink/40 bg-pink/10 px-2.5 py-1 font-bot text-[10px] uppercase tracking-mono text-pink">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink" />
        Exited
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-bone-soft/60 px-2.5 py-1 font-bot text-[10px] uppercase tracking-mono text-ink/55">
      <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-ink/55" />
      Active
    </span>
  );
}

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
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease, delay: i * 0.05 }}
          className={`group grid grid-cols-12 items-baseline gap-4 px-5 py-6 transition-colors hover:bg-bone-soft md:gap-6 md:px-8 md:py-8 ${
            c.status === "exited" ? "bg-pink/[0.04]" : ""
          }`}
        >
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-2xl font-medium tracking-tighter md:text-3xl">
                {c.name}
              </div>
              <StatusBadge status={c.status} />
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Logo() {
  return (
    <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em]">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-ink" />
      <span>Blank Collar / VC</span>
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
      <Logo />
      <nav className="hidden items-center gap-8 font-mono text-[12px] uppercase tracking-[0.18em] md:flex">
        <a href="#thesis" className="hover:opacity-60 transition-opacity">
          Thesis
        </a>
        <a href="#offer" className="hover:opacity-60 transition-opacity">
          Offer
        </a>
        <a href="#stack" className="hover:opacity-60 transition-opacity">
          Stack
        </a>
        <a
          href="#apply"
          className="rounded-full bg-ink px-4 py-2 text-bone hover:bg-ink/85 transition-colors"
        >
          Apply →
        </a>
      </nav>
      <a
        href="#apply"
        className="rounded-full bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-bone md:hidden"
      >
        Apply
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-mesh absolute inset-0" aria-hidden />
      <div className="relative z-10 px-6 pb-24 pt-16 md:px-10 md:pb-40 md:pt-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-6xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-bone-soft/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            Pre-seed · Operator-led
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[12vw] leading-[0.92] tracking-tightest md:text-[8.5vw] lg:text-[148px]"
          >
            Capital is easy.
            <br />
            <span className="italic">Building</span> the company
            <br />
            is the <span className="italic">hard</span> part.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl"
          >
            Blank Collar is a different kind of pre-seed VC. We back founders with up to{" "}
            <span className="text-ink">$25K</span>, then plug them into the operators
            and the agentic OS that actually run and scale the business.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#apply"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-bone transition-all hover:bg-ink/85"
            >
              Apply for funding
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#thesis"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] hover:bg-ink/5"
            >
              Read the thesis
            </a>
          </motion.div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [
    "Pre-seed cheques up to $25K",
    "Operator services from theblankcollar.com",
    "Free access to blankcollar.ai — our agentic OS",
    "Hands-on, not hands-off",
    "Built by operators, for operators",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-ink/10 bg-bone-soft/60 py-4 overflow-hidden">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.18em] text-ink/70">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <span aria-hidden className="text-ink/30">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Thesis() {
  const reduce = useReducedMotion();
  return (
    <section id="thesis" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="mb-14 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink/60"
        >
          <span className="h-px w-8 bg-ink/30" />
          01 — Thesis
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-[44px] leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl"
        >
          Most pre-seed funds wire money <br className="hidden md:block" />
          and <span className="italic">disappear</span>. We do the opposite.
        </motion.h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: reduce ? 0 : 0.05 }}
            className="md:col-span-5 md:col-start-1 text-lg leading-relaxed text-ink/75 md:text-xl"
          >
            The biggest problem founders face isn&apos;t getting the cheque.
            It&apos;s everything that comes after — sales, hiring, ops, finance,
            growth, infra — all at once, with no team and no time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: reduce ? 0 : 0.15 }}
            className="md:col-span-5 md:col-start-7 text-lg leading-relaxed text-ink/75 md:text-xl"
          >
            We back founders with capital{" "}
            <span className="text-ink">and</span> the operators, systems, and
            agents that actually run the business. Less pitch deck. More shipped
            outcomes.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

type Pillar = {
  index: string;
  tag: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
};

const pillars: Pillar[] = [
  {
    index: "I",
    tag: "Capital",
    title: "Up to $25K, pre-seed.",
    body:
      "Founder-friendly cheques to give you the runway to build the first version, get to first revenue, and earn the right to your seed round.",
  },
  {
    index: "II",
    tag: "Operators",
    title: "A team of operators on tap.",
    body:
      "Through The Blank Collar, you get access to the people who actually run companies — growth, ops, sales, finance, design, engineering — without hiring a single full-timer.",
    link: { label: "theblankcollar.com", href: "https://www.theblankcollar.com" },
  },
  {
    index: "III",
    tag: "Agentic OS",
    title: "blankcollar.ai, free.",
    body:
      "Every portfolio company gets free access to our agentic OS — a stack of always-on agents that handle the work no founder should be doing manually at 2am.",
    link: { label: "blankcollar.ai", href: "https://www.blankcollar.ai" },
  },
];

function Offer() {
  return (
    <section id="offer" className="relative bg-ink text-bone">
      <div className="px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease }}
            className="mb-14 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-bone/60"
          >
            <span className="h-px w-8 bg-bone/30" />
            02 — The offer
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-[44px] leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl"
          >
            Three things, <span className="italic">one</span> cheque.
          </motion.h2>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-bone/10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <PillarCard key={p.index} pillar={p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, delay }: { pillar: Pillar; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease, delay }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-6 bg-ink p-8 transition-colors hover:bg-ink-soft md:p-10"
    >
      <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.18em] text-bone/50">
        <span>{pillar.tag}</span>
        <span>{pillar.index}</span>
      </div>
      <h3 className="font-display text-3xl leading-[1.05] tracking-tightest md:text-4xl">
        {pillar.title}
      </h3>
      <p className="text-bone/70 leading-relaxed">{pillar.body}</p>
      {pillar.link && (
        <a
          href={pillar.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-accent transition-transform group-hover:translate-x-0.5"
        >
          {pillar.link.label} →
        </a>
      )}
    </motion.div>
  );
}

const stack = [
  { k: "Cheque", v: "Up to $25,000 USD" },
  { k: "Stage", v: "Pre-seed / Day 0" },
  { k: "Geography", v: "Global, remote-first" },
  { k: "Speed", v: "Decisions in 14 days" },
  { k: "Ownership", v: "Founder-friendly terms" },
  { k: "Plus", v: "Operators + Agentic OS" },
];

function Stack() {
  return (
    <section id="stack" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease }}
          className="mb-14 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink/60"
        >
          <span className="h-px w-8 bg-ink/30" />
          03 — The stack
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-[44px] leading-[1.05] tracking-tightest md:text-7xl lg:text-8xl"
        >
          What you get, <span className="italic">in plain English</span>.
        </motion.h2>

        <div className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {stack.map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
              className="grid grid-cols-12 items-baseline gap-4 py-6 md:py-8"
            >
              <span className="col-span-4 md:col-span-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink/60">
                {row.k}
              </span>
              <span className="col-span-8 md:col-span-9 font-display text-2xl tracking-tightest md:text-4xl">
                {row.v}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="apply" className="relative overflow-hidden bg-bone-soft">
      <CtaBackdrop />
      <div className="relative z-10 px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-bone px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            Now reviewing applications
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-[14vw] leading-[0.92] tracking-tightest md:text-[112px]"
          >
            Building <span className="italic">something</span>?
            <br />
            We&apos;d love to <span className="italic">help</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink/70"
          >
            Tell us what you&apos;re building. If it&apos;s a fit, we&apos;ll move fast — capital,
            operators, and the OS, ready to deploy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="mailto:hello@blankcollar.vc?subject=Application%20%E2%80%94%20Blank%20Collar%20VC"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-bone transition-all hover:bg-ink/85"
            >
              hello@blankcollar.vc
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="https://www.theblankcollar.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] hover:bg-ink/5"
            >
              See the operators
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CtaBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0">
      <motion.div
        className="absolute -left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-accent/40 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[55vh] w-[55vh] rounded-full bg-ink/15 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="border-t border-ink/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 font-mono text-[12px] uppercase tracking-[0.18em] text-ink/60 md:flex-row md:items-center">
        <Logo />
        <div className="flex flex-wrap items-center gap-6">
          <a href="https://www.theblankcollar.com" target="_blank" rel="noreferrer" className="hover:text-ink">
            theblankcollar.com
          </a>
          <a href="https://www.blankcollar.ai" target="_blank" rel="noreferrer" className="hover:text-ink">
            blankcollar.ai
          </a>
          <a href="mailto:hello@blankcollar.vc" className="hover:text-ink">
            hello@blankcollar.vc
          </a>
        </div>
        <span>© {year ?? ""} Blank Collar VC</span>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Thesis />
      <Offer />
      <Stack />
      <CTA />
      <Footer />
    </main>
  );
}

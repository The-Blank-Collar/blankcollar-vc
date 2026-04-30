"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/components/SplitWords";
import { CountUp } from "@/components/CountUp";
import { formatSwissNumber } from "@/lib/lang";
import { StackDiagram } from "@/components/StackDiagram";
import { ProcessFlow } from "@/components/ProcessFlow";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { ConstellationGraphic } from "@/components/ConstellationGraphic";
import { FounderToolkit } from "@/components/FounderToolkit";
import { Portfolio } from "@/components/Portfolio";
import { FoundersSection } from "@/components/FoundersSection";
import { NetworkSection } from "@/components/NetworkSection";
import { InvestmentTiers } from "@/components/InvestmentTiers";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 font-bot text-[12px] uppercase tracking-mono">
      <span className="grid grid-cols-2 gap-0.5" aria-hidden>
        <span className="block h-2 w-2 bg-pink" />
        <span className="block h-2 w-2 bg-accent" />
        <span className="block h-2 w-2 bg-accent" />
        <span className="block h-2 w-2 bg-pink" />
      </span>
      <span>
        <span className="font-medium">Blank Collar</span>
        <span className={`${onDark ? "text-bone/50" : "text-ink/50"}`}>
          {" "}/ VC
        </span>
      </span>
    </div>
  );
}

function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 24)), [scrollY]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-40 px-3 pt-3 md:px-6 md:pt-5"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 md:px-6 md:py-3 ${
          scrolled
            ? "border-ink/10 bg-bone/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <Logo />
        <nav className="hidden items-center gap-7 font-bot text-[12px] uppercase tracking-mono lg:flex">
          <a href="#manifesto" className="hover:opacity-60 transition-opacity">Manifesto</a>
          <a href="#stack" className="hover:opacity-60 transition-opacity">Stack</a>
          <a href="#tiers" className="hover:opacity-60 transition-opacity">Tiers</a>
          <a href="#toolkit" className="hover:opacity-60 transition-opacity">Toolkit</a>
          <a href="#portfolio" className="hover:opacity-60 transition-opacity">Portfolio</a>
          <a href="#terms" className="hover:opacity-60 transition-opacity">Terms</a>
        </nav>
        <Link
          href="/apply"
          className="rounded-full bg-ink px-4 py-2 font-bot text-[12px] uppercase tracking-mono text-bone hover:bg-ink/85 transition-colors"
        >
          Apply →
        </Link>
      </div>
    </motion.header>
  );
}

function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease }}
      className="mb-12 flex items-center gap-3 eyebrow text-ink/60"
    >
      <span className="h-px w-8 bg-ink/30" />
      {n} — {label}
    </motion.div>
  );
}

function EyebrowDark({ n, label }: { n: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease }}
      className="mb-12 flex items-center gap-3 eyebrow text-bone/60"
    >
      <span className="h-px w-8 bg-bone/30" />
      {n} — {label}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMesh = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const opacityMesh = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <motion.div
        style={{ y: yMesh, opacity: opacityMesh }}
        className="gradient-mesh absolute inset-0 -z-10"
        aria-hidden
      />
      <div className="relative z-10 flex flex-1 items-center px-6 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-bone-soft/70 px-3 py-1.5 eyebrow backdrop-blur"
          >
            <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-ink" />
            The Blank Collar Family · Pre-seed
          </motion.div>

          <h1 className="font-medium text-display-xl text-balance max-w-[18ch]">
            <span className="block">
              <SplitWords text="AI changed what" />
            </span>
            <span className="block">
              <SplitWords text="founders build." delay={0.12} />
            </span>
            <span className="block text-ink/40">
              <SplitWords
                text="We changed what VCs deliver."
                delay={0.28}
                stagger={0.05}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg text-balance"
          >
            We&apos;re the pre-seed VC arm of Blank Collar — built for the AI
            era, based in Switzerland. Up to{" "}
            <span className="font-medium text-ink">CHF 50&apos;000</span> in
            capital, the knowledge from{" "}
            <span className="font-bot text-ink">theblankcollar.com</span>, and a
            fully-configured{" "}
            <span className="font-bot text-ink">blankcollar.ai</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/apply"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-bot text-[12px] uppercase tracking-mono text-bone transition-colors hover:bg-ink/85"
            >
              Apply for funding
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 font-bot text-[12px] uppercase tracking-mono hover:bg-ink/5"
            >
              Read the manifesto
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 1.1 }}
            className="mt-12 hidden items-center gap-6 font-bot text-[11px] uppercase tracking-mono text-ink/50 md:flex"
          >
            <span>Backed:</span>
            <span>Numarics</span>
            <span aria-hidden className="text-ink/25">●</span>
            <span>Cybee.ai</span>
            <span aria-hidden className="text-ink/25">●</span>
            <span>iQTax</span>
            <span aria-hidden className="text-ink/25">●</span>
            <span>Alletta</span>
            <span aria-hidden className="text-ink/25">●</span>
            <span>Visorway</span>
          </motion.div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [
    "Pre-seed cheques up to CHF 50'000",
    "Decisions in 14 days",
    "Knowledge from theblankcollar.com",
    "Free, configured seat on blankcollar.ai",
    "Pitch deck, data room, business model — co-built",
    "Hands-on, not hands-off",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-ink/10 bg-bone-soft/60 py-3.5 overflow-hidden">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap eyebrow text-ink/70">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <span aria-hidden className="text-ink/30">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StatBand() {
  const stats = [
    { label: "Cheque size", value: 50000, prefix: "CHF ", suffix: "" },
    { label: "Decision time", value: 14, prefix: "", suffix: " days" },
    { label: "Toolkit modules", value: 8, prefix: "", suffix: "" },
    { label: "Always-on agents", value: 5, prefix: "", suffix: "" },
  ];
  return (
    <section className="relative px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
              className="bg-bone p-6 md:p-8"
            >
              <div className="font-bot text-[11px] uppercase tracking-mono text-ink/55">
                {s.label}
              </div>
              <div className="mt-3 text-4xl font-medium tracking-tighter md:text-5xl tabular">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} format={formatSwissNumber} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="01" label="Manifesto" />

        <h2 className="font-medium text-display-lg text-balance">
          <span className="block">
            <SplitWords text="Most pre-seed funds wire money" />
          </span>
          <span className="block">
            <SplitWords text="and disappear." delay={0.16} />
          </span>
          <span className="block text-ink/40">
            <SplitWords text="We do the opposite." delay={0.3} />
          </span>
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease }}
            className="md:col-span-6 md:col-start-1 text-lg leading-relaxed text-ink/75 md:text-xl text-balance"
          >
            The biggest problem founders face isn&apos;t getting the cheque.
            It&apos;s the pitch deck, the data room, the business model, the
            first hires, the pricing — the things first-time founders
            shouldn&apos;t have to figure out alone, but always do.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="md:col-span-6 md:col-start-7 text-lg leading-relaxed text-ink/75 md:text-xl text-balance"
          >
            Blank Collar VC writes the cheque, then gives you the knowledge
            from <span className="font-bot text-ink">theblankcollar.com</span>{" "}
            and configures{" "}
            <span className="font-bot text-ink">blankcollar.ai</span> — our
            agentic OS — for your company. We don&apos;t do the work for you.
            We make sure you can.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 -z-0" aria-hidden>
        <div className="absolute -right-1/3 top-0 h-[60vh] w-[60vh] rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <div className="relative z-10 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <EyebrowDark n="03" label="The Stack" />

          <h2 className="font-medium text-display-md text-balance">
            <span className="block">
              <SplitWords text="One application." />
            </span>
            <span className="block text-bone/50">
              <SplitWords text="Three layers of leverage." delay={0.15} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-bone/70 leading-relaxed md:text-lg text-balance"
          >
            Built like an OS. Capital makes the next layer possible. Knowledge
            makes the layer above it useful. Agents make all of it scale.
          </motion.p>

          <div className="mt-14">
            <StackDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tiers() {
  return (
    <section id="tiers" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="04" label="How we work" />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text="One application." />
          </span>
          <span className="block text-ink/40">
            <SplitWords text="We pick the right fit." delay={0.18} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          Different stages need different things. We work with founders in one
          of three ways, depending on where they actually are. Once we&apos;ve
          read your application, we&apos;ll come back with the fit that makes
          sense for you.
        </motion.p>

        <div className="mt-14">
          <InvestmentTiers />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-bone-soft/50 px-6 py-5"
        >
          <div className="text-[15px] text-ink/75 max-w-xl">
            Not sure which fits? That&apos;s the point of the application —
            tell us what you&apos;re building, and we&apos;ll come back with
            our read.
          </div>
          <Link
            href="/apply"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 font-bot text-[12px] uppercase tracking-mono text-bone transition-colors hover:bg-ink/85"
          >
            Send us your application
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section id="toolkit" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="05" label="The First-Time Founder Toolkit" />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text="The hard things you" />
          </span>
          <span className="block text-ink/40">
            <SplitWords text="don't have to figure out alone." delay={0.18} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          Eight modules we co-build with you in the first weeks. We share what
          we&apos;ve learned, then we wire it into your{" "}
          <span className="font-bot text-ink">blankcollar.ai</span> agents so
          it keeps compounding.
        </motion.p>

        <div className="mt-14">
          <FounderToolkit />
        </div>
      </div>
    </section>
  );
}

function Network() {
  return (
    <section className="relative bg-bone-soft px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="06" label="In practice" />

        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 className="font-medium text-display-md text-balance">
              <span className="block">
                <SplitWords text="You at the centre." />
              </span>
              <span className="block text-ink/40">
                <SplitWords text="Knowledge around you." delay={0.12} />
              </span>
              <span className="block text-ink/40">
                <SplitWords text="Agents inside the OS." delay={0.24} />
              </span>
            </h2>

            <div className="mt-7 space-y-4 text-ink/70 text-[16px] leading-relaxed">
              <p className="text-balance">
                Day one, you&apos;re no longer guessing. We share what works
                across ten domains every founder eventually needs, then we
                configure your agents on{" "}
                <span className="font-bot text-ink">blankcollar.ai</span> so the
                knowledge runs as automation.
              </p>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                  <span>
                    <span className="font-bot text-[13px] uppercase tracking-mono text-ink/60">
                      Knowledge
                    </span>{" "}
                    — pitch deck, data room, business model, fundraising,
                    hiring, sales, pricing, finance, legal, brand.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent ring-1 ring-ink/30" />
                  <span>
                    <span className="font-bot text-[13px] uppercase tracking-mono text-ink/60">
                      Agents
                    </span>{" "}
                    — research, outreach, ops, reporting, support. Configured
                    for your stack.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-7">
            <ConstellationGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="07" label="Process" />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text="No deck. No warm intro." />
          </span>
          <span className="block text-ink/40">
            <SplitWords text="Five steps. Two weeks." delay={0.18} />
          </span>
        </h2>

        <div className="mt-14">
          <ProcessFlow />
        </div>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="relative bg-bone-soft px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="08" label="vs Traditional pre-seed" />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text="Same money." />
          </span>
          <span className="block text-ink/40">
            <SplitWords text="Different fund." delay={0.15} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          The difference isn&apos;t cheque size. It&apos;s what arrives the day
          after.
        </motion.p>

        <div className="mt-14">
          <ComparisonMatrix />
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow n="09" label="Portfolio" />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text="Founders we've helped" />
          </span>
          <span className="block text-ink/40">
            <SplitWords text="scale from start to finish." delay={0.18} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          Five Swiss / EU companies built on the same playbook: capital,
          knowledge, and an agentic OS — all wired in from day one.{" "}
          <span className="text-ink">One exit so far. Four still climbing.</span>
        </motion.p>

        <div className="mt-14">
          <Portfolio />
        </div>
      </div>
    </section>
  );
}

const terms = [
  { k: "Cheque", v: "Up to CHF 50'000" },
  { k: "Stage", v: "Pre-seed / Day 0" },
  { k: "Geography", v: "Global, remote-first" },
  { k: "Speed", v: "Decisions in 14 days" },
  { k: "Ownership", v: "Founder-friendly terms" },
  { k: "Plus", v: "Knowledge + Agentic OS" },
];

function Terms() {
  return (
    <section id="terms" className="relative bg-ink text-bone px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <EyebrowDark n="11" label="Terms" />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text="What you get," />
          </span>
          <span className="block text-bone/50">
            <SplitWords text="in plain English." delay={0.18} />
          </span>
        </h2>

        <div className="mt-14 divide-y divide-bone/10 border-y border-bone/10">
          {terms.map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
              className="grid grid-cols-12 items-baseline gap-4 py-6 transition-colors hover:bg-bone/[0.03] md:py-8"
            >
              <span className="col-span-4 md:col-span-3 font-bot text-[11px] uppercase tracking-mono text-bone/50">
                {row.k}
              </span>
              <span className="col-span-8 md:col-span-9 text-2xl font-medium tracking-tighter md:text-4xl">
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

      <div className="relative z-10 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-bone px-3 py-1.5 eyebrow"
          >
            <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-ink" />
            Now reviewing applications
          </motion.div>

          <h2 className="font-medium text-display-lg text-balance">
            <span className="block">
              <SplitWords text="Building" />{" "}
              <span className="text-ink/40">
                <SplitWords text="something?" delay={0.06} />
              </span>
            </span>
            <span className="block">
              <SplitWords text="We'd love to" delay={0.18} />{" "}
              <span className="text-ink/40">
                <SplitWords text="help." delay={0.32} />
              </span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg text-balance"
          >
            One paragraph, one link. If it&apos;s a fit, we&apos;ll move fast —
            capital, knowledge, and the OS, ready to deploy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/apply"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-bot text-[12px] uppercase tracking-mono text-bone transition-colors hover:bg-ink/85"
            >
              Start your application
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 font-bot text-[12px] uppercase tracking-mono hover:bg-ink/5"
            >
              See the portfolio
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="border-t border-ink/10 px-6 py-12 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 text-sm text-ink/60 max-w-xs leading-relaxed">
            The pre-seed fund of the Blank Collar family. Capital, knowledge,
            and an agentic OS — in one cheque.
          </p>
        </div>

        <div className="md:col-span-8 grid gap-8 grid-cols-2 sm:grid-cols-3">
          <div>
            <h4 className="font-bot text-[11px] uppercase tracking-mono text-ink/50">Family</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="https://www.theblankcollar.com" target="_blank" rel="noreferrer" className="hover:text-ink text-ink/75">theblankcollar.com</a></li>
              <li><a href="https://www.blankcollar.ai" target="_blank" rel="noreferrer" className="hover:text-ink text-ink/75">blankcollar.ai</a></li>
              <li><span className="text-ink font-medium">blankcollar.vc</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bot text-[11px] uppercase tracking-mono text-ink/50">Page</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#manifesto" className="hover:text-ink text-ink/75">Manifesto</a></li>
              <li><a href="#stack" className="hover:text-ink text-ink/75">Stack</a></li>
              <li><a href="#toolkit" className="hover:text-ink text-ink/75">Toolkit</a></li>
              <li><a href="#portfolio" className="hover:text-ink text-ink/75">Portfolio</a></li>
              <li><a href="#terms" className="hover:text-ink text-ink/75">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bot text-[11px] uppercase tracking-mono text-ink/50">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:hey@theblankcollar.com" className="hover:text-ink text-ink/75">hey@theblankcollar.com</a></li>
              <li><Link href="/apply" className="hover:text-ink text-ink/75">Apply →</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-ink/10 pt-6 font-bot text-[11px] uppercase tracking-mono text-ink/50">
        <span>© {year ?? ""} Blank Collar VC</span>
        <span>Work is for bots. Life is for humans.</span>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <StatBand />
      <Manifesto />
      <FoundersSection />
      <Stack />
      <Tiers />
      <Toolkit />
      <Network />
      <Process />
      <Compare />
      <PortfolioSection />
      <NetworkSection />
      <Terms />
      <CTA />
      <Footer />
    </main>
  );
}

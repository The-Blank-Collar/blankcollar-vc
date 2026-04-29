"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/components/SplitWords";
import { MagneticLink } from "@/components/MagneticLink";
import { CountUp } from "@/components/CountUp";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em]">
      <span
        className={`inline-block h-2.5 w-2.5 rounded-full ${
          onDark ? "bg-bone" : "bg-ink"
        }`}
      />
      <span>Blank Collar / VC</span>
    </div>
  );
}

function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 md:px-6 md:pt-6"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 md:px-7 md:py-3.5 ${
          scrolled
            ? "border-ink/10 bg-bone/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <Logo />
        <nav className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.18em] md:flex">
          <a href="#thesis" className="hover:opacity-60 transition-opacity">
            Thesis
          </a>
          <a href="#offer" className="hover:opacity-60 transition-opacity">
            Offer
          </a>
          <a href="#terms" className="hover:opacity-60 transition-opacity">
            Terms
          </a>
        </nav>
        <MagneticLink
          href="#apply"
          strength={0.35}
          className="rounded-full bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-bone hover:bg-ink/85 transition-colors"
        >
          Apply →
        </MagneticLink>
      </div>
    </motion.header>
  );
}

function HeroOrb() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 20, mass: 1 });
  const sy = useSpring(y, { stiffness: 50, damping: 20, mass: 1 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = ref.current?.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px * 100);
      y.set(py * 60);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ x: sx, y: sy }}
      className="absolute -right-[20%] -top-[10%] -z-10 h-[80vh] w-[80vh] rounded-full bg-accent/40 blur-[140px]"
    />
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMesh = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const opacityMesh = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-40 md:pt-48">
      <motion.div
        style={{ y: yMesh, opacity: opacityMesh }}
        className="gradient-mesh absolute inset-0 -z-10"
        aria-hidden
      />
      <HeroOrb />

      <div className="relative z-10 px-6 pb-28 md:px-10 md:pb-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-bone-soft/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            Pre-seed · Operator-led
          </motion.div>

          <h1 className="font-display text-[14vw] leading-[0.92] tracking-tightest md:text-[10vw] lg:text-[148px] text-balance">
            <span className="block">
              <SplitWords text="Capital is easy." />
            </span>
            <span className="block">
              <SplitWords
                text="Building the company"
                delay={0.15}
                stagger={0.07}
              />
            </span>
            <span className="block">
              <SplitWords
                text="is the hard part."
                delay={0.35}
                stagger={0.07}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
            className="mt-12 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl text-balance"
          >
            Blank Collar is a different kind of pre-seed VC. We back founders
            with up to <span className="text-ink">$25K</span>, then plug them
            into the operators and the agentic OS that actually run and scale
            the business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticLink
              href="#apply"
              strength={0.3}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-ink/85"
            >
              Apply for funding
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </MagneticLink>
            <MagneticLink
              href="#thesis"
              strength={0.2}
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] hover:bg-ink/5"
            >
              Read the thesis
            </MagneticLink>
          </motion.div>
        </div>
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
            <span aria-hidden className="text-ink/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StatBand() {
  const stats = [
    { label: "Cheque size", value: 25000, prefix: "$", suffix: "" },
    { label: "Decision time", value: 14, prefix: "", suffix: " days" },
    { label: "Operators on tap", value: 40, prefix: "", suffix: "+" },
  ];
  return (
    <section className="relative px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="bg-bone p-8 md:p-10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                {s.label}
              </div>
              <div className="mt-4 font-display text-5xl tracking-tightest md:text-7xl">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Thesis() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduce = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);

  return (
    <section
      id="thesis"
      ref={ref}
      className="relative px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink/60"
        >
          <span className="h-px w-8 bg-ink/30" />
          01 — Thesis
        </motion.div>

        <h2 className="font-display text-[44px] leading-[1.05] tracking-tightest md:text-7xl lg:text-[112px] text-balance">
          <span className="block">
            <SplitWords text="Most pre-seed funds wire" stagger={0.05} />
          </span>
          <span className="block">
            <SplitWords text="money and disappear." delay={0.12} stagger={0.05} />
          </span>
          <span className="block italic">
            <SplitWords text="We do the opposite." delay={0.28} stagger={0.06} />
          </span>
        </h2>

        <motion.div
          style={{ y }}
          className="mt-16 grid gap-12 md:grid-cols-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease }}
            className="md:col-span-5 md:col-start-1 text-lg leading-relaxed text-ink/75 md:text-xl text-balance"
          >
            The biggest problem founders face isn&apos;t getting the cheque.
            It&apos;s everything that comes after — sales, hiring, ops, finance,
            growth, infra — all at once, with no team and no time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="md:col-span-5 md:col-start-7 text-lg leading-relaxed text-ink/75 md:text-xl text-balance"
          >
            We back founders with capital{" "}
            <span className="text-ink">and</span> the operators, systems, and
            agents that actually run the business. Less pitch deck. More shipped
            outcomes.
          </motion.p>
        </motion.div>
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

function HorizontalPillars() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const reduce = useReducedMotion();
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["6%", "-66%"]
  );

  return (
    <div ref={ref} className="relative h-[300vh] hidden md:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 pl-[6%] pr-[20%]">
          {pillars.map((p, i) => (
            <PillarCard key={p.index} pillar={p} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function StackedPillars() {
  return (
    <div className="md:hidden flex flex-col gap-6 px-6 pb-24">
      {pillars.map((p, i) => (
        <PillarCard key={p.index} pillar={p} index={i} />
      ))}
    </div>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease, delay: index * 0.05 }}
      className="group relative flex h-full min-h-[60vh] w-[88vw] max-w-[640px] flex-shrink-0 flex-col gap-8 rounded-3xl bg-ink-soft p-10 text-bone md:min-h-[70vh] md:w-[60vw] md:p-14"
    >
      <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.18em] text-bone/50">
        <span>{pillar.tag}</span>
        <span>{pillar.index}</span>
      </div>
      <h3 className="font-display text-4xl leading-[1.05] tracking-tightest md:text-6xl">
        {pillar.title}
      </h3>
      <p className="text-bone/70 leading-relaxed text-lg max-w-md">
        {pillar.body}
      </p>
      {pillar.link && (
        <a
          href={pillar.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-accent transition-transform hover:translate-x-0.5"
        >
          {pillar.link.label} →
        </a>
      )}
    </motion.div>
  );
}

function Offer() {
  return (
    <section id="offer" className="relative bg-ink text-bone">
      <div className="px-6 pt-24 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease }}
            className="mb-14 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-bone/60"
          >
            <span className="h-px w-8 bg-bone/30" />
            02 — The offer
          </motion.div>

          <h2 className="font-display text-[44px] leading-[1.05] tracking-tightest md:text-7xl lg:text-[112px] text-balance">
            <span className="block">
              <SplitWords text="Three things," stagger={0.06} />
            </span>
            <span className="block">
              <span className="italic">
                <SplitWords text="one cheque." delay={0.18} stagger={0.07} />
              </span>
            </span>
          </h2>
        </div>
      </div>

      <HorizontalPillars />
      <StackedPillars />
    </section>
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

function Terms() {
  return (
    <section id="terms" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink/60"
        >
          <span className="h-px w-8 bg-ink/30" />
          03 — The stack
        </motion.div>

        <h2 className="font-display text-[44px] leading-[1.05] tracking-tightest md:text-7xl lg:text-[112px] text-balance">
          <span className="block">
            <SplitWords text="What you get," />
          </span>
          <span className="block italic">
            <SplitWords text="in plain English." delay={0.18} />
          </span>
        </h2>

        <div className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {stack.map((row, i) => (
            <motion.div
              key={row.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
              className="group grid grid-cols-12 items-baseline gap-4 py-6 transition-colors hover:bg-ink/[0.03] md:py-8"
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
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease }}
            variants={stagger}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-bone px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            Now reviewing applications
          </motion.div>

          <h2 className="font-display text-[14vw] leading-[0.92] tracking-tightest md:text-[112px] text-balance">
            <span className="block">
              <SplitWords text="Building something?" />
            </span>
            <span className="block">
              <SplitWords
                text="We'd love to help."
                delay={0.18}
              />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink/70 text-balance"
          >
            Tell us what you&apos;re building. If it&apos;s a fit, we&apos;ll move fast — capital,
            operators, and the OS, ready to deploy.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            variants={stagger}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div variants={fadeUp}>
              <MagneticLink
                href="mailto:hey@theblankcollar.com?subject=Application%20%E2%80%94%20Blank%20Collar%20VC"
                strength={0.35}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-ink/85"
              >
                hey@theblankcollar.com
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </MagneticLink>
            </motion.div>
            <motion.div variants={fadeUp}>
              <MagneticLink
                href="https://www.theblankcollar.com"
                target="_blank"
                rel="noreferrer"
                strength={0.2}
                className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] hover:bg-ink/5"
              >
                See the operators
              </MagneticLink>
            </motion.div>
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
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 font-mono text-[12px] uppercase tracking-[0.18em] text-ink/60 md:flex-row md:items-center">
        <Logo />
        <div className="flex flex-wrap items-center gap-6">
          <a href="https://www.theblankcollar.com" target="_blank" rel="noreferrer" className="hover:text-ink">
            theblankcollar.com
          </a>
          <a href="https://www.blankcollar.ai" target="_blank" rel="noreferrer" className="hover:text-ink">
            blankcollar.ai
          </a>
          <a href="mailto:hey@theblankcollar.com" className="hover:text-ink">
            hey@theblankcollar.com
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
      <StatBand />
      <Thesis />
      <Offer />
      <Terms />
      <CTA />
      <Footer />
    </main>
  );
}

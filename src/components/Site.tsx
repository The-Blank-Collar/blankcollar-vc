"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SplitWords } from "@/components/SplitWords";
import { CountUp } from "@/components/CountUp";
import { formatSwissNumber, useDict, useLang } from "@/lib/lang";
import { StackDiagram } from "@/components/StackDiagram";
import { ProcessFlow } from "@/components/ProcessFlow";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { ConstellationGraphic } from "@/components/ConstellationGraphic";
import { FounderToolkit } from "@/components/FounderToolkit";
import { Portfolio } from "@/components/Portfolio";
import { FoundersSection } from "@/components/FoundersSection";
import { NetworkSection } from "@/components/NetworkSection";
import { InvestmentTiers } from "@/components/InvestmentTiers";
import { LangSwitch } from "@/components/LangSwitch";

const ease = [0.22, 1, 0.36, 1] as const;

function useLocalizedHref(path: string): string {
  const lang = useLang();
  if (lang === "de") {
    return path === "/" ? "/de" : `/de${path}`;
  }
  return path;
}

function Logo({ onDark = false }: { onDark?: boolean }) {
  const homeHref = useLocalizedHref("/");
  return (
    <Link href={homeHref} className="flex items-center gap-2.5 font-bot text-[12px] uppercase tracking-mono">
      <span className="grid grid-cols-2 gap-0.5" aria-hidden>
        <span className="block h-2 w-2 bg-pink" />
        <span className="block h-2 w-2 bg-accent" />
        <span className="block h-2 w-2 bg-accent" />
        <span className="block h-2 w-2 bg-pink" />
      </span>
      <span>
        <span className="font-medium">blankcollar</span>
        <span className={`${onDark ? "text-bone/50" : "text-ink/50"}`}>
          {" "}/ vc
        </span>
      </span>
    </Link>
  );
}

function Header() {
  const t = useDict();
  const applyHref = useLocalizedHref("/apply");
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
          <a href="#manifesto" className="hover:opacity-60 transition-opacity">{t.header.manifesto}</a>
          <a href="#stack" className="hover:opacity-60 transition-opacity">{t.header.stack}</a>
          <a href="#tiers" className="hover:opacity-60 transition-opacity">{t.header.tiers}</a>
          <a href="#toolkit" className="hover:opacity-60 transition-opacity">{t.header.toolkit}</a>
          <a href="#portfolio" className="hover:opacity-60 transition-opacity">{t.header.portfolio}</a>
          <a href="#terms" className="hover:opacity-60 transition-opacity">{t.header.terms}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch basePath="/" />
          <Link
            href={applyHref}
            className="rounded-full bg-ink px-4 py-2 font-bot text-[12px] uppercase tracking-mono text-bone hover:bg-ink/85 transition-colors"
          >
            {t.common.applyArrow}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease }}
      className="mb-12 flex items-center gap-3 eyebrow text-ink/60"
    >
      <span className="h-px w-8 bg-ink/30" />
      {text}
    </motion.div>
  );
}

function EyebrowDark({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease }}
      className="mb-12 flex items-center gap-3 eyebrow text-bone/60"
    >
      <span className="h-px w-8 bg-bone/30" />
      {text}
    </motion.div>
  );
}

function Hero() {
  const t = useDict();
  const applyHref = useLocalizedHref("/apply");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMesh = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const opacityMesh = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
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
            {t.hero.eyebrow}
          </motion.div>

          <h1 className="font-medium text-display-xl text-balance max-w-[18ch]">
            <span className="block">
              <SplitWords text={t.hero.h1a} />
            </span>
            <span className="block">
              <SplitWords text={t.hero.h1b} delay={0.12} />
            </span>
            <span className="block text-ink/40">
              <SplitWords text={t.hero.h2} delay={0.28} stagger={0.05} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg text-balance"
          >
            {t.hero.sub1}
            <span className="font-medium text-ink">{t.hero.subAmount}</span>
            {t.hero.sub2}
            <span className="font-bot text-ink">theblankcollar.com</span>
            {t.hero.sub3}
            <span className="font-bot text-ink">blankcollar.ai</span>
            {t.hero.sub4}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href={applyHref}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-bot text-[12px] uppercase tracking-mono text-bone transition-colors hover:bg-ink/85"
            >
              {t.hero.primaryCta}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3.5 font-bot text-[12px] uppercase tracking-mono hover:bg-ink/5"
            >
              {t.hero.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 1.1 }}
            className="mt-12 hidden items-center gap-6 font-bot text-[11px] uppercase tracking-mono text-ink/50 md:flex"
          >
            <span>{t.hero.backedLabel}</span>
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
  const t = useDict();
  const items = t.marquee;
  const loop = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-ink/10 bg-bone-soft/60 py-3.5 overflow-hidden">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap eyebrow text-ink/70">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{it}</span>
            <span aria-hidden className="text-ink/30">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StatBand() {
  const t = useDict();
  const stats = [
    { label: t.stats.cheque, value: 50000, prefix: "CHF ", suffix: "" },
    { label: t.stats.decision, value: 14, prefix: "", suffix: useLang() === "de" ? " Tage" : " days" },
    { label: t.stats.toolkit, value: 8, prefix: "", suffix: "" },
    { label: t.stats.agents, value: 5, prefix: "", suffix: "" },
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
  const t = useDict();
  return (
    <section id="manifesto" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Eyebrow text={t.manifesto.eyebrow} />

        <h2 className="font-medium text-display-lg text-balance">
          <span className="block">
            <SplitWords text={t.manifesto.h1} />
          </span>
          <span className="block">
            <SplitWords text={t.manifesto.h2} delay={0.16} />
          </span>
          <span className="block text-ink/40">
            <SplitWords text={t.manifesto.h3} delay={0.3} />
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
            {t.manifesto.p1a}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="md:col-span-6 md:col-start-7 text-lg leading-relaxed text-ink/75 md:text-xl text-balance"
          >
            {t.manifesto.p2a}
            <span className="font-bot text-ink">theblankcollar.com</span>
            {t.manifesto.p2b}
            <span className="font-bot text-ink">blankcollar.ai</span>
            {t.manifesto.p2c}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const t = useDict();
  return (
    <section id="stack" className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 -z-0" aria-hidden>
        <div className="absolute -right-1/3 top-0 h-[60vh] w-[60vh] rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <div className="relative z-10 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <EyebrowDark text={t.stack.eyebrow} />

          <h2 className="font-medium text-display-md text-balance">
            <span className="block">
              <SplitWords text={t.stack.h1} />
            </span>
            <span className="block text-bone/50">
              <SplitWords text={t.stack.h2} delay={0.15} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-bone/70 leading-relaxed md:text-lg text-balance"
          >
            {t.stack.sub}
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
  const t = useDict();
  const applyHref = useLocalizedHref("/apply");
  return (
    <section id="tiers" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow text={t.tiers.eyebrow} />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text={t.tiers.h1} />
          </span>
          <span className="block text-ink/40">
            <SplitWords text={t.tiers.h2} delay={0.18} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          {t.tiers.sub1}
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
          <div className="text-[15px] text-ink/75 max-w-xl">{t.tiers.ctaBody}</div>
          <Link
            href={applyHref}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 font-bot text-[12px] uppercase tracking-mono text-bone transition-colors hover:bg-ink/85"
          >
            {t.tiers.ctaLink}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Toolkit() {
  const t = useDict();
  return (
    <section id="toolkit" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow text={t.toolkit.eyebrow} />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text={t.toolkit.h1} />
          </span>
          <span className="block text-ink/40">
            <SplitWords text={t.toolkit.h2} delay={0.18} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          {t.toolkit.sub1}
          <span className="font-bot text-ink">blankcollar.ai</span>
          {t.toolkit.sub2}
        </motion.p>

        <div className="mt-14">
          <FounderToolkit />
        </div>
      </div>
    </section>
  );
}

function Network() {
  const t = useDict();
  return (
    <section className="relative bg-bone-soft px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow text={t.network.eyebrow} />

        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <h2 className="font-medium text-display-md text-balance">
              <span className="block">
                <SplitWords text={t.network.h1} />
              </span>
              <span className="block text-ink/40">
                <SplitWords text={t.network.h2} delay={0.12} />
              </span>
              <span className="block text-ink/40">
                <SplitWords text={t.network.h3} delay={0.24} />
              </span>
            </h2>

            <div className="mt-7 space-y-4 text-ink/70 text-[16px] leading-relaxed">
              <p className="text-balance">
                {t.network.p}
                <span className="font-bot text-ink">blankcollar.ai</span>
                {t.network.p2}
              </p>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                  <span>
                    <span className="font-bot text-[13px] uppercase tracking-mono text-ink/60">
                      {t.network.knowledgeLabel}
                    </span>
                    {t.network.knowledgeBody}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent ring-1 ring-ink/30" />
                  <span>
                    <span className="font-bot text-[13px] uppercase tracking-mono text-ink/60">
                      {t.network.agentsLabel}
                    </span>
                    {t.network.agentsBody}
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
  const t = useDict();
  return (
    <section id="process" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow text={t.process.eyebrow} />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text={t.process.h1} />
          </span>
          <span className="block text-ink/40">
            <SplitWords text={t.process.h2} delay={0.18} />
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
  const t = useDict();
  return (
    <section className="relative bg-bone-soft px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow text={t.compare.eyebrow} />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text={t.compare.h1} />
          </span>
          <span className="block text-ink/40">
            <SplitWords text={t.compare.h2} delay={0.15} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          {t.compare.sub}
        </motion.p>

        <div className="mt-14">
          <ComparisonMatrix />
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const t = useDict();
  return (
    <section id="portfolio" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Eyebrow text={t.portfolio.eyebrow} />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text={t.portfolio.h1} />
          </span>
          <span className="block text-ink/40">
            <SplitWords text={t.portfolio.h2} delay={0.18} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-ink/70 leading-relaxed md:text-lg text-balance"
        >
          {t.portfolio.sub1}
          <span className="text-ink">{t.portfolio.sub2}</span>
        </motion.p>

        <div className="mt-14">
          <Portfolio />
        </div>
      </div>
    </section>
  );
}

function Terms() {
  const t = useDict();
  return (
    <section id="terms" className="relative bg-ink text-bone px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <EyebrowDark text={t.terms.eyebrow} />

        <h2 className="font-medium text-display-md text-balance">
          <span className="block">
            <SplitWords text={t.terms.h1} />
          </span>
          <span className="block text-bone/50">
            <SplitWords text={t.terms.h2} delay={0.18} />
          </span>
        </h2>

        <div className="mt-14 divide-y divide-bone/10 border-y border-bone/10">
          {t.terms.rows.map((row, i) => (
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
  const t = useDict();
  const applyHref = useLocalizedHref("/apply");
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
            {t.cta.badge}
          </motion.div>

          <h2 className="font-medium text-display-lg text-balance">
            <span className="block">
              <SplitWords text={t.cta.h1a} />{" "}
              <span className="text-ink/40">
                <SplitWords text={t.cta.h1b} delay={0.06} />
              </span>
            </span>
            <span className="block">
              <SplitWords text={t.cta.h2a} delay={0.18} />{" "}
              <span className="text-ink/40">
                <SplitWords text={t.cta.h2b} delay={0.32} />
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
            {t.cta.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href={applyHref}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-bot text-[12px] uppercase tracking-mono text-bone transition-colors hover:bg-ink/85"
            >
              {t.cta.primary}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 font-bot text-[12px] uppercase tracking-mono hover:bg-ink/5"
            >
              {t.cta.secondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useDict();
  const applyHref = useLocalizedHref("/apply");
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const pageAnchors = ["#manifesto", "#stack", "#toolkit", "#portfolio", "#terms"];

  return (
    <footer className="border-t border-ink/10 px-6 py-12 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 text-sm text-ink/60 max-w-xs leading-relaxed">{t.footer.tagline}</p>
        </div>

        <div className="md:col-span-8 grid gap-8 grid-cols-2 sm:grid-cols-3">
          <div>
            <h4 className="font-bot text-[11px] uppercase tracking-mono text-ink/50">{t.footer.family}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="https://www.theblankcollar.com" target="_blank" rel="me noopener" className="hover:text-ink text-ink/75">theblankcollar.com</a></li>
              <li><a href="https://www.blankcollar.ai" target="_blank" rel="me noopener" className="hover:text-ink text-ink/75">blankcollar.ai</a></li>
              <li><a href="https://www.blankcollar.university" target="_blank" rel="me noopener" className="hover:text-ink text-ink/75">blankcollar.university</a></li>
              <li><span className="text-ink font-medium">blankcollar.vc</span></li>
              <li><a href="https://www.kristiankabashi.com" target="_blank" rel="me author noopener" className="hover:text-ink text-ink/75">Kristian Kabashi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bot text-[11px] uppercase tracking-mono text-ink/50">{t.footer.page}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {t.footer.pageItems.map((label, i) => (
                <li key={label}><a href={pageAnchors[i]} className="hover:text-ink text-ink/75">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bot text-[11px] uppercase tracking-mono text-ink/50">{t.footer.contact}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:hey@theblankcollar.com" className="hover:text-ink text-ink/75">hey@theblankcollar.com</a></li>
              <li><Link href={applyHref} className="hover:text-ink text-ink/75">{t.common.applyArrow}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-ink/10 pt-6 font-bot text-[11px] uppercase tracking-mono text-ink/50">
        <span>© {year ?? ""} blankcollar.vc</span>
        <span>{t.footer.motto}</span>
      </div>
    </footer>
  );
}

export function Site() {
  const t = useDict();
  return (
    <>
      <a href="#main" className="skip-link">
        {t.common.skipToContent}
      </a>
      <Header />
      <main id="main" className="relative">
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
      </main>
      <Footer />
    </>
  );
}

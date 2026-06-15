"use client";

import { Reveal } from "@/components/Reveal";
import { useDict } from "@/lib/lang";

type Status = "exited" | "active";
type Relation = "built" | "worked";

function StatusBadge({ status, label }: { status: Status; label: string }) {
  if (status === "exited") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-pink/40 bg-pink/10 px-2.5 py-1 font-bot text-[10px] uppercase tracking-mono text-pink">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink" />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-bone-soft/60 px-2.5 py-1 font-bot text-[10px] uppercase tracking-mono text-ink/55">
      <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-ink/55" />
      {label}
    </span>
  );
}

function RelationBadge({ relation, label }: { relation: Relation; label: string }) {
  const built = relation === "built";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-bot text-[10px] uppercase tracking-mono ${
        built
          ? "border-ink/35 bg-ink/[0.06] text-ink/70"
          : "border-ink/12 bg-transparent text-ink/45"
      }`}
    >
      {label}
    </span>
  );
}

export function Portfolio() {
  const t = useDict();
  const companies = t.portfolio.companies;

  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 divide-y divide-ink/10">
      {companies.map((c, i) => (
        <Reveal
          as="a"
          key={c.name}
          href={c.url}
          target="_blank"
          rel="noreferrer"
          y={16}
          delay={i * 0.05}
          duration={0.6}
          className={`group flex flex-col gap-3 px-5 py-6 transition-colors hover:bg-bone-soft md:grid md:grid-cols-12 md:items-baseline md:gap-6 md:px-8 md:py-8 ${
            c.status === "exited" ? "bg-pink/[0.04]" : ""
          }`}
        >
          <div className="md:col-span-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-2xl font-medium tracking-tighter md:text-3xl">
                {c.name}
              </div>
              <RelationBadge
                relation={c.relation}
                label={c.relation === "built" ? t.portfolio.relationBuilt : t.portfolio.relationWorked}
              />
              <StatusBadge
                status={c.status}
                label={c.status === "exited" ? t.portfolio.statusExited : t.portfolio.statusActive}
              />
            </div>
            <div className="mt-1 font-bot text-[11px] uppercase tracking-mono text-ink/45">
              {c.domain}
            </div>
          </div>
          <div className="md:col-span-2 font-bot text-[11px] uppercase tracking-mono text-ink/55">
            {c.category}
          </div>
          <div className="md:col-span-6 text-[15px] leading-relaxed text-ink/75 md:text-base">
            {c.body}
          </div>
          <div className="md:col-span-1 flex items-center justify-between gap-2 font-bot text-[11px] uppercase tracking-mono text-ink/45 md:justify-end">
            <span>{c.origin}</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

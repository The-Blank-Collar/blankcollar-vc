"use client";

import { Reveal } from "@/components/Reveal";
import { useDict } from "@/lib/lang";

export function ProcessFlow() {
  const t = useDict();
  const steps = t.process.steps;

  return (
    <div className="relative">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal
            as="div"
            key={step.n}
            y={24}
            delay={i * 0.08}
            className="group relative flex flex-col gap-4 bg-bone p-8 md:gap-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-bot text-[11px] uppercase tracking-mono text-ink/50">
                {t.process.stepLabel} {step.n}
              </span>
              <span className="font-bot text-[11px] uppercase tracking-mono text-ink/40 tabular">
                {step.detail}
              </span>
            </div>
            <h3 className="text-2xl font-medium tracking-tighter md:text-[28px]">
              {step.label}
            </h3>
            <p className="text-ink/70 text-[15px] leading-relaxed">{step.body}</p>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute right-0 top-1/2 hidden h-px w-6 bg-ink/30 md:block"
              />
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

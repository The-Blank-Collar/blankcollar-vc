"use client";

import { Reveal } from "@/components/Reveal";
import { useDict } from "@/lib/lang";

export function StackDiagram() {
  const t = useDict();
  const layers = t.stack.layers;

  return (
    <div className="relative">
      <div className="grid gap-3">
        {layers.map((layer, i) => (
          <Reveal
            as="div"
            key={layer.label}
            x={-40}
            delay={i * 0.12}
            className={`relative flex items-center gap-6 rounded-2xl border px-6 py-6 md:px-10 md:py-8 ${
              layer.current
                ? "border-accent/60 bg-accent/15"
                : "border-bone/15 bg-bone/[0.04]"
            }`}
          >
            <div className="font-bot text-[11px] uppercase tracking-mono text-bone/60 w-10 shrink-0">
              {layer.label}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-2xl font-medium md:text-3xl">{layer.name}</h3>
                <span className="font-bot text-[12px] uppercase tracking-mono text-bone/50">
                  {layer.site}
                </span>
                {layer.current && (
                  <span className="font-bot text-[10px] uppercase tracking-mono text-accent">
                    {t.stack.youAreHere}
                  </span>
                )}
              </div>
              <p className="mt-2 text-bone/70 text-[15px] md:text-base max-w-xl">
                {layer.description}
              </p>
            </div>
            <div className="hidden md:block font-bot text-[11px] uppercase tracking-mono text-bone/40">
              {layer.voice === "bot" ? "01010" : "human"}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal
        as="div"
        y={20}
        delay={0.5}
        duration={0.6}
        className="mt-8 flex items-center gap-3 font-bot text-[11px] uppercase tracking-mono text-bone/50"
      >
        <span className="h-px flex-1 bg-bone/20" />
        {t.stack.together}
        <span className="h-px flex-1 bg-bone/20" />
      </Reveal>
    </div>
  );
}

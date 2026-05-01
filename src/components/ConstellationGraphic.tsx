"use client";

import { motion, type Variants } from "framer-motion";
import { useDict } from "@/lib/lang";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.025, delayChildren: 0.1 },
  },
};

const ring: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.4, ease } },
};

const line: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease } },
};

const node: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease } },
};

const center: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease } },
};

export function ConstellationGraphic() {
  const t = useDict();
  const innerR = 130;
  const outerR = 230;
  const size = 540;
  const c = size / 2;

  const services = t.network.knowledgeNodes.map((label, i) => ({
    angle: (360 / t.network.knowledgeNodes.length) * i,
    label,
  }));
  const agents = t.network.agentNodes.map((label, i) => ({
    angle: (360 / t.network.agentNodes.length) * i + 18,
    label,
  }));

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="relative mx-auto w-full max-w-[560px] aspect-square"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full overflow-visible"
        aria-hidden
      >
        <motion.circle
          variants={ring}
          cx={c}
          cy={c}
          r={outerR}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeDasharray="2 6"
        />
        <motion.circle
          variants={ring}
          cx={c}
          cy={c}
          r={innerR}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.18}
          strokeDasharray="3 5"
        />

        {[...services, ...agents].map((n, i) => {
          const r = i < services.length ? outerR : innerR;
          const rad = (n.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * r;
          const y = c + Math.sin(rad) * r;
          return (
            <motion.line
              key={`line-${n.label}`}
              variants={line}
              x1={c}
              y1={c}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.08}
            />
          );
        })}

        <motion.g variants={center}>
          <circle cx={c} cy={c} r={48} fill="currentColor" />
          <text
            x={c}
            y={c - 4}
            textAnchor="middle"
            fontFamily="Helvetica Neue, Helvetica, sans-serif"
            fontWeight="500"
            fontSize="13"
            fill="white"
          >
            {t.network.centerLabel}
          </text>
          <text
            x={c}
            y={c + 14}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="rgba(232, 255, 92, 0.85)"
            letterSpacing="0.15em"
          >
            {t.network.centerSub}
          </text>
        </motion.g>

        {agents.map((a) => {
          const rad = (a.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * innerR;
          const y = c + Math.sin(rad) * innerR;
          return (
            <motion.g key={a.label} variants={node}>
              <circle cx={x} cy={y} r={5} fill="rgb(232, 255, 92)" />
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="11"
                fill="currentColor"
                opacity="0.6"
                letterSpacing="0.05em"
              >
                {a.label}
              </text>
            </motion.g>
          );
        })}

        {services.map((s) => {
          const rad = (s.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * outerR;
          const y = c + Math.sin(rad) * outerR;
          return (
            <motion.g key={s.label} variants={node}>
              <circle cx={x} cy={y} r={6} fill="currentColor" opacity={0.85} />
              <text
                x={x}
                y={y - 14}
                textAnchor="middle"
                fontFamily="Helvetica Neue, Helvetica, sans-serif"
                fontSize="13"
                fontWeight="500"
                fill="currentColor"
              >
                {s.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-bot text-[11px] uppercase tracking-mono text-ink/55">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          {t.network.legendKnowledge}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent ring-1 ring-ink/30" />
          {t.network.legendAgents}
        </span>
      </div>
    </motion.div>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  { angle: 0, label: "Pitch deck" },
  { angle: 36, label: "Data room" },
  { angle: 72, label: "Business model" },
  { angle: 108, label: "Fundraising" },
  { angle: 144, label: "Hiring" },
  { angle: 180, label: "Sales" },
  { angle: 216, label: "Pricing" },
  { angle: 252, label: "Finance" },
  { angle: 288, label: "Legal" },
  { angle: 324, label: "Brand" },
];

const agents = [
  { angle: 18, label: "agent.research" },
  { angle: 90, label: "agent.outreach" },
  { angle: 162, label: "agent.ops" },
  { angle: 234, label: "agent.report" },
  { angle: 306, label: "agent.support" },
];

// All animations are driven by variants on a single HTML parent so the
// IntersectionObserver fires reliably (including on mobile, where
// per-SVG-element whileInView can fail to trigger).
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
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

const node: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

const center: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease } },
};

export function ConstellationGraphic() {
  const innerR = 130;
  const outerR = 230;
  const size = 540;
  const c = size / 2;

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
        {/* Outer ring (knowledge) */}
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
        {/* Inner ring (agents) */}
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

        {/* Connection lines from center to nodes */}
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

        {/* Center: Founder */}
        <motion.g variants={center}>
          <circle cx={c} cy={c} r={48} fill="currentColor" />
          <text
            x={c}
            y={c - 4}
            textAnchor="middle"
            fontFamily="Helvetica Neue, Helvetica, sans-serif"
            fontWeight="500"
            fontSize="14"
            fill="white"
          >
            FOUNDER
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
            ● YOU
          </text>
        </motion.g>

        {/* Inner ring nodes — agents */}
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

        {/* Outer ring nodes — knowledge domains */}
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

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-bot text-[11px] uppercase tracking-mono text-ink/55">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          Knowledge we share (human)
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent ring-1 ring-ink/30" />
          Agents we set up (bot)
        </span>
      </div>
    </motion.div>
  );
}

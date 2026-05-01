"use client";

import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Tier = { label: string; n: number; radius: number };

const tiers: Tier[] = [
  { label: "Seed", n: 8, radius: 130 },
  { label: "Series A", n: 12, radius: 200 },
  { label: "Series B+", n: 6, radius: 270 },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.02, delayChildren: 0.1 } },
};

const ring: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease } },
};

const lineV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease } },
};

const nodeV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.45, ease } },
};

const center: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease } },
};

const label: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 0.5, transition: { duration: 0.5, ease, delay: 0.4 } },
};

export function NetworkGraphic() {
  const size = 600;
  const c = size / 2;

  // Pre-compute every node so we can layer them deterministically
  const nodes = tiers.flatMap((tier, ti) =>
    Array.from({ length: tier.n }, (_, i) => {
      const angle = (360 / tier.n) * i + ti * 11;
      const rad = (angle * Math.PI) / 180;
      const x = c + Math.cos(rad) * tier.radius;
      const y = c + Math.sin(rad) * tier.radius;
      return { tierIndex: ti, x, y };
    })
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="relative mx-auto w-full max-w-[600px] aspect-square"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full overflow-visible"
        aria-hidden
      >
        {/* Concentric rings */}
        {tiers.map((tier) => (
          <motion.circle
            key={`ring-${tier.label}`}
            variants={ring}
            cx={c}
            cy={c}
            r={tier.radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.13}
            strokeDasharray="2 6"
          />
        ))}

        {/* Connection lines from center to every node */}
        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            variants={lineV}
            x1={c}
            y1={c}
            x2={n.x}
            y2={n.y}
            stroke="currentColor"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        ))}

        {/* Outer-ring nodes first, then inner */}
        {nodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            variants={nodeV}
            cx={n.x}
            cy={n.y}
            r={n.tierIndex === 0 ? 6 : n.tierIndex === 1 ? 5 : 4}
            fill="currentColor"
            opacity={0.85 - n.tierIndex * 0.15}
          />
        ))}

        {/* Tier labels at the top of each ring (angle 270 = -y) */}
        {tiers.map((tier) => (
          <motion.g key={`tl-${tier.label}`} variants={label}>
            {/* Background gap on the dashed ring so the label reads cleanly */}
            <rect
              x={c - 50}
              y={c - tier.radius - 9}
              width={100}
              height={16}
              fill="#0E1320"
            />
            <text
              x={c}
              y={c - tier.radius + 3}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="11"
              fill="currentColor"
              letterSpacing="0.16em"
            >
              {tier.label.toUpperCase()}
            </text>
          </motion.g>
        ))}

        {/* Centerpiece: BLANKCOLLAR (pre-seed) */}
        <motion.g variants={center}>
          <circle cx={c} cy={c} r={32} fill="rgb(232, 255, 92)" />
          <circle
            cx={c}
            cy={c}
            r={32}
            fill="none"
            stroke="rgb(232, 255, 92)"
            strokeOpacity={0.3}
            strokeWidth={16}
          />
          <text
            x={c}
            y={c + 4}
            textAnchor="middle"
            fontFamily="Helvetica Neue, Helvetica, sans-serif"
            fontWeight="500"
            fontSize="13"
            fill="#0E1320"
          >
            BC.VC
          </text>
        </motion.g>

        {/* "PRE-SEED" label below the centerpiece */}
        <motion.g variants={label}>
          <text
            x={c}
            y={c + 60}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            fill="rgb(232, 255, 92)"
            letterSpacing="0.18em"
          >
            ● PRE-SEED · YOU
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

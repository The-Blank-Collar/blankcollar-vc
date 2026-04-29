"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tiers = [
  { label: "Pre-seed", us: true, n: 1, ring: 0 },
  { label: "Seed", us: false, n: 8, ring: 1 },
  { label: "Series A", us: false, n: 12, ring: 2 },
  { label: "Series B+", us: false, n: 6, ring: 3 },
];

export function NetworkGraphic() {
  const size = 540;
  const c = size / 2;
  const radii = [60, 130, 200, 270];

  // Distribute nodes across rings
  const nodes: { ring: number; angle: number; us?: boolean }[] = [];
  tiers.forEach((tier) => {
    for (let i = 0; i < tier.n; i++) {
      const angle = (360 / tier.n) * i + tier.ring * 7;
      nodes.push({ ring: tier.ring, angle, us: tier.us });
    }
  });

  return (
    <div className="relative mx-auto w-full max-w-[560px] aspect-square">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden>
        {/* Concentric rings */}
        {radii.map((r, i) => (
          <motion.circle
            key={i}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeDasharray="2 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: i * 0.12 }}
          />
        ))}

        {/* Connection web — random links from center outward */}
        {nodes.map((node, i) => {
          const r = radii[node.ring];
          const rad = (node.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * r;
          const y = c + Math.sin(rad) * r;
          return (
            <motion.line
              key={`l-${i}`}
              x1={c}
              y1={c}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.07}
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.4 + i * 0.015 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const r = radii[node.ring];
          const rad = (node.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * r;
          const y = c + Math.sin(rad) * r;
          const isUs = node.us;
          const radius = isUs ? 14 : node.ring === 0 ? 6 : 5;
          return (
            <motion.g
              key={`n-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.7 + i * 0.025 }}
            >
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={isUs ? "rgb(232,255,92)" : "currentColor"}
                opacity={isUs ? 1 : 0.85 - node.ring * 0.15}
              />
              {isUs && (
                <text
                  x={x}
                  y={y - 22}
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                  fontSize="10"
                  fill="rgb(232,255,92)"
                  letterSpacing="0.12em"
                >
                  ● BLANK COLLAR
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Tier labels */}
        {tiers.map((tier, i) => (
          <motion.text
            key={tier.label}
            x={c}
            y={c + radii[i] - 8}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="currentColor"
            opacity={0.4}
            letterSpacing="0.14em"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.4 + i * 0.08 }}
          >
            {tier.label.toUpperCase()}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}

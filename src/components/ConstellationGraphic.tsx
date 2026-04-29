"use client";

import { motion, useReducedMotion } from "framer-motion";

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

export function ConstellationGraphic() {
  const reduce = useReducedMotion();
  const innerR = 130;
  const outerR = 230;
  const size = 540;
  const c = size / 2;

  return (
    <div className="relative mx-auto w-full max-w-[560px] aspect-square">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full"
        aria-hidden
      >
        {/* Outer ring (operators) */}
        <motion.circle
          cx={c}
          cy={c}
          r={outerR}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeDasharray="2 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        />
        {/* Inner ring (agents) */}
        <motion.circle
          cx={c}
          cy={c}
          r={innerR}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.18}
          strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.1 }}
        />

        {/* Connection lines from center to nodes */}
        {[...services, ...agents].map((node, i) => {
          const r = i < services.length ? outerR : innerR;
          const rad = (node.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * r;
          const y = c + Math.sin(rad) * r;
          return (
            <motion.line
              key={`line-${node.label}`}
              x1={c}
              y1={c}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.08}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease,
                delay: reduce ? 0 : 0.3 + i * 0.03,
              }}
            />
          );
        })}

        {/* Center: Founder */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
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

        {/* Inner ring nodes — agents (mono / bot) */}
        {agents.map((a, i) => {
          const rad = (a.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * innerR;
          const y = c + Math.sin(rad) * innerR;
          return (
            <motion.g
              key={a.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease,
                delay: reduce ? 0 : 0.7 + i * 0.06,
              }}
            >
              <circle cx={x} cy={y} r={5} fill="rgb(232, 255, 92)" />
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fill="currentColor"
                opacity="0.6"
                letterSpacing="0.05em"
              >
                {a.label}
              </text>
            </motion.g>
          );
        })}

        {/* Outer ring nodes — operators (sans / human) */}
        {services.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * outerR;
          const y = c + Math.sin(rad) * outerR;
          return (
            <motion.g
              key={s.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease,
                delay: reduce ? 0 : 1.0 + i * 0.05,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={6}
                fill="currentColor"
                opacity={0.85}
              />
              <text
                x={x}
                y={y - 14}
                textAnchor="middle"
                fontFamily="Helvetica Neue, Helvetica, sans-serif"
                fontSize="12"
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease, delay: 1.4 }}
        className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-bot text-[11px] uppercase tracking-mono text-ink/55"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          Knowledge we share (human)
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent ring-1 ring-ink/30" />
          Agents we set up (bot)
        </span>
      </motion.div>
    </div>
  );
}

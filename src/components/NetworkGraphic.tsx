"use client";

import { Reveal } from "@/components/Reveal";

type Tier = { label: string; n: number; radius: number };

const tiers: Tier[] = [
  { label: "Seed", n: 8, radius: 130 },
  { label: "Series A", n: 12, radius: 200 },
  { label: "Series B+", n: 6, radius: 270 },
];

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
    <Reveal
      as="div"
      y={20}
      duration={0.8}
      className="relative mx-auto w-full max-w-[600px] aspect-square"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full overflow-visible"
        aria-hidden
      >
        {/* Concentric rings */}
        {tiers.map((tier) => (
          <circle
            key={`ring-${tier.label}`}
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
          <line
            key={`l-${i}`}
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
          <circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.tierIndex === 0 ? 6 : n.tierIndex === 1 ? 5 : 4}
            fill="currentColor"
            opacity={0.85 - n.tierIndex * 0.15}
          />
        ))}

        {/* Tier labels at the top of each ring (angle 270 = -y) */}
        {tiers.map((tier) => (
          <g key={`tl-${tier.label}`} opacity={0.5}>
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
          </g>
        ))}

        {/* Centerpiece: BLANKCOLLAR (pre-seed) */}
        <g>
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
            YOU
          </text>
        </g>

        {/* "PRE-SEED" label below the centerpiece */}
        <g opacity={0.5}>
          <text
            x={c}
            y={c + 60}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            fill="rgb(232, 255, 92)"
            letterSpacing="0.18em"
          >
            ● WARM INTROS
          </text>
        </g>
      </svg>
    </Reveal>
  );
}

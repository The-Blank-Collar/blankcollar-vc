import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blankcollar.vc — Kapital. Wissen. Agentic OS.",
  description:
    "Ein anderer Pre-Seed-VC, gebaut für die KI-Ära. Wissen von theblankcollar.com + ein agentisches OS für jeden Gründer, den wir unterstützen — und bis zu CHF 50'000 Kapital, wenn die Phase passt. Mit Sitz in der Schweiz, global tätig.",
  openGraph: {
    title: "blankcollar.vc",
    description:
      "Pre-Seed für die KI-Ära. Wissen + agentisches OS für jeden Gründer — und bis zu CHF 50'000, wenn es passt.",
    locale: "de_CH",
  },
  twitter: {
    title: "blankcollar.vc",
    description:
      "Pre-Seed für die KI-Ära. Wissen + agentisches OS für jeden Gründer — und bis zu CHF 50'000, wenn es passt.",
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

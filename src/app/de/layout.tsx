import type { Metadata } from "next";

const deDescription =
  "Pre-Seed-VC für die KI-Ära. Wissen + agentisches OS für jeden Gründer, plus bis zu CHF 50'000 Kapital. Mit Sitz in der Schweiz, global tätig.";

export const metadata: Metadata = {
  title: "blankcollar.vc — Kapital. Wissen. Agentic OS.",
  description: deDescription,
  alternates: {
    canonical: "/de",
    languages: {
      en: "/",
      de: "/de",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "blankcollar.vc — Pre-Seed für die KI-Ära",
    description: deDescription,
    locale: "de_CH",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "blankcollar.vc — Pre-Seed für die KI-Ära",
    description: deDescription,
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

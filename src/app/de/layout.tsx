import type { Metadata } from "next";
import { siteSchemaJson } from "@/lib/siteSchema";

const deDescription =
  "blankcollar.ventures macht Gründer fundable für die KI-Ära — Wissen, AI-Operations, Upskilling und warme Intros zu den VCs, mit denen wir arbeiten. Wir schreiben den Cheque nicht; wir öffnen die Türen. Mit Sitz in der Schweiz, global tätig.";

export const metadata: Metadata = {
  title: "blankcollar.ventures — Wissen. AI. Zugang.",
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
    title: "blankcollar.ventures — Mach dein Startup fundable",
    description: deDescription,
    locale: "de_CH",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "blankcollar.ventures — Mach dein Startup fundable",
    description: deDescription,
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteSchemaJson }}
      />
      {children}
    </>
  );
}

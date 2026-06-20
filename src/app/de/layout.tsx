import type { Metadata } from "next";
import { siteSchemaJson } from "@/lib/siteSchema";

const deDescription =
  "blankcollar.ventures backt AI-Startups und hilft ihnen zu gewinnen: das Blank Collar Framework, unsere Operator-Erfahrung aus dem Bauen und Skalieren von Unternehmen, plus AI-Operations und Upskilling. Für Gründer und die VCs, mit denen wir arbeiten. Finanzierung ist ein Outcome, nicht das Angebot. Mit Sitz in der Schweiz, global tätig.";

export const metadata: Metadata = {
  title: "blankcollar.ventures: Wir helfen AI-Startups zu gewinnen.",
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
    title: "blankcollar.ventures: Wir helfen AI-Startups zu gewinnen",
    description: deDescription,
    locale: "de_CH",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "blankcollar.ventures: Wir helfen AI-Startups zu gewinnen",
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

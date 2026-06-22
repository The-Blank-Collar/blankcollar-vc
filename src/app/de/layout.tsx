import type { Metadata } from "next";
import { siteSchemaJson } from "@/lib/siteSchema";

const deDescription =
  "blankcollar.ventures ist der Operating Partner, der AI-Startups fundable macht: das Blank Collar Framework, Operator-Erfahrung, AI-Operations und Upskilling.";

export const metadata: Metadata = {
  title: { absolute: "blankcollar.ventures: Wir helfen AI-Startups zu gewinnen." },
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
    title: "blankcollar.ventures: Wir helfen AI-Startups zu gewinnen.",
    description: deDescription,
    locale: "de_CH",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "blankcollar.ventures: Wir helfen AI-Startups zu gewinnen.",
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

import type { Metadata } from "next";
import { siteSchemaJson } from "@/lib/siteSchema";

const deDescription =
  "blankcollar.ventures ist ein Gratis-Guide zum Blank Collar Framework für alle, die eine Firma gründen. Kein Fonds, und hier wird nichts verkauft.";

export const metadata: Metadata = {
  title: { absolute: "blankcollar.ventures: das Blank Collar Framework für Startups, gratis" },
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
    title: "blankcollar.ventures: das Blank Collar Framework für Startups, gratis",
    description: deDescription,
    locale: "de_CH",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "blankcollar.ventures: das Blank Collar Framework für Startups, gratis",
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

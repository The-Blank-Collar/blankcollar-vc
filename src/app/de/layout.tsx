import type { Metadata } from "next";

const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
})();

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

const orgJsonLdDe = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "blankcollar.vc",
  alternateName: ["blankcollar VC", "Blank Collar VC"],
  url: `${siteUrl}/de`,
  logo: `${siteUrl}/icon`,
  description: deDescription,
  slogan: "Kapital. Wissen. Agentic OS.",
  inLanguage: "de",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
  },
  areaServed: "Worldwide",
  sameAs: [
    "https://www.theblankcollar.com",
    "https://www.blankcollar.ai",
  ],
  knowsAbout: [
    "Pre-Seed Venture Capital",
    "KI-native Startups",
    "Agentisches OS",
    "Gründer-Enablement",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "blankcollar",
    url: "https://www.theblankcollar.com",
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLdDe) }}
      />
      {children}
    </>
  );
}

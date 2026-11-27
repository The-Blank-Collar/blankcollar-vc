import type { Metadata } from "next";
import { headers } from "next/headers";
import { Roboto, Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteSchemaJson } from "@/lib/siteSchema";

// blankcollar.ventures GA4 property 562355360.
const GA_ID = "G-D1JTL398VX";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Resolve the canonical base URL for this deployment.
// Priority: explicit NEXT_PUBLIC_SITE_URL > Vercel production .vercel.app
// > current Vercel deployment URL > localhost. This way OG images point at
// a domain that actually serves them, even before custom DNS is moved.
const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
})();

const enDescription =
  "blankcollar.ventures is a free guide to the Blank Collar Framework for people starting a company. It isn't a fund and nothing here is for sale.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "blankcollar.ventures: the Blank Collar Framework for startups, free",
    template: "%s · blankcollar.ventures",
  },
  description: enDescription,
  applicationName: "blankcollar.ventures",
  keywords: [
    "Blank Collar Framework",
    "startup guide",
    "free startup education",
    "AI in startups",
    "mental models for founders",
    "open-source agentic OS",
    "free business book",
    "blankcollar",
    "theblankcollar",
  ],
  authors: [{ name: "blankcollar.ventures" }],
  creator: "blankcollar.ventures",
  publisher: "blankcollar.ventures",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "blankcollar.ventures: the Blank Collar Framework for startups, free",
    description: enDescription,
    url: siteUrl,
    siteName: "blankcollar.ventures",
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_CH"],
  },
  twitter: {
    card: "summary_large_image",
    title: "blankcollar.ventures: the Blank Collar Framework for startups, free",
    description: enDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = (await headers()).get("x-pathname") || "";
  const lang = pathname.startsWith("/de") ? "de-CH" : "en";
  return (
    <html lang={lang} className={`${roboto.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteSchemaJson }}
        />
      </head>
      <body className="font-sans bg-bone text-ink antialiased">
        {children}
        <GoogleAnalytics gaId={GA_ID} />
        <Analytics />
      </body>
    </html>
  );
}

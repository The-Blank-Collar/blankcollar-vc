import type { Metadata } from "next";
import { headers } from "next/headers";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { siteSchemaJson } from "@/lib/siteSchema";

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
  "blankcollar.ventures is the operating partner that makes AI founders fundable: the Blank Collar framework, operator experience, AI ops and upskilling.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "blankcollar.ventures: We help AI startups win.",
    template: "%s · blankcollar.ventures",
  },
  description: enDescription,
  applicationName: "blankcollar.ventures",
  keywords: [
    "AI startups",
    "startup operating partner",
    "Blank Collar framework",
    "founder enablement",
    "AI operations",
    "agentic OS",
    "upskilling",
    "venture studio Switzerland",
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
    title: "blankcollar.ventures: We help AI startups win.",
    description: enDescription,
    url: siteUrl,
    siteName: "blankcollar.ventures",
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_CH"],
  },
  twitter: {
    card: "summary_large_image",
    title: "blankcollar.ventures: We help AI startups win.",
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
  category: "ventures platform",
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
      </body>
    </html>
  );
}

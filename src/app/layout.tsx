import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteSchemaJson } from "@/lib/siteSchema";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
  "Pre-seed VC for the AI era. Knowledge + agentic OS for every founder we back, plus up to CHF 50'000 in capital. Switzerland-based, global.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "blankcollar.vc — Capital. Knowledge. Agentic OS.",
    template: "%s · blankcollar.vc",
  },
  description: enDescription,
  applicationName: "blankcollar.vc",
  keywords: [
    "pre-seed VC",
    "AI VC",
    "Switzerland VC",
    "agentic OS",
    "startup investment",
    "founder fund",
    "blankcollar",
    "theblankcollar",
    "pre-seed Switzerland",
    "CHF 50000",
  ],
  authors: [{ name: "blankcollar.vc" }],
  creator: "blankcollar.vc",
  publisher: "blankcollar.vc",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "blankcollar.vc — Pre-seed for the AI era",
    description: enDescription,
    url: siteUrl,
    siteName: "blankcollar.vc",
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_CH"],
  },
  twitter: {
    card: "summary_large_image",
    title: "blankcollar.vc — Pre-seed for the AI era",
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
  category: "venture capital",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteSchemaJson }}
        />
      </head>
      <body className="font-sans bg-bone text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

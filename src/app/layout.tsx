import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Blank Collar VC — Capital. Knowledge. Agentic OS.",
  description:
    "A different kind of pre-seed VC, built for the AI era. Up to CHF 50'000, the knowledge to scale, and an agentic OS — three ways we work, we pick the right fit. Switzerland-based, global remit.",
  openGraph: {
    title: "Blank Collar VC",
    description:
      "Pre-seed for the AI era. Capital up to CHF 50'000, knowledge, and a free agentic OS — we pick the right fit.",
    url: siteUrl,
    siteName: "Blank Collar VC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blank Collar VC",
    description:
      "Pre-seed for the AI era. Capital up to CHF 50'000, knowledge, and a free agentic OS — we pick the right fit.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="font-sans bg-bone text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

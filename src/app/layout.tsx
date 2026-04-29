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
  title: "Blank Collar VC — Capital. Operators. Agentic OS.",
  description:
    "A different kind of pre-seed VC, built for the AI era. Up to CHF 50K, the knowledge to scale, and an agentic OS — choose the tier that fits your stage. Switzerland-based, global remit.",
  openGraph: {
    title: "Blank Collar VC",
    description:
      "Pre-seed for the AI era. Capital up to CHF 50K, knowledge, and a free agentic OS — pick the tier that fits.",
    url: siteUrl,
    siteName: "Blank Collar VC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blank Collar VC",
    description:
      "Pre-seed for the AI era. Capital up to CHF 50K, knowledge, and a free agentic OS — pick the tier that fits.",
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

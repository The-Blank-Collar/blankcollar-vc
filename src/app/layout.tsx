import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blankcollar.vc"),
  title: "Blank Collar VC — Capital. Operators. Agentic OS.",
  description:
    "A different kind of pre-seed VC. Up to $25K in capital, plus the operators and agentic OS to actually run and scale your business.",
  openGraph: {
    title: "Blank Collar VC",
    description:
      "Pre-seed capital up to $25K, plus operators and an agentic OS to scale your startup.",
    url: "https://www.blankcollar.vc",
    siteName: "Blank Collar VC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blank Collar VC",
    description:
      "Pre-seed capital up to $25K, plus operators and an agentic OS to scale your startup.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="grain font-sans bg-bone text-ink">{children}</body>
    </html>
  );
}

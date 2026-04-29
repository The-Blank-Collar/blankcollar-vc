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
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="font-sans bg-bone text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

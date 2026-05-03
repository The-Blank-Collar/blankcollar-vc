import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bewerben — blankcollar.vc",
  description:
    "Sag uns, was du baust. Wir antworten in maximal 14 Tagen — ja, nein, oder ein ehrlicher Grund warum.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/de/apply",
    languages: {
      en: "/apply",
      de: "/de/apply",
      "x-default": "/apply",
    },
  },
};

export default function DeApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply — blankcollar.ventures",
  description:
    "Tell us what you're building. We respond in 14 days, max — yes, no, or honest reason why.",
  // The application form is a transactional page — not a SERP target.
  // We want founders landing on /, not on the form itself.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/apply",
    languages: {
      en: "/apply",
      de: "/de/apply",
      "x-default": "/apply",
    },
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

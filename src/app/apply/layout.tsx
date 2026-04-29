import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply — Blank Collar VC",
  description:
    "Tell us what you're building. We respond in 14 days, max — yes, no, or honest reason why.",
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

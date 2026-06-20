"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
    </svg>
  );
}

// Compute the counterpart path + target-language label from the current lang.
function useToggle(basePath: string) {
  const lang = useLang();
  const enHref = basePath === "/" ? "/" : basePath;
  const deHref = basePath === "/" ? "/de" : `/de${basePath}`;
  // When on EN, target the German page; when on DE, target the English page.
  const href = lang === "en" ? deHref : enHref;
  const label = lang === "en" ? "DE" : "EN";
  const ariaLabel = lang === "en" ? "Auf Deutsch lesen" : "Read in English";
  return { href, label, ariaLabel };
}

export function LangSwitch({ basePath = "/" }: { basePath?: string }) {
  const { href, label, ariaLabel } = useToggle(basePath);
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1.5 px-2 py-1 font-bot text-[11px] uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-60"
    >
      <GlobeIcon />
      {label}
    </Link>
  );
}

export function LangSwitchDark({ basePath = "/" }: { basePath?: string }) {
  const { href, label, ariaLabel } = useToggle(basePath);
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1.5 px-2 py-1 font-bot text-[11px] uppercase tracking-[0.1em] text-bone transition-opacity hover:opacity-60"
    >
      <GlobeIcon />
      {label}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

export function LangSwitch({ basePath = "/" }: { basePath?: string }) {
  const lang = useLang();
  const enHref = basePath === "/" ? "/" : basePath;
  const deHref = basePath === "/" ? "/de" : `/de${basePath}`;
  return (
    <div className="flex items-center gap-1 font-bot text-[11px] uppercase tracking-mono">
      <Link
        href={enHref}
        className={`px-2 py-1 transition-colors ${
          lang === "en" ? "text-ink" : "text-ink/40 hover:text-ink/70"
        }`}
      >
        EN
      </Link>
      <span className="text-ink/20">/</span>
      <Link
        href={deHref}
        className={`px-2 py-1 transition-colors ${
          lang === "de" ? "text-ink" : "text-ink/40 hover:text-ink/70"
        }`}
      >
        DE
      </Link>
    </div>
  );
}

export function LangSwitchDark({ basePath = "/" }: { basePath?: string }) {
  const lang = useLang();
  const enHref = basePath === "/" ? "/" : basePath;
  const deHref = basePath === "/" ? "/de" : `/de${basePath}`;
  return (
    <div className="flex items-center gap-1 font-bot text-[11px] uppercase tracking-mono">
      <Link
        href={enHref}
        className={`px-2 py-1 transition-colors ${
          lang === "en" ? "text-bone" : "text-bone/40 hover:text-bone/70"
        }`}
      >
        EN
      </Link>
      <span className="text-bone/20">/</span>
      <Link
        href={deHref}
        className={`px-2 py-1 transition-colors ${
          lang === "de" ? "text-bone" : "text-bone/40 hover:text-bone/70"
        }`}
      >
        DE
      </Link>
    </div>
  );
}

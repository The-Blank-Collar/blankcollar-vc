"use client";

import { createContext, useContext, type ReactNode } from "react";
import { dict, type Dict } from "./dict";

export type Lang = "en" | "de";

const LangContext = createContext<Lang>("en");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useDict(): Dict {
  return dict[useContext(LangContext)];
}

// Swiss-rule number formatter: thousands separated by apostrophe.
// e.g. 50000 -> "50'000"
export function formatSwissNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

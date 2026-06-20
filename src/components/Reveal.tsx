"use client";

import {
  createElement,
  useEffect,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  /** horizontal start offset in px (default 0) */
  x?: number;
  /** vertical start offset in px (default 16) */
  y?: number;
  /** delay in seconds */
  delay?: number;
  /** duration in seconds (default 0.7) */
  duration?: number;
  style?: CSSProperties;
  [key: string]: unknown;
};

/**
 * A scroll-reveal element. Renders plain markup with `data-reveal` and CSS
 * custom properties - no hooks, no motion library - so it costs nothing at
 * hydration. The shared observer (see useRevealObserver) flips it visible
 * when it scrolls into view.
 */
export function Reveal({
  as = "div",
  children,
  className,
  x = 0,
  y = 16,
  delay = 0,
  duration,
  style,
  ...rest
}: RevealProps) {
  const vars: Record<string, string> = {
    "--rx": `${x}px`,
    "--ry": `${y}px`,
    "--rd": `${delay}s`,
  };
  if (duration != null) vars["--rdur"] = `${duration}s`;
  return createElement(
    as,
    {
      "data-reveal": "",
      className,
      style: { ...vars, ...style } as CSSProperties,
      ...rest,
    },
    children
  );
}

/**
 * Sets up a single IntersectionObserver for every reveal element on the page
 * and unveils each as it enters the viewport. Call once near the root of a
 * page. Re-runs on mount (so it works across client-side navigations).
 */
export function useRevealObserver() {
  useEffect(() => {
    const selector =
      "[data-reveal]:not([data-revealed]),[data-reveal-words]:not([data-revealed])";
    const els = Array.from(document.querySelectorAll(selector));
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

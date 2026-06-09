"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Smooth-scroll hijacking only helps on desktop pointer devices. On touch
  // screens the native momentum/overscroll is already the most fluid option,
  // and Lenis just adds latency + a rAF loop. We also bail out entirely for
  // anyone who prefers reduced motion. Defaults to native scroll until the
  // client decides, so there's no hydration mismatch and mobile never pays.
  const [smooth, setSmooth] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSmooth(fine && !reduced);
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Snappier than the previous 0.085 — that low a lerp feels floaty and
        // disconnected from the input. 0.1 keeps it smooth but responsive.
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

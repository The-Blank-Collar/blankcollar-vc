"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  className,
  format = (n: number) => n.toLocaleString(),
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      const start = performance.now();
      let raf = 0;
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(eased * to));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    };

    if (!("IntersectionObserver" in window)) return run();

    let cleanup: (() => void) | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          cleanup = run();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cleanup?.();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(val)}
      {suffix}
    </span>
  );
}

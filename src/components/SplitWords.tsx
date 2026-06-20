import type { CSSProperties } from "react";

/**
 * Word-by-word rising reveal, done entirely in CSS (see globals.css
 * .reveal-words). Each word is clipped and translated up, staggered via a
 * per-word `--i` index. No motion library - this used to create one motion
 * component per word (~89 across the page), which dominated hydration cost.
 *
 * `immediate` plays the reveal on load (above-the-fold hero text, so the LCP
 * paints without waiting for JS). Otherwise the shared IntersectionObserver
 * (useRevealObserver) triggers it when the heading scrolls into view.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.85,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  immediate?: boolean;
}) {
  const words = text.split(" ");
  const trigger = immediate
    ? { "data-revealed": "" }
    : { "data-reveal-words": "" };

  return (
    <span
      className={`reveal-words${className ? ` ${className}` : ""}`}
      {...trigger}
      style={
        {
          "--rwd": `${delay}s`,
          "--rws": `${stagger}s`,
          "--rw-dur": `${duration}s`,
        } as CSSProperties
      }
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="rw" style={{ "--i": i } as CSSProperties}>
          <span>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

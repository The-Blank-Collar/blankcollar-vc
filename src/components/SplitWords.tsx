"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useId } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.85,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };
  const child: Variants = {
    hidden: { y: reduce ? 0 : "115%", opacity: reduce ? 0 : 1 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduce ? 0.4 : duration, ease },
    },
  };

  const inner = (
    <motion.span
      key={id}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.06em]"
        >
          <motion.span variants={child} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );

  if (Tag === "span") return inner;
  const Wrapper = Tag as "div";
  return <Wrapper className={className}>{inner}</Wrapper>;
}

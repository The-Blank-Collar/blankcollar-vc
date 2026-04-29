"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  forwardRef,
  useRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
> & {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export const MagneticLink = forwardRef<HTMLAnchorElement, Props>(
  function MagneticLink({ children, strength = 0.3, className, ...rest }, _ref) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };
    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.a
        ref={ref}
        style={{ x: sx, y: sy }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={className}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }
);

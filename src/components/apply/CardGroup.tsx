"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export type CardOption<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
  icon?: ReactNode;
};

type SingleProps<T extends string> = {
  options: CardOption<T>[];
  value: T | "";
  onChange: (v: T) => void;
  multi?: false;
  cols?: 2 | 3 | 4;
  maxSelected?: never;
};

type MultiProps<T extends string> = {
  options: CardOption<T>[];
  value: T[];
  onChange: (v: T[]) => void;
  multi: true;
  cols?: 2 | 3 | 4;
  maxSelected?: number;
};

type Props<T extends string> = SingleProps<T> | MultiProps<T>;

const colClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function CardGroup<T extends string>(props: Props<T>) {
  const { options, cols = 2 } = props;

  const isSelected = (val: T): boolean => {
    if (props.multi) return props.value.includes(val);
    return props.value === val;
  };

  const toggle = (val: T) => {
    if (props.multi) {
      const cur = props.value;
      if (cur.includes(val)) {
        props.onChange(cur.filter((v) => v !== val));
      } else {
        if (props.maxSelected && cur.length >= props.maxSelected) {
          // Replace oldest
          props.onChange([...cur.slice(1), val]);
        } else {
          props.onChange([...cur, val]);
        }
      }
    } else {
      props.onChange(val);
    }
  };

  return (
    <div className={`grid gap-3 ${colClass[cols]}`}>
      {options.map((opt, i) => {
        const selected = isSelected(opt.value);
        return (
          <m.button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: i * 0.03 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors ${
              selected
                ? "border-accent bg-accent/15 text-bone"
                : "border-bone/15 bg-bone/[0.03] text-bone/85 hover:border-bone/30 hover:bg-bone/[0.06]"
            }`}
          >
            {opt.icon && (
              <div
                className={`mb-1 transition-colors ${
                  selected ? "text-accent" : "text-bone/55 group-hover:text-bone/80"
                }`}
              >
                {opt.icon}
              </div>
            )}
            <div className="font-medium text-[15px] leading-snug">{opt.label}</div>
            {opt.description && (
              <div className={`text-[12px] leading-relaxed ${selected ? "text-bone/75" : "text-bone/50"}`}>
                {opt.description}
              </div>
            )}
            <span
              aria-hidden
              className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border transition-all ${
                selected
                  ? "border-accent bg-accent text-ink"
                  : "border-bone/20 text-transparent"
              }`}
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                <path
                  d="M2.5 6.2l2.4 2.3L9.5 3.7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </m.button>
        );
      })}
    </div>
  );
}

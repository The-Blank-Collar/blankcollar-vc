"use client";

import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
  forwardRef,
} from "react";

type FieldProps = {
  label: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  error?: string;
};

export function Field({ label, hint, optional, error, children }: FieldProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-bot text-[11px] uppercase tracking-mono text-bone/60">
          {label}
          {optional && <span className="ml-2 normal-case tracking-normal text-bone/35">optional</span>}
        </span>
        {error && <span className="text-[11px] text-red-300">{error}</span>}
      </div>
      {children}
      {hint && !error && (
        <p className="mt-2 text-[12px] text-bone/45">{hint}</p>
      )}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onEnterContinue?: () => void;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ onEnterContinue, onKeyDown, className = "", ...rest }, ref) {
    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnterContinue && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onEnterContinue();
      }
      onKeyDown?.(e);
    };
    return (
      <input
        ref={ref}
        onKeyDown={handleKey}
        className={
          "w-full rounded-xl border border-bone/15 bg-bone/[0.04] px-4 py-3.5 text-lg text-bone placeholder:text-bone/30 outline-none transition-all focus:border-accent/60 focus:bg-bone/[0.07] focus:ring-2 focus:ring-accent/30 " +
          className
        }
        {...rest}
      />
    );
  }
);

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  onEnterContinue?: () => void;
  maxChars?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { onEnterContinue, onKeyDown, maxChars, className = "", value, ...rest },
    ref
  ) {
    const len = typeof value === "string" ? value.length : 0;
    const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (onEnterContinue && e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onEnterContinue();
      }
      onKeyDown?.(e);
    };
    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onKeyDown={handleKey}
          className={
            "w-full resize-none rounded-xl border border-bone/15 bg-bone/[0.04] px-4 py-3.5 text-base text-bone placeholder:text-bone/30 outline-none transition-all focus:border-accent/60 focus:bg-bone/[0.07] focus:ring-2 focus:ring-accent/30 " +
            className
          }
          {...rest}
        />
        {maxChars && (
          <div className="pointer-events-none absolute bottom-2 right-3 font-bot text-[10px] tracking-mono text-bone/40 tabular">
            {len}/{maxChars}
          </div>
        )}
      </div>
    );
  }
);

type RadioGroupProps<T extends string> = {
  value: T | "";
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
};

export function RadioGroup<T extends string>({
  value,
  onChange,
  options,
}: RadioGroupProps<T>) {
  return (
    <div className="grid gap-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-base transition-all ${
              selected
                ? "border-accent/70 bg-accent/15 text-bone"
                : "border-bone/15 bg-bone/[0.03] text-bone/80 hover:border-bone/30 hover:bg-bone/[0.05]"
            }`}
          >
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border ${
                selected ? "border-accent" : "border-bone/35"
              }`}
            >
              {selected && (
                <span className="h-2 w-2 rounded-full bg-accent" />
              )}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

type FileDropProps = {
  file: File | null;
  onFile: (f: File | null) => void;
  accept?: string;
  maxBytes?: number;
};

export function FileDrop({ file, onFile, accept = ".pdf,.ppt,.pptx,.key", maxBytes = 25 * 1024 * 1024 }: FileDropProps) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.size > maxBytes) {
      alert("File must be under 25 MB");
      return;
    }
    onFile(f);
  };
  return (
    <div className="rounded-xl border border-dashed border-bone/25 bg-bone/[0.03] p-6 transition-colors hover:border-bone/40">
      {file ? (
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="truncate font-medium text-bone">{file.name}</div>
            <div className="font-bot text-[11px] uppercase tracking-mono text-bone/45">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </div>
          </div>
          <button
            type="button"
            onClick={() => onFile(null)}
            className="font-bot text-[11px] uppercase tracking-mono text-bone/60 hover:text-bone"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-start gap-2">
          <span className="font-medium text-bone">Upload a deck or one-pager</span>
          <span className="text-[12px] text-bone/45">PDF, PPT, PPTX, KEY · up to 25 MB</span>
          <input
            type="file"
            accept={accept}
            onChange={handle}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

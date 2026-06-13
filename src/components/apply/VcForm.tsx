"use client";

import { useState } from "react";
import { Field, Input, Textarea } from "./Inputs";
import { useDict, useLang } from "@/lib/lang";

type VcData = {
  fundName: string;
  yourName: string;
  email: string;
  relationship: string;
  company: string;
  founder: string;
  why: string;
};

const empty: VcData = {
  fundName: "",
  yourName: "",
  email: "",
  relationship: "",
  company: "",
  founder: "",
  why: "",
};

// Lightweight VC / fund intake — funds bring us a portfolio (or pipeline) AI
// company to work with. Posts to the same /api/apply route with kind=vc.
export function VcForm() {
  const t = useDict();
  const lang = useLang();
  const c = t.apply.vc;
  const [data, setData] = useState<VcData>(empty);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof VcData, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setError(null);
  };

  const submit = async () => {
    const v = c.validation;
    if (!data.fundName.trim()) return setError(v.fund);
    if (!data.yourName.trim()) return setError(v.name);
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return setError(v.email);
    if (!data.company.trim()) return setError(v.company);
    if (!data.why.trim()) return setError(v.why);

    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("kind", "vc");
      fd.append("lang", lang);
      (Object.entries(data) as [keyof VcData, string][]).forEach(([k, val]) => {
        if (val) fd.append(k, val);
      });
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl pt-6">
        <div className="mb-6 flex items-center gap-3 font-bot text-[11px] uppercase tracking-mono text-accent">
          <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent" />
          {c.thanks}
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-bone/75">{c.body}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-3 text-3xl font-medium tracking-tighter text-bone md:text-4xl">{c.title}</h1>
      <p className="mb-10 text-bone/65">{c.sub}</p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label={c.fundName.label}>
          <Input placeholder={c.fundName.placeholder} value={data.fundName} onChange={(e) => set("fundName", e.target.value)} autoFocus />
        </Field>
        <Field label={c.yourName.label}>
          <Input placeholder={c.yourName.placeholder} value={data.yourName} onChange={(e) => set("yourName", e.target.value)} />
        </Field>
        <Field label={c.email.label}>
          <Input type="email" placeholder={c.email.placeholder} value={data.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label={c.relationship.label} hint={c.relationship.hint} optional>
          <Input value={data.relationship} onChange={(e) => set("relationship", e.target.value)} />
        </Field>
        <div className="md:col-span-2">
          <Field label={c.company.label} hint={c.company.hint}>
            <Input placeholder={c.company.placeholder} value={data.company} onChange={(e) => set("company", e.target.value)} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label={c.founder.label} hint={c.founder.hint} optional>
            <Input placeholder={c.founder.placeholder} value={data.founder} onChange={(e) => set("founder", e.target.value)} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label={c.why.label} hint={c.why.hint}>
            <Textarea rows={5} value={data.why} onChange={(e) => set("why", e.target.value)} maxChars={700} />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        {error && <span className="text-[13px] text-red-300">{error}</span>}
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="rounded-full bg-accent px-7 py-3.5 font-bot text-[12px] uppercase tracking-mono text-ink transition-colors hover:bg-accent/85 disabled:opacity-50"
        >
          {submitting ? t.common.sending : c.submit}
        </button>
      </div>
    </div>
  );
}

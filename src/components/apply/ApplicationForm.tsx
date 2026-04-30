"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Field, FileDrop, Input, RadioGroup, Textarea } from "./Inputs";
import {
  type ApplicationData,
  type TierId,
  initialData,
  stageLabels,
  workedTogetherLabels,
} from "./types";

const ease = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = "bc-vc-application-v1";

type Section = {
  id: string;
  label: string;
  steps: number;
};

const sections: Section[] = [
  { id: "you", label: "You", steps: 2 },
  { id: "team", label: "Team", steps: 1 },
  { id: "company", label: "Company", steps: 2 },
  { id: "vision", label: "Vision", steps: 2 },
  { id: "ask", label: "Ask", steps: 2 },
  { id: "materials", label: "Materials", steps: 2 },
  { id: "review", label: "Review", steps: 1 },
];

const totalSteps = sections.reduce((s, x) => s + x.steps, 0);

type StepConfig = {
  section: string;
  render: (ctx: StepContext) => ReactNode;
  validate?: (data: ApplicationData) => string | null;
  feedback?: string;
};

type StepContext = {
  data: ApplicationData;
  set: <K extends keyof ApplicationData>(k: K, v: ApplicationData[K]) => void;
  next: () => void;
  back: () => void;
  go: (i: number) => void;
};

const steps: StepConfig[] = [
  // Section: You
  {
    section: "you",
    feedback: "Got it. Quick basics, then we get into the interesting stuff.",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field label="Your name">
          <Input
            placeholder="Jane Doe"
            value={data.founderName}
            onChange={(e) => set("founderName", e.target.value)}
            onEnterContinue={next}
            autoFocus
          />
        </Field>
        <Field label="Email" hint="We'll use this for everything from here.">
          <Input
            type="email"
            placeholder="jane@yourstartup.com"
            value={data.founderEmail}
            onChange={(e) => set("founderEmail", e.target.value)}
            onEnterContinue={next}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.founderName.trim()
        ? "Tell us your name"
        : !/^\S+@\S+\.\S+$/.test(d.founderEmail)
        ? "Email looks off"
        : null,
  },
  {
    section: "you",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field label="Your role">
          <Input
            placeholder="CEO, CTO, Founder…"
            value={data.founderRole}
            onChange={(e) => set("founderRole", e.target.value)}
            onEnterContinue={next}
            autoFocus
          />
        </Field>
        <Field label="Where are you based" hint="City, country.">
          <Input
            placeholder="Zurich, CH"
            value={data.founderLocation}
            onChange={(e) => set("founderLocation", e.target.value)}
            onEnterContinue={next}
          />
        </Field>
        <Field label="LinkedIn" optional>
          <Input
            placeholder="https://linkedin.com/in/…"
            value={data.founderLinkedin}
            onChange={(e) => set("founderLinkedin", e.target.value)}
            onEnterContinue={next}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.founderRole.trim()
        ? "Add your role"
        : !d.founderLocation.trim()
        ? "Where are you based?"
        : null,
  },

  // Section: Team
  {
    section: "team",
    feedback:
      "Two-time-collaborators outperform first-time pairs ~3:1 in pre-seed. Doesn't disqualify anyone — just useful colour.",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field
          label="Tell us about your team"
          hint="Co-founders, key roles, who's full-time. One line each."
        >
          <Textarea
            rows={5}
            placeholder={"e.g.\nJane — CEO, ex-Stripe (FT)\nMarc — CTO, ex-Google (FT)\nWe're hiring a designer."}
            value={data.teamDescription}
            onChange={(e) => set("teamDescription", e.target.value)}
            onEnterContinue={next}
            maxChars={600}
            autoFocus
          />
        </Field>
        <Field label="How long have you worked together?">
          <RadioGroup
            value={data.workedTogether}
            onChange={(v) => set("workedTogether", v)}
            options={(Object.entries(workedTogetherLabels) as [keyof typeof workedTogetherLabels, string][]).map(
              ([value, label]) => ({ value, label })
            )}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.teamDescription.trim()
        ? "Tell us about the team"
        : !d.workedTogether
        ? "Pick one"
        : null,
  },

  // Section: Company
  {
    section: "company",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field label="Company name">
          <Input
            placeholder="Stripe, Linear, …"
            value={data.companyName}
            onChange={(e) => set("companyName", e.target.value)}
            onEnterContinue={next}
            autoFocus
          />
        </Field>
        <Field label="Website" optional>
          <Input
            placeholder="https://yourstartup.com"
            value={data.companyWebsite}
            onChange={(e) => set("companyWebsite", e.target.value)}
            onEnterContinue={next}
          />
        </Field>
        <Field label="Stage">
          <RadioGroup
            value={data.companyStage}
            onChange={(v) => set("companyStage", v)}
            options={(Object.entries(stageLabels) as [keyof typeof stageLabels, string][]).map(([value, label]) => ({ value, label }))}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.companyName.trim()
        ? "Company name"
        : !d.companyStage
        ? "Pick a stage"
        : null,
  },
  {
    section: "company",
    render: ({ data, set, next }) => (
      <Field
        label="One-line elevator pitch"
        hint="If a stranger had to repeat it back to a friend, what would they say?"
      >
        <Textarea
          rows={3}
          placeholder='e.g. "Stripe for cross-border payroll in Africa."'
          value={data.oneLiner}
          onChange={(e) => set("oneLiner", e.target.value)}
          onEnterContinue={next}
          maxChars={140}
          autoFocus
        />
      </Field>
    ),
    validate: (d) => (!d.oneLiner.trim() ? "Give us the one-liner" : null),
  },

  // Section: Vision
  {
    section: "vision",
    feedback:
      "Strong problem statements punch above their weight in our process. Spend two extra minutes here.",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field
          label="The problem"
          hint="In plain English. What's broken, and why hasn't it been fixed yet?"
        >
          <Textarea
            rows={5}
            value={data.problem}
            onChange={(e) => set("problem", e.target.value)}
            onEnterContinue={next}
            maxChars={800}
            autoFocus
          />
        </Field>
        <Field label="Who has this problem" hint="Be specific about the customer.">
          <Textarea
            rows={3}
            placeholder="e.g. 'CFOs at Series A SaaS companies in Europe with 20–80 employees'"
            value={data.customer}
            onChange={(e) => set("customer", e.target.value)}
            onEnterContinue={next}
            maxChars={400}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.problem.trim()
        ? "Describe the problem"
        : !d.customer.trim()
        ? "Who has this problem?"
        : null,
  },
  {
    section: "vision",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field label="Your solution" hint="What are you building, in simple terms?">
          <Textarea
            rows={5}
            value={data.solution}
            onChange={(e) => set("solution", e.target.value)}
            onEnterContinue={next}
            maxChars={800}
            autoFocus
          />
        </Field>
        <Field
          label="What's different"
          hint="Why now? Why you? Why won't the obvious incumbent crush you?"
        >
          <Textarea
            rows={4}
            value={data.differentiator}
            onChange={(e) => set("differentiator", e.target.value)}
            onEnterContinue={next}
            maxChars={600}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.solution.trim()
        ? "What are you building?"
        : !d.differentiator.trim()
        ? "What's different?"
        : null,
  },

  // Section: Ask
  {
    section: "ask",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field
          label="How many customer conversations have you had?"
          hint="A number is fine. Zero is also a fine answer — we just want the truth."
        >
          <Input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 27"
            value={data.customerInterviews}
            onChange={(e) => set("customerInterviews", e.target.value)}
            onEnterContinue={next}
            autoFocus
          />
        </Field>
        <Field
          label="Any traction so far"
          hint="Revenue, signups, design partners, LOIs, waitlist, GitHub stars — anything real."
          optional
        >
          <Textarea
            rows={4}
            value={data.traction}
            onChange={(e) => set("traction", e.target.value)}
            onEnterContinue={next}
            maxChars={600}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.customerInterviews.trim() ? "How many conversations?" : null,
  },
  {
    section: "ask",
    feedback:
      "We can move within 14 days from this point — assuming the basics check out.",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field label="How much are you raising in this round" hint="Total round, not just our cheque.">
          <Input
            placeholder="e.g. CHF 250'000"
            value={data.raisingAmount}
            onChange={(e) => set("raisingAmount", e.target.value)}
            onEnterContinue={next}
            autoFocus
          />
        </Field>
        <Field label="What will the money do" hint="Top 3 line items.">
          <Textarea
            rows={4}
            value={data.useOfFunds}
            onChange={(e) => set("useOfFunds", e.target.value)}
            onEnterContinue={next}
            maxChars={500}
          />
        </Field>
        <Field label="Why Blank Collar specifically" hint="No wrong answer. Just be honest.">
          <Textarea
            rows={4}
            value={data.whyUs}
            onChange={(e) => set("whyUs", e.target.value)}
            onEnterContinue={next}
            maxChars={500}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.raisingAmount.trim()
        ? "Raise amount"
        : !d.useOfFunds.trim()
        ? "Use of funds"
        : !d.whyUs.trim()
        ? "Tell us why"
        : null,
  },

  // Section: Materials
  {
    section: "materials",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field
          label="Pitch deck link"
          hint="Notion, Pitch, Google Slides, Loom — whatever you've got. We'll review it."
          optional
        >
          <Input
            placeholder="https://…"
            value={data.pitchDeckLink}
            onChange={(e) => set("pitchDeckLink", e.target.value)}
            onEnterContinue={next}
            autoFocus
          />
        </Field>
        <Field label="Product / demo link" optional>
          <Input
            placeholder="https://…"
            value={data.productLink}
            onChange={(e) => set("productLink", e.target.value)}
            onEnterContinue={next}
          />
        </Field>
      </div>
    ),
  },
  {
    section: "materials",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field
          label="Anything else we should know"
          hint="Risks, weird advantages, things you're worried about — all useful."
          optional
        >
          <Textarea
            rows={6}
            value={data.somethingElse}
            onChange={(e) => set("somethingElse", e.target.value)}
            onEnterContinue={next}
            maxChars={1000}
            autoFocus
          />
        </Field>
      </div>
    ),
  },

  // Section: Review
  {
    section: "review",
    render: () => null, // handled inline by ReviewStep
  },
];

const sectionForStep = (i: number): Section => {
  let count = 0;
  for (const sec of sections) {
    count += sec.steps;
    if (i < count) return sec;
  }
  return sections[sections.length - 1];
};

const stepWithinSection = (i: number): number => {
  let count = 0;
  for (const sec of sections) {
    if (i < count + sec.steps) return i - count;
    count += sec.steps;
  }
  return 0;
};

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ApplicationData>(initialData);
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedTick, setSavedTick] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage + URL ?tier= param
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const persisted = raw ? (JSON.parse(raw) as Partial<ApplicationData>) : {};
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get("tier");
      const validTiers: TierId[] = ["os-pass", "full-stack", "cheque"];
      const tierFromUrl = validTiers.includes(tierParam as TierId)
        ? (tierParam as TierId)
        : null;
      setData((prev) => ({
        ...prev,
        ...persisted,
        ...(tierFromUrl ? { tier: tierFromUrl } : {}),
      }));
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedTick((t) => t + 1);
    } catch {
      // ignore
    }
  }, [data]);

  const set = useCallback(
    <K extends keyof ApplicationData>(k: K, v: ApplicationData[K]) => {
      setData((d) => ({ ...d, [k]: v }));
      setError(null);
    },
    []
  );

  const totalScreens = steps.length + 1; // +1 for confirmation

  const next = useCallback(() => {
    const cur = steps[step];
    const validate = cur?.validate;
    if (validate) {
      const err = validate(data);
      if (err) {
        setError(err);
        return;
      }
    }
    setError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [step, data]);

  const back = useCallback(() => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const go = useCallback((i: number) => {
    setError(null);
    setStep(i);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (typeof v === "string" && v) fd.append(k, v);
      });
      if (pitchDeckFile) fd.append("pitchDeck", pitchDeckFile);

      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong");
      }
      setSubmitted(true);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  }, [data, pitchDeckFile]);

  const ctx: StepContext = useMemo(
    () => ({ data, set, next, back, go }),
    [data, set, next, back, go]
  );

  const currentSection = sectionForStep(step);
  const currentStepInSection = stepWithinSection(step);
  const overallProgress = ((step + 1) / totalScreens) * 100;
  const cur = steps[step];

  if (submitted) {
    return (
      <Confirmation
        founderName={data.founderName}
        companyName={data.companyName}
        founderEmail={data.founderEmail}
      />
    );
  }

  return (
    <div ref={formRef} className="relative">
      {/* Top progress + section indicator */}
      <div className="sticky top-0 z-30 -mx-6 mb-10 border-b border-bone/10 bg-ink/85 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center gap-6">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between font-bot text-[11px] uppercase tracking-mono text-bone/60">
              <span>
                {currentSection.label}
                {currentSection.steps > 1 && (
                  <span className="text-bone/35"> · {currentStepInSection + 1}/{currentSection.steps}</span>
                )}
              </span>
              <span className="tabular">
                Step {step + 1} of {totalScreens}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-bone/10">
              <motion.div
                className="h-full bg-accent"
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
          </div>
          <SavedDot tick={savedTick} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {cur?.section === "review" ? (
            <ReviewStep
              key="review"
              data={data}
              pitchDeckFile={pitchDeckFile}
              setPitchDeckFile={setPitchDeckFile}
              go={go}
              back={back}
              submit={submit}
              submitting={submitting}
              submitError={submitError}
            />
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <SectionTitle section={currentSection.label} step={step} />
              {cur?.render(ctx)}
              {cur?.feedback && <FeedbackBubble text={cur.feedback} />}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="font-bot text-[12px] uppercase tracking-mono text-bone/60 transition-colors hover:text-bone disabled:opacity-30"
                >
                  ← Back
                </button>
                <div className="flex items-center gap-4">
                  {error && (
                    <span className="text-[13px] text-red-300">{error}</span>
                  )}
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full bg-accent px-7 py-3 font-bot text-[12px] uppercase tracking-mono text-ink transition-colors hover:bg-accent/85"
                  >
                    Continue →
                  </button>
                </div>
              </div>
              <div className="mt-3 text-right font-bot text-[10px] uppercase tracking-mono text-bone/35">
                Press <kbd className="rounded border border-bone/15 px-1.5 py-0.5">Enter</kbd> to continue
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionTitle({ section, step }: { section: string; step: number }) {
  const titles: Record<string, string[]> = {
    You: ["Tell us who you are.", "Where you live, where to find you."],
    Team: ["Who's building this with you?"],
    Company: ["The company.", "If a stranger had to summarise it…"],
    Vision: ["The problem you're solving.", "What you're building, and why."],
    Ask: ["Customers — real or imagined.", "The cheque, and what it'll do."],
    Materials: ["Show us what you've got.", "Anything else we should know?"],
    Review: ["Look it over."],
  };
  const stepInSec = stepWithinSection(step);
  const t = titles[section]?.[stepInSec] || section;
  return (
    <h1 className="mb-8 text-3xl font-medium tracking-tighter text-bone md:text-4xl">
      {t}
    </h1>
  );
}

function SavedDot({ tick }: { tick: number }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (tick === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [tick]);
  return (
    <div className="hidden items-center gap-2 font-bot text-[10px] uppercase tracking-mono text-bone/45 sm:flex">
      <motion.span
        animate={pulse ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
        className="block h-1.5 w-1.5 rounded-full bg-accent"
      />
      Saved
    </div>
  );
}

function FeedbackBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.3 }}
      className="mt-6 flex gap-3 rounded-2xl border border-accent/30 bg-accent/[0.06] px-4 py-3.5"
    >
      <span className="mt-0.5 h-4 w-4 shrink-0">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="3" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" className="text-accent" />
          <circle cx="6" cy="7.5" r="1" fill="currentColor" className="text-accent" />
          <circle cx="10" cy="7.5" r="1" fill="currentColor" className="text-accent" />
          <line x1="8" y1="3" x2="8" y2="1.5" stroke="currentColor" strokeWidth="1.4" className="text-accent" />
        </svg>
      </span>
      <div className="text-[13.5px] leading-relaxed text-bone/85">
        <span className="font-bot text-[10px] uppercase tracking-mono text-accent">
          agent.review ●
        </span>
        <span className="ml-2">{text}</span>
      </div>
    </motion.div>
  );
}

type ReviewProps = {
  data: ApplicationData;
  pitchDeckFile: File | null;
  setPitchDeckFile: (f: File | null) => void;
  go: (i: number) => void;
  back: () => void;
  submit: () => void;
  submitting: boolean;
  submitError: string | null;
};

const reviewGroups: { title: string; goto: number; rows: { k: string; key: keyof ApplicationData }[] }[] = [
  {
    title: "You",
    goto: 0,
    rows: [
      { k: "Name", key: "founderName" },
      { k: "Email", key: "founderEmail" },
      { k: "Role", key: "founderRole" },
      { k: "Location", key: "founderLocation" },
      { k: "LinkedIn", key: "founderLinkedin" },
    ],
  },
  {
    title: "Team",
    goto: 2,
    rows: [
      { k: "Team", key: "teamDescription" },
      { k: "Worked together", key: "workedTogether" },
    ],
  },
  {
    title: "Company",
    goto: 3,
    rows: [
      { k: "Name", key: "companyName" },
      { k: "Website", key: "companyWebsite" },
      { k: "Stage", key: "companyStage" },
      { k: "One-liner", key: "oneLiner" },
    ],
  },
  {
    title: "Vision",
    goto: 5,
    rows: [
      { k: "Problem", key: "problem" },
      { k: "Customer", key: "customer" },
      { k: "Solution", key: "solution" },
      { k: "Differentiator", key: "differentiator" },
    ],
  },
  {
    title: "Ask",
    goto: 7,
    rows: [
      { k: "Customer convos", key: "customerInterviews" },
      { k: "Traction", key: "traction" },
      { k: "Raising", key: "raisingAmount" },
      { k: "Use of funds", key: "useOfFunds" },
      { k: "Why us", key: "whyUs" },
    ],
  },
  {
    title: "Materials",
    goto: 10,
    rows: [
      { k: "Pitch deck link", key: "pitchDeckLink" },
      { k: "Product link", key: "productLink" },
      { k: "Other", key: "somethingElse" },
    ],
  },
];

function ReviewStep({
  data,
  pitchDeckFile,
  setPitchDeckFile,
  go,
  back,
  submit,
  submitting,
  submitError,
}: ReviewProps) {
  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease }}
    >
      <h1 className="mb-3 text-3xl font-medium tracking-tighter text-bone md:text-4xl">
        Look it over.
      </h1>
      <p className="mb-10 text-bone/65">
        Last chance to edit anything. Add your pitch deck if you have one.
      </p>

      <div className="mb-10 grid gap-5">
        <Field label="Pitch deck (file upload)" optional>
          <FileDrop file={pitchDeckFile} onFile={setPitchDeckFile} />
        </Field>
      </div>

      <div className="space-y-6">
        {reviewGroups.map((g) => (
          <div
            key={g.title}
            className="rounded-2xl border border-bone/10 bg-bone/[0.03]"
          >
            <div className="flex items-center justify-between border-b border-bone/10 px-5 py-3.5">
              <h3 className="font-bot text-[11px] uppercase tracking-mono text-bone/60">
                {g.title}
              </h3>
              <button
                type="button"
                onClick={() => go(g.goto)}
                className="font-bot text-[11px] uppercase tracking-mono text-accent hover:text-accent/80"
              >
                Edit →
              </button>
            </div>
            <dl className="divide-y divide-bone/10">
              {g.rows.map((r) => {
                const v = data[r.key] || "—";
                const display =
                  r.key === "workedTogether" && data.workedTogether
                    ? workedTogetherLabels[data.workedTogether]
                    : r.key === "companyStage" && data.companyStage
                    ? stageLabels[data.companyStage]
                    : v;
                return (
                  <div key={r.key} className="grid grid-cols-12 gap-3 px-5 py-3.5 text-[14px]">
                    <dt className="col-span-12 font-bot text-[11px] uppercase tracking-mono text-bone/50 md:col-span-3">
                      {r.k}
                    </dt>
                    <dd className="col-span-12 whitespace-pre-line text-bone/85 md:col-span-9">
                      {display}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          className="font-bot text-[12px] uppercase tracking-mono text-bone/60 transition-colors hover:text-bone"
        >
          ← Back
        </button>
        <div className="flex items-center gap-4">
          {submitError && (
            <span className="text-[13px] text-red-300">{submitError}</span>
          )}
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-full bg-accent px-7 py-3.5 font-bot text-[12px] uppercase tracking-mono text-ink transition-colors hover:bg-accent/85 disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Submit application →"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Confirmation({
  founderName,
  companyName,
  founderEmail,
}: {
  founderName: string;
  companyName: string;
  founderEmail: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="mx-auto max-w-3xl pt-10"
    >
      <div className="mb-10 flex items-center gap-3 font-bot text-[11px] uppercase tracking-mono text-accent">
        <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent" />
        Application received
      </div>
      <h1 className="text-4xl font-medium tracking-tighter text-bone md:text-6xl">
        Thanks, {founderName.split(" ")[0] || "founder"}.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-bone/75 leading-relaxed">
        We&apos;ve got your application for <strong>{companyName || "your company"}</strong>.
        A confirmation has been sent to{" "}
        <span className="font-bot text-accent">{founderEmail}</span>.
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-3">
        {[
          {
            n: "Day 1–3",
            label: "Read",
            body: "We read every application. No deck templates, no bots scoring you.",
          },
          {
            n: "Day 3–10",
            label: "Conversation",
            body: "If there's signal, we'll book a 30-min call. Camera optional.",
          },
          {
            n: "Day 14",
            label: "Decision",
            body: "Yes / no / honest reason. If yes, paperwork starts the next morning.",
          },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.08 }}
            className="bg-ink p-6 md:p-7"
          >
            <div className="font-bot text-[11px] uppercase tracking-mono text-bone/45">
              {s.n}
            </div>
            <div className="mt-2 text-xl font-medium tracking-tighter text-bone">
              {s.label}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-bone/65">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <a
          href="https://www.theblankcollar.com"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-2xl border border-bone/15 p-5 transition-colors hover:bg-bone/[0.04]"
        >
          <div className="font-bot text-[11px] uppercase tracking-mono text-bone/50">
            While you wait — 01
          </div>
          <div className="mt-2 text-lg font-medium text-bone">theblankcollar.com</div>
          <p className="mt-1 text-[13px] text-bone/60">
            See the knowledge layer in action.
          </p>
        </a>
        <a
          href="https://www.blankcollar.ai"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-2xl border border-bone/15 p-5 transition-colors hover:bg-bone/[0.04]"
        >
          <div className="font-bot text-[11px] uppercase tracking-mono text-bone/50">
            While you wait — 02
          </div>
          <div className="mt-2 text-lg font-medium text-bone">blankcollar.ai</div>
          <p className="mt-1 text-[13px] text-bone/60">
            Browse the agentic OS we&apos;ll set up for you.
          </p>
        </a>
        <a
          href="/#portfolio"
          className="group flex flex-col rounded-2xl border border-bone/15 p-5 transition-colors hover:bg-bone/[0.04]"
        >
          <div className="font-bot text-[11px] uppercase tracking-mono text-bone/50">
            While you wait — 03
          </div>
          <div className="mt-2 text-lg font-medium text-bone">Portfolio</div>
          <p className="mt-1 text-[13px] text-bone/60">
            Founders we&apos;ve already helped.
          </p>
        </a>
      </div>

      <div className="mt-12 rounded-2xl border border-bone/10 bg-bone/[0.03] p-5 text-[13.5px] leading-relaxed text-bone/65">
        <span className="font-bot text-[10px] uppercase tracking-mono text-accent">
          agent.review ●
        </span>{" "}
        If anything urgent comes up, just reply to the confirmation email. It
        comes from a real human inbox.
      </div>
    </motion.div>
  );
}

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
import { Field, FileDrop, Input, Textarea } from "./Inputs";
import { CardGroup, type CardOption } from "./CardGroup";
import { useDict } from "@/lib/lang";
import {
  type ApplicationData,
  type BiggestRisk,
  type HelpFit,
  type InterviewRange,
  type Sector,
  type Stage,
  type Superpower,
  type TierId,
  type WorkedTogether,
  biggestRiskLabels,
  helpFitLabels,
  initialData,
  interviewRangeLabels,
  sectorLabels,
  stageLabels,
  superpowerLabels,
  workedTogetherLabels,
} from "./types";

const ease = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = "bc-vc-application-v2";

// ----- Card option presets ------------------------------------------------

const stageCards: CardOption<Stage>[] = [
  {
    value: "pre-incorporation",
    label: "Pre-incorporation",
    description: "Just an idea, maybe a prototype.",
    icon: <GlyphSeed />,
  },
  {
    value: "incorporated",
    label: "Incorporated, pre-revenue",
    description: "Company exists, building toward first dollar.",
    icon: <GlyphSprout />,
  },
  {
    value: "first-revenue",
    label: "First revenue",
    description: "Real customers, real (small) money.",
    icon: <GlyphCoin />,
  },
  {
    value: "scaling",
    label: "Scaling",
    description: "Repeatable revenue, hiring, picking up speed.",
    icon: <GlyphRocket />,
  },
];

const workedTogetherCards: CardOption<WorkedTogether>[] = [
  { value: "first-time", label: "First time", description: "We just teamed up." },
  { value: "less-than-6m", label: "< 6 months", description: "Early days together." },
  { value: "6m-to-2y", label: "6 months – 2 years", description: "Tested under fire." },
  { value: "over-2y", label: "2+ years", description: "We've been through it." },
];

const sectorCards: CardOption<Sector>[] = [
  { value: "ai-ml", label: "AI / ML", icon: <GlyphAi /> },
  { value: "fintech", label: "Fintech", icon: <GlyphCoin /> },
  { value: "healthtech", label: "Healthtech", icon: <GlyphHeart /> },
  { value: "climate", label: "Climate", icon: <GlyphLeaf /> },
  { value: "devtools", label: "Dev Tools", icon: <GlyphCode /> },
  { value: "consumer", label: "Consumer", icon: <GlyphPhone /> },
  { value: "b2b-saas", label: "B2B SaaS", icon: <GlyphLayers /> },
  { value: "other", label: "Other", icon: <GlyphSpark /> },
];

const superpowerCards: CardOption<Superpower>[] = [
  { value: "story", label: "Storytelling", description: "I sell the vision. People follow." },
  { value: "tech", label: "Engineering", description: "I ship the product." },
  { value: "sales", label: "Sales & GTM", description: "I close. I run the playbook." },
  { value: "ops", label: "Operations", description: "I make things run, on time." },
  { value: "vision", label: "Vision & Strategy", description: "I see two moves ahead." },
  { value: "network", label: "Network", description: "I open doors others can't." },
];

const interviewCards: CardOption<InterviewRange>[] = [
  { value: "none", label: "Haven't started", description: "We're going on instinct (so far)." },
  { value: "1-10", label: "1 – 10", description: "Early signal, early conviction." },
  { value: "10-50", label: "10 – 50", description: "Real pattern recognition." },
  { value: "50-plus", label: "50+", description: "Deep customer obsession." },
];

const riskCards: CardOption<BiggestRisk>[] = [
  { value: "demand", label: "Customers won't buy", description: "Pull risk." },
  { value: "build", label: "Building it is hard", description: "Tech / execution risk." },
  { value: "funding", label: "Out of money first", description: "Runway risk." },
  { value: "team", label: "Team / hiring", description: "People risk." },
  { value: "other", label: "Something else", description: "Tell us in a sec." },
];

const helpFitCards: CardOption<HelpFit>[] = [
  {
    value: "access",
    label: "We just need access",
    description: "We have capital. We need knowledge + the agentic OS.",
    icon: <GlyphKey />,
  },
  {
    value: "full-stack",
    label: "We need the full stack",
    description: "We need the cheque, the knowledge, and the OS.",
    icon: <GlyphStack />,
  },
];

// ----- Sections + steps ---------------------------------------------------

type Section = { id: string; label: string; steps: number };

const sections: Section[] = [
  { id: "you", label: "You", steps: 2 },
  { id: "team", label: "Team", steps: 1 },
  { id: "company", label: "Company", steps: 3 },
  { id: "vision", label: "Vision", steps: 3 },
  { id: "ask", label: "Ask", steps: 3 },
  { id: "materials", label: "Materials", steps: 2 },
  { id: "review", label: "Review", steps: 1 },
];

const totalSteps = sections.reduce((s, x) => s + x.steps, 0);

type StepConfig = {
  section: string;
  title: string;
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
    title: "Tell us who you are.",
    feedback: "Quick basics, then the interesting stuff.",
    render: ({ data, set, next }) => (
      <div className="grid gap-5 md:grid-cols-2">
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
        <Field label="Your role">
          <Input
            placeholder="CEO, CTO, Founder…"
            value={data.founderRole}
            onChange={(e) => set("founderRole", e.target.value)}
            onEnterContinue={next}
          />
        </Field>
        <Field label="Where based" hint="City, country.">
          <Input
            placeholder="Zurich, CH"
            value={data.founderLocation}
            onChange={(e) => set("founderLocation", e.target.value)}
            onEnterContinue={next}
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="LinkedIn" optional>
            <Input
              placeholder="https://linkedin.com/in/…"
              value={data.founderLinkedin}
              onChange={(e) => set("founderLinkedin", e.target.value)}
              onEnterContinue={next}
            />
          </Field>
        </div>
      </div>
    ),
    validate: (d) =>
      !d.founderName.trim()
        ? "Tell us your name"
        : !/^\S+@\S+\.\S+$/.test(d.founderEmail)
        ? "Email looks off"
        : !d.founderRole.trim()
        ? "Add your role"
        : !d.founderLocation.trim()
        ? "Where are you based?"
        : null,
  },
  {
    section: "you",
    title: "What's your superpower?",
    feedback: "Pick one or two — what you actually bring to the table.",
    render: ({ data, set }) => (
      <CardGroup
        multi
        maxSelected={2}
        cols={3}
        options={superpowerCards}
        value={data.superpowers}
        onChange={(v) => set("superpowers", v)}
      />
    ),
    validate: (d) =>
      d.superpowers.length === 0 ? "Pick at least one" : null,
  },

  // Section: Team
  {
    section: "team",
    title: "Who's building this with you?",
    feedback:
      "Two-time-collaborators outperform first-time pairs ~3:1 in pre-seed. Doesn't disqualify anyone — just useful colour.",
    render: ({ data, set, next }) => (
      <div className="grid gap-6">
        <Field label="How long have you worked together?">
          <CardGroup
            cols={4}
            options={workedTogetherCards}
            value={data.workedTogether}
            onChange={(v) => set("workedTogether", v)}
          />
        </Field>
        <Field
          label="Tell us about the team"
          hint="Co-founders, key roles, who's full-time. One line each."
        >
          <Textarea
            rows={5}
            placeholder={
              "e.g.\nJane — CEO, ex-Stripe (FT)\nMarc — CTO, ex-Google (FT)\nWe're hiring a designer."
            }
            value={data.teamDescription}
            onChange={(e) => set("teamDescription", e.target.value)}
            onEnterContinue={next}
            maxChars={600}
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.workedTogether
        ? "Pick one"
        : !d.teamDescription.trim()
        ? "Tell us about the team"
        : null,
  },

  // Section: Company
  {
    section: "company",
    title: "The company.",
    render: ({ data, set, next }) => (
      <div className="grid gap-5 md:grid-cols-2">
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
      </div>
    ),
    validate: (d) => (!d.companyName.trim() ? "Company name" : null),
  },
  {
    section: "company",
    title: "Where are you on the curve?",
    render: ({ data, set }) => (
      <CardGroup
        cols={2}
        options={stageCards}
        value={data.companyStage}
        onChange={(v) => set("companyStage", v)}
      />
    ),
    validate: (d) => (!d.companyStage ? "Pick a stage" : null),
  },
  {
    section: "company",
    title: "Sector and the elevator pitch.",
    feedback:
      "Strong one-liners punch above their weight in our process. Spend two extra minutes here.",
    render: ({ data, set, next }) => (
      <div className="grid gap-6">
        <Field label="Sector">
          <CardGroup
            cols={4}
            options={sectorCards}
            value={data.sector}
            onChange={(v) => set("sector", v)}
          />
        </Field>
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
          />
        </Field>
      </div>
    ),
    validate: (d) =>
      !d.sector
        ? "Pick a sector"
        : !d.oneLiner.trim()
        ? "Give us the one-liner"
        : null,
  },

  // Section: Vision
  {
    section: "vision",
    title: "The problem you're solving.",
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
    title: "What you're building, and why now.",
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
          hint="Why won't the obvious incumbent crush you?"
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
  {
    section: "vision",
    title: "Why now?",
    feedback: "The 'why now' question is what separates fund-grade from forever-startup.",
    render: ({ data, set, next }) => (
      <Field
        label="Why is now the right moment to build this?"
        hint="Tech shift, regulation, behaviour change, AI inflection — what's the catalyst?"
      >
        <Textarea
          rows={6}
          value={data.whyNow}
          onChange={(e) => set("whyNow", e.target.value)}
          onEnterContinue={next}
          maxChars={600}
          autoFocus
        />
      </Field>
    ),
    validate: (d) => (!d.whyNow.trim() ? "Tell us why now" : null),
  },

  // Section: Ask
  {
    section: "ask",
    title: "Customer conversations + traction.",
    render: ({ data, set, next }) => (
      <div className="grid gap-6">
        <Field
          label="How many customer conversations have you had?"
          hint="Zero is a fine answer — we just want the truth."
        >
          <CardGroup
            cols={4}
            options={interviewCards}
            value={data.interviewRange}
            onChange={(v) => set("interviewRange", v)}
          />
        </Field>
        <Field
          label="Any traction so far"
          hint="Revenue, signups, design partners, LOIs, waitlist — anything real."
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
      !d.interviewRange ? "Pick the closest range" : null,
  },
  {
    section: "ask",
    title: "What's your biggest risk right now?",
    feedback:
      "The honest answer signals self-awareness — that's what we look for.",
    render: ({ data, set }) => (
      <CardGroup
        cols={3}
        options={riskCards}
        value={data.biggestRisk}
        onChange={(v) => set("biggestRisk", v)}
      />
    ),
    validate: (d) => (!d.biggestRisk ? "Pick the closest" : null),
  },
  {
    section: "ask",
    title: "The cheque, and what it'll do.",
    feedback: "We can move within 14 days — assuming the basics check out.",
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
      </div>
    ),
    validate: (d) =>
      !d.raisingAmount.trim()
        ? "Raise amount"
        : !d.useOfFunds.trim()
        ? "Use of funds"
        : null,
  },

  // Section: Materials
  {
    section: "materials",
    title: "What kind of help fits you?",
    feedback:
      "This is a hint, not a vote. We decide the actual fit once we read your application.",
    render: ({ data, set, next }) => (
      <div className="grid gap-6">
        <Field label="Your read on what fits">
          <CardGroup
            cols={2}
            options={helpFitCards}
            value={data.helpFit}
            onChange={(v) => set("helpFit", v)}
          />
        </Field>
        <Field label="Why blankcollar specifically" hint="No wrong answer. Just be honest.">
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
      !d.helpFit ? "Tell us what fits" : !d.whyUs.trim() ? "Tell us why" : null,
  },
  {
    section: "materials",
    title: "Show us what you've got.",
    render: ({ data, set, next }) => (
      <div className="grid gap-5">
        <Field
          label="Pitch deck link"
          hint="Notion, Pitch, Google Slides, Loom — whatever you've got."
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
        <Field label="Anything else we should know" optional>
          <Textarea
            rows={4}
            value={data.somethingElse}
            onChange={(e) => set("somethingElse", e.target.value)}
            onEnterContinue={next}
            maxChars={600}
          />
        </Field>
      </div>
    ),
  },

  // Section: Review
  {
    section: "review",
    title: "",
    render: () => null,
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

// ----- Main component -----------------------------------------------------

export function ApplicationForm() {
  const t = useDict();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ApplicationData>(initialData);
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedTick, setSavedTick] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage + URL ?tier= param (preserved as a hint)
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
        if (Array.isArray(v)) {
          if (v.length > 0) fd.append(k, v.join(", "));
        } else if (typeof v === "string" && v) {
          fd.append(k, v);
        }
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

  const sectionDisplay = (id: string): string => {
    const labels = t.apply.sectionsLabels;
    return labels[id as keyof typeof labels] || id;
  };

  return (
    <div ref={formRef} className="relative">
      {/* Top progress + section indicator */}
      <div className="sticky top-0 z-30 -mx-6 mb-10 border-b border-bone/10 bg-ink/85 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center gap-6">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between font-bot text-[11px] uppercase tracking-mono text-bone/60">
              <span>
                {sectionDisplay(currentSection.id)}
                {currentSection.steps > 1 && (
                  <span className="text-bone/35"> · {currentStepInSection + 1}/{currentSection.steps}</span>
                )}
              </span>
              <span className="tabular">
                {t.apply.stepOf} {step + 1} {t.apply.of} {totalScreens}
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
              <h1 className="mb-8 text-3xl font-medium tracking-tighter text-bone md:text-4xl">
                {cur?.title}
              </h1>
              {cur?.render(ctx)}
              {cur?.feedback && <FeedbackBubble text={cur.feedback} />}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="font-bot text-[12px] uppercase tracking-mono text-bone/60 transition-colors hover:text-bone disabled:opacity-30"
                >
                  ← {t.common.back}
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
                    {t.common.continue} →
                  </button>
                </div>
              </div>
              <div className="mt-3 text-right font-bot text-[10px] uppercase tracking-mono text-bone/35">
                {t.common.pressEnter} <kbd className="rounded border border-bone/15 px-1.5 py-0.5">Enter</kbd> {t.common.enterToContinue}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ----- Review screen ------------------------------------------------------

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

const reviewGroups: { title: string; goto: number; rows: { k: string; key: keyof ApplicationData; map?: (v: unknown) => string }[] }[] = [
  {
    title: "You",
    goto: 0,
    rows: [
      { k: "Name", key: "founderName" },
      { k: "Email", key: "founderEmail" },
      { k: "Role", key: "founderRole" },
      { k: "Location", key: "founderLocation" },
      { k: "LinkedIn", key: "founderLinkedin" },
      { k: "Superpower", key: "superpowers", map: (v) => Array.isArray(v) ? v.map((s) => superpowerLabels[s as Superpower] || s).join(", ") : "" },
    ],
  },
  {
    title: "Team",
    goto: 2,
    rows: [
      { k: "Worked together", key: "workedTogether", map: (v) => v ? workedTogetherLabels[v as WorkedTogether] : "" },
      { k: "Team", key: "teamDescription" },
    ],
  },
  {
    title: "Company",
    goto: 3,
    rows: [
      { k: "Name", key: "companyName" },
      { k: "Website", key: "companyWebsite" },
      { k: "Stage", key: "companyStage", map: (v) => v ? stageLabels[v as Stage] : "" },
      { k: "Sector", key: "sector", map: (v) => v ? sectorLabels[v as Sector] : "" },
      { k: "One-liner", key: "oneLiner" },
    ],
  },
  {
    title: "Vision",
    goto: 6,
    rows: [
      { k: "Problem", key: "problem" },
      { k: "Customer", key: "customer" },
      { k: "Solution", key: "solution" },
      { k: "Differentiator", key: "differentiator" },
      { k: "Why now", key: "whyNow" },
    ],
  },
  {
    title: "Ask",
    goto: 9,
    rows: [
      { k: "Customer convos", key: "interviewRange", map: (v) => v ? interviewRangeLabels[v as InterviewRange] : "" },
      { k: "Traction", key: "traction" },
      { k: "Biggest risk", key: "biggestRisk", map: (v) => v ? biggestRiskLabels[v as BiggestRisk] : "" },
      { k: "Raising", key: "raisingAmount" },
      { k: "Use of funds", key: "useOfFunds" },
    ],
  },
  {
    title: "Materials",
    goto: 12,
    rows: [
      { k: "Help fit", key: "helpFit", map: (v) => v ? helpFitLabels[v as HelpFit] : "" },
      { k: "Why blankcollar", key: "whyUs" },
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
  const t = useDict();
  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease }}
    >
      <h1 className="mb-3 text-3xl font-medium tracking-tighter text-bone md:text-4xl">
        {t.apply.review.title}
      </h1>
      <p className="mb-10 text-bone/65">{t.apply.review.sub}</p>

      <div className="mb-10 grid gap-5">
        <Field label={t.apply.review.uploadLabel} optional>
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
                const raw = data[r.key];
                const display = r.map ? r.map(raw) : (raw as string) || "—";
                return (
                  <div key={r.key} className="grid grid-cols-12 gap-3 px-5 py-3.5 text-[14px]">
                    <dt className="col-span-12 font-bot text-[11px] uppercase tracking-mono text-bone/50 md:col-span-3">
                      {r.k}
                    </dt>
                    <dd className="col-span-12 whitespace-pre-line text-bone/85 md:col-span-9">
                      {display || "—"}
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
          ← {t.common.back}
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
            {submitting ? t.common.sending : t.apply.review.submit}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ----- Saved dot + Feedback bubble ----------------------------------------

function SavedDot({ tick }: { tick: number }) {
  const t = useDict();
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (tick === 0) return;
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(timer);
  }, [tick]);
  return (
    <div className="hidden items-center gap-2 font-bot text-[10px] uppercase tracking-mono text-bone/45 sm:flex">
      <motion.span
        animate={pulse ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
        className="block h-1.5 w-1.5 rounded-full bg-accent"
      />
      {t.common.saved}
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

// ----- Confirmation -------------------------------------------------------

function Confirmation({
  founderName,
  companyName,
  founderEmail,
}: {
  founderName: string;
  companyName: string;
  founderEmail: string;
}) {
  const t = useDict();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="mx-auto max-w-3xl pt-10"
    >
      <div className="mb-10 flex items-center gap-3 font-bot text-[11px] uppercase tracking-mono text-accent">
        <span className="dot-pulse h-1.5 w-1.5 rounded-full bg-accent" />
        {t.apply.confirm.received}
      </div>
      <h1 className="text-4xl font-medium tracking-tighter text-bone md:text-6xl">
        {t.apply.confirm.thanks(founderName.split(" ")[0] || "")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-bone/75 leading-relaxed">
        {t.apply.confirm.bodyPre}
        <strong>{companyName || "your company"}</strong>
        {t.apply.confirm.bodyMid}
        <span className="font-bot text-accent">{founderEmail}</span>
        {t.apply.confirm.bodyEnd}
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-3">
        {t.apply.confirm.timeline.map((s, i) => (
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
        {t.apply.confirm.whileItems.map((item, i) => (
          <a
            key={item.title}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-bone/15 p-5 transition-colors hover:bg-bone/[0.04]"
          >
            <div className="font-bot text-[11px] uppercase tracking-mono text-bone/50">
              {t.apply.confirm.whileYouWait}{String(i + 1).padStart(2, "0")}
            </div>
            <div className="mt-2 text-lg font-medium text-bone">{item.title}</div>
            <p className="mt-1 text-[13px] text-bone/60">{item.body}</p>
          </a>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-bone/10 bg-bone/[0.03] p-5 text-[13.5px] leading-relaxed text-bone/65">
        <span className="font-bot text-[10px] uppercase tracking-mono text-accent">
          agent.review ●
        </span>
        {t.apply.confirm.replyNote}
      </div>
    </motion.div>
  );
}

// ----- Glyphs -------------------------------------------------------------
// Minimal, intentional little SVGs for the card sets.

function GlyphSeed() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="12" cy="13" rx="5" ry="7" />
      <path d="M12 6V3" />
    </svg>
  );
}
function GlyphSprout() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21V11" />
      <path d="M12 11C12 7 8 5 6 5c0 4 3 7 6 6Z" />
      <path d="M12 11c0-3 3-5 5-5 0 3-2 6-5 5Z" />
    </svg>
  );
}
function GlyphCoin() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 10h5a2 2 0 010 4H9M9 10v8M9 10V6" />
    </svg>
  );
}
function GlyphRocket() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 4c0 4-2 7-5 9l-3-1 1-3c2-3 5-5 9-5 0 3 0 5-2 7l-1 3-3-1" />
      <path d="M9 15l-2 2-2-2 2-2" />
    </svg>
  );
}
function GlyphAi() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M12 6V3" />
    </svg>
  );
}
function GlyphHeart() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20s-7-4-7-10a4 4 0 017-3 4 4 0 017 3c0 6-7 10-7 10z" />
    </svg>
  );
}
function GlyphLeaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 19c0-9 7-14 14-14 0 9-5 14-14 14z" />
      <path d="M5 19l9-9" />
    </svg>
  );
}
function GlyphCode() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 6l-4 12" />
    </svg>
  );
}
function GlyphPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}
function GlyphLayers() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </svg>
  );
}
function GlyphSpark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}
function GlyphKey() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M17 12v4M19 12v3" />
    </svg>
  );
}
function GlyphStack() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="4" rx="1" />
      <rect x="4" y="10" width="16" height="4" rx="1" />
      <rect x="4" y="16" width="16" height="4" rx="1" />
    </svg>
  );
}

"use client";

import { AnimatePresence, m } from "framer-motion";
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
import { useDict, useLang } from "@/lib/lang";
import type { Dict } from "@/lib/dict";
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
  initialData,
} from "./types";

const ease = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = "bc-vc-application-v2";

// ----- Glyphs (used in card options and step icons) ---------------------

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

// ----- Sections -----------------------------------------------------------

type Section = { id: string; steps: number };

const sections: Section[] = [
  { id: "you", steps: 2 },
  { id: "team", steps: 1 },
  { id: "company", steps: 3 },
  { id: "vision", steps: 3 },
  { id: "ask", steps: 3 },
  { id: "materials", steps: 2 },
  { id: "review", steps: 1 },
];

const totalSteps = sections.reduce((s, x) => s + x.steps, 0);

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

// ----- Card option builders (lang-aware) ---------------------------------

function buildStageCards(t: Dict): CardOption<Stage>[] {
  const c = t.apply.cards.stage;
  return [
    { value: "pre-incorporation", label: c["pre-incorporation"].label, description: c["pre-incorporation"].description, icon: <GlyphSeed /> },
    { value: "incorporated", label: c.incorporated.label, description: c.incorporated.description, icon: <GlyphSprout /> },
    { value: "first-revenue", label: c["first-revenue"].label, description: c["first-revenue"].description, icon: <GlyphCoin /> },
    { value: "scaling", label: c.scaling.label, description: c.scaling.description, icon: <GlyphRocket /> },
  ];
}

function buildWorkedCards(t: Dict): CardOption<WorkedTogether>[] {
  const c = t.apply.cards.worked;
  return [
    { value: "first-time", label: c["first-time"].label, description: c["first-time"].description },
    { value: "less-than-6m", label: c["less-than-6m"].label, description: c["less-than-6m"].description },
    { value: "6m-to-2y", label: c["6m-to-2y"].label, description: c["6m-to-2y"].description },
    { value: "over-2y", label: c["over-2y"].label, description: c["over-2y"].description },
  ];
}

function buildSectorCards(t: Dict): CardOption<Sector>[] {
  const c = t.apply.cards.sector;
  return [
    { value: "ai-ml", label: c["ai-ml"], icon: <GlyphAi /> },
    { value: "fintech", label: c.fintech, icon: <GlyphCoin /> },
    { value: "healthtech", label: c.healthtech, icon: <GlyphHeart /> },
    { value: "climate", label: c.climate, icon: <GlyphLeaf /> },
    { value: "devtools", label: c.devtools, icon: <GlyphCode /> },
    { value: "consumer", label: c.consumer, icon: <GlyphPhone /> },
    { value: "b2b-saas", label: c["b2b-saas"], icon: <GlyphLayers /> },
    { value: "other", label: c.other, icon: <GlyphSpark /> },
  ];
}

function buildSuperpowerCards(t: Dict): CardOption<Superpower>[] {
  const c = t.apply.cards.superpower;
  return [
    { value: "story", label: c.story.label, description: c.story.description },
    { value: "tech", label: c.tech.label, description: c.tech.description },
    { value: "sales", label: c.sales.label, description: c.sales.description },
    { value: "ops", label: c.ops.label, description: c.ops.description },
    { value: "vision", label: c.vision.label, description: c.vision.description },
    { value: "network", label: c.network.label, description: c.network.description },
  ];
}

function buildInterviewCards(t: Dict): CardOption<InterviewRange>[] {
  const c = t.apply.cards.interview;
  return [
    { value: "none", label: c.none.label, description: c.none.description },
    { value: "1-10", label: c["1-10"].label, description: c["1-10"].description },
    { value: "10-50", label: c["10-50"].label, description: c["10-50"].description },
    { value: "50-plus", label: c["50-plus"].label, description: c["50-plus"].description },
  ];
}

function buildRiskCards(t: Dict): CardOption<BiggestRisk>[] {
  const c = t.apply.cards.risk;
  return [
    { value: "demand", label: c.demand.label, description: c.demand.description },
    { value: "build", label: c.build.label, description: c.build.description },
    { value: "funding", label: c.funding.label, description: c.funding.description },
    { value: "team", label: c.team.label, description: c.team.description },
    { value: "other", label: c.other.label, description: c.other.description },
  ];
}

function buildHelpFitCards(t: Dict): CardOption<HelpFit>[] {
  const c = t.apply.cards.helpFit;
  return [
    { value: "access", label: c.access.label, description: c.access.description, icon: <GlyphKey /> },
    { value: "full-stack", label: c["full-stack"].label, description: c["full-stack"].description, icon: <GlyphStack /> },
  ];
}

// ----- Step builder -------------------------------------------------------

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

function buildSteps(t: Dict): StepConfig[] {
  const f = t.apply.fields;
  const v = t.apply.validations;
  const fb = t.apply.feedback;
  const stage = buildStageCards(t);
  const worked = buildWorkedCards(t);
  const sector = buildSectorCards(t);
  const superp = buildSuperpowerCards(t);
  const interv = buildInterviewCards(t);
  const risk = buildRiskCards(t);
  const help = buildHelpFitCards(t);

  return [
    // 0 - You: name/email/role/location/linkedin
    {
      section: "you",
      title: t.apply.steps.you1,
      feedback: fb.basics,
      render: ({ data, set, next }) => (
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={f.yourName.label}>
            <Input placeholder={f.yourName.placeholder} value={data.founderName} onChange={(e) => set("founderName", e.target.value)} onEnterContinue={next} autoFocus />
          </Field>
          <Field label={f.email.label} hint={f.email.hint}>
            <Input type="email" placeholder={f.email.placeholder} value={data.founderEmail} onChange={(e) => set("founderEmail", e.target.value)} onEnterContinue={next} />
          </Field>
          <Field label={f.yourRole.label}>
            <Input placeholder={f.yourRole.placeholder} value={data.founderRole} onChange={(e) => set("founderRole", e.target.value)} onEnterContinue={next} />
          </Field>
          <Field label={f.location.label} hint={f.location.hint}>
            <Input placeholder={f.location.placeholder} value={data.founderLocation} onChange={(e) => set("founderLocation", e.target.value)} onEnterContinue={next} />
          </Field>
          <div className="md:col-span-2">
            <Field label={f.linkedin.label} optional>
              <Input placeholder={f.linkedin.placeholder} value={data.founderLinkedin} onChange={(e) => set("founderLinkedin", e.target.value)} onEnterContinue={next} />
            </Field>
          </div>
        </div>
      ),
      validate: (d) =>
        !d.founderName.trim()
          ? v.name
          : !/^\S+@\S+\.\S+$/.test(d.founderEmail)
          ? v.email
          : !d.founderRole.trim()
          ? v.role
          : !d.founderLocation.trim()
          ? v.location
          : null,
    },
    // 1 - You: superpower
    {
      section: "you",
      title: t.apply.steps.you2,
      feedback: fb.superpower,
      render: ({ data, set }) => (
        <CardGroup multi maxSelected={2} cols={3} options={superp} value={data.superpowers} onChange={(val) => set("superpowers", val)} />
      ),
      validate: (d) => (d.superpowers.length === 0 ? v.superpower : null),
    },

    // 2 - Team
    {
      section: "team",
      title: t.apply.steps.team,
      feedback: fb.team,
      render: ({ data, set, next }) => (
        <div className="grid gap-6">
          <Field label={f.workedTogether.label}>
            <CardGroup cols={4} options={worked} value={data.workedTogether} onChange={(val) => set("workedTogether", val)} />
          </Field>
          <Field label={f.teamDescription.label} hint={f.teamDescription.hint}>
            <Textarea rows={5} placeholder={f.teamDescription.placeholder} value={data.teamDescription} onChange={(e) => set("teamDescription", e.target.value)} onEnterContinue={next} maxChars={600} />
          </Field>
        </div>
      ),
      validate: (d) =>
        !d.workedTogether
          ? v.workedTogether
          : !d.teamDescription.trim()
          ? v.teamDescription
          : null,
    },

    // 3 - Company: name + website
    {
      section: "company",
      title: t.apply.steps.company,
      render: ({ data, set, next }) => (
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={f.companyName.label}>
            <Input placeholder={f.companyName.placeholder} value={data.companyName} onChange={(e) => set("companyName", e.target.value)} onEnterContinue={next} autoFocus />
          </Field>
          <Field label={f.companyWebsite.label} optional>
            <Input placeholder={f.companyWebsite.placeholder} value={data.companyWebsite} onChange={(e) => set("companyWebsite", e.target.value)} onEnterContinue={next} />
          </Field>
        </div>
      ),
      validate: (d) => (!d.companyName.trim() ? v.companyName : null),
    },
    // 4 - Stage
    {
      section: "company",
      title: t.apply.steps.stage,
      render: ({ data, set }) => (
        <CardGroup cols={2} options={stage} value={data.companyStage} onChange={(val) => set("companyStage", val)} />
      ),
      validate: (d) => (!d.companyStage ? v.stage : null),
    },
    // 5 - Sector + one-liner
    {
      section: "company",
      title: t.apply.steps.sectorPitch,
      feedback: fb.pitch,
      render: ({ data, set, next }) => (
        <div className="grid gap-6">
          <Field label={f.sector.label}>
            <CardGroup cols={4} options={sector} value={data.sector} onChange={(val) => set("sector", val)} />
          </Field>
          <Field label={f.oneLiner.label} hint={f.oneLiner.hint}>
            <Textarea rows={3} placeholder={f.oneLiner.placeholder} value={data.oneLiner} onChange={(e) => set("oneLiner", e.target.value)} onEnterContinue={next} maxChars={140} />
          </Field>
        </div>
      ),
      validate: (d) =>
        !d.sector ? v.sector : !d.oneLiner.trim() ? v.oneLiner : null,
    },

    // 6 - Vision: problem + customer
    {
      section: "vision",
      title: t.apply.steps.problem,
      render: ({ data, set, next }) => (
        <div className="grid gap-5">
          <Field label={f.problem.label} hint={f.problem.hint}>
            <Textarea rows={5} value={data.problem} onChange={(e) => set("problem", e.target.value)} onEnterContinue={next} maxChars={800} autoFocus />
          </Field>
          <Field label={f.customer.label} hint={f.customer.hint}>
            <Textarea rows={3} placeholder={f.customer.placeholder} value={data.customer} onChange={(e) => set("customer", e.target.value)} onEnterContinue={next} maxChars={400} />
          </Field>
        </div>
      ),
      validate: (d) =>
        !d.problem.trim() ? v.problem : !d.customer.trim() ? v.customer : null,
    },
    // 7 - Vision: solution + differentiator
    {
      section: "vision",
      title: t.apply.steps.solution,
      render: ({ data, set, next }) => (
        <div className="grid gap-5">
          <Field label={f.solution.label} hint={f.solution.hint}>
            <Textarea rows={5} value={data.solution} onChange={(e) => set("solution", e.target.value)} onEnterContinue={next} maxChars={800} autoFocus />
          </Field>
          <Field label={f.differentiator.label} hint={f.differentiator.hint}>
            <Textarea rows={4} value={data.differentiator} onChange={(e) => set("differentiator", e.target.value)} onEnterContinue={next} maxChars={600} />
          </Field>
        </div>
      ),
      validate: (d) =>
        !d.solution.trim()
          ? v.solution
          : !d.differentiator.trim()
          ? v.differentiator
          : null,
    },
    // 8 - Why now
    {
      section: "vision",
      title: t.apply.steps.whyNow,
      feedback: fb.whyNow,
      render: ({ data, set, next }) => (
        <Field label={f.whyNow.label} hint={f.whyNow.hint}>
          <Textarea rows={6} value={data.whyNow} onChange={(e) => set("whyNow", e.target.value)} onEnterContinue={next} maxChars={600} autoFocus />
        </Field>
      ),
      validate: (d) => (!d.whyNow.trim() ? v.whyNow : null),
    },

    // 9 - Ask: traction
    {
      section: "ask",
      title: t.apply.steps.traction,
      render: ({ data, set, next }) => (
        <div className="grid gap-6">
          <Field label={f.interviews.label} hint={f.interviews.hint}>
            <CardGroup cols={4} options={interv} value={data.interviewRange} onChange={(val) => set("interviewRange", val)} />
          </Field>
          <Field label={f.traction.label} hint={f.traction.hint} optional>
            <Textarea rows={4} value={data.traction} onChange={(e) => set("traction", e.target.value)} onEnterContinue={next} maxChars={600} />
          </Field>
        </div>
      ),
      validate: (d) => (!d.interviewRange ? v.interviews : null),
    },
    // 10 - Risk
    {
      section: "ask",
      title: t.apply.steps.risk,
      feedback: fb.risk,
      render: ({ data, set }) => (
        <CardGroup cols={3} options={risk} value={data.biggestRisk} onChange={(val) => set("biggestRisk", val)} />
      ),
      validate: (d) => (!d.biggestRisk ? v.risk : null),
    },
    // 11 - Fit: funding (optional - funding is an outcome, not a requirement)
    {
      section: "ask",
      title: t.apply.steps.ask,
      feedback: fb.ask,
      render: ({ data, set, next }) => (
        <div className="grid gap-5">
          <Field label={f.raisingAmount.label} hint={f.raisingAmount.hint} optional>
            <Input placeholder={f.raisingAmount.placeholder} value={data.raisingAmount} onChange={(e) => set("raisingAmount", e.target.value)} onEnterContinue={next} autoFocus />
          </Field>
          <Field label={f.useOfFunds.label} hint={f.useOfFunds.hint} optional>
            <Textarea rows={4} value={data.useOfFunds} onChange={(e) => set("useOfFunds", e.target.value)} onEnterContinue={next} maxChars={500} />
          </Field>
        </div>
      ),
    },

    // 12 - Materials: help fit + why us
    {
      section: "materials",
      title: t.apply.steps.helpFit,
      feedback: fb.helpFit,
      render: ({ data, set, next }) => (
        <div className="grid gap-6">
          <Field label={f.helpFit.label}>
            <CardGroup cols={2} options={help} value={data.helpFit} onChange={(val) => set("helpFit", val)} />
          </Field>
          <Field label={f.whyUs.label} hint={f.whyUs.hint}>
            <Textarea rows={4} value={data.whyUs} onChange={(e) => set("whyUs", e.target.value)} onEnterContinue={next} maxChars={500} />
          </Field>
        </div>
      ),
      validate: (d) =>
        !d.helpFit ? v.helpFit : !d.whyUs.trim() ? v.whyUs : null,
    },
    // 13 - Materials: links + something else
    {
      section: "materials",
      title: t.apply.steps.materials,
      render: ({ data, set, next }) => (
        <div className="grid gap-5">
          <Field label={f.pitchDeckLink.label} hint={f.pitchDeckLink.hint} optional>
            <Input placeholder="https://…" value={data.pitchDeckLink} onChange={(e) => set("pitchDeckLink", e.target.value)} onEnterContinue={next} autoFocus />
          </Field>
          <Field label={f.productLink.label} optional>
            <Input placeholder="https://…" value={data.productLink} onChange={(e) => set("productLink", e.target.value)} onEnterContinue={next} />
          </Field>
          <Field label={f.somethingElse.label} optional>
            <Textarea rows={4} value={data.somethingElse} onChange={(e) => set("somethingElse", e.target.value)} onEnterContinue={next} maxChars={600} />
          </Field>
        </div>
      ),
    },

    // 14 - Review
    {
      section: "review",
      title: "",
      render: () => null,
    },
  ];
}

// ----- Main component -----------------------------------------------------

export function ApplicationForm() {
  const t = useDict();
  const lang = useLang();
  const steps = useMemo(() => buildSteps(t), [t]);
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

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedTick((tk) => tk + 1);
    } catch {
      // ignore
    }
  }, [data]);

  const set = useCallback(
    <K extends keyof ApplicationData>(k: K, value: ApplicationData[K]) => {
      setData((d) => ({ ...d, [k]: value }));
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
  }, [step, data, steps]);

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
      fd.append("lang", lang);
      Object.entries(data).forEach(([k, val]) => {
        if (Array.isArray(val)) {
          if (val.length > 0) fd.append(k, val.join(", "));
        } else if (typeof val === "string" && val) {
          fd.append(k, val);
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
  }, [data, pitchDeckFile, lang]);

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
            <div
              className="h-1 overflow-hidden rounded-full bg-bone/10"
              role="progressbar"
              aria-label={t.common.progressLabel}
              aria-valuenow={Math.round(overallProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <m.div
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
            <m.div
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
            </m.div>
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
  const c = t.apply.cards;

  const stageLabel = data.companyStage ? c.stage[data.companyStage].label : "-";
  const sectorLabel = data.sector ? c.sector[data.sector] : "-";
  const workedLabel = data.workedTogether ? c.worked[data.workedTogether].label : "-";
  const interviewLabel = data.interviewRange ? c.interview[data.interviewRange].label : "-";
  const riskLabel = data.biggestRisk ? c.risk[data.biggestRisk].label : "-";
  const helpFitLabel = data.helpFit ? c.helpFit[data.helpFit].label : "-";
  const superpowerLabel = data.superpowers.length > 0
    ? data.superpowers.map((s) => c.superpower[s].label).join(", ")
    : "-";

  const groups: { title: string; goto: number; rows: { k: string; value: string }[] }[] = [
    {
      title: t.apply.sectionsLabels.you,
      goto: 0,
      rows: [
        { k: t.apply.fields.yourName.label, value: data.founderName },
        { k: t.apply.fields.email.label, value: data.founderEmail },
        { k: t.apply.fields.yourRole.label, value: data.founderRole },
        { k: t.apply.fields.location.label, value: data.founderLocation },
        { k: t.apply.fields.linkedin.label, value: data.founderLinkedin },
        { k: t.apply.steps.you2, value: superpowerLabel },
      ],
    },
    {
      title: t.apply.sectionsLabels.team,
      goto: 2,
      rows: [
        { k: t.apply.fields.workedTogether.label, value: workedLabel },
        { k: t.apply.fields.teamDescription.label, value: data.teamDescription },
      ],
    },
    {
      title: t.apply.sectionsLabels.company,
      goto: 3,
      rows: [
        { k: t.apply.fields.companyName.label, value: data.companyName },
        { k: t.apply.fields.companyWebsite.label, value: data.companyWebsite },
        { k: t.apply.steps.stage, value: stageLabel },
        { k: t.apply.fields.sector.label, value: sectorLabel },
        { k: t.apply.fields.oneLiner.label, value: data.oneLiner },
      ],
    },
    {
      title: t.apply.sectionsLabels.vision,
      goto: 6,
      rows: [
        { k: t.apply.fields.problem.label, value: data.problem },
        { k: t.apply.fields.customer.label, value: data.customer },
        { k: t.apply.fields.solution.label, value: data.solution },
        { k: t.apply.fields.differentiator.label, value: data.differentiator },
        { k: t.apply.steps.whyNow, value: data.whyNow },
      ],
    },
    {
      title: t.apply.sectionsLabels.ask,
      goto: 9,
      rows: [
        { k: t.apply.fields.interviews.label, value: interviewLabel },
        { k: t.apply.fields.traction.label, value: data.traction },
        { k: t.apply.steps.risk, value: riskLabel },
        { k: t.apply.fields.raisingAmount.label, value: data.raisingAmount },
        { k: t.apply.fields.useOfFunds.label, value: data.useOfFunds },
      ],
    },
    {
      title: t.apply.sectionsLabels.materials,
      goto: 12,
      rows: [
        { k: t.apply.fields.helpFit.label, value: helpFitLabel },
        { k: t.apply.fields.whyUs.label, value: data.whyUs },
        { k: t.apply.fields.pitchDeckLink.label, value: data.pitchDeckLink },
        { k: t.apply.fields.productLink.label, value: data.productLink },
        { k: t.apply.fields.somethingElse.label, value: data.somethingElse },
      ],
    },
  ];

  return (
    <m.div
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
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl border border-bone/10 bg-bone/[0.03]">
            <div className="flex items-center justify-between border-b border-bone/10 px-5 py-3.5">
              <h3 className="font-bot text-[11px] uppercase tracking-mono text-bone/60">{g.title}</h3>
              <button
                type="button"
                onClick={() => go(g.goto)}
                className="font-bot text-[11px] uppercase tracking-mono text-accent hover:text-accent/80"
              >
                {t.common.edit} →
              </button>
            </div>
            <dl className="divide-y divide-bone/10">
              {g.rows.map((r, idx) => (
                <div key={`${g.title}-${idx}`} className="grid grid-cols-12 gap-3 px-5 py-3.5 text-[14px]">
                  <dt className="col-span-12 font-bot text-[11px] uppercase tracking-mono text-bone/50 md:col-span-3">
                    {r.k}
                  </dt>
                  <dd className="col-span-12 whitespace-pre-line text-bone/85 md:col-span-9">
                    {r.value || "-"}
                  </dd>
                </div>
              ))}
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
    </m.div>
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
      <m.span
        animate={pulse ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
        className="block h-1.5 w-1.5 rounded-full bg-accent"
      />
      {t.common.saved}
    </div>
  );
}

function FeedbackBubble({ text }: { text: string }) {
  return (
    <m.div
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
    </m.div>
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
    <m.div
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
        <strong>{companyName || "-"}</strong>
        {t.apply.confirm.bodyMid}
        <span className="font-bot text-accent">{founderEmail}</span>
        {t.apply.confirm.bodyEnd}
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-3">
        {t.apply.confirm.timeline.map((s, i) => (
          <m.div
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
          </m.div>
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
    </m.div>
  );
}

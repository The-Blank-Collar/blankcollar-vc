export type Stage =
  | "pre-incorporation"
  | "incorporated"
  | "first-revenue"
  | "scaling";

export type WorkedTogether =
  | "first-time"
  | "less-than-6m"
  | "6m-to-2y"
  | "over-2y";

export type Sector =
  | "ai-ml"
  | "fintech"
  | "healthtech"
  | "climate"
  | "devtools"
  | "consumer"
  | "b2b-saas"
  | "other";

export type Superpower =
  | "story"
  | "tech"
  | "sales"
  | "ops"
  | "vision"
  | "network";

export type InterviewRange =
  | "none"
  | "1-10"
  | "10-50"
  | "50-plus";

export type BiggestRisk =
  | "demand"
  | "build"
  | "funding"
  | "team"
  | "other";

export type HelpFit = "access" | "full-stack";

export type TierId = "os-pass" | "full-stack" | "cheque";

export const tierLabels: Record<TierId, string> = {
  "os-pass": "The Essentials",
  "full-stack": "The Full Stack",
  cheque: "VC Access",
};

export type ApplicationData = {
  tier: TierId;
  // Founder
  founderName: string;
  founderEmail: string;
  founderRole: string;
  founderLocation: string;
  founderLinkedin: string;
  superpowers: Superpower[];
  // Team
  teamDescription: string;
  workedTogether: WorkedTogether | "";
  // Company
  companyName: string;
  companyWebsite: string;
  companyStage: Stage | "";
  sector: Sector | "";
  oneLiner: string;
  // Vision
  problem: string;
  customer: string;
  solution: string;
  differentiator: string;
  whyNow: string;
  // Traction
  interviewRange: InterviewRange | "";
  traction: string;
  biggestRisk: BiggestRisk | "";
  // Ask
  raisingAmount: string;
  useOfFunds: string;
  helpFit: HelpFit | "";
  whyUs: string;
  // Materials
  pitchDeckLink: string;
  productLink: string;
  // Other
  somethingElse: string;
};

export const initialData: ApplicationData = {
  tier: "full-stack",
  founderName: "",
  founderEmail: "",
  founderRole: "",
  founderLocation: "",
  founderLinkedin: "",
  superpowers: [],
  teamDescription: "",
  workedTogether: "",
  companyName: "",
  companyWebsite: "",
  companyStage: "",
  sector: "",
  oneLiner: "",
  problem: "",
  customer: "",
  solution: "",
  differentiator: "",
  whyNow: "",
  interviewRange: "",
  traction: "",
  biggestRisk: "",
  raisingAmount: "",
  useOfFunds: "",
  helpFit: "",
  whyUs: "",
  pitchDeckLink: "",
  productLink: "",
  somethingElse: "",
};

export const stageLabels: Record<Stage, string> = {
  "pre-incorporation": "Pre-incorporation",
  incorporated: "Incorporated, pre-revenue",
  "first-revenue": "First revenue",
  scaling: "Scaling",
};

export const workedTogetherLabels: Record<WorkedTogether, string> = {
  "first-time": "First time working together",
  "less-than-6m": "Less than 6 months",
  "6m-to-2y": "6 months – 2 years",
  "over-2y": "2+ years",
};

export const sectorLabels: Record<Sector, string> = {
  "ai-ml": "AI / ML",
  fintech: "Fintech",
  healthtech: "Healthtech",
  climate: "Climate / Sustainability",
  devtools: "Dev Tools",
  consumer: "Consumer",
  "b2b-saas": "B2B SaaS",
  other: "Other",
};

export const superpowerLabels: Record<Superpower, string> = {
  story: "Storytelling",
  tech: "Engineering",
  sales: "Sales & GTM",
  ops: "Operations",
  vision: "Vision & Strategy",
  network: "Network",
};

export const interviewRangeLabels: Record<InterviewRange, string> = {
  none: "Haven't started",
  "1-10": "1 – 10",
  "10-50": "10 – 50",
  "50-plus": "50+",
};

export const biggestRiskLabels: Record<BiggestRisk, string> = {
  demand: "Customers won't buy",
  build: "Building it is hard",
  funding: "Out of money before traction",
  team: "Team / hiring",
  other: "Something else",
};

export const helpFitLabels: Record<HelpFit, string> = {
  access: "We need the lift",
  "full-stack": "We're ready to raise",
};

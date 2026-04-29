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

export type TierId = "os-pass" | "full-stack" | "cheque";

export const tierLabels: Record<TierId, string> = {
  "os-pass": "The OS Pass",
  "full-stack": "The Full Stack",
  cheque: "The Cheque",
};

export type ApplicationData = {
  tier: TierId;
  // Founder
  founderName: string;
  founderEmail: string;
  founderRole: string;
  founderLocation: string;
  founderLinkedin: string;
  // Team
  teamDescription: string;
  workedTogether: WorkedTogether | "";
  // Company
  companyName: string;
  companyWebsite: string;
  companyStage: Stage | "";
  oneLiner: string;
  // Problem & solution
  problem: string;
  customer: string;
  solution: string;
  differentiator: string;
  // Traction
  customerInterviews: string;
  traction: string;
  // Ask
  raisingAmount: string;
  useOfFunds: string;
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
  teamDescription: "",
  workedTogether: "",
  companyName: "",
  companyWebsite: "",
  companyStage: "",
  oneLiner: "",
  problem: "",
  customer: "",
  solution: "",
  differentiator: "",
  customerInterviews: "",
  traction: "",
  raisingAmount: "",
  useOfFunds: "",
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
  "less-than-6m": "< 6 months",
  "6m-to-2y": "6 months – 2 years",
  "over-2y": "2+ years",
};

export type ModuleStatus = "done" | "active" | "pending" | "locked";

export interface CourseModule {
  id: string;
  slug: string;
  num: string;
  title: string;
  duration: string;
  phase: string;
  phaseId: string;
  overview: string;
  /** Optional/supplementary content (vs. the required core path). */
  optional?: boolean;
}

export interface Phase {
  id: string;
  num: string;
  name: string;
  description: string;
  color: string;
  accentColor: string;
  borderColor: string;
  bgHex: string;
  textHex: string;
  modules: CourseModule[];
}

export const phases: Phase[] = [
  {
    id: "phase0",
    num: "0",
    name: "Foundation",
    description: "Understand the vibe coding mindset, set up your environment, and start your Vibe Session Log.",
    color: "bg-stone-50",
    accentColor: "text-stone-600",
    borderColor: "border-stone-200",
    bgHex: "#F0E5D3",
    textHex: "#191510",
    modules: [
      {
        id: "monboard",
        slug: "module-onboarding",
        num: "Pre",
        title: "Setup & Environment",
        duration: "1–2 hrs",
        phase: "Phase 0",
        phaseId: "phase0",
        overview: "New to engineering tools? Start here: what the Terminal is, how to open it on Mac and Windows, first-time setup, and troubleshooting.",
        optional: true,
      },
      {
        id: "m00",
        slug: "module-00",
        num: "00",
        title: "Welcome to Vibe Coding",
        duration: "2–3 hrs",
        phase: "Phase 0",
        phaseId: "phase0",
        overview: "Understand what vibe coding is, why it changes the designer's role, and set up your working environment.",
      },
    ],
  },
  {
    id: "phase1",
    num: "1",
    name: "Read the Stack",
    description: "Learn to read code like a designer and master the tools that bridge design and development.",
    color: "bg-slate-50",
    accentColor: "text-slate-700",
    borderColor: "border-slate-200",
    bgHex: "#DBEAFE",
    textHex: "#191510",
    modules: [
      {
        id: "m01",
        slug: "module-01",
        num: "01",
        title: "Reading Code Like a Designer",
        duration: "4–6 hrs",
        phase: "Phase 1",
        phaseId: "phase1",
        overview: "HTML, CSS, and Flexbox mapped to Figma concepts. Build a translation mental model.",
      },
      {
        id: "m02",
        slug: "module-02",
        num: "02",
        title: "Figma as the Source of Truth",
        duration: "4–6 hrs",
        phase: "Phase 1",
        phaseId: "phase1",
        overview: "Connect Figma components to design tokens, naming conventions, and component anatomy.",
      },
      {
        id: "m03",
        slug: "module-03",
        num: "03",
        title: "Storybook for Designers",
        duration: "3–4 hrs",
        phase: "Phase 1",
        phaseId: "phase1",
        overview: "Use Storybook to review, test, and communicate component states without writing code.",
      },
      {
        id: "m04",
        slug: "module-04",
        num: "04",
        title: "Writing design.md",
        duration: "4–5 hrs",
        phase: "Phase 1",
        phaseId: "phase1",
        overview: "Create the canonical design document that becomes your AI's source of truth.",
      },
      {
        id: "m05",
        slug: "module-05",
        num: "05",
        title: "Setting Up CLAUDE.md",
        duration: "2–3 hrs",
        phase: "Phase 1",
        phaseId: "phase1",
        overview: "Write the AI context file that primes every Claude Code session with your design rules.",
      },
    ],
  },
  {
    id: "phase2",
    num: "2",
    name: "Write Specs",
    description: "Translate design decisions into precise, structured specifications that AI can act on.",
    color: "bg-violet-50",
    accentColor: "text-violet-700",
    borderColor: "border-violet-200",
    bgHex: "#B9A5FF",
    textHex: "#191510",
    modules: [
      {
        id: "m06",
        slug: "module-06",
        num: "06",
        title: "Writing Your First Spec",
        duration: "5–6 hrs",
        phase: "Phase 2",
        phaseId: "phase2",
        overview: "Learn the three spec types — Component, Interaction, and Page — and write your first complete spec.",
      },
    ],
  },
  {
    id: "phase3",
    num: "3",
    name: "Build with AI",
    description: "Run Claude Code sessions, build real components, and keep your design and code in sync.",
    color: "bg-emerald-50",
    accentColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    bgHex: "#6FE3A5",
    textHex: "#191510",
    modules: [
      {
        id: "m07",
        slug: "module-07",
        num: "07",
        title: "Your First AI Session",
        duration: "4–5 hrs",
        phase: "Phase 3",
        phaseId: "phase3",
        overview: "Run your first Claude Code session: load context, write effective prompts, review output.",
      },
      {
        id: "m08",
        slug: "module-08",
        num: "08",
        title: "From Component to Page",
        duration: "5–7 hrs",
        phase: "Phase 3",
        phaseId: "phase3",
        overview: "Build a full page by composing atoms into molecules, organisms, and complete layouts.",
      },
      {
        id: "m09",
        slug: "module-09",
        num: "09",
        title: "Design Sync",
        duration: "3–4 hrs",
        phase: "Phase 3",
        phaseId: "phase3",
        overview: "Keep Figma tokens and CSS variables in parity through a structured review process.",
      },
    ],
  },
  {
    id: "phase4",
    num: "4",
    name: "Ship It",
    description: "Navigate the engineering workflow, deploy to production, and close the full design-to-code loop.",
    color: "bg-amber-50",
    accentColor: "text-amber-700",
    borderColor: "border-amber-200",
    bgHex: "#FFC933",
    textHex: "#191510",
    modules: [
      {
        id: "m10",
        slug: "module-10",
        num: "10",
        title: "Engineering Workflow",
        duration: "4–5 hrs",
        phase: "Phase 4",
        phaseId: "phase4",
        overview: "Branches, pull requests, code review — the Git workflow a designer needs to know.",
      },
      {
        id: "m11",
        slug: "module-11",
        num: "11",
        title: "Deploy & QA",
        duration: "3–4 hrs",
        phase: "Phase 4",
        phaseId: "phase4",
        overview: "Push to Vercel, run QA checks, and manage the deploy/hotfix loop.",
      },
    ],
  },
];

export const capstoneModule: CourseModule = {
  id: "mcap",
  slug: "module-capstone",
  num: "★",
  title: "Capstone Project",
  duration: "10–15 hrs",
  phase: "Capstone",
  phaseId: "capstone",
  overview: "Design and build a complete feature from spec to production using the full course workflow.",
};

export const allModules: CourseModule[] = [
  ...phases.flatMap((p) => p.modules),
  capstoneModule,
];

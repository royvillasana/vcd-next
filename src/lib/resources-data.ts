export type Resource = {
  type: string;
  meta: string;
  title: string;
  desc: string;
  /** Path under /public — served as a direct download. */
  href: string;
  /** Filename the browser saves it as. */
  file: string;
};

export type ResourceGroup = {
  icon: string;
  color: string;
  shadow: string;
  heading: string;
  note: string;
  items: Resource[];
};

export const groups: ResourceGroup[] = [
  {
    icon: "📐",
    color: "#FFC933",
    shadow: "#FF4D24",
    heading: "Spec templates",
    note: "the big three",
    items: [
      {
        type: ".MD",
        meta: "Module 06",
        title: "Component Spec template",
        desc: "Props, variants, states, and token references — the fill-in-the-blanks structure AI can act on.",
        href: "/resources/component-spec-template.md",
        file: "component-spec-template.md",
      },
      {
        type: ".MD",
        meta: "Module 06",
        title: "Interaction Spec template",
        desc: "Triggers, transitions, timing, and easing. Describe motion so precisely it builds itself.",
        href: "/resources/interaction-spec-template.md",
        file: "interaction-spec-template.md",
      },
      {
        type: ".MD",
        meta: "Module 06",
        title: "Page / Feature Spec template",
        desc: "Layout zones, content structure, and system behaviour for whole pages and features.",
        href: "/resources/page-feature-spec-template.md",
        file: "page-feature-spec-template.md",
      },
    ],
  },
  {
    icon: "🤖",
    color: "#B9A5FF",
    shadow: "#7B5CFF",
    heading: "AI context starters",
    note: "prime every session",
    items: [
      {
        type: ".MD",
        meta: "Module 04",
        title: "design.md starter",
        desc: "The canonical design document — tokens, type scale, spacing, and component inventory, pre-structured.",
        href: "/resources/design-md-starter.md",
        file: "design.md",
      },
      {
        type: ".MD",
        meta: "Module 05",
        title: "CLAUDE.md starter",
        desc: "The context file that loads your design rules into every Claude Code session automatically.",
        href: "/resources/claude-md-starter.md",
        file: "CLAUDE.md",
      },
      {
        type: ".MD",
        meta: "Module 00",
        title: "Vibe Session Log template",
        desc: "One page per session: what you asked, what you got, what you\u2019d change. Your course-long artifact.",
        href: "/session-log-template.md",
        file: "session-log-template.md",
      },
    ],
  },
  {
    icon: "✅",
    color: "#6FE3A5",
    shadow: "#1FA45B",
    heading: "Checklists",
    note: "print & pin these",
    items: [
      {
        type: ".PDF",
        meta: "Module 00",
        title: "Prompt precision checklist",
        desc: "Ten questions to run before you hit enter. If AI has to guess, the prompt isn\u2019t done.",
        href: "/resources/prompt-precision-checklist.pdf",
        file: "prompt-precision-checklist.pdf",
      },
      {
        type: ".PDF",
        meta: "Module 10",
        title: "PR review checklist for designers",
        desc: "What to look for in a pull request when you\u2019re the design eye in the room.",
        href: "/resources/pr-review-checklist.pdf",
        file: "pr-review-checklist.pdf",
      },
      {
        type: ".PDF",
        meta: "Module 11",
        title: "Pre-deploy QA checklist",
        desc: "States, breakpoints, keyboard nav, and tokens — verify before it ships, not after.",
        href: "/resources/pre-deploy-qa-checklist.pdf",
        file: "pre-deploy-qa-checklist.pdf",
      },
    ],
  },
];

/* Curated external references (VC-007) */
export type LibraryItem = { cat: string; title: string; by: string; desc: string; href: string };

export const library: LibraryItem[] = [
  {
    cat: "Book",
    title: "Design Engineering Handbook",
    by: "InVision — Natalya Shelburne et al.",
    desc: "The first book-length definition of design engineering. Start here.",
    href: "https://uxlib.net/onlinebooks/design-engineering/index.html",
  },
  {
    cat: "Essay",
    title: "The Case for Design Engineers",
    by: "Jim Nielsen",
    desc: "Why the discipline exists and what a design engineer actually does day to day.",
    href: "https://blog.jim-nielsen.com/2022/the-case-for-design-engineers/",
  },
  {
    cat: "Reference",
    title: "Maggie Appleton — A Collection of Design Engineers",
    by: "maggieappleton.com",
    desc: "A curated look at design engineers and what design engineering looks like in practice.",
    href: "https://maggieappleton.com/design-engineers",
  },
  {
    cat: "Tool",
    title: "Storybook",
    by: "storybook.js.org",
    desc: "The component workshop used throughout this course.",
    href: "https://storybook.js.org",
  },
  {
    cat: "Tool",
    title: "Figma Dev Mode + MCP",
    by: "figma.com",
    desc: "How Figma exposes layers, tokens, and auto-layout to Claude Code.",
    href: "https://www.figma.com/dev-mode/",
  },
  {
    cat: "Reference",
    title: "WCAG 2.2 AA Quick Reference",
    by: "w3.org",
    desc: "The accessibility standard that is the default for all ITX work.",
    href: "https://www.w3.org/WAI/WCAG22/quickref/",
  },
];

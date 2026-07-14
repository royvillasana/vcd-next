export interface TweetQuote {
  text: string;
  author: string;
  handle: string;
  date: string;
  url: string;
}

export interface ToolLink {
  name: string;
  href: string;
  description: string;
}

export interface FrameworkCard {
  name: string;
  subtitle?: string;
  iconSlug?: string;
  iconColor?: string;
  iconBg?: string;
  href?: string;
}

export interface ConceptTab {
  label: string;
  body: string;
  bullets?: string[];
  codeBlocks?: { lang: string; label?: string; content: string }[];
  image?: { src: string; alt: string; caption?: string };
  figmaEmbed?: { nodeId: string; fileKey: string; description?: string };
  frameworkCards?: FrameworkCard[];
  note?: string;
}

export interface FigmaEmbed {
  title: string;
  nodeId: string;
  description: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  body: string;
  tweet?: TweetQuote;
  bullets?: string[];
  tools?: ToolLink[];
  table?: { left: string; right: string }[];
  tableLabels?: { left: string; right: string };
  code?: { lang: string; label?: string; content: string };
  codeBlocks?: { lang: string; label: string; content: string }[];
  tabs?: ConceptTab[];
  figmaEmbeds?: FigmaEmbed[];
  figmaFileKey?: string;
  /** Render the code block side-by-side with the Vibe-vs-DE card comparison. */
  cardCompare?: boolean;
  /** Pair the `code` block side-by-side with a Figma-panel mockup. */
  figmaPanel?: "layers" | "properties" | "autolayout" | "variables";
  /** A framed image/icon shown at the top of the concept card. */
  image?: { src: string; alt: string; caption?: string };
  /** Highlighted callout box (disclaimers, reminders, checklists). */
  callout?: {
    tone?: "info" | "warn" | "success" | "note";
    title?: string;
    body: string;
    bullets?: string[];
  };
}

/** A resource attached to a module's Hands-On Exercise. */
export interface ExerciseResource {
  kind: "download" | "link";
  label: string;
  href: string;
  note?: string;
}

/** A single-select quiz question. `correct` indexes `options`. */
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface ModuleContent {
  objectives: string[];
  concepts: ConceptItem[];
  exercise: {
    title: string;
    description: string;
    steps: string[];
    /** Optional resource specific to THIS exercise (replaces the old global Session Log). */
    resource?: ExerciseResource;
  };
  deliverable: {
    title: string;
    description: string;
  };
  /** Up to 10 single-select questions gating module completion. */
  quiz?: QuizQuestion[];
}

export const moduleContent: Record<string, ModuleContent> = {
  "module-onboarding": {
    objectives: [
      "Understand what the Terminal is and why this course uses it",
      "Open the Terminal on your own machine — macOS or Windows",
      "Complete a first-time setup and verify each tool is installed",
      "Recognize the most common first-run errors and how to fix them",
    ],
    concepts: [
      {
        id: "what-is-the-terminal",
        title: "What Is the Terminal?",
        image: {
          src: "/terminal-2021-06-03.webp",
          alt: "The macOS Terminal app icon",
          caption: "The Terminal app icon on macOS",
        },
        body: "The Terminal is a text window where you type commands to your computer instead of clicking. It looks intimidating, but you only need a handful of commands for this course — and Claude Code will run most of them for you. Think of it as a command palette that happens to accept full sentences.",
        bullets: [
          "You type a command, press Enter, and the computer does the thing",
          "It is where Claude Code, git, and your dev server all live",
          "You are not expected to memorize commands — you copy, paste, and read the output",
          "Nothing you type here can 'break' your computer with the commands in this course",
        ],
        callout: {
          tone: "note",
          title: "You already met this in the Glossary",
          body: "The Glossary defines Terminal in one line and shows the fastest way to open it on a Mac. This module is the longer, hands-on version.",
        },
      },
      {
        id: "open-terminal-mac",
        title: "Open the Terminal on macOS",
        body: "There are two reliable ways to open the Terminal on a Mac. Spotlight is the fastest.",
        bullets: [
          "Spotlight: press ⌘ + Space, type “Terminal”, press Enter",
          "Finder: go to Applications › Utilities › Terminal and double-click",
          "Tip: right-click the Terminal icon in the Dock → Options → Keep in Dock so it is one click away next time",
        ],
        code: {
          lang: "bash",
          label: "confirm it works — type this and press Enter",
          content: `# Your first command. It just prints the current date.
date

# Print the folder you are currently in
pwd`,
        },
      },
      {
        id: "open-terminal-windows",
        title: "Open the Terminal on Windows",
        body: "On Windows, the equivalent app is Windows Terminal (which runs PowerShell). Windows 11 ships with it; on Windows 10 you may install it from the Microsoft Store.",
        bullets: [
          "Start menu: press the Windows key, type “Terminal”, press Enter",
          "Or press Windows key + X and choose “Terminal” (or “Windows PowerShell”)",
          "Right-click the Start button → Terminal is the fastest repeat route",
          "If “Terminal” is not found on Windows 10, install “Windows Terminal” from the Microsoft Store",
        ],
        code: {
          lang: "bash",
          label: "confirm it works — PowerShell",
          content: `# Print the current date
Get-Date

# Print the folder you are currently in
Get-Location`,
        },
      },
      {
        id: "first-time-setup",
        title: "First-Time Setup",
        body: "You will install a few free tools once, then never think about them again. Run each command, wait for it to finish, then run the matching verify command. If a verify command prints a version number, that tool is ready.",
        bullets: [
          "Node.js — runs the course's dev server and tooling",
          "Git — tracks your changes (covered fully in the Engineering Workflow module)",
          "Claude Code — the AI coding agent you will pair with",
        ],
        code: {
          lang: "bash",
          label: "verify each install prints a version",
          content: `# Node.js — should print something like v20.x or v22.x
node --version

# Git — should print something like git version 2.x
git --version

# Claude Code — should print a version number
claude --version`,
        },
        callout: {
          tone: "info",
          title: "Install links",
          body: "Node.js: nodejs.org (choose the LTS build). Git: git-scm.com. Claude Code: follow ITX's onboarding link. Install, close and reopen the Terminal, then run the verify commands above.",
        },
      },
      {
        id: "onboarding-troubleshooting",
        title: "Troubleshooting Common First-Run Errors",
        body: "Almost every first-run problem is one of these three. Match the message you see to the fix.",
        table: [
          { left: "command not found: node (or claude / git)", right: "The tool is not installed, or the Terminal was open before you installed it. Install it, then fully quit and reopen the Terminal." },
          { left: "permission denied", right: "You do not need admin rights for this course. Do not retype with force — re-read the step; you are likely in the wrong folder. Run `pwd` (Mac) / `Get-Location` (Windows) to check." },
          { left: "Nothing happens / it just hangs", right: "A command may be waiting for input or still working. Give it a moment; to cancel and get your prompt back, press Ctrl + C." },
        ],
        tableLabels: { left: "What you see", right: "What to do" },
        callout: {
          tone: "warn",
          title: "When in doubt, paste the error to Claude",
          body: "Copy the full error text, paste it into Claude Code, and ask what it means. Reading and pasting error messages is a core course skill — not a sign you did anything wrong.",
        },
      },
      {
        id: "onboarding-video",
        title: "Walkthrough Video",
        body: "A short screen-recorded walkthrough of this setup is planned. Until it is published, follow the written steps above — they are complete on their own.",
        callout: {
          tone: "note",
          title: "Coming soon",
          body: "Video walkthrough placeholder — to be recorded and embedded here.",
        },
      },
    ],
    exercise: {
      title: "Prove Your Environment Works",
      description: "Before Module 00, confirm your machine is ready. This takes five minutes and saves hours later.",
      steps: [
        "Open the Terminal (Spotlight on Mac, Start menu on Windows)",
        "Run the three verify commands: node --version, git --version, claude --version",
        "Confirm each one prints a version number — no 'command not found'",
        "If any command fails, work through the troubleshooting table and re-run it",
      ],
    },
    deliverable: {
      title: "A Working Terminal + Verified Tools",
      description: "A Terminal you can open confidently and three tools (Node, Git, Claude Code) that each print a version number. That is everything you need to start Module 00.",
    },
    quiz: [
      {
        question: "How do you open the Terminal on macOS?",
        options: [
          "Press ⌘ + Space, type “Terminal”, and press Enter",
          "Right-click the desktop and choose New",
          "Press Ctrl + Alt + Delete",
        ],
        correct: 0,
      },
      {
        question: "What does running `node --version` do?",
        options: [
          "Installs the latest Node.js",
          "Prints the installed Node.js version",
          "Deletes Node.js",
        ],
        correct: 1,
      },
      {
        question: "You see “command not found: claude”. What is the most likely cause?",
        options: [
          "Your internet is down",
          "Your screen is too small",
          "It isn't installed, or the Terminal was open before you installed it",
        ],
        correct: 2,
      },
      {
        question: "A command seems stuck. How do you cancel it and get your prompt back?",
        options: [
          "Press Ctrl + C",
          "Close the laptop lid",
          "Unplug the computer",
        ],
        correct: 0,
      },
    ],
  },

  "module-00": {
    objectives: [
      "Learn where \"vibe coding\" comes from and what Andrej Karpathy actually meant when he coined the term",
      "Trace the origin of \"design engineering\" — from Aarron Walter and Natalya Shelburne coining the term in 2019 to Vercel, Linear, and Adobe formalizing it as a role",
      "Understand the precise difference between vibe coding and design engineering — authorship, accountability, and intentionality",
      "Recognize why your design vocabulary gives you a precision prompting advantage no one else has",
      "Tour the AI coding tool landscape and choose your first tool",
      "Start your Vibe Session Log — the artifact you will build throughout this course",
    ],
    concepts: [
      {
        id: "karpathy-origin",
        title: "Where It Came From: Andrej Karpathy's Tweet",
        body: "On February 2, 2025, AI researcher Andrej Karpathy posted what he later called \"a shower of thoughts throwaway tweet that I just fired off without thinking\" — and accidentally minted the name for an entire movement. The tweet collected over 4.5 million views. Collins Dictionary named \"vibe coding\" a Word of the Year for 2025.",
        tweet: {
          text: "There's a new kind of coding I call \"vibe coding\", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard. I ask for the dumbest things like \"decrease the padding on the sidebar by half\" because I'm too lazy to find it. I \"Accept All\" always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I'd have to really read through it for a while. Sometimes the LLMs can't fix a bug so I just work around it or ask for random changes until it goes away. It's not too bad for throwaway weekend projects, but still quite amusing. I'm building a project or webapp, but it's not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.",
          author: "Andrej Karpathy",
          handle: "@karpathy",
          date: "February 2, 2025",
          url: "https://x.com/karpathy/status/1886192184808149383",
        },
      },
      {
        id: "what-karpathy-meant",
        title: "What the Definition Actually Says — and What It Doesn't",
        body: "Read the tweet carefully. Karpathy describes a specific mode: he gives in completely, accepts everything, never reads diffs, copy-pastes errors without comment. He's explicit that this approach has a ceiling: \"It's not too bad for throwaway weekend projects.\" That caveat is the most important line in the tweet — and the one most people skip.",
        bullets: [
          "\"Forget that the code even exists\" → works when the cost of failure is zero",
          "\"I don't read the diffs anymore\" → acceptable for a Saturday experiment, not for client work",
          "\"Ask for random changes until it goes away\" → this is the debugging strategy of someone who does not need the project to last",
          "\"Throwaway weekend projects\" → Karpathy himself drew the line. This course starts where his tweet ended.",
        ],
      },
      {
        id: "design-engineering-origin",
        title: "Where \"Design Engineering\" Came From",
        body: "While Karpathy minted \"vibe coding\" in a single tweet in 2025, \"design engineering\" was named much earlier — around 2019 — by Aarron Walter and Natalya Shelburne after recognizing that the work happening at the overlap of design and engineering needed a proper name. The InVision Design Engineering Handbook (2020) gave it its first book-length definition. Jim Nielsen's essay \"The Case for Design Engineers\" (2022) brought it to the wider developer community. By 2024, Vercel, Linear, and Adobe had formalized it as an actual job title.",
        bullets: [
          "Coined ~2019 by Aarron Walter (VP of Design Education, InVision) and Natalya Shelburne (The New York Times) — \"We've got to name this thing, this work that's happening right there between design and engineering\"",
          "\"The name of the discipline is design engineering, and a design engineer is someone who specializes in the intersection of the disciplines of design and engineering\" — Natalya Shelburne, InVision Design Engineering Handbook (2020)",
          "Jim Nielsen (2022): \"A design engineer is someone who can imagine how something works, so they don't have to fully articulate it for every iteration\" — fewer handoff artifacts, more direct authorship",
          "Maggie Appleton, Vercel's Rauno Freiberg, Linear's Paco Coursey and Emil Kowalski, and TLDraw's Steve Ruiz are among the most prominent practitioners — all share the same principle: own the full experience, from idea to shipped code",
          "Vercel's design engineer principles: Obsess over usefulness · Own the whole experience · Understand the constraints · Build for everyone · Make it excellent",
        ],
        tweet: {
          text: "Somewhere along the way, design engineering became about animations and slick demos. In reality, it's mostly deciding what not to animate. @emilkowalski gets this. His course is about building great interfaces, not great demos. Speed beats delight. Always.",
          author: "shadcn",
          handle: "@shadcn",
          date: "January 2026",
          url: "https://x.com/shadcn/status/2014318190306750695",
        },
        tools: [
          {
            name: "Design Engineering Handbook",
            href: "https://www.edlou.com/assets/r/InVision_DesignEngineeringHandbook.pdf",
            description: "The first book-length definition of the discipline — Shelburne, Oduye, Williams, Lou. InVision, 2020.",
          },
          {
            name: "The Case for Design Engineers",
            href: "https://blog.jim-nielsen.com/2022/the-case-for-design-engineers/",
            description: "Jim Nielsen's 2022 essay that broke the concept into the wider developer community.",
          },
          {
            name: "A Collection of Design Engineers",
            href: "https://maggieappleton.com/design-engineers",
            description: "Maggie Appleton's curated reference of what design engineering looks like in practice.",
          },
          {
            name: "Design Engineering at Vercel",
            href: "https://vercel.com/blog/design-engineering-at-vercel",
            description: "How Vercel defines, hires, and structures its design engineering team.",
          },
        ],
      },
      {
        id: "de-vs-vibe-coding",
        title: "Design Engineering vs. Vibe Coding",
        body: "Both use AI to generate code from natural language. The difference is what happens before and after the AI runs. Vibe coding gives the AI full authorship and accepts whatever comes back. Design engineering uses the AI as a precision tool — you own the design decisions, specify the constraints, and are accountable for every detail in the output.",
        table: [
          { left: "Understanding the medium", right: "Deep knowledge of browser behavior, CSS, component APIs, accessibility — the AI executes, you decide" },
          { left: "Intentionality", right: "Every detail is a deliberate decision — including what NOT to animate, what NOT to add" },
          { left: "Authorship", right: "You own the design decisions. The AI is the tool, not the author." },
          { left: "Accountability", right: "You can debug, explain, and reason about every choice in the output" },
          { left: "Output quality", right: "Production-ready, maintainable, token-referenced, accessible" },
          { left: "Craft", right: "Taste is a trained instinct — speed beats delight, restraint beats decoration" },
        ],
        tableLabels: { left: "Design Engineering", right: "What it means in practice" },
        codeBlocks: [
          {
            lang: "text",
            label: "vibe coding vs. design engineering — the same component",
            content: `VIBE CODING
Prompt: "make a nice card component"
Process: accept what the AI generates, iterate by feel
Output: probably works, hardcoded values, missing states
Accountability: none — you can't explain the choices

DESIGN ENGINEERING
Prompt: "card-container: 24px padding, 12px radius, border 1px
         var(--color-border). card-title: 18px/600, var(--text-primary).
         card-body: 14px/400, var(--text-secondary), 1.5 line-height.
         States: default, hover (border elevates to --color-border-hover),
         focus-visible (2px outline, 2px offset, var(--ring)),
         disabled (40% opacity, cursor: not-allowed)."
Process: specify constraints → review every state → correct with evidence
Output: token-referenced, all states handled, WCAG AA compliant
Accountability: every value traces back to a design decision`,
          },
        ],
        cardCompare: true,
      },
      {
        id: "vibe-coding-for-designers",
        title: "Design Engineering = Design Precision + AI",
        body: "The insight this course is built on: Karpathy's version of vibe coding gives up control because most people lack the vocabulary to maintain it. Designers don't have that problem. You have spent your entire career describing exactly what you want — padding, spacing, color, weight, state, breakpoint. That vocabulary is a direct AI instruction set.",
        bullets: [
          "Non-designer: \"make a nice card\" → AI guesses → 8 revision cycles",
          "Designer: \"card with 24px padding, 12px border-radius, 18px/600 title, 14px/400 body at 60% opacity\" → AI executes → 1-2 refinements",
          "The shift is not from vague to technical — it's from describing for a human to describing for an AI",
          "Your spec-writing practice is already most of what a good AI prompt requires. The audience changed; the skill did not.",
        ],
      },
      {
        id: "ai-tool-landscape",
        title: "The AI Coding Tool Landscape",
        body: "This course is stack agnostic — the SDD workflow works with any AI coding tool. The same spec produces equivalent output across all of them. The difference is how much control you have over the surrounding codebase.",
        tools: [
          { name: "Cursor", href: "https://cursor.com", description: "Code editor with AI built in. Best for maximum control and iterating on existing codebases." },
          { name: "Lovable", href: "https://lovable.dev", description: "Full-stack app builder. Best for starting new projects from scratch with a visual-first approach." },
          { name: "v0 by Vercel", href: "https://v0.dev", description: "Component generator. Best for isolated UI components — describe it, get React code instantly." },
          { name: "Bolt", href: "https://bolt.new", description: "Full-stack with one-click deploy. Best for prototypes that need to become real products fast." },
          { name: "Replit", href: "https://replit.com", description: "Browser-based editor with AI. Best for learning without any local setup or install." },
          { name: "Claude Code", href: "https://claude.ai/code", description: "AI pair programmer in your terminal. Best for precise, spec-driven work on real codebases — what this course uses." },
        ],
      },
      {
        id: "production-vs-prototype",
        title: "Where This Course Picks Up",
        body: "Most vibe coding tutorials stop at \"it kind of works.\" This course builds to \"it ships.\" The difference is not the AI tool — it is the quality of the input you give it. A prototype needs to look right in one screenshot. A production component needs to handle every state, every breakpoint, every edge case, and every accessibility requirement.",
        bullets: [
          "Prototype: looks right in one state; production: works in all states",
          "Prototype: hardcoded values; production: token references that cascade",
          "Prototype: no keyboard navigation; production: WCAG 2.1 AA compliant",
          "Spec-Driven Development closes this gap by making the spec the contract, not the screenshot",
        ],
        callout: {
          tone: "warn",
          title: "Set your expectations before you build",
          body: "AI-generated code is not perfect, and this course will not pretend otherwise. What you can rely on:",
          bullets: [
            "The first output is a draft, not a finished component — reviewing and correcting it is the job, not a failure",
            "Your results improve with experience: better specs in, better code out",
            "The tools evolve fast — models, features, and best practices will change during and after this course",
          ],
        },
      },
    ],
    exercise: {
      title: "The Precision Test",
      description: "Set up one AI coding tool and run this experiment. Two prompts, same component — compare what precision versus vagueness produces. Run each prompt in a fresh session (clear the context between them) so neither prompt inherits the other's context — that is what keeps the comparison honest.",
      steps: [
        "Choose one AI tool from the landscape above and create a free account",
        "In a fresh session — Vague prompt: 'Make me a nice card component'",
        "In a second fresh session — Precise prompt: 'Build a card component with 24px padding, 12px border-radius, an 18px bold title, a 14px regular subtitle at 60% opacity, and a 1px border using neutral-200'",
        "Screenshot both outputs side by side and note what AI had to guess in the vague version",
      ],
      resource: {
        kind: "download",
        label: "Download the Session Log template",
        href: "/session-log-template.md",
        note: "start your log here — a completed example ships at /session-log-example.md",
      },
    },
    deliverable: {
      title: "Your Vibe Session Log",
      description: "A one-page document capturing what you asked for, what you got, what worked, what did not, and what you want to learn. You will return to this log at the end of the course to measure how far your prompting has come.",
    },
    quiz: [
      {
        question: "Who coined the term “vibe coding”?",
        options: ["Natalya Shelburne", "Andrej Karpathy", "The Figma team"],
        correct: 1,
      },
      {
        question: "What most distinguishes design engineering from vibe coding?",
        options: [
          "You own the design decisions and are accountable for the output",
          "It is always faster",
          "It never uses AI",
        ],
        correct: 0,
      },
      {
        question: "What gives a designer an edge when prompting AI?",
        options: [
          "A faster keyboard",
          "Precise design vocabulary — padding, weight, state, breakpoint",
          "A larger monitor",
        ],
        correct: 1,
      },
      {
        question: "Realistically, a first AI-generated component is…",
        options: [
          "Always production-ready",
          "Never usable",
          "A draft to review and refine",
        ],
        correct: 2,
      },
    ],
  },

  "module-01": {
    objectives: [
      "Map every Figma concept to its direct code equivalent",
      "Read HTML nesting as if reading a Figma layer hierarchy",
      "Translate CSS properties into the Figma properties panel terms you already know",
      "Recognize Flexbox and Grid as auto-layout in code form",
      "Identify CSS Variables as design tokens — same concept, different medium",
    ],
    concepts: [
      {
        id: "html-as-structure",
        title: "HTML Is Figma's Layer Hierarchy",
        body: "HTML is structure. A `<div>` is a frame. Nesting in HTML is the same as Figma's layer panel — children live inside parents, and order matters. You do not need to write HTML; you need to read it as if looking at your layers panel.",
        bullets: [
          "<div> is a frame — a box that holds other boxes",
          "Nesting = Figma layer hierarchy. Children sit inside their parent container",
          "<p> is a text layer. <img> is an image layer. <button> is a component instance",
          "The HTML tree and the Figma layers panel describe exactly the same structure",
        ],
        code: {
          lang: "html",
          content: `<div class="card">
  <div class="card-header">
    <img class="avatar" src="/avatar.jpg" alt="Roy" />
    <div class="user-info">
      <span class="name">Roy Villasana</span>
      <span class="handle">@royv</span>
    </div>
  </div>
  <div class="card-body">
    <p class="post-text">Design in Figma. Build with AI.</p>
    <img class="post-image" src="/post.jpg" alt="Screenshot" />
  </div>
</div>`,
        },
        figmaPanel: "layers",
      },
      {
        id: "css-as-properties-panel",
        title: "CSS Is the Properties Panel",
        body: "CSS is styling. Every property in the CSS rule for an element maps directly to something you set in Figma's right-hand properties panel. The comments in the example below show the Figma panel value on the left, the CSS property on the right — same decision, different syntax.",
        code: {
          lang: "css",
          content: `.card {
  background-color: var(--color-surface);     /* fill */
  border: 1px solid var(--color-border);      /* stroke */
  border-radius: 16px;                        /* corner radius */
  padding: 24px;                              /* padding */
  box-shadow: 0 2px 8px oklch(0 0 0 / 0.08); /* drop shadow */
}

.name {
  font-family: var(--font-sans);
  font-size: 16px;                            /* text style: Heading/SM */
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-neutral-900);
}

.handle {
  font-size: 12px;                            /* text style: Body/XS */
  font-weight: 400;
  color: var(--color-neutral-600);            /* ~60% opacity baked in */
}`,
        },
        figmaPanel: "properties",
      },
      {
        id: "flexbox-as-autolayout",
        title: "Flexbox = Auto-Layout",
        body: "Flexbox is auto-layout. When you see `display: flex` in code, think of a Figma frame with auto-layout enabled. Direction, alignment, and gap map one-to-one to the settings in Figma's auto-layout panel.",
        code: {
          lang: "css",
          content: `/* card-header: horizontal auto-layout */
.card-header {
  display: flex;
  flex-direction: row;    /* horizontal */
  align-items: center;
  gap: 12px;              /* item spacing */
}

/* user-info: vertical auto-layout */
.user-info {
  display: flex;
  flex-direction: column; /* vertical */
  gap: 2px;
}

/* card-body: vertical auto-layout, fill container */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;            /* fill container */
}`,
        },
        figmaPanel: "autolayout",
      },
      {
        id: "css-variables-as-tokens",
        title: "CSS Variables = Design Tokens",
        body: "CSS custom properties (variables) are design tokens in code. In Figma you have a color variable named `color/brand/primary`. In code it becomes `--color-brand-primary`. Same thing — a named design decision that resolves to a value. Both design and code reference the name, not the value, so changing the token cascades everywhere.",
        code: {
          lang: "css",
          content: `:root {
  --color-brand-primary: #0f52ba;
  --color-surface:       #ffffff;
  --color-border:        #e5e7eb;
  --color-neutral-900:   #111827;
  --color-neutral-600:   #4b5563;
  --spacing-4:           16px;
  --radius-md:           12px;
}

/* reference tokens by name, not by value */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}

.btn-primary {
  background-color: var(--color-brand-primary);
  color: #fff;
}`,
        },
        figmaPanel: "variables",
      },
      {
        id: "figma-to-code-table",
        title: "Figma → Code Translation Map",
        body: "Every concept you use in Figma has a code equivalent. Use this table as your personal reference. When AI generates code, cross-check it against what you would set in Figma.",
        callout: {
          tone: "success",
          title: "Which output format should you generate?",
          body: "AI can output the same design as React, HTML/CSS, Vue, or another framework — but the wrong choice creates rework. The ITX default is React; confirm the specifics with the developers before you generate assets.",
          bullets: [
            "ITX official default: React (with Tailwind) — used across the modules and Storybook",
            "Still confirm with the developers on the project which framework the target codebase uses before generating production assets",
            "Use plain HTML/CSS for one-off, framework-agnostic snippets or quick prototypes",
            "Match the destination: generating Vue for a React app (or vice versa) means re-doing the work",
          ],
        },
        tableLabels: { left: "Figma Concept", right: "Code Equivalent" },
        table: [
          { left: "Frame", right: "<div>" },
          { left: "Auto-layout (horizontal)", right: "display: flex; flex-direction: row" },
          { left: "Auto-layout (vertical)", right: "display: flex; flex-direction: column" },
          { left: "Gap (item spacing)", right: "gap: 16px" },
          { left: "Padding", right: "padding: 24px" },
          { left: "Fill color", right: "background-color or color" },
          { left: "Corner radius", right: "border-radius" },
          { left: "Stroke", right: "border" },
          { left: "Opacity", right: "opacity" },
          { left: "Color style", right: "CSS custom property / design token" },
          { left: "Text style", right: "font-family, font-size, font-weight, line-height" },
          { left: "Component", right: "Component function (React, Vue, etc.)" },
          { left: "Component property", right: "Prop" },
          { left: "Variant", right: "Prop value or CSS class" },
          { left: "Instance", right: "Component usage (JSX element)" },
          { left: "Constraints", right: "position, width, min-width, max-width" },
          { left: "Responsive layout", right: "Media queries / container queries" },
        ],
        codeBlocks: [
          {
            lang: "html",
            label: "card.html",
            content: `<div class="card">
  <div class="card-header">
    <img class="avatar" src="/avatar.jpg" alt="Roy" />
    <div class="user-info">
      <span class="name">Roy Villasana</span>
      <span class="handle">@royv</span>
    </div>
    <button class="follow-btn">Follow</button>
  </div>
  <p class="post-text">Design in Figma. Build with AI.</p>
</div>`,
          },
          {
            lang: "css",
            label: "card.css",
            content: `.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-neutral-900);
}

.handle {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-neutral-500);
}

.follow-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-brand-primary);
  color: var(--color-brand-primary);
  background: transparent;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.follow-btn:hover {
  background: var(--color-brand-primary);
  color: #fff;
}`,
          },
        ],
      },
    ],
    exercise: {
      title: "Annotate Your Own Figma File",
      description: "Take a Figma frame you designed — any existing work. Open it alongside this table. You are not writing code; you are translating.",
      steps: [
        "Open any existing Figma frame you designed",
        "Look at each layer in the panel and write its code equivalent next to it (use sticky notes or a Figma comment)",
        "Find every color style and write its CSS variable equivalent",
        "Find the auto-layout settings and write the flex properties they map to",
      ],
    },
    deliverable: {
      title: "Design-to-Code Translation Map",
      description: "An annotated Figma file: every major element labeled with its code equivalent. This becomes your personal reference and a conversation piece in engineering discussions — it shows you understand how design and code relate.",
    },
    quiz: [
      {
        question: "HTML nesting is the same idea as which Figma concept?",
        options: ["The layer hierarchy", "Color styles", "Export settings"],
        correct: 0,
      },
      {
        question: "When you see `display: flex` in CSS, think of…",
        options: ["A component instance", "Auto-layout", "A mask"],
        correct: 1,
      },
      {
        question: "A CSS custom property like `--color-brand-primary` is the code form of a…",
        options: ["Comment", "Media query", "Design token"],
        correct: 2,
      },
      {
        question: "CSS properties on an element map most directly to which Figma surface?",
        options: ["The right-hand properties/design panel", "The layers panel", "The comments panel"],
        correct: 0,
      },
    ],
  },

  "module-02": {
    objectives: [
      "Understand what Node.js is and when you need it as a prerequisite",
      "Install Claude Code in your preferred environment: Terminal, VS Code, Desktop App, Web, or JetBrains",
      "Authenticate with your Anthropic account and verify Claude Code is working",
      "Understand the key configuration options that shape how Claude behaves in your project",
      "Know where Claude Code stores its settings and how to adjust them for your workflow",
    ],
    concepts: [
      {
        id: "three-environments",
        title: "Three Ways to Run Claude Code",
        body: "Claude Code runs in three environments: the terminal (CLI), inside Visual Studio Code, and as a standalone desktop app. All three connect to the same Anthropic account, share your project context, and support MCP servers. The environment changes how you interact with Claude — not what it can do. Choose based on where you spend most of your time. You can switch or use all three simultaneously.",
        bullets: [
          "CLI: the most powerful option — every flag and feature is available, runs in any terminal, works in any directory",
          "VS Code extension: best for when you want to see the files Claude writes alongside your own code in the same window",
          "Desktop App: the lowest barrier to entry — no terminal, no npm, just open a folder and start talking",
          "All three share the same config file (~/.claude.json) and the same MCP server list once you configure them",
        ],
      },
      {
        id: "node-setup",
        title: "What Is Node.js and Why Do You Need It?",
        body: "Node.js is a runtime that lets your computer run JavaScript programs outside of a browser — not in a tab, but directly on your machine, like any other app. You do not write JavaScript to use it. Think of it the same way as a printer driver: it runs behind the scenes and you never interact with it directly. npm (Node Package Manager) ships with Node and is the command-line tool used to install software packages, including Claude Code. The recommended native installer handles Node automatically — but if you use Homebrew or want to understand your development environment, knowing what Node is matters.",
        bullets: [
          "Node.js runs JavaScript programs locally on your machine — outside a browser, like running any other application",
          "npm is Node's package manager — the command-line equivalent of the Mac App Store for developer tools",
          "The native installer (curl / PowerShell) bundles everything including Node — you do not need to pre-install it",
          "If you install via Homebrew or WinGet, Node is also handled automatically. Only npm install requires Node pre-installed",
        ],
        codeBlocks: [
          {
            lang: "bash",
            label: "check if Node is already installed",
            content: `# Run this in your terminal first
node --version

# If you see v18.x, v20.x, v22.x or higher — you're good, skip to the CLI install.
# If you see v16.x or lower — update Node before continuing.
# If you get "command not found" — Node is not installed yet.

# Also check npm (comes with Node):
npm --version`,
          },
          {
            lang: "bash",
            label: "install Node on macOS (recommended: nvm)",
            content: `# nvm = Node Version Manager — lets you install and switch Node versions easily
# This is the recommended approach for Mac and Linux

# Step 1: Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Step 2: Restart your terminal (or run the export command nvm prints after install)

# Step 3: Install the Long-Term Support (LTS) version of Node
nvm install --lts

# Step 4: Confirm
node --version   # → v22.x.x (or similar LTS version)
npm --version    # → 10.x.x`,
          },
          {
            lang: "bash",
            label: "install Node on macOS (alternative: Homebrew)",
            content: `# If you already have Homebrew installed, this is faster:
brew install node

# Verify:
node --version
npm --version`,
          },
          {
            lang: "bash",
            label: "install Node on Windows",
            content: `# Option A: official installer (simplest)
# 1. Go to nodejs.org
# 2. Click "LTS" (Long-Term Support) — not "Current"
# 3. Download and run the Windows installer (.msi)
# 4. Accept defaults — make sure "Add to PATH" stays checked
# 5. Open a new Command Prompt or PowerShell and verify:
node --version
npm --version

# Option B: winget (Windows Package Manager)
winget install OpenJS.NodeJS.LTS`,
          },
        ],
      },
      {
        id: "install-claude-code",
        title: "Installing Claude Code",
        body: "Claude Code is available in five environments. All five use the same Anthropic account and the same Claude engine. Pick the one that fits how you work — you can always switch or use multiple at the same time.",
        tabs: [
          {
            label: "Terminal",
            body: "The full-featured CLI for working with Claude Code directly in your terminal. Edit files, run commands, and manage your entire project from the command line. The native installer is the recommended path — one command, no prerequisites.",
            codeBlocks: [
              {
                lang: "bash",
                label: "macOS / Linux / WSL — native install (recommended)",
                content: `curl -fsSL https://claude.ai/install.sh | bash`,
              },
              {
                lang: "powershell",
                label: "Windows PowerShell — native install",
                content: `irm https://claude.ai/install.ps1 | iex`,
              },
              {
                lang: "bash",
                label: "macOS — Homebrew alternative",
                content: `brew install --cask claude-code
# Note: Homebrew does not auto-update. Run "brew upgrade claude-code" to update manually.`,
              },
              {
                lang: "powershell",
                label: "Windows — WinGet alternative",
                content: `winget install Anthropic.ClaudeCode
# Note: WinGet does not auto-update. Run "winget upgrade Anthropic.ClaudeCode" to update manually.`,
              },
              {
                lang: "bash",
                label: "start a session",
                content: `# After installing, navigate to your project and launch Claude
cd your-project
claude
# You'll be prompted to log in on first use — that's it.`,
              },
            ],
            note: "Native installations auto-update in the background. Homebrew and WinGet require manual updates.",
          },
          {
            label: "VS Code",
            body: "The VS Code extension provides inline diffs, @-mentions, plan review, and conversation history directly in your editor. It works in VS Code and Cursor. The extension uses the same config as the CLI — any MCP servers you configured in the terminal are available here automatically.",
            bullets: [
              "Search for 'Claude Code' in the Extensions panel (publisher: Anthropic) and click Install",
              "Or install for Cursor by searching 'Claude Code' in Cursor's Extensions panel",
              "After installing: open the Command Palette (Cmd+Shift+P / Ctrl+Shift+P), type 'Claude Code', select 'Open in New Tab'",
              "Settings to check: turn 'Auto Accept Edits' OFF while learning so you review every change before it lands",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "install from the terminal",
                content: `# VS Code
code --install-extension anthropic.claude-code

# Cursor
cursor --install-extension anthropic.claude-code`,
              },
              {
                lang: "json",
                label: "recommended settings.json entries",
                content: `{
  "claude-code.autoAcceptEdits": false,
  "claude-code.showDiffOnAccept": true,
  "claude-code.defaultModel": "claude-sonnet-4-6"
}`,
              },
            ],
          },
          {
            label: "Desktop App",
            body: "A standalone app for running Claude Code outside your IDE or terminal. Review diffs visually, run multiple sessions side by side, and manage projects with no terminal required. The easiest starting point for designers who are not yet comfortable in the command line.",
            bullets: [
              "Download for macOS (Intel and Apple Silicon) or Windows (x64 / ARM64) from claude.ai/download",
              "Launch Claude, sign in with your Anthropic account, and click the Code tab to start coding",
              "Open a project by dragging a folder into the app or using File → Open Folder",
              "The Settings panel (gear icon) exposes model selection, MCP servers, and theme — no JSON required",
              "Requires a paid Claude subscription",
            ],
          },
          {
            label: "Web",
            body: "Run Claude Code in your browser with no local setup. Useful for working on repos you don't have locally, checking in on long-running tasks from any device, or running multiple sessions in parallel. Available on desktop browsers and the Claude iOS app.",
            bullets: [
              "Go to claude.ai/code — no download or installation required",
              "Sign in with your Anthropic account and connect a repository",
              "Works on desktop browsers and the Claude iOS app",
              "Kick off a long-running task and check back when it's done — sessions persist when you close the tab",
            ],
          },
          {
            label: "JetBrains",
            body: "A plugin for IntelliJ IDEA, PyCharm, WebStorm, GoLand, and other JetBrains IDEs. Provides interactive diff viewing and selection context sharing directly in the IDE.",
            bullets: [
              "Install the Claude Code plugin from the JetBrains Marketplace — search 'Claude Code'",
              "Restart your IDE after installing",
              "Requires the Claude Code CLI installed separately — install the Terminal version first, then add the plugin",
              "Once both are installed, the plugin connects to your running CLI session automatically",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "install CLI first, then add the plugin",
                content: `# Step 1: install the CLI (if not already done)
curl -fsSL https://claude.ai/install.sh | bash

# Step 2: install the JetBrains plugin
# Open JetBrains IDE → Settings → Plugins → Marketplace
# Search: Claude Code → Install → Restart IDE`,
              },
            ],
          },
        ],
      },
      {
        id: "what-claude-code-can-do",
        title: "What Claude Code Can Do",
        body: "Claude Code is not just a code autocomplete tool. It understands your entire codebase, edits files across multiple locations at once, runs shell commands, commits to git, and connects to external tools through MCP. These are the capabilities you'll use most as a designer.",
        tabs: [
          {
            label: "Build & Fix",
            body: "Describe what you want in plain language. Claude Code plans the approach, writes the code across multiple files, and verifies it works. For bugs, paste an error or describe the symptom — Claude traces the issue through your codebase, identifies the root cause, and implements a fix.",
            bullets: [
              "Build a feature: 'Add a dark mode toggle to the header' — Claude writes the component, the hook, and the CSS variables",
              "Fix a bug: paste an error message — Claude traces it to the source and implements a fix",
              "Refactor: 'Convert all hardcoded hex values to CSS custom properties' — Claude edits every file at once",
              "Write tests: 'Write tests for the auth module, run them, and fix any failures' — Claude iterates until tests pass",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "example prompts",
                content: `# Build a feature across multiple files
claude "add a Toast notification component that uses our design tokens"

# Fix a bug from an error message
claude "fix this error: TypeError: Cannot read property 'map' of undefined in ProductList.tsx line 42"

# Automate tedious work
claude "write tests for the auth module, run them, and fix any failures"`,
              },
            ],
          },
          {
            label: "Git & PRs",
            body: "Claude Code works directly with git. It stages changes, writes descriptive commit messages based on what actually changed, creates branches, and opens pull requests. In CI, you can automate code review and issue triage with GitHub Actions.",
            codeBlocks: [
              {
                lang: "bash",
                label: "git workflow",
                content: `# Stage and commit with a generated message
claude "commit my changes with a descriptive message"

# Create a pull request
claude "create a PR for these changes — summarize what changed and why"

# Review changed files for issues before merging
git diff main --name-only | claude -p "review these changed files for any accessibility issues"`,
              },
            ],
          },
          {
            label: "MCP & Tools",
            body: "The Model Context Protocol (MCP) connects Claude Code to external tools — Figma, Jira, Slack, Google Drive, or your own custom tooling. With MCP, Claude can read your live Figma designs, update tickets, and pull real data into its context.",
            bullets: [
              "Figma MCP — read live design files and generate code directly from your components (covered in Module 3)",
              "Storybook MCP — query your component library and generate stories",
              "Slack MCP — pull data from channels into Claude's context",
              "GitHub MCP — read issues, PRs, and repo data directly",
              "Custom MCP servers — connect any API or data source using the open MCP standard",
            ],
          },
          {
            label: "Automate & Schedule",
            body: "Claude Code can pipe input from other tools, run in CI pipelines, and execute on a schedule. Use Routines for recurring tasks that run on Anthropic infrastructure even when your computer is off.",
            bullets: [
              "Pipe logs into Claude: tail -200 app.log | claude -p 'alert me if you see any errors'",
              "Run in CI: automate PR reviews, translate new strings, bulk-update files across a repo",
              "Routines: schedule recurring tasks — morning PR reviews, weekly dependency audits, docs sync after merges",
              "Remote Control: start a task on your desktop, continue from your phone or any browser",
              "Background agents: spawn multiple Claude sessions working on different parts of a task simultaneously",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "automation examples",
                content: `# Analyze logs
tail -200 app.log | claude -p "tell me if you see any anomalies"

# Automate translations in CI
claude -p "translate new strings in src/locales/en.json into French and raise a PR"

# Bulk review changed files
git diff main --name-only | claude -p "review these files for security issues"`,
              },
            ],
          },
        ],
      },
      {
        id: "key-configuration",
        title: "Configuration Settings That Matter",
        body: "Most Claude Code settings work fine at their defaults. A handful of them directly affect the quality and safety of AI sessions — especially when you are working on real projects. These are the ones worth knowing before you build anything.",
        bullets: [
          "CLAUDE.md: the project-specific context file Claude reads at the start of every session — you will write this in Module 6",
          "autoAcceptEdits: when OFF, Claude shows you every file change before writing it. Keep it OFF while you are learning",
          "maxFileReads: limits how many files Claude can read per session — raise it for large codebases, lower it to stay focused",
          "Model selection: Opus 4.6 for complex architecture decisions, Sonnet 4.6 for everyday component work",
        ],
        codeBlocks: [
          {
            lang: "json",
            label: "~/.claude.json — common settings",
            content: `{
  "model": "claude-sonnet-4-6",
  "autoAcceptEdits": false,
  "maxFileReads": 200,
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp"],
      "env": {
        "FIGMA_API_KEY": "figd_your_token_here"
      }
    }
  }
}`,
          },
          {
            lang: "bash",
            label: "check what Claude sees at startup",
            content: `# Claude reads these files automatically at the start of every session:
# 1. ~/.claude.json         (user-level config)
# 2. .claude.json           (project-level config, if present)
# 3. CLAUDE.md              (your project context instructions)
# 4. design.md              (your design spec, if you tell Claude to read it)

# To confirm Claude loaded your project correctly:
claude "What design rules should you follow in this project?"
# → If CLAUDE.md exists, Claude will quote from it.
# → If not, it will say it found no instructions.`,
          },
        ],
      },
      {
        id: "troubleshooting",
        title: "Installation Troubleshooting",
        body: "If you hit errors during installation — a 403, a curl syntax error, authentication failures, or platform-specific issues — the official troubleshooting guide walks you through matching your exact error to a fix. Check this before trying alternative install methods.",
        bullets: [
          "\"syntax error near unexpected token '<'\" — you're piping HTML, not a script. Your network is intercepting the request.",
          "\"403 Forbidden\" during curl — a firewall or proxy is blocking the download. Use a package manager (Homebrew / WinGet) instead.",
          "\"The token '&&' is not a valid statement separator\" — you're in PowerShell, not CMD. Use the irm command instead of curl.",
          "\"'irm' is not recognized\" — you're in CMD, not PowerShell. Switch to PowerShell or use the curl command.",
          "Authentication issues after install — run claude login and follow the browser prompt to reconnect your account.",
        ],
        tools: [
          {
            name: "Troubleshoot Installation",
            href: "https://code.claude.com/docs/en/troubleshoot-install#find-your-error",
            description: "Official guide — match your error message to a step-by-step fix. Covers curl failures, 403s, Windows shell confusion, auth issues, and Linux package manager alternatives.",
          },
        ],
      },
    ],
    exercise: {
      title: "Install and Configure All Three Environments",
      description: "Set up Claude Code in every environment in sequence. By the end you will know which one fits your workflow and have a working config that applies across all of them.",
      steps: [
        "Install the CLI: run curl -fsSL https://claude.ai/install.sh | bash (macOS/Linux) or irm https://claude.ai/install.ps1 | iex (Windows PowerShell) — you'll be prompted to authenticate on first launch",
        "Confirm the CLI works: navigate to any project folder and run claude \"What files are in this project?\"",
        "Install the VS Code extension (search 'Claude Code' by Anthropic), sign in, and open the same project",
        "Open the VS Code settings.json and set autoAcceptEdits to false and showDiffOnAccept to true",
        "Download the Desktop App, sign in with the same account, and open the project folder",
        "In the Desktop App settings panel, verify the model is set and check that any MCP servers you configured in the CLI appear here",
      ],
    },
    deliverable: {
      title: "Verified Claude Code Setup",
      description: "All three environments running and authenticated. Screenshot the Claude Code panel in VS Code and the Desktop App settings panel side by side to confirm they show the same account and model. Add a note to your Vibe Session Log documenting which environment you plan to use primarily and why.",
    },
  },

  "module-03": {
    objectives: [
      "Understand what the Figma MCP server is and how it connects Claude Code to your live Figma files",
      "Set up Figma Variables as design tokens and understand how they map to CSS custom properties",
      "Configure component properties so AI generates components with the correct API",
      "Install the Figma MCP server and connect it to Claude Code so Claude can read your designs directly",
      "Use Figma Skills — pre-built AI workflows — to generate screens, libraries, and components from your design system",
      "Choose your target framework — React, Angular, or HTML/CSS — and generate production components from a live Figma selection",
      "Structure your Figma file so the AI produces clean, token-referenced code with minimal correction",
    ],
    concepts: [
      {
        id: "design-variables-tokens",
        title: "Design Variables and Tokens",
        body: "Figma Variables are design tokens. A design token is a named design decision — a color, a spacing value, a font size — that both design and code reference by name rather than by value. When you change a token, the change cascades everywhere that references it. When the Figma MCP reads your file, it sees these variable names — so a well-named token system produces well-named CSS custom properties automatically.",
        bullets: [
          "Create a variable collection: color/brand/primary, spacing/4, typography/heading-lg",
          "Variables resolve to values — AI and engineers use the name, not the hardcoded value",
          "Naming convention engineers recognize: color.brand.primary → --color-brand-primary in CSS",
          "When your Figma file uses variables, Claude Code references them by name in the generated code — not by raw hex",
        ],
      },
      {
        id: "component-properties-to-props",
        title: "Component Properties → Code Props",
        body: "Every Figma component property has a direct code equivalent. Setting up properties correctly means AI can generate components with the right API without guessing your intended interface. The Figma MCP reads component properties and uses them to infer the prop signature for the generated component.",
        bullets: [
          "Boolean property → disabled: boolean (or any true/false prop)",
          "Text property → label: string (or children: ReactNode)",
          "Instance swap → icon: IconComponent (an interchangeable slot)",
          "Variant property → variant: \"filled\" | \"outlined\" | \"ghost\" (a typed union)",
        ],
      },
      {
        id: "figma-visual-examples",
        title: "Visual Learning Path — Core Concepts in Figma",
        body: "The four frames below were built directly inside this course's Figma file using the Figma MCP and Claude Code — the exact same workflow you are learning. Explore each frame interactively: zoom in, inspect layer names, check variable references, and examine the auto-layout settings. This is a live Figma file, not a screenshot.",
        bullets: [
          "Frame 01 — Design Tokens & Variables: primary/secondary palettes, semantic colors, and the spacing scale used in this design system",
          "Frame 02 — Component Properties: the four property types (Variant, Boolean, Text, Instance Swap) and a live button variant grid",
          "Frame 03 — Auto-Layout Fundamentals: a before/after comparison of absolute vs. auto-layout, with sizing modes and direction reference",
          "Frame 04 — Components & Instances: the main component, three instances with overrides, and a quick-reference glossary",
        ],
        figmaFileKey: "ojko9pGfsDAvmUf2DA38d2",
        figmaEmbeds: [
          {
            title: "01 / Design Tokens & Variables",
            nodeId: "6699-17",
            description: "Color palettes, semantic tokens, and spacing scale",
          },
          {
            title: "02 / Component Properties",
            nodeId: "6699-20",
            description: "Property types and live button variant grid",
          },
          {
            title: "03 / Auto-Layout Fundamentals",
            nodeId: "6699-23",
            description: "Absolute vs. auto-layout: before/after comparison",
          },
          {
            title: "04 / Components & Instances",
            nodeId: "6699-26",
            description: "Main component, instances, overrides, and glossary",
          },
        ],
      },
      {
        id: "figma-mcp-setup",
        title: "Installing and Configuring the Figma MCP",
        body: "MCP stands for Model Context Protocol — an open standard that lets Claude connect to external tools and data sources. The Figma MCP gives Claude Code direct read access to your Figma files: layer structure, auto-layout settings, variable references, component properties, fills, strokes, and typography. There are three ways to set it up — choose the one that matches your situation.",
        tabs: [
          {
            label: "Remote (Recommended)",
            body: "The remote MCP uses OAuth — no API token to manage. Figma hosts the server, Claude Code connects to it. This is the official recommended method for most designers.",
            bullets: [
              "Works with Claude Code CLI, VS Code extension, and Desktop App",
              "Authentication is handled via your Figma account — no token to copy or store",
              "Figma maintains the server — you get updates automatically",
              "Requires internet access to figma.com during Claude sessions",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "install the Figma plugin",
                content: `# Run this in your terminal (Claude Code CLI must be installed first)
claude plugin install figma@claude-plugins-official

# Claude Code will:
# 1. Download and register the Figma plugin
# 2. Open a browser window for OAuth authorization
# 3. Ask you to sign in to Figma and approve access
# 4. Return to the terminal once authorized`,
              },
              {
                lang: "bash",
                label: "verify the connection",
                content: `# Check that the Figma MCP is registered and active
claude mcp list
# → figma-official   (remote)  connected

# Test with a Figma file URL
claude "Using the Figma MCP, list the top-level frames in this file: https://figma.com/design/YOUR_FILE_ID"
# Claude calls the MCP and returns the frames from your file`,
              },
            ],
            image: {
              src: "/figma-mcp/setup-claude-code.gif",
              alt: "Terminal showing the Figma MCP setup process in Claude Code — running claude plugin install, browser OAuth flow, and verification",
              caption: "Source: help.figma.com — Setting up the Figma MCP with Claude Code",
            },
            note: "If the browser does not open automatically, copy the URL from the terminal output and open it manually in your browser.",
          },
          {
            label: "Desktop (Enterprise)",
            body: "If your organization uses Figma Desktop with Dev Mode enabled, you can connect the MCP directly from the Figma app. This keeps everything local — no internet connection to an external MCP server.",
            bullets: [
              "Requires Figma Desktop app with Dev Mode (requires an Organization or Enterprise plan)",
              "The MCP server runs locally at http://127.0.0.1:3845/mcp while Figma Desktop is open",
              "If Figma Desktop is closed, the MCP connection drops — Claude cannot reach it",
              "Best for enterprise teams with strict network policies or no external MCP access",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "Step 1 — enable the local server in Figma Desktop",
                content: `# In Figma Desktop:
# 1. Open any file in Dev Mode
# 2. Go to Figma menu → Preferences → Enable Dev Mode MCP Server
# 3. Figma starts a local server at http://127.0.0.1:3845/mcp
# Leave Figma Desktop open during your Claude sessions`,
              },
              {
                lang: "bash",
                label: "Step 2 — register the local server with Claude Code",
                content: `# Register the Figma Desktop MCP endpoint
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp

# Verify it appears
claude mcp list
# → figma-desktop   http://127.0.0.1:3845/mcp

# Test the connection (Figma Desktop must be open)
claude "Using the Figma MCP, what pages are in the currently open Figma file?"`,
              },
            ],
            note: "The local MCP server is only available while Figma Desktop is running. If Claude cannot reach it, open Figma Desktop and verify Dev Mode MCP Server is enabled in Preferences.",
          },
          {
            label: "npm (Alternative)",
            body: "The community figma-developer-mcp package connects via a Figma Personal Access Token. Use this if the remote plugin is not available in your region or if you prefer a self-hosted approach.",
            bullets: [
              "Requires a Figma Personal Access Token (PAT) — generated in Figma Account Settings",
              "The token is stored in your Claude configuration — keep it secure and do not commit it to Git",
              "You maintain the package — update it manually when new features are released",
              "Works offline for any file your Figma account can access",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "Step 1 — generate a Figma Personal Access Token",
                content: `# In Figma:
# 1. Click your avatar (top-left) → Account Settings
# 2. Scroll to "Personal access tokens"
# 3. Click "Generate new token"
# 4. Give it a name: "Claude Code MCP"
# 5. Copy the token immediately — it starts with "figd_"
#    You will not be able to see it again after closing this dialog`,
              },
              {
                lang: "bash",
                label: "Step 2 — register the MCP with your token",
                content: `# Replace YOUR_FIGMA_TOKEN with the token you copied
claude mcp add figma npx -- -y figma-developer-mcp --figma-api-key=YOUR_FIGMA_TOKEN

# Verify it is registered
claude mcp list
# → figma    npx -y figma-developer-mcp

# Test with a Figma file
claude "Using the Figma MCP, list the pages in: https://figma.com/design/YOUR_FILE_ID"`,
              },
            ],
            note: "Treat your Figma PAT like a password. Do not paste it in plain text in prompts or commit it to version control. If you rotate the token in Figma, re-run the registration command with the new value.",
          },
        ],
      },
      {
        id: "figma-skills",
        title: "Figma Skills: Pre-built AI Workflows",
        body: "Skills are pre-built instruction sets that ship with the Figma MCP plugin. When you install the Figma plugin (`claude plugin install figma@claude-plugins-official`), Skills are included automatically. Each Skill packages a complete workflow into a single slash command — instead of writing a long prompt from scratch, you invoke a Skill and Claude knows exactly which MCP tools to call, in what order, and how to apply the results. Skills are the difference between a one-liner prompt and a reliable, repeatable design-to-code workflow.",
        tabs: [
          {
            label: "How It Works",
            body: "The Figma MCP server acts as a bridge between Claude Code and your Figma files. When you run a prompt, Claude calls the MCP server, which fetches structured design data from your Figma file and returns it directly to Claude — no copy-paste, no export, no handoff file.",
            image: {
              src: "/figma-mcp/figma-browser-mcp-connection.gif",
              alt: "Animated diagram showing Figma in the browser on the left connected to the MCP server on the right — illustrating how Claude reads design data directly from Figma",
              caption: "Figma ↔ MCP server: Claude reads your design data directly. No export, no handoff. Source: help.figma.com",
            },
            bullets: [
              "Claude calls the MCP server → the server fetches live design data from your Figma file → Claude uses that data to write code",
              "The MCP reads: layer names, auto-layout settings, variable references, component properties, fills, strokes, typography, and annotations",
              "Write-to-canvas capability: Claude can also create frames, components, and variables in your Figma file — not just read from it",
              "Skills give Claude the instructions it needs to use MCP tools correctly for multi-step tasks like generating an entire screen or a component library",
              "Requires a Full or Dev seat — other seat types have usage limits for write-to-canvas operations",
            ],
          },
          {
            label: "Available Skills",
            body: "Eight official Skills ship with the Figma plugin. Invoke them with a slash command in Claude Code. Type / at the start of a prompt to see all installed skills.",
            bullets: [
              "/figma-use — the core write-to-canvas skill. Tells Claude how to create frames, components, variables, and layouts directly in a Figma file using your existing design system",
              "/figma-generate-design — generates a complete screen (mobile or desktop) using your design system components and variables. Provide a description and a Figma file URL",
              "/figma-generate-library — builds a starter component library in a new Figma file: buttons, inputs, badges, and typography at minimum",
              "/figma-code-connect — connects your published Figma components to their matching code implementations using Code Connect. Keeps design and code in sync",
              "/figma-create-new-file — creates a new Figma design file and returns the URL. Use this as the first step in a design generation workflow",
              "/figma-generate-diagram — creates flowcharts, user flows, and architecture diagrams directly in a FigJam or Figma file",
              "/figma-use-figjam — variant of figma-use for FigJam boards: creates sticky notes, connectors, sections, and diagrams",
              "/figma-swiftui — translates between Figma designs and SwiftUI code in both directions. For iOS/macOS work",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "invoking skills in Claude Code",
                content: `# Check which skills are installed
/                    # type / to list all skills

# Generate a screen from your design system
/figma-generate-design Use my design system to create a mobile account settings screen in this file: https://figma.com/design/YOUR_FILE_ID

# Build a new component library
/figma-generate-library Create a starter component library with buttons, inputs, badges, and cards in a new Figma file

# Create a user flow diagram
/figma-generate-diagram Create a flowchart for the user authentication flow

# Write to canvas using your design system components
/figma-use Create a new page called "Login screen" and build a login form using the Button and Input components from our design system`,
              },
            ],
          },
          {
            label: "Skills vs. Tools",
            body: "The MCP server exposes Tools — individual capabilities Claude can call. Skills are a layer above Tools: they tell Claude which tools to use, in what sequence, and how to interpret the results. Understanding the difference helps you know when to invoke a Skill and when to write a direct prompt.",
            bullets: [
              "MCP Tools are atomic: get_design_context, get_variable_defs, create_frame, set_fills — each does one thing",
              "Skills are workflows: /figma-generate-design uses several tools in sequence — read the design system, plan the layout, create frames, apply components, set variables",
              "Use a Skill when you want a complete outcome: a full screen, a component library, a diagram",
              "Use a direct prompt (without a Skill) when you want one specific thing: 'Read the Card component at [URL] and build it as a React component'",
              "Skills reduce prompt engineering — they encode the best known workflow for a task so you do not have to figure it out each time",
              "Community skills are available on GitHub (github.com/figma/mcp-server-guide) — you can also write your own",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "skill (complete workflow) vs. direct prompt (targeted task)",
                content: `# SKILL — complete multi-step outcome
/figma-generate-design Use my design system to create a dashboard with
a sidebar nav, header, and main content area in: https://figma.com/design/ID

# DIRECT PROMPT — targeted single-component task
claude "Read the Sidebar component at https://figma.com/design/ID?node-id=42
using the Figma MCP and build it as a React TypeScript component with Tailwind."

# Mix both: use a skill to create the Figma frame, then prompt Claude to code it
/figma-use Create a new 'Dashboard' frame using our Nav and Card components
claude "Read the Dashboard frame I just created at [URL] and build it as Next.js code"`,
              },
            ],
          },
          {
            label: "Example Prompts",
            body: "These are real prompts from Figma's official documentation that demonstrate how to combine Skills with direct MCP access. Use these as templates for your own sessions.",
            codeBlocks: [
              {
                lang: "bash",
                label: "design generation",
                content: `# Generate a screen using your design system (Skill)
/figma-use can you help me create a new Figma design using my design system components?

# Generate a specific page layout (Skill + description)
/figma-generate-design Use my design system to create a mobile account settings screen with profile info, notification preferences, and a sign-out button. File: https://figma.com/design/YOUR_FILE_ID

# Build a component library from scratch (Skill)
/figma-generate-library Create a starter component library with buttons in all sizes, a text input, a dropdown, and a card component`,
              },
              {
                lang: "bash",
                label: "design-to-code (direct MCP prompt)",
                content: `# Read a specific frame and generate code
claude "Read the AccountSettings frame at https://figma.com/design/ID?node-id=123
using the Figma MCP. Build it as a React TypeScript page component.
Use Tailwind CSS. Map every Figma variable to its Tailwind token equivalent.
Implement all annotated interaction states."

# Capture a live web UI into Figma (write-to-canvas)
claude "Capture the UI of my app homepage at http://localhost:3000 as
editable frames in this Figma file: https://figma.com/design/YOUR_FILE_ID"`,
              },
              {
                lang: "bash",
                label: "diagrams and flows",
                content: `# Generate a user flow in FigJam
/figma-generate-diagram Create a flowchart for the user authentication flow using the Figma MCP generate_diagram tool

# Create an architecture diagram
claude "Using the Figma MCP generate_diagram tool, create a system architecture
diagram for a Next.js app with: Next.js frontend, API routes, Vercel Postgres,
and an AI SDK integration. Place it in: https://figma.com/design/YOUR_FILE_ID"`,
              },
            ],
            note: "Skills require the remote MCP server (installed via claude plugin install figma@claude-plugins-official). The Desktop MCP and npm package do not include Skills.",
          },
        ],
      },
      {
        id: "framework-choice",
        title: "Choosing Your Framework: React, Angular, or HTML/CSS",
        body: "The Figma design does not change — only the code output does. You tell Claude Code the target framework and any library your project uses. Claude adapts the same design into the right output for your stack. You can run the same prompt against the same Figma frame and get three completely different but equivalent implementations.",
        bullets: [
          "React: outputs a JSX component with typed props, hooks for interactivity, and className-based styling",
          "Angular: outputs a TypeScript component with @Component decorator, template, and a module-scoped stylesheet",
          "HTML/CSS: outputs semantic markup and a clean external stylesheet — no framework dependencies",
          "Specify a UI library in the prompt: 'Use shadcn/ui', 'Use Angular Material', or 'No library — plain CSS'",
        ],
        codeBlocks: [
          {
            lang: "bash",
            label: "React + Tailwind",
            content: `claude "Read the Card component at [Figma frame URL] using the Figma MCP. Build it as a React TypeScript component. Use Tailwind CSS for styling. Map each Figma variable to its Tailwind token equivalent."`,
          },
          {
            lang: "bash",
            label: "Angular + Material",
            content: `claude "Read the Card component at [Figma frame URL] using the Figma MCP. Build it as an Angular component with TypeScript. Use Angular Material where it matches the design. Output a .component.ts, .component.html, and .component.scss."`,
          },
          {
            lang: "bash",
            label: "Plain HTML + CSS",
            content: `claude "Read the Card component at [Figma frame URL] using the Figma MCP. Build it as semantic HTML5 with an external stylesheet. No framework. Use CSS custom properties for every color, spacing, and radius value."`,
          },
        ],
      },
      {
        id: "structuring-figma-for-mcp",
        title: "Structuring Your Figma File for Better AI Output",
        body: "The Figma MCP reads exactly what is in your file — layer names, variable references, auto-layout settings, component properties, and annotations. The AI cannot guess what you intended. A well-structured file produces clean, token-referenced code in one pass. A poorly structured file produces hardcoded values, generic class names, and missing behavior — all of which you have to correct manually. This is the most important design skill in a vibe coding workflow.",
        tabs: [
          {
            label: "Layer Names",
            body: "Layer names in Figma become element names, class names, and prop names in the generated code. The MCP passes them directly to Claude. Generic auto-names like 'Frame 42' or 'Group 7' produce meaningless class names like .frame-42. Semantic names produce production-quality class names that communicate intent.",
            bullets: [
              "Use kebab-case for container names: 'card-header', 'nav-item', 'form-field' — these map to CSS class names",
              "Name interactive elements by role: 'button-primary', 'input-email', 'link-back' — Claude uses these as element and ARIA labels",
              "Use the same naming convention as your design token system — if your tokens are 'color-text-primary', your layer should reference it",
              "Keep a 'Scratch / WIP' page for work in progress — MCP reads all pages, clean pages produce clean output",
              "Mark frames as 'Ready for dev' in Figma — this signals to the MCP which frames are production-ready",
            ],
            codeBlocks: [
              {
                lang: "text",
                label: "bad layer names → what Claude generates",
                content: `// Figma layers:          → Generated CSS:
Frame 42               →  .frame-42 { }
Group 7                →  .group-7 { }
Rectangle 1            →  .rectangle-1 { }
Text                   →  .text { }

// These class names communicate nothing.
// The developer has to rename everything by hand.`,
              },
              {
                lang: "text",
                label: "good layer names → what Claude generates",
                content: `// Figma layers:          → Generated CSS:
card-container         →  .card-container { }
card-header            →  .card-header { }
card-title             →  .card-title { }
button-primary         →  .button-primary { }

// These class names are production-ready.
// No renaming required.`,
              },
            ],
            image: {
              src: "/figma-mcp/file-organization-pages.png",
              alt: "Figma Dev Mode sidebar showing well-organized pages: Brand style guide, Screens, Activity flow, and Scratch/WIP — with frames labeled semantically like M/Activities/Different",
              caption: "A clean page structure: named pages, semantic frame labels, and a dedicated Scratch/WIP page keeps the MCP output focused. Source: help.figma.com",
            },
            figmaEmbed: {
              nodeId: "6722-17",
              fileKey: "ojko9pGfsDAvmUf2DA38d2",
              description: "Figma layers panel illustration — semantic vs. generic layer naming and the CSS class names each approach produces",
            },
          },
          {
            label: "Variables",
            body: "Variables are the single biggest factor in the quality of AI-generated code. When every color, spacing value, and radius references a Figma variable, Claude outputs CSS custom property references — not hardcoded values. A hardcoded value breaks your token system the moment the design changes. A variable reference stays correct automatically.",
            bullets: [
              "Replace every hardcoded color fill with a Color variable — Claude outputs var(--color-text-primary) instead of #1A1A1A",
              "Replace every hardcoded spacing value with a Spacing variable — Claude outputs var(--space-400) instead of 16px",
              "Replace every hardcoded radius with a Radius variable — Claude outputs var(--radius-md) instead of 8px",
              "Typography styles become font-family, font-size, font-weight, and line-height token references — not raw values",
              "If a value is not a variable, Claude hardcodes it — audit your file before running the MCP and fix any raw values you see",
            ],
            image: {
              src: "/figma-mcp/variables-list-view.png",
              alt: "Figma Dev Mode inspect panel showing a frame with Width Fill, Height Hug, Radius var(--sds-size-radius-2), Border var(--sds-size-stroke-b), Padding var(--sds-size-space-4), Gap var(--sds-size-space-3) — all referencing variables",
              caption: "Every layout property references a variable. Claude reads these and generates var(--token-name) in CSS — not hardcoded pixels. Source: help.figma.com",
            },
            figmaEmbed: {
              nodeId: "6723-17",
              fileKey: "ojko9pGfsDAvmUf2DA38d2",
              description: "Figma Variables panel showing a structured token system — Color, Spacing, and Radius variables all mapped to semantic names",
            },
            note: "Variables are different from Styles. Styles (color styles, text styles) produce raw values in the MCP output. Variables produce token references. If your file uses Styles, migrate to Variables before your first MCP session.",
          },
          {
            label: "CSS Output",
            body: "This is what Claude actually sees when it reads a frame via the MCP. The inspect panel in Dev Mode shows you a preview of the same data. When every property uses a variable reference, the generated CSS is clean and token-ready. When properties are hardcoded, the output requires manual cleanup.",
            image: {
              src: "/figma-mcp/variables-css-output.png",
              alt: "Figma Dev Mode code panel showing CSS: display flex, padding var(--sds-size-space-400), align-items center, gap var(--sds-size-space-300), align-self stretch — all variable references",
              caption: "The CSS Claude generates directly reflects your Figma variable references. This frame outputs production-ready token-based CSS with zero hardcoded values. Source: help.figma.com",
            },
            bullets: [
              "display: flex → the frame uses Auto Layout (not absolute positioning)",
              "padding: var(--sds-size-space-400) → the padding is a variable, not a hardcoded value",
              "gap: var(--sds-size-space-300) → the gap between children uses a spacing variable",
              "align-self: stretch → the fill behavior maps directly to a CSS property Claude can use",
              "If you see raw pixel values in this panel, those are the properties you need to replace with variables before prompting Claude",
            ],
            codeBlocks: [
              {
                lang: "css",
                label: "what Claude generates when variables are used",
                content: `.card-container {
  display: flex;
  padding: var(--space-400);
  align-items: center;
  gap: var(--space-300);
  align-self: stretch;
  border-radius: var(--radius-200);
  border: 1px solid var(--color-border);
  background: var(--color-surface-default);
}`,
              },
              {
                lang: "css",
                label: "what Claude generates when values are hardcoded",
                content: `.frame-42 {
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background: #FFFFFF;
}
/* Every value is hardcoded. Changing the design token does nothing.
   The class name is meaningless. This needs full manual cleanup. */`,
              },
            ],
            figmaEmbed: {
              nodeId: "6725-17",
              fileKey: "ojko9pGfsDAvmUf2DA38d2",
              description: "Figma Dev Mode CSS output panel — variable-referenced vs. hardcoded properties side by side",
            },
          },
          {
            label: "Component Properties",
            body: "Component properties are the variants, boolean toggles, and text overrides you define on a component in Figma. When the MCP reads a component, these properties become typed props in the generated code. A component with no properties produces a static, single-state output. A component with well-defined properties produces a full component API.",
            image: {
              src: "/figma-mcp/component-dev-mode.png",
              alt: "Figma Dev Mode showing a selected component with variant property 'variation=Variation 2', component playground, Code Connect button, and the full CSS inspect panel with spacing measurements",
              caption: "The variant selector, component playground, and inspect panel are all MCP-readable. Claude uses the property names and values directly as TypeScript prop names and types. Source: help.figma.com",
            },
            bullets: [
              "Variant properties → become string union props: size: 'sm' | 'md' | 'lg'",
              "Boolean properties → become boolean props: isDisabled: boolean, showIcon: boolean",
              "Text properties → become string props with default values from the Figma content",
              "Instance swap properties → become slot props or children in the generated component",
              "Name properties clearly — 'Variant' is bad, 'Size' is good; Claude uses the property name as the prop name",
            ],
            codeBlocks: [
              {
                lang: "typescript",
                label: "component props generated from Figma properties",
                content: `// Figma component properties:
// • size: Small | Medium | Large  (variant)
// • isDisabled: true/false         (boolean)
// • label: "Button text"           (text)
// • icon: Icon component           (instance swap)

// Claude generates:
interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  label: string;
  icon?: React.ReactNode;
}`,
              },
            ],
            figmaEmbed: {
              nodeId: "6726-17",
              fileKey: "ojko9pGfsDAvmUf2DA38d2",
              description: "Figma component properties panel — Variant, Boolean, Text, and Instance Swap properties and how they map to TypeScript props",
            },
          },
          {
            label: "Auto-Layout",
            body: "Auto-layout is Figma's version of flexbox and grid. The MCP reads auto-layout settings directly and translates them to CSS layout properties. A frame without auto-layout uses absolute positioning — and generates position: absolute CSS with hardcoded top/left values. That is the hardest output to work with in a responsive design system.",
            bullets: [
              "Every container that should be flexible must use auto-layout — no absolute positioning for layout-level frames",
              "Set the fill behavior on children: Fill Container becomes flex: 1 or width: 100%, Hug Contents becomes width: fit-content",
              "Set explicit gap values using spacing variables — not padding hacks or spacer elements",
              "Direction matters: Horizontal → flex-direction: row, Vertical → flex-direction: column",
              "Alignment: set wrap behavior for grid-like layouts — Claude outputs flex-wrap: wrap when it sees wrapping enabled",
              "Nested auto-layout produces nested flexbox — which is exactly how modern CSS layouts work",
            ],
            codeBlocks: [
              {
                lang: "text",
                label: "auto-layout settings → CSS output",
                content: `Figma Auto-Layout setting    →  CSS output
─────────────────────────────────────────────────
Direction: Horizontal        →  flex-direction: row
Direction: Vertical          →  flex-direction: column
Gap: var(--space-400)        →  gap: var(--space-400)
Padding: var(--space-300)    →  padding: var(--space-300)
Align: Center                →  align-items: center
Justify: Space between       →  justify-content: space-between
Child width: Fill container  →  flex: 1 or width: 100%
Child width: Hug contents    →  width: fit-content
Wrap: Wrap                   →  flex-wrap: wrap`,
              },
            ],
            figmaEmbed: {
              nodeId: "6727-17",
              fileKey: "ojko9pGfsDAvmUf2DA38d2",
              description: "Figma Auto-Layout settings panel — direction, gap, padding, alignment, and sizing mode mapped to their CSS flexbox equivalents",
            },
          },
          {
            label: "Annotations",
            body: "The MCP reads what it can see — but design has invisible dimensions: hover states, keyboard navigation order, focus rings, animation timing, ARIA roles. Figma annotations let you surface these behaviors directly in the file so Claude receives them as part of the design context. This is how you bridge the gap between visual design and interactive behavior.",
            bullets: [
              "Add interaction annotations for hover, focus, and active states — Claude uses them to generate :hover and :focus CSS and event handlers",
              "Document ARIA roles in annotations: 'role=button', 'aria-label=Close dialog', 'role=navigation' — Claude adds these to the HTML output",
              "Specify animation timing: 'transition: 150ms ease' — Claude cannot infer duration or easing from static design",
              "Note keyboard navigation order for focusable elements — tabIndex values in complex layouts",
              "Add responsive behavior notes: 'stacks vertically below 768px', 'icon-only on mobile' — the MCP passes these to Claude as context",
              "Use Figma's native Annotation tool (the speech bubble icon in the toolbar) — annotations appear in the MCP data alongside layer properties",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "prompting Claude to read annotations",
                content: `# Claude reads all annotations on the frame automatically
# You can also explicitly reference them in your prompt:

claude "Read the Card component at [URL] via the Figma MCP.
Pay attention to any annotations on the frame — implement
all interaction states, ARIA attributes, and transitions
exactly as annotated."`,
              },
            ],
            figmaEmbed: {
              nodeId: "6728-17",
              fileKey: "ojko9pGfsDAvmUf2DA38d2",
              description: "Figma annotation bubbles on a button component — hover state, ARIA role, and transition timing annotated directly in the design file",
            },
          },
          {
            label: "Send to Claude",
            body: "There are two ways to get a node URL from Figma. Both produce the same result — a URL containing the file ID and node ID that Claude uses to call the MCP. Use whichever is faster in your workflow.",
            image: {
              src: "/figma-mcp/copy-link-to-selection.png",
              alt: "Figma right-click context menu with 'Copy link to selection' highlighted in green, showing the keyboard shortcut Command+L on a mobile product design",
              caption: "Right-click any frame → Copy link to selection (⌘L). The URL contains the node ID Claude uses to call the MCP. Source: developers.figma.com",
            },
            bullets: [
              "Method 1 — Right-click the frame → Copy link to selection (⌘L / Ctrl+L). This copies a URL with ?node-id= already set to the selected layer",
              "Method 2 — Select the frame, then copy the URL from the browser address bar. The address bar URL also contains the node ID when a layer is selected",
              "Select at the component boundary — the outermost frame of the component. If you select a child, Claude reads only that element",
              "Claude cannot open the URL in a browser — it extracts the node ID from the URL and calls the MCP API directly",
              "Paste the URL in your prompt: 'Read [URL] via the Figma MCP and build it as...' — Claude handles the rest",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "complete prompt structure",
                content: `# Pattern for every Figma-to-code session:
claude "Read the [ComponentName] frame at [paste ⌘L URL or address bar URL]
using the Figma MCP.

Build it as a [React/Angular/HTML] component.
Use [Tailwind CSS / CSS custom properties / Angular Material].
Map Figma variables to their equivalent token names.
Implement all annotated interaction states and ARIA attributes.
Output: [filename].tsx"`,
              },
              {
                lang: "text",
                label: "what a Figma node URL looks like",
                content: `# Right-click → Copy link to selection produces:
https://figma.com/design/FILE_ID/Project-Name?node-id=42-178&t=abc123

# Browser address bar when layer is selected also has node-id:
https://figma.com/design/FILE_ID/Project-Name?node-id=42-178

# Claude extracts "42-178" and uses it to call:
# figma.get_design_context({ node_id: "42-178", file_key: "FILE_ID" })`,
              },
            ],
            figmaEmbed: {
              nodeId: "6729-17",
              fileKey: "ojko9pGfsDAvmUf2DA38d2",
              description: "Right-click context menu → Copy link to selection, the resulting URL, and the three-step workflow for sending a Figma frame to Claude",
            },
            note: "The MCP reads the full component tree from the selected node downward. Select the outermost frame of the component you want — not a child element, and not a page or section that contains multiple unrelated components.",
          },
        ],
      },
    ],
    exercise: {
      title: "First Figma-to-Code Run",
      description: "With Claude Code already set up from Module 2, connect the Figma MCP and generate your first real component from a Figma frame. Compare the output to your design and document what needed to be corrected.",
      steps: [
        "Confirm the Figma MCP is active: run claude mcp list and verify 'figma' appears",
        "In Figma, prepare one component: rename all layers semantically, replace any hardcoded colors with variable references",
        "Copy the Figma frame URL (right-click the frame → Copy link)",
        "Run: claude \"Read the [ComponentName] at [URL] via the Figma MCP and build it as a [React/Angular/HTML] component\"",
        "Review the generated file — check that layer names became class names, variables became token references, and component properties became props",
        "Note any discrepancy between what you designed and what was generated — these become your first prompt refinements",
      ],
    },
    deliverable: {
      title: "AI-Generated Component from Figma",
      description: "A production component built by Claude Code directly from a Figma frame via the MCP — in your chosen framework. The file must use token references, not hardcoded values. Document the prompt you used and any refinements required.",
    },
    quiz: [
      {
        question: "What does the Figma MCP actually read from your file?",
        options: [
          "Only a flat screenshot",
          "Layer names, auto-layout, variables, and component properties",
          "Your account email",
        ],
        correct: 1,
      },
      {
        question: "How should you name your Figma layers for the best generated code?",
        options: [
          "To match your design token / naming system",
          "Randomly, it doesn't matter",
          "Using only emojis",
        ],
        correct: 0,
      },
      {
        question: "A poorly structured Figma file tends to produce…",
        options: [
          "Perfect code every time",
          "Nothing at all",
          "Hardcoded values and generic class names you fix by hand",
        ],
        correct: 2,
      },
    ],
  },

  "module-04": {
    objectives: [
      "Understand what an IDE is and how it differs from a text editor",
      "Install and configure Visual Studio Code for design engineering work",
      "Install the Claude Code extension and connect it to your project",
      "Configure the Figma MCP server inside VS Code to enable design-to-code workflows",
      "Navigate VS Code confidently: editor, terminal, extensions, and source control",
    ],
    concepts: [
      {
        id: "what-is-an-ide",
        title: "What Is an IDE?",
        body: "An IDE — Integrated Development Environment — is a single app that combines everything you need to write, test, and ship code: a file editor, a terminal, a debugger, version control, and extensions. Think of it as the Figma of code: all your tools in one window, built for the workflow.",
        bullets: [
          "Text editor: write and edit code with syntax highlighting and autocomplete",
          "Integrated terminal: run commands, install packages, start servers — without switching apps",
          "Source control panel: stage, commit, and push Git changes with a visual interface",
          "Extension marketplace: add language support, linters, design tools, and AI assistants",
          "Debugger: pause code execution and inspect what's happening at any line",
          "The difference from a text editor: IDEs include all of the above; a text editor is just the first item on this list",
        ],
      },
      {
        id: "what-is-vscode",
        title: "What Is Visual Studio Code?",
        body: "VS Code is the most widely used IDE in the world — free, open-source, and built by Microsoft. It runs on Mac, Windows, and Linux. Its extension marketplace has over 50,000 extensions, including Claude Code, GitHub Copilot, and the Figma plugin. It is the standard environment for modern web development.",
        tabs: [
          {
            label: "Features",
            body: "VS Code packs everything a design engineer needs into one free, cross-platform app.",
            bullets: [
              "Free and open-source — no license required",
              "Built-in Git integration: stage, diff, commit, and push without leaving the editor",
              "Integrated terminal: run npm, git, and claude commands directly in VS Code",
              "IntelliSense: smart autocomplete for TypeScript, JavaScript, CSS, and hundreds of other languages",
              "Multi-root workspaces: open multiple project folders in one window",
              "Remote development: SSH into a server or connect to GitHub Codespaces from inside VS Code",
              "50,000+ extensions: themes, linters, AI assistants, design tools, and more",
            ],
          },
          {
            label: "Interface",
            body: "The VS Code interface is divided into five areas you will use constantly: the Activity Bar (far left), the Side Bar (file explorer, search, extensions), the Editor (center), the Panel (terminal, output), and the Status Bar (bottom).",
            image: {
              src: "https://code.visualstudio.com/assets/images/product-screenshot.png",
              alt: "Visual Studio Code editor showing the main interface with file explorer, code editor, and integrated terminal",
              caption: "VS Code: Activity Bar → Side Bar → Editor → Panel. Source: code.visualstudio.com",
            },
          },
        ],
      },
      {
        id: "setup-vscode",
        title: "Setting Up VS Code",
        body: "Setup takes under 10 minutes. You will install VS Code, configure a few essential settings, and verify that your terminal is working. Once this is done, every tool in the course lives inside this one window.",
        tabs: [
          {
            label: "Install",
            body: "Download VS Code from code.visualstudio.com/download. Pick the version for your OS (Mac, Windows, or Linux). On Mac, drag the app to Applications. On Windows, run the installer and check 'Add to PATH'.",
            bullets: [
              "Go to code.visualstudio.com and click Download",
              "Mac: drag VS Code.app to /Applications",
              "Windows: run the installer — check 'Add to PATH' on the final screen",
              "Linux: use the .deb or .rpm package, or install via Snap",
              "Open VS Code and confirm the welcome screen appears",
            ],
          },
          {
            label: "Configure",
            body: "A few settings make VS Code immediately more useful. Open Settings with Cmd+, (Mac) or Ctrl+, (Windows).",
            bullets: [
              "Theme: choose Auto-detect from OS or set a manual dark/light theme",
              "Font size: set to 13–15 for comfortable reading",
              "Format on save: search 'format on save' and enable it — your code stays clean automatically",
              "Auto save: set to 'afterDelay' so you never lose work",
              "Tab size: set to 2 for JavaScript and TypeScript projects",
              "Word wrap: enable so long lines don't scroll off screen",
            ],
          },
          {
            label: "Terminal",
            body: "VS Code includes a full terminal panel. Open it with Ctrl+` (backtick). You should see your shell (zsh on Mac, PowerShell or cmd on Windows). Verify Node and npm are installed by running the commands below.",
            codeBlocks: [
              {
                lang: "bash",
                label: "verify setup",
                content: "node --version\nnpm --version\ngit --version",
              },
            ],
            note: "If any command returns 'command not found', install Node.js from nodejs.org and Git from git-scm.com before continuing.",
          },
        ],
      },
      {
        id: "claude-code-in-vscode",
        title: "Installing Claude Code in VS Code",
        body: "Claude Code runs as an extension inside VS Code, giving you an AI pair programmer that reads your entire project — files, structure, and context — before responding. It is the same Claude Code you use in the terminal, but with a visual chat panel and inline diff views.",
        tabs: [
          {
            label: "Install Extension",
            body: "Open the Extensions panel (Cmd+Shift+X) and search for 'Claude Code'. Install the extension published by Anthropic. You will be prompted to sign in with your Anthropic account on first use.",
            bullets: [
              "Open Extensions: Cmd+Shift+X (Mac) or Ctrl+Shift+X (Windows)",
              "Search for 'Claude Code' — look for the Anthropic publisher badge",
              "Click Install — the extension activates immediately",
              "A Claude icon appears in the Activity Bar on the left sidebar",
              "Click it to open the Claude Code chat panel",
              "Sign in with your Anthropic account when prompted",
            ],
          },
          {
            label: "First Session",
            body: "Once installed, open a project folder (File → Open Folder). Claude Code reads the project structure automatically. Open the Claude panel and ask it a question about your code to confirm it is working.",
            codeBlocks: [
              {
                lang: "text",
                label: "test prompt",
                content: "What files are in this project and what does it do?",
              },
            ],
            note: "Claude Code reads your open workspace. Always open the project folder first — not just individual files — so Claude has full context.",
          },
          {
            label: "Key Features",
            body: "The VS Code extension adds workflow features that the terminal version does not have.",
            bullets: [
              "Inline diff view: see exactly what Claude changed, line by line, before accepting",
              "Accept / Reject controls: approve or reject each change from the editor gutter",
              "Chat panel: persistent conversation history tied to your workspace",
              "File references: drag any file into the chat to add it to the context",
              "Terminal integration: Claude can run commands in your integrated terminal",
              "@-mentions: type @ to reference files, folders, symbols, or git history in your prompt",
            ],
          },
        ],
      },
      {
        id: "figma-mcp-vscode",
        title: "Setting Up the Figma MCP in VS Code",
        body: "The Figma MCP (Model Context Protocol) server lets Claude read your Figma files directly. When you mention a component in your prompt, Claude can pull its exact properties, tokens, and layout from Figma — instead of guessing from a description. This is the bridge between your design and your code.",
        tabs: [
          {
            label: "What Is MCP?",
            body: "MCP — Model Context Protocol — is an open standard that lets AI models connect to external tools. The Figma MCP server is a small local process that authenticates with Figma and lets Claude read design data on demand. You configure it once; it runs automatically in every session.",
            bullets: [
              "MCP servers run locally — your Figma data never leaves your machine",
              "Claude calls the MCP during a session when it needs design context",
              "One configuration works for all projects in that workspace",
              "The Figma MCP reads: frame properties, component variants, design tokens (variables), and layer structure",
              "Required: a Figma account with Developer access and a Personal Access Token",
            ],
          },
          {
            label: "Get Figma Token",
            body: "You need a Figma Personal Access Token (PAT) to authenticate the MCP server. This token is read-only — it cannot modify your Figma files.",
            bullets: [
              "Open Figma → click your profile avatar (top left)",
              "Go to Settings → Account → Personal Access Tokens",
              "Click Generate new token",
              "Name it 'VS Code MCP' and set an expiry date",
              "Copy the token immediately — Figma only shows it once",
              "Store it in your password manager",
            ],
          },
          {
            label: "Configure MCP",
            body: "Add the Figma MCP to VS Code's Claude Code configuration. Open your user settings or workspace .claude/settings.json and add the mcpServers block.",
            codeBlocks: [
              {
                lang: "json",
                label: ".claude/settings.json",
                content: '{\n  "mcpServers": {\n    "figma": {\n      "command": "npx",\n      "args": ["-y", "@figma/mcp-server"],\n      "env": {\n        "FIGMA_ACCESS_TOKEN": "your-figma-pat-here"\n      }\n    }\n  }\n}',
              },
            ],
            note: "Replace 'your-figma-pat-here' with the token you copied from Figma. Never commit this file to Git — add .claude/settings.json to your .gitignore.",
          },
          {
            label: "Test the MCP",
            body: "Verify the Figma MCP is connected by asking Claude to read a frame from your Figma file. Paste the Figma frame URL into the prompt.",
            codeBlocks: [
              {
                lang: "text",
                label: "test prompt",
                content: "Using the Figma MCP, read this frame and list all the design tokens it uses:\nhttps://www.figma.com/design/[your-file-key]/[your-file-name]?node-id=[node-id]",
              },
            ],
            note: "If Claude responds with 'I don't have access to Figma', reload VS Code (Cmd+Shift+P → Reload Window) and try again. The MCP server starts on first use.",
          },
        ],
      },
    ],
    exercise: {
      title: "Your VS Code Setup Checklist",
      description: "Complete each step and check it off. At the end, you will have a fully configured VS Code environment with Claude Code and Figma MCP ready to go.",
      steps: [
        "Download and install VS Code from code.visualstudio.com",
        "Open VS Code and configure: Format on Save, Auto Save, Tab Size 2",
        "Open the integrated terminal (Ctrl+`) and verify node, npm, and git are installed",
        "Install the Claude Code extension from the Extensions marketplace",
        "Open a project folder and confirm Claude can read it (ask 'what files are in this project?')",
        "Generate a Figma Personal Access Token in Figma Settings",
        "Create .claude/settings.json with the Figma MCP configuration",
        "Add .claude/settings.json to .gitignore",
        "Test the Figma MCP by pasting a Figma frame URL and asking Claude to read it",
      ],
    },
    deliverable: {
      title: "VS Code Environment Screenshot",
      description: "A screenshot of your VS Code window showing: the Claude Code panel open, a project folder loaded in the Explorer, and the integrated terminal visible. Post it in the workshop Slack with the message 'My VS Code is ready.'",
    },
  },

  "module-05": {
    objectives: [
      "Understand the Atomic Design methodology and why atoms-first order prevents AI from hallucinating component structure",
      "Use the Figma MCP to give Claude Code exact token, spacing, and variant data straight from your Figma file",
      "Write precise role-first prompts that build atom-level components — Button, Input, Badge, Icon, Label — from Figma in one shot",
      "Compose atoms into molecule-level components: SearchBar, FormField, Card Header, Nav Item",
      "Build organism-level components — Navigation, Hero, Feature Grid — by referencing your molecule library",
      "Close the visual validation loop with the Claude in Chrome extension: build → inspect → correct → next",
      "Reference the full workshop prompt library from the VibeCodingforDesigners instructions document",
    ],
    concepts: [
      {
        id: "atomic-design-overview",
        title: "The Atomic Design Ladder — Why Order Matters",
        body: "Atomic Design — coined by Brad Frost — organizes UI into five levels: atoms, molecules, organisms, templates, and pages. For AI-generated components, this order is not aesthetic preference — it is a technical requirement. A modal contains a button. If the button does not exist yet, Claude will invent one. It will invent its own sizing, color, and behavior — none of which match your design system. Build atoms first, and every component above them inherits the right decisions automatically.",
        bullets: [
          "Atoms — the smallest indivisible UI units: Button, Input, Checkbox, Badge, Icon, Label, Tooltip",
          "Molecules — atoms combined into a functional unit: SearchBar (Icon + Input + Button), FormField (Label + Input + Error text)",
          "Organisms — complex sections assembled from molecules: Navigation bar, Hero section, Feature card grid, Data table",
          "Templates — page-level layout scaffolds: page shell, sidebar layout, two-column grid",
          "Pages — real content dropped into a template: the actual live screen",
          "The rule: never build a molecule before its atom dependencies exist. Never build an organism before its molecule dependencies exist",
          "AI follows this rule better than humans — if the atoms are in your codebase, Claude uses them. If they are not, it invents them",
        ],
        table: [
          { left: "Atom", right: "Button, Input, Badge, Icon, Label, Checkbox, Toggle, Avatar" },
          { left: "Molecule", right: "SearchBar, FormField, Nav Item, Card Header, Tag Group" },
          { left: "Organism", right: "Navigation, Hero, Feature Grid, Sidebar, Data Table, Modal" },
          { left: "Template", right: "Page shell, Sidebar layout, Two-column grid, Auth layout" },
          { left: "Page", right: "Dashboard, Settings, Login, Landing — real content in a template" },
        ],
        tableLabels: { left: "Level", right: "Examples" },
      },
      {
        id: "visual-ladder",
        title: "Atomic Design — Visual Overview",
        body: "The five levels of Atomic Design, illustrated. Each level is built from the one below it. Atoms are the foundation — every molecule, organism, template, and page inherits from them. The overview frame shows the full hierarchy; the atoms frame shows every base component you will build first.",
        figmaFileKey: "b8SF0CsvpWVUBXG4czqrpD",
        figmaEmbeds: [
          {
            title: "00 — Atomic Design Overview",
            nodeId: "1-2",
            description: "The five-level hierarchy: Atom → Molecule → Organism → Template → Page. Build in order, top to bottom.",
          },
          {
            title: "01 — Atoms",
            nodeId: "1-3",
            description: "Every base component: Button (all variants/states), Input, Badge, Icon sizes, Label, Toggle, Checkbox.",
          },
        ],
      },
      {
        id: "figma-mcp-reading",
        title: "How Claude Reads Your Figma File with the MCP",
        body: "When you paste a Figma frame link into a Claude Code prompt, the Figma MCP server reads the frame's exact data: fill colors, stroke values, corner radius, typography, spacing, and component variants. Claude does not guess from a screenshot — it reads the actual token values. This is what makes AI-generated components match your design system instead of approximating it.",
        tabs: [
          {
            label: "What Claude Reads",
            body: "The Figma MCP extracts structured data from your Figma file on demand. Every property visible in the Figma panel is available to Claude.",
            bullets: [
              "Fill colors — exact hex or variable token references (e.g. --color-primary)",
              "Typography — font family, size, weight, line-height, letter-spacing",
              "Corner radius — per corner values or uniform radius",
              "Spacing — padding, margin, gap from Auto Layout",
              "Component variants — all variant props and their states (default, hover, disabled, error)",
              "Layer names — become prop names in the generated component",
              "Component descriptions — the annotation text you wrote in Figma",
              "Design variables — Figma Variables map directly to CSS custom properties",
            ],
          },
          {
            label: "Paste the Figma Link",
            body: "To give Claude access to a specific frame or component, copy its link from Figma and paste it directly into your prompt. Claude calls the MCP automatically when it sees a Figma URL.",
            codeBlocks: [
              {
                lang: "text",
                label: "how to copy a Figma link",
                content: "1. Select the frame or component in Figma\n2. Right-click → Copy link to selection\n   (or use Cmd+L on Mac, Ctrl+L on Windows)\n3. Paste the link into your Claude Code prompt\n\nExample URL:\nhttps://www.figma.com/design/AbCdEfGh/MyDesign?node-id=1%3A23",
              },
            ],
            note: "Copy the link to the specific frame — not the file URL. The node-id in the URL tells the MCP exactly which frame to read.",
          },
          {
            label: "The Prompt Formula",
            body: "Every component-building prompt follows the same three-part structure from the workshop instructions: assign a role, state the stack explicitly, name what NOT to include.",
            codeBlocks: [
              {
                lang: "text",
                label: "3-part prompt formula",
                content: "// Part 1 — Role\nYou are a Senior Design Engineer.\n\n// Part 2 — Stack (be explicit)\nUsing React and Tailwind CSS only.\nNo ShadCN UI. No additional component libraries. No extra complexity.\n\n// Part 3 — Task\nRead this Figma frame using the Figma MCP and build the [component name] component.\nMatch every token exactly: color, spacing, radius, typography.\nFigma link: [paste your link here]",
              },
            ],
            note: "The \"no ShadCN\" line is not optional — without negatives, Claude defaults to the most common library it has seen. Negatives matter as much as positives.",
          },
        ],
      },
      {
        id: "building-atoms",
        title: "Step 1 — Building Atoms",
        body: "Atoms are your starting point. They take the longest to get right and pay off the most. Every larger component inherits from them. A Button built correctly here means every modal, form, and card that uses it is automatically correct. Copy the Figma link → drop it into Claude Code → React + Tailwind in one shot.",
        tabs: [
          {
            label: "Atom Inventory",
            body: "Before you start building, take inventory of your atoms from Figma. List every base component in your design system — these are the atoms you will build first.",
            bullets: [
              "Button — primary, secondary, ghost, destructive, icon-only variants",
              "Input — default, focused, disabled, error, with-icon states",
              "Checkbox — unchecked, checked, indeterminate, disabled states",
              "Badge / Tag — filled, outlined, colored variants",
              "Icon — size variants (12, 16, 20, 24px) with correct stroke weight",
              "Label — form label, required indicator, helper text",
              "Avatar — image, initials, size variants",
              "Tooltip — placement variants (top, bottom, left, right)",
              "Toggle / Switch — on, off, disabled states",
              "Divider — horizontal, vertical, with label",
            ],
          },
          {
            label: "Button Prompt",
            body: "The Button is always the first atom. It appears in nearly every other component. Build it first, build it completely — all variants, all states.",
            codeBlocks: [
              {
                lang: "text",
                label: "atom prompt — Button",
                content: "You are a Senior Design Engineer.\n\nUsing React and Tailwind CSS only.\nNo ShadCN UI. No extra libraries. No additional complexity.\n\nRead this Figma frame using the Figma MCP and build a Button component.\n\nRequirements:\n- Build all variants: primary, secondary, ghost, destructive\n- Build all states: default, hover, focused, disabled, loading\n- All colors, spacing, radius, and typography must reference CSS custom properties — no hardcoded hex or pixel values\n- Export as a named TypeScript component with typed props\n- Include a brief JSDoc comment describing each prop\n\nFigma link: [paste Button frame link]",
              },
            ],
          },
          {
            label: "Input Prompt",
            body: "Input is the second most-referenced atom. Build it with all states before moving to any form molecule.",
            codeBlocks: [
              {
                lang: "text",
                label: "atom prompt — Input",
                content: "You are a Senior Design Engineer.\n\nUsing React and Tailwind CSS only.\nNo ShadCN UI. No extra libraries.\n\nRead this Figma frame using the Figma MCP and build an Input component.\n\nRequirements:\n- States: default, focused, disabled, error, success, with-leading-icon, with-trailing-icon\n- All tokens from CSS custom properties only\n- Accessible: include aria-invalid, aria-describedby for error messages\n- TypeScript with typed props\n\nFigma link: [paste Input frame link]",
              },
            ],
          },
          {
            label: "Badge & Icon Prompts",
            body: "Badge and Icon are simple atoms but referenced everywhere. Build them small and precise.",
            codeBlocks: [
              {
                lang: "text",
                label: "atom prompt — Badge",
                content: "Read this Figma frame and build a Badge component.\nVariants: filled, outlined. Colors: neutral, success, warning, error, info.\nAll token values from CSS custom properties.\nFigma link: [paste Badge frame link]",
              },
              {
                lang: "text",
                label: "atom prompt — Icon",
                content: "Read this Figma frame and build an Icon wrapper component.\nUse Lucide React as the icon library.\nSize variants: sm (16px), md (20px), lg (24px).\nColor inherits from parent via currentColor.\nFigma link: [paste Icon frame link]",
              },
            ],
          },
        ],
      },
      {
        id: "visual-atoms",
        title: "Atoms in Figma — Reference Frame",
        body: "The atoms frame shows every base component built out with all variants and states. This is what Claude produces when you run the atom prompts against your Figma file. Cross-reference each component against the Figma frame below before moving to molecules.",
        figmaFileKey: "b8SF0CsvpWVUBXG4czqrpD",
        figmaEmbeds: [
          {
            title: "01 — Atoms",
            nodeId: "1-3",
            description: "Button · Input · Badge · Icon · Label · Toggle · Checkbox — all variants, all states.",
          },
        ],
      },
      {
        id: "building-molecules",
        title: "Step 2 — Building Molecules",
        body: "Molecules combine atoms into functional units. At this stage, Claude has access to your real Button, Input, Icon, and Label components — so instead of inventing them, it imports and composes them. The prompt shifts from 'build this component' to 'compose these atoms into this molecule'.",
        tabs: [
          {
            label: "Molecule Inventory",
            body: "Molecules are small, focused, and single-purpose. They do one job. List yours before you start.",
            bullets: [
              "SearchBar — Icon (search) + Input + Button (clear)",
              "FormField — Label + Input + error text (conditionally rendered)",
              "NavItem — Icon + text label + active state indicator",
              "Card Header — Avatar + title text + subtitle text + action Button",
              "Tag Group — multiple Badge atoms in a flex row with overflow handling",
              "Dropdown Item — Icon + label + keyboard shortcut hint",
              "Stat Card — label + large number + trend Badge",
            ],
          },
          {
            label: "SearchBar Prompt",
            body: "SearchBar is a classic molecule: three atoms composed into one functional unit. The prompt tells Claude which existing atoms to import.",
            codeBlocks: [
              {
                lang: "text",
                label: "molecule prompt — SearchBar",
                content: "You are a Senior Design Engineer.\n\nUsing React and Tailwind CSS only. No additional libraries.\n\nRead this Figma frame using the Figma MCP and build a SearchBar molecule.\n\nImport and compose these existing atoms from our component library:\n- Input from '@/components/ui/input'\n- Button from '@/components/ui/button'\n- Icon from '@/components/ui/icon'\n\nDo NOT recreate the atoms — import them.\nAll layout and spacing from CSS custom properties.\nAccessible: aria-label on the search input, role='search' on the wrapper.\n\nFigma link: [paste SearchBar frame link]",
              },
            ],
          },
          {
            label: "FormField Prompt",
            body: "FormField wraps an Input with Label and error state. It is the most-used molecule in any form-heavy product.",
            codeBlocks: [
              {
                lang: "text",
                label: "molecule prompt — FormField",
                content: "You are a Senior Design Engineer.\n\nRead this Figma frame and build a FormField molecule.\n\nImport and compose:\n- Label from '@/components/ui/label'\n- Input from '@/components/ui/input'\n\nProps: label (string), helperText (string?), error (string?), required (boolean)\nWhen error is present: show the error text below the input, apply error state to Input.\nAccessible: connect label to input via htmlFor/id, connect error to input via aria-describedby.\n\nFigma link: [paste FormField frame link]",
              },
            ],
          },
          {
            label: "NavItem Prompt",
            body: "NavItem composes Icon and text with an active state. It is the building block for the Navigation organism.",
            codeBlocks: [
              {
                lang: "text",
                label: "molecule prompt — NavItem",
                content: "You are a Senior Design Engineer.\n\nRead this Figma frame and build a NavItem molecule.\n\nImport Icon from '@/components/ui/icon'.\n\nProps: label (string), icon (LucideIcon), href (string), active (boolean)\nActive state: apply the active styling from Figma exactly — do not invent a style.\nAll tokens from CSS custom properties.\n\nFigma link: [paste NavItem frame link]",
              },
            ],
          },
        ],
      },
      {
        id: "visual-molecules",
        title: "Molecules in Figma — Reference Frame",
        body: "The molecules frame shows SearchBar, FormField, NavItem, Card Header, and Tag Group — each one built from validated atom imports. Notice how every molecule references its constituent atoms with annotation labels. This is the pattern your Claude Code sessions follow: import atoms, compose molecules.",
        figmaFileKey: "b8SF0CsvpWVUBXG4czqrpD",
        figmaEmbeds: [
          {
            title: "02 — Molecules",
            nodeId: "1-4",
            description: "SearchBar · FormField · Nav Item · Card Header · Tag Group — atoms composed into functional units.",
          },
        ],
      },
      {
        id: "building-organisms",
        title: "Step 3 — Building Organisms",
        body: "Organisms are complex sections assembled from molecules. Navigation, Hero, Feature Grid, Sidebar — these are the components you see in a page. At this stage, Claude imports molecules the same way molecules imported atoms. The prompt references your actual component paths. The result is a section that uses your real tokens, your real atoms, and your real molecules — nothing invented.",
        tabs: [
          {
            label: "Organism Inventory",
            body: "Organisms map directly to the visible sections of a page. Identify yours from your Figma file structure.",
            bullets: [
              "Navigation — NavItem molecules + logo + CTA Button",
              "Hero — Headline text + subheadline + CTA Button + supporting image or illustration",
              "Feature Grid — repeated Feature Card molecules in a responsive grid",
              "Sidebar — NavItem list + user Avatar + collapse control",
              "Data Table — table header + row with Badge and action DropdownMenu",
              "Modal / Dialog — overlay + Card molecule + Button group",
              "Auth Form — FormField molecules stacked + submit Button + error Alert",
            ],
          },
          {
            label: "Navigation Prompt",
            body: "Navigation is usually the first organism. It is on every page and every spacing or token error is visible everywhere.",
            codeBlocks: [
              {
                lang: "text",
                label: "organism prompt — Navigation",
                content: "You are a Senior Design Engineer.\n\nRead this Figma frame using the Figma MCP and build a Navigation organism.\n\nImport and compose these existing components:\n- NavItem from '@/components/molecules/nav-item'\n- Button from '@/components/ui/button'\n- Icon from '@/components/ui/icon'\n\nDo NOT recreate any imported component.\nResponsive: desktop shows full nav, mobile collapses to a hamburger Sheet.\nAll spacing and color from CSS custom properties.\nAccessible: nav element with aria-label='Main navigation', active link aria-current='page'.\n\nFigma link: [paste Navigation frame link]",
              },
            ],
          },
          {
            label: "Hero Prompt",
            body: "Hero sections are high-visibility and design-specific. The Figma MCP ensures Claude matches the exact layout, typography scale, and token values.",
            codeBlocks: [
              {
                lang: "text",
                label: "organism prompt — Hero",
                content: "You are a Senior Design Engineer.\n\nRead this Figma frame and build a Hero organism.\n\nImport:\n- Button from '@/components/ui/button'\n- Badge from '@/components/ui/badge'\n\nProps: headline (string), subheadline (string), ctaLabel (string), ctaHref (string), badgeLabel? (string)\nLayout: match the Figma layout exactly — column order, alignment, and spacing from Figma data.\nAll typography, color, and spacing from CSS custom properties — no hardcoded values.\n\nFigma link: [paste Hero frame link]",
              },
            ],
          },
          {
            label: "Feature Grid Prompt",
            body: "Feature Grids are the most common marketing pattern. They are built from a repeated card molecule, so the card must exist before the grid.",
            codeBlocks: [
              {
                lang: "text",
                label: "organism prompt — Feature Grid",
                content: "You are a Senior Design Engineer.\n\nRead this Figma frame and build a Feature Grid organism.\n\nFirst, build the FeatureCard molecule:\n- Icon from '@/components/ui/icon'\n- Title and body text styled from CSS custom properties\n- Match the Figma card layout exactly\n\nThen build the FeatureGrid organism:\n- Accepts an array of FeatureCard data as props\n- Responsive: 1 column mobile, 2 columns tablet, 3 columns desktop\n- Gap and padding from CSS custom properties\n\nFigma link: [paste Feature Grid frame link]",
              },
            ],
          },
        ],
      },
      {
        id: "visual-organisms-templates-pages",
        title: "Organisms, Templates & Pages — Reference Frames",
        body: "The final three levels of Atomic Design illustrated in Figma. Organisms are complex assembled sections (Navigation, Hero, Feature Grid, Sidebar, Data Table). Templates are layout scaffolds with placeholder zones and no real content. Pages are real content dropped into a template — the final deliverable that users interact with. All atomic levels are visible and assembled in the Pages frame.",
        figmaFileKey: "b8SF0CsvpWVUBXG4czqrpD",
        figmaEmbeds: [
          {
            title: "03 — Organisms",
            nodeId: "1-5",
            description: "Navigation bar · Hero section · Feature Grid · Sidebar · Data Table — molecules assembled into page sections.",
          },
          {
            title: "04 — Templates",
            nodeId: "1-6",
            description: "Dashboard layout · Two-column content · Auth layout — organism zones arranged without real content.",
          },
          {
            title: "05 — Pages",
            nodeId: "1-7",
            description: "The Component Dashboard page — real content in a template. Every atomic level (atoms → molecules → organisms → template → page) is present and labeled.",
          },
        ],
      },
      {
        id: "visual-validation-loop",
        title: "The Build → Validate → Correct Loop",
        body: "After each component is built, you validate it visually before moving to the next. Claude Code, with the Claude in Chrome extension, can inspect the live rendered component in Storybook and catch discrepancies it cannot see by reading code alone — wrong font weight, collapsed spacing, color that is off by one shade. This loop is how you close the gap between Figma and code without manually redlining every component.",
        tabs: [
          {
            label: "Claude in Chrome",
            body: "The Claude in Chrome browser extension lets Claude Code see your browser window. It can read the DOM, inspect computed styles, compare screenshots, and identify visual mismatches. Connect it once and it is available in every session.",
            bullets: [
              "Install from the Chrome Web Store: search 'Claude Code' by Anthropic",
              "Open Storybook in Chrome at localhost:6006",
              "In your Claude Code session, say 'use the browser to check this component'",
              "Claude opens the browser tool, inspects the rendered component, and reports discrepancies",
              "Point it at a specific story: 'check the Button/Primary/Hover state story'",
              "It can compare the live render to a Figma screenshot you paste in",
            ],
          },
          {
            label: "Validation Prompt",
            body: "After building a component, run this prompt to close the validation loop before moving to the next atom or molecule.",
            codeBlocks: [
              {
                lang: "text",
                label: "visual validation prompt",
                content: "Open the browser and navigate to localhost:6006.\nFind the [Button / Input / SearchBar] story.\nCheck the rendered component against this Figma frame:\n[paste Figma link]\n\nReport any discrepancy in:\n- Color values (use computed styles, not class names)\n- Spacing and padding (check computed layout)\n- Typography — font size, weight, line-height\n- Border radius\n- Interactive states (hover, focus, disabled)\n\nFix each discrepancy before moving to the next component.",
              },
            ],
          },
          {
            label: "The Loop",
            body: "Repeat the build → validate → correct cycle for every atom before building any molecule. Molecules inherit from atoms — a wrong spacing value in Button shows up in every molecule and organism that uses it.",
            bullets: [
              "Build atom → run validation prompt → fix discrepancies → confirm in browser",
              "Repeat for every atom in your inventory",
              "Only after all atoms are validated: start building molecules",
              "Validate each molecule before building organisms",
              "The loop takes 5–10 minutes per component — it saves hours of debugging later",
              "Keep a Vibe Session Log entry for each component: what you built, what was off, what you fixed",
            ],
            note: "If Claude cannot reach Storybook in the browser, make sure Storybook is running (npm run storybook) and the Claude in Chrome extension is connected. Reload VS Code if the extension connection drops.",
          },
          {
            label: "Reference Document",
            body: "The full workshop prompt library — including the complete component build order, all atom and molecule prompts, the three-tier AI tool comparison, and the design-as-source-of-truth system — is documented in the ITX workshop instructions.",
            bullets: [
              "Full prompt library: VibeCodingforDesigners/instructions.md",
              "Module 2 of the workshop covers the complete design-as-source-of-truth system",
              "Module 4 covers the full end-to-end pipeline from design to deployed URL",
              "The prompt formula (Role + Stack + Task) applies to every component at every atomic level",
              "Atoms first — always. A modal contains a button; build the button first",
            ],
            note: "The instructions document is the companion reference for this course module. Every prompt pattern in this module comes directly from the ITX From Figma to Shipped workshop.",
          },
        ],
      },
    ],
    exercise: {
      title: "Build an Atom-to-Organism Stack",
      description: "Pick one section of your Figma file and build it from atoms up to a complete organism. Use the Figma MCP for every step. Validate each component before building the next level.",
      steps: [
        "Open your Figma file and identify one target organism (e.g. Navigation, Hero, or a Feature Card grid)",
        "List all the atoms and molecules that organism requires",
        "Copy the Figma frame link for your Button component",
        "Write the 3-part prompt (Role + Stack + Task) and build the Button atom with Claude Code",
        "Run the visual validation prompt — open Storybook and compare to Figma",
        "Fix any discrepancies Claude reports, then confirm in the browser",
        "Repeat steps 3–6 for each remaining atom (Input, Badge, Icon, Label)",
        "Build the first molecule that composes your validated atoms (e.g. FormField or SearchBar)",
        "Validate the molecule with the browser prompt",
        "Build the organism by importing your validated molecules",
        "Run a final visual validation on the organism against the Figma frame",
      ],
    },
    deliverable: {
      title: "Validated Atom → Molecule → Organism Stack",
      description: "A Storybook instance with at least 3 atoms, 1 molecule, and 1 organism — all validated against Figma. Share a screen recording of the Storybook stories side-by-side with the Figma frames in your workshop Slack channel.",
    },
  },

  "module-06": {
    objectives: [
      "Understand why Storybook exists and how it solves the UI state explosion problem for AI-generated components",
      "Identify which frameworks Storybook officially supports and which community maintains — and pick the right one for your stack",
      "Install Storybook with a single command and configure it for Next.js, Tailwind CSS, and shadcn/ui",
      "Prompt Claude to generate complete Storybook configs, story files, and addon setups from a Figma frame URL",
      "Navigate Storybook's interface — sidebar, canvas, toolbar, and addons panel — to review component states without touching code",
      "Use Controls to test every prop and variant interactively, and Viewport to check responsive behaviour",
      "Run automated accessibility checks with the a11y addon and read violation reports",
      "Understand interaction testing and what the Interactions panel shows you",
      "Embed your Figma designs inside Storybook for side-by-side design QA",
      "Build a repeatable QA workflow and write precise AI correction prompts from Storybook evidence",
    ],
    concepts: [
      {
        id: "react-to-storybook-workflow",
        title: "The React → Storybook Workflow",
        body: "Storybook does not assume your components already exist — you generate them first. Follow this loop for every component, in order. The two review steps are not optional: reviewing the component before you write its story, and reviewing the story in Storybook before you move on, is what separates design engineering from accepting whatever the AI produced.",
        bullets: [
          "1. Generate the component in Claude — describe it with spec-level precision (props, variants, states, tokens)",
          "2. Review & refine the component — read the output, check tokens and states, and correct with evidence before going further",
          "3. Generate the Storybook story — ask Claude to write the stories file covering every variant and state (Default, Hover, Focus, Disabled, Loading, Error)",
          "4. Review it in Storybook — open the story, step through each state with Controls, compare against Figma, and fix discrepancies before the next component",
        ],
        callout: {
          tone: "info",
          title: "Review is a step, not an afterthought",
          body: "Do not batch-generate ten components and review them at the end. Complete the full four-step loop for one component before starting the next — an atom before the molecule that depends on it.",
        },
      },
      {
        id: "what-storybook-is",
        title: "What Storybook Is (and Why Designers Should Care)",
        body: "Storybook is an isolated component workshop that runs alongside your app. A single component generates an explosion of states when you multiply stories × browsers × viewports × accessibility requirements. Storybook is how you navigate that without getting lost in the app. For AI-generated components specifically, it is your first line of QA — a place to verify every state before anything touches a real page.",
        tabs: [
          {
            label: "The Problem",
            body: "A component might have 4 meaningful states. Across 4 browsers, 4 viewport sizes, and accessibility variants, that single component yields hundreds of combinations to verify. Modern UIs contain hundreds of components. Without isolation, verifying all of them is practically impossible.",
            image: {
              src: "/storybook/multiverse.png",
              alt: "Diagram showing how a component with 1 state multiplies: 4 stories × 16 browser states × 64 viewport states × disabilities = thousands of combinations to verify",
              caption: "The UI multiverse. Storybook lets you navigate each dimension systematically. Source: storybook.js.org",
            },
            bullets: [
              "1 component × 4 stories × 4 browsers × 4 viewports = 64 combinations before accessibility",
              "Mature projects have hundreds of components — thousands of discrete variations to track",
              "Without isolation, finding the exact failing state means navigating a full app with real data and real auth",
              "AI-generated components add another layer: the AI may implement a state you never explicitly tested",
            ],
          },
          {
            label: "The Solution",
            body: "Storybook runs as a separate development-only process alongside your app. It renders any component in any state in complete isolation — no login, no data fetch, no app context. You jump straight to the state you want to review.",
            bullets: [
              "Development-only workshop: it does not ship in your production bundle",
              "Isolated rendering: each story runs in its own iframe — no global CSS leakage, no shared state",
              "Stories are the canonical record of every component state your team has verified",
              "Reusable across tools: stories work with Jest, Vitest, Playwright, Cypress, Chromatic, and axe — no vendor lock-in",
              "Used by hundreds of companies including BBC, Shopify, Auth0, Airbnb, and GitHub",
            ],
          },
          {
            label: "For AI-Generated Code",
            body: "When Claude generates a component, it may implement states you did not explicitly specify. Storybook is where you discover what was built — and compare it to what you designed.",
            bullets: [
              "Ask Claude to generate the story file alongside the component: 'Also write a Storybook stories file covering Default, Hover, Focus, Disabled, Loading, and Error states'",
              "Open Storybook immediately after generation — use it as the first preview environment, before the component is used anywhere in the app",
              "The Controls panel reveals every prop Claude generated — you can spot unexpected or missing props without reading the TypeScript file",
              "The Accessibility tab catches ARIA and contrast issues before they reach a design review or a user",
              "Storybook evidence (screenshots of the exact failing state) makes AI correction prompts precise and actionable",
            ],
          },
        ],
      },
      {
        id: "supported-frameworks",
        title: "Supported Frameworks",
        body: "Storybook works with every major frontend framework. The install command auto-detects your project's framework — you do not need to configure it manually. Official frameworks are maintained by the Storybook core team and receive updates with every release. Community frameworks are contributed and maintained by the community.",
        tabs: [
          {
            label: "Official",
            body: "These 11 frameworks are maintained directly by the Storybook core team and tested with every release. Source: storybook.js.org/docs/get-started/frameworks",
            frameworkCards: [
              { name: "Next.js", subtitle: "with Webpack", iconSlug: "nextdotjs", iconColor: "000000", iconBg: "ffffff", href: "https://storybook.js.org/docs/get-started/frameworks/nextjs" },
              { name: "Next.js", subtitle: "with Vite", iconSlug: "nextdotjs", iconColor: "000000", iconBg: "ffffff", href: "https://storybook.js.org/docs/get-started/frameworks/nextjs" },
              { name: "TanStack React", iconSlug: "reactquery", iconColor: "FF4154", iconBg: "1a0a0b", href: "https://storybook.js.org/docs/get-started/frameworks/tanstack-react" },
              { name: "React", subtitle: "with Vite", iconSlug: "react", iconColor: "61DAFB", iconBg: "20232a", href: "https://storybook.js.org/docs/get-started/frameworks/react-vite" },
              { name: "React", subtitle: "with Webpack", iconSlug: "react", iconColor: "61DAFB", iconBg: "20232a", href: "https://storybook.js.org/docs/get-started/frameworks/react-webpack5" },
              { name: "React Native Web", subtitle: "with Vite (in browser)", iconSlug: "react", iconColor: "61DAFB", iconBg: "20232a", href: "https://storybook.js.org/docs/get-started/frameworks/react-native-web" },
              { name: "React Native", subtitle: "on device", iconSlug: "react", iconColor: "61DAFB", iconBg: "20232a", href: "https://storybook.js.org/docs/get-started/frameworks/react-native" },
              { name: "Preact", subtitle: "with Vite", iconSlug: "preact", iconColor: "673AB8", iconBg: "f0ebfc", href: "https://storybook.js.org/docs/get-started/frameworks/preact-vite" },
              { name: "Vue", subtitle: "with Vite", iconSlug: "vuedotjs", iconColor: "4FC08D", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/vue3-vite" },
              { name: "Angular", iconSlug: "angular", iconColor: "DD0031", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/angular" },
              { name: "SvelteKit", iconSlug: "svelte", iconColor: "FF3E00", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/sveltekit" },
              { name: "Svelte", subtitle: "with Vite", iconSlug: "svelte", iconColor: "FF3E00", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/svelte-vite" },
              { name: "Web Components", subtitle: "with Vite", iconBg: "29ABE2", href: "https://storybook.js.org/docs/get-started/frameworks/web-components-vite" },
            ],
          },
          {
            label: "Community",
            body: "Community-maintained frameworks are contributed by the broader ecosystem. They track Storybook releases but may lag slightly. Check the framework's GitHub for current compatibility.",
            frameworkCards: [
              { name: "Analog", subtitle: "with Vite", iconSlug: "angular", iconColor: "DD0031", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/analog-vite" },
              { name: "Nuxt", subtitle: "with Vite", iconSlug: "nuxtdotjs", iconColor: "00DC82", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/nuxt" },
              { name: "SolidJS", subtitle: "with Vite", iconSlug: "solid", iconColor: "4380ca", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/solid" },
              { name: "React", subtitle: "with Rspack/Rsbuild", iconSlug: "react", iconColor: "61DAFB", iconBg: "20232a", href: "https://storybook.js.org/docs/get-started/frameworks/react-rsbuild" },
              { name: "Vue", subtitle: "with Rspack/Rsbuild", iconSlug: "vuedotjs", iconColor: "4FC08D", iconBg: "0d1117", href: "https://storybook.js.org/docs/get-started/frameworks/vue3-rsbuild" },
              { name: "Web Components", subtitle: "with Rspack/Rsbuild", iconBg: "29ABE2", href: "https://storybook.js.org/docs/get-started/frameworks/web-components-rsbuild" },
            ],
            note: "Community frameworks may not support every Storybook addon. Check addon compatibility in the addon's README before committing to a community framework.",
          },
          {
            label: "Vite vs Webpack",
            body: "Most frameworks default to Vite. Vite is significantly faster for Storybook development — cold starts are 5–10× faster than Webpack. Use Webpack only if your project already depends on it or if you use Webpack-specific loaders.",
            bullets: [
              "Vite: instant hot-reload, faster initial build, native ESM — recommended for all new projects",
              "Webpack: required if you have custom Webpack plugins or loaders that have no Vite equivalent",
              "Next.js supports both — Vite is the default for Next.js Storybook in new setups",
              "Angular defaults to Webpack but Vite support is improving",
              "The builder is set in .storybook/main.ts — you can switch after setup",
            ],
            codeBlocks: [
              {
                lang: "typescript",
                label: ".storybook/main.ts — switching builders",
                content: `import type { StorybookConfig } from '@storybook/react-vite'; // or react-webpack5

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',  // Change to @storybook/react-webpack5 if needed
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
};

export default config;`,
              },
            ],
          },
        ],
      },
      {
        id: "installing-storybook",
        title: "Installing Storybook",
        body: "Storybook installs with a single command that detects your framework automatically. It adds Storybook as a development dependency, creates the .storybook config folder, and writes example stories so you can start immediately. Current version: Storybook 10.",
        tabs: [
          {
            label: "Quick Install",
            body: "Run one command in your project root. Storybook detects your framework (React, Next.js, Vue, Angular, SvelteKit, etc.) and installs the right packages automatically. No manual framework selection required.",
            codeBlocks: [
              {
                lang: "bash",
                label: "install storybook — official recommended command",
                content: `# In your project root — auto-detects framework
npm create storybook@latest

# After install, start the Storybook dev server
npm run storybook

# Storybook opens at http://localhost:6006`,
              },
              {
                lang: "bash",
                label: "what the installer does",
                content: `# npm create storybook@latest:
# 1. Detects your framework (Next.js, React, Vue, Angular...)
# 2. Installs @storybook/[framework] and @storybook/addon-essentials
# 3. Creates .storybook/main.ts and .storybook/preview.ts
# 4. Writes example Button.stories.ts to get you started
# 5. Adds "storybook" and "build-storybook" scripts to package.json`,
              },
            ],
          },
          {
            label: "Project Structure",
            body: "After installation, Storybook adds two configuration files and a scripts entry. Your stories live alongside your components — one .stories.ts file per component.",
            codeBlocks: [
              {
                lang: "text",
                label: "files created by the installer",
                content: `your-project/
├── .storybook/
│   ├── main.ts          ← Framework, addons, story glob patterns
│   └── preview.ts       ← Global decorators, parameters, Tailwind import
├── src/
│   └── components/
│       ├── Button.tsx
│       └── Button.stories.ts   ← One stories file per component
└── package.json         ← "storybook" and "build-storybook" scripts added`,
              },
              {
                lang: "typescript",
                label: ".storybook/preview.ts — import globals and set defaults",
                content: `import type { Preview } from '@storybook/react';
import '../src/app/globals.css'; // Import Tailwind and your CSS variables

const preview: Preview = {
  parameters: {
    // Show backgrounds panel with light/dark options
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
    // Match your design system breakpoints
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export default preview;`,
              },
            ],
          },
          {
            label: "Next.js Setup",
            body: "Next.js has the most Storybook-specific considerations: App Router vs Pages Router, server components, next/image, and next/font. The @storybook/nextjs package handles most of these automatically.",
            bullets: [
              "Use @storybook/nextjs — it patches next/image, next/link, and next/navigation automatically",
              "Server Components cannot be rendered in Storybook (they run server-side) — write stories for client components only",
              "Import globals.css in .storybook/preview.ts to apply Tailwind and your CSS custom properties",
              "next/font fonts do not load in Storybook — use a fallback font in .storybook/preview.ts or set the CSS variable directly",
              "Run Storybook with: npm run storybook (starts at localhost:6006, separate from next dev on :3000)",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "Next.js + Storybook install",
                content: `# In a Next.js project root:
npm create storybook@latest
# Auto-detects Next.js and installs @storybook/nextjs

# Verify .storybook/main.ts has:
# framework: { name: '@storybook/nextjs', options: {} }

# Run both servers in parallel:
# Terminal 1: npm run dev       → Next.js at :3000
# Terminal 2: npm run storybook → Storybook at :6006`,
              },
            ],
          },
          {
            label: "Workshop Example",
            body: "The live Storybook for this workshop is at: https://workshop-ofy020rzt-roy-villasanas-projects.vercel.app — it contains the training components built with React, Tailwind CSS, and shadcn/ui, the same stack used throughout the course. Use it as a reference for what a properly structured Storybook looks like in a design-system-aware project.",
            bullets: [
              "Navigate the sidebar to see how components are grouped and named (Home → Welcome is the entry story)",
              "Use the Controls panel to explore prop variants without reading TypeScript",
              "Check the Accessibility tab on each story — the workshop components are built to WCAG AA",
              "The Design addon links each story back to the Figma component in file ojko9pGfsDAvmUf2DA38d2 — compare design and implementation side by side",
            ],
            note: "Workshop Storybook: https://workshop-ofy020rzt-roy-villasanas-projects.vercel.app/?path=/story/home--welcome — open this alongside the course to follow along with a real running example.",
          },
        ],
      },
      {
        id: "claude-storybook-prompts",
        title: "Prompting Claude to Build Storybook",
        body: "Claude can set up Storybook configuration, write story files, add addons, and create interaction tests — if you give it the right context. The key is telling Claude your framework, your design system, which states to cover, and what file format to use. These prompt patterns work for any component Claude has already generated.",
        tabs: [
          {
            label: "Setup Prompt",
            body: "Use this prompt when starting a new project or adding Storybook to an existing one. Give Claude your framework, CSS approach, and any addons you want configured.",
            codeBlocks: [
              {
                lang: "bash",
                label: "prompt: set up Storybook from scratch",
                content: `claude "Set up Storybook 10 in this Next.js project.

Framework: @storybook/nextjs (App Router, Vite builder)
CSS: Tailwind CSS v4 — import globals.css in preview.ts
Design system: shadcn/ui components in src/components/ui/

Configure:
- .storybook/main.ts with @storybook/addon-essentials
- .storybook/preview.ts importing globals.css and setting
  dark background as default
- Add @storybook/addon-a11y for accessibility testing
- Add @storybook/addon-designs for Figma embed support

Add 'storybook' and 'build-storybook' scripts to package.json
if they are not already there.

Use TypeScript throughout. Do not create example stories —
I will write those per component."`,
              },
            ],
          },
          {
            label: "Story Generation",
            body: "Use this prompt after Claude generates a component. Ask for the story file in the same request, or follow up immediately so Claude still has the component in context.",
            codeBlocks: [
              {
                lang: "bash",
                label: "prompt: generate story file for a component",
                content: `claude "Write a Storybook story file for the Card component
in src/components/Card.tsx.

Use CSF 3 format with TypeScript and the autodocs tag.
File name: Card.stories.ts

Cover these stories:
- Default (base state)
- WithImage (image prop set)
- WithoutDescription (description omitted)
- Loading (skeleton placeholder)
- Interactive (onClick handler defined — log to Actions)

For each story, set args to match a realistic content example.
Map the 'variant' prop to radio button controls.
Map any color props to the colour picker control.

Reference the workshop Storybook at:
https://workshop-ofy020rzt-roy-villasanas-projects.vercel.app
for story naming and grouping conventions."`,
              },
              {
                lang: "typescript",
                label: "what Claude generates — CSF 3 story file",
                content: `import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['default', 'featured', 'compact'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Card Title', description: 'Supporting text here.' },
};

export const WithImage: Story = {
  args: { ...Default.args, imageSrc: '/placeholder.png', imageAlt: 'Card image' },
};

export const Loading: Story = {
  args: { isLoading: true },
};`,
              },
            ],
          },
          {
            label: "Figma → Storybook",
            body: "The most powerful workflow: give Claude the Figma frame URL via the MCP and ask it to generate both the component and its stories in one pass. Claude reads the component's variants, states, and properties from Figma and maps them directly to story args.",
            codeBlocks: [
              {
                lang: "bash",
                label: "prompt: Figma → component + stories in one pass",
                content: `claude "Read the Button component at [paste Figma ⌘L URL]
using the Figma MCP.

Build it as a React component with Tailwind CSS.
Map all Figma component properties to TypeScript props.
Map all Figma variables to CSS custom property references.

Also write Button.stories.ts (CSF 3, TypeScript, autodocs):
- Create one story per Figma variant (the MCP will list them)
- Add stories for Disabled, Loading, and Focus states
  even if they are not separate Figma variants
- Use the Figma file key ojko9pGfsDAvmUf2DA38d2 in the
  parameters.design addon config so the story links back
  to the Figma source

Output both files: src/components/Button.tsx
                   src/components/Button.stories.ts"`,
              },
              {
                lang: "typescript",
                label: "Figma Design addon config in the story meta",
                content: `// Link each story back to its Figma source
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ojko9pGfsDAvmUf2DA38d2/?node-id=6699-17',
    },
  },
} satisfies Meta<typeof Button>;`,
              },
            ],
          },
          {
            label: "Addon Config Prompt",
            body: "Ask Claude to add and configure specific addons. The essentials bundle is included by default. The a11y and designs addons are the two most useful additions for a designer workflow.",
            codeBlocks: [
              {
                lang: "bash",
                label: "prompt: add and configure addons",
                content: `claude "Add these Storybook addons to this project:

1. @storybook/addon-a11y
   - Install it and add to addons in .storybook/main.ts
   - Configure it in preview.ts to fail stories with
     Critical or Serious a11y violations in CI

2. @storybook/addon-designs
   - Install it and add to addons in .storybook/main.ts
   - No global config needed — design links go in each
     story's parameters.design

3. @storybook/test (interaction testing)
   - Already included in @storybook/addon-essentials
   - Set up a sample interaction test for a form component
     that simulates a user typing and submitting

Show me the updated .storybook/main.ts after all changes."`,
              },
              {
                lang: "typescript",
                label: "final .storybook/main.ts with all addons",
                content: `import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: { name: '@storybook/nextjs', options: {} },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',   // Controls, Actions, Docs, Viewport, Backgrounds
    '@storybook/addon-a11y',         // axe-core accessibility analysis
    '@storybook/addon-designs',      // Figma embed in Design tab
  ],
  docs: { autodocs: 'tag' },
};

export default config;`,
              },
            ],
          },
        ],
      },
      {
        id: "stories-and-controls",
        title: "Reading Stories and Using Controls",
        body: "A story is a named, isolated state of a component — Primary, Secondary, Disabled, Loading, Error. Each story is a snapshot you can revisit any time. Controls let you manipulate every prop live without touching code. Together, sidebar + canvas + controls panel give you a design review environment that works like an interactive spec.",
        tabs: [
          {
            label: "The Interface",
            body: "Storybook's UI has three zones: sidebar (your component navigator), canvas (the live preview), and the addons panel (Controls, Interactions, Accessibility, Design, Actions). The toolbar above the canvas contains zoom, background, grid, measure, outline, and viewport controls.",
            image: {
              src: "/storybook/example-button-args.png",
              alt: "Full Storybook UI showing the left sidebar with Button/Primary/Secondary/Large/Small stories, the canvas rendering a purple Button component, and the Controls panel with primary toggle, label text field, backgroundColor color picker, and size radio buttons",
              caption: "The complete Storybook interface. Sidebar on the left, live canvas in the centre, Controls panel at the bottom with tabs for Interactions, Visual tests, Accessibility, Design, and Actions. Source: storybook.js.org",
            },
            bullets: [
              "Sidebar: navigate components like a Figma layers panel — groups, components, stories in a tree",
              "Search (⌘K): jump to any component or story by name",
              "Canvas: live isolated render — what you see is exactly what the component outputs in the app",
              "Toolbar: zoom, rotate, background colour, grid, measure & outline, and viewport switcher",
              "Addons panel tabs: Controls · Interactions · Visual tests · Accessibility · Design · Actions",
              "Run tests button (bottom of sidebar): trigger all interaction and accessibility tests at once",
            ],
          },
          {
            label: "Controls Panel",
            body: "Controls gives you a graphical UI to change any component prop without writing code. Storybook infers the control type from the TypeScript prop type — booleans become toggles, strings become text inputs, enums become dropdowns or radio buttons.",
            bullets: [
              "boolean prop → toggle switch (e.g., primary: True / False)",
              "string prop → text input (e.g., label: 'Button')",
              "enum prop → radio buttons or select dropdown (e.g., size: small / medium / large)",
              "color prop → colour picker with hex input",
              "number prop → number input or range slider",
              "object/array prop → JSON editor",
              "Changing a control re-renders the component instantly — no page reload, no code edit",
              "Reset all controls to story defaults with the reset arrow (↩) in the controls header",
            ],
            codeBlocks: [
              {
                lang: "typescript",
                label: "how Controls maps TypeScript props → UI inputs",
                content: `// Your component props (TypeScript)
interface ButtonProps {
  primary?: boolean;        // → toggle switch
  label: string;            // → text input
  size?: 'small' | 'medium' | 'large'; // → radio buttons
  backgroundColor?: string; // → colour picker
  onClick?: () => void;     // → no control (Actions logs calls)
}

// What Storybook generates in the Controls panel:
// primary     [False] [True]
// label       Button
// size        ◉ small  ○ medium  ○ large
// backgroundColor  #FB8A62  </>`,
              },
            ],
          },
          {
            label: "Viewport Testing",
            body: "The Viewport addon lets you preview any component at real device dimensions — no browser resize, no guessing. It includes presets for 30+ devices including iPhone models, Galaxy, iPad, and tablet sizes, or you can set a custom width.",
            image: {
              src: "/storybook/addon-viewports.png",
              alt: "Storybook toolbar with the viewport dropdown open showing: Small mobile (320×568), Large mobile, Tablet, Desktop — with the canvas previewing a Button at mobile dimensions",
              caption: "Switch viewports from the toolbar dropdown. The canvas resizes to exact device dimensions instantly. Source: storybook.js.org",
            },
            bullets: [
              "Small mobile: 320 × 568px — the minimum width a component must handle",
              "Large mobile: 414 × 896px — current iPhone Pro Max width",
              "Tablet: 834 × 1112px — iPad Pro landscape",
              "Desktop: 1024px+ — standard breakpoint",
              "Keyboard shortcuts: alt + V (next viewport), alt + Shift + V (previous), alt + Ctrl + V (reset)",
              "Set a default viewport per story: globals: { viewport: { value: 'mobile1' } }",
            ],
          },
          {
            label: "Writing a Story",
            body: "Stories are written in Component Story Format (CSF) — a plain ES module that exports a default meta object and named story exports. Claude can write these for you. Ask for it alongside every component it generates.",
            codeBlocks: [
              {
                lang: "typescript",
                label: "Button.stories.ts — complete story file",
                content: `import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Meta: tells Storybook which component this file covers
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],          // generates the Docs page automatically
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'radio' }, options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Each named export = one story in the sidebar
export const Primary: Story = {
  args: { primary: true, label: 'Button' },
};

export const Secondary: Story = {
  args: { label: 'Button' },
};

export const Large: Story = {
  args: { size: 'large', label: 'Button' },
};

export const Disabled: Story = {
  args: { label: 'Button', disabled: true },
};`,
              },
              {
                lang: "bash",
                label: "ask Claude to write stories alongside the component",
                content: `claude "Build the Button component from the Figma frame at [URL] via the MCP.
Also write Button.stories.ts covering these states:
- Primary (primary: true)
- Secondary (primary: false)
- Large, Small (size variants)
- Disabled
- Loading (spinner, pointer-events: none)
- Error (error state if applicable)

Use Storybook CSF 3 format with TypeScript. Add autodocs tag."`,
              },
            ],
          },
        ],
      },
      {
        id: "accessibility-addon",
        title: "The Accessibility Addon",
        body: "The a11y addon runs axe-core automated accessibility analysis on every story — the same engine used by browsers, screen reader testing tools, and WCAG audit firms. It catches up to 57% of WCAG issues automatically, surfaces them directly in Storybook with fix suggestions, and can simulate visual impairments so you see what low-vision users experience.",
        callout: {
          tone: "success",
          title: "The ITX accessibility standard",
          body: "WCAG AA is the default for everything you ship in this course. Run the ITX accessibility checklist as part of every review — the automated addon is a first pass, not the whole review.",
          bullets: [
            "AA compliance is the baseline, not a stretch goal",
            "Critical and Serious issues must be fixed; Moderate issues may ship with a documented workaround, Minor when convenient",
            "The a11y addon catches ~57% of issues — a human accessibility review is still required. AI tools assist, they do not replace it.",
          ],
        },
        tabs: [
          {
            label: "Reading Violations",
            body: "Every story gets an Accessibility tab in the addons panel. It shows violations (confirmed failures), inconclusives (need manual check), and passes. Violations are classified by severity: Critical, Serious, Moderate, and Minor.",
            image: {
              src: "/storybook/addon-a11y-annotated.png",
              alt: "Storybook Accessibility tab showing 17 violations: Invalid ARIA values (Critical, 11 instances) and Color contrast (Serious, 6 instances). The toolbar shows a 'Simulate vision differences' button and the canvas has a 'Check for violations' annotation",
              caption: "The Accessibility tab shows violations sorted by severity. Red highlights on the canvas mark the exact elements with issues. Source: storybook.js.org",
            },
            bullets: [
              "Critical: blocks assistive technology — fix immediately (e.g., aria-invalid with wrong value)",
              "Serious: significantly impacts accessibility — fix before shipping (e.g., colour contrast failure)",
              "Moderate: creates difficulty but workarounds exist — fix in current sprint",
              "Minor: best practice violation — fix when convenient",
              "Inconclusives: axe cannot determine pass/fail automatically — requires manual verification",
              "Violations are highlighted on the canvas — click any row to see the exact element flagged",
            ],
          },
          {
            label: "Common Violations",
            body: "These are the accessibility issues AI-generated components most commonly produce. Know what each one means so you can write a precise correction prompt.",
            bullets: [
              "color-contrast: text/background colour combination fails WCAG AA (4.5:1 for normal text, 3:1 for large). Fix: use a token pair that passes, or adjust opacity",
              "aria-invalid: the aria-invalid attribute has a value that is not 'true', 'false', 'grammar', or 'spelling'. Fix: remove or correct the attribute",
              "button-name: a button has no accessible name — no label text, no aria-label, no aria-labelledby. Fix: add visible text or aria-label",
              "label: a form input is not associated with a label. Fix: add <label htmlFor='id'> or aria-label",
              "image-alt: an <img> is missing an alt attribute. Fix: add descriptive alt text or alt='' for decorative images",
              "focus-order-semantics: interactive elements are unreachable by keyboard in a logical order. Fix: check tabIndex values and DOM order",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "correction prompt pattern using Storybook evidence",
                content: `# Screenshot the failing story, then prompt Claude:
claude "The Button/Primary story in Storybook shows an accessibility violation:
color-contrast (Serious) — the button text #FFFFFF on background #FB8A62
has a contrast ratio of 2.8:1, which fails WCAG AA (requires 4.5:1).

Fix: darken the backgroundColor to at least #C4531A (contrast ratio 4.6:1)
or use the --color-brand-primary token which already passes."`,
              },
            ],
          },
          {
            label: "Vision Simulation",
            body: "The 'Simulate vision differences' button in the toolbar activates visual filters that show what your component looks like to users with colour blindness, low vision, or blurred vision. This is a designer-specific superpower — you can verify your design decisions without leaving Storybook.",
            bullets: [
              "Deuteranopia (red-green colour blindness) — affects ~8% of males",
              "Protanopia (red blindness) — affects ~1% of males",
              "Tritanopia (blue-yellow colour blindness) — rare, affects ~0.01%",
              "Achromatopsia (no colour vision) — tests if information is conveyed by colour alone",
              "Blurred vision — simulates low visual acuity; text must be readable at reduced sharpness",
              "Use this before finalising any colour decision — if the component fails here, your Figma design will too",
            ],
          },
          {
            label: "Install & Setup",
            body: "The a11y addon ships as part of Storybook's essentials bundle in Storybook 8+. If your project uses an older version or needs a manual install:",
            codeBlocks: [
              {
                lang: "bash",
                label: "install",
                content: `# Storybook 8+ — already included in essentials, just enable it
# If not present or on an older version:
npx storybook add @storybook/addon-a11y

# Verify it appears in .storybook/main.ts
# addons: ['@storybook/addon-a11y']`,
              },
              {
                lang: "typescript",
                label: "configure per story (override severity)",
                content: `// Set a11y test behaviour per story
export const PrimaryButton: Story = {
  args: { primary: true, label: 'Button' },
  parameters: {
    a11y: {
      // 'error' = test fails on any violation (default for CI)
      // 'todo'  = violations show as warnings, not failures
      // 'off'   = disable a11y on this story
      test: 'error',
      config: {
        rules: [
          // Disable a specific rule for this story (with reason)
          { id: 'color-contrast', enabled: false },
        ],
      },
    },
  },
};`,
              },
            ],
          },
        ],
      },
      {
        id: "interaction-testing",
        title: "Interaction Testing: What the Interactions Tab Shows You",
        body: "Interaction tests simulate user behaviour inside a story — clicking buttons, typing into fields, submitting forms — and assert on the result. The Interactions tab in Storybook shows you each step in real time, lets you step through them frame-by-frame, and highlights exactly which assertion failed. As a designer, you do not write these tests, but you need to read them: a failing interaction test is often a behaviour spec that was not implemented correctly.",
        tabs: [
          {
            label: "A Passing Test",
            body: "When all interaction steps pass, the Interactions tab shows a green PASS badge. Each step is logged with the action and its result. You can replay the test in slow motion using the playback controls.",
            image: {
              src: "/storybook/interaction-test-pass.png",
              alt: "Storybook Interactions tab showing PASS in green for a login form test. Steps shown: userEvent.type email field, userEvent.type password field, userEvent.click button, expect success message toBeInTheDocument — all with green checkmarks",
              caption: "A passing interaction test for a login form. Each step is logged with the exact user action and assertion. Source: storybook.js.org",
            },
            bullets: [
              "PASS badge (green) = all assertions in the play function passed",
              "Each step is logged: the action (userEvent.type, userEvent.click) and what was targeted",
              "The final step is usually an expect assertion — verifying a success state, error message, or element presence",
              "Playback controls (⏮ ⏪ ▶ ⏩) let you step through the interaction frame by frame",
              "Use step-through to see the component's state after each user action — this reveals timing or rendering issues",
            ],
          },
          {
            label: "A Failing Test",
            body: "When an assertion fails, the Interactions tab shows a red FAIL badge, highlights the failing step, and shows the exact error message. This is precisely the information you need to write a targeted AI correction prompt.",
            image: {
              src: "/storybook/interactions-failure.png",
              alt: "Storybook Interactions panel showing a failing interaction test with a red error message highlighting the exact step and assertion that failed",
              caption: "A failing interaction test shows exactly which step failed and why. Use this as evidence in your AI correction prompt. Source: storybook.js.org",
            },
            bullets: [
              "FAIL badge (red) = one or more assertions did not pass",
              "The failing step is highlighted — click it to see the error message and expected vs. received values",
              "Common failures: element not found (component didn't render a required element), wrong text content, event handler not called",
              "The error message is your correction prompt evidence — copy it directly into your Claude prompt",
              "Canvas shows the component frozen at the moment of failure — screenshot it for context",
            ],
          },
          {
            label: "What Tests Cover",
            body: "Ask Claude to write interaction tests for every behaviour your spec defines. These are the scenarios that interaction tests should cover for any component that has interactivity.",
            bullets: [
              "Form submission: fill required fields → click submit → assert success/error state appears",
              "Validation: leave required field empty → submit → assert error message and aria-invalid",
              "Button states: click a toggle → assert aria-pressed changes, visual state updates",
              "Keyboard navigation: tab through interactive elements → assert focus ring visible in correct order",
              "Async states: trigger a loading state → assert spinner appears → resolve → assert content appears",
              "Error recovery: trigger an error state → click retry → assert loading then success",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "ask Claude to generate interaction tests",
                content: `claude "Add a play function to the LoginForm.stories.ts file.
Write interaction tests for these stories:

FilledForm: type email 'test@example.com', type password 'password123',
click Sign in, assert the success message appears.

EmptySubmit: click Sign in without filling fields,
assert aria-invalid is set on both inputs and error messages appear.

Use @storybook/test userEvent and expect."`,
              },
            ],
          },
        ],
      },
      {
        id: "figma-storybook-connect",
        title: "Connecting Storybook and Figma",
        body: "Storybook and Figma have a bidirectional integration: you can embed a live Figma frame inside a Storybook story (for side-by-side design QA), and you can embed a live Storybook story inside a Figma component (so the team sees the implemented component next to the design). Both integrations are addons — the Designs addon for the Storybook side, and Storybook Connect for the Figma side.",
        tabs: [
          {
            label: "Figma inside Storybook",
            body: "The Designs addon adds a Design tab to the addons panel. Link a Figma frame or component to a story — when you open that story, the Figma frame renders right below the component. Design and implementation, side by side.",
            image: {
              src: "/storybook/design-addon-panel.png",
              alt: "Storybook addons panel showing the Design tab selected, with a Figma section displaying the embedded Figma frame next to the live component",
              caption: "The Design tab shows your Figma frame inside Storybook. Compare design and implementation without switching apps. Source: storybook.js.org",
            },
            bullets: [
              "Install: npx storybook@latest add @storybook/addon-designs",
              "Add a design parameter to any story with the Figma URL",
              "Supports: Figma files, prototypes, individual frames, and components",
              "The frame renders live — any Figma changes published by the designer appear immediately",
              "Use 'Link to selected frame' in Figma's Share menu to get a frame-specific URL",
            ],
            codeBlocks: [
              {
                lang: "typescript",
                label: "link a Figma frame to a story",
                content: `export const Primary: Story = {
  args: { primary: true, label: 'Button' },
  parameters: {
    design: {
      type: 'figma',
      // Figma: right-click frame → Copy link to selection (⌘L)
      url: 'https://www.figma.com/design/FILE_ID/Project?node-id=42-178',
    },
  },
};`,
              },
            ],
          },
          {
            label: "Storybook inside Figma",
            body: "Storybook Connect is a Figma plugin that embeds your published Storybook stories inside Figma components. The designer sees the live implemented component next to the design — so everyone is always looking at the same truth.",
            image: {
              src: "/storybook/figma-plugin-sidebar.png",
              alt: "Figma right panel showing the Storybook Connect plugin with a linked story URL and a View story button",
              caption: "Storybook Connect embeds your published story URL into a Figma component. Source: storybook.js.org",
            },
            bullets: [
              "Requires a Storybook instance published to Chromatic (Storybook's hosting platform)",
              "Install: search 'Storybook Connect' in the Figma Community or via Command Palette (⌘/)",
              "Authenticate with your Chromatic account → select your project",
              "Copy a story URL from your published Storybook on the correct branch",
              "Select a Figma component → paste the URL in the plugin → the story is linked",
              "Chromatic auto-updates the linked story whenever you publish a new Storybook build on that branch",
            ],
          },
          {
            label: "QA Workflow",
            body: "With both integrations active, you have a complete design-to-implementation verification loop: Figma designs are visible inside Storybook stories, and implemented components are visible inside Figma components. No app navigation, no handoff documents, no guessing.",
            bullets: [
              "1. Designer updates Figma component → the Designs tab in Storybook shows the new design immediately",
              "2. Claude generates the updated component → new story is written alongside it",
              "3. Designer opens the story in Storybook → sees the Figma frame and the live component side by side",
              "4. Designer uses Controls to test every prop → flags discrepancies with screenshots",
              "5. Designer writes a precise AI correction prompt referencing the Storybook state and Figma spec",
              "6. Engineer publishes the fixed Storybook → Figma components auto-update via Storybook Connect",
            ],
          },
        ],
      },
      {
        id: "component-sandbox",
        title: "Experiment Safely: Duplicate & Rename",
        body: "Never experiment on an original component. The rule is the same in Figma and in Storybook: duplicate it, rename the copy, and work only on the copy. If the experiment fails, you delete the copy and the original is untouched.",
        table: [
          { left: "Figma", right: "Right-click the component → Duplicate. Rename the copy (e.g. `Button-sandbox`). Detach the instance if you need to change structure. Experiment on the copy; the main component and everything using it stays intact." },
          { left: "Storybook", right: "Copy the component file and its `.stories` file to a `-sandbox` name (e.g. `Button.sandbox.tsx`). Point the new story at the copy. Iterate there; delete the sandbox files when done. The reviewed component never changes mid-experiment." },
        ],
        tableLabels: { left: "Where", right: "Duplicate-and-rename process" },
        callout: {
          tone: "info",
          title: "Client-specific starter library + how to reset",
          body: "For real client work, start from the base component library rather than a blank file, then duplicate it per client. This keeps every project on the same foundation and makes QA predictable — and gives you a clean way to recover a broken training file.",
          bullets: [
            "Duplicate the base Figma library → rename for the client",
            "Follow the workflow in order: Figma → Claude → Storybook → QA review",
            "Keep the base library pristine so it is always a clean starting point",
            "Recovery (the ITX way): if a training file gets into a bad state, don't fight it — re-duplicate from the pristine template and copy your good work across.",
          ],
        },
      },
      {
        id: "design-qa-workflow",
        title: "Design QA Workflow with Storybook",
        body: "A repeatable five-step process for reviewing every AI-generated component before it touches a real page. Run this in order every time — skip a step and you will catch the issue later, in a less forgiving environment.",
        bullets: [
          "Step 1 — Default state: open the story, check the Default/Primary story first. This is what users see 90% of the time.",
          "Step 2 — All variants: use Controls to cycle through every prop combination. Toggle primary/secondary, change size, flip disabled. Compare each to your Figma design.",
          "Step 3 — Accessibility: run the a11y tab. Every Critical and Serious violation must be fixed. Log Moderate and Minor for the next sprint.",
          "Step 4 — Responsive: check the component at 320px (Small mobile), 768px (Tablet), and 1440px (Desktop) using the Viewport toolbar. Note any layout breaks.",
          "Step 5 — Interactions: if the component has interactive behaviour, check the Interactions tab. A FAIL is a regression. A PASS is confidence that the spec was implemented.",
          "Document every discrepancy: story name, failing state, expected vs. actual, and the correction prompt you will use.",
        ],
        codeBlocks: [
          {
            lang: "text",
            label: "QA log template",
            content: `Component: Button
Story: Primary
─────────────────────────────────────────────────────────────
State / Issue          | Expected              | Actual
─────────────────────────────────────────────────────────────
Focus ring             | 2px solid, 2px offset | No offset
Disabled opacity       | 40%                   | 30%
a11y: color-contrast   | Pass (4.5:1)          | Fail (2.8:1)
Mobile (320px)         | Full width            | Overflows container
─────────────────────────────────────────────────────────────
Correction prompt sent: [paste prompt text]`,
          },
        ],
      },
      {
        id: "feedback-from-storybook",
        title: "Writing AI Correction Prompts from Storybook Evidence",
        body: "Storybook gives you the exact state, the exact error, and the exact pixel values. Use all of it. A vague design complaint produces a guess. A specific technical correction with Storybook evidence produces a precise fix.",
        tabs: [
          {
            label: "Prompt Anatomy",
            body: "Every effective correction prompt has four parts: what story and state, what is wrong, what the spec says, and what to change.",
            codeBlocks: [
              {
                lang: "bash",
                label: "correction prompt anatomy",
                content: `# 1. LOCATION — which story and state
"In the Button/Primary story in Storybook,
when the button has focus (Tab key):"

# 2. OBSERVED ISSUE — what Storybook shows
"the focus ring does not have the 2px white offset
between the button border and the ring outline."

# 3. SPEC REFERENCE — what was designed
"Per design.md (Button spec), focus state requires:
outline: 2px solid var(--ring);
outline-offset: 2px;"

# 4. FIX — the technical change to make
"Add outline-offset: 2px to the :focus-visible selector
in button.module.css. Do not change the outline colour or width."`,
              },
            ],
          },
          {
            label: "Vague vs. Precise",
            body: "The difference between a prompt that produces a fix and one that produces another iteration.",
            codeBlocks: [
              {
                lang: "text",
                label: "bad vs. good correction prompts",
                content: `❌ BAD — vague design complaint
"The button looks wrong when focused"

❌ BAD — too broad
"Fix the accessibility issues in the Button component"

✓ GOOD — Storybook evidence + spec reference
"The Button/Primary story (Storybook) has an a11y violation:
color-contrast (Serious) — label text #FFFFFF on #FB8A62 is 2.8:1.
WCAG AA requires 4.5:1 for normal text.
Fix: change backgroundColor default to var(--color-brand-600)
which is #C4531A and has a 4.6:1 contrast ratio."

✓ GOOD — interaction test failure
"The LoginForm/FilledForm interaction test fails at step 4:
expect(canvas.getByText('Welcome back!')).toBeInTheDocument()
The success message element exists in the DOM but has
display: none applied — remove the display: none from
.success-message in LoginForm.module.css."`,
              },
            ],
          },
          {
            label: "Using Screenshots",
            body: "Attach a screenshot of the Storybook canvas at the exact failing state to your Claude prompt. Claude can read the image and identify the visual issue alongside the text description.",
            bullets: [
              "Zoom the Storybook canvas to 100% or 150% before screenshotting — captures pixel-level detail",
              "Use the Outline toggle (toolbar) to make layout issues visible in the screenshot",
              "Screenshot the Controls panel alongside the canvas to show which props are active",
              "Screenshot the a11y tab showing the violation — the element highlight and rule name are both visible",
              "Attach the screenshot in the Claude prompt: drag and drop into the chat, or use the paperclip icon",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "prompt with screenshot attachment",
                content: `# In Claude Code desktop app or web:
# 1. Take a screenshot of the failing Storybook story
# 2. Attach it to the prompt

claude "I've attached a screenshot of the Button/Disabled story in Storybook.
The disabled state is showing the wrong opacity.

Looking at the screenshot:
- Current: the button text is visible but the container has no visual change
- Expected: the entire button (including icon and text) should be at 40% opacity
  with cursor: not-allowed

Fix: add these styles to the disabled selector in button.module.css."`,
              },
            ],
          },
        ],
      },
    ],
    exercise: {
      title: "Full QA Pass on an AI-Generated Component",
      description: "Take the component generated in Module 3 (or any AI-generated component from your current project). Run it through the complete five-step Storybook QA workflow and document your findings.",
      steps: [
        "Ask Claude to write a Storybook story file for the component with stories covering: Default, all variants via Controls, Disabled, Loading (if applicable), and Error (if applicable)",
        "Open Storybook and navigate through each story. Check the Default state first, then use Controls to cycle through every prop combination. Screenshot every discrepancy.",
        "Run the Accessibility tab on each story. Log every violation by severity. Write a correction prompt for each Critical and Serious violation.",
        "Switch to three viewports: 320px (Small mobile), 768px (Tablet), 1440px (Desktop). Note any layout breaks or overflow issues.",
        "If the component has interactive behaviour, check the Interactions tab. If you see a FAIL, copy the error message into a correction prompt.",
        "Fill in the QA log template from the Design QA Workflow concept. Send all correction prompts to Claude and iterate until Storybook shows zero Critical/Serious violations and no layout breaks.",
      ],
    },
    deliverable: {
      title: "QA Report with Correction Prompts",
      description: "A completed QA log: a table of every discrepancy found in Storybook, the story and state it appeared in, the specific deviation from the design spec, the severity (if an a11y issue), and the correction prompt you used to fix it. This becomes your reusable QA template for every AI-generated component going forward.",
    },
    quiz: [
      {
        question: "What is Storybook?",
        options: ["An isolated component workshop", "A design tool", "A database"],
        correct: 0,
      },
      {
        question: "What is the correct React → Storybook workflow order?",
        options: [
          "Deploy, then hope it works",
          "Generate component → review/refine → generate story → review in Storybook",
          "Write the story first, then never build the component",
        ],
        correct: 1,
      },
      {
        question: "In what order should you build components?",
        options: [
          "Biggest organism first",
          "In random order",
          "Atoms before the molecules and organisms that depend on them",
        ],
        correct: 2,
      },
      {
        question: "To experiment on an existing component safely, you should…",
        options: [
          "Duplicate it, rename the copy, and work only on the copy",
          "Edit the original directly",
          "Delete it and start over",
        ],
        correct: 0,
      },
      {
        question: "The accessibility (a11y) addon…",
        options: [
          "Deploys your app",
          "Runs automated accessibility checks but does not replace human review",
          "Writes your specs for you",
        ],
        correct: 1,
      },
    ],
  },

  "module-07": {
    objectives: [
      "Understand design.md as an open-source specification by Google for structured AI-readable design documentation",
      "Write valid YAML front matter with color, dimension, and typography tokens",
      "Structure the 9 canonical markdown sections so any AI tool can parse your design system correctly",
      "Use token references ({color.primary}) to create a single source of truth across your file",
      "Run the design.md CLI to lint, diff, and export your tokens",
      "Connect design.md to your CLAUDE.md and Figma workflow as part of a three-layer context system",
    ],
    concepts: [
      {
        id: "what-is-design-md",
        title: "What Is design.md",
        body: "design.md is an open-source specification developed by Google — the same team behind Stitch — that defines a structured way to document design systems in plain text. It is a Markdown file with a YAML front matter block that any AI tool, linter, or exporter can read consistently. It is not a Figma replacement and not a traditional spec — it is the written record of decisions your Figma file expresses visually.",
        bullets: [
          "Open-source format published by Google under the Apache-2.0 license",
          "Two-part file: YAML front matter that defines your tokens in a machine-readable structure, and Markdown sections that document how to use them",
          "Lives in your repository — versioned, diffable, and searchable alongside your code",
          "AI tools like Stitch and Claude Code read it to understand your design system before generating anything",
          "Eliminates \"describe your design system\" from the start of every AI session",
          "Gives engineers a plain-text reference that does not require Figma access",
          "vs README: design.md has a defined schema — tokens, sections, and linting rules that a README does not enforce",
          "vs Figma: plain text, versioned in git, readable by CLI tools and AI without a browser",
          "vs CLAUDE.md: CLAUDE.md tells AI how to behave; design.md tells AI what your design system looks like",
        ],
      },
      {
        id: "cli-tools",
        title: "The design.md CLI",
        body: "The design.md CLI provides four commands — lint, diff, export, and spec — that turn your design.md into an active part of your development pipeline. Install it globally first, then run any command from your project root.",
        codeBlocks: [
          {
            lang: "bash",
            label: "install",
            content: `# Install the CLI globally
npm install -g @google/design.md

# Verify installation
design-md --version`,
          },
        ],
        tabs: [
          {
            label: "Lint",
            body: "The lint command validates your design.md against the spec's rules. It catches broken token references, missing required sections, contrast ratio failures, and structural issues before they reach production.",
            codeBlocks: [
              {
                lang: "bash",
                label: "design-md lint",
                content: `# Lint a single file
design-md lint design.md

# Lint with JSON output (useful in CI)
design-md lint design.md --format json

# Example output:
# ✓ section-order — OK
# ✓ missing-sections — OK
# ✗ broken-ref — color.primary-hover not defined (line 87)
# ✗ contrast-ratio — {color.text.muted} on {color.background}: 3.2:1 < 4.5:1
#
# 2 errors, 0 warnings`,
              },
            ],
            bullets: [
              "broken-ref — token references that point to undefined tokens",
              "missing-primary — no primary color token defined",
              "contrast-ratio — foreground/background pairs below WCAG AA (4.5:1)",
              "orphaned-tokens — tokens defined in YAML but never referenced in markdown",
              "token-summary — sections referencing tokens not in the YAML block",
              "missing-sections — required sections (Overview, Colors, Typography, Layout, Components) absent",
              "missing-typography — typography section exists but defines no type styles",
              "section-order — sections appear in the wrong sequence",
              "unknown-key — unrecognized keys in the YAML front matter",
            ],
          },
          {
            label: "Diff",
            body: "The diff command compares two versions of a design.md file and outputs a structured change summary. Use it to understand what changed between design system versions.",
            codeBlocks: [
              {
                lang: "bash",
                label: "design-md diff",
                content: `# Diff two versions of a file
design-md diff design.md design-v2.md

# Diff against a git revision
design-md diff design.md HEAD~1:design.md

# Example output:
# Token changes:
#   ~ color.primary: #5B4A3F → #4A3B32  (value changed)
#   + color.accent: #C4A882             (added)
#   - color.secondary-light             (removed)
#
# Section changes:
#   ~ Components/Button: padding rule updated
#   + Components/Badge: new component added`,
              },
            ],
            note: "The diff command is useful in PR reviews — you can see exactly what design system changes a PR introduces without reading the full file.",
          },
          {
            label: "Export",
            body: "The export command transforms your YAML tokens into formats consumed by code: CSS custom properties, JSON token files, or Tailwind config.",
            codeBlocks: [
              {
                lang: "bash",
                label: "design-md export",
                content: `# Export as CSS custom properties
design-md export design.md --format css
# → tokens.css with :root { --color-primary: #5B4A3F; ... }

# Export as tokens JSON (W3C format)
design-md export design.md --format tokens-json
# → tokens.json

# Export as Tailwind theme extension
design-md export design.md --format tailwind
# → tailwind-tokens.js

# Specify output file
design-md export design.md --format css --output src/styles/tokens.css`,
              },
            ],
            note: "Export replaces manual token management. Instead of maintaining tokens.css by hand, generate it from design.md. Commit design.md, not the generated output.",
          },
          {
            label: "Spec",
            body: "The spec command generates a visual HTML specification from your design.md — a standalone page showing all tokens, type scales, and component documentation.",
            codeBlocks: [
              {
                lang: "bash",
                label: "design-md spec",
                content: `# Generate a spec HTML file
design-md spec design.md
# → design-spec.html

# Open in browser immediately
design-md spec design.md --open

# Specify output path
design-md spec design.md --output docs/spec.html`,
              },
            ],
            note: "The generated spec is a single static HTML file — no server needed. Share it with stakeholders as a living reference that updates whenever design.md changes.",
          },
        ],
      },
      {
        id: "yaml-front-matter",
        title: "YAML Front Matter & Token Types",
        body: "The YAML front matter is the machine-readable half of design.md. It defines four token types — Color, Dimension, Token Reference, and Typography — each with a specific syntax the CLI and AI tools understand.",
        tabs: [
          {
            label: "File Structure",
            body: "Every design.md file starts with a YAML block delimited by triple dashes. The block contains metadata fields and a tokens object with your design tokens organized by type.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "design.md",
                content: `---
title: My Design System
description: Design tokens and documentation for all products.
version: 1.0.0
tokens:
  color:
    primary:
      value: "#0F52BA"
      description: Primary brand color for CTAs and links
    background:
      value: "#F8F9FA"
      description: Page and surface background
  dimension:
    spacing:
      sm: "8px"
      md: "16px"
      lg: "24px"
  typography:
    body:
      fontFamily: "Inter, sans-serif"
      fontSize: "16px"
      fontWeight: "400"
      lineHeight: "1.6"
---

## Overview

...markdown documentation follows...`,
              },
            ],
            note: "The tokens block is the source of truth. All references in the markdown body should point to tokens defined here.",
          },
          {
            label: "Color Tokens",
            body: "Color tokens store CSS-compatible color values. Use any valid CSS color format: hex, rgb(), or oklch(). Each token has a value and an optional description field.",
            codeBlocks: [
              {
                lang: "yaml",
                label: "color tokens",
                content: `tokens:
  color:
    # Hex — most common
    primary:
      value: "#5B4A3F"
      description: Primary brand color, used for main CTAs

    # RGB
    secondary:
      value: "rgb(141, 123, 111)"
      description: Secondary brand color

    # oklch — perceptually uniform, great for dark mode
    accent:
      value: "oklch(0.65 0.15 45)"
      description: Accent color for highlights and badges

    # Nested color groups
    text:
      primary:
        value: "{color.primary}"
        description: Primary text — references the primary brand token
      muted:
        value: "#6B7280"
        description: Secondary text, placeholders, captions`,
              },
            ],
          },
          {
            label: "Dimension Tokens",
            body: "Dimension tokens store size values in CSS units: px, em, or rem. Use them for spacing, border-radius, font sizes, icon sizes, and any value that represents a measurement.",
            codeBlocks: [
              {
                lang: "yaml",
                label: "dimension tokens",
                content: `tokens:
  dimension:
    # Spacing scale (4px base)
    spacing:
      xs: "4px"
      sm: "8px"
      md: "16px"
      lg: "24px"
      xl: "32px"
      2xl: "48px"

    # Border radius
    radius:
      sm: "4px"
      md: "8px"
      lg: "16px"
      full: "9999px"

    # Elevation (box-shadow blur values)
    elevation:
      sm: "2px"
      md: "8px"
      lg: "24px"

    # Icon sizing
    icon:
      sm: "16px"
      md: "20px"
      lg: "24px"`,
              },
            ],
          },
          {
            label: "Typography Tokens",
            body: "Typography tokens define complete text styles as objects with four required fields: fontFamily, fontSize, fontWeight, and lineHeight. Define every text style your system uses — headings, body, captions, labels, code.",
            codeBlocks: [
              {
                lang: "yaml",
                label: "typography tokens",
                content: `tokens:
  typography:
    # Display sizes
    display-lg:
      fontFamily: "Georgia, serif"
      fontSize: "48px"
      fontWeight: "700"
      lineHeight: "1.1"

    display-md:
      fontFamily: "Georgia, serif"
      fontSize: "36px"
      fontWeight: "600"
      lineHeight: "1.15"

    # Headings
    heading-lg:
      fontFamily: "Georgia, serif"
      fontSize: "28px"
      fontWeight: "600"
      lineHeight: "1.25"

    # Body text
    body-lg:
      fontFamily: "Inter, sans-serif"
      fontSize: "18px"
      fontWeight: "400"
      lineHeight: "1.7"

    body-md:
      fontFamily: "Inter, sans-serif"
      fontSize: "16px"
      fontWeight: "400"
      lineHeight: "1.6"

    # UI text
    label-sm:
      fontFamily: "Inter, sans-serif"
      fontSize: "12px"
      fontWeight: "500"
      lineHeight: "1.4"

    # Monospace
    code:
      fontFamily: "'JetBrains Mono', monospace"
      fontSize: "14px"
      fontWeight: "400"
      lineHeight: "1.65"`,
              },
            ],
          },
          {
            label: "Token References",
            body: "Token references let one token point to another using the {path.to.token} syntax. This creates a single source of truth — change the base value and every reference updates automatically.",
            codeBlocks: [
              {
                lang: "yaml",
                label: "token references",
                content: `tokens:
  color:
    # Base palette values
    brand-dark:
      value: "#5B4A3F"
    brand-mid:
      value: "#8D7B6F"
    white:
      value: "#FFFFFF"
    error-red:
      value: "#DC3545"

    # Semantic tokens — reference base values
    # Change brand-dark and ALL of these update
    primary:
      value: "{color.brand-dark}"
      description: Primary brand color

    text-on-primary:
      value: "{color.white}"
      description: Text that sits on top of primary backgrounds

    error:
      value: "{color.error-red}"
      description: Error states

  # Components can reference semantic tokens
  # button-primary-bg -> color.primary -> color.brand-dark -> #5B4A3F
  component:
    button-primary:
      backgroundColor: "{color.primary}"
      textColor: "{color.text-on-primary}"
      padding: "{dimension.spacing.md} {dimension.spacing.lg}"
      borderRadius: "{dimension.radius.md}"`,
              },
            ],
            note: "The CLI's broken-ref linting rule flags any {path.to.token} reference that points to a token that does not exist.",
          },
        ],
      },
      {
        id: "markdown-sections",
        title: "The 9 Canonical Sections",
        body: "The markdown body of design.md must follow a specific section order. There are 9 canonical sections — some required, some optional — that AI tools and the CLI expect in a defined sequence.",
        tabs: [
          {
            label: "Section Order",
            body: "The spec defines a required order for sections. The CLI's section-order linting rule flags files where sections appear out of sequence. This predictable structure is what lets AI tools scan your file efficiently.",
            bullets: [
              "1. Overview — what the system is and its core principles (required)",
              "2. Colors — how to use the color tokens (required)",
              "3. Typography — how to use type styles (required)",
              "4. Layout & Spacing — grid, spacing rules, layout patterns (required, aliases: Layout, Spacing)",
              "5. Elevation & Depth — shadows, z-index, layering (optional)",
              "6. Shapes — border-radius rules, icon style (optional)",
              "7. Components — per-component documentation (required)",
              "8. Do's and Don'ts — explicit usage rules with examples (optional)",
              "9. Tool-specific guidance — Stitch, Claude Code, or other tool notes (optional)",
            ],
            note: "Sections 1–4 and 7 are required. A file missing any of them will fail the missing-sections lint rule.",
          },
          {
            label: "Overview",
            body: "The Overview section introduces the design system — its purpose, the products it serves, and the principles that govern decisions. It is where you put the 'why' behind the visual language.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "## Overview",
                content: `## Overview

Heritage is a design system for Heritage Financial products. It serves
consumer banking apps, the advisor portal, and public marketing pages.

**Design Principles**

- **Warmth** — Use warm neutrals from the Heritage palette. Avoid pure
  black and cool grays except for text on white backgrounds.
- **Craftsmanship** — Every component should feel deliberate. Prefer
  refined spacing over generous whitespace.
- **Clarity** — Navigation and actions must be immediately understood.
  Never hide primary actions behind secondary patterns.

**Who uses this system**

This system is used by two product teams and maintained by the design
systems team. Engineering uses the React component library that is built
from these tokens.`,
              },
            ],
          },
          {
            label: "Colors",
            body: "The Colors section explains how to use the color tokens defined in the YAML front matter. It is not a list of hex values — the YAML already has those. It explains usage intent, combinations, and rules.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "## Colors",
                content: `## Colors

Use {color.primary} for primary actions, links, and active states. It is
a warm dark brown — Heritage's core brand color.

Use {color.secondary} for supporting text, secondary buttons, and hover
states on neutral backgrounds.

**Rules**

- Never use {color.primary} on backgrounds darker than {color.background}.
  The contrast ratio drops below 4.5:1.
- Use {color.error} exclusively for error states. Do not use it for
  warnings or alerts — those use {color.warning}.
- {color.text.primary} is the only approved color for body text.

**Light / Dark mode**

The system supports dark mode. Dark mode tokens are defined separately in
the \`dark\` namespace. Never hardcode #FFFFFF or #000000 — always use
semantic tokens that resolve differently per mode.`,
              },
            ],
          },
          {
            label: "Typography",
            body: "The Typography section describes how to apply type styles — which style maps to which element, what the hierarchy rules are, and what never to do with type.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "## Typography",
                content: `## Typography

The system uses two typefaces: **Georgia** (serif) for display and heading
text, and **Inter** (sans-serif) for all UI text, body copy, and labels.

**Scale mapping**

| Style | Token | Use |
|-------|-------|-----|
| Page title | {typography.display-lg} | h1 — one per page |
| Section heading | {typography.heading-lg} | h2, modal titles |
| Card heading | {typography.heading-md} | h3, sidebar titles |
| Body | {typography.body-md} | article text, descriptions |
| Caption | {typography.label-sm} | timestamps, helper text |

**Rules**

- Never set body text below {typography.body-md} (16px). Minimum 16px
  for readability on consumer-facing surfaces.
- Georgia is for headings only. Do not use it for UI labels, buttons,
  or any interactive element.
- Line height must match the token. Do not override lineHeight on
  individual elements.`,
              },
            ],
          },
          {
            label: "Components",
            body: "The Components section is the most important part of design.md for AI code generation. Each component entry documents its token bindings, variants, and behavioral rules.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "## Components",
                content: `## Components

### Button

A button initiates an action. Use the primary variant for the most
important action on any given page or view. Use secondary for supporting
actions. Use ghost for tertiary actions in dense UIs.

**Token bindings — primary variant**

| Property | Token |
|----------|-------|
| backgroundColor | {color.primary} |
| textColor | {color.text-on-primary} |
| padding | {dimension.spacing.md} {dimension.spacing.lg} |
| borderRadius | {dimension.radius.md} |
| typography | {typography.label-md} |

**Token bindings — hover state**

| Property | Token |
|----------|-------|
| backgroundColor | {color.primary-hover} |

**Rules**

- Never place two primary buttons adjacent to each other.
- Disabled state: opacity 40%, no pointer-events. Do not use a
  different color token for disabled — use opacity only.
- Minimum touch target: 44×44px on mobile surfaces.

---

### Card

A card groups related content with a surface and optional shadow.

| Property | Token |
|----------|-------|
| backgroundColor | {color.surface} |
| borderRadius | {dimension.radius.lg} |
| padding | {dimension.spacing.lg} |
| shadow | {elevation.md} |`,
              },
            ],
          },
          {
            label: "Do's & Don'ts",
            body: "The Do's and Don'ts section captures common misuses of your design system as explicit rules. AI tools read this to avoid generating patterns your system prohibits.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "## Do's and Don'ts",
                content: `## Do's and Don'ts

### Color

**Do** use semantic color tokens for all surfaces and text.

\`\`\`
background-color: var(--color-surface);   ✓
color: var(--color-text-primary);          ✓
\`\`\`

**Don't** hardcode color values in components.

\`\`\`
background-color: #ffffff;   ✗
color: #111827;               ✗
\`\`\`

---

### Spacing

**Do** compose spacing from the scale tokens.

\`\`\`
padding: var(--spacing-md) var(--spacing-lg);   ✓
gap: var(--spacing-sm);                          ✓
\`\`\`

**Don't** use arbitrary pixel values between scale steps.

\`\`\`
padding: 12px 20px;   ✗  (not on the 4px scale)
gap: 10px;             ✗
\`\`\`

---

### Typography

**Do** use the defined type scale for all text.
**Don't** override font-size or line-height on individual elements.
**Don't** use Georgia for UI labels, buttons, or any interactive text.`,
              },
            ],
          },
        ],
      },
      {
        id: "heritage-example",
        title: "Full Example: Heritage Design System",
        body: "The Heritage design system is the reference example used throughout the official design.md documentation. It demonstrates a complete, valid file from front matter to component documentation.",
        tabs: [
          {
            label: "Front Matter",
            body: "The Heritage front matter block defines three token namespaces — color, dimension, and typography — using all four token types: raw values, nested groups, and token references.",
            codeBlocks: [
              {
                lang: "yaml",
                label: "YAML front matter",
                content: `---
title: Heritage
description: Heritage Design System — comprehensive design guidelines
  and components for all Heritage Financial products.
version: 1.0.0
tokens:
  color:
    # Base palette
    brand-dark:
      value: "#5B4A3F"
    brand-mid:
      value: "#8D7B6F"
    cream:
      value: "#F5F0EB"
    white:
      value: "#FFFFFF"
    error-red:
      value: "#DC3545"
    success-green:
      value: "#198754"

    # Semantic tokens referencing base palette
    primary:
      value: "{color.brand-dark}"
      description: Primary brand color
    secondary:
      value: "{color.brand-mid}"
      description: Secondary brand color
    background:
      value: "{color.cream}"
      description: Page background
    surface:
      value: "{color.white}"
      description: Component surface color
    text:
      primary:
        value: "{color.brand-dark}"
      muted:
        value: "{color.brand-mid}"
    error:
      value: "{color.error-red}"
    success:
      value: "{color.success-green}"

  dimension:
    spacing:
      xs: "4px"
      sm: "8px"
      md: "16px"
      lg: "24px"
      xl: "32px"
      2xl: "48px"
    radius:
      sm: "4px"
      md: "8px"
      lg: "16px"
      full: "9999px"
    border:
      thin: "1px"
      thick: "2px"

  typography:
    display-lg:
      fontFamily: "Georgia, serif"
      fontSize: "48px"
      fontWeight: "700"
      lineHeight: "1.1"
    heading-lg:
      fontFamily: "Georgia, serif"
      fontSize: "28px"
      fontWeight: "600"
      lineHeight: "1.25"
    heading-md:
      fontFamily: "Georgia, serif"
      fontSize: "20px"
      fontWeight: "600"
      lineHeight: "1.3"
    body-lg:
      fontFamily: "Inter, sans-serif"
      fontSize: "18px"
      fontWeight: "400"
      lineHeight: "1.7"
    body-md:
      fontFamily: "Inter, sans-serif"
      fontSize: "16px"
      fontWeight: "400"
      lineHeight: "1.6"
    label-md:
      fontFamily: "Inter, sans-serif"
      fontSize: "14px"
      fontWeight: "500"
      lineHeight: "1.4"
    label-sm:
      fontFamily: "Inter, sans-serif"
      fontSize: "12px"
      fontWeight: "500"
      lineHeight: "1.4"
---`,
              },
            ],
          },
          {
            label: "Overview + Colors",
            body: "The Heritage Overview section explains the system's purpose and principles. The Colors section uses token references throughout rather than repeating hex values.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "Overview & Colors sections",
                content: `## Overview

Heritage is a design system for Heritage Financial — a wealth management
platform serving high-net-worth individuals and their advisors.

**Design Principles**

- **Warmth** — Warm neutral palette. Avoid pure black; use
  {color.primary} on light surfaces.
- **Craftsmanship** — Deliberate spacing and refined typography.
  Georgia for headings signals tradition and authority.
- **Clarity** — Every action must be immediately legible.

---

## Colors

The Heritage palette draws from warm earth tones to convey trust
and permanence.

Use {color.primary} for primary actions, active navigation states,
and links. It is a deep warm brown with sufficient contrast against
{color.background} (contrast ratio: 7.2:1).

Use {color.secondary} for secondary buttons, placeholder text,
and supporting UI text.

**Rules**

- All body text must use {color.text.primary} or {color.text.muted}.
  Never use base palette tokens (e.g., {color.brand-dark}) directly
  in component code — always use semantic tokens.
- Error states exclusively use {color.error}.
  Never repurpose {color.error} for warnings.
- {color.background} is the page background only. Component surfaces
  use {color.surface}.`,
              },
            ],
          },
          {
            label: "Typography + Layout",
            body: "Typography maps each token to its intended HTML element and context. Layout documents the spacing scale and grid structure.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "Typography & Layout sections",
                content: `## Typography

Heritage uses Georgia for display and heading text and Inter for all
UI, body, and label text.

**Style mapping**

| Token | Use |
|-------|-----|
| {typography.display-lg} | Page hero titles (h1) — one per page |
| {typography.heading-lg} | Section headings (h2), modal titles |
| {typography.heading-md} | Card headings (h3), sidebar titles |
| {typography.body-lg} | Long-form article text |
| {typography.body-md} | Descriptions, form helper text |
| {typography.label-md} | Button labels, nav items, table headers |
| {typography.label-sm} | Timestamps, badges, captions |

**Rules**

- Georgia is for headings only. Buttons, labels, and navigation
  use Inter via {typography.label-md}.
- Minimum body text: {typography.body-md} (16px). Never go smaller
  for prose content.
- Do not override line-height on individual elements.

---

## Layout & Spacing

The Heritage grid is 12 columns with a 24px gutter and 40px outer
margins on desktop. Mobile: 4 columns, 16px gutter, 16px margins.

**Spacing scale** — 4px base unit. All spacing is a multiple of 4.

| Token | Value | Use |
|-------|-------|-----|
| {dimension.spacing.xs} | 4px | Icon gap, tight inline spacing |
| {dimension.spacing.sm} | 8px | Badge padding, list item gap |
| {dimension.spacing.md} | 16px | Default component padding |
| {dimension.spacing.lg} | 24px | Card padding, section gap |
| {dimension.spacing.xl} | 32px | Section separation |
| {dimension.spacing.2xl} | 48px | Page section separation |

**Rules**

- Never use spacing values between scale steps (e.g., 12px, 20px).
- Stack two xs tokens (4px + 4px) before reaching for sm (8px) — that
  means you need sm, not an arbitrary value.`,
              },
            ],
          },
          {
            label: "Components",
            body: "The Heritage component section documents each component with its token bindings and behavioral rules. This is the section AI uses when generating component code.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "Components section",
                content: `## Components

### Button

Buttons initiate actions. Three variants: primary (main action),
secondary (supporting action), ghost (tertiary in dense contexts).

**Token bindings**

| Property | Primary | Secondary | Ghost |
|----------|---------|-----------|-------|
| backgroundColor | {color.primary} | transparent | transparent |
| textColor | {color.surface} | {color.primary} | {color.text.muted} |
| border | none | {dimension.border.thick} solid {color.primary} | none |
| padding | {dimension.spacing.md} {dimension.spacing.lg} | same | same |
| borderRadius | {dimension.radius.md} | same | same |
| typography | {typography.label-md} | same | same |

**Rules**
- One primary button per view. Never two primary buttons adjacent.
- Disabled: opacity 0.4, pointer-events none. No alternative color.
- Minimum tap target: 44×44px on all touch surfaces.

---

### Card

A card groups related content on a surface with optional elevation.

| Property | Token |
|----------|-------|
| backgroundColor | {color.surface} |
| borderRadius | {dimension.radius.lg} |
| padding | {dimension.spacing.lg} |
| border | {dimension.border.thin} solid rgba(0,0,0,0.08) |

---

### Input

Text inputs for forms. Always pair with a visible label.

| Property | Token |
|----------|-------|
| backgroundColor | {color.surface} |
| borderColor | {color.secondary} |
| borderRadius | {dimension.radius.sm} |
| typography | {typography.body-md} |
| focusBorderColor | {color.primary} |
| errorBorderColor | {color.error} |`,
              },
            ],
          },
        ],
      },
      {
        id: "ai-integration",
        title: "AI Tools & design.md",
        body: "design.md was designed with AI tools in mind. Stitch (Google) uses it natively. Claude Code reads it when pointed at the file. Both tools produce better output — with correct tokens, proper component structure, and system-aware decisions — when a valid design.md is present.",
        tabs: [
          {
            label: "Stitch + design.md",
            body: "Stitch is Google's AI design tool built around the design.md format. When you create or import a design.md, Stitch uses it to generate UI components that correctly reference your tokens and follow your system's documented rules.",
            bullets: [
              "Stitch reads your design.md at project creation and surfaces your token palette in the design editor",
              "When generating components, Stitch pulls token names from design.md — you see '{color.primary}' in outputs, not raw hex values",
              "The Do's and Don'ts section directly influences what Stitch will and won't generate",
              "Stitch can export your Figma design system as a design.md file using the Stitch Figma plugin",
              "Changes to design.md sync back to Stitch's token panel without manual re-import",
            ],
            note: "Stitch is the reference implementation. It is what the design.md spec was designed to serve — understanding it helps you write design.md files that work for any AI tool.",
          },
          {
            label: "Claude Code Workflow",
            body: "Claude Code does not natively parse design.md, but it reads any file you reference in CLAUDE.md. The standard pattern is to include design.md in your CLAUDE.md with a read instruction at the top.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "CLAUDE.md",
                content: `# Project Context

When creating or modifying any UI,
read and follow design.md
before writing any code.

## Stack
- Next.js 15 App Router
- Tailwind CSS v4
- shadcn/ui components

## Design System
- All design tokens are in design.md
- All component rules are in design.md
- Never hardcode color values — always use tokens from design.md`,
              },
            ],
            note: "This is exactly how this course site is configured. The CLAUDE.md in /VibeCodingforDesigners references design.md before any UI work.",
          },
          {
            label: "Session Workflow",
            body: "With design.md and CLAUDE.md working together, your AI session starts with full design system context. Here is the typical flow from design decision to code.",
            bullets: [
              "1. You update design.md with a new token or component rule",
              "2. Claude Code reads CLAUDE.md at session start — which points to design.md",
              "3. You prompt: 'Add a new Badge component with the success variant'",
              "4. Claude Code generates Badge using {color.success} from design.md — no guessing",
              "5. You run 'design-md lint design.md' to confirm references are valid",
              "6. You run 'design-md export design.md --format css' to regenerate tokens.css",
              "7. Commit design.md, the generated tokens.css, and the new Badge component together",
            ],
            note: "The key insight: design.md makes AI output predictable. The same prompt produces the same tokens every time because the source of truth is explicit.",
          },
          {
            label: "Three-Layer Context",
            body: "AI design work operates in a three-layer context hierarchy. Each layer answers a different question for the AI — and knowing which layer to update when something changes prevents conflicting information.",
            bullets: [
              "Layer 1 — CLAUDE.md: How should the AI behave in this project? (stack, rules, workflow, file structure)",
              "Layer 2 — design.md: What does the design system look like? (tokens, components, patterns, constraints)",
              "Layer 3 — The spec or prompt: What should be built right now? (this feature, this screen, this component)",
              "CLAUDE.md points to design.md. Design.md is the authoritative token and component reference.",
              "Never put token values in CLAUDE.md — they belong in design.md. CLAUDE.md just says 'read design.md'.",
              "If AI produces wrong tokens, update design.md. If AI uses wrong workflow, update CLAUDE.md.",
            ],
            note: "This three-layer system is what separates a project where AI consistently produces correct output from one where every session starts from scratch.",
          },
        ],
      },
    ],
    exercise: {
      title: "Write a Valid design.md for Your Project",
      description: "Create a design.md file following the official spec structure — YAML front matter with token definitions and markdown body with the canonical sections. Use the Heritage example as a reference and the CLI to validate your file.",
      steps: [
        "Install the CLI: npm install -g @google/design.md",
        "Create design.md in your project root with the required YAML front matter fields: title, description, version, and at least a color and typography tokens block",
        "Write the five required sections: Overview, Colors, Typography, Layout & Spacing, and Components with at least one component entry",
        "Use token references ({color.primary}) in your markdown body instead of hardcoded hex values",
        "Run 'design-md lint design.md' and fix any errors before committing",
        "Update your CLAUDE.md to reference design.md with 'read and follow design.md before writing any code'",
      ],
    },
    deliverable: {
      title: "A Linted design.md Committed to Your Repository",
      description: "A committed design.md that passes 'design-md lint' with zero errors, contains all five required sections, and uses token references throughout the markdown body. Test it by starting a fresh Claude Code session and asking it to build a new component — it should correctly reference your tokens without prompting.",
    },
    quiz: [
      {
        question: "What is design.md?",
        options: [
          "A git command",
          "The canonical design document in the repo — tokens, type scale, spacing, components",
          "A single CSS file",
        ],
        correct: 1,
      },
      {
        question: "Why does design.md matter to the AI?",
        options: [
          "It is the AI's source of truth for your design decisions",
          "It speeds up the CPU",
          "It is purely decorative",
        ],
        correct: 0,
      },
      {
        question: "Values in design.md should be expressed as…",
        options: [
          "Random hex codes",
          "Screenshots only",
          "Named tokens, not hardcoded values",
        ],
        correct: 2,
      },
    ],
  },

  "module-08": {
    objectives: [
      "Understand what CLAUDE.md is, how Claude reads it, and why it exists as a persistent context mechanism",
      "Know the four scope levels — Managed Policy, User, Project, and Local — and when to use each",
      "Use /init to auto-generate a CLAUDE.md from your codebase in under 60 seconds",
      "Write effective CLAUDE.md instructions: the right size, structure, and specificity for consistent AI behavior",
      "Use CLAUDE.local.md for personal preferences and @imports to modularize large instruction sets",
      "Understand auto memory — how Claude learns from your corrections without you writing anything",
      "Debug your CLAUDE.md with the /memory command",
    ],
    concepts: [
      {
        id: "what-is-claude-md",
        title: "What Is CLAUDE.md",
        body: "CLAUDE.md is a plain markdown file that Claude Code reads automatically at the start of every session. It carries knowledge across sessions — your stack, your conventions, your constraints — so you never re-explain the same things twice. Two mechanisms carry knowledge across sessions: CLAUDE.md files you write, and auto memory that Claude writes itself.",
        tabs: [
          {
            label: "How It Works",
            body: "CLAUDE.md is delivered as a user message after the system prompt at the start of every session. Claude reads it and holds that context for the entire conversation — your stack, your design rules, what to always/never do.",
            bullets: [
              "Placed in your project root — Claude Code loads it automatically on session start",
              "Plain markdown — no special syntax required beyond clear, specific instructions",
              "Persistent: every session gets the same ground truth, no re-explaining needed",
              "Not enforced configuration — Claude reads and follows it, but it is guidance not a hard lock",
              "HTML comments (<!-- notes -->) are stripped before Claude reads — safe for maintainer notes without costing tokens",
            ],
            note: "For hard enforcement (block specific commands regardless of what Claude decides), use a PreToolUse hook. CLAUDE.md is behavioral guidance, not a firewall.",
          },
          {
            label: "vs Other AI Tools",
            body: "Other AI coding tools support similar instruction files. If your project already uses AGENTS.md (Devin, Codex), you can import it directly into CLAUDE.md — no duplication needed. Running /init in a repo that has existing tool configs reads them and incorporates the relevant parts.",
            bullets: [
              "AGENTS.md — used by Devin, OpenAI Codex agents",
              ".cursorrules — Cursor-specific rules (Claude Code does not read this automatically)",
              ".devin/rules/ — Devin-specific rules",
              "CLAUDE.md can import from any of these with the @path/to/file syntax",
              "/init reads existing tool configs (.cursorrules, .devin/rules/, .windsurfrules) when generating CLAUDE.md",
            ],
            codeBlocks: [
              {
                lang: "markdown",
                label: "CLAUDE.md — import from AGENTS.md",
                content: `@AGENTS.md

## Claude Code Specific

Use plan mode for changes under \`src/billing/\`.
Always run design-md lint before committing token changes.`,
              },
            ],
          },
          {
            label: "Auto Memory",
            body: "Auto memory is Claude's own note-taking system. As you work and correct Claude's mistakes, it saves learnings automatically — build commands, debugging patterns, your workflow preferences — without you writing anything. These notes load at the start of every session.",
            bullets: [
              "Claude decides what's worth saving based on whether it would be useful in a future conversation",
              "Stored at ~/.claude/projects/<project>/memory/ — plain markdown you can read, edit, or delete at any time",
              "The first 200 lines of MEMORY.md load at session start; detailed topic files load on demand",
              "Run /memory in any session to browse what Claude has saved and toggle auto memory on/off",
              "You and CLAUDE.md handle project standards; Claude and auto memory handle learnings",
            ],
            note: "Requires Claude Code v2.1.59 or later. Check your version with: claude --version",
          },
        ],
      },
      {
        id: "claude-md-hierarchy",
        title: "The Four Scope Levels",
        body: "CLAUDE.md files can live in four locations, each with a different scope and audience. They load in order from broadest to most specific — project rules appear in context after user rules, giving them higher effective priority. All discovered files are concatenated, not overriding each other.",
        bullets: [
          "Managed Policy — org-wide, deployed by IT/DevOps, cannot be excluded by users. macOS: /Library/Application Support/ClaudeCode/CLAUDE.md | Linux/WSL: /etc/claude-code/CLAUDE.md",
          "User instructions — your personal preferences for every project on your machine. Location: ~/.claude/CLAUDE.md. Use for: code style preferences, personal tooling shortcuts.",
          "Project instructions — team-shared, committed to version control. Location: ./CLAUDE.md or ./.claude/CLAUDE.md. Use for: architecture decisions, coding standards, common workflows.",
          "Local instructions — personal and project-specific, never committed. Location: ./CLAUDE.local.md (add to .gitignore). Use for: your sandbox URLs, local test data, personal overrides.",
          "All discovered CLAUDE.md files are concatenated into context in order from broadest scope to most specific — they stack, they do not override each other.",
        ],
        codeBlocks: [
          {
            lang: "bash",
            label: "file locations and setup",
            content: `# User-level (your preferences, all projects)
~/.claude/CLAUDE.md

# Project-level (committed to git, shared with team)
./CLAUDE.md
./.claude/CLAUDE.md

# Local (personal overrides — never commit this)
touch CLAUDE.local.md
echo "CLAUDE.local.md" >> .gitignore

# Managed policy (org-wide, IT-deployed)
# macOS: /Library/Application Support/ClaudeCode/CLAUDE.md
# Linux/WSL: /etc/claude-code/CLAUDE.md
# Windows: C:\\Program Files\\ClaudeCode\\CLAUDE.md`,
          },
        ],
      },
      {
        id: "init-command",
        title: "Generating CLAUDE.md with /init",
        body: "The fastest way to create a CLAUDE.md is to let Claude generate it. The /init command analyzes your codebase — build files, configs, directory structure, conventions — and writes a starting CLAUDE.md with the facts it discovers. You refine from there with the things only you know.",
        tabs: [
          {
            label: "Basic /init",
            body: "Run /init inside any Claude Code session and Claude will analyze your codebase and generate a CLAUDE.md with build commands, test instructions, and project conventions it can discover automatically.",
            codeBlocks: [
              {
                lang: "bash",
                label: "generate CLAUDE.md",
                content: `# Navigate to your project
cd your-project

# Start a Claude session
claude

# Inside the session, run:
/init

# Claude will:
# 1. Analyze your package.json, tsconfig, eslintrc, etc.
# 2. Find your build, test, and lint commands
# 3. Detect your framework and file conventions
# 4. Write CLAUDE.md with what it found
# 5. Prompt you to add what it couldn't discover

# If CLAUDE.md already exists, /init suggests improvements
# instead of overwriting it`,
              },
            ],
          },
          {
            label: "Interactive /init",
            body: "Set CLAUDE_CODE_NEW_INIT=1 to enable a guided multi-phase flow. Claude asks what to set up, explores your codebase with a subagent, fills gaps via follow-up questions, and shows a reviewable proposal before writing any files.",
            codeBlocks: [
              {
                lang: "bash",
                label: "interactive mode",
                content: `# Enable the interactive init flow
CLAUDE_CODE_NEW_INIT=1 claude

# Inside the session, run:
/init

# The four phases:
# 1. Choose what to set up (CLAUDE.md, skills, hooks)
# 2. Subagent explores your codebase
# 3. Follow-up questions for gaps Claude couldn't discover
# 4. Reviewable proposal — you approve before anything is written`,
              },
            ],
          },
          {
            label: "What to Add After",
            body: "/init covers what Claude can discover automatically. You must add the things only you know — your design system rules, token conventions, what AI keeps getting wrong in your codebase.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "add manually after /init",
                content: `# /init finds automatically:
# ✓ npm run dev, npm run build, npm test
# ✓ TypeScript config, ESLint rules
# ✓ Framework (Next.js, Vite, etc.)
# ✓ Basic file structure

# You must add:

## Design System
Read design.md before writing any component code.
All colors must reference CSS custom properties — never hardcode hex values.
Spacing: Tailwind scale only — multiples of 4px.

## Conventions
- File naming: kebab-case for files, PascalCase for exports
- Components: use semantic HTML — <button> not <div> for click targets

## Never Do
- Do not use inline styles
- Do not add TypeScript 'any' type
- Do not use <div> where a semantic element exists`,
              },
            ],
          },
        ],
      },
      {
        id: "writing-claude-md",
        title: "Writing Effective Instructions",
        body: "CLAUDE.md is loaded into the context window at the start of every session, consuming tokens. How you write instructions directly affects how consistently Claude follows them. The official guidance gives four principles: size, structure, specificity, and consistency.",
        tabs: [
          {
            label: "Size & Structure",
            body: "Target under 200 lines per CLAUDE.md file. Longer files reduce adherence, not just token cost. Use markdown headers and bullets — Claude scans structure the same way readers do: organized sections are easier to follow than dense paragraphs.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "well-structured CLAUDE.md",
                content: `# Project Context

<!-- Last updated: 2026-07 — update after major stack changes -->

## Stack
Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui

## Design System
Read design.md before writing any component code.

## Commands
- Dev server: npm run dev
- Build: npm run build
- Tests: npm test
- Lint: npm run lint

## Conventions
- All colors must reference CSS custom properties — no hardcoded hex
- Spacing: Tailwind scale only — multiples of 4px
- File naming: kebab-case files, PascalCase exports
- Components live in src/components/, routes in src/app/

## Accessibility
- All interactive elements must be keyboard accessible
- Focus rings: 2px solid --color-ring, 2px offset
- Use semantic HTML — <button> not <div> for click targets

## Never Do
- Do not use inline styles
- Do not hardcode color values
- Do not add TypeScript 'any' type
- Do not use <div> where a semantic element exists`,
              },
            ],
            bullets: [
              "Target: under 200 lines — the official guidance from Anthropic",
              "Use ## headers to group related rules — not one flat list of 40 bullets",
              "HTML comments (<!-- notes -->) are stripped before Claude reads — use freely for maintainer notes",
              "If instructions are growing large, move them to .claude/rules/ with path-scoping so they only load when relevant",
            ],
          },
          {
            label: "Specificity",
            body: "Write instructions that are concrete enough to verify. Vague rules get ignored or interpreted arbitrarily. Specific rules get followed consistently because Claude can check its own output against them.",
            bullets: [
              "\"Use 2-space indentation\" instead of \"Format code properly\"",
              "\"Run npm test before committing\" instead of \"Test your changes\"",
              "\"API handlers live in src/api/handlers/\" instead of \"Keep files organized\"",
              "\"Use <button> for all click targets\" instead of \"Use semantic HTML where possible\"",
              "\"All colors must reference CSS custom properties — no hardcoded hex values\" instead of \"Use design tokens\"",
              "\"Components live in src/components/ui/ — never in src/app/\" instead of \"Organize files well\"",
            ],
          },
          {
            label: "Import Syntax",
            body: "CLAUDE.md files can import other files using @path/to/file syntax. The imported file is loaded into context at session start alongside the CLAUDE.md that references it. Use this to split large instruction sets or pull in shared standards.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "CLAUDE.md with @imports",
                content: `# Project Context

See @README for project overview.
Available scripts: @package.json

## Design System
Read @design.md before writing any component code.

## Git Workflow
@docs/git-instructions.md

## Additional Instructions
- All colors must reference CSS custom properties
- Spacing: Tailwind scale only`,
              },
            ],
            bullets: [
              "Relative and absolute paths both work — relative paths resolve from the file containing the import",
              "Wrap in backticks to mention a path without importing it: \\`@README\\` stays literal",
              "Maximum import depth: 4 hops",
              "Imported files still cost tokens — they load at session start even if the topic isn't relevant",
              "For conditional loading, use .claude/rules/ with path frontmatter instead",
            ],
          },
          {
            label: "Consistency",
            body: "If two rules contradict each other, Claude may pick one arbitrarily. Periodically review your CLAUDE.md files, nested CLAUDE.md files in subdirectories, and .claude/rules/ to remove outdated or conflicting instructions.",
            bullets: [
              "Review CLAUDE.md after every major stack or design system change",
              "Run /memory in a session to see all loaded CLAUDE.md files — check for conflicts across files",
              "If two rules give different guidance for the same thing, Claude picks one — usually not the one you want",
              "Delete rules that no longer apply rather than leaving them as dead weight",
              "In monorepos: use claudeMdExcludes in .claude/settings.local.json to skip other teams' CLAUDE.md files",
            ],
          },
        ],
      },
      {
        id: "context-hierarchy",
        title: "The Three-Layer Context Hierarchy",
        body: "Context for AI sessions works in layers. CLAUDE.md sets the permanent project rules; design.md documents the design system; the spec or prompt describes what to build right now. Each layer has a different scope, lifecycle, and owner.",
        bullets: [
          "Layer 1 — CLAUDE.md: permanent project rules — stack, conventions, what to always/never do. Loads every session automatically.",
          "Layer 2 — design.md: living design system documentation — tokens, components, patterns. Referenced from CLAUDE.md: 'Read design.md before writing any component code.'",
          "Layer 3 — The spec or prompt: task-specific — what this component does, its variants, its states. Changes with every task.",
          "Always load: CLAUDE.md. Load when relevant: design.md. Load for each task: the spec.",
          "If AI produces wrong tokens → update design.md. If AI uses wrong workflow → update CLAUDE.md. If AI misses a task detail → update the spec.",
        ],
      },
      {
        id: "session-memory",
        title: "Building CLAUDE.md Over Time",
        body: "CLAUDE.md is a living document. The official guidance: add to it when Claude makes the same mistake a second time, when a code review catches something Claude should have known, or when you type the same correction into chat that you typed last session.",
        tabs: [
          {
            label: "When to Update",
            body: "Treat CLAUDE.md as the place you write down what you'd otherwise re-explain. Add to it when a pattern emerges — not preemptively. Keep it to facts Claude should hold in every session.",
            bullets: [
              "Claude makes the same mistake a second time → add a 'Never Do' rule",
              "A code review catches something Claude should have known about this codebase → add it to conventions",
              "You type the same correction into chat that you typed last session → it belongs in CLAUDE.md",
              "A new dependency joins the stack → add it to the stack section",
              "Any design system change that affects how components are written → update the design.md reference",
            ],
            note: "Multi-step procedures belong in skills (/review-pr, /deploy-staging). Task-specific context belongs in the prompt. CLAUDE.md is for standing rules, not procedures.",
          },
          {
            label: "Auto Memory",
            body: "Auto memory is Claude's parallel learning system. While you maintain CLAUDE.md for project standards, Claude accumulates learnings from your corrections automatically — debugging patterns, preferred workflows, tool commands — without you writing anything.",
            bullets: [
              "Claude saves notes when it discovers something worth remembering for future sessions",
              "Stored at ~/.claude/projects/<project>/memory/ — all plain markdown, fully editable",
              "The first 200 lines of MEMORY.md load at session start; topic files (debugging.md, patterns.md) load on demand",
              "You can ask Claude to remember something: 'always use pnpm, not npm' → saved to auto memory",
              "To add to CLAUDE.md instead: 'add this to CLAUDE.md' → Claude edits the file directly",
            ],
            codeBlocks: [
              {
                lang: "bash",
                label: "manage auto memory",
                content: `# Browse memory files loaded this session + toggle auto memory
/memory

# Check version (auto memory requires 2.1.59+)
claude --version

# Auto memory storage location
ls ~/.claude/projects/<your-project>/memory/
# MEMORY.md        ← index, always loaded at session start
# debugging.md     ← detailed notes, loaded on demand
# api-patterns.md  ← loaded when working on API files

# Disable auto memory in .claude/settings.json:
# { "autoMemoryEnabled": false }

# Or via environment variable:
# CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 claude`,
              },
            ],
          },
          {
            label: "Debugging",
            body: "If Claude isn't following your CLAUDE.md, there are three common causes: the file isn't being loaded, the instructions are too vague, or two rules are contradicting each other.",
            bullets: [
              "Run /memory in a session — lists every CLAUDE.md and CLAUDE.local.md file loaded. If yours isn't listed, Claude can't see it.",
              "Check the file location — CLAUDE.md must be in the directory you launched Claude from, or a parent directory",
              "Make instructions more specific: 'Use 2-space indentation' works better than 'format code nicely'",
              "Look for conflicting rules across CLAUDE.md files — if two files give different guidance, Claude may pick arbitrarily",
              "Instructions that must run at a specific moment (before commit, after file edit) need a hook, not a CLAUDE.md rule",
              "CLAUDE.md content survives /compact — Claude re-reads it from disk after compaction",
            ],
          },
        ],
      },
      {
        id: "testing-your-claude-md",
        title: "Testing Your CLAUDE.md",
        body: "Before relying on CLAUDE.md in a real session, test whether it actually constrains Claude's behavior as intended. Start a fresh session and try to trigger violations. If Claude violates a rule, the rule needs to be more specific.",
        codeBlocks: [
          {
            lang: "bash",
            label: "test sequence in a fresh session",
            content: `# Start a fresh session (no prior conversation context)
claude

# Check what files loaded
/memory
# → Verify your CLAUDE.md and CLAUDE.local.md appear in the list

# Test 1: stack knowledge
"What is our tech stack and what framework are we using?"
# → Claude should quote from CLAUDE.md without you repeating anything

# Test 2: design rules
"What design rules should you follow before writing any components?"
# → Claude should reference design.md and your token conventions

# Test 3: token awareness (should NOT produce hex values)
"Build a primary button component"
# → If it uses #5B4A3F instead of var(--color-primary), strengthen the rule

# Test 4: semantic HTML (should use <button> not <div>)
"Add a click handler that opens a modal"
# → If it uses <div onClick>, update the semantic HTML rule`,
          },
        ],
        bullets: [
          "If test 1 fails: CLAUDE.md isn't loading — check the file location with /memory",
          "If test 2 fails: the design.md reference is missing or too vague — make it an explicit instruction",
          "If test 3 fails: add 'All colors must reference CSS custom properties — never use hardcoded hex values'",
          "If test 4 fails: add 'Use <button> for ALL click targets — never <div onClick>' to the Never Do section",
          "Re-test after every CLAUDE.md update — regression testing for AI behavior",
          "A CLAUDE.md that passes all four tests saves hours of correction per week",
        ],
      },
    ],
    exercise: {
      title: "Write, Generate, and Test Your CLAUDE.md",
      description: "Use /init to generate a starting CLAUDE.md from your project, then enhance it with the instructions only you know. Test it against four prompts designed to fail if the file isn't working.",
      steps: [
        "Navigate to your project in the terminal, run claude, and inside the session run /init to generate a starting CLAUDE.md",
        "Review what /init generated — add your design system reference ('Read design.md before writing any component code'), token conventions, and Never Do rules it couldn't discover",
        "Create CLAUDE.local.md with your personal preferences (your localhost URL, preferred test data) and add CLAUDE.local.md to your .gitignore",
        "Start a fresh Claude session and run /memory — verify your CLAUDE.md appears in the loaded files list",
        "Run the four test prompts: stack question, design rules question, button component, click handler",
        "Strengthen any rule that fails the test and re-run until all four pass",
      ],
    },
    deliverable: {
      title: "A Working, Tested CLAUDE.md",
      description: "A CLAUDE.md committed to your project root that passes all four test prompts without requiring additional context. A CLAUDE.local.md with your personal preferences in .gitignore. Document in your Vibe Session Log which rules you had to strengthen after testing — each correction is one CLAUDE.md now prevents automatically.",
    },
    quiz: [
      {
        question: "What is CLAUDE.md?",
        options: [
          "A context file that primes every Claude Code session with your project's rules",
          "A React component",
          "A unit test",
        ],
        correct: 0,
      },
      {
        question: "Which is a good CLAUDE.md instruction?",
        options: [
          "“Ignore the design system”",
          "“Read design.md before any UI work”",
          "“Use random colors”",
        ],
        correct: 1,
      },
      {
        question: "When does Claude Code read CLAUDE.md?",
        options: [
          "Only when you deploy",
          "Never",
          "Automatically when the project opens",
        ],
        correct: 2,
      },
    ],
  },

  "module-09": {
    objectives: [
      "Understand what SDD-DE is and what it installs into your project",
      "Install the SDD-DE toolkit with a single npx command",
      "Understand what gets created: .sdd-de/ folder, CLAUDE.md, and .gitignore entry",
      "Verify that the 5 SDD skills are available in Claude Code after installation",
    ],
    concepts: [
      {
        id: "what-is-sdd-de",
        title: "What Is SDD-DE?",
        body: "SDD-DE (Spec-Driven Development for Design Engineers) is an npm package that installs a structured design-to-code workflow into any front-end project. One command writes the skill files, spec templates, and standards docs that Claude Code needs to follow the SDD workflow. You do not clone a repo, configure anything, or install dependencies — you run npx sdd-de and it is done.",
        bullets: [
          "Skills: /enrich-brief, /generate-artifacts, /visual-verify, /sync-tokens, /commit — each a SKILL.md that Claude Code reads automatically",
          "Spec templates: fill-in-the-blank documents for Component Specs, Interaction Specs, and Page Specs",
          "Standards docs: rules for component structure, token naming, accessibility, and responsive layout",
          "CLAUDE.md: the agent configuration file that points Claude Code to every skill and standard",
          "Works with any front-end project: Next.js, Vite, Astro, React — no framework lock-in",
        ],
        tools: [
          {
            name: "sdd-de on npm",
            href: "https://www.npmjs.com/package/sdd-de",
            description: "The published npm package — view the version history and changelog",
          },
          {
            name: "SDD-DE on GitHub",
            href: "https://github.com/royvillasana/SDD-DE",
            description: "Source code — browse the skill definitions and spec templates",
          },
        ],
      },
      {
        id: "install-sdd-de",
        title: "Installing SDD-DE",
        body: "Open your terminal, navigate to your project root, and run one command. That is the entire setup. No account required, no configuration step, no dependencies to manage.",
        tabs: [
          {
            label: "Install",
            body: "Run this from your project root. npx downloads the latest version of sdd-de and runs it immediately — nothing is added to your node_modules or package.json.",
            codeBlocks: [
              {
                lang: "bash",
                label: "install SDD-DE",
                content: "npx @royvillasana/sdd-de",
              },
            ],
            note: "Requires Node.js 18 or later. Check with: node --version",
          },
          {
            label: "What Gets Created",
            body: "The command creates three things in your project:",
            bullets: [
              ".sdd-de/ai-specs/skills/ — 5 skill folders, each with a SKILL.md that Claude Code reads when you run the matching slash command",
              ".sdd-de/docs/ — spec templates (Component, Interaction, Page) and standards docs (component-standards.md, page-standards.md, design-token-model.md, sdd-mandatory-steps.md)",
              "CLAUDE.md — written to your project root; tells Claude Code where every skill and standard lives",
              ".gitignore — .sdd-de/ is added automatically if a .gitignore exists",
            ],
          },
          {
            label: "Terminal Output",
            body: "A successful install looks like this:",
            codeBlocks: [
              {
                lang: "text",
                label: "expected output",
                content: `SDD-DE — Spec-Driven Development for Design Engineers
──────────────────────────────────────────────────────
  ✓  skills installed  →  .sdd-de/ai-specs/skills/
  ✓  docs installed    →  .sdd-de/docs/
  ✓  CLAUDE.md created →  ./CLAUDE.md
  ✓  .gitignore updated

Ready. Open Claude Code in this directory and run:

  /enrich-brief          transform a brief into a spec-ready story
  /generate-artifacts    generate Component, Interaction, and Page specs
  /visual-verify         compare live implementation to Figma
  /sync-tokens           sync Figma Variables and CSS custom properties
  /commit                push a PR with the spec as description`,
              },
            ],
          },
        ],
      },
      {
        id: "how-skills-work",
        title: "How the Skills Work",
        body: "A skill is a SKILL.md file — a plain markdown document that Claude Code reads when you type the matching slash command. There is no runtime process, no plugin to activate, and no API key to configure. The CLAUDE.md in your project root points Claude Code to each SKILL.md file in .sdd-de/.",
        table: [
          { left: "/enrich-brief", right: "Reads the Figma frame or brief, identifies gaps, writes specs/[name]/enriched-story.md" },
          { left: "/generate-artifacts", right: "Reads the enriched story, writes all 3 spec files using the templates in .sdd-de/docs/" },
          { left: "/visual-verify", right: "Compares the live component to the Figma frame at 375px / 768px / 1440px" },
          { left: "/sync-tokens", right: "Audits CSS custom properties vs. Figma Variables and flags any gaps" },
          { left: "/commit", right: "Commits with the Component Spec as the PR description" },
        ],
        tableLabels: { left: "Command", right: "What it does" },
      },
      {
        id: "verify-install",
        title: "Verifying the Installation",
        body: "After npx sdd-de completes, open Claude Code in your project directory and run the verification prompt. Claude Code will read CLAUDE.md, find all 5 skill paths, and confirm they are ready.",
        tabs: [
          {
            label: "Verification Prompt",
            body: "Paste this into Claude Code immediately after installation.",
            codeBlocks: [
              {
                lang: "text",
                label: "verify prompt",
                content: "Read CLAUDE.md. List every available skill, its slash command, and the path to its SKILL.md file.",
              },
            ],
            note: "Expected response: Claude Code lists all 5 skills with their .sdd-de/ paths. If it says it cannot find a skill, confirm CLAUDE.md is in your project root (not inside .sdd-de/).",
          },
          {
            label: "Test a Skill",
            body: "Run a live test of the /enrich-brief skill to confirm the full chain works.",
            codeBlocks: [
              {
                lang: "text",
                label: "skill test prompt",
                content: "/enrich-brief\nI want to build a primary action button with hover and loading states.",
              },
            ],
            note: "Claude Code should respond by asking targeted questions and then writing a structured enriched story — not just a description of what a button is.",
          },
        ],
      },
    ],
    exercise: {
      title: "Install SDD-DE and Verify All 5 Skills",
      description: "Run npx sdd-de in your project directory and confirm every skill is available before moving on to Module 09.",
      steps: [
        "Open Terminal and navigate to your project root (the vcd-next project from this course)",
        "Run: npx @royvillasana/sdd-de",
        "Confirm the terminal output shows 4 green checkmarks",
        "Open Claude Code in your project directory",
        "Run the verification prompt: 'Read CLAUDE.md. List every available skill and its SKILL.md path.'",
        "Confirm all 5 skills appear: /enrich-brief, /generate-artifacts, /visual-verify, /sync-tokens, /commit",
        "Run the skill test prompt to confirm /enrich-brief responds correctly",
      ],
    },
    deliverable: {
      title: "SDD-DE Installed and All Skills Verified",
      description: "A screenshot of the Claude Code response showing all 5 SDD skills listed with their .sdd-de/ paths. Your project root should have CLAUDE.md and your project should have .sdd-de/ in .gitignore.",
    },
  },

  "module-10": {
    objectives: [
      "Understand the three spec types — Component, Interaction, and Page — and when to use each",
      "Write a complete Component Spec using the SDD-DE template that AI can execute without asking questions",
      "Write an Interaction Spec that captures triggers, timing, easing, and edge cases",
      "Use the /enrich-brief skill to transform a vague design brief into a spec-ready story",
      "Use the /generate-artifacts skill to generate all three spec artifacts automatically",
      "Red-line your spec for AI intent, not just for engineer measurements",
    ],
    concepts: [
      {
        id: "three-spec-types",
        title: "The Three Spec Types",
        body: "A spec is not a design file. A spec is a written document that describes what something is, what it does, and how it behaves — precise enough that any intelligent reader (AI or engineer) can build it without asking questions. SDD has three layers, each with a different scope.",
        bullets: [
          "Component Spec: a single UI component in isolation — visual properties, variants, states, sizes, content rules, accessibility",
          "Interaction Spec: how components behave over time — triggers, flows, timing, easing, edge cases",
          "Page/Feature Spec: how components compose into a complete feature — layout zones, content structure, cross-component connections",
        ],
        table: [
          { left: "Component Spec", right: "Defines what the component looks like and every state it can be in" },
          { left: "Interaction Spec", right: "Defines what happens over time — triggers, animation, edge cases" },
          { left: "Page/Feature Spec", right: "Defines how components compose into a full layout with responsive rules" },
        ],
        tableLabels: { left: "Spec Type", right: "Purpose" },
      },
      {
        id: "enrich-brief-skill",
        title: "Step 1 — /enrich-brief: Design Brief → Spec-Ready Story",
        body: "A design brief is not a spec. A brief says 'build a button.' A spec says exactly what the button looks like, how it behaves, what tokens it uses, and what happens when it fails. The /enrich-brief skill fills that gap — it reads your brief (or a Figma frame), identifies every missing detail, and writes a structured enriched story that the /generate-artifacts skill can work from.",
        tabs: [
          {
            label: "What /enrich-brief Does",
            body: "Enrichment transforms ambiguous intent into unambiguous requirements before any spec writing begins.",
            bullets: [
              "Identifies missing states: what happens when disabled, loading, or erroring?",
              "Identifies missing edge cases: double-click, offline, timeout, empty content",
              "Maps required design tokens: which CSS custom properties does this component need?",
              "Defines responsive behavior: what changes at 375px, 768px, 1440px?",
              "Sets acceptance criteria: clear pass/fail conditions for visual QA",
              "Asks up to 3 targeted questions before writing — so you resolve gaps, not AI",
            ],
          },
          {
            label: "How to Run It",
            body: "Type /enrich-brief in Claude Code followed by a description or Figma URL. The skill reads the SDD-DE SKILL.md automatically and produces a structured enriched story file.",
            codeBlocks: [
              {
                lang: "text",
                label: "run the skill",
                content: `/enrich-brief
I want to build a primary action button with a loading state for a form submit.
Figma frame: [paste your Figma URL]`,
              },
              {
                lang: "markdown",
                label: "output: enriched-story.md",
                content: `## Primary Button — Enriched Spec Story

### What It Is
A primary action trigger used on form submit and CTA flows.

### User Story
As a user, I want to click a button to submit a form so that I get clear feedback while waiting.

### Acceptance Criteria
- [ ] At 375px: full-width, 48px height
- [ ] At 1440px: auto-width, 48px height
- [ ] Hover: background shifts to --color-brand-primary-hover (150ms ease-out)
- [ ] Focus: 2px ring, --color-ring, 2px offset
- [ ] Loading: spinner left of label, aria-busy="true", pointer-events none
- [ ] Disabled: opacity-50, cursor-not-allowed
- [ ] Error state: returns to default, error message appears above

### Design Tokens Required
| Token | Status |
|---|---|
| --color-brand-primary | Exists |
| --color-brand-primary-hover | MISSING — create in Figma |

### Out of Scope (MVP)
- Icon-only variant`,
              },
            ],
          },
        ],
      },
      {
        id: "generate-artifacts-skill",
        title: "Step 2 — /generate-artifacts: All 3 Specs in One Command",
        body: "Once the enriched story is complete, /generate-artifacts reads it and writes all three spec documents — Component Spec, Interaction Spec, and Page Spec — using the SDD-DE templates as the structure. This is the step that makes spec writing fast: the enrichment does the thinking, the artifacts capture it.",
        tabs: [
          {
            label: "Component Spec",
            body: "The Component Spec is the primary document. It defines every visual property, variant, state, size, and accessibility requirement for a single component in isolation.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "component-spec.md (generated)",
                content: `Component: Button
Purpose: Primary user action trigger

Visual Properties:
- Height: controlled by padding (12px top/bottom) + line-height (16px) — never set fixed height
- Padding-inline: 20px (md), 24px (lg)
- Typography: Inter 14px/600
- Colors: --color-brand-primary (bg), --color-white (text)
- Border-radius: --radius-md

Variants: filled | outlined | ghost
States: default | hover | focus | active | disabled | loading | error
Sizes: sm (32px) | md (40px) | lg (48px)

Accessibility:
- Use <button> always — never <div> or <a> for actions
- Enter and Space trigger click
- Focus ring: always visible, never outline: none

Tasks:
- [ ] Create Button.tsx with variant + size props
- [ ] Implement all states with Tailwind classes
- [ ] Add loading spinner and aria-busy
- [ ] Write Storybook story for every variant`,
              },
            ],
          },
          {
            label: "Interaction Spec",
            body: "The Interaction Spec captures everything that happens over time: triggers, animation flows, timing, easing, and edge cases. Without it, Claude Code guesses — and the guess is usually wrong.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "interaction-spec.md (generated)",
                content: `Interaction: Form Submit Button
Trigger: user clicks the submit button

Flow:
1. Click → loading state immediately (0ms)
   - Label: "Saving..."
   - Spinner: 14px, left of label, same color
   - pointer-events: none
2. Success → default state (200ms ease-out transition)
3. Error → default state + error alert above form (300ms fade-in)

Edge Cases:
- Double-click before loading: ignore second click
- Network timeout at 10s: treat as error path
- Mobile touch: same flow as click`,
              },
            ],
          },
          {
            label: "How to Run It",
            body: "After /enrich-brief saves the enriched story, run /generate-artifacts to produce all three spec files.",
            codeBlocks: [
              {
                lang: "text",
                label: "run the skill",
                content: `/generate-artifacts
Use the enriched story at specs/primary-button/enriched-story.md`,
              },
            ],
            note: "Output files are saved to specs/[feature-name]/: component-spec.md, interaction-spec.md, page-spec.md",
          },
        ],
      },
      {
        id: "writing-component-spec",
        title: "Writing a Component Spec Manually",
        body: "When you want to write a spec yourself (without the skill), use the SDD-DE Component Spec template directly. The template lives at .sdd-de/docs/component-spec-template.md. Copy it, fill every field — a blank field is a decision you are delegating to AI.",
        code: {
          lang: "markdown",
          content: `Component: [ComponentName]
Purpose: [one-sentence description of what this component does for the user]

Visual Properties:
- Dimensions: [height rule — use padding-based if flexible]
- Spacing: [padding-inline for each size]
- Typography: [font family, size, weight]
- Colors: [CSS custom properties only — no hex values]
- Border: [width, style, color token]
- Border-radius: [token reference]

Variants: [list each variant and what it signals]
States: [default | hover | focus | active | disabled | loading | error]
Sizes: [sm | md | lg with height, padding, font-size for each]

Accessibility:
- Element: [correct semantic element]
- ARIA: [required attributes]
- Focus: [focus ring description]

Do not:
- [Constraint 1]
- [Constraint 2]

Tasks:
- [ ] [Implementation task 1]
- [ ] [Implementation task 2]`,
        },
      },
      {
        id: "redlining-for-ai",
        title: "Red-Lining for AI (Not for Engineers)",
        body: "Traditional red-lining annotates a design with measurements for engineers — pixel values, font sizes, spacing. AI red-lining annotates a design with intent — why a value is what it is and what rule governs it. This distinction prevents AI from making technically correct but semantically wrong decisions.",
        bullets: [
          "Bad: 'button height is 40px'",
          "Good: 'button height is controlled by padding (12px top + 12px bottom) plus line-height (16px) — do not set a fixed height; it must grow with content'",
          "Bad: 'focus ring is blue'",
          "Good: 'focus ring uses --color-ring, 2px width, 2px offset — this must be visible on both light and dark backgrounds'",
          "Bad: 'disabled state is grey'",
          "Good: 'disabled state is opacity-50 on the current variant — the color itself does not change, only the opacity'",
          "Every 'why' you write into the spec is a decision AI cannot get wrong",
        ],
      },
    ],
    exercise: {
      title: "Write a Complete Spec Using the SDD-DE Workflow",
      description: "Pick one component you want to build — Button, Card, or Input are good choices for a first spec. Run /enrich-brief and /generate-artifacts, then review the output and fill any gaps manually.",
      steps: [
        "Open Claude Code in your project directory (SDD-DE must be cloned and CLAUDE.md in root)",
        "Run /enrich-brief with a description of your component — answer every question the skill asks",
        "Review the enriched-story.md — add any acceptance criteria the skill missed",
        "Run /generate-artifacts — point it at your enriched story",
        "Open the generated component-spec.md and read it as if you are the AI receiving it — fix every gap",
        "Add at least two 'Do not' constraints that reflect intent, not just measurements",
      ],
    },
    deliverable: {
      title: "Complete Spec Document Set for One Component",
      description: "A Component Spec, Interaction Spec, and enriched story for a real component. The Component Spec must have: all variants, all states, all sizes, CSS custom property references (no hex), 'Do not' constraints with intent, and a task checklist. This spec will be used in Module 10 to run your first AI implementation session.",
    },
    quiz: [
      {
        question: "In Spec-Driven Development, what is the contract?",
        options: ["The screenshot", "The spec", "The vibe"],
        correct: 1,
      },
      {
        question: "A Component Spec describes…",
        options: [
          "Props, variants, states, and tokens",
          "Only the fill color",
          "The deployment pipeline",
        ],
        correct: 0,
      },
      {
        question: "Acceptance criteria are…",
        options: [
          "Vague vibes",
          "Optional decoration",
          "Testable statements that define “done”",
        ],
        correct: 2,
      },
    ],
  },

  "module-11": {
    objectives: [
      "Understand the six Claude Code permission modes and the tradeoff each makes between oversight and autonomy",
      "Switch modes mid-session using Shift+Tab, CLI flags, and VS Code mode selector",
      "Configure acceptEdits mode to approve file edits automatically while keeping shell command oversight",
      "Understand how auto mode's AI classifier decides what to block and what to allow",
      "Use bypassPermissions / --dangerously-skip-permissions to run fully autonomous agentic loops",
      "Explain how a complete SDD spec + CLAUDE.md constraints replace permission prompts as the safety net",
      "Identify the specific risks of bypass mode and when it is and is not appropriate to use it",
    ],
    concepts: [
      {
        id: "permission-modes-overview",
        title: "The Six Permission Modes",
        body: "Every Claude Code session runs in a permission mode. The mode controls when Claude pauses and asks you to approve an action versus executing immediately. Choosing the right mode is the difference between a session where you approve every file edit and one where Claude works through your entire spec autonomously while you do something else.",
        table: [
          { left: "default", right: "Reads only — pauses to approve every file edit and shell command. Best for sensitive work or getting started." },
          { left: "acceptEdits", right: "Reads and file edits auto-approved. Shell commands still prompt. Best for iterating on code you review after the fact." },
          { left: "plan", right: "Reads only — Claude researches and proposes a plan but makes no changes until you approve and select an execution mode." },
          { left: "auto", right: "Everything runs with background AI safety checks. A classifier reviews each action before it executes. Best for long autonomous tasks." },
          { left: "dontAsk", right: "Only pre-approved tools run. Everything else is auto-denied. Best for locked-down CI pipelines and scripts." },
          { left: "bypassPermissions", right: "Everything runs immediately — no prompts, no classifier. Only for isolated containers and VMs where no damage to the host is possible." },
        ],
        tableLabels: { left: "Mode", right: "What it does" },
      },
      {
        id: "switching-modes",
        title: "Switching Permission Modes",
        body: "You can switch modes mid-session, at startup, or as a persistent default. The mode is set through controls — not by asking Claude in chat. Shift+Tab in the CLI cycles through default → acceptEdits → plan, with auto and bypassPermissions added to the cycle when enabled.",
        tabs: [
          {
            label: "CLI",
            body: "Shift+Tab cycles modes. The current mode appears in the status bar. Pass a mode at startup with the --permission-mode flag.",
            codeBlocks: [
              {
                lang: "bash",
                label: "start in a specific mode",
                content: "claude --permission-mode acceptEdits\nclaude --permission-mode plan\nclaude --permission-mode bypassPermissions",
              },
              {
                lang: "json",
                label: "set a default mode in settings",
                content: `// ~/.claude/settings.json
{
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}`,
              },
            ],
          },
          {
            label: "VS Code",
            body: "Click the mode indicator at the bottom of the prompt box to cycle modes. You can also set the default in VS Code settings.",
            bullets: [
              "Ask before edits → default mode",
              "Edit automatically → acceptEdits mode",
              "Plan mode → plan mode",
              "Auto mode → auto mode (appears when account requirements are met)",
              "Bypass permissions → bypassPermissions (requires 'Allow dangerously skip permissions' toggle in extension settings)",
            ],
          },
          {
            label: "Plan Mode Flow",
            body: "Plan mode is unique: Claude reads and researches but makes no changes. When the plan is ready, you choose how to proceed.",
            bullets: [
              "Claude reads files, runs read-only shell commands, proposes a plan",
              "You review the plan — press Ctrl+G to edit it in your text editor",
              "Approve options: auto mode, acceptEdits, or manual review per edit",
              "Rejecting returns to planning with your feedback",
              "Use /plan prefix before any prompt to enter plan mode for one request",
            ],
          },
        ],
      },
      {
        id: "auto-mode",
        title: "Auto Mode: AI-Supervised Autonomy",
        body: "Auto mode eliminates routine permission prompts by running a separate classifier model that reviews every action before it executes. The classifier reads your conversation context and the pending action, then decides: block it, or allow it. You still see prompts, but only for actions the classifier flags as unusual.",
        tabs: [
          {
            label: "What It Blocks",
            body: "The classifier blocks anything that escalates beyond your request or targets sensitive infrastructure. These actions always prompt even in auto mode.",
            bullets: [
              "curl | bash — downloading and executing code from the internet",
              "Sending data to external endpoints not in your trusted list",
              "Production deploys and database migrations",
              "Force push, or pushing directly to main",
              "git reset --hard, git checkout -- ., git clean -fd",
              "Deleting files that existed before the session started",
              "Granting IAM permissions or modifying shared infrastructure",
              "terraform destroy, pulumi destroy, cdk destroy",
            ],
          },
          {
            label: "What It Allows",
            body: "Routine development actions are pre-approved so Claude can work without interruption.",
            bullets: [
              "Local file operations in your working directory",
              "Installing dependencies listed in your lock file or manifest",
              "Reading .env and sending credentials to their matching API",
              "Read-only HTTP requests",
              "Pushing to the branch you started on or one Claude created",
              "All file edits that stay within your working directory",
            ],
          },
          {
            label: "Requirements",
            body: "Auto mode requires Claude Code v2.1.83 or later and specific model support.",
            bullets: [
              "Model: Claude Opus 4.6 or later, or Sonnet 4.6 or later (on Anthropic API)",
              "Older models — Sonnet 4.5, Haiku, claude-3 — are not supported",
              "On Team and Enterprise plans: an Owner must enable it in Claude Code admin settings first",
              "The classifier runs server-side — its decisions do not count against your context window",
            ],
            note: "Auto mode is a research preview. It reduces prompts but does not guarantee safety. Do not use it as a replacement for review on sensitive operations.",
          },
        ],
      },
      {
        id: "bypass-permissions",
        title: "bypassPermissions: The Agentic Loop",
        body: "bypassPermissions mode disables all permission prompts and safety checks — every tool call executes immediately. This is the mode that enables full loop programming: Claude reads your spec, implements every task, runs builds, checks output, and iterates without ever stopping to ask. The spec and your CLAUDE.md constraints become the only safety net. This is how you turn a well-written SDD spec into an autonomous implementation session.",
        tabs: [
          {
            label: "How to Enable It",
            body: "bypassPermissions must be enabled at session start — you cannot enter it from a running session. Two equivalent flags activate it.",
            codeBlocks: [
              {
                lang: "bash",
                label: "enable bypass permissions",
                content: "# Full flag\nclaude --permission-mode bypassPermissions\n\n# Shorthand (identical behavior)\nclaude --dangerously-skip-permissions",
              },
              {
                lang: "bash",
                label: "add to cycle without activating",
                content: "# Adds bypassPermissions to Shift+Tab cycle but starts in default mode\nclaude --allow-dangerously-skip-permissions",
              },
            ],
            note: "Claude Code refuses to start in bypass mode when running as root or under sudo on Linux and macOS. Use a non-root user inside a container instead.",
          },
          {
            label: "The Loop Programming Pattern",
            body: "With bypassPermissions active and an SDD spec loaded, Claude runs the full implementation loop without stopping. This is the design engineering equivalent of a CI pipeline — spec-in, production component out.",
            codeBlocks: [
              {
                lang: "text",
                label: "autonomous session prompt",
                content: `Read CLAUDE.md and the Component Spec at specs/primary-button/primary-button-component-spec.md.

Implement every unchecked task in the spec task list, one at a time:
- After each task: mark it complete (- [ ] → - [x])
- After each task: run npm run build and fix any TypeScript errors before continuing
- After all tasks: run /visual-verify and resolve every discrepancy
- When all tasks pass: run /sync-tokens then /commit

Do not stop for clarification. If a decision is unclear, make the most spec-consistent choice and document it in design.md.`,
              },
            ],
            bullets: [
              "Claude reads the spec, implements task 1, marks it complete, runs the build",
              "Proceeds to task 2 without pausing — no approval prompt",
              "Continues through all tasks, fixing build errors inline",
              "Runs visual verify, resolves discrepancies, syncs tokens",
              "Opens the PR — all without a single permission prompt",
            ],
          },
          {
            label: "Protected Paths",
            body: "Even in bypassPermissions mode, two circuit breakers remain — rm -rf / and rm -rf ~ still prompt. Everything else executes immediately, including writes to .git, .claude, shell configuration files, and all other protected paths that other modes guard.",
            bullets: [
              "rm -rf / (filesystem root) — still prompts as a circuit breaker",
              "rm -rf ~ (home directory) — still prompts as a circuit breaker",
              ".git, .claude, .gitconfig, .bashrc — all writable without prompt in bypassPermissions",
              "Explicit ask rules in your settings — still force a prompt even in bypass mode",
              "Explicit deny rules — still block actions even in bypass mode",
            ],
          },
        ],
      },
      {
        id: "benefits-vs-dangers",
        title: "Benefits vs. Dangers: The Full Picture",
        body: "bypassPermissions is the most powerful mode in Claude Code. Used correctly — with a complete spec, a well-configured CLAUDE.md, and an isolated environment — it dramatically compresses the time from spec to working component. Used carelessly, it is the fastest way to corrupt your repository, overwrite important files, or execute unintended shell commands.",
        tabs: [
          {
            label: "Benefits",
            body: "When the conditions are right, bypass permissions unlocks a qualitatively different kind of AI session.",
            bullets: [
              "Zero interruption: Claude works through the full spec without stopping — ideal for long, well-defined implementation tasks",
              "True agentic loop: Claude can build, test, fix build errors, and iterate in a single session with no approval bottleneck",
              "Spec fidelity: when Claude cannot ask for clarification, it defaults to the spec — precisely what SDD-DE is designed for",
              "Speed: a component that takes 40 minutes with constant approval prompts can complete in 10 minutes in bypass mode",
              "Flow state: you can switch to design work while Claude implements — check back when it is done",
            ],
          },
          {
            label: "Dangers",
            body: "The same power that makes bypass mode productive makes it dangerous in the wrong context.",
            bullets: [
              "No safety net except your spec: if the spec has a gap, Claude fills it — possibly with something destructive",
              "Prompt injection: if Claude reads a file containing malicious instructions, bypass mode will execute them without asking",
              "Irreversible shell commands: rm, git reset --hard, force push — all execute without confirmation",
              "No classifier: unlike auto mode, there is no AI reviewing actions before they run — everything goes through immediately",
              "Scope creep: without permission prompts, Claude may touch files outside the expected scope if the prompt is imprecise",
              "Root damage: running as root with bypass permissions is refused — for good reason, it could corrupt the OS",
            ],
          },
          {
            label: "The SDD Safety Net",
            body: "The SDD workflow is specifically designed to make bypass permissions safe in controlled environments. The spec replaces the permission prompts as the source of constraints.",
            bullets: [
              "Complete Component Spec → Claude knows exactly what to build; gaps are minimized before the session opens",
              "CLAUDE.md 'Do not' rules → hard constraints Claude follows even without permission prompts",
              "Feature branch → all work is isolated; git checkout main undoes everything if needed",
              "Isolated container or VM → the environment enforces the boundary that bypass mode removes",
              "The /visual-verify gate → bypass mode implements, but you still review the output before it ships",
            ],
            note: "Bypass permissions + complete SDD spec + feature branch + dev container = the correct way to run an autonomous loop. Any missing element increases risk.",
          },
          {
            label: "When NOT to Use It",
            body: "These situations call for default mode, acceptEdits mode, or auto mode instead.",
            bullets: [
              "On your main branch — always branch first; bypass mode with no branch is a rollback nightmare",
              "With a partial or vague spec — missing acceptance criteria = unpredictable autonomous decisions",
              "On your host machine (not a container or VM) — use a devcontainer instead",
              "When touching production infrastructure — auto mode's classifier is the right tool",
              "On a repo you do not own or cannot fully restore — one rm command away from disaster",
              "As a substitute for writing a good spec — bypass permissions amplifies whatever the spec says, including gaps",
            ],
          },
        ],
      },
      {
        id: "sdd-loop-setup",
        title: "Setting Up the Full Autonomous Loop",
        body: "The complete autonomous loop is: SDD spec + feature branch + bypassPermissions + CLAUDE.md constraints. These four elements working together produce the fastest, safest version of spec-driven development.",
        codeBlocks: [
          {
            lang: "bash",
            label: "full autonomous loop setup",
            content: `# 1. Make sure SDD-DE is installed and spec is complete
#    /enrich-brief → /generate-artifacts → review → done

# 2. Create a feature branch (mandatory before bypass mode)
git checkout -b feature/primary-button-spec

# 3. Start Claude Code in bypass permissions mode
claude --dangerously-skip-permissions

# 4. In the Claude Code session, load context and run:
# "Read CLAUDE.md and specs/primary-button/primary-button-component-spec.md.
#  Implement all unchecked tasks. Run npm run build after each.
#  Run /visual-verify when all tasks are checked.
#  Run /commit when verify passes."`,
          },
        ],
      },
    ],
    exercise: {
      title: "Run Your First Bypass Permissions Session",
      description: "Set up a safe environment and run a complete autonomous loop using the spec from Module 09. The goal is to experience uninterrupted AI implementation driven purely by your spec and CLAUDE.md constraints.",
      steps: [
        "Confirm you are on a feature branch, not main: git branch",
        "Confirm you have a complete Component Spec from Module 09 with all tasks unchecked",
        "Start Claude Code in bypass permissions mode: claude --dangerously-skip-permissions",
        "Paste the autonomous loop prompt: load CLAUDE.md + spec, implement all tasks, run build after each, /visual-verify at end",
        "Step away — let Claude run the full loop without intervening",
        "When Claude finishes, review the implementation against the spec",
        "Note: how many tasks completed? Any build errors? Any spec deviations?",
      ],
    },
    deliverable: {
      title: "Autonomous Implementation Session Log",
      description: "A screenshot of the Claude Code session showing the full loop: tasks being checked off, build running after each, /visual-verify passing. Document what the spec caught that you would have had to approve manually, and any spec gaps that showed up as unexpected Claude decisions.",
    },
  },

  "module-12": {
    objectives: [
      "Prepare your project directory so Claude Code has every context source loaded before the first prompt",
      "Run the opening verification sequence — three messages that confirm Claude knows your stack, tokens, and rules",
      "Write the four-part prompt (Role + Context + Spec + Constraints) that produces usable output in under 3 iterations",
      "Read generated code against your spec and identify the 5 most common first-session errors",
      "Write targeted correction prompts that fix one specific issue per message — not scatter-shot rewrites",
      "Distinguish a spec gap from an AI mistake and handle each correctly",
      "Manage session hygiene: know when to start a new session and how to hand off context cleanly",
    ],
    concepts: [
      {
        id: "before-you-open-claude",
        title: "Before You Open Claude Code — What to Have Ready",
        body: "A session that produces good output on the first prompt is not luck — it is preparation. The five minutes you spend before opening Claude Code determine whether you run 3 iterations or 12. Have these four things ready before you type a single character.",
        tabs: [
          {
            label: "Checklist",
            body: "Run this checklist before every session. Missing any item means Claude will guess — and every guess is a correction cycle.",
            bullets: [
              "CLAUDE.md — in the project root, containing the 'read design.md before any UI' instruction. Claude reads this automatically when the project opens.",
              "design.md — in the project root, containing your YAML tokens and usage rules (especially the don't list). If it's not there, Claude invents values.",
              "Figma frame link — the specific frame for the component you are building, not the file URL. You'll paste this into the prompt.",
              "SDD-DE component spec — the Component Spec from module-09/10 for the component you're building. Paste this verbatim into the prompt.",
              "Storybook running — open localhost:6006 in Chrome. You'll need it to validate output with the Claude in Chrome extension.",
            ],
          },
          {
            label: "CLAUDE.md Check",
            body: "Claude Code reads CLAUDE.md automatically when you open a project directory. This file is your standing instruction set — it runs before every prompt without you having to repeat yourself.",
            codeBlocks: [
              {
                lang: "markdown",
                label: "CLAUDE.md minimum content",
                content: `# Project Rules

When creating or modifying any UI,
read and follow design.md
before writing any code.

## Stack
- Next.js App Router (TypeScript)
- Tailwind CSS v4
- All components in src/components/

## Non-negotiable rules
- All colors from CSS custom properties — never hardcoded hex
- All spacing on the 4px grid via --spacing-* tokens
- No inline styles (style={{...}})
- No ShadCN UI unless already installed in this project
- Semantic HTML: <button> for actions, <a> for navigation, <input> for inputs
- Every interactive element must be keyboard accessible

## Component paths
- Atoms:     src/components/ui/
- Molecules: src/components/molecules/
- Organisms: src/components/organisms/`,
              },
            ],
            note: "If you ran npx @royvillasana/sdd-de, your CLAUDE.md was created automatically. Open it and add your stack-specific rules before your first session.",
          },
          {
            label: "design.md Check",
            body: "design.md is what Claude reads to understand your token values and your anti-patterns. Without it, Claude uses hex values from training data — not yours.",
            codeBlocks: [
              {
                lang: "yaml",
                label: "design.md minimum structure",
                content: `---
colors:
  primary: "var(--color-primary)"       # e.g. #FFBA4C
  background: "var(--color-background)" # e.g. #0E0E10
  foreground: "var(--color-foreground)" # e.g. #F5F5F5
  muted: "var(--color-muted-foreground)"
  border: "var(--color-border)"
  card: "var(--color-card)"

spacing:
  base: 4  # 4px grid — all spacing must be multiples of 4

typography:
  display: "var(--font-display)"  # e.g. Fraunces
  body: "var(--font-body)"        # e.g. Inter

radius:
  sm: "var(--radius-sm)"   # 6px
  md: "var(--radius-md)"   # 10px
  lg: "var(--radius-lg)"   # 16px
---

## Usage Rules
Use \`primary\` for filled CTAs and active states only.
All spacing on the 4px grid — no arbitrary px values.
Body text uses \`body\` font family, never display.

## Don'ts (enforce every session)
- Never hardcode hex values
- Never use Tailwind color classes (bg-orange-400)
- Never place two primary buttons adjacent to each other
- Never use more than two font weights in one section
- Never use fixed height on a component with text content`,
              },
            ],
          },
          {
            label: "Storybook Check",
            body: "Before opening Claude Code, start Storybook so it's ready for visual validation as soon as Claude generates the first output.",
            codeBlocks: [
              {
                lang: "bash",
                label: "start Storybook",
                content: `# In your project directory
npm run storybook

# Storybook opens at localhost:6006
# Keep this tab open in Chrome throughout the session`,
              },
            ],
            note: "If Storybook is not running when you ask Claude to validate, it will try to read files instead of inspecting the rendered output. Run Storybook first.",
          },
        ],
      },
      {
        id: "opening-verification",
        title: "The Opening Verification Sequence — 3 Messages Before Any Code",
        body: "The first three messages of every session confirm that Claude has loaded the right context. They take 60 seconds and prevent hours of corrections. Do not skip them. Never start writing code on message one.",
        tabs: [
          {
            label: "Message 1 — Context Load",
            body: "The first message tells Claude to read your context files and confirms your stack. Send this before anything else. Do not ask Claude to write code yet.",
            codeBlocks: [
              {
                lang: "text",
                label: "message 1 — context load",
                content: `You are a Senior Design Engineer working on a Next.js project.

Read the following files before we start:
1. CLAUDE.md — your standing rules for this project
2. design.md — the design token system and usage rules

Confirm you have read both files by listing:
- The tech stack we are using
- The 3 most important token rules from design.md
- The non-negotiable don'ts from CLAUDE.md

Do not write any code yet.`,
              },
            ],
            note: "Claude confirms by listing what it read. If it lists wrong information, it did not read the file — check that CLAUDE.md and design.md exist in the project root.",
          },
          {
            label: "Message 2 — Stack Confirm",
            body: "After Claude confirms context, verify it understands the component architecture. This catches mismatches before they appear in generated code.",
            codeBlocks: [
              {
                lang: "text",
                label: "message 2 — stack confirm",
                content: `We will be building a [component name] component today.

Before we build, confirm you understand:
1. Where atom components live: src/components/ui/
2. Where molecule components live: src/components/molecules/
3. Where organism components live: src/components/organisms/
4. The import convention: @/components/ui/button (not relative paths)
5. That you will NOT recreate any component that already exists

Which of these existing components will be relevant to what we're building?
- Button (src/components/ui/button)
- Input (src/components/ui/input)
- Badge (src/components/ui/badge)
- Icon (src/components/ui/icon)
- Label (src/components/ui/label)

List only the ones you'll actually import.`,
              },
            ],
          },
          {
            label: "Message 3 — Figma Read",
            body: "The third message asks Claude to read the Figma frame and report back what it found. This confirms the MCP is connected and Claude has the exact token values from Figma.",
            codeBlocks: [
              {
                lang: "text",
                label: "message 3 — Figma frame read",
                content: `Read this Figma frame using the Figma MCP:
[paste your Figma frame link here]

Report back:
1. The fill color of the primary element — and which CSS token it maps to
2. The spacing values (padding, gap) — and which --spacing-* tokens match
3. The corner radius — and which --radius-* token matches
4. The typography: font family, size, weight, line-height
5. Any component variants visible in the frame

Do not write any code yet. I want to confirm you have the right values
before we build.`,
              },
            ],
            note: "If Claude cannot read the frame, reload VS Code (Cmd+Shift+P → Reload Window). The MCP starts on first use and sometimes needs a restart.",
          },
        ],
      },
      {
        id: "four-part-prompt",
        title: "The Four-Part Prompt — Role + Context + Spec + Constraints",
        body: "After the verification sequence, message four is the build prompt. It has four parts. Every part serves a specific purpose. Missing any one of them forces Claude to guess — and every guess costs you a correction cycle. The four-part prompt is the single highest-leverage skill in this entire course.",
        tabs: [
          {
            label: "Full Template",
            body: "This is the complete four-part prompt. Every section has a job. Copy this template, fill it in for your component, and send it as message four.",
            codeBlocks: [
              {
                lang: "text",
                label: "four-part prompt — complete template",
                content: `── PART 1: ROLE ──────────────────────────────────────────────
You are a Senior Design Engineer.
You build accessible, token-referenced React components in TypeScript.
You never recreate existing components — you import them.
You never use hardcoded colors, spacing, or font values.

── PART 2: CONTEXT ───────────────────────────────────────────
Component: [Name]
File location: src/components/[ui|molecules|organisms]/[component-name].tsx
Stack: Next.js App Router, TypeScript, Tailwind CSS v4
Design system: read design.md (already loaded)
Figma frame: [paste link — MCP already read this in message 3]

Import these existing components (do not recreate):
  Button  → @/components/ui/button
  Input   → @/components/ui/input
  [add any others relevant to this component]

── PART 3: SPEC ──────────────────────────────────────────────
[Paste your full Component Spec from SDD-DE here.
Include the props interface, all variants, all states,
accessibility requirements, and any behavioral notes.]

── PART 4: CONSTRAINTS ───────────────────────────────────────
Hard rules — every line of output must follow these:
✗ No hardcoded hex values — use CSS custom properties only
✗ No inline styles (style={{...}})
✗ No fixed height on elements with text content
✗ No Tailwind color classes — use token classes only
✗ No recreation of any component listed in the import list
✗ No <div onClick> — use <button> for interactive elements
✓ Semantic HTML throughout
✓ All interactive states: hover, focus, disabled, active
✓ aria-label on icon-only buttons
✓ Export as named TypeScript component with typed props interface`,
              },
            ],
          },
          {
            label: "Part 1 — Role",
            body: "The Role section tells Claude who it is in this session. This is not a formality — it shapes what Claude optimizes for. A Senior Design Engineer is more precise, more token-aware, and more accessibility-conscious than an unspecified assistant.",
            codeBlocks: [
              {
                lang: "text",
                label: "role section examples",
                content: `── For component building:
You are a Senior Design Engineer.
You build accessible, token-referenced React components.
You never hardcode visual values — every color, spacing, and radius
references a CSS custom property.

── For page building:
You are a Senior Design Engineer assembling a production Next.js page.
You compose from existing components — you do not recreate them.
You read design.md and follow every rule before writing code.

── For debugging:
You are a Senior Design Engineer doing a code review.
You check for spec compliance, token usage, and accessibility issues.
You cite the specific spec line or design.md rule that is violated.`,
              },
            ],
            note: "Change the Role when the task changes. A debugging role produces different output than a building role — it becomes more critical and cites violations instead of writing new code.",
          },
          {
            label: "Part 2 — Context",
            body: "The Context section tells Claude what it's building, where the file goes, what already exists, and what to import. This is the section most designers skip — and the one that causes most hallucinations.",
            codeBlocks: [
              {
                lang: "text",
                label: "context section — Button example",
                content: `── PART 2: CONTEXT ───────────────────────────────────────────
Component: Button
File location: src/components/ui/button.tsx
Stack: Next.js App Router, TypeScript, Tailwind CSS v4
Design system: tokens in design.md (already read)
Figma frame: https://figma.com/design/[key]/[file]?node-id=[id]

This is an ATOM — the smallest level of atomic design.
It has no dependencies on other custom components.
It will be imported by molecules and organisms above it.

After building: create a Storybook story at:
  src/stories/ui/Button.stories.tsx
Include stories for: Default, Secondary, Ghost, Destructive, Disabled, Loading, IconOnly`,
              },
            ],
          },
          {
            label: "Part 3 — Spec",
            body: "The Spec section is your SDD-DE Component Spec pasted verbatim. Do not summarize or paraphrase — paste the full document. Claude uses the exact wording to generate code. Summarizing introduces ambiguity.",
            codeBlocks: [
              {
                lang: "text",
                label: "spec section — how to paste it",
                content: `── PART 3: SPEC ──────────────────────────────────────────────
[Paste your full Component Spec here. Example structure:]

# Component Spec: Button

## Overview
A primary interaction element used for all form submissions,
CTAs, and destructive actions. Variants and states defined below.

## Props
interface ButtonProps {
  variant: 'default' | 'secondary' | 'ghost' | 'destructive'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
  onClick?: () => void
}

## Variants
- default: var(--color-primary) fill, var(--color-primary-foreground) text
- secondary: transparent fill, var(--color-primary) border and text
- ghost: no fill, no border, var(--color-foreground) text
- destructive: var(--color-destructive) fill, white text

## States
All variants must implement: default, hover, focus-visible, active, disabled, loading

## Accessibility
- Element: <button> (never <div>)
- Icon-only: aria-label required
- Loading: aria-busy="true", aria-label="Loading"
- Disabled: disabled attribute (not aria-disabled alone)`,
              },
            ],
          },
          {
            label: "Part 4 — Constraints",
            body: "Constraints are what NOT to do. This is the most underrated section. Without explicit constraints, Claude defaults to its most common training patterns — which are rarely your design system. Every 'don't' you list here saves one correction cycle.",
            codeBlocks: [
              {
                lang: "text",
                label: "constraints — full list for a component session",
                content: `── PART 4: CONSTRAINTS ───────────────────────────────────────
Design system constraints (from design.md):
  ✗ No hardcoded hex values (#FFBA4C → use var(--color-primary))
  ✗ No Tailwind color classes (bg-orange-400 → bg-[var(--color-primary)])
  ✗ No arbitrary pixel values in Tailwind (p-[23px] → use nearest token)
  ✗ No fixed height on components with text content (use py-* instead)

HTML and accessibility constraints:
  ✗ No <div onClick> — use <button>
  ✗ No <a> without href — use <button> if it has no destination
  ✗ No missing aria-label on icon-only interactive elements
  ✗ No inline styles (style={{color: 'red'}})

Component architecture constraints:
  ✗ Do not recreate Button, Input, Badge, or Icon — import them
  ✗ Do not install new npm packages without asking first
  ✗ Do not use ShadCN components not already in this project

Output constraints:
  ✓ Export as named TypeScript component
  ✓ Include a typed props interface
  ✓ Include JSDoc on each prop
  ✓ One component per file`,
              },
            ],
          },
        ],
      },
      {
        id: "first-component-walkthrough",
        title: "Worked Example — Building a Button from Start to First Output",
        body: "This is a complete session walkthrough for building a Button component: the five messages from context load to validated first output. Read this before your first real session — it shows what a well-run session looks and feels like, what Claude's confirmations should say, and what the first output typically gets wrong.",
        tabs: [
          {
            label: "Message 1 — Context",
            body: "Open Claude Code in your project directory. Send this as the very first message.",
            codeBlocks: [
              {
                lang: "text",
                label: "message 1 — context load for Button session",
                content: `You are a Senior Design Engineer working on a Next.js project.

Read CLAUDE.md and design.md now.

Confirm by listing:
- Our tech stack (framework, CSS approach, TypeScript)
- The token rules I must follow for colors, spacing, and radius
- The most important don't rules from design.md

Do not write any code yet.`,
              },
            ],
          },
          {
            label: "Message 2 — Figma",
            body: "After Claude confirms context, send the Figma frame for the Button component.",
            codeBlocks: [
              {
                lang: "text",
                label: "message 2 — Figma read for Button",
                content: `Read this Figma frame for the Button component:
[your Figma frame link]

Tell me:
1. The background fill for the primary Button variant and its CSS token
2. The text color and its CSS token
3. Horizontal and vertical padding values and their --spacing-* tokens
4. Corner radius and its --radius-* token
5. Font size, weight, and line-height for the button label
6. All visible variants in the frame (primary, secondary, ghost, etc.)
7. Hover and disabled states if visible

Do not write code yet.`,
              },
            ],
          },
          {
            label: "Message 3 — Build",
            body: "After Claude reports the Figma values, send the four-part build prompt.",
            codeBlocks: [
              {
                lang: "text",
                label: "message 3 — four-part build prompt (Button)",
                content: `── PART 1: ROLE ──────────────────────────────────────────────
You are a Senior Design Engineer.
You build accessible, token-referenced React atoms.
You never hardcode visual values.

── PART 2: CONTEXT ───────────────────────────────────────────
Component: Button
File: src/components/ui/button.tsx
This is an atom — no imports from other custom components.
After building: create src/stories/ui/Button.stories.tsx

── PART 3: SPEC ──────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
}

Variants:
  default: var(--color-primary) fill, var(--color-primary-foreground) text
  secondary: transparent, var(--color-primary) border + text
  ghost: no fill, no border, var(--color-foreground) text on hover bg
  destructive: var(--color-destructive) fill, white text

States (all variants): default · hover · focus-visible · active · disabled · loading
Loading: show spinner icon + aria-busy="true", hide label or keep it visible

Sizes:
  sm: py-1.5 px-3, text-sm
  md: py-2.5 px-4, text-sm (default)
  lg: py-3 px-6, text-base

── PART 4: CONSTRAINTS ───────────────────────────────────────
✗ No hardcoded hex values
✗ No Tailwind color classes (bg-orange-*)
✗ No fixed height
✗ No inline styles
✗ No <div> with onClick
✓ Semantic <button> element
✓ Typed props interface with JSDoc
✓ aria-busy on loading state
✓ aria-label required if icon-only (document this in JSDoc)
✓ Uses cva() from class-variance-authority for variant/size classes`,
              },
            ],
          },
          {
            label: "What to Expect",
            body: "Claude's first output for a well-prompted component is usually 80–90% correct. These are the issues that appear most often in a first Button output — know them before you read the code.",
            bullets: [
              "Token reference format: Claude often writes bg-primary instead of bg-[var(--color-primary)] — check every color class",
              "Focus style: Claude often uses focus:ring-2 focus:ring-blue-500 — should be focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
              "Loading spinner: Claude often imports a spinner from lucide-react — correct, but verify the size and color use tokens",
              "Icon-only JSDoc: Claude sometimes omits the aria-label documentation in JSDoc — check the icon prop comment",
              "Storybook stories: Claude often generates all stories in one file but forgets to add a Default export with meta — check the top of the stories file",
              "What Claude usually gets right first time: the props interface, the cva() structure, the semantic <button> element, and the disabled state",
            ],
          },
          {
            label: "Message 4 — Validate",
            body: "After Claude writes the component, send a validation prompt to check it in Storybook before accepting anything.",
            codeBlocks: [
              {
                lang: "text",
                label: "message 4 — Storybook validation",
                content: `Open the browser and navigate to localhost:6006.
Find the Button stories.

For each variant (Default, Secondary, Ghost, Destructive):
  1. Check the fill color in DevTools computed styles — does it match var(--color-primary)?
  2. Check the hover state — does the background change correctly?
  3. Check the focus-visible state by pressing Tab — is the focus ring visible?
  4. Check the disabled state — is the button truly disabled (not just styled disabled)?
  5. Check the loading state — does the spinner appear and is the button still disabled?

Report each issue as:
  [Variant] [State] — [what is wrong] — [what it should be per spec]

Do not fix anything yet. List all issues first.`,
              },
            ],
          },
        ],
      },
      {
        id: "reading-ai-output",
        title: "Reading AI Output — The 5 Red Flags",
        body: "Before you run the code or accept any diff, read the output. You do not need to understand every line — you need to spot the five patterns that signal the component will fail spec review. Each flag has a one-second visual check that catches it.",
        tabs: [
          {
            label: "Red Flag 1 — Hardcoded Values",
            body: "The most common error. Claude defaults to hex values or Tailwind color classes when not constrained. Scan every color, spacing, and radius class before accepting.",
            codeBlocks: [
              {
                lang: "tsx",
                label: "hardcoded values — what to look for",
                content: `// ✗ Red flag: hardcoded hex
className="bg-[#FFBA4C] text-[#0E0E10]"

// ✗ Red flag: Tailwind color class
className="bg-orange-400 text-stone-900"

// ✗ Red flag: arbitrary pixel value
className="p-[14px] rounded-[8px]"

// ✓ Correct: CSS custom property reference
className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"

// ✓ Correct: token-named class (if Tailwind theme is wired to tokens)
className="bg-primary text-primary-foreground"

// How to spot in 1 second:
// Cmd+F in the generated file → search for "#"
// Any result is a hardcoded color that must be replaced`,
              },
            ],
          },
          {
            label: "Red Flag 2 — Wrong Element",
            body: "Claude occasionally uses <div> with onClick handlers instead of semantic HTML. This breaks keyboard access and screen readers.",
            codeBlocks: [
              {
                lang: "tsx",
                label: "wrong element — what to look for",
                content: `// ✗ Red flag: div acting as a button
<div
  className="cursor-pointer rounded-lg px-4 py-2"
  onClick={onClick}
>
  Click me
</div>

// ✗ Red flag: span acting as a link
<span onClick={() => router.push('/home')} className="text-blue-500">
  Go home
</span>

// ✓ Correct
<button
  type="button"
  className="rounded-lg px-4 py-2"
  onClick={onClick}
>
  Click me
</button>

// How to spot in 1 second:
// Cmd+F → search for "onClick"
// Check the element type on every line that has onClick`,
              },
            ],
          },
          {
            label: "Red Flag 3 — Missing A11y",
            body: "Accessibility attributes are the first thing Claude skips when the prompt doesn't explicitly demand them. Check these three in every output.",
            codeBlocks: [
              {
                lang: "tsx",
                label: "missing a11y — what to look for",
                content: `// ✗ Red flag: icon-only button with no aria-label
<button onClick={onClose}>
  <X className="h-4 w-4" />
</button>

// ✗ Red flag: loading state with no announcement
<button disabled>
  <Spinner />
  Save
</button>

// ✗ Red flag: image with no alt text
<img src={user.avatar} className="rounded-full" />

// ✓ Correct: icon-only button
<button onClick={onClose} aria-label="Close dialog">
  <X className="h-4 w-4" aria-hidden="true" />
</button>

// ✓ Correct: loading state
<button disabled aria-busy="true" aria-label="Saving...">
  <Spinner aria-hidden="true" />
  Saving...
</button>

// How to spot in 1 second:
// Cmd+F → "aria" → check count vs interactive elements
// Every button, link, and input must have at least one aria attribute`,
              },
            ],
          },
          {
            label: "Red Flag 4 — Recreation",
            body: "Claude recreates a component instead of importing the existing one. This creates a visual duplicate with subtle differences — token values drift, prop APIs diverge, and visual parity breaks over time.",
            codeBlocks: [
              {
                lang: "tsx",
                label: "recreation — what to look for",
                content: `// ✗ Red flag: recreating a Button atom inline
function SearchBar() {
  return (
    <div className="flex">
      <input className="border rounded-l px-3 py-2" />
      {/* This is a recreated Button — it will drift from the real one */}
      <button className="bg-orange-400 text-white px-4 py-2 rounded-r">
        Search
      </button>
    </div>
  )
}

// ✓ Correct: importing the real Button atom
import { Button } from '@/components/ui/button'

function SearchBar() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." />
      <Button>Search</Button>
    </div>
  )
}

// How to spot in 1 second:
// Cmd+F → "className=\"bg-" inside a molecule or organism file
// Any bg- color class inside a non-atom file is almost always a recreation`,
              },
            ],
          },
          {
            label: "Red Flag 5 — Fixed Height",
            body: "Fixed heights on text-bearing components break when text changes (locale, user content, accessibility text scaling). Always padding, never height.",
            codeBlocks: [
              {
                lang: "tsx",
                label: "fixed height — what to look for",
                content: `// ✗ Red flag: fixed height on a button
<button className="h-10 w-32 bg-primary">
  Submit
</button>

// ✗ Red flag: fixed height on a card
<div className="h-48 overflow-hidden rounded-xl">
  {/* content that may be longer */}
</div>

// ✓ Correct: padding-based height
<button className="py-2.5 px-4 bg-[var(--color-primary)]">
  Submit
</button>

// ✓ Correct: min-height for cards that must maintain proportion
<div className="min-h-[192px] rounded-xl">
  {/* content can grow */}
</div>

// How to spot in 1 second:
// Cmd+F → "h-" → check each result
// If h-10, h-12, h-48 etc. appear on a container with text, flag it`,
              },
            ],
          },
        ],
      },
      {
        id: "correction-prompts",
        title: "Correction Prompts — One Issue Per Message",
        body: "A correction prompt is not a rewrite request. It identifies one specific violation, cites the rule it breaks, and asks for a targeted fix. Sending a list of 8 issues in one message produces worse results than sending 8 focused messages — Claude prioritizes fixes inconsistently when overwhelmed with a list.",
        tabs: [
          {
            label: "The Structure",
            body: "Every correction prompt has three lines: what is wrong, what rule it breaks, and what the fix should be. Nothing else.",
            codeBlocks: [
              {
                lang: "text",
                label: "correction prompt structure",
                content: `Issue: [describe the specific problem in one sentence]
Rule: [cite the design.md rule, CLAUDE.md rule, or spec line it violates]
Fix: [describe exactly what the corrected output should look like]

Example:
Issue: The primary Button uses className="bg-orange-400" — a hardcoded Tailwind color class.
Rule: design.md rule — "Never use Tailwind color classes. Use CSS custom properties only."
Fix: Replace bg-orange-400 with bg-[var(--color-primary)]. Check all other color classes in the file for the same issue.`,
              },
            ],
          },
          {
            label: "Bad vs Good Corrections",
            body: "Bad correction prompts ask Claude to fix everything at once or describe the problem without specifying the rule. Good corrections are precise, cite the source, and ask for one thing.",
            codeBlocks: [
              {
                lang: "text",
                label: "bad correction prompts",
                content: `// ✗ Too vague — Claude doesn't know what's wrong
"This doesn't look right, can you redo it?"

// ✗ Too many issues at once — Claude misses some
"Fix the colors, add aria-labels, change the div to a button,
remove the fixed height, and update the loading state."

// ✗ No rule cited — Claude invents a different fix
"The button color is wrong."`,
              },
              {
                lang: "text",
                label: "good correction prompts",
                content: `// ✓ One issue, rule cited, fix specified
Issue: The close button has no aria-label.
Rule: Spec — "Icon-only buttons require aria-label."
Fix: Add aria-label="Close" to the <button> element. Add aria-hidden="true" to the X icon.

// ✓ One issue, clear correction
Issue: The Input recreates a border and focus ring instead of importing the Input atom.
Rule: CLAUDE.md — "Do not recreate any component that already exists."
Fix: Remove the custom input element. Import Input from '@/components/ui/input' and use it directly.

// ✓ One issue, token fix
Issue: border-radius is set with rounded-xl (a Tailwind class, not our token).
Rule: design.md — "Use --radius-* tokens for border radius."
Fix: Replace rounded-xl with rounded-[var(--radius-lg)] throughout the file.`,
              },
            ],
          },
          {
            label: "When to Restart",
            body: "Most components converge in 3–5 correction cycles. When they don't, the problem is almost always a gap in the spec or CLAUDE.md — not the model.",
            bullets: [
              "3–5 corrections: normal. The component is converging.",
              "6–8 corrections on the same issue: stop. The spec or CLAUDE.md is missing a rule. Add it, then start a new session.",
              "Claude produces a reasonable result you didn't specify: spec gap — update the spec first, then re-prompt.",
              "Claude contradicts an explicit spec line: AI mistake — cite the exact line in your correction prompt.",
              "Claude repeatedly ignores a constraint: add it as a permanent CLAUDE.md rule, not a per-session instruction.",
              "Context window getting long (>20 messages): start a new session. Use the handoff prompt below.",
            ],
          },
        ],
      },
      {
        id: "spec-gaps-vs-mistakes",
        title: "Spec Gaps vs. AI Mistakes — Who Needs to Fix It",
        body: "Every wrong output is either your fault or Claude's. Telling the difference determines whether you edit the prompt or edit the spec. Getting this wrong is expensive — you can spend hours correcting AI when the real fix is a one-line addition to design.md.",
        tabs: [
          {
            label: "The Diagnostic",
            body: "Run this two-question diagnostic on every wrong output before writing a correction prompt.",
            bullets: [
              "Question 1: Is the wrong behavior described anywhere in my spec, design.md, or CLAUDE.md? If NO → it's a spec gap. Update your spec or CLAUDE.md. Then re-prompt.",
              "Question 2: Is the wrong behavior explicitly prohibited in my spec or CLAUDE.md, but Claude did it anyway? If YES → it's an AI mistake. Write a correction prompt that cites the rule.",
              "Third case: Claude produced something reasonable but different from what you expected. This means your intent was not specific enough in the spec. The fix is the spec, not a correction prompt.",
              "Rule: if the same mistake happens three times in a row, it belongs in CLAUDE.md permanently — not in the prompt.",
            ],
          },
          {
            label: "Spec Gap Examples",
            body: "These are real spec gaps — outputs where Claude did something reasonable, but it wasn't what you wanted because you didn't specify it.",
            codeBlocks: [
              {
                lang: "text",
                label: "spec gap examples",
                content: `Gap: You wanted the ghost variant to have a hover background,
but the spec said only "ghost: no fill, no border."
Claude produced a ghost button with no hover effect.
→ Fix: Update spec to include "ghost hover: var(--color-muted) background"

Gap: You wanted the loading spinner to be 16px,
but the spec didn't specify a loading icon size.
Claude used a 20px spinner.
→ Fix: Add "loading icon: 16px" to the spec

Gap: You wanted the button label to stay visible during loading
(label + spinner side by side), but the spec didn't describe this.
Claude hid the label and showed only the spinner.
→ Fix: Add "loading state: spinner left of label, both visible, button disabled"`,
              },
            ],
          },
          {
            label: "AI Mistake Examples",
            body: "These are real AI mistakes — outputs where the spec was explicit, but Claude violated it anyway.",
            codeBlocks: [
              {
                lang: "text",
                label: "AI mistake examples",
                content: `Mistake: Spec says "all colors from CSS custom properties."
Claude used className="bg-amber-400".
→ Fix: Correction prompt citing design.md. Not a spec update.

Mistake: Spec says "use <button> for all interactive elements."
Claude used <div role="button" tabIndex={0} onClick={...}>
→ Fix: Correction prompt. Cite the spec line. Ask for replacement with <button>.

Mistake: Spec says "import Button from '@/components/ui/button'."
Claude wrote a new button element inside the molecule.
→ Fix: Correction prompt. "You recreated the Button atom. The spec says to import it."

Mistake: CLAUDE.md says "no fixed height on text elements."
Claude used className="h-12" on a card with text content.
→ Fix: Correction prompt. Cite CLAUDE.md.`,
              },
            ],
          },
        ],
      },
      {
        id: "session-hygiene",
        title: "Session Hygiene — Context, Limits, and Handoff",
        body: "Claude Code sessions degrade as they grow. Context windows fill up, earlier instructions get pushed out, and Claude starts making errors it wasn't making in message 5. Good session hygiene means knowing when to start fresh — and how to hand off cleanly so you don't lose the work done so far.",
        tabs: [
          {
            label: "Session Length",
            body: "One session should cover one component or one page section. Longer sessions accumulate context that confuses Claude and slows responses.",
            bullets: [
              "One atom per session: build, validate, and close. Do not build a second atom in the same session.",
              "One section per session for page work: build Navigation, close the session, open a new one for Hero.",
              "If Claude starts making errors it didn't make earlier in the session — this is a context overflow signal. Start fresh.",
              "20 messages is a rough limit. By message 25, most sessions are producing noisier output.",
              "Do not ask Claude to summarize a session and continue — start a new session with a fresh context-load.",
            ],
          },
          {
            label: "Handoff Prompt",
            body: "When a session ends with work partially complete, use a handoff prompt to start the next session with full context.",
            codeBlocks: [
              {
                lang: "text",
                label: "handoff prompt — session continuation",
                content: `Continuing from a previous session. Context:

1. What we built: [component name] at [file path]
   Status: [complete / partially complete — describe what's done]

2. Outstanding issues:
   - [Issue 1: describe specifically]
   - [Issue 2: describe specifically]

3. Constraints still in effect (from design.md and CLAUDE.md):
   - No hardcoded hex values
   - No Tailwind color classes
   - Import Button from '@/components/ui/button' — do not recreate it
   [add any session-specific constraints that were established]

4. Next task: [describe the next thing to build or fix]

Read design.md and CLAUDE.md before continuing.`,
              },
            ],
          },
          {
            label: "CLAUDE.md Updates",
            body: "Every session produces at least one rule that should be permanent. End every session by asking: 'What should I add to CLAUDE.md so I never have to correct this again?'",
            codeBlocks: [
              {
                lang: "text",
                label: "end-of-session CLAUDE.md audit",
                content: `At the end of every session, send this prompt:

"Review what we corrected in this session.
List any issues that were corrected more than once.
For each one, suggest the CLAUDE.md rule that would prevent it
in every future session.

Format:
  Issue: [what went wrong]
  Suggested rule: [the CLAUDE.md line to add]"

Then add the suggested rules to CLAUDE.md before your next session.
This is how your CLAUDE.md gets smarter every week.`,
              },
            ],
          },
        ],
      },
    ],
    exercise: {
      title: "Run Your First Complete Session — Button to Storybook",
      description: "Run a full Claude Code session from context-load to validated Storybook story. The component is a Button atom. Use the four-part prompt, read the output for all five red flags, write correction prompts for any issues, validate in Storybook with the Claude in Chrome extension, and end the session with a CLAUDE.md audit.",
      steps: [
        "Verify your project has CLAUDE.md (with the design.md instruction) and design.md in the project root",
        "Open Claude Code in your project directory. Open Storybook at localhost:6006 in Chrome.",
        "Send message 1 — the context-load prompt. Confirm Claude lists your stack and token rules correctly.",
        "Send message 2 — the stack confirm. Confirm Claude lists the correct component import paths.",
        "Copy your Button Figma frame link. Send message 3 — the Figma read prompt. Confirm Claude reports correct token values.",
        "Write the four-part build prompt for Button (Role + Context + Spec + Constraints). Send it as message 4.",
        "Read the output. Scan for all 5 red flags (hardcoded values, wrong element, missing a11y, recreation, fixed height).",
        "For each red flag found: write a correction prompt (Issue + Rule + Fix). Send one at a time.",
        "After corrections: send the Storybook validation prompt. Ask Claude to check all variants and states in the browser.",
        "Fix any Storybook-discovered issues with targeted correction prompts.",
        "Send the end-of-session CLAUDE.md audit prompt. Add suggested rules to CLAUDE.md.",
      ],
    },
    deliverable: {
      title: "Button Component + Session Log",
      description: "A working, validated Button component with a Storybook story. All variants (default, secondary, ghost, destructive) and all states (hover, focus, disabled, loading) documented and passing Storybook visual review. Also submit your session log: the correction prompts you used, the red flags you caught, and the CLAUDE.md rules you added. Post to #module-12 in the workshop Slack.",
    },
    quiz: [
      {
        question: "What should you load before your first generation?",
        options: [
          "Context — design.md and CLAUDE.md",
          "Nothing at all",
          "A background game",
        ],
        correct: 0,
      },
      {
        question: "A good prompt is…",
        options: [
          "As vague as possible",
          "Precise and constraint-rich",
          "Completely empty",
        ],
        correct: 1,
      },
      {
        question: "After the AI generates a component, you should…",
        options: [
          "Ship it without looking",
          "Delete it immediately",
          "Review it and correct with evidence",
        ],
        correct: 2,
      },
    ],
  },

  "module-13": {
    objectives: [
      "Load the three-context system — design.md, Figma MCP, and Storybook component list — into Claude before writing any page prompt",
      "Write the context-load opening prompt that primes Claude with your entire design system in one shot",
      "Decompose any page into an ordered section build plan before touching a keyboard shortcut",
      "Write section prompts that import existing Storybook components by exact path — no recreation, only composition",
      "Apply page-type prompt templates for marketing, dashboard, auth, and settings surfaces",
      "Specify responsive behavior explicitly at every breakpoint inside the prompt — not after the fact",
      "Wire cross-section interactions (scroll state, modal triggers, shared state) in a final composition prompt",
    ],
    concepts: [
      {
        id: "three-context-system",
        title: "The Three-Context System — What Claude Needs Before Any Page Prompt",
        body: "A page prompt without context produces generic output. A page prompt backed by all three sources produces output that matches your exact design system, uses your real components, and follows your documented rules. The three sources are: design.md (your tokens and anti-patterns), a Figma frame link (the layout to build), and your Storybook component inventory (what already exists and where to import it from). Claude without this context invents. With all three, it assembles.",
        bullets: [
          "design.md — your YAML token values (colors, spacing, radius, type scale) and your usage rules (the 'don't' list is the most important part)",
          "Figma frame link — the MCP reads exact fill, spacing, radius, and variant data directly from the frame, so Claude doesn't guess from a description",
          "Storybook component list — a list of every built component with its import path, so Claude imports instead of reinventing",
          "Without design.md: Claude uses arbitrary hex values and spacing it learned from the internet",
          "Without the Figma link: Claude approximates the layout from your text description — always imprecise",
          "Without Storybook paths: Claude recreates components that already exist, with subtle differences that break visual parity",
          "Rule: all three must be in the opening prompt of every page session. Not added later — first.",
        ],
        table: [
          { left: "design.md", right: "Tokens, usage rules, anti-patterns. Claude reads this and follows your documented don'ts" },
          { left: "Figma MCP", right: "Exact frame data: fill, spacing, radius, typography, variants, component structure" },
          { left: "Storybook paths", right: "Component import paths. Claude imports Button from '@/components/ui/button', not a new one" },
        ],
        tableLabels: { left: "Source", right: "What Claude gets from it" },
      },
      {
        id: "context-load-prompt",
        title: "The Context-Load Opening Prompt",
        body: "Every page session starts with a single structured prompt that loads all three context sources at once. This is the highest-leverage message you will send in the entire session — it defines what Claude knows before it writes a line. Get this right and every subsequent prompt is faster, more precise, and needs fewer corrections.",
        tabs: [
          {
            label: "Full Template",
            body: "This is the complete context-load prompt. Copy it, fill in your Figma link and Storybook paths, and send it as the very first message of every page session. Do not write any code yet — this message only loads context.",
            codeBlocks: [
              {
                lang: "text",
                label: "context-load opening prompt",
                content: `You are a Senior Design Engineer building a production Next.js page.

── CONTEXT SOURCE 1: DESIGN SYSTEM ──────────────────────────────
Read design.md in the project root before writing any code.
Key rules from design.md:
- All colors from CSS custom properties (--color-*), never hardcoded hex
- All spacing on the 4px grid via CSS custom properties (--spacing-*)
- Typography: display text uses var(--font-display), body uses var(--font-body)
- Border radius: var(--radius-sm) = 6px, var(--radius-md) = 10px, var(--radius-lg) = 16px
- Do not introduce new hues — use only the tokens defined in design.md
- Do not place two primary buttons adjacent to each other

── CONTEXT SOURCE 2: FIGMA LAYOUT ───────────────────────────────
Read this Figma frame using the Figma MCP. Use the exact values
it returns for spacing, fills, radius, and typography — do not
approximate from the description below.
Figma frame: [paste your Figma frame link here]

── CONTEXT SOURCE 3: EXISTING COMPONENTS ────────────────────────
Import from these paths. Do NOT recreate any of these components.

Atoms:
  Button          → @/components/ui/button
  Input           → @/components/ui/input
  Badge           → @/components/ui/badge
  Icon            → @/components/ui/icon
  Label           → @/components/ui/label
  Avatar          → @/components/ui/avatar

Molecules:
  SearchBar       → @/components/molecules/search-bar
  FormField       → @/components/molecules/form-field
  NavItem         → @/components/molecules/nav-item
  CardHeader      → @/components/molecules/card-header

Organisms:
  Navigation      → @/components/organisms/navigation
  Hero            → @/components/organisms/hero
  FeatureGrid     → @/components/organisms/feature-grid
  Sidebar         → @/components/organisms/sidebar

── INSTRUCTION ───────────────────────────────────────────────────
Confirm you have read design.md and the Figma frame.
List the design tokens you will use and the components you will import.
Do not write any code yet. Wait for my section prompts.`,
              },
            ],
          },
          {
            label: "design.md Section",
            body: "The design.md section of the context-load prompt tells Claude which rules are non-negotiable. The 'don't' list is the most important part — it prevents the hallucinations Claude defaults to when not constrained.",
            codeBlocks: [
              {
                lang: "text",
                label: "design.md context block",
                content: `── CONTEXT SOURCE 1: DESIGN SYSTEM ──────────────────────────────
Read design.md in the project root before writing any code.

Critical token references:
  --color-primary: your brand color
  --color-background: page background
  --color-foreground: default text
  --color-muted-foreground: secondary text
  --color-border: borders and dividers
  --spacing-4: 16px  --spacing-6: 24px  --spacing-8: 32px
  --spacing-12: 48px  --spacing-16: 64px  --spacing-24: 96px

Anti-patterns from design.md (enforce all of these):
  ✗ Never hardcode hex values (#FFBA4C → use var(--color-primary))
  ✗ Never use Tailwind colors (bg-orange-400 → use bg-[var(--color-primary)])
  ✗ Never use arbitrary pixel values (p-[23px] → use nearest 4px grid token)
  ✗ Never place two primary buttons side by side
  ✗ Never use more than two font weights in one section`,
              },
            ],
            note: "Copy your actual anti-patterns from design.md verbatim. These are the rules Claude breaks most often when not reminded.",
          },
          {
            label: "Figma MCP Section",
            body: "The Figma MCP section gives Claude the exact frame to read. The MCP returns actual pixel values, variable references, and component data — not a description for Claude to interpret.",
            codeBlocks: [
              {
                lang: "text",
                label: "Figma MCP context block",
                content: `── CONTEXT SOURCE 2: FIGMA LAYOUT ───────────────────────────────
Read this Figma frame using the Figma MCP.
Frame: https://www.figma.com/design/[file-key]/[file-name]?node-id=[node-id]

Use the exact values returned by the MCP:
  - Fill colors → translate to the matching CSS custom property
  - Spacing values → translate to the nearest 4px grid token
  - Typography → match font family, size, weight, and line-height exactly
  - Corner radius → use the matching --radius-* token
  - Auto-layout gap → use the matching --spacing-* token

If the MCP returns a value with no matching token, flag it
before implementing. Do not invent a new token — ask me first.`,
              },
            ],
            note: "Always tell Claude what to do when a Figma value has no matching token. Without this instruction, it silently hardcodes the value.",
          },
          {
            label: "Storybook Section",
            body: "The Storybook section is a complete inventory of every existing component with its import path. Claude uses this list to import instead of recreate. The more complete this list, the fewer hallucinated components appear in the output.",
            codeBlocks: [
              {
                lang: "text",
                label: "Storybook component list block",
                content: `── CONTEXT SOURCE 3: EXISTING COMPONENTS ────────────────────────
Import from these paths. Do NOT recreate any of these.
If a component you need is not on this list, tell me — do not
create a substitute.

[paste your actual component list here]

Example format:
  Button      → @/components/ui/button          (variants: default, secondary, ghost, destructive)
  Input       → @/components/ui/input           (states: default, focused, error, disabled)
  Badge       → @/components/ui/badge           (variants: neutral, success, warning, error, info)
  SearchBar   → @/components/molecules/search-bar
  Navigation  → @/components/organisms/navigation (props: transparent boolean, sticky boolean)`,
              },
            ],
            note: "Include prop names and variant names from Storybook in this list. Claude uses them to generate correct prop usage.",
          },
        ],
      },
      {
        id: "page-decomposition",
        title: "Decompose Before You Prompt — The Section Build Plan",
        body: "Before writing any section prompt, spend 5 minutes making a build plan. List every section on the page, identify which Storybook organisms each uses, order them by dependency (sections that share state or overlap must be built with that relationship in mind), and identify where cross-section interactions live. This plan becomes the agenda for your Claude session.",
        tabs: [
          {
            label: "How to Decompose",
            body: "Open your Figma page frame. Work top to bottom. Every distinct visual region of the page is a section. Name it, note the organisms it uses, and note any interactions it has with other sections.",
            bullets: [
              "Step 1: Open the Figma page frame and identify every distinct visual region top to bottom",
              "Step 2: Name each region as a section (Navigation, Hero, Features, Pricing, Footer)",
              "Step 3: For each section, list the Storybook organisms it uses",
              "Step 4: Mark any section that has an interaction with another section (scroll behavior, state sharing, modal triggers)",
              "Step 5: Order the build: sections with no dependencies first, connected sections last",
              "Step 6: Write the section prompts in order — one prompt per section per Claude message",
            ],
          },
          {
            label: "Landing Page Plan",
            body: "A typical marketing landing page has 6–8 sections. This is the build plan for a standard landing page with a sticky nav, hero, features, testimonials, CTA band, and footer.",
            codeBlocks: [
              {
                lang: "text",
                label: "landing page build plan",
                content: `Page: Marketing Landing Page
Figma frame: [link]

Section Build Order:
──────────────────────────────────────────────────
1. Navigation         → organisms/navigation
   Props: transparent=true, sticky=true
   Note: transitions to solid at 80px scroll ← cross-section interaction

2. Hero               → organisms/hero
   Props: headline, subheadline, ctaLabel, ctaHref, badgeLabel
   Note: CTA opens SignUpModal ← cross-section interaction

3. Feature Grid       → organisms/feature-grid
   Props: features[] (icon, title, description)
   No interactions with other sections

4. Testimonial Row    → organisms/testimonial-list (does not exist — build it)
   Atoms used: Avatar, Badge
   No interactions

5. CTA Band           → organisms/cta-band (does not exist — build it)
   Atoms used: Button (primary)
   Note: same CTA trigger as Hero

6. Footer             → organisms/footer (does not exist — build it)
   Molecules used: NavItem

Cross-section interactions to wire last:
  - Navigation scroll: window.scrollY > 80 → remove transparent class
  - Hero CTA + CTA Band → both trigger same SignUpModal`,
              },
            ],
          },
          {
            label: "Dashboard Plan",
            body: "A dashboard page has more complex state. The filter bar, the data table, and the stat cards all share state. Build the state shape before building any component.",
            codeBlocks: [
              {
                lang: "text",
                label: "dashboard page build plan",
                content: `Page: Component Dashboard
Figma frame: [link]

Shared state (define this first):
  selectedFilter: 'all' | 'atoms' | 'molecules' | 'organisms'
  searchQuery: string
  components: Component[]
  filteredComponents: derived from selectedFilter + searchQuery

Section Build Order:
──────────────────────────────────────────────────
1. Sidebar            → organisms/sidebar (exists)
   No interaction — static nav

2. Page Header        → build inline (title + subtitle + filter bar)
   Molecules: SearchBar
   State: searchQuery, selectedFilter ← shared state

3. Stat Cards Row     → build inline (4 stat cards)
   State: reads from components[] ← shared state

4. Component Table    → organisms/data-table (build if missing)
   State: reads filteredComponents ← derived from shared state

Cross-section interactions:
  - SearchBar.onChange → updates searchQuery → re-filters table
  - Filter badge.onClick → updates selectedFilter → re-filters table
  - Stat cards auto-update when filteredComponents changes`,
              },
            ],
          },
        ],
      },
      {
        id: "section-prompts",
        title: "Section Prompts — Importing Real Components by Path",
        body: "Each section gets its own prompt. The section prompt references the context already loaded, names the Figma frame node for that specific section, and lists the exact import paths of every component used. Claude does not recreate what already exists — it imports it. The prompt difference between a session that creates duplicate components and one that doesn't is two lines: the import path and the explicit 'do not recreate' instruction.",
        tabs: [
          {
            label: "Navigation Prompt",
            body: "The Navigation prompt is usually the first section prompt. It references the Navigation organism that already exists in Storybook and tells Claude which props to set.",
            codeBlocks: [
              {
                lang: "text",
                label: "section prompt — Navigation",
                content: `Build section 1: Navigation

Import Navigation from '@/components/organisms/navigation'.
Do NOT recreate the Navigation component.

Figma node for this section: [paste node-specific link]

Props to pass:
  transparent={true}   ← starts transparent, transitions to solid on scroll
  sticky={true}        ← fixed to viewport top

Scroll behavior (to wire in section 7 after all sections exist):
  At window.scrollY > 80: add data-scrolled="true" to the nav element
  Navigation reads this attribute and applies the solid variant styling
  Transition: 200ms ease-out on background-color and border-bottom

Page file location: src/app/[page-slug]/page.tsx
Import path: ../components/organisms/navigation`,
              },
            ],
          },
          {
            label: "Hero Prompt",
            body: "The Hero prompt references the existing organism and specifies the exact Figma node. It also establishes the CTA interaction that will be wired to a modal in the composition step.",
            codeBlocks: [
              {
                lang: "text",
                label: "section prompt — Hero",
                content: `Build section 2: Hero

Import Hero from '@/components/organisms/hero'.
Do NOT recreate the Hero component.

Figma node for this section: [paste node-specific link]

Props to pass:
  headline="Build UI components with precision."
  subheadline="Read the Figma frame. Build the atom. Compose the molecule. Ship the organism."
  ctaLabel="Start Building"
  ctaHref="#"              ← href will be updated to open SignUpModal in section 7
  badgeLabel="New module"

All token values must come from design.md — no hardcoded strings.
Use var(--color-primary) for the badge fill, var(--spacing-24) for section vertical padding.`,
              },
            ],
          },
          {
            label: "New Organism Prompt",
            body: "When a section requires an organism that does not yet exist in Storybook, the section prompt builds it — always by composing existing molecules and atoms. Never recreate atoms.",
            codeBlocks: [
              {
                lang: "text",
                label: "section prompt — new organism (Feature Grid)",
                content: `Build section 3: Feature Grid

This organism does not exist yet. Build it now.
File location: src/components/organisms/feature-grid.tsx

Rules:
  - Import Icon from '@/components/ui/icon'
  - Do NOT create a new icon or badge component
  - All spacing from var(--spacing-*) tokens
  - All colors from var(--color-*) tokens

Figma node for this section: [paste node-specific link]

Props interface:
  interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
  }
  interface FeatureGridProps {
    headline: string;
    subheadline?: string;
    features: Feature[];
  }

Layout from Figma:
  - Section: var(--spacing-24) vertical padding, max-width 1200px centered
  - Headline: display text, var(--font-display), centered
  - Grid: 3 columns desktop, 2 columns tablet (768px), 1 column mobile (375px)
  - Card: var(--spacing-8) padding, var(--radius-lg) border, var(--color-border) stroke
  - Card icon: 24px, var(--color-primary)
  - Card gap: var(--spacing-6)

After building: add a Storybook story at src/stories/organisms/FeatureGrid.stories.tsx`,
              },
            ],
          },
          {
            label: "Page Assembly Prompt",
            body: "After all sections are built, the page assembly prompt imports them into the page file in the correct order. This is the prompt that creates the actual page, not individual components.",
            codeBlocks: [
              {
                lang: "text",
                label: "page assembly prompt",
                content: `Assemble the landing page at src/app/page.tsx.

Import and compose these sections in order:
  import Navigation   from '@/components/organisms/navigation'
  import Hero         from '@/components/organisms/hero'
  import FeatureGrid  from '@/components/organisms/feature-grid'
  import Testimonials from '@/components/organisms/testimonial-list'
  import CTABand      from '@/components/organisms/cta-band'
  import Footer       from '@/components/organisms/footer'

Page structure:
  <main>
    <Navigation transparent sticky />
    <Hero headline="..." subheadline="..." ctaLabel="..." badgeLabel="..." />
    <FeatureGrid headline="..." features={features} />
    <Testimonials testimonials={testimonials} />
    <CTABand headline="..." ctaLabel="..." />
    <Footer />
  </main>

Section spacing:
  No margin between sections — each organism owns its own padding.
  Do not add wrapper divs with padding between section imports.

Data: define the features[] and testimonials[] arrays as static
  data at the top of the file.`,
              },
            ],
          },
        ],
      },
      {
        id: "page-type-templates",
        title: "Page-Type Prompt Templates",
        body: "Different page types have different structures, different shared state requirements, and different interaction patterns. Four templates cover 90% of the pages you will build as a design engineer. Each template shows the context-load block, the section build order, and the critical prompting decisions for that page type.",
        tabs: [
          {
            label: "Marketing Landing",
            body: "The marketing landing page is linear, scroll-driven, and conversion-focused. The main prompting challenge is the scroll-triggered nav and the single CTA that appears in multiple sections.",
            codeBlocks: [
              {
                lang: "text",
                label: "marketing landing — key prompt decisions",
                content: `Page type: Marketing Landing Page
Primary challenge: scroll state + repeated CTA

1. CONTEXT LOAD
   Read design.md. Read Figma frame: [link]
   Existing organisms: Navigation, Hero, FeatureGrid
   New organisms to build: TestimonialList, CTABand, Footer

2. SECTION PROMPTS (in this order)
   Navigation → transparent + sticky + scroll trigger
   Hero → badge + headline + subheadline + primary CTA
   Features → FeatureGrid organism with icon cards
   Testimonials → Avatar + quote + name (new organism)
   CTA Band → second appearance of the same CTA (same href)
   Footer → NavItem links + social icons + legal

3. COMPOSITION
   Single CTA href: define as a constant at the top of page.tsx
     const CTA_HREF = '/signup'
   Navigation scroll: useEffect + window.scrollY listener
   Both CTA buttons use the same CTA_HREF constant

4. RESPONSIVE KEY DECISIONS
   Mobile: Navigation → hamburger + Sheet drawer
   Mobile: Hero headline 48px → 32px
   Mobile: FeatureGrid 3-col → 1-col
   Mobile: Testimonials carousel → stack`,
              },
            ],
          },
          {
            label: "Dashboard",
            body: "The dashboard is stateful. Multiple sections read from and write to shared state. Define the state shape before writing any section prompt.",
            codeBlocks: [
              {
                lang: "text",
                label: "dashboard — key prompt decisions",
                content: `Page type: Dashboard
Primary challenge: shared state across sections

1. CONTEXT LOAD
   Read design.md. Read Figma frame: [link]
   Existing organisms: Sidebar, DataTable
   New: PageHeader with filter bar, StatCards row

2. STATE PROMPT (send before any section prompt)
   "Define the page state in page.tsx before building sections:

   type Filter = 'all' | 'atoms' | 'molecules' | 'organisms'

   const [searchQuery, setSearchQuery] = useState('')
   const [activeFilter, setActiveFilter] = useState<Filter>('all')
   const [items, setItems] = useState<Component[]>(mockData)

   const filteredItems = useMemo(() => {
     return items
       .filter(i => activeFilter === 'all' || i.type === activeFilter)
       .filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
   }, [items, searchQuery, activeFilter])"

3. SECTION PROMPTS (pass state props down)
   Sidebar → static, no state
   PageHeader → receives setSearchQuery, setActiveFilter
   StatCards → receives filteredItems.length + counts by type
   DataTable → receives filteredItems

4. RESPONSIVE KEY DECISIONS
   Mobile: Sidebar collapses to bottom nav or hidden drawer
   Mobile: DataTable → card list (different layout, same data)
   Mobile: StatCards → 2-col grid instead of 4-col row`,
              },
            ],
          },
          {
            label: "Auth Page",
            body: "The auth page is focused and minimal — one form, one action. The main prompting challenge is accessibility (every form field properly labeled and connected) and error state (inline errors wired to validation).",
            codeBlocks: [
              {
                lang: "text",
                label: "auth page — key prompt decisions",
                content: `Page type: Auth (Login / Sign Up / Reset)
Primary challenge: accessible form + error states

1. CONTEXT LOAD
   Read design.md. Read Figma frame: [link]
   Existing components: FormField, Button, Input, Label

2. LAYOUT PROMPT
   "Centered card layout, max-width 400px, vertically centered in viewport.
   Background: var(--color-background)
   Card: var(--color-card), var(--radius-lg) border, var(--color-border) stroke
   Card padding: var(--spacing-8)"

3. FORM PROMPT
   "Build the login form using FormField from '@/components/molecules/form-field'.
   Do NOT recreate Input or Label — FormField composes them.

   Fields:
   - Email: type=email, required, label='Email address'
   - Password: type=password, required, label='Password'

   Accessibility (non-negotiable):
   - Each FormField: htmlFor matches input id
   - Each FormField: aria-describedby points to error message id
   - Submit button: type=submit, not a div with onClick
   - Form: role='form', aria-label='Sign in'"

4. ERROR STATE PROMPT
   "Wire validation to FormField's error prop.
   On submit: validate email format + password not empty.
   Inline error appears below each invalid field via FormField's error prop.
   Do not use alert() or toast for field-level errors — inline only."`,
              },
            ],
          },
          {
            label: "Settings Page",
            body: "The settings page uses Tabs to group sections. Each tab is independently scrollable. The main prompting challenge is keeping each tab's form isolated while sharing the same save/cancel pattern.",
            codeBlocks: [
              {
                lang: "text",
                label: "settings page — key prompt decisions",
                content: `Page type: Settings
Primary challenge: Tabs with isolated forms + shared save pattern

1. CONTEXT LOAD
   Read design.md. Read Figma frame: [link]
   Existing components: FormField, Button, Avatar, Badge, Toggle

2. LAYOUT PROMPT
   "Two-column layout: fixed sidebar nav (240px) + scrollable main area.
   Sidebar: list of settings categories (Profile, Account, Notifications, Billing)
   Main: Tab content for the selected category

   Use Tabs from shadcn/ui:
   import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'"

3. TAB CONTENT PROMPTS (one per tab)
   Profile tab:
   "Build the Profile tab content.
   FormField components:
   - Display name: type=text
   - Bio: textarea, max 160 chars with character counter
   - Avatar: current avatar + upload button (Button variant=ghost)
   All fields from design.md tokens. Save Button: variant=default, right-aligned."

   Notifications tab:
   "Build the Notifications tab.
   Each row: Toggle (from '@/components/ui/toggle') + label + description.
   Rows: Email notifications, Push notifications, Weekly digest, Marketing.
   Group rows by category with a section Label above each group."

4. SHARED SAVE PATTERN
   "Each tab has its own local form state.
   Save button: only enabled when form values differ from saved values.
   On save: optimistic update → show success Badge → revert on error."`,
              },
            ],
          },
        ],
      },
      {
        id: "responsive-page-prompting",
        title: "Responsive Page Prompting — Specify Every Breakpoint",
        body: "Responsive behavior is never inferred from a desktop Figma frame. Every breakpoint change must be stated explicitly in the prompt. The rule is simple: if you don't describe what changes at mobile, Claude keeps the desktop layout and either clips it or adds a horizontal scrollbar. One section of your prompt per breakpoint, with every layout change named.",
        callout: {
          tone: "success",
          title: "ITX standard breakpoints — use these everywhere",
          body: "To keep Figma, Storybook, and code consistent, use one standard set. The standard desktop breakpoint is 1280px. Design your desktop Figma frame at 1440px, but the layout activates at 1280px and content is capped at a 1200px centered container.",
          bullets: [
            "Mobile: < 768px (Tailwind base / sm)",
            "Tablet: 768px – 1279px (Tailwind md / lg)",
            "Desktop: ≥ 1280px — the standard desktop breakpoint (Tailwind xl)",
            "Figma desktop frame: 1440px canvas · content max-width: 1200px centered",
          ],
        },
        tabs: [
          {
            label: "The Three Breakpoints",
            body: "Work with three breakpoints for every page. Mobile-first in code, but specify all three in the prompt so Claude understands the full range before writing any CSS.",
            bullets: [
              "Mobile: 375px — the smallest phone. Every single column. Navigation collapsed. Images stacked.",
              "Tablet: 768px — iPad. Two-column grids. Navigation partially expanded. Some desktop patterns begin.",
              "Desktop: 1280px+ — the reference Figma frame. Full layout as designed.",
              "Write the responsive prompt section as: 'At < 768px (mobile): ... At 768px–1024px (tablet): ... At > 1280px (desktop): ...'",
              "Name what collapses, what hides, what reorders, and what resizes — separately for each section",
            ],
          },
          {
            label: "Responsive Prompt Block",
            body: "Add this responsive block to the end of every section prompt. Fill in the section-specific changes — the structure stays the same.",
            codeBlocks: [
              {
                lang: "text",
                label: "responsive prompt block template",
                content: `── RESPONSIVE BEHAVIOR ───────────────────────────────────────
Mobile (< 768px):
  - [Describe what changes in this section at mobile]
  - Example: 3-column grid → 1 column, gap changes from var(--spacing-8) to var(--spacing-4)
  - Example: Headline font-size from 48px → 32px
  - Example: Decorative background image → hidden (display: none)
  - Example: Navigation → show hamburger icon, hide inline links

Tablet (768px–1024px):
  - [Describe what changes at tablet]
  - Example: 3-column grid → 2 columns
  - Example: Navigation → show inline links, hide hamburger
  - Example: Sidebar collapses to top horizontal nav

Desktop (> 1280px):
  - Default layout — matches the Figma frame exactly
  - Max-width: 1200px centered with auto horizontal margins

Use Tailwind responsive prefixes: sm: md: lg: xl:
Map to breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px`,
              },
            ],
          },
          {
            label: "Nav Responsive",
            body: "Navigation responsive behavior requires explicit handling — mobile nav is a different component state, not just smaller text.",
            codeBlocks: [
              {
                lang: "text",
                label: "navigation responsive prompt",
                content: `── NAVIGATION RESPONSIVE BEHAVIOR ───────────────────────────
Desktop (> 1024px):
  Show: Logo + inline nav links + search bar + CTA button + avatar
  Hide: Hamburger icon

Mobile (< 1024px):
  Show: Logo + Hamburger icon only
  Hide: Inline nav links, search bar

  On hamburger click:
  - Open a Sheet (slide-in drawer) from the right
  - Sheet contains: nav links stacked vertically, 48px tap targets
  - Sheet closes on: backdrop click, Escape key, link click
  - Import Sheet from '@/components/ui/sheet'
  - Do NOT build a custom drawer — use the Sheet component

  CTA button on mobile:
  - Appears inside the Sheet at the bottom
  - Full width: w-full`,
              },
            ],
          },
        ],
      },
      {
        id: "cross-section-wiring",
        title: "Wiring Cross-Section Interactions",
        body: "After all sections are assembled into the page file, some interactions span multiple sections and must be wired explicitly in a final composition prompt. This includes: navigation scroll state, CTA buttons that trigger modals defined elsewhere, filter bars that update data tables, and any other connection between sections that were built independently. These connections are never inferred — Claude will only wire them when told to, and only after all referenced sections exist.",
        tabs: [
          {
            label: "Scroll State",
            body: "The most common cross-section interaction: sticky navigation that changes appearance based on scroll position.",
            codeBlocks: [
              {
                lang: "text",
                label: "scroll state wiring prompt",
                content: `Wire the navigation scroll state in page.tsx.

The Navigation organism accepts a scrolled prop (boolean).
When scrolled is true, it renders the solid background variant.
When scrolled is false, it renders the transparent variant.

In page.tsx:
1. Add a scrolled state: const [scrolled, setScrolled] = useState(false)

2. Add a scroll listener in useEffect:
   useEffect(() => {
     const onScroll = () => setScrolled(window.scrollY > 80)
     window.addEventListener('scroll', onScroll, { passive: true })
     return () => window.removeEventListener('scroll', onScroll)
   }, [])

3. Pass to Navigation: <Navigation scrolled={scrolled} sticky />

Transition (handle inside the Navigation organism):
  Background: transparent → var(--color-background)
  Border-bottom: none → 1px solid var(--color-border)
  Transition: 200ms ease-out on background-color and border-bottom`,
              },
            ],
          },
          {
            label: "Modal Trigger",
            body: "CTAs in multiple sections (Hero + CTA Band) both open the same modal. Wire them to one shared state so only one modal component exists.",
            codeBlocks: [
              {
                lang: "text",
                label: "modal trigger wiring prompt",
                content: `Wire the SignUpModal in page.tsx.

The same modal is triggered from two places: Hero CTA and CTABand CTA.
Do not create two modal instances.

In page.tsx:
1. Import: import SignUpModal from '@/components/organisms/sign-up-modal'
2. Add state: const [modalOpen, setModalOpen] = useState(false)
3. Pass to Hero: <Hero ... onCtaClick={() => setModalOpen(true)} />
4. Pass to CTABand: <CTABand ... onCtaClick={() => setModalOpen(true)} />
5. Render once: <SignUpModal open={modalOpen} onOpenChange={setModalOpen} />

Update Hero organism to accept onCtaClick prop:
  - Add: onCtaClick?: () => void to HeroProps interface
  - Update CTA Button: onClick={onCtaClick}
  - Do not change any other Hero behavior`,
              },
            ],
          },
          {
            label: "Shared State",
            body: "Dashboard sections share filter and search state. The state lives in the page component and flows down as props — never duplicated inside individual sections.",
            codeBlocks: [
              {
                lang: "text",
                label: "shared state wiring prompt",
                content: `Wire the dashboard shared state in page.tsx.

All filter and search state lives in page.tsx only.
Do not add useState inside PageHeader, StatCards, or DataTable.

In page.tsx:
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = useMemo(() =>
    components
      .filter(c => filter === 'all' || c.type === filter)
      .filter(c => c.name.toLowerCase().includes(query.toLowerCase())),
    [components, query, filter]
  )

Props:
  <PageHeader
    query={query}
    onQueryChange={setQuery}
    filter={filter}
    onFilterChange={setFilter}
  />
  <StatCards
    total={components.length}
    atoms={components.filter(c => c.type === 'atom').length}
    molecules={components.filter(c => c.type === 'molecule').length}
    organisms={components.filter(c => c.type === 'organism').length}
  />
  <DataTable items={filtered} />

PageHeader, StatCards, and DataTable must not import useState.
They receive everything as props.`,
              },
            ],
          },
          {
            label: "Focus & A11y",
            body: "Keyboard navigation and focus order must be verified at the page level — individual component tests do not catch cross-section tab order problems.",
            codeBlocks: [
              {
                lang: "text",
                label: "focus order check prompt",
                content: `Audit the full page keyboard navigation.

Tab through the entire page from top to bottom and verify:
1. Focus starts at the first interactive element in Navigation
2. Tab order follows visual reading order (top-left to bottom-right)
3. Skip-to-main link exists as the very first focusable element
4. Modal (when open): focus is trapped inside the modal
5. Modal (when closed): focus returns to the element that opened it
6. No interactive element is unreachable by keyboard

Add if missing:
  Skip link: <a href="#main-content" className="sr-only focus:not-sr-only ...">
    Skip to main content
  </a>
  Main landmark: <main id="main-content"> wrapping all sections below Navigation

Fix any element that uses onClick without an equivalent keyboard handler.`,
              },
            ],
          },
        ],
      },
    ],
    exercise: {
      title: "Build a Full Page Using All Three Context Sources",
      description: "Pick one page from your Figma file (landing page or dashboard). Load all three context sources in the opening prompt, write a section build plan, build each section by importing existing Storybook components, then wire cross-section interactions in a final composition prompt.",
      steps: [
        "Open your Figma file and pick one full page frame to build",
        "Write the section build plan: list every section, the Storybook organisms each uses, and any cross-section interactions",
        "Write and send the context-load opening prompt: design.md rules + Figma frame link + full Storybook component list",
        "Confirm Claude lists the tokens it will use and the components it will import before writing code",
        "Send section prompts one at a time — Navigation first, then top to bottom",
        "For any section that needs a new organism, write the new organism prompt using only existing atoms and molecules",
        "After all sections are built, send the page assembly prompt to compose them into page.tsx",
        "Send the responsive behavior prompt specifying all three breakpoints for the full page",
        "Wire cross-section interactions with a final composition prompt",
        "Test: Tab through the full page keyboard flow. Fix any focus order issues.",
        "Test: Resize from 375px to 1440px. Fix every responsive issue before moving on.",
      ],
    },
    deliverable: {
      title: "Complete Page with Full Context Session Log",
      description: "A fully built, responsive page assembled from existing Storybook components — no recreated atoms or molecules, all tokens from design.md, all layout from Figma. Include the context-load prompt you used, the section build plan, and a screen recording at three breakpoints (375px, 768px, 1280px). Post to the workshop Slack with the tag #module-13.",
    },
    quiz: [
      {
        question: "Building a full page means composing…",
        options: [
          "Atoms → molecules → organisms → layout",
          "Random pieces in any order",
          "One giant file",
        ],
        correct: 0,
      },
      {
        question: "How is responsive behavior handled?",
        options: [
          "It is inferred automatically from the desktop frame",
          "It is specified explicitly for each breakpoint in the prompt",
          "It is ignored",
        ],
        correct: 1,
      },
      {
        question: "What is the ITX standard desktop breakpoint?",
        options: ["640px", "3000px", "1280px"],
        correct: 2,
      },
    ],
  },

  "module-14": {
    objectives: [
      "Understand why Figma and code drift apart and how to prevent it",
      "Build a structured token sync process between Figma Variables and CSS custom properties",
      "Run component parity checks: Figma design vs. live implementation",
      "Use a repeatable review checklist to maintain sync after every design update",
      "Know when to update Figma to match code and when to update code to match Figma",
    ],
    concepts: [
      {
        id: "the-sync-problem",
        title: "Why Design and Code Drift Apart",
        body: "Design and code start in sync on day one. By month three, they have diverged. Colors were updated in Figma but the code still has the old hex. A component was refactored in code but the Figma version still shows the old layout. This drift is not carelessness — it is the natural result of two separate authoring environments without a sync process.",
        bullets: [
          "Color token drift: Figma Variable updated, CSS custom property not updated",
          "Component prop drift: new Figma variant added, code component has no matching prop",
          "Spacing drift: spacing scale changed in design, some components updated, others missed",
          "The longer you wait to sync, the more expensive the sync becomes",
        ],
      },
      {
        id: "token-sync-strategies",
        title: "Token Sync Strategies",
        body: "Tokens are the highest-leverage sync point — a single token change should cascade through both Figma and code simultaneously. The sync strategy you choose depends on how automated you want the process to be.",
        bullets: [
          "Manual export: export Figma Variables as JSON → commit to repo → CSS is generated from JSON",
          "Tokens Studio with GitHub sync: Figma Variables auto-commit to your repo on every save",
          "Figma REST API: write a script (AI can help) that reads Figma Variables and generates CSS",
          "CI check: a lint rule that flags hardcoded values that should be token references",
        ],
      },
      {
        id: "component-parity",
        title: "Component Parity Review",
        body: "A parity review is a systematic comparison of a Figma component and its live implementation. Not a visual impression — a property-by-property check against your spec.",
        bullets: [
          "Color: every color in the live component should reference a token; check each one",
          "Spacing: every padding, gap, and margin should match the token value in the spec",
          "Typography: font size, weight, line height, and color must match the text style in Figma",
          "States: open browser DevTools in the hover/focus/active state and check values",
          "Responsive: check at 375px, 768px, 1440px — document every discrepancy",
        ],
      },
      {
        id: "review-checklist",
        title: "The Design Sync Checklist",
        body: "Run this checklist every time a design update ships to the codebase. It takes 15 minutes if done consistently — or 15 hours if skipped for a month.",
        bullets: [
          "□ New Figma Variables added → corresponding CSS custom properties added to globals.css",
          "□ Changed token values → CSS custom property values updated and tested",
          "□ New component variants in Figma → corresponding props and styles added to code",
          "□ Removed components in Figma → code component deprecated or removed",
          "□ Spacing scale changes → affected components checked and updated",
          "□ Typography changes → all text style usages checked and updated",
        ],
      },
      {
        id: "figma-vs-code-authority",
        title: "When Figma Wins, When Code Wins",
        body: "When Figma and code disagree, you need a rule for which one is the source of truth. The rule is not always 'Figma' and it is not always 'code.'",
        bullets: [
          "Design intent (color, spacing, typography): Figma wins. Update code to match Figma.",
          "Technical constraint (animation performance, accessibility): code wins. Update Figma to document the technical decision.",
          "Discovery from user testing: update Figma first, then use SDD to drive the code change",
          "Developer suggestion during PR review: evaluate against the spec, then update whichever needs changing",
        ],
      },
    ],
    exercise: {
      title: "Run a Full Design Sync on a Real Component",
      description: "Pick one component that has been in production for at least a week. Run the full parity review process against the current Figma design.",
      steps: [
        "Open the component in Figma Dev Mode alongside the live implementation in a browser",
        "Compare every color value: Figma Variable vs. CSS custom property in computed styles",
        "Check every spacing value: Figma padding/gap vs. computed padding/gap in browser DevTools",
        "Document every discrepancy, decide whether Figma or code is authoritative, and make the fix",
      ],
    },
    deliverable: {
      title: "Design Sync Report",
      description: "A documented parity review for one component: every property checked, every discrepancy found, and the resolution for each (updated Figma, updated code, or documented as intentional deviation). This becomes your template for ongoing sync reviews.",
    },
    quiz: [
      {
        question: "What does “token parity” mean?",
        options: [
          "Figma variables and CSS variables stay identical",
          "Two completely separate systems",
          "Using no tokens at all",
        ],
        correct: 0,
      },
      {
        question: "Design sync keeps what in parity?",
        options: [
          "Fonts and images only",
          "Figma tokens and CSS variables",
          "Nothing — it's manual guesswork",
        ],
        correct: 1,
      },
    ],
  },

  "module-15": {
    objectives: [
      "Understand Git as version control: the mental model mapped to Figma branches and versions",
      "Execute the four essential Git commands to create a branch, stage, commit, and push",
      "Write a pull request description that engineers will approve and merge",
      "Navigate code review feedback: know how to address changes with AI assistance",
      "Submit a PR that looks like it came from a senior engineer, not a first-timer",
    ],
    concepts: [
      {
        id: "git-mental-model",
        title: "Git for Designers: The Mental Model",
        body: "Git is a version control system. Think of it like Figma's version history, but for code — and more structured. Every concept in Git has a direct Figma parallel.",
        tableLabels: { left: "Git Concept", right: "Figma Equivalent" },
        table: [
          { left: "Repository (repo)", right: "Figma file — the project, tracked by Git" },
          { left: "Branch", right: "Figma branch — a parallel version for safe changes" },
          { left: "Commit", right: "Figma version with a description — a named checkpoint" },
          { left: "Pull Request (PR)", right: "Branch approval request — review before merging" },
          { left: "Merge", right: "Accept the branch — changes enter the main file" },
          { left: "Review", right: "Stakeholder feedback — comments, requests, approval" },
          { left: "main / master", right: "The current published version of the file" },
          { left: "git clone", right: "Duplicate a Figma file to your drafts" },
        ],
      },
      {
        id: "four-git-commands",
        title: "The Four Git Commands You Need",
        body: "You do not need to master Git. You need four commands. Everything else, AI can handle for you — just ask 'help me do X in Git' and describe what you need.",
        code: {
          lang: "bash",
          content: `# 1. Create a new branch for your work
git checkout -b my-feature-name

# 2. Stage your changes (add files to the next commit)
git add .

# 3. Save a named checkpoint of your changes
git commit -m "Add button component with all variants and states"

# 4. Send your branch to GitHub (or GitLab)
git push origin my-feature-name`,
        },
      },
      {
        id: "pr-description",
        title: "Writing a PR That Engineers Will Merge",
        body: "A good PR description gives a reviewer everything they need to understand, test, and approve your work. Engineers are busy — a PR that requires zero clarifying questions gets reviewed faster.",
        code: {
          lang: "markdown",
          content: `## Button Component

Adds the \`Button\` component with all variants (filled, outlined, ghost),
sizes (sm, md, lg), and states (default, hover, focus, disabled, loading).

**Figma:** [Link to component frame in Dev Mode]

**Why:** Replaces inline button styles across 14 screens with a single
reusable component. Closes #42.

**Screenshots:**
[Before / After images of each variant]

**Testing:**
- Tab through the button to verify focus ring appears
- Test disabled state: pointer-events should be none
- Verify loading spinner appears on click in the demo page
- Check at 375px and 1440px

**Notes:**
- Used <button> element throughout (not <div>) for accessibility
- Loading state reuses existing Spinner component`,
        },
      },
      {
        id: "code-review-loop",
        title: "Navigating Code Review",
        body: "Engineers will leave comments on your PR. Some are requests for changes. Some are style suggestions. Some are questions about your design decisions. All are normal. None are personal. The review loop is where good code becomes great code.",
        bullets: [
          "Read every comment carefully — sometimes 'could this be extracted?' is a question, not a demand",
          "For code changes, ask AI: 'My reviewer asked me to extract this logic. Here is the code: [paste]. Here is the feedback: [paste]. Please make this change.'",
          "For design questions: explain your spec rationale clearly — the spec is your authority",
          "Respond to every comment, even if just 'Done' or 'Intentional — here is why...'",
          "Never take review comments personally. They are about the code.",
        ],
      },
      {
        id: "pr-workflow",
        title: "The Full PR Workflow",
        body: "Once your branch is pushed, the PR workflow follows a predictable pattern. Knowing the steps in advance makes the process feel routine rather than stressful.",
        bullets: [
          "1. Push branch → open PR on GitHub/GitLab with full description",
          "2. CI checks run automatically — fix any failures before reviewers start",
          "3. Reviewer leaves comments → address each one with AI help if needed",
          "4. Push updates to your branch → PR auto-updates",
          "5. Reviewer approves → merge the PR",
          "6. Delete the branch → start next feature from a fresh branch",
        ],
      },
    ],
    exercise: {
      title: "Submit a Real PR",
      description: "Set up a practice repository on GitHub and submit a complete PR with the component from Module 7. The PR should look production-quality.",
      steps: [
        "Create a GitHub repository (or use an existing personal project) — AI can help you set it up",
        "Create a branch, add your component code, and push it",
        "Open a PR with the full description template above — include screenshots and a Figma link",
        "Ask a colleague to leave one review comment (or leave one yourself) — then address it and push an update",
      ],
    },
    deliverable: {
      title: "A Production-Quality PR",
      description: "A real PR on GitHub or GitLab with a full description, screenshots, and a Figma link. Even if it is a practice repository, the PR should demonstrate that you understand the review process and can communicate your design decisions to an engineering audience.",
    },
    quiz: [
      {
        question: "What is a branch?",
        options: [
          "A parallel copy of the codebase where you work without touching production",
          "A permanently deleted file",
          "A live deployment",
        ],
        correct: 0,
      },
      {
        question: "What is a pull request?",
        options: [
          "A way to delete the main branch",
          "A proposal to merge your branch, where code review happens",
          "A screenshot of your design",
        ],
        correct: 1,
      },
      {
        question: "What is a commit?",
        options: [
          "A live website",
          "A font file",
          "A saved snapshot of your changes with a message",
        ],
        correct: 2,
      },
    ],
  },

  "module-16": {
    objectives: [
      "Deploy a project to Vercel or Netlify from a GitHub repository in under 10 minutes",
      "Run a structured visual QA process: live URL vs. Figma prototype, side by side",
      "Describe visual discrepancies to AI with enough precision to fix them in one iteration",
      "Understand the live feedback loop: observe, update Figma, update spec, re-prompt, re-deploy",
      "Know how to handle a hotfix: the emergency branch-and-deploy workflow",
    ],
    concepts: [
      {
        id: "deployment-basics",
        title: "Deployment Is Simpler Than It Sounds",
        body: "Deployment is putting your code on the internet so real users can access it. For most designer-built projects, this is genuinely simple — three steps, five minutes, and your work is live.",
        bullets: [
          "1. Push your code to a GitHub repository",
          "2. Connect the repository to Vercel or Netlify (one-time setup, takes 3 minutes)",
          "3. Every push to your main branch automatically triggers a new deployment",
          "Custom domain: one additional step in the Vercel/Netlify dashboard",
          "Preview deployments: every PR automatically gets a preview URL — review before merging",
        ],
      },
      {
        id: "vercel-vs-netlify",
        title: "Vercel vs. Netlify",
        body: "Both platforms connect to GitHub, deploy automatically, and have generous free tiers. For most designer-built projects, the choice does not matter — pick one and use it consistently.",
        bullets: [
          "Vercel: best for Next.js projects; native integration, zero config for App Router",
          "Netlify: excellent for static sites, Gatsby, Astro; slightly more flexible build pipeline",
          "Both: preview URLs on every PR, custom domains, environment variables, automatic HTTPS",
          "Both: free tier is more than enough for portfolios and client projects",
        ],
      },
      {
        id: "visual-qa-process",
        title: "Visual QA from a Designer's Eye",
        body: "QA is not 'does it look right.' QA is a systematic, property-by-property review of the live implementation against your Figma prototype — because 'looks right' hides the 4px spacing error you will notice in your portfolio review.",
        bullets: [
          "Open Figma prototype and live URL side by side (or use browser split view)",
          "Check every spacing value that matters: padding, gaps, margins",
          "Check every color against your tokens: use browser DevTools to inspect computed values",
          "Check every font size, weight, and line height — these drift the most",
          "Check all interactive states: hover, focus, active, disabled",
          "Check at 375px (iPhone SE), 768px (iPad), 1440px (desktop)",
          "Check in Safari and Chrome — some CSS properties render differently",
        ],
      },
      {
        id: "precision-qa-feedback",
        title: "Precision QA Feedback to AI",
        body: "When you find a visual discrepancy, describe it precisely enough that AI can fix it in one iteration without asking for clarification.",
        bullets: [
          "Bad: 'The spacing looks off'",
          "Good: 'The button group has 8px gap in the live version but the spec and Figma both show 12px. Current CSS: gap: 8px. Fix: gap: var(--spacing-3) which resolves to 12px'",
          "Attach a screenshot of the Figma design and a screenshot of the live version",
          "Reference the computed value from DevTools: 'Computed padding-top is 16px; should be 24px per the spec'",
        ],
      },
      {
        id: "live-feedback-loop",
        title: "The Live Feedback Loop",
        body: "After you ship, real users interact with your work. Their behavior — analytics, session recordings, direct feedback — informs the next design iteration. Designers who can build own this loop end to end.",
        code: {
          lang: "text",
          content: `Observe user behavior
    ↓
Update design in Figma (resolve the design question)
    ↓
Update the spec (translate the Figma decision to language)
    ↓
Prompt Claude Code (execute against the spec)
    ↓
Review output
    ↓
PR → Deploy
    ↓
Observe user behavior → (repeat)`,
        },
      },
    ],
    exercise: {
      title: "Deploy and QA Your Work",
      description: "Deploy the project from Module 8. Run the full QA checklist. Fix at least three visual discrepancies using Claude Code.",
      steps: [
        "Connect your GitHub repository to Vercel or Netlify — follow their Quick Start guide",
        "Deploy and open the live URL in a browser",
        "Open your Figma prototype at the same time — put them side by side",
        "Run the visual QA checklist above. Document every discrepancy. Fix the top 3 using Claude Code.",
      ],
    },
    deliverable: {
      title: "A Live Deployed Project URL",
      description: "A live URL you can share and are proud to show as your work. Document the QA process: every discrepancy found, the precision fix prompt you wrote, and how many iterations it took. This is your proof of the full design-to-production workflow.",
    },
    quiz: [
      {
        question: "Before shipping, what should you run?",
        options: [
          "A pre-deploy QA checklist — states, breakpoints, keyboard nav, tokens",
          "Nothing, just ship",
          "A coin flip",
        ],
        correct: 0,
      },
      {
        question: "In this course, where does your deployment work happen?",
        options: [
          "On a client's production server",
          "In your local environment",
          "Nowhere",
        ],
        correct: 1,
      },
      {
        question: "What accessibility standard is the ITX default?",
        options: ["It's optional", "A font family", "WCAG AA"],
        correct: 2,
      },
    ],
  },

  "module-capstone": {
    objectives: [
      "Complete the full SDD workflow unassisted: design → spec → token export → build → PR → deploy",
      "Apply every skill from the course to a single, polished, production-ready project",
      "Submit a PR description that an engineering team would approve and merge",
      "Deploy a live URL you can use in your portfolio",
      "Evaluate your own work against the four capstone questions",
    ],
    concepts: [
      {
        id: "capstone-overview",
        title: "What You Will Build",
        body: "The capstone is a complete, polished landing page — for this course, or a project of your choosing with equivalent scope. This is the project you will show in your portfolio. It demonstrates that you can take a design from Figma to production on your own.",
        bullets: [
          "Hero with a headline, subheadline, and primary CTA",
          "'Who is this for' section with real content",
          "Full curriculum overview with all modules and their deliverables",
          "'What you will build' section showing key deliverables",
          "At least one interactive element: accordion, tab, animation, or modal",
          "Mobile-first responsive design, WCAG 2.1 AA accessible markup",
        ],
      },
      {
        id: "eight-step-sdd-workflow",
        title: "The Full SDD Workflow, Unassisted",
        body: "You will complete every step of the workflow without hand-holding. This is not a test of memory — your CLAUDE.md, design.md, and spec templates from earlier modules are all the scaffolding you need.",
        bullets: [
          "1. Design the full landing page in Figma with variables, components, and annotations",
          "2. Write the spec: page spec, component specs, interaction specs for every interactive element",
          "3. Export tokens from Figma Variables",
          "4. Set up the project: repo, deployment pipeline, token file",
          "5. Build each section: hero, curriculum, deliverables, social proof, CTA, footer",
          "6. Connect the sections: scroll interactions, responsive behavior, navigation",
          "7. Submit a PR with screenshots, Figma link, and full description",
          "8. Deploy: live URL, QA'd against your Figma design, ready to share",
        ],
      },
      {
        id: "capstone-evaluation",
        title: "The Four Evaluation Questions",
        body: "Review your completed landing page against these four questions. They are not graded by anyone else — they are your own standard. If you cannot answer yes to all four, you know what to work on.",
        bullets: [
          "1. Does it match your Figma design to your own standard of quality?",
          "2. Does the code use your token file consistently — no hardcoded values?",
          "3. Could an engineer read your PR and understand every decision you made?",
          "4. Would you put this URL in your portfolio today?",
        ],
      },
      {
        id: "what-comes-next",
        title: "What Comes Next",
        body: "The capstone closes the loop on this course. The skills you now own: Spec-Driven Development as a design workflow; Figma as the source of truth for engineers and AI; reading code to direct AI and catch mistakes; building production components with AI; submitting and iterating on real PRs; deploying and QA-ing your own work.",
        bullets: [
          "Natural next level: design systems at scale — multi-brand token architecture",
          "Animation and motion: spec-driven interaction design with real timing and easing",
          "Accessibility in depth: WCAG 2.1 AA auditing and remediation workflow",
          "AI-assisted design system maintenance: keeping Figma and code in sync at team scale",
          "But first: ship the capstone. The best next step is always a project, not another module.",
        ],
      },
    ],
    exercise: {
      title: "Build the Capstone",
      description: "Apply the full SDD workflow to your capstone project. No hand-holding — you have the templates, the tools, and the skills.",
      steps: [
        "Complete the Figma design with variables, components, annotations, and Dev Mode verified",
        "Write all three spec types for every major component and interaction",
        "Build each section in Claude Code sessions, starting with the most complex component",
        "Submit a complete PR and deploy — then evaluate against the four questions above",
      ],
    },
    deliverable: {
      title: "A Polished, Live Course Landing Page",
      description: "A live URL showing your capstone project. A complete PR description with screenshots and Figma link. A Vibe Session Log showing your journey from Module 0 to now. Four yes answers to the evaluation questions. This is your portfolio proof.",
    },
  },
};

// ─── Remap old module keys to new 12-module structure ───
// The content above uses the original 17-module numbering.
// The redesigned course uses 12 modules (00–11) + capstone.
// We must remap carefully: assignments that read from keys we're
// about to overwrite need to be captured first.

const old03 = moduleContent["module-03"]; // Figma as Source of Truth
const old06 = moduleContent["module-06"]; // Storybook for Designers
const old07 = moduleContent["module-07"]; // Writing design.md
const old08 = moduleContent["module-08"]; // Setting Up CLAUDE.md
const old10 = moduleContent["module-10"]; // Writing Specs with SDD-DE
const old12 = moduleContent["module-12"]; // Your First AI Session
const old13 = moduleContent["module-13"]; // From Component to Page
const old14 = moduleContent["module-14"]; // Design Sync
const old15 = moduleContent["module-15"]; // Engineering Workflow
const old16 = moduleContent["module-16"]; // Deploy & QA

// module-00 stays (Welcome)
// module-01 stays (Reading Code)
moduleContent["module-02"] = old03; // Figma as Source of Truth
moduleContent["module-03"] = old06; // Storybook for Designers (has screenshots!)
moduleContent["module-04"] = old07; // Writing design.md
moduleContent["module-05"] = old08; // Setting Up CLAUDE.md
moduleContent["module-06"] = old10; // Writing Specs
moduleContent["module-07"] = old12; // Your First AI Session
moduleContent["module-08"] = old13; // From Component to Page
moduleContent["module-09"] = old14; // Design Sync
moduleContent["module-10"] = old15; // Engineering Workflow
moduleContent["module-11"] = old16; // Deploy & QA
// module-capstone stays

export type Term = {
  term: string;
  cat: "Code" | "Specs" | "Tools" | "Shipping";
  def: string;
  figma: string;
};

export const allTerms: Term[] = [
  { term: "Vibe coding", cat: "Specs", def: "AI-assisted development where your design precision is the input. You describe with spec-level exactness; AI implements.", figma: "= designing with words" },
  { term: "SDD", cat: "Specs", def: "Spec-Driven Development. The spec is the contract \u2014 not the screenshot, not the vibe.", figma: "= your source of truth" },
  { term: "Component Spec", cat: "Specs", def: "A structured description of one reusable element: props, variants, states, and tokens.", figma: "= component description, formalized" },
  { term: "design.md", cat: "Specs", def: "The canonical design document in the repo \u2014 tokens, type scale, spacing, and a component inventory that links each component to its Storybook story.", figma: "= your Figma cover page, but executable" },
  { term: "CLAUDE.md", cat: "Tools", def: "A context file that primes every Claude Code session with your project\u2019s design rules.", figma: "= onboarding doc for your AI" },
  { term: "Design token", cat: "Code", def: "A named design decision (color, spacing, radius) referenced instead of hardcoded.", figma: "= Figma variables" },
  { term: "CSS variable", cat: "Code", def: "A token in code form: --brand: #FF4D24. Change it once, it cascades everywhere.", figma: "= a variable, in the stylesheet" },
  { term: "Flexbox", cat: "Code", def: "CSS layout where children flow in a row or column with gap and alignment.", figma: "= auto-layout" },
  { term: "Prop", cat: "Code", def: "An input a component accepts to change how it renders \u2014 label, size, variant.", figma: "= component properties" },
  { term: "State", cat: "Code", def: "Data a component remembers that changes what it shows \u2014 hover, open, loading, error.", figma: "= interactive variants" },
  { term: "Storybook", cat: "Tools", def: "A workshop for components in isolation \u2014 review every state without running the app.", figma: "= a living component library page" },
  { term: "Claude Code", cat: "Tools", def: "The AI coding agent this course pairs you with. Reads your specs, writes the implementation.", figma: "= your engineering partner" },
  { term: "Branch", cat: "Shipping", def: "A parallel copy of the codebase where you work without touching production.", figma: "= a Figma branch, literally" },
  { term: "Pull request", cat: "Shipping", def: "A proposal to merge your branch \u2014 where code review happens before shipping.", figma: "= design crit for code" },
  { term: "Deploy", cat: "Shipping", def: "Publishing code to production. With Vercel, every merge can go live automatically.", figma: "= hitting publish" },
  { term: "Git", cat: "Shipping", def: "The version-control system that tracks every change to the codebase \u2014 who, what, when, and why.", figma: "= version history, with superpowers" },
  { term: "Commit", cat: "Shipping", def: "A saved snapshot of your changes with a message describing them. Small, frequent commits tell a story.", figma: "= naming a version save" },
  { term: "Merge", cat: "Shipping", def: "Combining one branch\u2019s changes into another \u2014 usually your work landing in main after review.", figma: "= merging a Figma branch" },
  { term: "Spec", cat: "Specs", def: "A precise, structured description of what to build \u2014 exact values, states, and behaviour. The unit of work in SDD.", figma: "= redlines that write code" },
  { term: "Interaction Spec", cat: "Specs", def: "A spec for motion: triggers, transitions, timing, and easing, written so AI can implement them exactly.", figma: "= prototype settings, in words" },
  { term: "Acceptance criteria", cat: "Specs", def: "The checklist at the bottom of a spec that defines \u2018done\u2019 \u2014 testable statements, not vibes.", figma: "= the definition of done" },
  { term: "Terminal", cat: "Tools", def: "The text window where you type commands to your computer instead of clicking \u2014 Claude Code lives here, and it\u2019s friendlier than it looks. On a Mac, open it with Spotlight: press \u2318 + Space, type \u201cTerminal\u201d, and hit Enter (or find it in Applications \u203a Utilities \u203a Terminal).", figma: "= the command line, your new canvas" },
  { term: "CLI", cat: "Tools", def: "Command-Line Interface \u2014 any tool you drive by typing commands instead of clicking buttons.", figma: "= keyboard shortcuts, as an app" },
  { term: "npm package", cat: "Tools", def: "A reusable chunk of code you install into a project \u2014 a component library, an icon set, a utility.", figma: "= a community library you can install" },
  { term: "Lint", cat: "Code", def: "An automatic code-style checker that flags inconsistencies and errors before they ship.", figma: "= a design-system audit, automated" },
  { term: "Repository", cat: "Shipping", def: "The project\u2019s home: all the code, its history, and its branches, usually hosted on GitHub.", figma: "= the team project file" },
  { term: "Markdown", cat: "Code", def: "The plain-text formatting language of design.md, CLAUDE.md, and your specs. Headings with #, lists with -.", figma: "= rich text you can version" },
  { term: "Component library", cat: "Tools", def: "The shared toolkit of built, tested UI components a product team composes screens from.", figma: "= your published Figma library, in code" },
  { term: "Breakpoint", cat: "Code", def: "A viewport width where the layout changes \u2014 the code version of designing at multiple frame sizes. ITX standard set: mobile < 768px, tablet 768\u20131279px, desktop \u2265 1280px (the standard desktop breakpoint).", figma: "= desktop / tablet / mobile frames" },
  { term: "Semantic HTML", cat: "Code", def: "Using the right element for the job \u2014 button, nav, header \u2014 so browsers and screen readers understand the page.", figma: "= naming your layers properly" },
  { term: "Accessibility (a11y)", cat: "Code", def: "Making the UI work for everyone: contrast, keyboard navigation, focus states, screen-reader labels.", figma: "= WCAG contrast checks, and then some" },
  { term: "Token parity", cat: "Specs", def: "Keeping Figma variables and CSS variables identical, so design and code never drift apart.", figma: "= one source of truth, two mediums" },
  { term: "Typed union", cat: "Code", def: "A type that says a value must be exactly one of a fixed set of options — like `'primary' | 'secondary' | 'ghost'`. TypeScript rejects anything outside the list, so an invalid variant is caught while you type instead of breaking in production.", figma: "= a variant property’s options" },
];

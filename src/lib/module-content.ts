export interface ConceptItem {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  table?: { left: string; right: string }[];
  tableLabels?: { left: string; right: string };
  code?: { lang: string; content: string };
}

export interface ModuleContent {
  objectives: string[];
  concepts: ConceptItem[];
  exercise: {
    title: string;
    description: string;
    steps: string[];
  };
  deliverable: {
    title: string;
    description: string;
  };
}

export const moduleContent: Record<string, ModuleContent> = {
  "module-00": {
    objectives: [
      "Understand what vibe coding is and how it differs from AI prototyping",
      "Recognize why your design vocabulary is a precision prompting advantage",
      "Tour the AI coding tool landscape and choose your first tool",
      "Run a precision vs. vague prompt comparison and document the results",
      "Start your Vibe Session Log — the artifact you will build throughout this course",
    ],
    concepts: [
      {
        id: "what-vibe-coding-is",
        title: "What Vibe Coding Actually Is",
        body: "Vibe coding is not about describing what you want and hoping AI produces it. That approach works for throwaway prototypes. It fails for production. Instead, vibe coding means bringing your design precision to every AI prompt — the same precision you already apply in Figma.",
        bullets: [
          "\"Card with 24px padding, 12px border-radius, 18px/600 title, 14px/400 secondary text at 60% opacity\" → AI builds exactly that",
          "\"Make a nice card\" → AI guesses, and guessing is how you end up with 6 revision cycles",
          "Production-grade AI-assisted development, not throwaway prototypes",
          "The shift: from \"I describe, someone else builds\" to \"I describe, I build\"",
        ],
      },
      {
        id: "designer-prompting-advantage",
        title: "Your Design Vocabulary Is Your Prompting Superpower",
        body: "Non-designers struggle with AI coding tools because they cannot describe what they want with enough precision. You have spent your entire career doing exactly that. Every Figma decision you've made — padding value, spacing scale, color token, typography style — is a direct AI instruction waiting to be written down.",
        bullets: [
          "Design intent converts to specific values AI can execute without guessing",
          "Your spec-writing practice is already most of what a good AI prompt requires",
          "Engineers read your specs; AI reads your specs — the audience changes, the skill does not",
          "The difference between 2 iterations and 12 iterations is usually spec precision",
        ],
      },
      {
        id: "ai-tool-landscape",
        title: "The AI Coding Tool Landscape",
        body: "This course is stack agnostic — the SDD workflow works with any AI coding tool. The same spec produces equivalent output across all of them. The difference is how much control you have over the surrounding code.",
        bullets: [
          "Cursor — code editor with AI built in; best for maximum control and existing codebases",
          "Lovable — full-stack app builder; best for starting new projects from scratch",
          "v0 by Vercel — component generator; best for isolated UI components",
          "Bolt — full-stack with one-click deploy; best for prototypes that become real products",
          "Replit — browser-based; best for learning without any local setup",
        ],
      },
      {
        id: "production-vs-prototype",
        title: "Production-Grade vs. Prototype AI Development",
        body: "Most vibe coding tutorials stop at \"it kind of works.\" This course builds to \"it ships.\" The difference is not the AI tool — it is the quality of the input you give it. A prototype needs to look right in a screenshot. A production component needs to handle every state, every breakpoint, every edge case, and every accessibility requirement.",
        bullets: [
          "Prototype: looks right in one specific state; production: works in all states",
          "Prototype: hardcoded values; production: token references that cascade",
          "Prototype: no keyboard navigation; production: full WCAG 2.1 AA compliance",
          "SDD closes this gap by making the spec the contract, not the screenshot",
        ],
      },
    ],
    exercise: {
      title: "The Precision Test",
      description: "Set up one AI coding tool and run this experiment. Two prompts, same component — compare what precision versus vagueness produces.",
      steps: [
        "Choose one AI tool from the landscape above and create a free account",
        "Precise prompt: 'Build a card component with 24px padding, 12px border-radius, an 18px bold title, a 14px regular subtitle at 60% opacity, and a 1px border using neutral-200'",
        "Vague prompt: 'Make me a nice card component'",
        "Screenshot both outputs side by side and note what AI had to guess in the vague version",
      ],
    },
    deliverable: {
      title: "Your Vibe Session Log",
      description: "A one-page document capturing what you asked for, what you got, what worked, what did not, and what you want to learn. You will return to this log at the end of the course to measure how far your prompting has come.",
    },
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
      },
      {
        id: "css-as-properties-panel",
        title: "CSS Is the Properties Panel",
        body: "CSS is styling. Every property in the CSS rule for an element maps to something you have set in Figma's right-hand properties panel. You already know these concepts — you just need the code spelling.",
        bullets: [
          "padding: 24px → your frame's padding in auto-layout",
          "gap: 16px → the item spacing between children in auto-layout",
          "border-radius: 12px → corner radius",
          "font-size: 18px; font-weight: 600 → your text style",
          "background-color: #0F52BA → the fill color",
          "border: 1px solid #E5E7EB → the stroke",
        ],
      },
      {
        id: "flexbox-as-autolayout",
        title: "Flexbox = Auto-Layout",
        body: "Flexbox is auto-layout. When you see `display: flex` in code, think of a Figma frame with auto-layout enabled. The direction, wrapping, alignment, and gap all have direct Figma equivalents.",
        code: {
          lang: "css",
          content: `/* Horizontal auto-layout with 16px gap, centered items */
display: flex;
flex-direction: row;  /* = Horizontal direction */
gap: 16px;            /* = Item spacing: 16 */
align-items: center;  /* = Align: Center */

/* Vertical auto-layout that wraps content */
display: flex;
flex-direction: column; /* = Vertical direction */
gap: 8px;               /* = Item spacing: 8 */`,
        },
      },
      {
        id: "css-variables-as-tokens",
        title: "CSS Variables = Design Tokens",
        body: "CSS custom properties (variables) are design tokens in code. In Figma you have a color variable named `color/brand/primary`. In code it becomes `--color-brand-primary`. Same thing — a named design decision that resolves to a value. Both design and code reference the name, not the value, so changing the token cascades everywhere.",
        code: {
          lang: "css",
          content: `/* Design token definition (in your global CSS) */
:root {
  --color-brand-primary: #0F52BA;
  --spacing-4: 16px;
  --radius-md: 12px;
}

/* Using tokens in a component */
.card {
  background: var(--color-brand-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}`,
        },
      },
      {
        id: "figma-to-code-table",
        title: "Figma → Code Translation Map",
        body: "Every concept you use in Figma has a code equivalent. Use this table as your personal reference. When AI generates code, cross-check it against what you would set in Figma.",
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
  },

  "module-02": {
    objectives: [
      "Set up Figma Variables as design tokens and understand how they map to CSS custom properties",
      "Configure component properties so AI generates components with the correct API",
      "Use Figma Dev Mode as an AI briefing tool, not just a developer handoff tool",
      "Understand Code Connect and how it changes the design-to-code workflow",
      "Write annotations that AI can parse directly into interaction specifications",
    ],
    concepts: [
      {
        id: "design-variables-tokens",
        title: "Design Variables and Tokens",
        body: "Figma Variables are design tokens. A design token is a named design decision — a color, a spacing value, a font size — that both design and code reference by name rather than by value. When you change a token, the change cascades everywhere that references it.",
        bullets: [
          "Create a variable collection: color/brand/primary, spacing/4, typography/heading-lg",
          "Variables resolve to values — AI and engineers use the name, not the hardcoded value",
          "Export variables as JSON compatible with Style Dictionary or Tokens Studio",
          "Naming convention engineers recognize: color.brand.primary → --color-brand-primary in CSS",
        ],
      },
      {
        id: "component-properties-to-props",
        title: "Component Properties → Code Props",
        body: "Every Figma component property has a direct code equivalent. Setting up properties correctly means AI can generate components with the right API without guessing your intended interface.",
        bullets: [
          "Boolean property → disabled: boolean (or any true/false prop)",
          "Text property → label: string (or children: ReactNode)",
          "Instance swap → icon: IconComponent (an interchangeable slot)",
          "Variant property → variant: \"filled\" | \"outlined\" | \"ghost\" (a typed union)",
        ],
      },
      {
        id: "dev-mode-ai-briefing",
        title: "Dev Mode as Your AI Briefing Tool",
        body: "Figma Dev Mode shows the CSS for any selected element. For AI sessions, treat this CSS as reference material — not production code, but a precise measurement document that tells AI exactly what you designed.",
        bullets: [
          "Select a frame → switch to Dev Mode → copy the CSS",
          "Paste into your AI prompt with the note: 'This is Figma reference CSS. Write production code, not a CSS copy'",
          "Dev Mode shows computed pixel values; your AI prompt should reference token names",
          "The gap between Dev Mode CSS and production CSS: Dev Mode uses raw values; production uses variables",
        ],
      },
      {
        id: "code-connect",
        title: "Code Connect",
        body: "Figma Code Connect links your Figma components to real code components. When enabled, Dev Mode shows your actual component code instead of generated CSS — making handoff into an AI session dramatically more accurate.",
        bullets: [
          "Set up Code Connect for your project: link each Figma component to its code file",
          "The workflow: design component → code component → link → documentation",
          "Once connected, Dev Mode shows: <Button variant=\"filled\" size=\"md\" /> instead of raw CSS",
          "This is the bridge that makes Figma the true source of truth for both AI and engineers",
        ],
      },
      {
        id: "annotations-for-ai",
        title: "Annotations AI Can Parse",
        body: "Figma's annotation tools let you attach structured notes to designs that are readable by AI in your prompt context. Write annotations as if briefing a precise contractor — not a collaborator who fills in the gaps.",
        bullets: [
          "Interaction: hover state → 'background transitions to brand-hover over 150ms ease-out'",
          "Accessibility: ARIA role, label, keyboard navigation path",
          "Responsive: 'at <768px, image shifts from 40% width to full width'",
          "Error state: 'border color changes to error-500, error icon appears left of label'",
        ],
      },
    ],
    exercise: {
      title: "Rebuild a Component, Properly",
      description: "Take one component from your existing design work. Rebuild it in Figma with the full production setup.",
      steps: [
        "Choose one component (button, card, or input) from your existing Figma work",
        "Add variable references for every color and spacing value — no hardcoded values",
        "Add all interactive states as variants with component properties",
        "Write annotations for every interactive state and the responsive behavior",
      ],
    },
    deliverable: {
      title: "Production-Ready Component Set",
      description: "Three Figma components — fully annotated, variables connected, component properties mapped, and Dev Mode verified. This is the source of truth your AI will build from in Phase 2.",
    },
  },

  "module-03": {
    objectives: [
      "Navigate Storybook to review component states without touching code",
      "Use Controls and Knobs to test every component variant interactively",
      "Run automated accessibility checks with the a11y addon",
      "Build a QA workflow using Storybook as your design review environment",
      "Provide precise feedback on AI-generated components using Storybook evidence",
    ],
    concepts: [
      {
        id: "what-storybook-is",
        title: "What Storybook Is (and Why Designers Should Care)",
        body: "Storybook is an isolated component development environment. Instead of navigating a full app to find the state you want to review, Storybook shows you every component in every state — all in one place. For designers, it is a live style guide and QA tool you can use without writing a line of code.",
        bullets: [
          "A component gallery showing every variant, state, and configuration",
          "Runs separately from the main app — no login, no setup, no waiting for data",
          "Every component AI generates can be reviewed in Storybook before it touches a real page",
          "The reference point for what 'built correctly' looks like — your design QA environment",
        ],
      },
      {
        id: "stories-and-controls",
        title: "Reading Stories and Using Controls",
        body: "In Storybook, a 'story' is a specific state of a component — Default, Hover, Loading, Error, Disabled. Each story is a named snapshot. Controls (also called Knobs in older versions) let you change props live without touching code.",
        bullets: [
          "Sidebar: navigate component stories like a Figma pages panel",
          "Canvas: live preview of the component — what you see is exactly what renders in the app",
          "Controls panel: change any prop (variant, size, label, disabled) and see the component update",
          "Viewport addon: preview how the component looks at mobile, tablet, and desktop sizes",
        ],
      },
      {
        id: "accessibility-addon",
        title: "The Accessibility Addon",
        body: "The a11y addon runs automated accessibility checks on every component. It flags missing ARIA roles, color contrast failures, keyboard navigation gaps, and focus management issues — directly in Storybook, before the component ships.",
        bullets: [
          "Color contrast checker: flags any text/background combination that fails WCAG AA",
          "ARIA audit: identifies missing labels, incorrect roles, and unlabeled interactive elements",
          "Keyboard navigation: simulates Tab and Enter to verify focus order",
          "Use this as your first QA pass on every AI-generated component",
        ],
      },
      {
        id: "design-qa-workflow",
        title: "Design QA Workflow with Storybook",
        body: "A repeatable process for reviewing AI-generated components against your design spec, using Storybook as the verification environment.",
        bullets: [
          "Step 1: Open the component story in Storybook. Check the Default state first.",
          "Step 2: Use Controls to cycle through every variant. Compare each to your Figma design.",
          "Step 3: Run the a11y addon. Address every flagged issue before moving on.",
          "Step 4: Check the component at 375px, 768px, and 1440px using the Viewport addon.",
          "Step 5: Document any discrepancies for the next AI iteration prompt.",
        ],
      },
      {
        id: "feedback-from-storybook",
        title: "Writing AI Feedback from Storybook",
        body: "When Storybook reveals a discrepancy between your design and the generated component, describe the fix precisely — not as a design complaint but as a technical correction your AI can execute.",
        bullets: [
          "Bad: 'The button looks wrong'",
          "Good: 'The button's focus ring is missing the 2px white offset between the button border and the ring. Add outline-offset: 2px and ensure the ring uses the --ring token'",
          "Screenshot the Storybook canvas at the exact failing state — attach it to the AI prompt",
          "Reference the spec: 'Per the spec, the loading state should show a spinner and disable pointer-events — the current implementation shows neither'",
        ],
      },
    ],
    exercise: {
      title: "Full QA Pass on an AI-Generated Component",
      description: "Take the component from Module 2 or a component from your current project. Run it through the full Storybook QA process.",
      steps: [
        "Ask AI to write a Storybook story file for the component covering: Default, Hover, Focus, Disabled, and (if applicable) Loading and Error states",
        "Open Storybook and navigate through each story — note every visual discrepancy vs. your Figma design",
        "Run the a11y addon on each story and log every flagged issue",
        "Write a precise correction prompt for each issue using the Storybook evidence",
      ],
    },
    deliverable: {
      title: "QA Report with Correction Prompts",
      description: "A documented QA pass: a table of every discrepancy found in Storybook, the story it appeared in, the specific deviation from spec, and the correction prompt you used to fix it. This becomes your QA template for future components.",
    },
  },

  "module-04": {
    objectives: [
      "Understand what design.md is and why it exists as a separate document from your Figma file",
      "Write a complete design.md that documents tokens, component anatomy, and interaction patterns",
      "Structure design.md so AI can parse it as a source of truth at the start of every session",
      "Understand the relationship between design.md and your CLAUDE.md file",
      "Maintain design.md as a living document that evolves with your design",
    ],
    concepts: [
      {
        id: "what-is-design-md",
        title: "What Is design.md",
        body: "design.md is the canonical written record of your design system — the single source of truth that both AI and engineers read from. It is not a design file and it is not a spec. It is the documentation layer that explains your design decisions in plain language that any AI tool can understand at the start of a session.",
        bullets: [
          "A plain text document (Markdown) that lives in your project repository",
          "Answers: what tokens exist, how components are structured, what patterns are established",
          "AI reads it at session start to understand your system before generating anything",
          "Engineers read it to understand design decisions without decoding a Figma file",
        ],
      },
      {
        id: "design-md-structure",
        title: "The design.md File Structure",
        body: "A complete design.md has four sections: Design Tokens, Component Inventory, Interaction Patterns, and Naming Conventions. Each section gives AI the context it needs to produce output that fits your system without guessing.",
        code: {
          lang: "markdown",
          content: `# Design System Documentation

## Design Tokens

### Colors
- \`--color-brand-primary\`: #0F52BA — primary actions, links
- \`--color-neutral-900\`: #111827 — body text
- \`--color-neutral-200\`: #E5E7EB — borders, dividers

### Spacing (4px base unit)
- spacing/1: 4px  · spacing/2: 8px
- spacing/4: 16px · spacing/6: 24px · spacing/8: 32px

### Typography
- heading-xl: Inter 48px/700/1.1 — page titles
- heading-md: Inter 24px/600/1.3 — section titles
- body-md: Inter 16px/400/1.6 — body text

## Component Inventory

### Button
- Variants: filled (primary), outlined, ghost
- Sizes: sm (32px), md (40px), lg (48px)
- States: default, hover, focus, active, disabled, loading

## Interaction Patterns
- Focus rings: 2px solid --color-ring, offset 2px
- Transitions: 150ms ease-out for color/background changes`,
        },
      },
      {
        id: "documenting-tokens",
        title: "Documenting Your Tokens in design.md",
        body: "Token documentation in design.md is the first thing AI reads. It must tell AI not just what the values are but what each token is for — the semantic intent behind the name.",
        bullets: [
          "Every token needs a value AND a usage description: '--color-brand-primary: #0F52BA — use for primary CTAs and active states'",
          "Document what NOT to use a token for: '--color-error-500: for error state text and borders only, not for warnings'",
          "Include your spacing scale with the rule that governs it: '4px base unit — all spacing is a multiple of 4'",
          "List typography scales with the element each style applies to: 'heading-lg → page h1 only'",
        ],
      },
      {
        id: "component-documentation",
        title: "Component Documentation in design.md",
        body: "For each component in your system, document its anatomy, variants, and the rules that govern its behavior. This is not the same as a spec — it is a summary that gives AI enough context to use the component correctly in any context.",
        bullets: [
          "Anatomy: what parts make up the component and what each part is called",
          "Variants: the allowed configurations and their visual differences",
          "Rules: what the component always does, never does, and requires",
          "Token references: which tokens the component uses for which visual properties",
        ],
      },
      {
        id: "keeping-in-sync",
        title: "Keeping design.md in Sync",
        body: "design.md becomes stale the moment you change a token or add a component without updating the file. Build the habit of updating design.md as part of every design decision — not after the fact.",
        bullets: [
          "Add a design.md update step to your component spec workflow",
          "Check design.md before every AI session — if it's out of date, AI will build to old spec",
          "Version it with your code: design.md changes should commit alongside code changes",
          "The file is the truth. If Figma and design.md disagree, decide which one is right and fix the other",
        ],
      },
    ],
    exercise: {
      title: "Write Your Project's design.md",
      description: "Create a design.md for a real project — either a client project, a side project, or the course capstone project you will build. Start with what you have; do not wait until your design system is perfect.",
      steps: [
        "Create a file called design.md in your project root (or in a /docs folder)",
        "Document your color tokens first: name, value, and one-line usage description for each",
        "Document your spacing scale and the rule that governs it",
        "Add one component section for the most important component in your system",
      ],
    },
    deliverable: {
      title: "A Working design.md File",
      description: "A committed design.md in your project repository with documented color tokens, spacing scale, typography styles, and at least one component section. Test it by starting a fresh AI session with 'Read design.md before generating anything' and checking whether AI correctly references your tokens.",
    },
  },

  "module-05": {
    objectives: [
      "Understand how CLAUDE.md primes the AI with project context before every session",
      "Write a CLAUDE.md that captures your design rules, token references, and behavioral constraints",
      "Understand the three-layer context hierarchy: CLAUDE.md → design.md → Spec",
      "Configure session memory so AI produces consistent output across sessions",
      "Iterate on CLAUDE.md as you discover what AI needs to know — and what it keeps forgetting",
    ],
    concepts: [
      {
        id: "what-is-claude-md",
        title: "What Is CLAUDE.md",
        body: "CLAUDE.md is a special file that Claude Code reads automatically at the start of every session in a project. It primes the AI with everything it needs to know about your project before you write a single prompt — your stack, your design rules, your conventions, and what it should never do.",
        bullets: [
          "Placed in your project root — Claude Code loads it automatically on session start",
          "Not just for Claude: other AI tools support similar files (AGENTS.md, .cursorrules, system prompt files)",
          "Think of it as the briefing document you wish you could give a new engineer on day one",
          "Persistent: every session gets the same ground truth, no re-explaining required",
        ],
      },
      {
        id: "context-hierarchy",
        title: "The Three-Layer Context Hierarchy",
        body: "Context for AI sessions works in layers: CLAUDE.md sets the permanent project rules; design.md documents the design system; the spec describes what to build right now. Each layer has a different scope and lifecycle.",
        bullets: [
          "CLAUDE.md: permanent project rules — stack, conventions, what to always/never do",
          "design.md: living design system documentation — tokens, components, patterns",
          "Spec: task-specific — what this component does, its properties, its states",
          "Always load: CLAUDE.md. Load when relevant: design.md. Load for each task: the spec.",
        ],
      },
      {
        id: "writing-claude-md",
        title: "What Goes in CLAUDE.md",
        body: "CLAUDE.md is not a design spec. It is the standing instructions that never change between sessions — the rules of the project.",
        code: {
          lang: "markdown",
          content: `# Project Context

## Stack
Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui

## Design System
Read /docs/design.md before writing any component code.

## Conventions
- All colors must reference CSS custom properties — no hardcoded hex values
- Spacing: use Tailwind spacing scale (multiples of 4px)
- Components: use semantic HTML elements (button for buttons, nav for nav)
- All interactive elements must be keyboard accessible with visible focus rings
- File naming: kebab-case for files, PascalCase for component exports

## Never Do
- Do not use inline styles
- Do not add 'any' type in TypeScript
- Do not hardcode pixel heights on flexible components
- Do not use <div> where a semantic element exists`,
        },
      },
      {
        id: "session-memory",
        title: "Building Session Memory Over Time",
        body: "CLAUDE.md is a living document. Every time AI makes a mistake you have to correct more than twice, that correction belongs in CLAUDE.md. Every constraint you find yourself repeating in prompts belongs in CLAUDE.md.",
        bullets: [
          "After each session: what did you have to correct twice? Add it to CLAUDE.md",
          "After each new tool or dependency: add it to the stack section",
          "After any design system change: update the reference to design.md",
          "CLAUDE.md gets better with use — the more you work, the more precise it becomes",
        ],
      },
      {
        id: "testing-your-claude-md",
        title: "Testing Your CLAUDE.md",
        body: "Before relying on CLAUDE.md in a real session, test whether it actually constrains AI behavior as intended. The test is simple: start a fresh session, load CLAUDE.md, and ask AI to build something that would violate your rules if it ignores the file.",
        bullets: [
          "Test: ask AI to build a button without mentioning tokens — if it uses hex values, CLAUDE.md needs a stronger rule",
          "Test: ask AI to write a click handler — if it uses <div> instead of <button>, update the semantic HTML rule",
          "Test: ask about the stack — if AI suggests a library you don't use, add 'we do not use X' to CLAUDE.md",
          "A CLAUDE.md that passes these tests is a CLAUDE.md that saves hours of correction per week",
        ],
      },
    ],
    exercise: {
      title: "Write and Test Your CLAUDE.md",
      description: "Create a CLAUDE.md for your project. Then test it against three prompts designed to fail if the file isn't working.",
      steps: [
        "Create CLAUDE.md in your project root — include stack, design system reference, conventions, and 'Never Do' rules",
        "Start a fresh Claude Code session in that directory",
        "Prompt: 'Build a primary button component' — verify it uses token names, not hex values",
        "Prompt: 'Add a click handler to open a modal' — verify it uses <button>, not <div>",
      ],
    },
    deliverable: {
      title: "A Working CLAUDE.md File",
      description: "A CLAUDE.md committed to your project root that passes all three test prompts without requiring additional context. Document in your Vibe Session Log what corrections you had to make — each one is a rule your CLAUDE.md now enforces automatically.",
    },
  },

  "module-06": {
    objectives: [
      "Understand the three levels of spec: Component, Interaction, and Page/Feature",
      "Write a complete Component Spec that AI can execute without asking questions",
      "Write an Interaction Spec that captures timing, easing, and edge cases",
      "Distinguish between a design file and a spec document — they serve different purposes",
      "Red-line your spec for AI, not for engineers — focus on intent, not just measurements",
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
      },
      {
        id: "component-spec-template",
        title: "The Component Spec Template",
        body: "Use this template for every component you specify. Every field that matters to you should be filled in. Every field you leave blank is a decision you are delegating to AI.",
        code: {
          lang: "markdown",
          content: `Component: Button
Purpose: Primary user action trigger

Visual Properties:
- Dimensions: height controlled by padding (12px top/bottom) + line-height (16px)
- Spacing: padding-inline 16px (sm), 20px (md), 24px (lg)
- Typography: label/md → Inter 14px/600
- Colors: filled → bg: --color-brand-primary, text: --color-white
- Border: 1px solid transparent (filled), 1px solid --color-brand-primary (outlined)
- Border-radius: --radius-md (8px)

Variants:
- filled: solid brand background, white label (primary actions)
- outlined: transparent background, brand border (secondary actions)
- ghost: no border, brand-tinted hover bg (tertiary actions)

States:
- Default: base appearance
- Hover: background shifts to --color-brand-primary-hover (150ms ease-out)
- Focus: 2px solid --color-ring, 2px offset
- Disabled: opacity-50, cursor-not-allowed, pointer-events-none

Sizes:
- sm: 32px height, 12px padding-inline, 13px font
- md: 40px height, 16px padding-inline, 14px font (base)
- lg: 48px height, 20px padding-inline, 15px font

Accessibility:
- Role: button (use <button> element always)
- Keyboard: Enter and Space trigger click
- Focus visible: required on all sizes and variants

Do not:
- Do not set fixed height — use padding to control height
- Do not use <div> or <a> as a button`,
        },
      },
      {
        id: "interaction-spec-template",
        title: "The Interaction Spec Template",
        body: "Interaction specs describe what happens over time. They are the difference between a button that changes color and a button that transitions with correct easing, shows a spinner in the right state, and handles network failure gracefully.",
        code: {
          lang: "markdown",
          content: `Interaction: Form Submit Button
Trigger: user clicks the submit button
Component: Button (filled, lg)

Flow:
1. User clicks the button
2. Button immediately enters loading state:
   - Label changes to "Saving..."
   - Spinner appears left of label (14px, same color as label)
   - pointer-events: none (prevent double submit)
3. Success path → button returns to default state, form collapses
4. Error path → button returns to default state, error alert appears above form

Timing:
- Transition to loading: immediate (0ms — user needs instant feedback)
- Transition out of loading: 200ms ease-out
- Error alert fade in: 300ms ease-out

Edge cases:
- If user double-clicks before loading starts: ignore second click
- If network times out after 10s: treat as error path
- On mobile: touch event should trigger same flow as click`,
        },
      },
      {
        id: "from-design-brief-to-spec",
        title: "From Design Brief to Spec",
        body: "The SDD workflow is a seven-step process. Writing the spec (step 3) is the pivotal step — it forces you to resolve every ambiguity before prompting AI, which is where most of the time savings come from.",
        bullets: [
          "1. Design brief: what are we building and why",
          "2. Design in Figma: resolve all visual decisions before writing a word",
          "3. Write the spec: translate Figma into structured language — this is where you catch gaps",
          "4. Review with a stakeholder: find the gaps you missed before AI does",
          "5. Prompt the AI: paste spec, add context, iterate minimally",
          "6. Review AI output: against the spec, not against your memory",
          "7. Ship or PR: the spec becomes the documentation",
        ],
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
          "The intent tells AI what to protect when it adapts the component",
        ],
      },
    ],
    exercise: {
      title: "Write Your First Complete Spec",
      description: "Write a complete spec for the component you built in Module 2. Use both templates above. Read it back as if you are the AI receiving it — fix every place where you would have to guess.",
      steps: [
        "Start with the Component Spec template — fill every field; if a field doesn't apply, write 'N/A' not 'skip'",
        "Write an Interaction Spec for the component's primary interaction (hover, click, or focus)",
        "Read the spec aloud. Every time you think 'obviously it means X' — that's a gap. Write X down.",
        "Share the spec with one person and ask them to try to build from it without clarifying questions",
      ],
    },
    deliverable: {
      title: "Full Spec Document for a Real Component",
      description: "A complete Component Spec and at least one Interaction Spec for a real component from your work. This spec will be used in Module 7 to generate your first production-quality component in a Claude Code session.",
    },
  },

  "module-07": {
    objectives: [
      "Run a full Claude Code session: load context, write an effective prompt, review the output",
      "Structure a four-part AI prompt (Context + Spec + Figma CSS + Constraints)",
      "Read generated code against the spec before accepting any output",
      "Manage the iteration loop — know when to re-prompt and when the spec has a gap",
      "Understand the difference between correcting AI output and fixing your spec",
    ],
    concepts: [
      {
        id: "session-setup",
        title: "Setting Up a Claude Code Session",
        body: "A Claude Code session that produces good output the first time starts before you type a prompt. Loading the right context — your CLAUDE.md, your design.md, and your spec — is what separates a 3-iteration session from a 10-iteration session.",
        bullets: [
          "Claude Code automatically reads CLAUDE.md when you open a project directory",
          "Paste or reference design.md at session start: 'Before we begin, read design.md'",
          "Load your spec: paste the full document (Component Spec + Interaction Spec) as a block",
          "Include Figma Dev Mode CSS as a reference block with the label: 'This is Figma reference, not production code'",
        ],
      },
      {
        id: "four-part-prompt",
        title: "The Four-Part Prompt Structure",
        body: "A well-structured AI prompt has four parts. Each part serves a specific purpose. Missing any part forces AI to guess — and every guess is a potential correction cycle.",
        bullets: [
          "1. Context: what this component is for, what tech stack to use, what design system to follow",
          "2. The spec: paste your complete component spec verbatim",
          "3. Figma CSS: paste Dev Mode CSS as reference — tell AI to use it as measurements, not as code",
          "4. Constraints: what NOT to do — 'no inline styles, use design tokens, no fixed pixel heights, accessible markup'",
        ],
      },
      {
        id: "reading-ai-output",
        title: "Reading What AI Wrote",
        body: "Before running the code, read it. With your translation map from Module 1, you can read enough to spot the common issues that signal AI didn't follow your spec.",
        bullets: [
          "Hardcoded colors: #0F52BA should be var(--color-brand-primary)",
          "Fixed pixel heights on flexible components: height: 40px should be padding-based",
          "Missing ARIA attributes: buttons without aria-label when icon-only",
          "Wrong HTML element: <div onClick> instead of <button>",
          "Inline styles: style={{color: 'red'}} instead of a token class",
        ],
      },
      {
        id: "iteration-loop",
        title: "The Iteration Loop",
        body: "Most components need 3–5 iterations. This is normal. The loop should converge — each iteration should fix a specific issue, not scatter into new problems. If you are on iteration 8 and still not close, the spec has gaps, not the AI.",
        code: {
          lang: "text",
          content: `Prompt → Output → Review against spec → Identify specific issues
→ Targeted correction prompt → Output → Review → ...

If stuck after 5 iterations:
1. Identify what AI is consistently getting wrong
2. Ask: is this in my spec? If not → update spec, restart
3. Ask: is this in CLAUDE.md? If not → add it, restart
4. If it's in both and AI still ignores it → rephrase the rule`,
        },
      },
      {
        id: "spec-gaps-vs-ai-mistakes",
        title: "Spec Gaps vs. AI Mistakes",
        body: "Not every wrong output is AI's fault. Distinguishing between a spec gap (your error) and an AI mistake (the model's error) determines whether you should fix the prompt or fix the spec.",
        bullets: [
          "Spec gap: AI produces something reasonable that you didn't specify — fix the spec",
          "AI mistake: AI produces something that contradicts your spec — fix the prompt/constraint",
          "If the same mistake recurs across 3+ prompts — it's a CLAUDE.md rule, not a one-time correction",
          "The spec is the contract. If output violates the contract, cite the violation specifically",
        ],
      },
    ],
    exercise: {
      title: "Build Your First Component with Claude Code",
      description: "Use the spec from Module 6. Build the component in a real Claude Code session. Iterate until the output matches the spec.",
      steps: [
        "Open Claude Code in your project directory — verify it loaded CLAUDE.md by asking 'What stack are we using?'",
        "Paste design.md reference and your full Component Spec from Module 6",
        "Build the component using the four-part prompt structure",
        "After first output: review against the spec line by line, list every discrepancy, write a single targeted correction prompt",
      ],
    },
    deliverable: {
      title: "A Working Coded Component",
      description: "A working component that matches your spec. Look at the code and the spec side by side — every field in the spec should be implemented in the code. Document your iteration log: how many cycles, what the sticking points were, what CLAUDE.md rules you added.",
    },
  },

  "module-08": {
    objectives: [
      "Break a full page into independent feature specs before prompting",
      "Build and test each feature in isolation, then compose into a page",
      "Specify cross-feature interactions explicitly — AI does not infer component connections",
      "Write responsive specs that tell AI exactly what changes at each breakpoint",
      "Compose atoms into molecules, molecules into organisms, organisms into pages",
    ],
    concepts: [
      {
        id: "feature-thinking",
        title: "Feature Thinking: Break the Page First",
        body: "Before prompting a full page, break it into features. AI makes fewer mistakes on focused prompts than on 'build me the whole page.' Each feature gets its own spec and its own build session. Composition comes last.",
        bullets: [
          "Navigation: its own spec and build session",
          "Hero section: its own spec and build session",
          "Feature grid: its own spec and build session",
          "Footer: its own spec and build session",
          "Rule: if you can describe the feature without mentioning another feature, it can be specced independently",
        ],
      },
      {
        id: "atomic-design-in-practice",
        title: "Atoms → Molecules → Organisms → Pages",
        body: "Atomic Design maps directly to the order you build and compose components. Start with atoms (the smallest pieces), compose into molecules, then organisms, then pages. Each layer depends on the layers below it.",
        bullets: [
          "Atoms: Button, Input, Badge, Icon, Label — single-purpose, no composition",
          "Molecules: SearchBar (Input + Button), Card Header (Image + Heading + Badge) — composed atoms",
          "Organisms: Navigation (Logo + NavLinks + CTAButton), FeatureGrid (SectionHeader + CardList)",
          "Pages: wiring organisms into a full layout with spacing, responsive behavior, and scroll interactions",
        ],
      },
      {
        id: "cross-component-interactions",
        title: "Specifying Cross-Component Interactions",
        body: "At the page level, interactions connect features that were built separately. These connections must be specified explicitly — AI will not infer that a button in the hero triggers the modal defined in a different section.",
        bullets: [
          "Scroll position affects nav: 'Navigation transitions from transparent to solid at 80px scroll depth, 200ms ease-out'",
          "CTA opens modal: 'Clicking the hero CTA button opens the SignUpModal component'",
          "Filter updates list: 'Selecting a filter option in FilterBar updates the visible items in ContentGrid below'",
          "Every connection between components must appear in the page-level spec",
        ],
      },
      {
        id: "responsive-spec-writing",
        title: "Writing Responsive Specs",
        body: "Responsive behavior needs to be specified, not assumed. For each section, tell AI exactly what changes at each breakpoint — what collapses, what hides, what resizes.",
        bullets: [
          "Mobile (<768px): 'The 3-column feature grid collapses to 1 column with 24px gap'",
          "Mobile (<768px): 'Card images shift from 40% width to full width'",
          "Mobile (<768px): 'The headline reduces from 48px to 32px'",
          "Navigation at mobile: 'Hamburger menu replaces the inline nav links — links appear in a slide-in drawer from the right'",
          "Include which elements hide entirely: 'The decorative background SVG is hidden at <768px'",
        ],
      },
      {
        id: "composition-and-testing",
        title: "Composing and Testing Features Together",
        body: "When features built separately are composed into a page, visual and behavioral conflicts emerge. Test the composition at every breakpoint before calling it done.",
        bullets: [
          "Spacing collisions: the hero's bottom padding and the section's top padding stack — decide which wins",
          "Z-index conflicts: sticky nav overlapping modal overlay — specify z-index hierarchy in the page spec",
          "Focus order: Tab should move logically through the full page, not just each feature in isolation",
          "Test in this order: mobile first (375px), then 768px, then 1440px",
        ],
      },
    ],
    exercise: {
      title: "Build a Full Page Section",
      description: "Spec and build a hero section and navigation for a real project. They should be responsive and connected via scroll behavior.",
      steps: [
        "Write separate specs for the Navigation and Hero — each as a standalone Component Spec",
        "Add a Page-Level spec that describes the scroll interaction between them",
        "Build Navigation first, then Hero, then wire the scroll connection",
        "Test at 375px, 768px, and 1440px — fix every responsive issue before moving on",
      ],
    },
    deliverable: {
      title: "Complete Responsive Page Section",
      description: "Navigation and hero, working together, tested at 375px / 768px / 1440px. The scroll transition between transparent and solid nav should work. Document the page spec you used — it becomes the template for every future page section.",
    },
  },

  "module-09": {
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
  },

  "module-10": {
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
  },

  "module-11": {
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

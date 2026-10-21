# Project Context

<!--
  CLAUDE.md STARTER — Design Engineering for UX Designers, Module 05.

  Save as CLAUDE.md in your project root. Claude Code loads it at the start of every session.
  - Keep it under ~200 lines; longer files reduce adherence.
  - Be specific enough to verify. "Use tokens" is vague; "no hardcoded hex" is checkable.
  - HTML comments like this one are stripped before Claude reads the file — free maintainer notes.
  - Run /init first to auto-detect your commands and stack, then merge in the design rules below.
  - Check what Claude actually loaded with /memory.
  Last updated: YYYY-MM — update after major stack changes.
-->

## Stack

[e.g. Next.js, TypeScript, Tailwind CSS, shadcn/ui, Storybook]

## Design System

Read design.md before writing any component code.
design.md is the source of truth for tokens, type scale, spacing, and the component inventory.
Reuse an existing component before creating a new one — never recreate one that exists.

## Specs

Read the Component Spec in specs/<feature>/ before building. Build exactly what it says.
If the spec is silent or ambiguous, ask — do not guess.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Tests: `npm test`
- Lint: `npm run lint`
- Storybook: `npm run storybook`
- Lint design tokens: `npx @google/design.md lint design.md`

## Conventions

- All colors, spacing, radii, and shadows reference CSS custom properties — no hardcoded hex or arbitrary pixel values
- Spacing: the token scale only (multiples of 4px)
- Text-bearing components size with padding, never a fixed height
- File naming: kebab-case files, PascalCase exports
- Components live in `src/components/`, routes in `src/app/`
- Every component ships with a Storybook story covering each variant and state

## Accessibility

- WCAG 2.2 AA is the default for everything
- All interactive elements are keyboard accessible, with a visible focus ring (2px, `--color-ring`, 2px offset)
- Use semantic HTML — `<button>` not `<div>` for click targets
- Respect `prefers-reduced-motion`

## Workflow

1. Read design.md and the relevant spec
2. State the plan before editing
3. Implement, then check every variant and state in Storybook
4. Report anything you changed that was not in the spec

## Never Do

- Do not use inline styles
- Do not hardcode color values
- Do not add the TypeScript `any` type
- Do not use `<div>` where a semantic element exists
- Do not install new dependencies without asking

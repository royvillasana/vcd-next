---
version: alpha
name: Your Design System
description: One sentence on the feel of the system — replace this.
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  tertiary-container: "#9A3523"
  on-tertiary: "#FFFFFF"
  neutral: "#F7F5F2"
  surface: "#FFFFFF"
  on-surface: "#1A1C1E"
  error: "#B3261E"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary}"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 44px
  input-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
---

<!--
  design.md STARTER — Design Engineering for UX Designers, Module 04.

  The values above are the Heritage example system from the official design.md README.
  Replace every one with tokens from YOUR design system (the workshop Storybook:
  Foundations pages for tokens, Design System for components).

  Keep the section order below. You may omit a section that doesn't apply,
  but the ones you keep must stay in this order.

  Validate as you go:
    npx @google/design.md lint design.md
  Print the format spec for Claude Code:
    npx @google/design.md spec --rules
  HTML comments like this one are stripped before AI reads the file.
-->

## Overview

[2–3 sentences: the personality of the system and how it should feel. Intent, not values.]

## Colors

[Name each color in human terms and say when to use it. Values stay in the front matter.]

- **Primary:** [role — e.g. headlines and core text]
- **Secondary:** [role — borders, captions, metadata]
- **Tertiary:** [role — the single accent that drives interaction]
- **Neutral:** [role — page background]
- **Error:** [role — error states only]

## Typography

[Which families carry which jobs, and the rules that tokens can't express.]

- **Headlines:** [family / weight. One h1 per page.]
- **Body:** [family / size — never smaller for prose.]
- **Labels:** [family / case / where allowed.]

## Layout

[Max width, grid, the spacing scale and when to use each step.]

## Elevation & Depth

[How depth is expressed — tonal layers or shadows. State what is NOT allowed.]

## Shapes

[Corner-radius philosophy. Which elements get which radius token.]

## Components

Each component links to its Storybook story — the live reference for every variant and state.
Its token values live in the front matter under the matching key.

### Button

[What it is for. Primary vs secondary rules.]

- **Storybook:** [URL of the Button docs story]
- **Tokens:** button-primary, button-primary-hover, button-secondary
- Disabled: [rule — e.g. 40% opacity, no pointer events]
- Minimum tap target: 44×44px on touch surfaces.

### Card

[What it groups.]

- **Storybook:** [URL]
- **Tokens:** card

### Input

[Rules. Always pair with a visible label.]

- **Storybook:** [URL]
- **Tokens:** input, input-error

## Do's and Don'ts

- Do [rule that protects the system's intent]
- Don't [the most common misuse]
- Do maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Don't [another guardrail]

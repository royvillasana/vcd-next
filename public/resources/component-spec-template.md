# Component Spec — Template

> Course: Design Engineering for UX Designers · Module 06
> One spec per component. Fill every field — **a blank field is a decision you are delegating to AI.**
> Write intent, not just measurements: say *why* a value is what it is and what rule governs it.
> Also ships with the SDD-DE toolkit at `.sdd-de/docs/component-spec-template.md`.

---

Component: [ComponentName]
Purpose: [one sentence — what this component does for the user]

## Visual Properties

- Dimensions: [height rule — prefer padding-based so it grows with content; never a fixed height on text-bearing components]
- Spacing: [padding-inline for each size]
- Typography: [font family, size, weight — reference the type token]
- Colors: [CSS custom properties only — no hex values]
- Border: [width, style, color token]
- Border-radius: [token reference]

## Variants

| Variant | What it signals |
| ------- | --------------- |
| [filled] | [primary action] |
| [outlined] | [secondary action] |
| [ghost] | [tertiary / low emphasis] |

## States

Cover every state. For each one, say what changes and what does not.

| State | What changes |
| ----- | ------------ |
| default | |
| hover | |
| focus | [focus ring: token, width, offset — must be visible on light and dark backgrounds] |
| active | |
| disabled | [e.g. opacity only, color does not change; pointer-events none] |
| loading | [spinner, label, aria-busy, is it still disabled?] |
| error | |

## Sizes

| Size | Height | Padding-inline | Font size |
| ---- | ------ | -------------- | --------- |
| sm | | | |
| md | | | |
| lg | | | |

## Content rules

- Label length: [min / max, truncation behaviour]
- Icons: [position, size, when allowed]
- Empty / long / localized content: [what happens]

## Accessibility

- Element: [correct semantic element — e.g. `<button>`, never `<div>`]
- ARIA: [required attributes]
- Keyboard: [keys that activate / move focus]
- Focus: [focus ring description]
- Contrast: [WCAG 2.2 AA — 4.5:1 text, 3:1 UI components]

## Token references

| Property | Token |
| -------- | ----- |
| Background | `--color-…` |
| Text | `--color-…` |
| Radius | `--radius-…` |
| Spacing | `--spacing-…` |

## Do not

Write the constraint **and** the intent behind it.

- Do not [constraint 1] — because [intent].
- Do not [constraint 2] — because [intent].

## Acceptance criteria

Clear pass / fail conditions for visual QA.

- [ ] Every variant × state renders in Storybook
- [ ] No hardcoded colors, spacing, or radii — tokens only
- [ ] Keyboard operable; focus ring visible
- [ ] No Critical / Serious violations in the Storybook a11y addon

## Tasks

- [ ] [Implementation task 1]
- [ ] [Implementation task 2]
- [ ] Write a Storybook story for every variant

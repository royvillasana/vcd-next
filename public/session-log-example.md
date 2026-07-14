# Vibe Session Log — Completed Example

> A filled-in example so you know what "good" looks like. Yours can be shorter — just be honest.

---

## Session

- **Date:** 2026-07-10
- **Module / task:** Module 03 — build a Button atom in Storybook
- **Tool + model:** Claude Code (model: Claude Opus 4.8)
- **Time spent:** ~45 min

## What I asked for

First prompt (too vague): "make a button component with variants."

Second prompt (after reviewing): "Build a Button React component using our Tailwind tokens.
Variants: primary, secondary, ghost. Sizes: sm, md, lg. States: default, hover, focus-visible
(2px ring, 2px offset, --ring), disabled (40% opacity, not-allowed). Also write a Storybook
stories file covering every variant × state."

## What I got back

The first prompt produced a button with hardcoded hex colors and only primary/secondary — no
focus or disabled state. The second prompt produced a token-referenced component with all three
variants, all sizes, and a stories file with named stories for each state. Focus ring worked when
I tabbed to it in Storybook.

## What worked

- Naming the exact states (focus-visible, disabled) got them implemented on the first try
- Asking for the stories file in the same prompt saved a round trip
- Reviewing in Storybook caught that `ghost` had the wrong hover background — fixed in one correction

## What didn't

- The vague first prompt wasted a generation; I should have started precise
- The `lg` size padding didn't match Figma until I gave the exact px values

## What I'd change next time

- Start from the design.md token names instead of describing colors in the prompt
- Paste the Figma frame screenshot alongside the spec for the visual check

## Something I want to learn

- How to get Claude to generate interaction tests in the stories file, not just visual states

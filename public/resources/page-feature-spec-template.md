# Page / Feature Spec — Template

> Course: Design Engineering for UX Designers · Module 06
> Describes how components compose into a complete page or feature: layout zones, content structure,
> cross-component connections, and system behaviour.
> Component Specs say what each part is; this says where they go and how they work together.

---

Feature: [Name]
Route / entry point: [e.g. /resources, or "Settings → Billing modal"]
Purpose: [one sentence — the user goal this page serves]
Figma: [link to the frame in Dev Mode]

## User story

As a [type of user], I want to [action] so that [outcome].

## Layout zones

Describe the page as named zones, top to bottom.

| Zone | Contains | Component(s) | Notes |
| ---- | -------- | ------------ | ----- |
| Header | | | |
| Main | | | |
| Aside | | | |
| Footer | | | |

- Container: [max-width, horizontal padding token]
- Grid: [columns, gap token]
- Vertical rhythm: [spacing tokens between zones]

## Responsive behaviour

| Breakpoint | Layout change |
| ---------- | ------------- |
| 375px (mobile) | |
| 768px (tablet) | |
| 1440px (desktop) | |

## Content structure

- Heading outline: [one `h1`, then `h2`s — list them]
- Copy: [source of text; tone; character limits]
- Media: [images / icons, alt-text rules]
- Dynamic content: [where it comes from, loading / empty / error states]

## Component inventory

| Component | Spec | Status |
| --------- | ---- | ------ |
| [Button] | specs/button/component-spec.md | existing / new |

Reuse existing components. Never recreate one that already exists.

## System behaviour

- Data: [what is fetched, when, and how failure is shown]
- Navigation: [where each link / action goes]
- State: [what persists between visits — URL, storage, server]
- Permissions: [who can see / do what]

## Page states

- [ ] Loading
- [ ] Empty
- [ ] Error
- [ ] Populated
- [ ] Long content / overflow

## Accessibility

- Landmarks: [`header`, `nav`, `main`, `aside`, `footer`]
- Focus order: [matches visual order; skip link present]
- Page title and heading hierarchy: [rules]

## Do not

- Do not [constraint] — because [intent].

## Acceptance criteria

- [ ] Matches the Figma frame at 375 / 768 / 1440px
- [ ] Every component comes from the existing library and its tokens
- [ ] All page states reachable and verified
- [ ] Keyboard-only walkthrough passes

## Tasks

- [ ] [Implementation task 1]
- [ ] [Implementation task 2]

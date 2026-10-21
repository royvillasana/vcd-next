# Interaction Spec — Template

> Course: Design Engineering for UX Designers · Module 06
> Describes what happens **over time**: triggers, transitions, timing, easing, and edge cases.
> Without it, AI guesses — and the guess is usually wrong. Describe motion so precisely it builds itself.

---

Interaction: [Name — e.g. Form Submit Button]
Component(s): [which Component Specs this behaviour belongs to]
Trigger: [what starts it — click, hover, focus, scroll position, keypress, timer, data arriving]

## Flow

Number every step. Give each one a time offset, what changes visually, and what is announced to assistive tech.

1. [Trigger] → [immediate response] (0ms)
   - Visual: [what changes — label, spinner, colour token]
   - Input: [pointer-events / disabled / aria-busy]
2. [Success path] → [end state] ([duration] [easing])
3. [Failure path] → [end state] ([duration] [easing])

## Timing & easing

| Transition | Property | Duration | Easing | Delay |
| ---------- | -------- | -------- | ------ | ----- |
| [enter] | opacity, transform | 200ms | ease-out | 0 |
| [exit] | opacity | 150ms | ease-in | 0 |

- Use motion tokens where they exist: `--duration-…`, `--ease-…`
- Reduced motion: under `prefers-reduced-motion: reduce`, [replace movement with an instant or opacity-only change]

## Input parity

| Input | Behaviour |
| ----- | --------- |
| Mouse | |
| Touch | [no hover dependency; tap target ≥ 44×44px] |
| Keyboard | [keys, focus order, focus return] |
| Screen reader | [live-region text, role changes] |

## Edge cases

- Double activation before the first completes: [ignore / queue]
- Network timeout at [N]s: [treat as error path]
- Interrupted midway (navigate away, resize, escape): [what happens]
- Rapid repeat / spam: [debounce / throttle]
- Offline / slow connection: [behaviour]

## Do not

- Do not [constraint] — because [intent].

## Acceptance criteria

- [ ] Timing and easing match the table above (verify in DevTools Animations panel)
- [ ] Every edge case is covered by a Storybook story or interaction test
- [ ] Works with keyboard only and with reduced motion on

## Tasks

- [ ] [Implementation task 1]
- [ ] [Implementation task 2]

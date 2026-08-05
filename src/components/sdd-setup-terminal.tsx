"use client";

/**
 * SDD-DE animated setup terminal — a React port of the vanilla web component
 * shipped in the SDD-DE repo (site/terminal.js). It replays the real first-run
 * configuration: typing the npx command, answering the interactive setup
 * questions, then the toolkit unpacking its files. Plays when scrolled into
 * view, loops, and has a replay button. Honors prefers-reduced-motion by
 * rendering the finished transcript instantly with no typing or looping.
 */

import { useEffect, useRef } from "react";

const C = {
  bg: "#141413",
  bar: "#201F1E",
  border: "#33312E",
  text: "#FAF9F0",
  dim: "#B8B5A8",
  muted: "#787569",
  coral: "#56D4C8",
  green: "#9CC79C",
  red: "#E39A9A",
};

type Step =
  | { t: "cmd"; s: string; prompt?: string; promptColor?: string }
  | { t: "out"; text: string; color?: string; pause?: number }
  | { t: "gap" }
  | { t: "sel"; q: string; opts: string[]; choice: number }
  | { t: "txt"; q: string; a: string }
  | { t: "spin"; text: string; done: string; ms: number }
  | { t: "note"; title: string; lines: string[] }
  | { t: "block"; seg: [string, string][] };

// The real `setup` script from the SDD-DE repo (site/terminal.js).
const SETUP: Step[] = [
  { t: "cmd", s: "npx @royvillasana/sdd-de" },
  { t: "gap" },
  { t: "out", text: "┌  SDD-DE  v2.4.1  —  Spec-Driven Development for Design Engineers", color: C.dim, pause: 500 },
  { t: "gap" },
  { t: "sel", q: "Which framework is this project using?", opts: ["React", "Next.js", "Vue 3", "Svelte", "Astro"], choice: 0 },
  { t: "sel", q: "Which language?", opts: ["TypeScript", "JavaScript"], choice: 0 },
  { t: "sel", q: "Where do your components and design specs come from?", opts: ["Figma", "Component Library", "GitHub Repository", "ZIP File", "Google Stitch"], choice: 0 },
  { t: "txt", q: "Figma file URL", a: "https://www.figma.com/design/aBc123/acme-ds" },
  { t: "txt", q: "Figma variable collection name (holds design tokens)", a: "Tokens" },
  { t: "sel", q: "Styling approach  (Tailwind CSS suggested for your choices)", opts: ["Tailwind CSS", "CSS Modules", "SCSS / Sass"], choice: 0 },
  { t: "txt", q: "Design token file path", a: "src/styles/tokens.css" },
  { t: "sel", q: "Test runner", opts: ["Vitest", "Jest", "Playwright", "None"], choice: 0 },
  { t: "gap" },
  { t: "spin", text: "Installing SDD-DE toolkit…", done: "SDD-DE installed", ms: 1400 },
  { t: "spin", text: "Installing @google/design.md CLI…", done: "@google/design.md installed", ms: 1100 },
  { t: "gap" },
  {
    t: "note",
    title: "Project config saved to .sdd-de/project.yaml",
    lines: [
      "Framework:      react",
      "Language:       typescript",
      "Styling:        tailwind",
      "Design source:  Figma  →  figma.com/design/aBc123…",
      "Token file:     src/styles/tokens.css",
      "Test runner:    vitest",
    ],
  },
  { t: "gap" },
  { t: "out", text: "└  Done. Open Claude Code in this directory and run /enrich-brief", color: C.green, pause: 400 },
];

const SPIN_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function SddSetupTerminal({ title = "terminal — your project" }: { title?: string }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const runRef = useRef(0);
  const playRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const wait = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, reduced ? 0 : ms));

    const line = (color?: string) => {
      const el = document.createElement("div");
      if (color) el.style.color = color;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
      return el;
    };

    async function play() {
      const run = (runRef.current += 1);
      const alive = () => run === runRef.current;
      body!.innerHTML = "";

      for (const step of SETUP) {
        if (!alive()) return;

        if (step.t === "gap") {
          line();
          await wait(120);
          continue;
        }

        if (step.t === "cmd") {
          const el = line();
          const p = document.createElement("span");
          p.textContent = (step.prompt || "$") + " ";
          p.style.color = step.promptColor || C.muted;
          const txt = document.createElement("span");
          const caret = document.createElement("span");
          caret.textContent = "▋";
          caret.style.cssText = `color:${C.coral};animation:sddBlink 1s steps(1) infinite;`;
          el.append(p, txt, caret);
          if (reduced) {
            txt.textContent = step.s;
          } else {
            for (const ch of step.s) {
              if (!alive()) return;
              txt.textContent += ch;
              body!.scrollTop = body!.scrollHeight;
              await wait(18 + Math.random() * 30);
            }
          }
          await wait(350);
          caret.remove();
          continue;
        }

        if (step.t === "out") {
          line(step.color || C.text).textContent = step.text;
          await wait(step.pause || 300);
          continue;
        }

        if (step.t === "block") {
          const b = line();
          for (const [text, color] of step.seg) {
            const s = document.createElement("span");
            s.textContent = text;
            s.style.color = color || C.text;
            b.appendChild(s);
          }
          await wait(60);
          continue;
        }

        if (step.t === "sel") {
          const q = line();
          const dot = document.createElement("span");
          dot.textContent = "◆";
          dot.style.color = C.coral;
          const label = document.createElement("span");
          label.textContent = "  " + step.q;
          label.style.color = C.text;
          q.append(dot, label);
          await wait(400);
          const optEls = step.opts.map(() => line(C.muted));
          const paint = (cursor: number) => {
            optEls.forEach((e, idx) => {
              e.textContent = "│  " + (idx === cursor ? "● " : "○ ") + step.opts[idx];
              e.style.color = idx === cursor ? C.text : C.muted;
            });
          };
          paint(-1);
          for (let c = 0; c <= step.choice; c++) {
            if (!alive()) return;
            paint(c);
            await wait(reduced ? 0 : 280);
          }
          await wait(350);
          optEls.forEach((e) => e.remove());
          const ans = line(C.green);
          ans.textContent = "│  ● " + step.opts[step.choice];
          await wait(250);
          continue;
        }

        if (step.t === "txt") {
          const q = line();
          const dot = document.createElement("span");
          dot.textContent = "◆";
          dot.style.color = C.coral;
          const label = document.createElement("span");
          label.textContent = "  " + step.q;
          label.style.color = C.text;
          q.append(dot, label);
          await wait(300);
          const al = line(C.green);
          al.textContent = "│  ";
          if (reduced) {
            al.textContent = "│  " + step.a;
          } else {
            for (const ch of step.a) {
              if (!alive()) return;
              al.textContent += ch;
              body!.scrollTop = body!.scrollHeight;
              await wait(10 + Math.random() * 16);
            }
          }
          await wait(280);
          continue;
        }

        if (step.t === "spin") {
          const sl = line(C.dim);
          if (reduced) {
            sl.textContent = "✓ " + step.done;
            sl.style.color = C.green;
            await wait(0);
            continue;
          }
          let f = 0;
          const start = Date.now();
          while (Date.now() - start < step.ms) {
            if (!alive()) return;
            sl.textContent = SPIN_FRAMES[f++ % SPIN_FRAMES.length] + " " + step.text;
            await wait(70);
          }
          sl.textContent = "✓ " + step.done;
          sl.style.color = C.green;
          await wait(250);
          continue;
        }

        if (step.t === "note") {
          line(C.dim).textContent = "┌  " + step.title;
          for (const l of step.lines) {
            if (!alive()) return;
            line(C.text).textContent = "│  " + l;
            await wait(90);
          }
          line(C.dim).textContent = "└";
          await wait(300);
          continue;
        }
      }

      if (reduced) return; // no loop under reduced motion
      await wait(4500);
      if (alive()) play();
    }

    playRef.current = () => play();

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            play();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(body);

    return () => {
      io.disconnect();
      runRef.current += 1; // cancel any in-flight loop
    };
  }, []);

  const replay = () => playRef.current?.();

  return (
    <div className="mb-[18px]">
      <div
        className="overflow-hidden rounded-[18px] border-[3px] border-[#191510] shadow-[4px_4px_0_#191510]"
        style={{ background: C.bg, fontFamily: "var(--font-mono), ui-monospace, monospace" }}
      >
        {/* Title bar with traffic lights (matches the course code blocks) */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b-[3px] border-[#191510]"
          style={{ background: C.bar }}
        >
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px]" style={{ color: C.muted }}>
            {title}
          </span>
          <button
            type="button"
            onClick={replay}
            aria-label="Replay the setup animation"
            className="ml-auto rounded-md border px-2.5 py-[3px] text-[11px] transition-colors"
            style={{ borderColor: C.border, color: C.muted }}
          >
            ↻ replay
          </button>
        </div>

        <div
          ref={bodyRef}
          aria-hidden="true"
          className="px-5 py-[18px] text-[13px] leading-[1.75] overflow-y-auto whitespace-pre-wrap break-words"
          style={{ color: C.text, height: 420 }}
        />
      </div>
      <p className="mt-2 text-[13px] font-medium opacity-60">
        The real first run of{" "}
        <span className="font-mono">npx @royvillasana/sdd-de</span> — it asks about your
        project, then unpacks the toolkit. Animation, not a live terminal.
      </p>
    </div>
  );
}

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

/* ─── Phase data ─── */
const phases = [
  {
    num: "00",
    name: "Foundation",
    desc: "Understand the design-engineering mindset and set up your workflow.",
    bg: "#F0E5D3",
    text: "#191510",
    tilt: "-1.5deg",
    modules: "1 module",
  },
  {
    num: "01",
    name: "Read the Stack",
    desc: "Learn to read code like a designer — Figma, Storybook, and design.md.",
    bg: "#DBEAFE",
    text: "#191510",
    tilt: "1deg",
    modules: "5 modules",
  },
  {
    num: "02",
    name: "Write Specs",
    desc: "Translate design decisions into precise, AI-readable specifications.",
    bg: "#B9A5FF",
    text: "#191510",
    tilt: "-0.8deg",
    modules: "1 module",
  },
  {
    num: "03",
    name: "Build with AI",
    desc: "Run your first AI coding sessions, build components, and sync with design.",
    bg: "#6FE3A5",
    text: "#191510",
    tilt: "1.2deg",
    modules: "3 modules",
  },
  {
    num: "04",
    name: "Ship It",
    desc: "Navigate code review, deploy to production, and close the design-dev loop.",
    bg: "#FFC933",
    text: "#191510",
    tilt: "-0.5deg",
    modules: "2 modules",
  },
];

/* ─── Pipeline items ─── */
const pipeline = [
  "Figma components with token-connected styles",
  "Storybook for isolated component testing",
  "design.md as the single source of truth",
  "CLAUDE.md to prime every AI session",
  "Claude Code for AI-assisted implementation",
  "Git + PR workflow for clean shipping",
  "Vercel for continuous deployment",
];

/* ─── Spec types ─── */
const specTypes = [
  {
    num: "01",
    title: "Component Spec",
    desc: "Props, variants, states, and design tokens for every reusable UI element.",
    hoverBg: "#FFC933",
    tilt: "-0.6deg",
  },
  {
    num: "02",
    title: "Interaction Spec",
    desc: "Triggers, transitions, timing, and easing that describe how things move.",
    hoverBg: "#B9A5FF",
    tilt: "0.6deg",
  },
  {
    num: "03",
    title: "Page / Feature Spec",
    desc: "Layout zones, content structure, and full-system behaviour patterns.",
    hoverBg: "#6FE3A5",
    tilt: "-0.4deg",
  },
];

/* ─── Marquee items ─── */
const marqueeItems = [
  "Figma",
  "✦",
  "Claude Code",
  "✦",
  "Storybook",
  "✦",
  "design.md",
  "✦",
  "CLAUDE.md",
  "✦",
  "SDD-DE",
  "✦",
  "Git",
  "✦",
  "Vercel",
  "✦",
  "Specs",
  "✦",
  "Tokens",
  "✦",
  "Components",
  "✦",
  "Ship It",
];

export default function Home() {
  const marqueeContent = marqueeItems.map((item, i) => (
    <span
      key={i}
      className="text-[#FAF3E7] font-extrabold text-[20px] tracking-wide mx-4"
    >
      {item}
    </span>
  ));

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── 1. SiteNav ─── */}
      <SiteNav />

      {/* ─── 2. Hero Section ─── */}
      <section className="max-w-[1240px] mx-auto px-7 pt-[72px] pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — text content */}
          <div>
            {/* Kicker badge */}
            <div
              className="inline-block font-mono text-[13px] font-bold uppercase tracking-[0.14em] bg-[var(--accent-yellow)] border-[2px] border-[#191510] rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0_#191510] -rotate-[1.5deg] mb-8 animate-[vcd-pop_500ms_ease-out_both]"
            >
              ITX UX · AI Workshop · 5 phases
            </div>

            {/* H1 */}
            <h1
              className="text-[clamp(52px,7vw,100px)] leading-[0.95] tracking-[-0.04em] font-extrabold animate-[vcd-pop_600ms_ease-out_100ms_both]"
            >
              From design to{" "}
              <span
                className="inline-block bg-[var(--brand)] text-[#FAF3E7] px-[18px] pb-1.5 rounded-[18px] -rotate-2 border-[3px] border-[#191510] shadow-[5px_5px_0_#191510]"
              >
                production code
              </span>
              <br />
              with AI.
            </h1>

            {/* Subtitle */}
            <p className="text-[21px] leading-[1.55] max-w-[560px] mt-8 mb-10 font-medium animate-[vcd-pop_600ms_ease-out_200ms_both]">
              The hands-on design engineering course that takes UX designers
              from Figma frames to{" "}
              <span className="border-b-[4px] border-[var(--accent-yellow)]">
                production code
              </span>{" "}
              — with Claude Code as your engineering partner. Read the stack, write real specs, ship it.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap animate-[vcd-pop_600ms_ease-out_300ms_both]">
              <Link
                href="#journey"
                className="inline-flex items-center gap-2.5 px-8 py-[18px] bg-foreground text-background rounded-full text-[18px] font-extrabold border-[3px] border-[#191510] shadow-[5px_5px_0_var(--brand)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-[120ms]"
              >
                How it works ↓
              </Link>
              <span className="font-[family-name:var(--font-caveat)] text-[23px] font-bold -rotate-[4deg] ml-2">
                ~40 hrs, at your pace
              </span>
            </div>
          </div>

          {/* Right — GIF card with floating stickers centered vertically */}
          <div className="relative hidden lg:flex items-center justify-center animate-[vcd-pop_600ms_ease-out_200ms_both] min-h-[420px]">
            {/* GIF card */}
            <div className="border-[3px] border-[#191510] rounded-[24px] bg-[var(--accent-yellow)] shadow-[8px_8px_0_#191510] overflow-hidden rotate-[2deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-demo.gif"
                alt="Designer using Figma with AI coding tools to build production components"
                className="w-full h-auto block"
              />
            </div>

            {/* Floating stickers — positioned relative to the centered card */}
            {/* Sticker 1 — purple, top-right */}
            <div
              className="absolute -top-2 -right-3 bg-[#7B5CFF] text-[#FAF3E7] font-mono text-[13px] font-bold px-4 py-2 rounded-full border-[3px] border-[#191510] shadow-[4px_4px_0_#191510] rotate-[8deg] animate-[vcd-float_5s_ease-in-out_infinite] z-10"
            >
              13 modules ✳
            </div>
            {/* Sticker 2 — green, mid-right */}
            <div
              className="absolute top-[45%] -right-8 bg-[#1FA45B] text-[#FAF3E7] font-mono text-[13px] font-bold px-4 py-2 rounded-full border-[3px] border-[#191510] shadow-[4px_4px_0_#191510] -rotate-[6deg] z-10"
              style={{ animation: "vcd-float 6s ease-in-out 0.5s infinite" }}
            >
              no CS degree needed
            </div>
            {/* Sticker 3 — white handwritten, bottom-left */}
            <div
              className="absolute bottom-4 -left-6 bg-white text-[#191510] font-[family-name:var(--font-caveat)] text-[22px] font-bold px-5 py-2.5 rounded-2xl border-[3px] border-[#191510] shadow-[4px_4px_0_#191510] rotate-[4deg] z-10"
              style={{ animation: "vcd-float 5.5s ease-in-out 1s infinite" }}
            >
              you already speak spec ✏️
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Marquee Strip ─── */}
      <div className="border-t-[3px] border-b-[3px] border-[#191510] bg-[var(--brand)] -rotate-1 scale-[1.02] my-10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[vcd-marquee_25s_linear_infinite] w-max py-3">
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>

      {/* ─── 4. Journey Section ─── */}
      <section id="journey" className="max-w-[1240px] mx-auto px-7 pt-8 pb-[88px] w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-9">
          <h2 className="text-[52px] font-extrabold tracking-[-0.03em]">
            The journey<span className="text-[var(--brand)]">.</span>
          </h2>
          <span className="font-[family-name:var(--font-caveat)] text-[26px] font-bold -rotate-2">
            5 phases → each unlocks the next ↴
          </span>
        </div>

        {/* Phase cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {phases.map((phase) => (
            <Link
              key={phase.num}
              href={`/curriculum#phase${phase.num}`}
              className="group block"
            >
              <div
                className="border-[3px] border-[#191510] rounded-[22px] p-[22px_20px_24px] shadow-[5px_5px_0_#191510] transition-all duration-[140ms] group-hover:translate-y-[-6px] group-hover:shadow-[7px_7px_0_#191510] h-full"
                style={{
                  backgroundColor: phase.bg,
                  color: phase.text,
                  transform: `rotate(${phase.tilt})`,
                }}
              >
                <div className="text-[96px] font-extrabold leading-[0.8] tracking-[-0.06em] opacity-90 tabular-nums">
                  {phase.num}
                </div>
                <div className="font-extrabold text-[19px] mb-2 mt-2">
                  {phase.name}
                </div>
                <p className="text-[13.5px] leading-[1.5] opacity-85 font-medium mb-4">
                  {phase.desc}
                </p>
                <span className="inline-block font-mono text-[11px] font-bold border-[2px] border-current rounded-full px-3 py-1">
                  {phase.modules}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 5. Dark "What you'll master" Section ─── */}
      <section className="bg-[#191510] text-[#FAF3E7] border-t-[3px] border-[#191510]">
        <div className="max-w-[1240px] mx-auto px-7 py-[88px] grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left column — Pipeline */}
          <div>
            <h2 className="text-[44px] font-extrabold tracking-[-0.03em] mb-2">
              What you&apos;ll{" "}
              <span className="text-[var(--accent-yellow)]">master</span>
            </h2>
            <p className="text-[17px] text-[#FAF3E7]/65 mb-9">
              A complete, end-to-end design-to-code pipeline using industry
              tools.
            </p>
            <ul className="space-y-3">
              {pipeline.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 bg-[#FAF3E7]/[0.06] border-[2px] border-[#FAF3E7]/[0.15] rounded-[14px] px-[18px] py-[13px] hover:border-[var(--accent-yellow)] hover:translate-x-1.5 transition-all duration-[140ms]"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--accent-yellow)] border-[2px] border-[#191510] flex items-center justify-center shrink-0">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="#191510"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[15px] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — 3 Spec Types */}
          <div>
            <h2 className="text-[44px] font-extrabold tracking-[-0.03em] mb-2">
              3 spec types<span className="text-[var(--brand)]">.</span>
            </h2>
            <p className="text-[17px] text-[#FAF3E7]/65 mb-9">
              Learn to write precise specs that AI can actually act on.
            </p>
            <div className="space-y-4">
              {specTypes.map((s) => (
                <div
                  key={s.num}
                  className="group/spec border-[3px] border-[#FAF3E7] rounded-[20px] px-[26px] py-6 flex gap-6 items-center transition-all duration-[140ms] hover:scale-[1.02] hover:shadow-[5px_5px_0_#FAF3E7]"
                  style={{
                    transform: `rotate(${s.tilt})`,
                  }}
                >
                  <div className="text-[64px] font-extrabold opacity-35 tabular-nums leading-none shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <div className="font-extrabold text-[20px] mb-1">
                      {s.title}
                    </div>
                    <p className="text-[14.5px] opacity-75 leading-[1.5]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Start-the-path CTA band ─── */}
      <section className="w-full border-t-[3px] border-[#191510] bg-[var(--accent-yellow)]">
        <div className="max-w-[1240px] mx-auto px-7 py-24 text-center">
          <h2 className="text-[clamp(34px,5vw,58px)] font-extrabold tracking-[-0.035em] leading-[1.12] max-w-[720px] mx-auto mb-4">
            You&apos;ve seen how it works.
            <br />
            Now{" "}
            <span className="bg-[var(--brand)] text-[#FAF3E7] px-2 box-decoration-clone">
              build it for real
            </span>
            .
          </h2>
          <p className="text-[18px] leading-[1.6] font-medium max-w-[520px] mx-auto mb-9 text-[#191510]/75">
            Start the learning path and go from Figma frames to production code,
            one module at a time.
          </p>
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2.5 px-9 py-[18px] bg-foreground text-background rounded-full text-[18px] font-extrabold border-[3px] border-[#191510] shadow-[5px_5px_0_var(--brand)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-[120ms]"
          >
            Start the learning path →
          </Link>
          <p className="mt-6 text-[13.5px] font-medium text-[#191510]/55">
            Built with the exact method it teaches — every page, component, and spec.
          </p>
        </div>
      </section>

      {/* ─── 7. Footer ─── */}
      <footer className="border-t-[3px] border-[#191510]">
        <div className="max-w-[1240px] mx-auto px-7 py-12 flex items-center justify-between text-xs text-muted-foreground">
          <span>Design Engineering for UX Designers — ITX UX AI Workshop</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

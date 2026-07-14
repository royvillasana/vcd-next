"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Term = {
  term: string;
  cat: "Code" | "Specs" | "Tools" | "Shipping";
  def: string;
  figma: string;
};

const allTerms: Term[] = [
  { term: "Vibe coding", cat: "Specs", def: "AI-assisted development where your design precision is the input. You describe with spec-level exactness; AI implements.", figma: "= designing with words" },
  { term: "SDD", cat: "Specs", def: "Spec-Driven Development. The spec is the contract \u2014 not the screenshot, not the vibe.", figma: "= your source of truth" },
  { term: "Component Spec", cat: "Specs", def: "A structured description of one reusable element: props, variants, states, and tokens.", figma: "= component description, formalized" },
  { term: "design.md", cat: "Specs", def: "The canonical design document in the repo \u2014 tokens, type scale, spacing, component inventory.", figma: "= your Figma cover page, but executable" },
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

/* ------------------------------------------------------------------ */
/*  Category colour map                                                */
/* ------------------------------------------------------------------ */

const catColors: Record<Term["cat"], { bg: string; text: string }> = {
  Code:     { bg: "#2545D3", text: "#FAF3E7" },
  Specs:    { bg: "#B9A5FF", text: "#191510" },
  Tools:    { bg: "#6FE3A5", text: "#191510" },
  Shipping: { bg: "#FF4D24", text: "#FAF3E7" },
};

const chipColors: Record<string, { bg: string; text: string }> = {
  All:      { bg: "#191510", text: "#FAF3E7" },
  Code:     { bg: "#2545D3", text: "#FAF3E7" },
  Specs:    { bg: "#7B5CFF", text: "#FAF3E7" },
  Tools:    { bg: "#1FA45B", text: "#FAF3E7" },
  Shipping: { bg: "#FF4D24", text: "#FAF3E7" },
};

const categories = ["All", "Code", "Specs", "Tools", "Shipping"] as const;

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = allTerms
    .filter((t) => {
      const matchesCat = activeCat === "All" || t.cat === activeCat;
      const matchesQuery =
        query.trim() === "" ||
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.def.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <main className="max-w-[1240px] mx-auto px-7 py-12 w-full">
        {/* ── Header ── */}
        <div className="mb-14">
          {/* Kicker badge */}
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] bg-[#2545D3] text-[#FAF3E7] border-[2px] border-[#191510] rounded-lg px-3 py-1.5 shadow-[3px_3px_0_#191510] -rotate-[1.5deg] mb-6">
            Speak the language
          </span>

          {/* H1 */}
          <h1 className="text-[clamp(56px,7vw,88px)] font-extrabold tracking-[-0.04em] leading-[0.95] mb-4">
            The Glossary
            <span className="text-[var(--brand)]">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[19px] leading-[1.6] max-w-[560px] font-medium mb-7">
            Every term you&apos;ll meet in the course, translated from
            dev-speak into designer-speak.{" "}
            <span className="font-[family-name:var(--font-caveat)] text-[#1FA45B] text-[21px]">
              most of these you already know &#x2713;
            </span>
          </p>
        </div>

        {/* ── Filter bar ── */}
        <div className="flex items-center gap-3.5 flex-wrap mb-10">
          {/* Search input */}
          <div className="flex items-center gap-2.5 bg-white border-[3px] border-[#191510] rounded-full px-5 py-2.5 shadow-[3px_3px_0_#191510] w-[340px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#191510"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 opacity-50"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter terms\u2026"
              className="flex-1 border-none outline-none bg-transparent text-[15px] font-semibold placeholder:text-[#191510]/40"
            />
          </div>

          {/* Category chips */}
          {categories.map((cat) => {
            const isActive = activeCat === cat;
            const colors = chipColors[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className="px-[18px] py-2.5 rounded-full border-[2px] border-[#191510] font-bold text-sm cursor-pointer shadow-[2px_2px_0_#191510] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-[120ms]"
                style={{
                  backgroundColor: isActive ? colors.bg : "#FFFFFF",
                  color: isActive ? colors.text : "#191510",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Terms list ── */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3.5 max-w-[820px]">
            {filtered.map((t) => {
              const colors = catColors[t.cat];
              const firstLetter = t.term[0].toUpperCase();
              return (
                <div
                  key={t.term}
                  className="border-[3px] border-[#191510] rounded-[18px] bg-white p-5 shadow-[4px_4px_0_#191510] flex items-start gap-5 hover:-translate-y-1 transition-transform duration-[140ms]"
                >
                  {/* Letter square */}
                  <span
                    className="w-[42px] h-[42px] shrink-0 rounded-xl border-[3px] border-[#191510] flex items-center justify-center font-extrabold text-[19px] -rotate-[4deg]"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {firstLetter}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Term + category */}
                    <div className="flex items-center gap-3 flex-wrap mb-1.5">
                      <h2 className="font-extrabold text-[20px] tracking-[-0.01em]">
                        {t.term}
                      </h2>
                      <span
                        className="font-mono text-[11px] font-bold border-[2px] border-[#191510] rounded-md px-2.5 py-[3px]"
                        style={{ backgroundColor: colors.bg, color: colors.text }}
                      >
                        {t.cat}
                      </span>
                    </div>

                    {/* Definition */}
                    <p className="text-[15px] leading-[1.55] opacity-75 font-medium">
                      {t.def}
                    </p>

                    {/* Figma equivalent */}
                    <p className="font-[family-name:var(--font-caveat)] text-[18px] font-bold text-[#7B5CFF] mt-1.5">
                      {t.figma}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── No results ── */
          <div className="text-center py-[60px] px-5">
            <p className="text-[44px] mb-3">&#x1F937;</p>
            <p className="font-extrabold text-[22px] mb-2">
              Nothing matches &lsquo;{query}&rsquo;
            </p>
            <p className="text-[15px] opacity-60 font-medium">
              Try a different search or pick another category.
            </p>
          </div>
        )}
      </main>

      {/* ── Dark footer ── */}
      <footer className="mt-auto bg-[#191510] text-[#FAF3E7]">
        <div className="max-w-[1240px] mx-auto px-7 py-9 flex justify-between items-center flex-wrap gap-5">
          {/* Left */}
          <span className="text-sm font-semibold">
            Design Engineering for UX Designers — ITX UX AI Workshop
          </span>

          {/* Right */}
          <nav className="flex items-center gap-5">
            <Link
              href="/curriculum"
              className="text-sm text-[#FAF3E7]/70 hover:text-[#FFC933] transition-colors"
            >
              Syllabus
            </Link>
            <Link
              href="/resources"
              className="text-sm text-[#FAF3E7]/70 hover:text-[#FFC933] transition-colors"
            >
              Resources
            </Link>
            <span className="font-mono text-xs opacity-50">&copy; 2026</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}

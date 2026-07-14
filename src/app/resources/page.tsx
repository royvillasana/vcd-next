import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export const metadata = {
  title: "Resources — Design Engineering for UX Designers",
  description:
    "Templates, starters, and checklists from the Design Engineering for UX Designers course.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Resource = {
  type: string;
  meta: string;
  title: string;
  desc: string;
};

type ResourceGroup = {
  icon: string;
  color: string;
  shadow: string;
  heading: string;
  note: string;
  items: Resource[];
};

const groups: ResourceGroup[] = [
  {
    icon: "📐",
    color: "#FFC933",
    shadow: "#FF4D24",
    heading: "Spec templates",
    note: "the big three",
    items: [
      {
        type: ".MD",
        meta: "Module 06",
        title: "Component Spec template",
        desc: "Props, variants, states, and token references — the fill-in-the-blanks structure AI can act on.",
      },
      {
        type: ".MD",
        meta: "Module 06",
        title: "Interaction Spec template",
        desc: "Triggers, transitions, timing, and easing. Describe motion so precisely it builds itself.",
      },
      {
        type: ".MD",
        meta: "Module 06",
        title: "Page / Feature Spec template",
        desc: "Layout zones, content structure, and system behaviour for whole pages and features.",
      },
    ],
  },
  {
    icon: "🤖",
    color: "#B9A5FF",
    shadow: "#7B5CFF",
    heading: "AI context starters",
    note: "prime every session",
    items: [
      {
        type: ".MD",
        meta: "Module 04",
        title: "design.md starter",
        desc: "The canonical design document — tokens, type scale, spacing, and component inventory, pre-structured.",
      },
      {
        type: ".MD",
        meta: "Module 05",
        title: "CLAUDE.md starter",
        desc: "The context file that loads your design rules into every Claude Code session automatically.",
      },
      {
        type: ".MD",
        meta: "Module 00",
        title: "Vibe Session Log template",
        desc: "One page per session: what you asked, what you got, what you\u2019d change. Your course-long artifact.",
      },
    ],
  },
  {
    icon: "✅",
    color: "#6FE3A5",
    shadow: "#1FA45B",
    heading: "Checklists",
    note: "print & pin these",
    items: [
      {
        type: ".PDF",
        meta: "Module 00",
        title: "Prompt precision checklist",
        desc: "Ten questions to run before you hit enter. If AI has to guess, the prompt isn\u2019t done.",
      },
      {
        type: ".PDF",
        meta: "Module 10",
        title: "PR review checklist for designers",
        desc: "What to look for in a pull request when you\u2019re the design eye in the room.",
      },
      {
        type: ".PDF",
        meta: "Module 11",
        title: "Pre-deploy QA checklist",
        desc: "States, breakpoints, keyboard nav, and tokens — verify before it ships, not after.",
      },
    ],
  },
];

/* Curated external references (VC-007) */
type LibraryItem = { cat: string; title: string; by: string; desc: string; href: string };

const library: LibraryItem[] = [
  {
    cat: "Book",
    title: "Design Engineering Handbook",
    by: "InVision — Natalya Shelburne et al.",
    desc: "The first book-length definition of design engineering. Start here.",
    href: "https://uxlib.net/onlinebooks/design-engineering/index.html",
  },
  {
    cat: "Essay",
    title: "The Case for Design Engineers",
    by: "Jim Nielsen",
    desc: "Why the discipline exists and what a design engineer actually does day to day.",
    href: "https://blog.jim-nielsen.com/2022/the-case-for-design-engineers/",
  },
  {
    cat: "Reference",
    title: "Maggie Appleton — Design Engineering",
    by: "maggieappleton.com",
    desc: "A curated look at what design engineering looks like in practice.",
    href: "https://maggieappleton.com/design-engineering",
  },
  {
    cat: "Tool",
    title: "Storybook",
    by: "storybook.js.org",
    desc: "The component workshop used throughout this course.",
    href: "https://storybook.js.org",
  },
  {
    cat: "Tool",
    title: "Figma Dev Mode + MCP",
    by: "figma.com",
    desc: "How Figma exposes layers, tokens, and auto-layout to Claude Code.",
    href: "https://www.figma.com/dev-mode/",
  },
  {
    cat: "Reference",
    title: "WCAG 2.2 AA Quick Reference",
    by: "w3.org",
    desc: "The accessibility standard that is the default for all ITX work.",
    href: "https://www.w3.org/WAI/WCAG22/quickref/",
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function LibraryCard({ item }: { item: LibraryItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-[20px] border-[3px] border-[#191510] bg-white p-[22px] shadow-[4px_4px_0_#191510] transition-transform duration-[140ms] hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-md border-[2px] border-[#191510] bg-[#B9A5FF] px-2.5 py-[3px] font-mono text-[11px] font-bold">
          {item.cat}
        </span>
        <span className="font-mono text-[11px] opacity-40 transition-opacity group-hover:opacity-80">
          Open ↗
        </span>
      </div>
      <h3 className="mt-1 text-[18px] font-extrabold tracking-[-0.01em] group-hover:underline underline-offset-2">
        {item.title}
      </h3>
      <p className="font-mono text-[11.5px] opacity-55">{item.by}</p>
      <p className="text-sm font-medium leading-[1.55] opacity-70">{item.desc}</p>
    </a>
  );
}

function ResourceCard({
  item,
  groupColor,
  groupShadow,
}: {
  item: Resource;
  groupColor: string;
  groupShadow: string;
}) {
  return (
    <div className="border-[3px] border-[#191510] rounded-[20px] bg-white p-[22px] shadow-[4px_4px_0_#191510] flex flex-col gap-3 hover:-translate-y-1 hover:-rotate-[0.5deg] transition-transform duration-[140ms]">
      {/* Top row */}
      <div className="flex justify-between items-center">
        <span
          className="font-mono text-[11px] font-bold border-[2px] border-[#191510] rounded-md px-2.5 py-[3px]"
          style={{ backgroundColor: groupColor }}
        >
          {item.type}
        </span>
        <span className="font-mono text-[11px] opacity-50">{item.meta}</span>
      </div>

      {/* Title */}
      <h3 className="font-extrabold text-[18px] tracking-[-0.01em]">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-[1.55] opacity-70 font-medium flex-1">
        {item.desc}
      </p>

      {/* CTA */}
      <button
        type="button"
        className="self-start inline-flex items-center gap-2 px-[18px] py-2.5 bg-[#191510] text-[#FAF3E7] rounded-full text-sm font-extrabold border-[2px] border-[#191510] transition-all duration-[120ms] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
        style={{
          boxShadow: `3px 3px 0 ${groupShadow}`,
        }}
      >
        Download ⤓
      </button>
    </div>
  );
}

function GroupSection({ group }: { group: ResourceGroup }) {
  return (
    <section className="mb-14">
      {/* Group header */}
      <div className="flex items-center gap-4 mb-5.5">
        {/* Icon square */}
        <div
          className="w-10 h-10 rounded-xl border-[3px] border-[#191510] flex items-center justify-center text-[19px] -rotate-3"
          style={{
            backgroundColor: group.color,
            boxShadow: `3px 3px 0 ${group.shadow}`,
          }}
        >
          {group.icon}
        </div>

        {/* Title */}
        <h2 className="text-[30px] font-extrabold tracking-[-0.025em]">
          {group.heading}
        </h2>

        {/* Caveat note */}
        <span className="font-[family-name:var(--font-caveat)] text-[21px] font-bold text-[#7B5CFF]">
          {group.note}
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {group.items.map((item) => (
          <ResourceCard
            key={item.title}
            item={item}
            groupColor={group.color}
            groupShadow={group.shadow}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <main className="max-w-[1240px] mx-auto px-7 py-12 w-full">
        {/* ── Header ── */}
        <div className="mb-14">
          {/* Kicker badge */}
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] bg-[#1FA45B] text-[#FAF3E7] border-[2px] border-[#191510] rounded-lg px-3 py-1.5 shadow-[3px_3px_0_#191510] -rotate-[1.5deg] mb-6">
            Grab &amp; go &middot; all free
          </span>

          {/* H1 */}
          <h1 className="text-[clamp(56px,7vw,88px)] font-extrabold tracking-[-0.04em] leading-[0.95] mb-4">
            The Toolbox
            <span className="text-[var(--brand)]">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[19px] leading-[1.6] max-w-[560px] font-medium">
            Every template, context file, and checklist from the course —
            download once, reuse forever.{" "}
            <span className="font-[family-name:var(--font-caveat)] text-[#2545D3] text-[21px]">
              steal these, seriously ↓
            </span>
          </p>
        </div>

        {/* ── Resource groups ── */}
        {groups.map((group) => (
          <GroupSection key={group.heading} group={group} />
        ))}

        {/* ── Training Resources library (VC-007) ── */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-5.5 flex-wrap">
            <div
              className="w-10 h-10 rounded-xl border-[3px] border-[#191510] flex items-center justify-center text-[19px] -rotate-3"
              style={{ backgroundColor: "#B9A5FF", boxShadow: "3px 3px 0 #7B5CFF" }}
            >
              📚
            </div>
            <h2 className="text-[30px] font-extrabold tracking-[-0.025em]">
              Training Resources
            </h2>
            <span className="font-[family-name:var(--font-caveat)] text-[21px] font-bold text-[#7B5CFF]">
              books, essays &amp; tools
            </span>
          </div>
          <p className="text-[15px] font-medium opacity-70 mb-6 max-w-[640px]">
            Curated reading and reference beyond the course itself — kept inside the
            course so everything lives in one place. Start with the InVision
            Design Engineering Handbook.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {library.map((item) => (
              <LibraryCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        {/* ── Official ITX tooling (VC-008 / VC-019) ── */}
        <section className="mb-14">
          <div className="flex items-center gap-4 mb-5.5 flex-wrap">
            <div
              className="w-10 h-10 rounded-xl border-[3px] border-[#191510] flex items-center justify-center text-[19px] -rotate-3"
              style={{ backgroundColor: "#6FE3A5", boxShadow: "3px 3px 0 #1FA45B" }}
            >
              🛠️
            </div>
            <h2 className="text-[30px] font-extrabold tracking-[-0.025em]">
              Official ITX Tooling
            </h2>
            <span className="font-[family-name:var(--font-caveat)] text-[21px] font-bold text-[#1FA45B]">
              what we support
            </span>
          </div>
          <div className="grid grid-cols-1 gap-[18px]">
            <div className="rounded-[20px] border-[3px] border-[#191510] bg-white p-6 shadow-[4px_4px_0_#191510]">
              <h3 className="text-[19px] font-extrabold mb-2">Claude Code — primary AI coding tool</h3>
              <p className="text-sm font-medium leading-[1.6] opacity-75">
                Claude Code is the officially supported AI coding tool for this course
                and for ITX design engineering work. The supported workflow is:
                load context (design.md + CLAUDE.md) → write a precise spec → generate →
                review in Storybook → QA. Expect to own the design decisions; the AI is
                the tool, not the author. All work stays in your local environment.
              </p>
            </div>
          </div>
        </section>

        {/* ── Missing something? ── */}
        <div className="border-[3px] border-dashed border-[#191510] rounded-[22px] bg-[#FFF6DE] p-7 px-8 flex items-center justify-between gap-6 flex-wrap mt-4 mb-4">
          <div>
            <p className="font-extrabold text-[22px]">Missing something?</p>
            <p className="text-[15px] opacity-70 font-medium">
              We add new resources every cohort. Let us know what would help.
            </p>
          </div>
          <button
            type="button"
            className="bg-[#7B5CFF] text-[#FAF3E7] rounded-full border-[3px] border-[#191510] shadow-[4px_4px_0_#191510] font-extrabold px-6 py-3 text-[15px] transition-all duration-[120ms] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            Request a resource →
          </button>
        </div>
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
              href="/glossary"
              className="text-sm text-[#FAF3E7]/70 hover:text-[#FFC933] transition-colors"
            >
              Glossary
            </Link>
            <span className="font-mono text-xs opacity-50">&copy; 2026</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}

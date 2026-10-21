import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import {
  groups,
  library,
  type LibraryItem,
  type Resource,
  type ResourceGroup,
} from "@/lib/resources-data";

export const metadata = {
  title: "Resources — Design Engineering for UX Designers",
  description:
    "Templates, starters, and checklists from the Design Engineering for UX Designers course.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const requestHref = `mailto:rvillasana@itx.com?subject=${encodeURIComponent(
  "Resource request — Design Engineering for UX Designers",
)}&body=${encodeURIComponent(
  "Hi,\n\nI'd like to request a resource for the course.\n\nWhat I need:\n\nWhich module it relates to:\n\nWhy it would help:\n\nThanks!",
)}`;

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function LibraryCard({ item }: { item: LibraryItem }) {
  return (
    <li className="flex">
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full flex-col gap-2 rounded-[20px] border-[3px] border-[#191510] bg-white p-[22px] shadow-[4px_4px_0_#191510] transition-transform duration-[140ms] hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-md border-[2px] border-[#191510] bg-[#B9A5FF] px-2.5 py-[3px] font-mono text-[11px] font-bold">
          {item.cat}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-[11px] opacity-70 transition-opacity group-hover:opacity-100"
        >
          Open ↗
        </span>
      </div>
      <h3 className="mt-1 text-[18px] font-extrabold tracking-[-0.01em] group-hover:underline underline-offset-2">
        {item.title}
        <span className="sr-only"> (opens in a new tab)</span>
      </h3>
      <p className="font-mono text-[11.5px] opacity-75">{item.by}</p>
      <p className="text-sm font-medium leading-[1.55] opacity-70">{item.desc}</p>
    </a>
    </li>
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
    <li className="border-[3px] border-[#191510] rounded-[20px] bg-white p-[22px] shadow-[4px_4px_0_#191510] flex flex-col gap-3 hover:-translate-y-1 hover:-rotate-[0.5deg] transition-transform duration-[140ms]">
      {/* Top row */}
      <div className="flex justify-between items-center">
        <span
          className="font-mono text-[11px] font-bold border-[2px] border-[#191510] rounded-md px-2.5 py-[3px]"
          style={{ backgroundColor: groupColor }}
        >
          {item.type}
        </span>
        <span className="font-mono text-[11px] opacity-75">{item.meta}</span>
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
      <a
        href={item.href}
        download={item.file}
        className="self-start inline-flex items-center gap-2 px-[18px] py-2.5 bg-[#191510] text-[#FAF3E7] rounded-full text-sm font-extrabold border-[2px] border-[#191510] transition-all duration-[120ms] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
        style={{
          boxShadow: `3px 3px 0 ${groupShadow}`,
        }}
      >
        Download
        <span className="sr-only">
          {" "}
          {item.title} ({item.type.replace(".", "")} file)
        </span>
        <span aria-hidden="true"> ⤓</span>
      </a>
    </li>
  );
}

function GroupSection({ group }: { group: ResourceGroup }) {
  const headingId = `group-${group.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section className="mb-14" aria-labelledby={headingId}>
      {/* Group header */}
      <div className="flex items-center gap-4 mb-5.5">
        {/* Icon square */}
        <div
          className="w-10 h-10 rounded-xl border-[3px] border-[#191510] flex items-center justify-center text-[19px] -rotate-3"
          aria-hidden="true"
          style={{
            backgroundColor: group.color,
            boxShadow: `3px 3px 0 ${group.shadow}`,
          }}
        >
          {group.icon}
        </div>

        {/* Title */}
        <h2 id={headingId} className="text-[30px] font-extrabold tracking-[-0.025em]">
          {group.heading}
        </h2>

        {/* Caveat note */}
        <span className="font-[family-name:var(--font-caveat)] text-[21px] font-bold text-[#5B3FE0]">
          {group.note}
        </span>
      </div>

      {/* Cards grid */}
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] list-none p-0"
      >
        {group.items.map((item) => (
          <ResourceCard
            key={item.title}
            item={item}
            groupColor={group.color}
            groupShadow={group.shadow}
          />
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-[3px] focus:border-[#191510] focus:bg-[#FFC933] focus:px-5 focus:py-2.5 focus:text-sm focus:font-extrabold focus:text-[#191510]"
      >
        Skip to main content
      </a>
      <SiteNav />

      <main id="main-content" tabIndex={-1} className="max-w-[1240px] mx-auto px-7 py-12 w-full focus:outline-none">
        {/* ── Header ── */}
        <div className="mb-14">
          {/* Kicker badge */}
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] bg-[#1FA45B] text-[#191510] border-[2px] border-[#191510] rounded-lg px-3 py-1.5 shadow-[3px_3px_0_#191510] -rotate-[1.5deg] mb-6">
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
        <section className="mb-14" aria-labelledby="training-resources-heading">
          <div className="flex items-center gap-4 mb-5.5 flex-wrap">
            <div
              className="w-10 h-10 rounded-xl border-[3px] border-[#191510] flex items-center justify-center text-[19px] -rotate-3"
              aria-hidden="true"
              style={{ backgroundColor: "#B9A5FF", boxShadow: "3px 3px 0 #5B3FE0" }}
            >
              📚
            </div>
            <h2 id="training-resources-heading" className="text-[30px] font-extrabold tracking-[-0.025em]">
              Training Resources
            </h2>
            <span className="font-[family-name:var(--font-caveat)] text-[21px] font-bold text-[#5B3FE0]">
              books, essays &amp; tools
            </span>
          </div>
          <p className="text-[15px] font-medium opacity-70 mb-6 max-w-[640px]">
            Curated reading and reference beyond the course itself — kept inside the
            course so everything lives in one place. Start with the InVision
            Design Engineering Handbook.
          </p>
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] list-none p-0"
          >
            {library.map((item) => (
              <LibraryCard key={item.title} item={item} />
            ))}
          </ul>
        </section>

        {/* ── Official ITX tooling (VC-008 / VC-019) ── */}
        <section className="mb-14" aria-labelledby="itx-tooling-heading">
          <div className="flex items-center gap-4 mb-5.5 flex-wrap">
            <div
              className="w-10 h-10 rounded-xl border-[3px] border-[#191510] flex items-center justify-center text-[19px] -rotate-3"
              aria-hidden="true"
              style={{ backgroundColor: "#6FE3A5", boxShadow: "3px 3px 0 #1FA45B" }}
            >
              🛠️
            </div>
            <h2 id="itx-tooling-heading" className="text-[30px] font-extrabold tracking-[-0.025em]">
              Official ITX Tooling
            </h2>
            <span className="font-[family-name:var(--font-caveat)] text-[21px] font-bold text-[#147A43]">
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
            <a
              href="https://site-omega-red-44.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[20px] border-[3px] border-[#191510] bg-white p-6 shadow-[4px_4px_0_#191510] block transition-transform duration-[140ms] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[19px] font-extrabold">
                  SDD-DE Toolkit — the spec-driven workflow
                  <span className="sr-only"> (opens in a new tab)</span>
                </h3>
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] opacity-70 transition-opacity group-hover:opacity-100 whitespace-nowrap"
                >
                  Open ↗
                </span>
              </div>
              <p className="text-sm font-medium leading-[1.6] opacity-75">
                Spec-Driven Development for Design Engineers — the portable toolkit you
                install with <span className="font-mono">npx @royvillasana/sdd-de</span>.
                It sets up the SDD workflow, the spec templates, and the slash-command
                skills (<span className="font-mono">/enrich-brief</span>,{" "}
                <span className="font-mono">/generate-artifacts</span>, and more) used from
                Module 06 onward. Open the site to see every skill and the full first-run
                setup in detail.
              </p>
            </a>
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
          <a
            href={requestHref}
            className="bg-[#5B3FE0] text-[#FAF3E7] rounded-full border-[3px] border-[#191510] shadow-[4px_4px_0_#191510] font-extrabold px-6 py-3 text-[15px] transition-all duration-[120ms] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            Request a resource →
            <span className="sr-only"> (opens your email app)</span>
          </a>
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
          <nav aria-label="Footer" className="flex items-center gap-5">
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

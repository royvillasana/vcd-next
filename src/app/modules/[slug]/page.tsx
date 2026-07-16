import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ModuleSidebar } from "@/components/module-sidebar";
import { ModuleStepper } from "@/components/module-stepper";
import { CodeBlock } from "@/components/code-block";
import { CardCompareTabs } from "@/components/card-compare-tabs";
import { FigmaPanel } from "@/components/figma-panels";
import { ModuleLockGate } from "@/components/module-lock-gate";
import { TabGroupWrapper } from "@/components/tab-group-wrapper";
import { allModules, capstoneModule } from "@/lib/course-data";
import { moduleContent } from "@/lib/module-content";
import { CapstoneEval } from "@/components/capstone-eval";

interface Props {
  params: Promise<{ slug: string }>;
}

const phaseStyles: Record<string, { bg: string; text: string }> = {
  phase0: { bg: "#F0E5D3", text: "#191510" },
  phase1: { bg: "#DBEAFE", text: "#191510" },
  phase2: { bg: "#B9A5FF", text: "#191510" },
  phase3: { bg: "#6FE3A5", text: "#191510" },
  phase4: { bg: "#FFC933", text: "#191510" },
  capstone: { bg: "#FF4D24", text: "#FAF3E7" },
};

export async function generateStaticParams() {
  return allModules.map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const mod = allModules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const pStyle = phaseStyles[mod.phaseId] ?? phaseStyles.phase0;
  const content = moduleContent[slug] ?? moduleContent["module-00"];

  const allList = allModules;
  const idx = allList.findIndex((m) => m.slug === slug);
  const prev = idx > 0 ? allList[idx - 1] : null;
  const next = idx < allList.length - 1 ? allList[idx + 1] : null;

  const isCapstone = slug === capstoneModule.slug;

  // ─── CAPSTONE: completely custom dark-themed page ───
  if (isCapstone) {
    const buildItems = [
      { icon: "🦸", text: "Hero with a headline, subheadline, and primary CTA" },
      { icon: "🎯", text: "'Who is this for' section with real content" },
      { icon: "📚", text: "Full curriculum overview with all modules and deliverables" },
      { icon: "🧱", text: "'What you will build' section showing key deliverables" },
      { icon: "🎛️", text: "At least one interactive element: accordion, tab, animation, or modal" },
      { icon: "♿", text: "Mobile-first responsive design, WCAG 2.1 AA accessible markup" },
    ];
    const workflow = [
      { n: "1", title: "Design in Figma", detail: "Variables, components, and annotations — Dev Mode verified.", color: "#F0E5D3", numColor: "#191510" },
      { n: "2", title: "Write the spec", detail: "Page spec, component specs, interaction specs for everything interactive.", color: "#2545D3", numColor: "#FAF3E7" },
      { n: "3", title: "Export tokens", detail: "From Figma Variables to your token file.", color: "#7B5CFF", numColor: "#FAF3E7" },
      { n: "4", title: "Set up the project", detail: "Repo, deployment pipeline, token file wired in.", color: "#1FA45B", numColor: "#FAF3E7" },
      { n: "5", title: "Build each section", detail: "Hero, curriculum, deliverables, social proof, CTA, footer.", color: "#FF4D24", numColor: "#FAF3E7" },
      { n: "6", title: "Connect the sections", detail: "Scroll interactions, responsive behaviour, navigation.", color: "#FFC933", numColor: "#191510" },
      { n: "7", title: "Submit a PR", detail: "Screenshots, Figma link, and a full description.", color: "#2545D3", numColor: "#FAF3E7" },
      { n: "8", title: "Deploy", detail: "Live URL, QA'd against your Figma design, ready to share.", color: "#1FA45B", numColor: "#FAF3E7" },
    ];
    const nextTopics = [
      "Design systems at scale — multi-brand tokens",
      "Spec-driven motion & animation",
      "Accessibility auditing in depth",
      "AI-assisted design-system maintenance",
    ];

    return (
      <div className="min-h-screen flex flex-col bg-[#191510] text-[#FAF3E7]">
        <ModuleLockGate slug={slug} />
        {/* Dark nav variant */}
        <header className="sticky top-0 z-50 w-full bg-[#191510] border-b-[3px] border-[#FFC933]">
          <div className="max-w-[1240px] mx-auto px-7 h-[68px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-[38px] h-[38px] rounded-full bg-[#FFC933] border-[3px] border-[#FAF3E7] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M3 4L7 10L11 4" stroke="#191510" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="font-extrabold text-[17px] tracking-[-0.02em] text-[#FAF3E7]">
                Design Engineering <span className="font-[family-name:var(--font-caveat)] text-[19px] font-bold text-[#FFC933]">for UX designers</span>
              </span>
            </Link>
            <nav className="flex items-center gap-2.5">
              <Link href="/" className="px-4 py-2 rounded-full text-[15px] font-semibold text-[#FAF3E7] border-[2px] border-transparent hover:border-[#FAF3E7] transition-colors">Home</Link>
              <Link href="/curriculum" className="px-4 py-2 rounded-full text-[15px] font-semibold text-[#FAF3E7] border-[2px] border-transparent hover:border-[#FAF3E7] transition-colors">Syllabus</Link>
              <Link href="/resources" className="px-4 py-2 rounded-full text-[15px] font-semibold text-[#FAF3E7] border-[2px] border-transparent hover:border-[#FAF3E7] transition-colors">Resources</Link>
              <Link href="/glossary" className="px-4 py-2 rounded-full text-[15px] font-semibold text-[#FAF3E7] border-[2px] border-transparent hover:border-[#FAF3E7] transition-colors">Glossary</Link>
            </nav>
          </div>
        </header>

        <div className="flex-1 max-w-[1240px] mx-auto px-7 pt-16 pb-[88px] w-full">
          {/* Hero */}
          <div className="text-center mb-[72px] relative">
            <div className="text-[80px] inline-block animate-[vcd-float_3s_ease-in-out_infinite] mb-2">⭐</div>
            <div className="block mb-5">
              <span className="inline-block font-mono text-xs font-bold tracking-[0.16em] uppercase bg-[var(--brand)] text-[#FAF3E7] border-[2px] border-[#FAF3E7] rounded-lg px-3.5 py-1.5 -rotate-[1.5deg]">
                Final boss · 10–15 hrs · everything you&apos;ve learned
              </span>
            </div>
            <h1 className="text-[clamp(64px,8vw,110px)] font-extrabold tracking-[-0.045em] leading-[0.95] mb-5">
              The{" "}
              <span className="bg-[#FFC933] text-[#191510] px-5 pb-1.5 rounded-[18px] border-[3px] border-[#FAF3E7] inline-block -rotate-2 shadow-[6px_6px_0_#FF4D24]">
                Capstone
              </span>
            </h1>
            <p className="text-[20px] leading-[1.6] max-w-[620px] mx-auto font-medium opacity-80">
              Design and build a complete, polished landing page — from Figma to a live URL — entirely on your own.{" "}
              <span className="font-[family-name:var(--font-caveat)] text-[26px] font-bold text-[#FFC933]">
                this one goes in the portfolio
              </span>
            </p>
          </div>

          {/* What you'll build */}
          <section className="mb-16">
            <h2 className="text-[36px] font-extrabold tracking-[-0.03em] mb-6">
              What you&apos;ll build<span className="text-[#FFC933]">.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {buildItems.map((b, i) => (
                <div
                  key={i}
                  className="border-[2px] border-[#FAF3E7]/25 rounded-[18px] px-[22px] py-5 flex items-start gap-3.5 transition-all duration-[140ms] hover:border-[#FFC933] hover:-translate-y-1"
                  style={{ background: "rgba(250,243,231,0.04)" }}
                >
                  <span className="text-[26px] flex-shrink-0">{b.icon}</span>
                  <span className="text-[15px] font-semibold leading-[1.5]">{b.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 8-step workflow */}
          <section className="mb-16">
            <div className="flex items-baseline gap-[18px] mb-6 flex-wrap">
              <h2 className="text-[36px] font-extrabold tracking-[-0.03em]">
                The full SDD workflow<span className="text-[var(--brand)]">.</span>
              </h2>
              <span className="font-[family-name:var(--font-caveat)] text-[24px] font-bold text-[#FFC933]">
                unassisted — but you have all the templates
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {workflow.map((w) => (
                <div
                  key={w.n}
                  className="flex items-start gap-4 border-[3px] border-[#FAF3E7] rounded-[18px] px-5 py-[18px] bg-[#191510] transition-all duration-[140ms] hover:bg-[#FAF3E7] hover:text-[#191510] group"
                  style={{ ["--hover-shadow" as string]: `5px 5px 0 ${w.color}` }}
                >
                  <span
                    className="w-10 h-10 rounded-full border-[2px] flex items-center justify-center font-mono text-[15px] font-bold flex-shrink-0"
                    style={{ background: w.color, color: w.numColor, borderColor: "currentColor" }}
                  >
                    {w.n}
                  </span>
                  <div>
                    <div className="font-extrabold text-[17px] mb-[3px]">{w.title}</div>
                    <div className="text-sm opacity-70 font-medium leading-[1.5]">{w.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Four evaluation questions */}
          <section className="mb-16">
            <CapstoneEval />
          </section>

          {/* Deliverable */}
          <section className="mb-16">
            <div className="border-[3px] border-[#FAF3E7] rounded-[22px] bg-[#FAF3E7] text-[#191510] p-[30px_34px] flex items-center gap-7 shadow-[8px_8px_0_#FF4D24]">
              <div className="w-[84px] h-[84px] rounded-full bg-[var(--brand)] border-[3px] border-[#191510] flex items-center justify-center text-[40px] flex-shrink-0 -rotate-6">
                🚀
              </div>
              <div className="flex-1">
                <div className="font-mono text-xs font-bold tracking-[0.16em] uppercase text-[var(--brand)] mb-1.5">
                  Capstone deliverable
                </div>
                <h3 className="font-extrabold text-[24px] tracking-[-0.02em] mb-2">
                  A polished, live landing page
                </h3>
                <p className="text-[15px] opacity-75 leading-[1.6] font-medium max-w-[640px]">
                  A live URL. A complete PR description with screenshots and Figma link. A Vibe Session Log showing your journey from Module 0 to now. Four yes answers. This is your portfolio proof.
                </p>
              </div>
            </div>
          </section>

          {/* After the capstone */}
          <section className="mb-14">
            <h2 className="text-[30px] font-extrabold tracking-[-0.025em] mb-2">
              After the capstone<span className="text-[#FFC933]">?</span>
            </h2>
            <p className="text-[15.5px] opacity-70 mb-5 font-medium max-w-[640px]">
              Natural next levels — but first, ship the capstone. The best next step is always a project, not another module.
            </p>
            <div className="flex gap-3 flex-wrap">
              {nextTopics.map((n) => (
                <span
                  key={n}
                  className="inline-block px-5 py-2.5 rounded-full border-[2px] border-[#FAF3E7]/35 text-[14.5px] font-bold transition-all duration-[140ms] hover:border-[#FFC933] hover:text-[#FFC933]"
                >
                  {n}
                </span>
              ))}
            </div>
          </section>

          {/* Prev / back */}
          <div className="flex items-stretch justify-between gap-5 pt-2">
            <Link
              href="/curriculum"
              className="flex flex-col gap-1.5 px-6 py-5 rounded-[18px] border-[3px] border-[#FAF3E7] hover:bg-[#FAF3E7]/[0.08] transition-all flex-[0_1_40%]"
            >
              <span className="font-mono text-xs font-bold opacity-60">← Back to</span>
              <span className="font-extrabold text-[17px]">The Syllabus</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-end gap-1.5 px-6 py-5 rounded-[18px] border-[3px] border-[#191510] bg-[#FFC933] text-[#191510] shadow-[4px_4px_0_#FAF3E7] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex-[0_1_40%] text-right"
            >
              <span className="font-mono text-xs font-bold opacity-70">Course complete →</span>
              <span className="font-extrabold text-[17px]">Back to start 🎓</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t-[2px] border-[#FAF3E7]/15">
          <div className="max-w-[1240px] mx-auto px-7 py-9 flex items-center justify-between flex-wrap gap-5">
            <span className="text-sm font-semibold">Design Engineering for UX Designers — ITX UX AI Workshop</span>
            <div className="flex items-center gap-5 text-sm">
              <Link href="/curriculum" className="text-[#FAF3E7]/70 hover:text-[#FFC933] transition-colors">Syllabus</Link>
              <Link href="/resources" className="text-[#FAF3E7]/70 hover:text-[#FFC933] transition-colors">Resources</Link>
              <Link href="/glossary" className="text-[#FAF3E7]/70 hover:text-[#FFC933] transition-colors">Glossary</Link>
              <span className="font-mono text-xs opacity-50">© 2026</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Build sidebar sections with IDs that match section elements
  const sidebarSections = [
    { heading: "Learning Objectives", id: "learning-objectives" },
    {
      heading: "Core Concepts",
      id: "core-concepts",
      subs: content.concepts.map((c, i) => ({
        label: c.title,
        id: c.id,
        num: String(i + 1).padStart(2, "0"),
      })),
    },
    { heading: "Checkpoint", id: "checkpoint-cta" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <ModuleLockGate slug={slug} />
      <SiteNav />
      <ModuleStepper currentSlug={slug} />

      <main className="max-w-[1240px] mx-auto px-7 pt-12 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-[52px]">
          {/* Sidebar */}
          <ModuleSidebar
            sections={sidebarSections}
            slug={slug}
            accentDot="bg-foreground"
          />

          {/* Main content */}
          <div className="min-w-0">
            {/* ─── Module Header ─── */}
            <header className="mb-12">
              {/* Badges row */}
              <div className="flex gap-2.5 mb-5 flex-wrap">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.1em] border-[2px] border-[#191510] rounded-lg px-3 py-1.5 shadow-[2px_2px_0_#191510] -rotate-[1.5deg] inline-block"
                  style={{ backgroundColor: pStyle.bg, color: pStyle.text }}
                >
                  {mod.phase}
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] bg-white border-[2px] border-[#191510] rounded-lg px-3 py-1.5 shadow-[2px_2px_0_#191510] rotate-1 inline-block text-[#191510]">
                  {mod.duration}
                </span>
                <span className="font-[family-name:var(--font-caveat)] text-[22px] font-bold text-[#1FA45B] ml-1.5 self-center">
                  {slug === "module-00" ? "the fun starts here \u2193" : "keep going! \u2193"}
                </span>
              </div>

              {/* Title area */}
              <div className="flex items-start gap-7">
                <span
                  className="text-[150px] font-extrabold leading-[0.8] tracking-[-0.07em] text-transparent flex-shrink-0 tabular-nums -rotate-3 select-none"
                  style={{ WebkitTextStroke: "3px #191510" }}
                >
                  {isCapstone ? "\u2605" : mod.num}
                </span>
                <div>
                  <h1 className="text-[clamp(44px,5vw,64px)] font-extrabold tracking-[-0.035em] leading-none mb-3.5">
                    {mod.title}
                  </h1>
                  <p className="text-[18px] leading-[1.6] max-w-[600px] font-medium">
                    {mod.overview}
                  </p>
                </div>
              </div>
            </header>

            {/* ─── Learning Objectives ─── */}
            <section id="learning-objectives" className="mb-12 scroll-mt-24">
              <h2 className="text-[32px] font-extrabold mb-5.5">
                You&rsquo;ll learn to<span className="text-[var(--brand)]">&hellip;</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {content.objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 border-[2px] border-[#191510] rounded-2xl bg-white p-4 px-[18px] shadow-[3px_3px_0_#191510] hover:-translate-y-[3px] hover:-rotate-[0.5deg] transition-transform duration-[140ms]"
                  >
                    <span
                      className="text-[34px] font-extrabold leading-none tabular-nums flex-shrink-0"
                      style={{ color: pStyle.bg }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-semibold leading-[1.5]">{obj}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── Core Concepts ─── */}
            <section id="core-concepts" className="mb-12 scroll-mt-24">
              <h2 className="text-[32px] font-extrabold mb-6.5">
                Core concepts<span className="text-[#7B5CFF]">.</span>
              </h2>

              <div className="space-y-6.5">
                {content.concepts.map((concept, i) => (
                  <div
                    key={concept.id}
                    id={concept.id}
                    className="border-[3px] border-[#191510] rounded-[22px] bg-white overflow-hidden shadow-[5px_5px_0_#191510] scroll-mt-24"
                  >
                    {/* Concept header bar */}
                    <div
                      className="flex items-center gap-4 px-6 py-[18px] border-b-[3px] border-[#191510]"
                      style={{ backgroundColor: pStyle.bg, color: pStyle.text }}
                    >
                      <span className="text-[44px] font-extrabold leading-none tabular-nums opacity-90">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-extrabold text-[21px] tracking-[-0.015em]">
                        {concept.title}
                      </h3>
                    </div>

                    {/* Concept body */}
                    <div className="px-6 py-5.5">
                      {/* Framed icon/image — floats beside the intro text */}
                      {concept.image && (
                        <figure className="float-right ml-5 mb-3 w-[104px] sm:w-[120px]">
                          <div className="rounded-[18px] border-[3px] border-[#191510] bg-white p-2.5 shadow-[3px_3px_0_#191510]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={concept.image.src}
                              alt={concept.image.alt}
                              className="w-full h-auto block rounded-[10px]"
                            />
                          </div>
                          {concept.image.caption && (
                            <figcaption className="mt-1.5 text-center text-[11px] leading-tight font-medium opacity-55">
                              {concept.image.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      {/* Body text */}
                      <p className="text-[15.5px] leading-[1.65] font-medium mb-[18px]">
                        {concept.body}
                      </p>

                      {/* Callout — disclaimers, reminders, checklists */}
                      {concept.callout && (() => {
                        const tone = concept.callout.tone ?? "info";
                        const toneStyle: Record<string, { bg: string; badge: string; icon: string; label: string }> = {
                          info:    { bg: "#EAF1FF", badge: "#2545D3", icon: "ℹ", label: "Note" },
                          note:    { bg: "#F1ECFF", badge: "#7B5CFF", icon: "✎", label: "Note" },
                          warn:    { bg: "#FFF0E8", badge: "#FF4D24", icon: "!", label: "Heads up" },
                          success: { bg: "#E7F8EF", badge: "#1FA45B", icon: "✓", label: "Standard" },
                        };
                        const s = toneStyle[tone];
                        return (
                          <div
                            className="clear-both mb-[18px] rounded-[16px] border-[3px] border-[#191510] p-[18px] shadow-[3px_3px_0_#191510]"
                            style={{ backgroundColor: s.bg }}
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <span
                                className="flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-[#191510] text-[12px] font-bold text-white"
                                style={{ backgroundColor: s.badge }}
                              >
                                {s.icon}
                              </span>
                              <span className="font-extrabold text-[14.5px] tracking-[-0.01em]">
                                {concept.callout.title ?? s.label}
                              </span>
                            </div>
                            <p className="text-[14px] leading-[1.6] font-medium">
                              {concept.callout.body}
                            </p>
                            {concept.callout.bullets && concept.callout.bullets.length > 0 && (
                              <ul className="mt-2.5 flex flex-col gap-1.5">
                                {concept.callout.bullets.map((b, bi) => (
                                  <li key={bi} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] font-medium">
                                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#191510] flex-shrink-0" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })()}

                      {/* Bullets */}
                      {concept.bullets && concept.bullets.length > 0 && (
                        <ul className="list-none flex flex-col gap-2.5 mb-[18px]">
                          {concept.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-[14.5px] leading-[1.55]">
                              <span
                                className="mt-[5px] w-2.5 h-2.5 rounded-[3px] border-[2px] border-[#191510] flex-shrink-0"
                                style={{ backgroundColor: pStyle.bg }}
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Single code block */}
                      {concept.code && !concept.figmaPanel && (
                        <div className="mb-[18px]">
                          <CodeBlock code={concept.code.content} lang={concept.code.lang} />
                        </div>
                      )}

                      {/* Code ↔ Figma panel, side by side */}
                      {concept.code && concept.figmaPanel && (
                        <div className="mb-[18px] grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch">
                          <div className="min-w-0 [&>div]:h-full">
                            <CodeBlock code={concept.code.content} lang={concept.code.lang} />
                          </div>
                          <FigmaPanel variant={concept.figmaPanel} />
                        </div>
                      )}

                      {/* Multiple labeled code blocks */}
                      {concept.codeBlocks && concept.codeBlocks.length > 0 && !concept.cardCompare && (
                        <div className="mb-[18px] space-y-3">
                          {concept.codeBlocks.map((cb, cbi) => (
                            <CodeBlock key={cbi} code={cb.content} lang={cb.lang} label={cb.label} />
                          ))}
                        </div>
                      )}

                      {/* Side-by-side: prompt/code ↔ the card each approach produces */}
                      {concept.cardCompare && concept.codeBlocks && concept.codeBlocks.length > 0 && (
                        <div className="mb-[18px] grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch">
                          <div className="min-w-0 [&>div]:h-full">
                            <CodeBlock
                              code={concept.codeBlocks[0].content}
                              lang={concept.codeBlocks[0].lang}
                              label={concept.codeBlocks[0].label}
                            />
                          </div>
                          <CardCompareTabs />
                        </div>
                      )}

                      {/* Figma embeds */}
                      {concept.figmaEmbeds && concept.figmaFileKey && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-[18px]">
                          {concept.figmaEmbeds.map((embed) => {
                            const embedUrl = `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/${concept.figmaFileKey}/?node-id=${embed.nodeId}`;
                            const figmaUrl = `https://www.figma.com/design/${concept.figmaFileKey}/?node-id=${embed.nodeId}`;
                            return (
                              <div
                                key={embed.nodeId}
                                className="border-[3px] border-[#191510] rounded-[18px] overflow-hidden shadow-[3px_3px_0_#191510]"
                              >
                                <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
                                  <iframe
                                    src={embedUrl}
                                    className="absolute inset-0 w-full h-full"
                                    allowFullScreen
                                    title={embed.title}
                                    loading="lazy"
                                  />
                                </div>
                                <div className="px-4 py-3 border-t-[3px] border-[#191510] bg-white flex items-center justify-between gap-3">
                                  <div>
                                    <div className="text-xs font-semibold text-foreground font-mono">
                                      {embed.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {embed.description}
                                    </div>
                                  </div>
                                  <a
                                    href={figmaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                                  >
                                    Open in Figma &rarr;
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Tool links */}
                      {concept.tools && concept.tools.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-[18px]">
                          {concept.tools.map((tool) => {
                            const domain = new URL(tool.href).hostname;
                            const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
                            return (
                              <a
                                key={tool.name}
                                href={tool.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-3.5 border-[2px] border-[#191510] rounded-xl bg-white shadow-[2px_2px_0_#191510] hover:translate-x-1 hover:shadow-none transition-all group"
                              >
                                <div className="w-6 h-6 rounded overflow-hidden bg-[#FAF3E7] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={faviconUrl}
                                    alt={tool.name}
                                    width={16}
                                    height={16}
                                    className="w-4 h-4 object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className="text-sm font-semibold text-foreground group-hover:underline underline-offset-2">
                                      {tool.name}
                                    </span>
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      className="text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <path
                                        d="M2 8L8 2M8 2H4M8 2V6"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    {tool.description}
                                  </p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      )}

                      {/* Tab groups */}
                      {concept.tabs && concept.tabs.length > 0 && (
                        <div className="mb-[18px]">
                          <TabGroupWrapper tabs={concept.tabs} />
                        </div>
                      )}

                      {/* Table */}
                      {concept.table && concept.table.length > 0 && (
                        <div className="border-[2px] border-[#191510] rounded-xl overflow-hidden mb-[18px]">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr>
                                <th
                                  className="text-left py-2.5 px-4 font-mono text-xs uppercase tracking-wide"
                                  style={{ backgroundColor: pStyle.bg, color: pStyle.text }}
                                >
                                  {concept.tableLabels?.left ?? "Concept"}
                                </th>
                                <th
                                  className="text-left py-2.5 px-4 font-mono text-xs uppercase tracking-wide"
                                  style={{ backgroundColor: pStyle.bg, color: pStyle.text }}
                                >
                                  {concept.tableLabels?.right ?? "Equivalent"}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {concept.table.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className="border-t border-[#191510]/15"
                                  style={{
                                    backgroundColor: ri % 2 === 0 ? "#FFFFFF" : "#FAF3E7",
                                  }}
                                >
                                  <td className="py-2.5 px-4 text-sm font-medium text-foreground align-top">
                                    {row.left}
                                  </td>
                                  <td className="py-2.5 px-4 text-sm text-muted-foreground font-mono align-top">
                                    {row.right}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Tweet quote */}
                      {concept.tweet && (
                        <div className="mb-[18px]">
                          <a
                            href={concept.tweet.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border-[3px] border-[#191510] rounded-[18px] overflow-hidden shadow-[3px_3px_0_#191510] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all group"
                          >
                            {/* Tweet header */}
                            <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b-[3px] border-[#191510]">
                              <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                                <span className="text-background text-xs font-bold font-mono">
                                  {concept.tweet.author
                                    .split(" ")
                                    .map((w) => w[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm text-foreground">
                                  {concept.tweet.author}
                                </div>
                                <div className="text-xs text-muted-foreground font-mono">
                                  {concept.tweet.handle}
                                </div>
                              </div>
                              <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0"
                                fill="currentColor"
                              >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.733-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </div>

                            {/* Tweet body */}
                            <div className="px-5 py-4">
                              <p className="text-sm text-foreground leading-relaxed">
                                {concept.tweet.text}
                              </p>
                            </div>

                            {/* Tweet footer */}
                            <div className="px-5 pb-4 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground font-mono">
                                {concept.tweet.date}
                              </span>
                              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-mono">
                                View on X &rarr;
                              </span>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── Hand-off to the Checkpoint screen ─── */}
            <section id="checkpoint-cta" className="mb-12 scroll-mt-24">
              <div className="border-[3px] border-[#191510] rounded-[22px] bg-white p-[30px_34px] shadow-[5px_5px_0_#191510] relative">
                <span
                  className="absolute top-[-18px] left-[30px] border-[3px] border-[#191510] rounded-full px-[18px] py-1.5 font-extrabold text-sm shadow-[3px_3px_0_#191510] -rotate-[1.5deg]"
                  style={{ backgroundColor: pStyle.bg, color: pStyle.text }}
                >
                  &#127937; Up next
                </span>

                <h2 className="text-[28px] font-extrabold mt-2.5 mb-2">
                  Ready to put it into practice?
                </h2>
                <p className="text-[15.5px] leading-[1.6] font-medium max-w-[560px] mb-6">
                  The checkpoint has this module&rsquo;s hands-on exercise and a short check on
                  what you&rsquo;ve learned. Pass both to unlock{" "}
                  {next ? <strong>{next.title}</strong> : "the rest of the course"}. You can come
                  back and reread this lesson whenever you want.
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href={`/modules/${slug}/checkpoint`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-full text-[15px] font-extrabold shadow-[4px_4px_0_var(--brand)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    Go to the checkpoint &rarr;
                  </Link>
                  <span className="font-[family-name:var(--font-caveat)] text-[20px] font-bold text-[var(--brand)] -rotate-2">
                    exercise + quiz
                  </span>
                </div>
              </div>
            </section>

            {/* ─── Prev / Checkpoint Navigation ─── */}
            <nav className="flex justify-between gap-4 pt-8 border-t-[3px] border-[#191510]">
              <Link
                href={prev ? `/modules/${prev.slug}` : "/curriculum"}
                className="flex flex-col gap-1 p-4 border-[3px] border-[#191510] rounded-[18px] shadow-[3px_3px_0_#191510] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-[120ms] max-w-[45%]"
              >
                <span className="font-mono text-xs opacity-50">
                  &larr; {prev ? "Previous" : "Back to"}
                </span>
                <span className="text-sm font-semibold truncate">
                  {prev ? prev.title : "Curriculum"}
                </span>
              </Link>

              <Link
                href={`/modules/${slug}/checkpoint`}
                className="flex flex-col gap-1 p-4 border-[3px] border-[#191510] rounded-[18px] shadow-[3px_3px_0_var(--brand)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-[120ms] text-right max-w-[45%] ml-auto bg-white"
              >
                <span className="font-mono text-xs opacity-50">Next &rarr;</span>
                <span className="text-sm font-semibold truncate">Checkpoint</span>
              </Link>
            </nav>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-[3px] border-[#191510]">
        <div className="max-w-[1240px] mx-auto px-7 py-8 flex items-center justify-between text-xs text-muted-foreground">
          <Link href="/curriculum" className="hover:text-foreground transition-colors">
            &larr; Back to Curriculum
          </Link>
          <span>&copy; 2026 Design Engineering</span>
        </div>
      </footer>
    </div>
  );
}

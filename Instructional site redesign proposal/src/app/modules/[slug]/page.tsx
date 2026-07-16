import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ModuleSidebar } from "@/components/module-sidebar";
import { ModuleStepper } from "@/components/module-stepper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { allModules, capstoneModule } from "@/lib/course-data";
import { moduleContent } from "@/lib/module-content";

interface Props {
  params: Promise<{ slug: string }>;
}

const phaseColors: Record<string, { dot: string; accent: string; bg: string; badge: string; border: string }> = {
  phase0: { dot: "bg-stone-400", accent: "text-stone-600", bg: "bg-stone-50", badge: "border-stone-200 text-stone-700 bg-stone-50", border: "border-l-stone-400" },
  phase1: { dot: "bg-slate-500", accent: "text-slate-700", bg: "bg-slate-50", badge: "border-slate-200 text-slate-700 bg-slate-50", border: "border-l-slate-500" },
  phase2: { dot: "bg-violet-500", accent: "text-violet-700", bg: "bg-violet-50", badge: "border-violet-200 text-violet-700 bg-violet-50", border: "border-l-violet-500" },
  phase3: { dot: "bg-emerald-500", accent: "text-emerald-700", bg: "bg-emerald-50", badge: "border-emerald-200 text-emerald-700 bg-emerald-50", border: "border-l-emerald-500" },
  phase4: { dot: "bg-amber-500", accent: "text-amber-700", bg: "bg-amber-50", badge: "border-amber-200 text-amber-700 bg-amber-50", border: "border-l-amber-500" },
  capstone: { dot: "bg-[var(--brand)]", accent: "text-[var(--brand)]", bg: "bg-[var(--brand)]/5", badge: "border-[var(--brand)]/30 text-[var(--brand)]", border: "border-l-[var(--brand)]" },
};

export async function generateStaticParams() {
  return allModules.map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const mod = allModules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const colors = phaseColors[mod.phaseId] ?? phaseColors.phase0;
  const content = moduleContent[slug] ?? moduleContent["module-00"];

  const allList = allModules;
  const idx = allList.findIndex((m) => m.slug === slug);
  const prev = idx > 0 ? allList[idx - 1] : null;
  const next = idx < allList.length - 1 ? allList[idx + 1] : null;

  // Build sidebar sections with IDs that match section elements
  const sidebarSections = [
    { heading: "Learning Objectives", id: "learning-objectives" },
    {
      heading: "Core Concepts",
      id: "core-concepts",
      subs: content.concepts.map((c) => ({ label: c.title, id: c.id })),
    },
    { heading: "Hands-On Exercise", id: "hands-on-exercise" },
    { heading: "Deliverable", id: "deliverable" },
  ];

  const isCapstone = slug === capstoneModule.slug;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <div className="flex-1 max-w-6xl mx-auto px-6 pt-8 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar */}
          <ModuleSidebar
            sections={sidebarSections}
            slug={slug}
            accentDot={colors.dot}
          />

          {/* Main content */}
          <main className="min-w-0">
            {/* Module header */}
            <header className="pb-8 mb-8 border-b border-border">
              {/* Phase-grouped stepper */}
              <ModuleStepper currentSlug={slug} />

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className={`border font-mono text-xs ${colors.badge}`}>
                  {mod.phase}
                </Badge>
                <Badge variant="outline" className="border-border text-muted-foreground font-mono text-xs">
                  {isCapstone ? "Capstone" : `Module ${mod.num}`}
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1 font-mono ml-auto">
                  ⏱ {mod.duration}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                {mod.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {mod.overview}
              </p>
            </header>

            {/* ─── Learning Objectives ─── */}
            <section id="learning-objectives" className="mb-10 scroll-mt-20">
              <h2 className="text-lg font-bold mb-4">Learning Objectives</h2>
              <ul className="space-y-3">
                {content.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-[10px] font-bold text-white ${colors.dot}`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Separator className="my-8" />

            {/* ─── Core Concepts ─── */}
            <section id="core-concepts" className="mb-10 scroll-mt-20">
              <h2 className="text-lg font-bold mb-6">Core Concepts</h2>
              <div className="space-y-10">
                {content.concepts.map((concept, ci) => (
                  <div key={concept.id} id={concept.id} className="scroll-mt-24">
                    {/* Concept header */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${colors.dot}`}
                      >
                        <span className="font-mono text-[9px] font-bold text-white">
                          {String(ci + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-semibold text-base">{concept.title}</h3>
                    </div>

                    {/* Body */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 pl-7">
                      {concept.body}
                    </p>

                    {/* Bullets */}
                    {concept.bullets && concept.bullets.length > 0 && (
                      <ul className="space-y-2 pl-7 mb-4">
                        {concept.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <div
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot} opacity-70`}
                            />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Code block */}
                    {concept.code && (
                      <div className="pl-7 mb-4">
                        <div className="rounded-xl border border-border overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2.5 bg-muted border-b border-border">
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                              {concept.code.lang}
                            </span>
                          </div>
                          <pre className="p-4 text-xs leading-relaxed overflow-x-auto bg-card">
                            <code className="text-foreground font-mono whitespace-pre">
                              {concept.code.content}
                            </code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Table */}
                    {concept.table && concept.table.length > 0 && (
                      <div className="pl-7 mb-4 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 px-3 text-xs font-mono uppercase tracking-wide text-muted-foreground bg-muted/50 rounded-tl-lg">
                                {concept.tableLabels?.left ?? "Concept"}
                              </th>
                              <th className="text-left py-2 px-3 text-xs font-mono uppercase tracking-wide text-muted-foreground bg-muted/50 rounded-tr-lg">
                                {concept.tableLabels?.right ?? "Equivalent"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {concept.table.map((row, ri) => (
                              <tr
                                key={ri}
                                className={`border-b border-border last:border-0 ${ri % 2 === 0 ? "" : "bg-muted/20"}`}
                              >
                                <td className="py-2 px-3 text-sm font-medium text-foreground align-top">
                                  {row.left}
                                </td>
                                <td className="py-2 px-3 text-sm text-muted-foreground font-mono align-top">
                                  {row.right}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Divider between concepts (not after last) */}
                    {ci < content.concepts.length - 1 && (
                      <div className="pl-7 mt-6">
                        <div className="h-px bg-border/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* ─── Hands-On Exercise ─── */}
            <section id="hands-on-exercise" className="mb-10 scroll-mt-20">
              <div
                className={`rounded-xl border border-l-4 ${colors.border} border-border/60 ${colors.bg} overflow-hidden`}
              >
                <div className="p-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Hands-On Exercise
                  </div>
                  <h2 className="text-lg font-bold mb-2">{content.exercise.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {content.exercise.description}
                  </p>

                  <ol className="space-y-3 mb-6">
                    {content.exercise.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold text-white ${colors.dot}`}
                        >
                          {i + 1}
                        </div>
                        <span className="text-sm text-foreground leading-relaxed pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="pt-4 border-t border-border/40">
                    <div className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-wide">
                      Document in
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Your Vibe Session Log →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Deliverable ─── */}
            <section id="deliverable" className="mb-10 scroll-mt-20">
              <div className="rounded-xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 border border-border`}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={colors.accent}>
                      <path
                        d="M9 2L11.09 7.26L17 8.27L13 12.14L14.18 18L9 15.27L3.82 18L5 12.14L1 8.27L6.91 7.26L9 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Module Deliverable
                    </div>
                    <h3 className="font-bold text-base mb-2">{content.deliverable.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {content.deliverable.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Prev / Next ─── */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t border-border">
              {prev ? (
                <Link
                  href={`/modules/${prev.slug}`}
                  className="flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-foreground hover:shadow-sm transition-all group max-w-[45%]"
                >
                  <span className="text-xs text-muted-foreground font-mono">← Previous</span>
                  <span className="text-sm font-medium truncate">{prev.title}</span>
                </Link>
              ) : (
                <Link
                  href="/curriculum"
                  className="flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-foreground hover:shadow-sm transition-all group"
                >
                  <span className="text-xs text-muted-foreground font-mono">← Back to</span>
                  <span className="text-sm font-medium">Curriculum</span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/modules/${next.slug}`}
                  className="flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-foreground hover:shadow-sm transition-all group text-right max-w-[45%] ml-auto"
                >
                  <span className="text-xs text-muted-foreground font-mono">Next →</span>
                  <span className="text-sm font-medium truncate">{next.title}</span>
                </Link>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-muted-foreground">
          <Link href="/curriculum" className="hover:text-foreground transition-colors">
            ← Back to Curriculum
          </Link>
          <span>© 2026 Vibe Coding for Designers</span>
        </div>
      </footer>
    </div>
  );
}

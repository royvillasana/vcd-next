import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { phases, capstoneModule } from "@/lib/course-data";

const phaseAccents: Record<string, { dot: string; badge: string; ring: string }> = {
  phase0: { dot: "bg-stone-400", badge: "bg-stone-100 text-stone-700 border-stone-200", ring: "ring-stone-200" },
  phase1: { dot: "bg-slate-500", badge: "bg-slate-100 text-slate-700 border-slate-200", ring: "ring-slate-200" },
  phase2: { dot: "bg-violet-500", badge: "bg-violet-50 text-violet-700 border-violet-200", ring: "ring-violet-200" },
  phase3: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", ring: "ring-emerald-200" },
  phase4: { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700 border-amber-200", ring: "ring-amber-200" },
};

export default function CurriculumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <div className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 text-xs font-mono tracking-widest uppercase border-[var(--brand)] text-[var(--brand)]"
          >
            13 Modules · 5 Phases
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Course Curriculum</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            A structured path from design thinking to production-ready code.
            Complete phases in order — each one unlocks the next.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-2 mb-3">
                Phases
              </div>
              {phases.map((phase) => {
                const acc = phaseAccents[phase.id];
                return (
                  <a
                    key={phase.id}
                    href={`#${phase.id}`}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${acc.dot}`} />
                    <span>Phase {phase.num} — {phase.name}</span>
                  </a>
                );
              })}
              <div className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[var(--brand)]" />
                <a href="#capstone">Capstone</a>
              </div>
            </div>
          </aside>

          {/* Phase cards */}
          <main className="space-y-8">
            {phases.map((phase) => {
              const acc = phaseAccents[phase.id];
              return (
                <section key={phase.id} id={phase.id} className="scroll-mt-20">
                  <Card className="border-border shadow-none overflow-hidden">
                    {/* Phase header */}
                    <CardHeader className="pb-4 border-b border-border">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${acc.dot}`} />
                            <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
                              Phase {phase.num}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold tracking-tight mb-1">
                            {phase.name}
                          </h2>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                            {phase.description}
                          </p>
                        </div>
                        <Badge variant="outline" className={`shrink-0 ${acc.badge} border font-mono text-xs`}>
                          {phase.modules.length} {phase.modules.length === 1 ? "module" : "modules"}
                        </Badge>
                      </div>
                    </CardHeader>

                    {/* Module rows */}
                    <CardContent className="p-0">
                      {phase.modules.map((mod, i) => (
                        <div key={mod.id}>
                          <Link
                            href={`/modules/${mod.slug}`}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                              {mod.num}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-foreground mb-0.5 group-hover:text-foreground">
                                {mod.title}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {mod.overview}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="text-xs text-muted-foreground font-mono">
                                {mod.duration}
                              </span>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground group-hover:text-foreground transition-colors">
                                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </Link>
                          {i < phase.modules.length - 1 && (
                            <Separator className="mx-6" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </section>
              );
            })}

            {/* Capstone */}
            <section id="capstone" className="scroll-mt-20">
              <Card className="border-border shadow-none overflow-hidden bg-foreground text-background">
                <CardHeader className="pb-4 border-b border-background/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand)]" />
                        <span className="font-mono text-xs text-background/50 tracking-wider uppercase">
                          Capstone
                        </span>
                      </div>
                      <h2 className="text-xl font-bold tracking-tight mb-1 text-background">
                        Capstone Project
                      </h2>
                      <p className="text-sm text-background/60 leading-relaxed max-w-lg">
                        Design and build a complete feature from spec to production using everything you&apos;ve learned.
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-background/20 text-background/70 font-mono text-xs"
                    >
                      {capstoneModule.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Link
                    href={`/modules/${capstoneModule.slug}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-background/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg border border-background/20 bg-background/10 flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold text-background/70">
                      ★
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-background mb-0.5">
                        {capstoneModule.title}
                      </div>
                      <div className="text-xs text-background/50 truncate">
                        {capstoneModule.overview}
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-background/50 group-hover:text-background transition-colors flex-shrink-0">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>Vibe Coding for Designers — ITX UX AI Workshop</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

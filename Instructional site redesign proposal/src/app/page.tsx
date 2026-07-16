import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const phases = [
  {
    id: "phase0",
    num: "00",
    name: "Foundation",
    description: "Understand the vibe coding mindset and set up your workflow.",
    modules: 1,
    dot: "bg-stone-400",
  },
  {
    id: "phase1",
    num: "01",
    name: "Read the Stack",
    description: "Learn to read code like a designer and work with Figma, Storybook, and design.md.",
    modules: 5,
    dot: "bg-slate-500",
  },
  {
    id: "phase2",
    num: "02",
    name: "Write Specs",
    description: "Translate design decisions into precise, AI-readable specifications.",
    modules: 1,
    dot: "bg-violet-500",
  },
  {
    id: "phase3",
    num: "03",
    name: "Build with AI",
    description: "Run your first AI coding sessions, build components, and sync with design.",
    modules: 3,
    dot: "bg-emerald-500",
  },
  {
    id: "phase4",
    num: "04",
    name: "Ship It",
    description: "Navigate code review, deploy to production, and close the design-dev loop.",
    modules: 2,
    dot: "bg-amber-500",
  },
];

const specTypes = [
  {
    num: "01",
    title: "Component Spec",
    description: "Props, variants, states, and design tokens for every reusable UI element.",
  },
  {
    num: "02",
    title: "Interaction Spec",
    description: "Triggers, transitions, timing, and easing that describe how things move.",
  },
  {
    num: "03",
    title: "Page / Feature Spec",
    description: "Layout zones, content structure, and full-system behaviour patterns.",
  },
];

const pipeline = [
  "Figma components with token-connected styles",
  "Storybook for isolated component testing",
  "design.md as the single source of truth",
  "CLAUDE.md to prime every AI session",
  "Claude Code for AI-assisted implementation",
  "Git + PR workflow for clean shipping",
  "Vercel for continuous deployment",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <Badge
              variant="outline"
              className="mb-6 text-xs font-mono tracking-widest uppercase border-[var(--brand)] text-[var(--brand)]"
            >
              5-Phase Course · 13 Modules
            </Badge>
            <h1
              className="text-5xl lg:text-6xl leading-[1.08] tracking-tight font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Design in Figma.{" "}
              <span className="text-[var(--brand)]">Build with AI.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              A practical course that teaches UX designers how to take their
              designs from Figma all the way to production code — using Claude
              Code as your engineering partner.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/curriculum"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Start Learning Path
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="#pipeline"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>

          {/* Right — network illustration */}
          <div className="hidden lg:block">
            <div className="relative rounded-2xl border border-border bg-card p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand)]/5 to-transparent pointer-events-none" />
              <svg viewBox="0 0 400 300" className="w-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="100" y1="80" x2="200" y2="150" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5"/>
                <line x1="300" y1="80" x2="200" y2="150" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5"/>
                <line x1="200" y1="150" x2="100" y2="220" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5"/>
                <line x1="200" y1="150" x2="300" y2="220" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5"/>
                <line x1="100" y1="80" x2="300" y2="80" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"/>
                <line x1="100" y1="220" x2="300" y2="220" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"/>
                <rect x="68" y="56" width="64" height="48" rx="12" fill="oklch(0.13 0 0)" />
                <text x="100" y="75" fontSize="10" fill="white" textAnchor="middle" fontFamily="monospace" fontWeight="600">Figma</text>
                <text x="100" y="90" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontFamily="monospace">design</text>
                <circle cx="200" cy="150" r="32" fill="oklch(0.63 0.16 52)" />
                <text x="200" y="145" fontSize="9" fill="white" textAnchor="middle" fontFamily="monospace" fontWeight="600">Claude</text>
                <text x="200" y="158" fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="monospace">Code</text>
                <rect x="268" y="56" width="64" height="48" rx="12" fill="oklch(0.22 0 0)" />
                <text x="300" y="75" fontSize="10" fill="white" textAnchor="middle" fontFamily="monospace" fontWeight="600">Spec</text>
                <text x="300" y="90" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontFamily="monospace">.md</text>
                <rect x="68" y="196" width="64" height="48" rx="12" fill="oklch(0.30 0 0)" />
                <text x="100" y="220" fontSize="10" fill="white" textAnchor="middle" fontFamily="monospace" fontWeight="600">code</text>
                <text x="100" y="233" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontFamily="monospace">.tsx</text>
                <rect x="268" y="196" width="64" height="48" rx="12" fill="oklch(0.40 0.08 52)" />
                <text x="300" y="220" fontSize="10" fill="white" textAnchor="middle" fontFamily="monospace" fontWeight="600">Ship</text>
                <text x="300" y="233" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontFamily="monospace">prod</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Phase Journey */}
      <section id="phases" className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-baseline gap-4 mb-10">
            <h2 className="text-2xl font-bold tracking-tight">The Learning Journey</h2>
            <span className="text-sm text-muted-foreground font-mono">5 phases</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {phases.map((phase) => (
              <Link
                key={phase.id}
                href={`/curriculum#${phase.id}`}
                className="group block"
              >
                <div className="border border-border rounded-xl p-4 bg-background hover:border-foreground hover:shadow-sm transition-all duration-150 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${phase.dot}`} />
                    <span className="font-mono text-xs text-muted-foreground font-medium">
                      Phase {phase.num}
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-foreground mb-2">
                    {phase.name}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {phase.description}
                  </p>
                  <div className="text-xs text-muted-foreground font-mono">
                    {phase.modules} {phase.modules === 1 ? "module" : "modules"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Master */}
      <section id="pipeline" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                What You&apos;ll Master
              </h2>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                A complete, end-to-end design-to-code pipeline using industry tools.
              </p>
              <ul className="space-y-3">
                {pipeline.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[var(--brand)] flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                3 Spec Types
              </h2>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                Learn to write precise specs that AI can actually act on.
              </p>
              <div className="space-y-3">
                {specTypes.map((s) => (
                  <Card key={s.num} className="border-border shadow-none">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="font-mono text-2xl font-bold text-[var(--brand)] tabular-nums leading-none mt-0.5">
                        {s.num}
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">{s.title}</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="border-t border-border bg-foreground">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-bold text-background mb-1">
              This site is built using the method it teaches.
            </div>
            <p className="text-sm text-background/60">
              Every page, component, and spec was produced using the course workflow.
            </p>
          </div>
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-background/30 rounded-lg text-sm font-medium text-background hover:bg-background/10 transition-colors whitespace-nowrap"
          >
            Start learning path →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>Vibe Coding for Designers — ITX UX AI Workshop</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

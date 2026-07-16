import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ModuleStepper } from "@/components/module-stepper";
import { ModuleCheckpoint } from "@/components/module-checkpoint";
import { ModuleLockGate } from "@/components/module-lock-gate";
import { allModules, capstoneModule } from "@/lib/course-data";
import { moduleContent } from "@/lib/module-content";

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

/** The capstone is self-assessed on its own page — it has no checkpoint screen. */
const checkpointModules = allModules.filter((m) => m.slug !== capstoneModule.slug);

export async function generateStaticParams() {
  return checkpointModules.map((m) => ({ slug: m.slug }));
}

export default async function CheckpointPage({ params }: Props) {
  const { slug } = await params;
  const mod = checkpointModules.find((m) => m.slug === slug);
  if (!mod) notFound();

  const content = moduleContent[slug];
  if (!content) notFound();

  const pStyle = phaseStyles[mod.phaseId] ?? phaseStyles.phase0;

  const idx = allModules.findIndex((m) => m.slug === slug);
  const next = idx < allModules.length - 1 ? allModules[idx + 1] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <ModuleLockGate slug={slug} />
      <SiteNav />
      <ModuleStepper currentSlug={slug} />

      <main className="max-w-[860px] mx-auto px-7 pt-12 pb-20 w-full">
        {/* ─── Checkpoint Header ─── */}
        <header className="mb-12">
          <div className="flex gap-2.5 mb-5 flex-wrap">
            <span
              className="font-mono text-xs font-bold uppercase tracking-[0.1em] border-[2px] border-[#191510] rounded-lg px-3 py-1.5 shadow-[2px_2px_0_#191510] -rotate-[1.5deg] inline-block"
              style={{ backgroundColor: pStyle.bg, color: pStyle.text }}
            >
              {mod.phase} · Module {mod.num}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] bg-white border-[2px] border-[#191510] rounded-lg px-3 py-1.5 shadow-[2px_2px_0_#191510] rotate-1 inline-block text-[#191510]">
              Checkpoint
            </span>
            <span className="font-[family-name:var(--font-caveat)] text-[22px] font-bold text-[#7B5CFF] ml-1.5 self-center">
              prove it &darr;
            </span>
          </div>

          <h1 className="text-[clamp(40px,4.6vw,58px)] font-extrabold tracking-[-0.035em] leading-[1.02] mb-3.5">
            {mod.title}
            <span className="text-[var(--brand)]">.</span>{" "}
            <span className="whitespace-nowrap">Checkpoint</span>
          </h1>
          <p className="text-[18px] leading-[1.6] max-w-[600px] font-medium">
            Do the hands-on exercise, then check what you&rsquo;ve learned. Pass both and{" "}
            {next ? <strong>{next.title}</strong> : "the rest of the course"} unlocks — you can
            go back to the lesson to review at any time.
          </p>
        </header>

        <ModuleCheckpoint
          slug={slug}
          accentBg={pStyle.bg}
          accentText={pStyle.text}
          exercise={content.exercise}
          deliverable={content.deliverable}
          quiz={content.quiz}
          lesson={{ slug: mod.slug, title: mod.title }}
          next={next ? { slug: next.slug, title: next.title } : null}
        />
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

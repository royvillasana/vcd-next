"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { phases, capstoneModule } from "@/lib/course-data";

const phaseConfig: Record<
  string,
  { label: string; inactive: string; active: string; done: string; connector: string; ring: string }
> = {
  phase0: {
    label: "Foundation",
    inactive: "bg-stone-100 border-stone-400 text-stone-600 hover:bg-stone-200 hover:border-stone-500",
    active:   "bg-stone-700 border-stone-700 text-white shadow-md",
    done:     "bg-stone-200 border-stone-300 text-stone-500",
    connector: "bg-stone-300",
    ring:     "ring-stone-400",
  },
  phase1: {
    label: "Read the Stack",
    inactive: "bg-slate-100 border-slate-400 text-slate-600 hover:bg-slate-200 hover:border-slate-500",
    active:   "bg-slate-700 border-slate-700 text-white shadow-md",
    done:     "bg-slate-200 border-slate-300 text-slate-500",
    connector: "bg-slate-300",
    ring:     "ring-slate-400",
  },
  phase2: {
    label: "Write Specs",
    inactive: "bg-violet-50 border-violet-400 text-violet-600 hover:bg-violet-100 hover:border-violet-600",
    active:   "bg-violet-600 border-violet-600 text-white shadow-md",
    done:     "bg-violet-100 border-violet-300 text-violet-500",
    connector: "bg-violet-300",
    ring:     "ring-violet-400",
  },
  phase3: {
    label: "Build with AI",
    inactive: "bg-emerald-50 border-emerald-500 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-600",
    active:   "bg-emerald-600 border-emerald-600 text-white shadow-md",
    done:     "bg-emerald-100 border-emerald-300 text-emerald-600",
    connector: "bg-emerald-300",
    ring:     "ring-emerald-400",
  },
  phase4: {
    label: "Ship It",
    inactive: "bg-amber-50 border-amber-400 text-amber-700 hover:bg-amber-100 hover:border-amber-500",
    active:   "bg-amber-500 border-amber-500 text-white shadow-md",
    done:     "bg-amber-100 border-amber-300 text-amber-600",
    connector: "bg-amber-300",
    ring:     "ring-amber-400",
  },
};

interface Props {
  currentSlug: string;
}

function CheckIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path
        d="M1.5 4l1.5 1.5 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ModuleStepper({ currentSlug }: Props) {
  const allSlugs = [
    ...phases.flatMap((p) => p.modules.map((m) => m.slug)),
    capstoneModule.slug,
  ];
  const currentIndex = allSlugs.indexOf(currentSlug);

  return (
    /* px-1 py-1 give the rings room so they aren't clipped by overflow-x-auto */
    <div className="mb-6 overflow-x-auto">
      <div className="flex items-start gap-0 min-w-max px-1 py-1">
        {phases.map((phase, phaseIdx) => {
          const cfg = phaseConfig[phase.id];
          const isPhaseActive = phase.modules.some((m) => m.slug === currentSlug);

          return (
            <div key={phase.id} className="flex items-start">
              <div className="flex flex-col items-start gap-1.5">
                {/* Phase label */}
                <div
                  className={`px-1 text-[9px] font-mono uppercase tracking-widest whitespace-nowrap transition-colors ${
                    isPhaseActive
                      ? "text-foreground font-bold"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {cfg.label}
                </div>

                {/* Module steps */}
                <div className="flex items-center gap-1">
                  {phase.modules.map((mod, modIdx) => {
                    const modIndex = allSlugs.indexOf(mod.slug);
                    const isActive = mod.slug === currentSlug;
                    const isDone = modIndex < currentIndex;

                    const stepClass = isActive
                      ? `${cfg.active} ring-2 ${cfg.ring} ring-offset-2 ring-offset-background`
                      : isDone
                      ? cfg.done
                      : cfg.inactive;

                    return (
                      <div key={mod.id} className="flex items-center gap-1">
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Link
                                href={`/modules/${mod.slug}`}
                                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-mono text-[9px] font-bold transition-all duration-150 ${stepClass}`}
                                aria-current={isActive ? "step" : undefined}
                              >
                                {isDone ? <CheckIcon /> : mod.num}
                              </Link>
                            }
                          />
                          <TooltipContent side="bottom">
                            <div className="font-medium">{mod.title}</div>
                            <div className="text-muted-foreground mt-0.5 text-[10px]">
                              {mod.duration} · {mod.phase}
                            </div>
                          </TooltipContent>
                        </Tooltip>

                        {modIdx < phase.modules.length - 1 && (
                          <div
                            className={`w-3 h-0.5 flex-shrink-0 rounded-full ${
                              isDone ? cfg.connector : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Connector between phases */}
              {phaseIdx < phases.length - 1 && (
                <div className="flex flex-col items-start gap-1.5 mx-1.5">
                  <div className="h-[14px]" />
                  <div className="flex items-center h-7">
                    <div className="w-4 h-0.5 bg-border/50 rounded-full flex-shrink-0" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Capstone */}
        <div className="flex items-start">
          <div className="flex flex-col items-start gap-1.5 mx-1.5">
            <div className="h-[14px]" />
            <div className="flex items-center h-7">
              <div className="w-4 h-0.5 bg-border/50 rounded-full flex-shrink-0" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5">
            <div
              className={`px-1 text-[9px] font-mono uppercase tracking-widest whitespace-nowrap transition-colors ${
                currentSlug === capstoneModule.slug
                  ? "text-[var(--brand)] font-bold"
                  : "text-muted-foreground/60"
              }`}
            >
              Capstone
            </div>

            {(() => {
              const capstoneIndex = allSlugs.indexOf(capstoneModule.slug);
              const isActive = currentSlug === capstoneModule.slug;
              const isDone = capstoneIndex < currentIndex;
              const capstoneClass = isActive
                ? "bg-[var(--brand)] border-[var(--brand)] text-white ring-2 ring-[var(--brand)]/50 ring-offset-2 ring-offset-background shadow-md"
                : isDone
                ? "bg-[var(--brand)]/10 border-[var(--brand)]/30 text-[var(--brand)]/60"
                : "bg-[var(--brand)]/5 border-[var(--brand)]/50 text-[var(--brand)] hover:bg-[var(--brand)]/10 hover:border-[var(--brand)]";

              return (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Link
                        href={`/modules/${capstoneModule.slug}`}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] transition-all duration-150 ${capstoneClass}`}
                        aria-current={isActive ? "step" : undefined}
                      >
                        {isDone ? <CheckIcon /> : "★"}
                      </Link>
                    }
                  />
                  <TooltipContent side="bottom">
                    <div className="font-medium">{capstoneModule.title}</div>
                    <div className="text-muted-foreground mt-0.5 text-[10px]">
                      {capstoneModule.duration}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

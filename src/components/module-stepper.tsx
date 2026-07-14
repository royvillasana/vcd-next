"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { phases, capstoneModule, allModules } from "@/lib/course-data";
import { useReviewMode } from "@/lib/use-review-mode";

interface Props {
  currentSlug: string;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7.5l2.5 2.5 5.5-5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6.5" width="9" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 6.5V4.8a2.5 2.5 0 0 1 5 0V6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ModuleStepper({ currentSlug }: Props) {
  const review = useReviewMode();
  const allSlugs = allModules.map((m) => m.slug);
  const currentIndex = allSlugs.indexOf(currentSlug);

  // Which modules the learner has completed (localStorage, kept live)
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const read = () => {
      const done = new Set<string>();
      for (const slug of allSlugs) {
        try {
          if (localStorage.getItem(`vcd-complete-${slug}`) === "1") done.add(slug);
        } catch {
          // ignore
        }
      }
      setCompleted(done);
      setHydrated(true);
    };
    read();
    window.addEventListener("vcd-progress", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("vcd-progress", read);
      window.removeEventListener("storage", read);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A module is reachable if it's at or before the current one, already
  // completed, or its immediate predecessor is completed (sequential unlock).
  const isUnlocked = (nodeIndex: number, slug: string) => {
    if (review) return true;
    if (nodeIndex <= currentIndex) return true;
    if (!hydrated) return false;
    if (completed.has(slug)) return true;
    const prev = allSlugs[nodeIndex - 1];
    return prev ? completed.has(prev) : false;
  };

  // Build a flat list of nodes with phase info
  const nodes: {
    slug: string;
    num: string;
    title: string;
    duration: string;
    phase: string;
    bgHex: string;
    isCapstone: boolean;
  }[] = [];

  for (const phase of phases) {
    for (const mod of phase.modules) {
      nodes.push({
        slug: mod.slug,
        num: mod.num,
        title: mod.title,
        duration: mod.duration,
        phase: phase.name,
        bgHex: phase.bgHex,
        isCapstone: false,
      });
    }
  }

  nodes.push({
    slug: capstoneModule.slug,
    num: capstoneModule.num,
    title: capstoneModule.title,
    duration: capstoneModule.duration,
    phase: "Capstone",
    bgHex: "#FFC933",
    isCapstone: true,
  });

  return (
    <div className="border-b-[3px] border-[#191510] bg-white overflow-x-auto">
      <div className="max-w-[1240px] mx-auto px-7 py-[18px] pb-11 flex items-center gap-2 min-w-max">
        {nodes.map((node, i) => {
          const nodeIndex = allSlugs.indexOf(node.slug);
          const isCurrent = node.slug === currentSlug;
          const unlocked = isUnlocked(nodeIndex, node.slug);
          const isDone = nodeIndex < currentIndex;
          const locked = !unlocked && !isCurrent;
          const isFuture = !isDone && !isCurrent;

          // Node styles
          let nodeClasses =
            "rounded-full border-[3px] border-[#191510] flex items-center justify-center font-mono font-bold no-underline transition-transform duration-[120ms] relative";

          if (locked) {
            nodeClasses +=
              " bg-white text-[#191510]/35 w-9 h-9 text-xs opacity-60 cursor-not-allowed";
          } else if (isDone) {
            nodeClasses += " bg-[#1FA45B] text-white w-9 h-9 text-xs hover:scale-110";
          } else if (isCurrent) {
            nodeClasses +=
              " bg-[var(--brand)] text-white w-11 h-11 text-sm animate-[vcd-pulse-ring_2s_infinite] hover:scale-110";
          } else {
            nodeClasses += " text-[#191510] w-9 h-9 text-xs opacity-70 hover:scale-110";
          }

          // Connector dash (after each node except the last)
          const showConnector = i < nodes.length - 1;
          const connectorDone = isDone;

          const nodeInner = (
            <>
              {locked ? (
                <LockIcon />
              ) : isDone ? (
                <CheckIcon />
              ) : node.isCapstone ? (
                "★"
              ) : (
                node.num
              )}

              {/* "you are here" label for current */}
              {isCurrent && (
                <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 font-[family-name:var(--font-caveat)] text-[var(--brand)] font-bold text-[18px] -rotate-2 whitespace-nowrap pointer-events-none select-none">
                  &uarr; you are here!
                </span>
              )}
            </>
          );

          return (
            <div key={node.slug} className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger
                  render={
                    locked ? (
                      <div
                        className={nodeClasses}
                        aria-disabled="true"
                        style={isFuture ? { backgroundColor: node.bgHex } : undefined}
                      >
                        {nodeInner}
                      </div>
                    ) : (
                      <Link
                        href={`/modules/${node.slug}`}
                        className={nodeClasses}
                        style={
                          isFuture ? { backgroundColor: node.bgHex } : undefined
                        }
                      >
                        {nodeInner}
                      </Link>
                    )
                  }
                />
                <TooltipContent side="bottom">
                  <div className="font-medium">{node.title}</div>
                  <div className="text-muted-foreground mt-0.5 text-[10px]">
                    {locked
                      ? "🔒 Finish the previous module to unlock"
                      : `${node.duration} · ${node.phase}`}
                  </div>
                </TooltipContent>
              </Tooltip>

              {showConnector && (
                <div
                  className={`w-5 h-[3px] rounded-full flex-shrink-0 ${
                    connectorDone ? "bg-[#191510]" : "bg-[#191510]/20"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

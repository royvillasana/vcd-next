"use client";

import { useEffect, useRef, useState } from "react";

interface Section {
  heading: string;
  id: string;
  subs?: { label: string; id: string; num?: string }[];
}

interface Props {
  sections: Section[];
  slug: string;
  accentDot: string;
}

function getCheer(visitedCount: number, totalCount: number): string {
  if (totalCount > 0 && visitedCount >= totalCount) return "complete! 🎉";
  if (visitedCount >= 3) return "on fire! 🔥";
  if (visitedCount >= 1) return "nice start! ✨";
  return "let's go! 🚀";
}

export function ModuleSidebar({ sections, slug }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Total number of trackable sections (top-level only for progress)
  const totalSections = sections.length;
  const visitedTopLevel = sections.filter(
    (s) => visited.has(s.id)
  ).length;
  const progressPct =
    totalSections > 0
      ? Math.round((visitedTopLevel / totalSections) * 100)
      : 0;

  // Load visited from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`vcd-visited-${slug}`);
      if (raw) {
        setVisited(new Set(JSON.parse(raw) as string[]));
      }
    } catch {
      // ignore
    }
  }, [slug]);

  // Persist visited to localStorage
  const markVisited = (id: string) => {
    setVisited((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(`vcd-visited-${slug}`, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // IntersectionObserver for active section
  useEffect(() => {
    const allIds = sections.flatMap((s) => [
      s.id,
      ...(s.subs?.map((sub) => sub.id) ?? []),
    ]);

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveId(id);
          markVisited(id);
        }
      },
      {
        rootMargin: "-64px 0px -40% 0px",
        threshold: 0,
      }
    );

    for (const id of allIds) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, sections]);

  const isActive = (id: string) => activeId === id;
  const isVisited = (id: string) => visited.has(id) && !isActive(id);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        {/* ── Progress card ── */}
        <div className="border-[3px] border-[#191510] rounded-[20px] bg-white p-5 shadow-[5px_5px_0_#191510] mb-5">
          <div className="flex justify-between items-center mb-2.5">
            <span className="font-extrabold text-sm">Module progress</span>
            <span className="font-mono text-xs font-bold">
              {progressPct}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-3.5 border-[2px] border-[#191510] rounded-full overflow-hidden bg-[#FAF3E7]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPct}%`,
                background:
                  "repeating-linear-gradient(-45deg, #1FA45B 0 8px, #23B968 8px 16px)",
                transition:
                  "width 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </div>

          {/* Cheer text */}
          <p className="font-[family-name:var(--font-caveat)] text-[17px] font-bold text-[#7B5CFF] text-right mt-1.5">
            {getCheer(visitedTopLevel, totalSections)}
          </p>
        </div>

        {/* ── TOC label ── */}
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] opacity-55 px-1 mb-2.5">
          On this page
        </div>

        {/* ── TOC items ── */}
        <nav className="space-y-0.5">
          {sections.map((section) => {
            const active = isActive(section.id);
            const done = isVisited(section.id);

            return (
              <div key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-[2px] transition-all text-sm ${
                    active
                      ? "border-[#191510] bg-[var(--accent-yellow)] font-bold"
                      : done
                        ? "border-transparent"
                        : "border-transparent hover:border-[#191510]"
                  }`}
                >
                  {/* Dot */}
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-[2px] border-[#191510] flex items-center justify-center ${
                      done
                        ? "bg-[#1FA45B]"
                        : active
                          ? "bg-[var(--accent-yellow)]"
                          : "bg-transparent"
                    }`}
                  >
                    {done && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5.5l2 2 4-4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="truncate">{section.heading}</span>
                </a>

                {/* Sub-items */}
                {section.subs && section.subs.length > 0 && (
                  <div className="pl-10 space-y-0.5 mt-0.5">
                    {section.subs.map((sub) => {
                      const subActive = isActive(sub.id);
                      const subDone = isVisited(sub.id);

                      return (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          title={sub.num ? `${sub.num} — ${sub.label}` : sub.label}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border-[2px] transition-all text-[13px] ${
                            subActive
                              ? "border-[#191510] bg-[var(--accent-yellow)] font-bold"
                              : subDone
                                ? "border-transparent"
                                : "border-transparent hover:border-[#191510]"
                          }`}
                        >
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-full border-[2px] border-[#191510] flex items-center justify-center ${
                              subDone
                                ? "bg-[#1FA45B]"
                                : subActive
                                  ? "bg-[var(--accent-yellow)]"
                                  : "bg-transparent"
                            }`}
                          >
                            {subDone && (
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M2 5.5l2 2 4-4"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          {sub.num && (
                            <span className="flex-shrink-0 font-mono text-[11px] font-bold tabular-nums opacity-55">
                              {sub.num}
                            </span>
                          )}
                          <span className="truncate">{sub.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

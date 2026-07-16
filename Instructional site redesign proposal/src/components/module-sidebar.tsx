"use client";

import { useEffect, useRef, useState } from "react";

interface Section {
  heading: string;
  id: string;
  subs?: { label: string; id: string }[];
}

interface Props {
  sections: Section[];
  slug: string;
  accentDot: string;
}

export function ModuleSidebar({ sections, slug, accentDot }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

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
      <div className="sticky top-20">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-2 mb-4">
          On This Page
        </div>
        <nav className="space-y-0.5">
          {sections.map((section) => (
            <div key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors group ${
                  isActive(section.id)
                    ? "text-foreground bg-muted font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {/* Status indicator */}
                <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  {isVisited(section.id) ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-muted-foreground/60"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : isActive(section.id) ? (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${accentDot}`}
                    />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                  )}
                </span>
                <span className="truncate">{section.heading}</span>
              </a>

              {section.subs && section.subs.length > 0 && (
                <div className="pl-6 space-y-0.5 mt-0.5">
                  {section.subs.map((sub) => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors ${
                        isActive(sub.id)
                          ? "text-foreground bg-muted font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      <span className="flex-shrink-0 w-3 h-3 flex items-center justify-center">
                        {isVisited(sub.id) ? (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            className="text-muted-foreground/50"
                          >
                            <path
                              d="M1.5 5l2.5 2.5 4.5-4.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-border/60" />
                        )}
                      </span>
                      <span className="truncate">{sub.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Progress indicator */}
        <div className="mt-6 px-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground font-mono">Progress</span>
            <span className="text-xs text-muted-foreground font-mono tabular-nums">
              {visited.size}/{sections.length}
            </span>
          </div>
          <div className="h-1 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-500"
              style={{
                width: `${sections.length > 0 ? (visited.size / sections.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

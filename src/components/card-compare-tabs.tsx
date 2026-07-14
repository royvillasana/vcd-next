"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  The two cards a designer gets from the same "make a card" intent   */
/*  — same content, two very different levels of craft.                */
/* ------------------------------------------------------------------ */

/** Vibe coding: probably works. Hardcoded values, generic spacing, no states. */
function VibeCard() {
  return (
    <div className="w-full max-w-[300px] rounded-lg border border-gray-300 bg-white p-3.5 shadow-md">
      <h4 className="mb-1.5 text-[15px] font-semibold text-gray-800">
        Design tokens
      </h4>
      <p className="mb-3 text-[13px] text-gray-500">
        Named design decisions like color, spacing and radius referenced
        instead of hardcoded.
      </p>
      <button
        type="button"
        className="rounded bg-blue-500 px-3 py-1.5 text-[13px] text-white"
      >
        Learn more
      </button>
    </div>
  );
}

/** Design engineering: token-referenced, real hierarchy, every state handled. */
function DeCard() {
  return (
    <div className="group w-full max-w-[300px] rounded-xl border-[2px] border-[#E4DED0] bg-white p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#191510] hover:shadow-[4px_4px_0_#191510]">
      {/* Title row */}
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border-[2px] border-[#191510] bg-[#B9A5FF] text-[15px]">
          🎨
        </span>
        <h4 className="text-[18px] font-bold leading-tight text-[#191510]">
          Design tokens
        </h4>
      </div>

      {/* Body — 14px / 1.5 / secondary */}
      <p className="mb-4 text-[14px] leading-[1.5] text-[#191510]/60">
        Named design decisions — color, spacing, radius — referenced instead of
        hardcoded.
      </p>

      {/* Real button with hover + focus-visible ring */}
      <button
        type="button"
        className="rounded-lg border-[2px] border-[#191510] bg-[#191510] px-4 py-2 text-[14px] font-semibold text-[#FAF3E7] transition-colors hover:bg-[#2b241b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5CFF] focus-visible:ring-offset-2"
      >
        Learn more
      </button>

      {/* States strip — proof every state was considered */}
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#191510]/10 pt-3">
        {["default", "hover", "focus", "disabled"].map((s) => (
          <span
            key={s}
            className="rounded-full border border-[#191510]/20 bg-[#6FE3A5]/40 px-2 py-0.5 font-mono text-[10px] text-[#191510]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tabbed comparison                                                  */
/* ------------------------------------------------------------------ */

type TabKey = "vibe" | "de";

const TABS: { key: TabKey; label: string }[] = [
  { key: "vibe", label: "Vibe coding" },
  { key: "de", label: "Design engineering" },
];

const CAPTIONS: Record<TabKey, string> = {
  vibe: "Probably works — but hardcoded values, generic spacing, and no hover / focus / disabled states. You can’t explain the choices.",
  de: "24px padding · 12px radius · token-referenced type & color · every state handled · WCAG AA. Hover the card, and tab into the button.",
};

export function CardCompareTabs() {
  const [active, setActive] = useState<TabKey>("vibe");

  return (
    <div className="flex flex-col overflow-hidden rounded-[18px] border-[3px] border-[#191510] bg-[#FAF3E7] shadow-[3px_3px_0_#191510]">
      {/* Tab bar */}
      <div className="flex border-b-[3px] border-[#191510]">
        {TABS.map((t) => {
          const on = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className="flex-1 border-r-[3px] border-[#191510] px-4 py-2.5 font-mono text-[13px] font-bold transition-colors last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7B5CFF]"
              style={{
                backgroundColor: on ? "#191510" : "transparent",
                color: on ? "#FAF3E7" : "#191510",
              }}
              aria-pressed={on}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Preview stage */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-8">
        {active === "vibe" ? <VibeCard /> : <DeCard />}
        <p className="max-w-[320px] text-center text-[12.5px] font-medium leading-[1.5] text-[#191510]/70">
          {CAPTIONS[active]}
        </p>
      </div>
    </div>
  );
}

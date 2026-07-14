"use client";

import { useReviewMode } from "@/lib/use-review-mode";

export function ReviewModeBanner() {
  const review = useReviewMode();
  if (!review) return null;

  const exit = () => {
    try {
      localStorage.removeItem("vcd-review");
    } catch {
      // ignore
    }
    // reload without the ?review query so the flag is fully cleared
    window.location.href = window.location.pathname;
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-3 rounded-full border-[3px] border-[#191510] bg-[var(--accent-yellow)] px-5 py-2.5 shadow-[4px_4px_0_#191510]">
      <span className="text-[14px] font-extrabold text-[#191510]">
        🔎 Review mode — everything unlocked
      </span>
      <button
        type="button"
        onClick={exit}
        className="rounded-full border-[2px] border-[#191510] bg-[#191510] px-3 py-1 text-[12px] font-bold text-[#FAF3E7] transition-colors hover:bg-[#2b241b]"
      >
        Exit
      </button>
    </div>
  );
}

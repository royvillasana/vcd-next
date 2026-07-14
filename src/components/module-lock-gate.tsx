"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allModules } from "@/lib/course-data";
import { useReviewMode } from "@/lib/use-review-mode";

/**
 * Client-side soft gate. If the current module isn't unlocked yet (its
 * predecessor hasn't been completed), it covers the page with a "finish the
 * previous module first" interstitial. Completion lives in localStorage
 * (`vcd-complete-${slug}`), written by ModuleCompletion.
 */
export function ModuleLockGate({ slug }: { slug: string }) {
  const review = useReviewMode();
  const [locked, setLocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const idx = allModules.findIndex((m) => m.slug === slug);
  const prev = idx > 0 ? allModules[idx - 1] : null;

  /* eslint-disable react-hooks/set-state-in-effect -- one-time gate check from persisted local state */
  useEffect(() => {
    const isComplete = (s: string) => {
      try {
        return localStorage.getItem(`vcd-complete-${s}`) === "1";
      } catch {
        return false;
      }
    };
    const unlocked =
      review ||
      idx <= 0 ||
      isComplete(slug) ||
      (prev ? isComplete(prev.slug) : false);
    setLocked(!unlocked);
    setHydrated(true);
  }, [slug, idx, prev, review]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Disable background scroll while the interstitial is up
  useEffect(() => {
    if (!hydrated || !locked) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [hydrated, locked]);

  // Remember the last accessible module, so the header can offer "Continue learning"
  useEffect(() => {
    if (!hydrated || locked) return;
    try {
      localStorage.setItem("vcd-last-module", slug);
    } catch {
      // ignore
    }
  }, [hydrated, locked, slug]);

  // Before hydration, or when unlocked, render nothing (content shows normally)
  if (!hydrated || !locked) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF3E7] px-6"
    >
      <div className="w-full max-w-[460px] rounded-[24px] border-[3px] border-[#191510] bg-white p-8 text-center shadow-[8px_8px_0_#191510]">
        <div className="mx-auto mb-5 flex h-16 w-16 -rotate-3 items-center justify-center rounded-2xl border-[3px] border-[#191510] bg-[var(--accent-yellow)] shadow-[4px_4px_0_#191510]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10.5" width="16" height="10" rx="2" stroke="#191510" strokeWidth="2.2" />
            <path d="M7.5 10.5V8a4.5 4.5 0 0 1 9 0v2.5" stroke="#191510" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="15.5" r="1.5" fill="#191510" />
          </svg>
        </div>

        <h1 className="mb-2 text-[28px] font-extrabold tracking-[-0.02em]">
          This module is locked
        </h1>
        <p className="mb-6 text-[15.5px] font-medium leading-[1.6] opacity-75">
          {prev ? (
            <>
              Finish <strong>{prev.title}</strong> — its hands-on exercise and
              quiz — to unlock this one.
            </>
          ) : (
            "Complete the previous module to unlock this one."
          )}
        </p>

        <div className="flex flex-col gap-2.5">
          {prev && (
            <Link
              href={`/modules/${prev.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-[#191510] bg-foreground px-6 py-3 text-[15px] font-extrabold text-background shadow-[4px_4px_0_var(--brand)] transition-all duration-[120ms] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
            >
              Go to {prev.title} &rarr;
            </Link>
          )}
          <Link
            href="/curriculum"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[2px] border-[#191510] px-6 py-3 text-[15px] font-bold transition-colors hover:bg-[#191510] hover:text-background"
          >
            Back to Syllabus
          </Link>
        </div>
      </div>
    </div>
  );
}

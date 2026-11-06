"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const DISMISS_KEY = "vcd-restore-banner-dismissed";

/**
 * Home-page notice for learners whose progress didn't come across when the course
 * moved to a new address. Hidden once they have progress here, or dismiss it.
 */
export function RestoreBanner() {
  const [show, setShow] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- reads browser-only state once on arrival */
  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.startsWith("vcd-complete-")) return; // already has progress
      }
    } catch {
      // storage unavailable — still show the notice
    }
    setShow(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <section
      aria-label="Returning learners"
      className="border-b-[3px] border-[#191510] bg-[#FFC933] px-6 py-3"
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[14.5px] font-bold text-[#191510]">
        <p>
          <span aria-hidden="true">👋 </span>
          <strong className="font-extrabold">The course has a new address.</strong> Already started the learning path?
          Pick up where you left off.
        </p>
        <Link
          href="/transfer"
          className="rounded-full border-[2px] border-[#191510] bg-[#191510] px-4 py-1.5 text-[13.5px] font-extrabold text-[#FAF3E7] shadow-[3px_3px_0_#FF4D24] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          Restore my progress →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-full border-[2px] border-[#191510] px-3 py-1 text-[13px] font-extrabold hover:bg-[#191510] hover:text-[#FFC933]"
        >
          Dismiss
          <span className="sr-only"> returning learners notice</span>
        </button>
      </div>
    </section>
  );
}

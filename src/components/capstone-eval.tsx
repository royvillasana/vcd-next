"use client";

import { useState, useEffect } from "react";

const questions = [
  "Does it match your Figma design to your own standard of quality?",
  "Does the code use your token file consistently — no hardcoded values?",
  "Could an engineer read your PR and understand every decision you made?",
  "Would you put this URL in your portfolio today?",
];

export function CapstoneEval() {
  const [checks, setChecks] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vcd2-capstone-eval");
      if (raw) setChecks(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function toggle(i: number) {
    setChecks((prev) => {
      const next = prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i];
      try {
        localStorage.setItem("vcd2-capstone-eval", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  const allChecked = checks.length === 4;

  return (
    <div
      className="border-[3px] border-[#FFC933] rounded-[26px] p-9 relative"
      style={{ background: "rgba(255,201,51,0.06)" }}
    >
      {/* Floating badge */}
      <div
        className="absolute -top-5 left-9 bg-[#FFC933] text-[#191510] border-[3px] border-[#191510] rounded-full px-5 py-[7px] font-extrabold text-[15px] -rotate-2"
      >
        Your own standard
      </div>

      <h2 className="text-[30px] font-extrabold tracking-[-0.025em] mt-2 mb-2">
        The four evaluation questions
      </h2>
      <p className="text-[15.5px] opacity-75 mb-6 font-medium max-w-[640px]">
        Nobody grades this but you. Check each one honestly — four yeses means you&apos;re done.
      </p>

      <div className="flex flex-col gap-3">
        {questions.map((text, i) => {
          const checked = checks.includes(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl border-[2px] text-left font-bold text-[16px] w-full transition-all duration-[140ms] hover:border-[#FFC933] hover:translate-x-1.5 text-[#FAF3E7]"
              style={{
                background: checked ? "rgba(255,201,51,0.12)" : "rgba(250,243,231,0.04)",
                borderColor: checked ? "#FFC933" : "rgba(250,243,231,0.25)",
              }}
            >
              <span
                className="w-[30px] h-[30px] rounded-full border-[3px] flex items-center justify-center flex-shrink-0"
                style={{
                  background: checked ? "#FFC933" : "transparent",
                  borderColor: checked ? "#FFC933" : "rgba(250,243,231,0.4)",
                }}
              >
                {checked && (
                  <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#191510" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {text}
            </button>
          );
        })}
      </div>

      {allChecked && (
        <div className="mt-5 px-6 py-[18px] rounded-2xl border-[3px] border-[#191510] bg-[#FFC933] text-[#191510] font-extrabold text-[19px] text-center animate-[vcd-pop_300ms_ease-out]">
          🎉 Four yeses — ship it. You&apos;ve completed the course.
        </div>
      )}
    </div>
  );
}

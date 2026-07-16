"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ExerciseResource, QuizQuestion } from "@/lib/module-content";
import { useReviewMode } from "@/lib/use-review-mode";

interface NavItem {
  slug: string;
  title: string;
}

interface Props {
  slug: string;
  accentBg: string;
  accentText: string;
  exercise: {
    title: string;
    description: string;
    steps: string[];
    resource?: ExerciseResource;
  };
  deliverable: { title: string; description: string };
  quiz?: QuizQuestion[];
  /** The lesson screen this checkpoint belongs to — always reachable for review. */
  lesson: NavItem;
  /** The module unlocked by passing this checkpoint. */
  next: NavItem | null;
}

function CheckSvg({ className = "" }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M2.5 7.5l2.5 2.5 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ModuleCheckpoint({
  slug,
  accentBg,
  accentText,
  exercise,
  deliverable,
  quiz,
  lesson,
  next,
}: Props) {
  const review = useReviewMode();
  const [checked, setChecked] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage (SSR-safe: start empty, load once after mount).
  /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from persisted local state */
  useEffect(() => {
    try {
      const c = localStorage.getItem(`vcd-exercise-${slug}`);
      if (c) setChecked(JSON.parse(c) as number[]);
      const a = localStorage.getItem(`vcd-quiz-${slug}`);
      if (a) setAnswers(JSON.parse(a) as Record<number, number>);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [slug]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const persistChecked = (next: number[]) => {
    setChecked(next);
    try {
      localStorage.setItem(`vcd-exercise-${slug}`, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const persistAnswers = (next: Record<number, number>) => {
    setAnswers(next);
    try {
      localStorage.setItem(`vcd-quiz-${slug}`, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const toggleStep = (i: number) => {
    persistChecked(
      checked.includes(i) ? checked.filter((n) => n !== i) : [...checked, i]
    );
  };

  const selectAnswer = (qi: number, oi: number) => {
    persistAnswers({ ...answers, [qi]: oi });
  };

  const hasQuiz = !!quiz && quiz.length > 0;

  // In Review Mode, present everything as already completed without mutating
  // the learner's real saved progress.
  const effChecked = review ? exercise.steps.map((_, i) => i) : checked;
  const effAnswers: Record<number, number> = review
    ? Object.fromEntries((quiz ?? []).map((q, i) => [i, q.correct]))
    : answers;

  const exerciseDone =
    effChecked.length === exercise.steps.length && exercise.steps.length > 0;
  const correctCount = hasQuiz
    ? quiz!.filter((q, i) => effAnswers[i] === q.correct).length
    : 0;
  const quizPassed = !hasQuiz || correctCount === quiz!.length;
  const complete = exerciseDone && quizPassed;

  // Publish completion so the stepper (and other tabs) can gate/unlock dots.
  // Skip writing in Review Mode so it never pollutes real progress.
  useEffect(() => {
    if (!hydrated || review) return;
    try {
      if (complete) localStorage.setItem(`vcd-complete-${slug}`, "1");
      else localStorage.removeItem(`vcd-complete-${slug}`);
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("vcd-progress"));
  }, [complete, hydrated, slug, review]);

  return (
    <>
      {/* ─── Hands-On Exercise (interactive) ─── */}
      <section id="hands-on-exercise" className="mb-12 scroll-mt-24">
        <div className="border-[3px] border-dashed border-[#191510] rounded-[22px] bg-[#FFF6DE] p-[30px_34px] relative">
          <span className="absolute top-[-18px] left-[30px] bg-[var(--brand)] text-[#FAF3E7] border-[3px] border-[#191510] rounded-full px-[18px] py-1.5 font-extrabold text-sm shadow-[3px_3px_0_#191510] rotate-[1.5deg]">
            &#9986; Hands-on
          </span>

          <div className="flex items-center gap-3 mt-2.5 mb-2 flex-wrap">
            <h2 className="text-[28px] font-extrabold">{exercise.title}</h2>
            <span
              className={`font-mono text-[11px] font-bold uppercase tracking-wide border-[2px] border-[#191510] rounded-full px-2.5 py-1 ${
                exerciseDone ? "bg-[#1FA45B] text-white" : "bg-white text-[#191510]"
              }`}
            >
              {exerciseDone ? "Done ✓" : `${effChecked.length}/${exercise.steps.length}`}
            </span>
          </div>
          <p className="text-[15.5px] leading-[1.6] font-medium max-w-[560px] mb-6">
            {exercise.description}{" "}
            <span className="font-semibold">Click each step to confirm you did it.</span>
          </p>

          <ol className="list-none flex flex-col gap-3 mb-6">
            {exercise.steps.map((step, i) => {
              const on = effChecked.includes(i);
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => toggleStep(i)}
                    aria-pressed={on}
                    className={`w-full flex items-start gap-3.5 border-[2px] border-[#191510] rounded-[14px] p-3.5 px-[18px] text-left transition-all shadow-[3px_3px_0_#191510] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] ${
                      on ? "bg-[#E7F8EF]" : "bg-white"
                    }`}
                  >
                    <span
                      className={`w-[30px] h-[30px] rounded-full border-[2px] border-[#191510] flex items-center justify-center flex-shrink-0 font-mono text-[13px] font-bold ${
                        on ? "bg-[#1FA45B] text-white" : "bg-foreground text-background"
                      }`}
                    >
                      {on ? <CheckSvg /> : i + 1}
                    </span>
                    <span
                      className={`text-[15px] font-semibold leading-[1.55] pt-1 ${
                        on ? "line-through opacity-60" : ""
                      }`}
                    >
                      {step}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Per-exercise resource */}
          {exercise.resource && (
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={exercise.resource.href}
                {...(exercise.resource.kind === "download"
                  ? { download: true }
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-bold shadow-[4px_4px_0_var(--brand)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                {exercise.resource.label}{" "}
                {exercise.resource.kind === "download" ? "↓" : "→"}
              </a>
              {exercise.resource.note && (
                <span className="font-[family-name:var(--font-caveat)] text-[20px] font-bold text-[var(--brand)] -rotate-2">
                  {exercise.resource.note}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── Deliverable ─── */}
      <section id="deliverable" className="mb-12 scroll-mt-24">
        <div className="border-[3px] border-[#191510] rounded-[22px] p-6 shadow-[3px_3px_0_#191510]">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-[2px] border-[#191510]"
              style={{ backgroundColor: accentBg }}
            >
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" className="text-[#191510]">
                <path
                  d="M9 2L11.09 7.26L17 8.27L13 12.14L14.18 18L9 15.27L3.82 18L5 12.14L1 8.27L6.91 7.26L9 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs uppercase tracking-widest opacity-55 mb-1">
                Module Deliverable
              </div>
              <h3 className="font-extrabold text-base mb-1.5">{deliverable.title}</h3>
              <p className="text-sm font-medium opacity-70">{deliverable.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quiz ─── */}
      {hasQuiz && (
        <section id="module-quiz" className="mb-12 scroll-mt-24">
          <div className="border-[3px] border-[#191510] rounded-[22px] bg-white p-[30px_34px] shadow-[5px_5px_0_#191510] relative">
            <span
              className="absolute top-[-18px] left-[30px] border-[3px] border-[#191510] rounded-full px-[18px] py-1.5 font-extrabold text-sm shadow-[3px_3px_0_#191510] -rotate-[1.5deg]"
              style={{ backgroundColor: accentBg, color: accentText }}
            >
              &#9997; Quick check
            </span>

            <div className="flex items-center gap-3 mt-2.5 mb-2 flex-wrap">
              <h2 className="text-[28px] font-extrabold">Check what you&rsquo;ve learned</h2>
              <span
                className={`font-mono text-[11px] font-bold uppercase tracking-wide border-[2px] border-[#191510] rounded-full px-2.5 py-1 ${
                  quizPassed ? "bg-[#1FA45B] text-white" : "bg-[#FAF3E7] text-[#191510]"
                }`}
              >
                {quizPassed ? "Passed ✓" : `${correctCount}/${quiz!.length} correct`}
              </span>
            </div>
            <p className="text-[15.5px] leading-[1.6] font-medium mb-6">
              Answer every question correctly to unlock the next module. Pick the best answer — you can retry as many times as you like.
            </p>

            <div className="flex flex-col gap-6">
              {quiz!.map((q, qi) => {
                const selected = effAnswers[qi];
                const answered = selected !== undefined;
                const isCorrect = answered && selected === q.correct;
                return (
                  <div key={qi}>
                    <div className="flex items-start gap-2.5 mb-3">
                      <span className="font-mono text-[13px] font-bold opacity-50 pt-0.5 tabular-nums">
                        {String(qi + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[16px] font-bold leading-[1.4]">{q.question}</p>
                    </div>
                    <div className="flex flex-col gap-2 pl-8">
                      {q.options.map((opt, oi) => {
                        const chosen = selected === oi;
                        let cls =
                          "border-[2px] border-[#191510] bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[2px_2px_0_#191510]";
                        if (chosen && oi === q.correct) {
                          cls = "border-[2px] border-[#191510] bg-[#E7F8EF] shadow-[2px_2px_0_#1FA45B]";
                        } else if (chosen && oi !== q.correct) {
                          cls = "border-[2px] border-[#191510] bg-[#FFECE5] shadow-[2px_2px_0_#FF4D24]";
                        }
                        return (
                          <button
                            key={oi}
                            type="button"
                            onClick={() => selectAnswer(qi, oi)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-[14.5px] font-medium transition-all ${cls}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full border-[2px] border-[#191510] flex items-center justify-center flex-shrink-0 ${
                                chosen && oi === q.correct
                                  ? "bg-[#1FA45B] text-white"
                                  : chosen
                                    ? "bg-[#FF4D24] text-white"
                                    : "bg-white"
                              }`}
                            >
                              {chosen && oi === q.correct ? (
                                <CheckSvg />
                              ) : chosen ? (
                                <span className="text-[12px] font-bold leading-none">✕</span>
                              ) : null}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                    {answered && !isCorrect && (
                      <p className="pl-8 mt-1.5 text-[13px] font-semibold text-[#FF4D24]">
                        Not quite — reread{" "}
                        <Link
                          href={`/modules/${lesson.slug}`}
                          className="underline underline-offset-2 hover:opacity-70"
                        >
                          {lesson.title}
                        </Link>{" "}
                        and try again.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── Result ─── */}
      {hydrated && (
        <div className="mb-8">
          {complete ? (
            <div className="flex items-center gap-3 border-[3px] border-[#191510] rounded-[18px] bg-[#E7F8EF] px-5 py-4 shadow-[4px_4px_0_#1FA45B]">
              <span className="text-[22px]">🎉</span>
              <div>
                <p className="font-extrabold text-[16px]">Checkpoint passed!</p>
                <p className="text-[13.5px] font-medium opacity-70">
                  {next
                    ? `Exercise done and quiz passed — ${next.title} is unlocked.`
                    : "Exercise done and quiz passed — you're clear to move on."}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 border-[3px] border-dashed border-[#191510] rounded-[18px] bg-[#FFF6DE] px-5 py-4">
              <span className="text-[20px] leading-none mt-0.5">🔒</span>
              <div>
                <p className="font-extrabold text-[15px]">
                  Pass this checkpoint to unlock the next module
                </p>
                <ul className="mt-1 text-[13.5px] font-medium opacity-80 flex flex-col gap-0.5">
                  <li>{exerciseDone ? "✓" : "•"} Complete the hands-on exercise (click every step)</li>
                  {hasQuiz && (
                    <li>{quizPassed ? "✓" : "•"} Answer every quiz question correctly</li>
                  )}
                </ul>
                <p className="mt-2 text-[13.5px] font-medium opacity-80">
                  Stuck? Go back and review{" "}
                  <Link
                    href={`/modules/${lesson.slug}`}
                    className="font-bold underline underline-offset-2 hover:opacity-70"
                  >
                    {lesson.title}
                  </Link>{" "}
                  — your answers are saved.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Back to lesson / gated Next ─── */}
      <nav className="flex justify-between gap-4 pt-8 border-t-[3px] border-[#191510]">
        <Link
          href={`/modules/${lesson.slug}`}
          className="flex flex-col gap-1 p-4 border-[3px] border-[#191510] rounded-[18px] shadow-[3px_3px_0_#191510] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-[120ms] max-w-[45%]"
        >
          <span className="font-mono text-xs opacity-50">&larr; Review the lesson</span>
          <span className="text-sm font-semibold truncate">{lesson.title}</span>
        </Link>

        {next &&
          (complete ? (
            <Link
              href={`/modules/${next.slug}`}
              className="flex flex-col gap-1 p-4 border-[3px] border-[#191510] rounded-[18px] shadow-[3px_3px_0_var(--brand)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-[120ms] text-right max-w-[45%] ml-auto bg-white"
            >
              <span className="font-mono text-xs opacity-50">Next module &rarr;</span>
              <span className="text-sm font-semibold truncate">{next.title}</span>
            </Link>
          ) : (
            <div
              aria-disabled="true"
              title="Finish the exercise and quiz to unlock"
              className="flex flex-col gap-1 p-4 border-[3px] border-dashed border-[#191510]/40 rounded-[18px] text-right max-w-[45%] ml-auto opacity-55 cursor-not-allowed select-none"
            >
              <span className="font-mono text-xs opacity-60 flex items-center justify-end gap-1">
                🔒 Locked
              </span>
              <span className="text-sm font-semibold truncate">{next.title}</span>
            </div>
          ))}
      </nav>
    </>
  );
}

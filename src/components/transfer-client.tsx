"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import {
  NEW_SITE_URL,
  applyProgress,
  collectProgress,
  declareProgress,
  type CatchUpModule,
  decodeSnapshot,
  encodeSnapshot,
  type ImportSummary,
} from "@/lib/progress-transfer";

type Status =
  | { kind: "idle" }
  | { kind: "imported"; summary: ImportSummary }
  | { kind: "error"; message: string };

const btn =
  "rounded-full border-[3px] border-[#191510] bg-[#191510] px-6 py-3 text-[15px] font-extrabold text-[#FAF3E7] shadow-[4px_4px_0_#FF4D24] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none";
const btnLight =
  "rounded-full border-[3px] border-[#191510] bg-white px-6 py-3 text-[15px] font-extrabold text-[#191510] shadow-[4px_4px_0_#191510] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none";

export function TransferClient({ modules }: { modules: CatchUpModule[] }) {
  const [through, setThrough] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [saved, setSaved] = useState<number | null>(null);
  const [isOldSite, setIsOldSite] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- reads browser-only state once on arrival */
  useEffect(() => {
    // Arriving from the old site with progress in the #fragment → import it automatically.
    const match = /^#d=(.+)$/.exec(window.location.hash);
    if (match) {
      try {
        const summary = applyProgress(decodeSnapshot(match[1]));
        setStatus({ kind: "imported", summary });
      } catch (e) {
        setStatus({ kind: "error", message: e instanceof Error ? e.message : "Couldn't read the progress link." });
      }
      history.replaceState(null, "", window.location.pathname); // keep the data out of the address bar
    }
    setSaved(Object.keys(collectProgress().data).length);
    setIsOldSite(!!NEW_SITE_URL && window.location.origin !== new URL(NEW_SITE_URL).origin);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function moveToNewSite() {
    window.location.href = `${NEW_SITE_URL}/transfer#d=${encodeSnapshot(collectProgress())}`;
  }

  function downloadBackup() {
    const blob = new Blob([JSON.stringify(collectProgress(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "design-engineering-progress.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function restoreFromFile(file: File | undefined) {
    if (!file) return;
    try {
      const summary = applyProgress(JSON.parse(await file.text()));
      setStatus({ kind: "imported", summary });
      setSaved(Object.keys(collectProgress().data).length);
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : "Couldn't read that file." });
    }
  }

  function catchUp() {
    try {
      const summary = declareProgress(modules, through);
      setStatus({ kind: "imported", summary });
      setSaved(Object.keys(collectProgress().data).length);
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : "Couldn't update your progress." });
    }
  }

  const continueHref = status.kind === "imported" && status.summary.lastModule ? `/modules/${status.summary.lastModule}` : "/curriculum";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main id="main-content" className="max-w-[760px] mx-auto px-7 py-12 w-full">
        <h1 className="text-[clamp(40px,6vw,64px)] font-extrabold tracking-[-0.04em] leading-[0.95] mb-4">
          Your progress<span className="text-[var(--brand)]">.</span>
        </h1>
        <p className="text-[17px] font-medium leading-[1.6] mb-8 max-w-[600px]">
          Your progress is saved in this browser only. Use this page to move it to a new address, back it up, or restore it.
          Nothing is sent to a server.
        </p>

        <div role="status" aria-live="polite">
          {status.kind === "imported" && (
            <div className="mb-8 rounded-[20px] border-[3px] border-[#191510] bg-[#6FE3A5] p-6 shadow-[4px_4px_0_#191510]">
              <p className="text-[20px] font-extrabold text-[#191510]">Progress restored ✓</p>
              <p className="mt-1 text-[15px] font-medium text-[#191510]">
                {status.summary.imported} saved {status.summary.imported === 1 ? "item" : "items"} brought over
                {status.summary.skipped > 0 ? ` (${status.summary.skipped} skipped)` : ""}.
              </p>
              <Link href={continueHref} className={`${btn} mt-4 inline-block`}>
                {status.summary.lastModule ? "Continue where you left off →" : "Go to the syllabus →"}
              </Link>
            </div>
          )}
          {status.kind === "error" && (
            <div className="mb-8 rounded-[20px] border-[3px] border-[#191510] bg-[#FFB199] p-6 text-[#191510]">
              <p className="text-[18px] font-extrabold">That didn’t work</p>
              <p className="mt-1 text-[15px] font-medium">{status.message}</p>
            </div>
          )}
        </div>

        {isOldSite && (
          <section aria-labelledby="move-h" className="mb-8 rounded-[20px] border-[3px] border-[#191510] bg-white p-6 shadow-[4px_4px_0_#191510]">
            <h2 id="move-h" className="text-[22px] font-extrabold mb-2">Move to the new site</h2>
            <p className="text-[15px] font-medium leading-[1.6] opacity-80 mb-4">
              We’ll open the new site and carry your progress across automatically
              {saved !== null ? ` (${saved} saved ${saved === 1 ? "item" : "items"} found in this browser)` : ""}.
            </p>
            <button type="button" onClick={moveToNewSite} className={btn}>
              Move my progress →
            </button>
          </section>
        )}

        <section aria-labelledby="catchup-h" className="mb-8 rounded-[20px] border-[3px] border-[#191510] bg-white p-6 shadow-[4px_4px_0_#191510]">
          <h2 id="catchup-h" className="text-[22px] font-extrabold mb-2">Lost your progress? Pick up where you left off</h2>
          <p className="text-[15px] font-medium leading-[1.6] opacity-80 mb-4">
            If the course moved and your saved progress didn’t come with it, tell us the last module you finished. We’ll
            mark everything up to it as complete and unlock the next one. Your earlier quiz answers can’t be recovered, so
            they’ll be filled in as completed.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="through" className="sr-only">Last module I finished</label>
            <select
              id="through"
              value={through}
              onChange={(e) => setThrough(e.target.value)}
              className="min-w-[260px] rounded-full border-[3px] border-[#191510] bg-white px-4 py-3 text-[15px] font-semibold"
            >
              <option value="">Choose the last module you finished…</option>
              {modules.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.label} · {m.title}
                </option>
              ))}
            </select>
            <button type="button" onClick={catchUp} disabled={!through} className={`${btn} disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0`}>
              Restore my place →
            </button>
          </div>
        </section>

        <section aria-labelledby="backup-h" className="rounded-[20px] border-[3px] border-[#191510] bg-white p-6 shadow-[4px_4px_0_#191510]">
          <h2 id="backup-h" className="text-[22px] font-extrabold mb-2">Back up or restore with a file</h2>
          <p className="text-[15px] font-medium leading-[1.6] opacity-80 mb-4">
            Download your progress as a file, then restore it in any browser or on the new site. Restoring never erases
            progress you already have there — it only adds to it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={downloadBackup} className={btnLight}>
              Download backup ⤓
            </button>
            <label className={`${btnLight} cursor-pointer focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-[3px] focus-within:outline-[#2545D3]`}>
              Restore from file ⤒
              <input
                type="file"
                accept="application/json,.json"
                className="sr-only"
                onChange={(e) => {
                  void restoreFromFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        </section>
      </main>
    </div>
  );
}

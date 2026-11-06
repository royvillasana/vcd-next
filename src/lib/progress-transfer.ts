/**
 * Moves a learner's saved progress between two origins (e.g. the old and new
 * site URL). Progress lives only in each browser's localStorage, which is
 * scoped per origin — so it has to be carried across explicitly.
 */

/** Only these keys are ever exported or imported. Review mode is intentionally excluded. */
const KEY_PATTERN =
  /^(vcd-(complete|visited|exercise|quiz)-[a-z0-9-]+|vcd-last-module|vcd2-capstone-eval)$/;

const MAX_VALUE_LENGTH = 50_000;

export type ProgressSnapshot = { v: 1; exportedAt: string; data: Record<string, string> };

export type ImportSummary = { imported: number; skipped: number; lastModule: string | null };

/** The new site's origin. Set NEXT_PUBLIC_NEW_SITE_URL only on the OLD deployment. */
export const NEW_SITE_URL = (process.env.NEXT_PUBLIC_NEW_SITE_URL ?? "").replace(/\/+$/, "");

export function collectProgress(): ProgressSnapshot {
  const data: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && KEY_PATTERN.test(key)) {
      const value = localStorage.getItem(key);
      if (value !== null) data[key] = value;
    }
  }
  return { v: 1, exportedAt: new Date().toISOString(), data };
}

const isPlainObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null && !Array.isArray(x);

/** Merge so existing progress on this origin is never lost or downgraded. */
function mergeValue(existing: string | null, incoming: string): string {
  if (existing === null) return incoming;
  try {
    const a: unknown = JSON.parse(existing);
    const b: unknown = JSON.parse(incoming);
    if (Array.isArray(a) && Array.isArray(b)) return JSON.stringify(Array.from(new Set([...a, ...b])));
    if (isPlainObject(a) && isPlainObject(b)) return JSON.stringify({ ...b, ...a });
  } catch {
    // not JSON (e.g. "1" or a slug) — fall through
  }
  return existing;
}

export function applyProgress(snapshot: unknown): ImportSummary {
  const summary: ImportSummary = { imported: 0, skipped: 0, lastModule: null };
  if (!isPlainObject(snapshot) || snapshot.v !== 1 || !isPlainObject(snapshot.data)) {
    throw new Error("This doesn't look like a progress backup.");
  }
  for (const [key, value] of Object.entries(snapshot.data)) {
    if (!KEY_PATTERN.test(key) || typeof value !== "string" || value.length > MAX_VALUE_LENGTH) {
      summary.skipped++;
      continue;
    }
    localStorage.setItem(key, mergeValue(localStorage.getItem(key), value));
    summary.imported++;
  }
  summary.lastModule = localStorage.getItem("vcd-last-module");
  window.dispatchEvent(new Event("vcd-progress"));
  return summary;
}

/* URL-fragment transport (a #fragment is never sent to any server). */

export function encodeSnapshot(s: ProgressSnapshot): string {
  const bytes = new TextEncoder().encode(JSON.stringify(s));
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeSnapshot(code: string): unknown {
  try {
    const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error("The progress link is incomplete or damaged. Try the file backup below instead.");
  }
}

/* Self-declared catch-up (used when the previous site's saved progress can't be recovered). */

export type CatchUpModule = {
  slug: string;
  label: string;
  title: string;
  /** Number of exercise steps — all are ticked so the checkpoint agrees the module is complete. */
  steps: number;
  /** Correct option index for each quiz question. */
  correct: number[];
};

/** Mark every module up to and including `throughSlug` as complete, and set "Continue learning". */
export function declareProgress(modules: CatchUpModule[], throughSlug: string): ImportSummary {
  const end = modules.findIndex((m) => m.slug === throughSlug);
  if (end === -1) throw new Error("Pick a module from the list.");

  for (const m of modules.slice(0, end + 1)) {
    const steps = Array.from({ length: m.steps }, (_, i) => i);
    const existingSteps = parse<number[]>(localStorage.getItem(`vcd-exercise-${m.slug}`), []);
    localStorage.setItem(
      `vcd-exercise-${m.slug}`,
      JSON.stringify(Array.from(new Set([...(Array.isArray(existingSteps) ? existingSteps : []), ...steps]))),
    );
    if (m.correct.length) {
      const existing = parse<Record<string, number>>(localStorage.getItem(`vcd-quiz-${m.slug}`), {});
      const answers = Object.fromEntries(m.correct.map((c, i) => [i, c]));
      localStorage.setItem(`vcd-quiz-${m.slug}`, JSON.stringify({ ...(isPlainObject(existing) ? existing : {}), ...answers }));
    }
    localStorage.setItem(`vcd-complete-${m.slug}`, "1");
  }

  const next = modules[Math.min(end + 1, modules.length - 1)];
  localStorage.setItem("vcd-last-module", next.slug);
  window.dispatchEvent(new Event("vcd-progress"));
  return { imported: end + 1, skipped: 0, lastModule: next.slug };
}

function parse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

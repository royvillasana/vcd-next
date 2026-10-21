import { allModules } from "@/lib/course-data";
import { moduleContent, type ConceptItem } from "@/lib/module-content";
import { allTerms } from "@/lib/glossary-data";
import { groups, library } from "@/lib/resources-data";

export type SearchKind =
  | "Module"
  | "Concept"
  | "Objectives"
  | "Exercise"
  | "Glossary"
  | "Resource"
  | "Page";

export type SearchEntry = {
  kind: SearchKind;
  title: string;
  /** Where it lives, e.g. "Module 06 · Writing Specs". */
  trail: string;
  href: string;
  /** Prose that is searched and shown in snippets. */
  text: string;
  /** Code samples — searched, but ranked lower and never used as the snippet. */
  code: string;
  external?: boolean;
};

export type SearchResult = SearchEntry & { score: number; snippet: string };

/* ------------------------------------------------------------------ */
/*  Index                                                              */
/* ------------------------------------------------------------------ */

function conceptText(c: ConceptItem): { text: string; code: string } {
  const text: string[] = [c.body];
  const code: string[] = [];
  if (c.bullets) text.push(...c.bullets);
  if (c.callout) text.push(c.callout.title ?? "", c.callout.body, ...(c.callout.bullets ?? []));
  if (c.table) text.push(...c.table.map((r) => `${r.left} ${r.right}`));
  if (c.tools) text.push(...c.tools.map((t) => t.name));
  if (c.code) code.push(c.code.content);
  if (c.codeBlocks) code.push(...c.codeBlocks.map((b) => b.content));
  for (const t of c.tabs ?? []) {
    text.push(t.label, t.body, ...(t.bullets ?? []), t.note ?? "");
    for (const b of t.codeBlocks ?? []) code.push(b.content);
  }
  return { text: text.filter(Boolean).join(" "), code: code.join(" ") };
}

function build(): SearchEntry[] {
  const out: SearchEntry[] = [];

  for (const mod of allModules) {
    const label = /^\d+$/.test(mod.num) ? `Module ${mod.num}` : mod.num === "Pre" ? "Setup" : "Capstone";
    const trail = `${label} · ${mod.title}`;
    out.push({
      kind: "Module",
      title: mod.title,
      trail: `${label} · ${mod.phase}`,
      href: `/modules/${mod.slug}`,
      text: mod.overview,
      code: "",
    });

    const content = moduleContent[mod.slug];
    if (!content) continue;

    out.push({
      kind: "Objectives",
      title: "Learning objectives",
      trail,
      href: `/modules/${mod.slug}#learning-objectives`,
      text: content.objectives.join(" "),
      code: "",
    });
    for (const c of content.concepts) {
      const { text, code } = conceptText(c);
      out.push({
        kind: "Concept",
        title: c.title,
        trail,
        href: `/modules/${mod.slug}#${c.id}`,
        text,
        code,
      });
    }
    out.push({
      kind: "Exercise",
      title: content.exercise.title,
      trail,
      href: `/modules/${mod.slug}`,
      text: [
        content.exercise.description,
        ...content.exercise.steps,
        content.deliverable.title,
        content.deliverable.description,
      ].join(" "),
      code: "",
    });
  }

  for (const t of allTerms) {
    out.push({
      kind: "Glossary",
      title: t.term,
      trail: `Glossary · ${t.cat}`,
      href: "/glossary",
      text: `${t.def} ${t.figma}`,
      code: "",
    });
  }

  for (const g of groups) {
    for (const r of g.items) {
      out.push({
        kind: "Resource",
        title: r.title,
        trail: `Resources · ${g.heading} · ${r.meta}`,
        href: "/resources",
        text: `${r.desc} ${r.type.replace(".", "")} download`,
        code: "",
      });
    }
  }
  for (const l of library) {
    out.push({
      kind: "Resource",
      title: l.title,
      trail: `Resources · ${l.cat} · ${l.by}`,
      href: l.href,
      text: l.desc,
      code: "",
      external: true,
    });
  }

  out.push(
    { kind: "Page", title: "Syllabus", trail: "Page", href: "/curriculum", text: "Every module, phase and duration of the course.", code: "" },
    { kind: "Page", title: "Resources", trail: "Page", href: "/resources", text: "Templates, starters, checklists, reading and official tooling.", code: "" },
    { kind: "Page", title: "Glossary", trail: "Page", href: "/glossary", text: "Plain-language definitions of every term, mapped to Figma.", code: "" },
  );

  return out;
}

let cached: SearchEntry[] | null = null;
const getIndex = () => (cached ??= build());

/* ------------------------------------------------------------------ */
/*  Search                                                             */
/* ------------------------------------------------------------------ */

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function tokenize(query: string): string[] {
  return Array.from(new Set(norm(query).split(/[^a-z0-9.@_/+#-]+/).filter(Boolean)));
}

function makeSnippet(text: string, terms: string[], len = 220): string {
  const flat = text.replace(/\s+/g, " ").trim();
  const lower = flat.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return flat.slice(0, len) + (flat.length > len ? "…" : "");
  const start = Math.max(0, at - 60);
  const end = Math.min(flat.length, start + len);
  return (start > 0 ? "…" : "") + flat.slice(start, end) + (end < flat.length ? "…" : "");
}

/** All terms must match somewhere in the entry (AND); score favours titles, then prose, then code. */
export function search(query: string, limit = 60): { results: SearchResult[]; total: number } {
  const terms = tokenize(query);
  if (!terms.length) return { results: [], total: 0 };

  const hits: SearchResult[] = [];
  for (const e of getIndex()) {
    const title = norm(e.title);
    const text = norm(e.text);
    const code = norm(e.code);
    const trail = norm(e.trail);
    let score = 0;
    let ok = true;
    for (const t of terms) {
      let s = 0;
      if (title === t) s += 40;
      else if (title.startsWith(t)) s += 25;
      else if (title.includes(t)) s += 18;
      if (trail.includes(t)) s += 4;
      if (text.includes(t)) s += 6 + Math.min(4, text.split(t).length - 1);
      if (code.includes(t)) s += 2;
      if (!s) { ok = false; break; }
      score += s;
    }
    if (!ok) continue;
    if (e.kind === "Glossary") score += 3;
    if (e.kind === "Resource") score += 2;
    hits.push({ ...e, score, snippet: makeSnippet(e.text, terms) });
  }
  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return { results: hits.slice(0, limit), total: hits.length };
}

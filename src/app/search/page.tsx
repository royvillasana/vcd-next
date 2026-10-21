import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { search, tokenize, type SearchKind } from "@/lib/search-index";

export const metadata = {
  title: "Search — Design Engineering for UX Designers",
  description: "Search every module, concept, glossary term and resource in the course.",
};

const kindColor: Record<SearchKind, string> = {
  Module: "#FFC933",
  Concept: "#B9A5FF",
  Objectives: "#B9A5FF",
  Exercise: "#6FE3A5",
  Glossary: "#FFB199",
  Resource: "#9DB5FF",
  Page: "#F0E5D3",
};

const suggestions = ["design.md", "CLAUDE.md", "Storybook", "component spec", "pull request", "accessibility", "tokens"];

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-sm bg-[#FFC933] px-0.5 text-[#191510]">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 200) ?? "";
  const terms = tokenize(q);
  const { results, total } = search(q);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-[3px] focus:border-[#191510] focus:bg-[#FFC933] focus:px-5 focus:py-2.5 focus:text-sm focus:font-extrabold focus:text-[#191510]"
      >
        Skip to main content
      </a>
      <SiteNav />

      <main id="main-content" tabIndex={-1} className="max-w-[920px] mx-auto px-7 py-12 w-full focus:outline-none">
        <h1 className="text-[clamp(40px,6vw,64px)] font-extrabold tracking-[-0.04em] leading-[0.95] mb-6">
          Search<span className="text-[var(--brand)]">.</span>
        </h1>

        <form action="/search" method="get" role="search" className="flex gap-3 flex-wrap mb-8">
          <label htmlFor="search-q" className="sr-only">
            Search the course
          </label>
          <input
            id="search-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search modules, concepts, glossary, resources…"
            autoComplete="off"
            className="flex-1 min-w-[240px] rounded-full border-[3px] border-[#191510] bg-white px-5 py-3 text-[16px] font-medium shadow-[4px_4px_0_#191510]"
          />
          <button
            type="submit"
            className="rounded-full border-[3px] border-[#191510] bg-[#191510] px-6 py-3 text-[15px] font-extrabold text-[#FAF3E7] shadow-[4px_4px_0_#FF4D24] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Search
          </button>
        </form>

        {!q && (
          <section aria-labelledby="try-heading">
            <h2 id="try-heading" className="text-[22px] font-extrabold mb-3">
              Try searching for
            </h2>
            <ul role="list" className="flex flex-wrap gap-2 list-none p-0">
              {suggestions.map((s) => (
                <li key={s}>
                  <Link
                    href={`/search?q=${encodeURIComponent(s)}`}
                    className="inline-block rounded-full border-[2px] border-[#191510] bg-white px-4 py-1.5 font-mono text-[13px] font-bold hover:bg-[#FFC933]"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {q && (
          <section aria-labelledby="results-heading">
            <h2 id="results-heading" className="text-[22px] font-extrabold mb-1" aria-live="polite">
              {total === 0
                ? <>No results for “{q}”</>
                : <>{total} {total === 1 ? "result" : "results"} for “{q}”</>}
            </h2>
            {total > results.length && (
              <p className="text-sm font-medium opacity-75 mb-4">Showing the top {results.length}. Narrow your search to see fewer.</p>
            )}

            {total === 0 ? (
              <div className="mt-4 rounded-[20px] border-[3px] border-dashed border-[#191510] bg-[#FFF6DE] p-6">
                <p className="font-extrabold text-[18px] mb-1">Nothing matched.</p>
                <p className="text-[15px] font-medium opacity-80">
                  Check the spelling, try fewer or more general words, or browse the{" "}
                  <Link href="/curriculum" className="font-bold underline underline-offset-2">Syllabus</Link>,{" "}
                  <Link href="/glossary" className="font-bold underline underline-offset-2">Glossary</Link> or{" "}
                  <Link href="/resources" className="font-bold underline underline-offset-2">Resources</Link>.
                </p>
              </div>
            ) : (
              <ol role="list" className="mt-5 flex flex-col gap-4 list-none p-0">
                {results.map((r) => {
                  const body = (
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="rounded-md border-[2px] border-[#191510] px-2.5 py-[3px] font-mono text-[11px] font-bold text-[#191510]"
                          style={{ backgroundColor: kindColor[r.kind] }}
                        >
                          {r.kind}
                        </span>
                        <span className="font-mono text-[12px] opacity-75">{r.trail}</span>
                      </div>
                      <h3 className="mt-2 text-[20px] font-extrabold tracking-[-0.01em] group-hover:underline underline-offset-2">
                        <Highlight text={r.title} terms={terms} />
                        {r.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </h3>
                      <p className="mt-1 text-[14.5px] font-medium leading-[1.6] opacity-80">
                        <Highlight text={r.snippet} terms={terms} />
                      </p>
                    </>
                  );
                  const cls =
                    "group block rounded-[20px] border-[3px] border-[#191510] bg-white p-5 shadow-[4px_4px_0_#191510] transition-transform duration-[140ms] hover:-translate-y-1";
                  return (
                    <li key={r.href + r.title + r.kind}>
                      {r.external ? (
                        <a href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>
                          {body}
                        </a>
                      ) : (
                        <Link href={r.href} className={cls}>
                          {body}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

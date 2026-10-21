"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Highlight } from "@/components/search-highlight";

type Hit = {
  kind: string;
  title: string;
  trail: string;
  href: string;
  snippet: string;
  external: boolean;
};

const SUGGESTIONS = ["design.md", "CLAUDE.md", "Storybook", "component spec", "accessibility"];

const terms = (q: string) => q.toLowerCase().split(/\s+/).filter(Boolean);

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false); // results correspond to the current query
  const [active, setActive] = useState(-1);
  const [isMac, setIsMac] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- platform is only known on the client */
  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Debounced live search; stale responses are aborted.
  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        const data = (await res.json()) as { results: Hit[]; total: number };
        setHits(data.results);
        setTotal(data.total);
        setActive(data.results.length ? 0 : -1);
        setDone(true);
      } catch {
        /* aborted or offline — keep previous results */
      }
    }, 150);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  useEffect(() => {
    listRef.current?.querySelector(`#sr-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const q = query.trim();
  const showResults = q !== "" && done;
  const showList = q !== "" && hits.length > 0; // stale results stay visible while the next load

  function onQueryChange(v: string) {
    setQuery(v);
    setDone(false);
    if (!v.trim()) {
      setHits([]);
      setTotal(0);
      setActive(-1);
    }
  }

  function close() {
    setOpen(false);
    setQuery("");
    setHits([]);
    setTotal(0);
    setDone(false);
    setActive(-1);
  }

  function openHit(h: Hit) {
    if (h.external) {
      window.open(h.href, "_blank", "noopener,noreferrer");
      return;
    }
    close();
    router.push(h.href);
  }

  function seeAll(value = q) {
    if (!value) return;
    close();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!showList) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? hits.length - 1 : a - 1));
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        className="flex items-center gap-1.5 rounded-full border-[2px] border-foreground bg-white px-3 py-1.5 font-mono text-[13px] shadow-[2px_2px_0_#191510] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        <SearchIcon className="size-4 md:hidden" aria-hidden="true" />
        <span className="hidden text-[#5C534B] md:inline">Search</span>
        <span className="sr-only md:hidden">Search</span>
        <kbd
          aria-hidden="true"
          className="hidden rounded border border-foreground/20 bg-background px-1.5 py-0.5 font-mono text-[11px] md:inline"
        >
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
        <DialogContent
          showCloseButton
          className="top-[12%] -translate-y-0 border-[3px] border-[#191510] p-5 shadow-[6px_6px_0_#191510] sm:max-w-2xl"
        >
          <DialogTitle className="text-[20px] font-extrabold">Search the course</DialogTitle>
          <DialogDescription>
            Type to search modules, concepts, the glossary and resources. Use the arrow keys to move through
            results and Enter to open one.
          </DialogDescription>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (showResults && active >= 0 && hits[active]) openHit(hits[active]);
              else seeAll();
            }}
            className="flex flex-col gap-3"
          >
            <label htmlFor="global-search" className="sr-only">
              Search the course
            </label>
            <input
              id="global-search"
              type="search"
              role="combobox"
              aria-expanded={showList}
              aria-controls="search-results"
              aria-autocomplete="list"
              aria-activedescendant={showList && active >= 0 ? `sr-${active}` : undefined}
              autoFocus
              autoComplete="off"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="e.g. design.md, tokens, pull request"
              className="w-full rounded-full border-[3px] border-[#191510] bg-white px-4 py-2.5 text-[16px] font-medium"
            />

            <p className="sr-only" role="status" aria-live="polite">
              {showResults ? (total === 0 ? `No results for ${q}` : `${total} results. Use the arrow keys to browse.`) : ""}
            </p>

            {!q && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-semibold opacity-75">Try:</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onQueryChange(s)}
                    className="rounded-full border-[2px] border-[#191510] bg-background px-3 py-1 font-mono text-[12px] font-bold hover:bg-[#FFC933]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {showList && (
              <ul
                id="search-results"
                role="listbox"
                aria-label="Search results"
                ref={listRef}
                className="-mx-1 flex max-h-[52vh] list-none flex-col gap-1.5 overflow-y-auto p-1"
              >
                {hits.map((h, i) => (
                  <li
                    key={h.href + h.title + h.kind}
                    id={`sr-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => setActive(i)}
                    onClick={() => openHit(h)}
                    className={`cursor-pointer rounded-xl border-[2px] px-3.5 py-2.5 ${
                      i === active ? "border-[#191510] bg-[#FFF6DE]" : "border-transparent"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded border-[2px] border-[#191510] bg-[#FFC933] px-1.5 font-mono text-[10.5px] font-bold text-[#191510]">
                        {h.kind}
                      </span>
                      <span className="font-mono text-[11.5px] opacity-75">{h.trail}</span>
                    </div>
                    <div className="mt-1 text-[15.5px] font-extrabold">
                      <Highlight text={h.title} terms={terms(q)} />
                      {h.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[13px] font-medium leading-[1.5] opacity-80">
                      <Highlight text={h.snippet} terms={terms(q)} />
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {showResults && hits.length === 0 && (
              <p className="rounded-xl border-[2px] border-dashed border-[#191510] bg-[#FFF6DE] px-4 py-3 text-[14px] font-semibold">
                No results for “{q}”. Try fewer or more general words.
              </p>
            )}

            {showList && total > 0 && (
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold opacity-75" aria-hidden="true">
                  ↑↓ to move · Enter to open
                </span>
                <button
                  type="button"
                  onClick={() => seeAll()}
                  className="rounded-full border-[2px] border-[#191510] bg-[#191510] px-4 py-1.5 text-[13px] font-extrabold text-[#FAF3E7] shadow-[3px_3px_0_#FF4D24] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  See all {total} results →
                </button>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

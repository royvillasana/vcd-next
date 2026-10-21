"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const SUGGESTIONS = ["design.md", "CLAUDE.md", "Storybook", "component spec", "accessibility"];

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMac, setIsMac] = useState(true);

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

  function go(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setOpen(false);
    setQuery("");
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="top-[20%] -translate-y-0 border-[3px] border-[#191510] p-5 shadow-[6px_6px_0_#191510] sm:max-w-lg"
        >
          <DialogTitle className="text-[20px] font-extrabold">Search the course</DialogTitle>
          <DialogDescription>
            Search modules, concepts, the glossary and resources. Press Enter to see all results.
          </DialogDescription>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              go(query);
            }}
            className="flex flex-col gap-3"
          >
            <label htmlFor="global-search" className="sr-only">
              Search the course
            </label>
            <input
              id="global-search"
              type="search"
              autoFocus
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. design.md, tokens, pull request"
              className="w-full rounded-full border-[3px] border-[#191510] bg-white px-4 py-2.5 text-[16px] font-medium"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold opacity-75">Try:</span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => go(s)}
                  className="rounded-full border-[2px] border-[#191510] bg-background px-3 py-1 font-mono text-[12px] font-bold hover:bg-[#FFC933]"
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="self-end rounded-full border-[2px] border-[#191510] bg-[#191510] px-5 py-2 text-[14px] font-extrabold text-[#FAF3E7] shadow-[3px_3px_0_#FF4D24] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Search
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/curriculum", label: "Syllabus" },
  { href: "/resources", label: "Resources" },
  { href: "/glossary", label: "Glossary" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Once a learner has started the path, the CTA becomes "Continue learning"
  // pointing at their last-visited module. Otherwise it invites them to see
  // how it works. (Persisted in localStorage; off/"How it works" by default.)
  const [lastModule, setLastModule] = useState<string | null>(null);
  /* eslint-disable react-hooks/set-state-in-effect -- reading persisted progress */
  useEffect(() => {
    try {
      setLastModule(localStorage.getItem("vcd-last-module"));
    } catch {
      // ignore
    }
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const ctaHref = lastModule ? `/modules/${lastModule}` : "/#journey";
  const ctaLabel = lastModule ? "Continue learning →" : "How it works →";

  return (
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-foreground bg-background">
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-6">
        {/* ── Logo + Brand ── */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-yellow)] border-[3px] border-foreground shadow-[3px_3px_0_#191510] animate-[vcd-wiggle_4s_ease-in-out_infinite]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 5L8 11L12 5"
                stroke="#191510"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[17px] font-[800] tracking-tight text-foreground leading-tight">
            Design Engineering
            <span className="font-[family-name:var(--font-caveat)] text-[19px] font-[700] text-[var(--brand)]">
              {" "}for UX designers
            </span>
          </span>
        </Link>

        {/* ── Nav links ── */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[15px] font-[600] transition-colors",
                  isActive
                    ? "bg-foreground text-background border-[2px] border-foreground font-[700]"
                    : "border-[2px] border-transparent hover:border-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right side actions ── */}
        <div className="flex items-center gap-3">
          {/* Search (visual only) */}
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full border-[2px] border-foreground bg-white px-3 py-1.5 font-mono text-[13px] shadow-[2px_2px_0_#191510] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none md:flex"
          >
            <span className="text-muted-foreground">Search</span>
            <kbd className="rounded border border-foreground/20 bg-background px-1.5 py-0.5 text-[11px] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* CTA — "How it works" for new visitors, "Continue learning" once started */}
          <Link
            href={ctaHref}
            className="rounded-full border-[2px] border-foreground bg-[var(--brand)] px-4 py-2 text-[14px] font-[800] text-background shadow-[3px_3px_0_#191510] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            {ctaLabel}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile nav drawer ── */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t-[2px] border-foreground bg-background px-6 py-4 md:hidden">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-full px-4 py-2 text-[15px] font-[600] transition-colors",
                  isActive
                    ? "bg-foreground text-background border-[2px] border-foreground font-[700]"
                    : "border-[2px] border-transparent hover:border-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { phases, capstoneModule } from "@/lib/course-data";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <main className="max-w-[1240px] mx-auto px-7 py-12 w-full flex-1">
        {/* ── Header ── */}
        <header className="mb-10">
          <h1 className="text-[52px] font-extrabold tracking-[-0.03em] leading-[1.05]">
            Course Syllabus
          </h1>
          <p className="text-[17px] font-medium max-w-xl mt-3 opacity-75 leading-relaxed">
            A structured path from design thinking to production-ready code.
            Complete phases in order — each one unlocks the next.
          </p>
        </header>

        {/* ── Grid: Sidebar + Main ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] opacity-55 mb-3 px-3">
                Phases
              </div>

              {phases.map((phase) => (
                <a
                  key={phase.id}
                  href={`#${phase.id}`}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-[2px] border-transparent hover:border-[#191510] transition-colors"
                >
                  <span
                    className="w-5 h-5 rounded-full border-[2px] border-[#191510] flex-shrink-0"
                    style={{ backgroundColor: phase.bgHex }}
                  />
                  <span className="font-semibold text-sm">
                    Phase {phase.num} — {phase.name}
                  </span>
                </a>
              ))}

              <a
                href="#capstone"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-[2px] border-transparent hover:border-[#191510] transition-colors"
              >
                <span className="w-5 h-5 rounded-full border-[2px] border-[#191510] flex-shrink-0 bg-[var(--brand)]" />
                <span className="font-semibold text-sm">Capstone</span>
              </a>
            </div>
          </aside>

          {/* ── Phase Cards ── */}
          <div className="space-y-10">
            {phases.map((phase) => (
              <section key={phase.id} id={phase.id} className="scroll-mt-24">
                <div
                  className="border-[3px] border-[#191510] rounded-[22px] overflow-hidden shadow-[5px_5px_0_#191510]"
                  style={{ backgroundColor: phase.bgHex }}
                >
                  {/* Phase header */}
                  <div className="px-[26px] py-[22px] border-b-[3px] border-[#191510]">
                    <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.1em] bg-white border-[2px] border-[#191510] rounded-lg px-3 py-1 shadow-[2px_2px_0_#191510]">
                      Phase {phase.num}
                    </span>
                    <h2
                      className="text-xl font-extrabold mt-3"
                      style={{ color: phase.textHex }}
                    >
                      {phase.name}
                    </h2>
                    <p
                      className="text-sm font-medium opacity-80 mt-1 max-w-lg"
                      style={{ color: phase.textHex }}
                    >
                      {phase.description}
                    </p>
                  </div>

                  {/* Module rows */}
                  <div>
                    {phase.modules.map((mod, i) => (
                      <Link
                        key={mod.id}
                        href={`/modules/${mod.slug}`}
                        className={`flex items-center gap-4 px-6 py-4 bg-white hover:bg-[#FAF3E7] transition-colors group ${
                          i < phase.modules.length - 1
                            ? "border-b-[2px] border-[#191510]"
                            : ""
                        }`}
                      >
                        <div className="w-[34px] h-[34px] rounded-full border-[2px] border-[#191510] flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold">
                          {mod.num}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">
                              {mod.title}
                            </span>
                            <span
                              className={`font-mono text-[10px] font-bold uppercase tracking-wide border-[1.5px] border-[#191510] rounded px-1.5 py-[1px] ${
                                mod.optional
                                  ? "bg-white text-[#191510]/70"
                                  : "bg-[#191510] text-[#FAF3E7]"
                              }`}
                            >
                              {mod.optional ? "Optional" : "Required"}
                            </span>
                          </div>
                          <div className="text-xs opacity-60 truncate">
                            {mod.overview}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-mono text-xs opacity-50 hidden sm:inline">
                            {mod.duration}
                          </span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="text-[#191510] opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <path
                              d="M6 4l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* ── Capstone Card ── */}
            <section id="capstone" className="scroll-mt-24">
              <div className="border-[3px] border-[#191510] rounded-[22px] overflow-hidden shadow-[5px_5px_0_#191510] bg-[#191510] text-[#FAF3E7]">
                {/* Capstone header */}
                <div className="px-6 py-5 border-b-[3px] border-[#FAF3E7]/10">
                  <span className="inline-block font-bold text-sm bg-[var(--brand)] text-[#191510] border-[2px] border-[#191510] rounded-full px-3 py-1 shadow-[2px_2px_0_#FAF3E7]">
                    &#9733; Capstone
                  </span>
                  <h2 className="text-xl font-extrabold mt-3 text-[#FAF3E7]">
                    Capstone Project
                  </h2>
                  <p className="text-sm text-[#FAF3E7]/60 mt-1 max-w-lg">
                    Design and build a complete feature from spec to production
                    using everything you&apos;ve learned.
                  </p>
                </div>

                {/* Capstone module row */}
                <Link
                  href={`/modules/${capstoneModule.slug}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAF3E7]/5 transition-colors group"
                >
                  <div className="w-[34px] h-[34px] rounded-full border-[2px] border-[#FAF3E7]/30 bg-[#FAF3E7]/10 flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold text-[#FAF3E7]/70">
                    &#9733;
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#FAF3E7]">
                      {capstoneModule.title}
                    </div>
                    <div className="text-xs text-[#FAF3E7]/50 truncate">
                      {capstoneModule.overview}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-xs text-[#FAF3E7]/50 hidden sm:inline">
                      {capstoneModule.duration}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-[#FAF3E7]/40 group-hover:text-[#FAF3E7] transition-colors flex-shrink-0"
                    >
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-[3px] border-[#191510] mt-16">
        <div className="max-w-[1240px] mx-auto px-7 py-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>Design Engineering for UX Designers — ITX UX AI Workshop</span>
          <span>&copy; 2026</span>
        </div>
      </footer>
    </div>
  );
}

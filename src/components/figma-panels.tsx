import type { ReactNode } from "react";

/* ================================================================== */
/*  Figma-panel mockups — the design-tool half of each code ↔ Figma   */
/*  pairing in Module 1. Static, framed to match the CodeBlock.       */
/* ================================================================== */

function FigmaLogo() {
  return (
    <svg width="12" height="18" viewBox="0 0 38 57" fill="none" aria-hidden>
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
    </svg>
  );
}

/** Neo-brutalist window frame that pairs visually with <CodeBlock>. */
function FigmaFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] border-[3px] border-[#191510] bg-white shadow-[3px_3px_0_#191510]">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b-[3px] border-[#191510] bg-[#FAF3E7] px-4 py-[11px]">
        <FigmaLogo />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#191510]/55">
          Figma
        </span>
        <span className="font-mono text-[10px] text-[#191510]/25">/</span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#191510]/55">
          {title}
        </span>
      </div>
      {/* Body */}
      <div className="flex-1 text-[#191510]">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function Swatch({ color, ring = false }: { color: string; ring?: boolean }) {
  return (
    <span
      className={`inline-block h-3.5 w-3.5 shrink-0 rounded-[3px] ${
        ring ? "ring-1 ring-inset ring-black/15" : ""
      }`}
      style={{ backgroundColor: color, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)" }}
    />
  );
}

/** A Figma-style value input pill. */
function Field({ children, grow = false }: { children: ReactNode; grow?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md bg-[#f5f5f5] px-2 py-[5px] text-[11px] font-medium text-[#333] ${
        grow ? "flex-1 min-w-0" : ""
      }`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 pb-1.5 pt-3 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#191510]/40">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Layers panel  (↔ HTML)                                         */
/* ------------------------------------------------------------------ */

type LayerType = "frame" | "text" | "image";
type Layer = { name: string; type: LayerType; depth: number; parent?: boolean; selected?: boolean };

const LAYERS: Layer[] = [
  { name: "card", type: "frame", depth: 0, parent: true, selected: true },
  { name: "card-header", type: "frame", depth: 1, parent: true },
  { name: "avatar", type: "image", depth: 2 },
  { name: "user-info", type: "frame", depth: 2, parent: true },
  { name: "name", type: "text", depth: 3 },
  { name: "handle", type: "text", depth: 3 },
  { name: "card-body", type: "frame", depth: 1, parent: true },
  { name: "post-text", type: "text", depth: 2 },
  { name: "post-image", type: "image", depth: 2 },
];

function LayerIcon({ type }: { type: LayerType }) {
  const common = "text-[#191510]/45 shrink-0";
  if (type === "text") {
    return (
      <span className={`${common} grid h-3.5 w-3.5 place-items-center font-serif text-[11px] font-bold leading-none`}>
        T
      </span>
    );
  }
  if (type === "image") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={common} stroke="currentColor" strokeWidth="1">
        <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" />
        <circle cx="4.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
        <path d="M2 10.5l3-3 2 2 2.5-2.5 2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // frame — Figma hash
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={common} stroke="currentColor" strokeWidth="1.1">
      <path d="M5 1.5v11M9 1.5v11M1.5 5h11M1.5 9h11" strokeLinecap="round" />
    </svg>
  );
}

function LayersPanel() {
  return (
    <FigmaFrame title="Layers">
      <div className="py-1.5">
        {LAYERS.map((l) => (
          <div
            key={l.name}
            className={`flex items-center gap-1.5 py-[5px] text-[11.5px] ${
              l.selected ? "bg-[#daebff]" : "hover:bg-[#f5f5f5]"
            }`}
            style={{ paddingLeft: 10 + l.depth * 16, paddingRight: 12 }}
          >
            {/* Chevron slot */}
            <span className="w-2.5 shrink-0 text-[#191510]/35">
              {l.parent ? (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M2 3l2 2 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </span>
            <LayerIcon type={l.type} />
            <span className={`truncate font-medium ${l.selected ? "text-[#0b6fd4]" : "text-[#191510]/80"}`}>
              {l.name}
            </span>
          </div>
        ))}
      </div>
    </FigmaFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Properties panel  (↔ CSS)                                      */
/* ------------------------------------------------------------------ */

function PropRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-4 py-[5px]">
      <span className="w-[62px] shrink-0 text-[11px] text-[#191510]/45">{label}</span>
      <div className="flex flex-1 items-center gap-1.5">{children}</div>
    </div>
  );
}

function PropertiesPanel() {
  return (
    <FigmaFrame title="Design">
      {/* Selected layer */}
      <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
        <span className="text-[12px] font-semibold text-[#191510]">.card</span>
        <span className="rounded bg-[#eef0f2] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-[#191510]/50">
          Frame
        </span>
      </div>

      <SectionTitle>Appearance</SectionTitle>
      <PropRow label="Radius">
        <Field>16</Field>
        <Field>Padding&nbsp;24</Field>
      </PropRow>

      <SectionTitle>Fill</SectionTitle>
      <PropRow label="Fill">
        <Field grow>
          <Swatch color="#ffffff" />
          <span className="truncate">color/surface</span>
        </Field>
      </PropRow>

      <SectionTitle>Stroke</SectionTitle>
      <PropRow label="Stroke">
        <Field grow>
          <Swatch color="#e5e7eb" />
          <span className="truncate">color/border</span>
        </Field>
        <Field>1</Field>
      </PropRow>

      <SectionTitle>Effects</SectionTitle>
      <PropRow label="Shadow">
        <Field grow>
          <span className="truncate">Drop shadow · Y2 · Blur8 · 8%</span>
        </Field>
      </PropRow>

      {/* Text layer */}
      <div className="mt-1 flex items-center justify-between border-y border-black/8 bg-[#fafafa] px-4 py-2.5">
        <span className="text-[12px] font-semibold text-[#191510]">.name</span>
        <span className="rounded bg-[#eef0f2] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-[#191510]/50">
          Text
        </span>
      </div>
      <SectionTitle>Typography</SectionTitle>
      <PropRow label="Font">
        <Field grow>Inter</Field>
      </PropRow>
      <PropRow label="Style">
        <Field>16</Field>
        <Field grow>Semibold</Field>
        <Field>1.4</Field>
      </PropRow>
      <PropRow label="Fill">
        <Field grow>
          <Swatch color="#111827" />
          <span className="truncate">color/neutral-900</span>
        </Field>
      </PropRow>
      <div className="h-2" />
    </FigmaFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Auto-layout panel  (↔ Flexbox)                                */
/* ------------------------------------------------------------------ */

function AutoLayoutPanel() {
  return (
    <FigmaFrame title="Auto layout">
      <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5">
        <span className="text-[12px] font-semibold text-[#191510]">.card-header</span>
        <span className="rounded bg-[#eef0f2] px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-[#191510]/50">
          Auto
        </span>
      </div>

      <div className="flex gap-4 px-4 py-4">
        {/* Left: direction + gap + padding */}
        <div className="flex flex-1 flex-col gap-2.5">
          {/* Direction toggle */}
          <div className="flex items-center gap-1 rounded-md bg-[#f5f5f5] p-0.5">
            {[
              { d: "vertical", on: false, path: "M7 2v10M4 9l3 3 3-3" },
              { d: "horizontal", on: true, path: "M2 7h10M9 4l3 3-3 3" },
            ].map((b) => (
              <span
                key={b.d}
                className={`grid flex-1 place-items-center rounded py-1.5 ${
                  b.on ? "bg-white text-[#0d99ff] shadow-sm" : "text-[#191510]/45"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d={b.path} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ))}
          </div>
          {/* Gap */}
          <Field>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#191510" strokeOpacity="0.45" strokeWidth="1.2">
              <path d="M3 2v10M11 2v10M5.5 7h3M5.5 7l1-1M5.5 7l1 1M8.5 7l-1-1M8.5 7l-1 1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Gap&nbsp;12</span>
          </Field>
          {/* Padding */}
          <Field>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#191510" strokeOpacity="0.45" strokeWidth="1.2">
              <rect x="2" y="2" width="10" height="10" rx="1.5" />
              <rect x="4.5" y="4.5" width="5" height="5" rx="1" strokeDasharray="1.5 1.5" />
            </svg>
            <span>Padding&nbsp;0</span>
          </Field>
        </div>

        {/* Right: 3×3 alignment picker — center selected */}
        <div className="grid grid-cols-3 grid-rows-3 gap-0 self-stretch rounded-md border border-black/10 bg-[#f5f5f5] p-2">
          {Array.from({ length: 9 }).map((_, i) => {
            const active = i === 4; // center
            return (
              <span key={i} className="grid place-items-center">
                <span
                  className={`rounded-full ${
                    active ? "h-1.5 w-4 bg-[#0d99ff]" : "h-1 w-1 bg-[#191510]/25"
                  }`}
                />
              </span>
            );
          })}
        </div>
      </div>

      {/* Sizing */}
      <div className="flex items-center gap-2 border-t border-black/8 px-4 py-2.5">
        <span className="w-[62px] shrink-0 text-[11px] text-[#191510]/45">Sizing</span>
        <Field grow>Hug</Field>
        <Field grow>Hug</Field>
      </div>
    </FigmaFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Variables panel  (↔ CSS Variables)                            */
/* ------------------------------------------------------------------ */

const COLOR_TOKENS = [
  { name: "color/brand/primary", hex: "#0f52ba" },
  { name: "color/surface", hex: "#ffffff" },
  { name: "color/border", hex: "#e5e7eb" },
  { name: "color/neutral-900", hex: "#111827" },
  { name: "color/neutral-600", hex: "#4b5563" },
];
const NUMBER_TOKENS = [
  { name: "spacing/4", value: "16" },
  { name: "radius/md", value: "12" },
];

function VariablesPanel() {
  return (
    <FigmaFrame title="Variables">
      {/* Column header */}
      <div className="flex items-center border-b border-black/8 px-4 py-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#191510]/40">
        <span className="flex-1">Name</span>
        <span>Value</span>
      </div>

      <SectionTitle>Color</SectionTitle>
      {COLOR_TOKENS.map((t) => (
        <div key={t.name} className="flex items-center gap-2 px-4 py-[5px] text-[11.5px] hover:bg-[#f5f5f5]">
          <Swatch color={t.hex} />
          <span className="flex-1 truncate font-medium text-[#191510]/80">{t.name}</span>
          <span className="font-mono text-[10.5px] uppercase text-[#191510]/45">{t.hex.replace("#", "")}</span>
        </div>
      ))}

      <SectionTitle>Number</SectionTitle>
      {NUMBER_TOKENS.map((t) => (
        <div key={t.name} className="flex items-center gap-2 px-4 py-[5px] text-[11.5px] hover:bg-[#f5f5f5]">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] bg-[#eef0f2] font-mono text-[8px] font-bold text-[#191510]/50">
            #
          </span>
          <span className="flex-1 truncate font-medium text-[#191510]/80">{t.name}</span>
          <span className="font-mono text-[10.5px] text-[#191510]/45">{t.value}</span>
        </div>
      ))}
      <div className="h-2" />
    </FigmaFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Dispatcher                                                         */
/* ------------------------------------------------------------------ */

export type FigmaPanelVariant = "layers" | "properties" | "autolayout" | "variables";

export function FigmaPanel({ variant }: { variant: FigmaPanelVariant }) {
  switch (variant) {
    case "layers":
      return <LayersPanel />;
    case "properties":
      return <PropertiesPanel />;
    case "autolayout":
      return <AutoLayoutPanel />;
    case "variables":
      return <VariablesPanel />;
    default:
      return null;
  }
}

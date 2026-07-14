"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export interface RenderedCodeBlock {
  html: string;
  label?: string;
  content?: string;
}

export interface FrameworkCard {
  name: string;
  subtitle?: string;
  iconSlug?: string;
  iconColor?: string;
  iconBg?: string;
  href?: string;
}

export interface RenderedTab {
  label: string;
  body: string;
  bullets?: string[];
  codeBlocks?: RenderedCodeBlock[];
  image?: { src: string; alt: string; caption?: string };
  figmaEmbed?: { nodeId: string; fileKey: string; description?: string };
  frameworkCards?: FrameworkCard[];
  note?: string;
}

interface Props {
  tabs: RenderedTab[];
}

export function TabGroup({ tabs }: Props) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div>
      {/* Tab bar — wrap so buttons never overflow / get clipped by the card */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-bold whitespace-nowrap rounded-full border-[2px] border-[#191510] transition-all duration-[120ms] ${
              i === active
                ? "bg-[#191510] text-[#FAF3E7] shadow-none"
                : "bg-white text-[#191510] shadow-[2px_2px_0_#191510] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="space-y-4">
        {tab.body && (
          <p className="text-sm text-muted-foreground leading-relaxed">{tab.body}</p>
        )}

        {tab.bullets && tab.bullets.length > 0 && (
          <ul className="space-y-2">
            {tab.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-[14.5px]">
                <span className="mt-[5px] w-2.5 h-2.5 rounded-[3px] bg-[var(--accent-yellow)] border-[2px] border-[#191510] flex-shrink-0" />
                <span className="leading-[1.55] font-medium opacity-80">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {tab.frameworkCards && tab.frameworkCards.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
            {tab.frameworkCards.map((fw, i) => {
              const inner = (
                <>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: fw.iconBg ? `#${fw.iconBg}` : "#18191b" }}
                  >
                    {fw.iconSlug ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://cdn.simpleicons.org/${fw.iconSlug}/${fw.iconColor ?? "ffffff"}`}
                        alt={fw.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    ) : (
                      <span className="text-white text-xs font-bold font-mono leading-none">
                        {fw.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground leading-tight truncate">{fw.name}</div>
                    {fw.subtitle && (
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{fw.subtitle}</div>
                    )}
                  </div>
                  {fw.href && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </>
              );
              return fw.href ? (
                <a
                  key={i}
                  href={fw.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border-[2px] border-[#191510] bg-white px-3 py-3 shadow-[2px_2px_0_#191510] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  {inner}
                </a>
              ) : (
                <div key={i} className="flex items-center gap-3 rounded-xl border-[2px] border-[#191510] bg-white px-3 py-3 shadow-[2px_2px_0_#191510]">
                  {inner}
                </div>
              );
            })}
          </div>
        )}

        {tab.codeBlocks && tab.codeBlocks.length > 0 && (
          <div className="space-y-3">
            {tab.codeBlocks.map((cb, i) => (
              <div key={i} className="group rounded-[18px] overflow-hidden border-[3px] border-[#191510] shadow-[3px_3px_0_#191510] text-[13px] leading-[1.65]">
                {/* Header bar */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-b-[3px] border-[#191510]"
                  style={{ backgroundColor: "#1e2127" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex items-center gap-3">
                    {cb.content && <CopyButton code={cb.content} />}
                    {cb.label && (
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest select-none">
                        {cb.label}
                      </span>
                    )}
                  </div>
                </div>
                {/* Shiki-rendered code */}
                <div
                  className="overflow-x-auto [&>pre]:m-0 [&>pre]:p-5 [&>pre]:text-[13px] [&>pre]:leading-[1.65] [&>pre]:font-mono"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: cb.html }}
                />
              </div>
            ))}
          </div>
        )}

        {tab.image && (
          <figure className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tab.image.src}
              alt={tab.image.alt}
              className="rounded-[18px] border-[3px] border-[#191510] shadow-[4px_4px_0_#191510] w-full"
            />
            {tab.image.caption && (
              <figcaption className="text-xs text-muted-foreground font-medium text-center font-mono">
                {tab.image.caption}
              </figcaption>
            )}
          </figure>
        )}

        {tab.figmaEmbed && (
          <div className="rounded-[18px] border-[3px] border-[#191510] overflow-hidden shadow-[3px_3px_0_#191510] bg-white">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/${tab.figmaEmbed.fileKey}/?node-id=${tab.figmaEmbed.nodeId}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                title={tab.label}
                loading="lazy"
              />
            </div>
            {tab.figmaEmbed.description && (
              <div className="px-4 py-2.5 border-t-[3px] border-[#191510] flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground font-medium">{tab.figmaEmbed.description}</span>
                <a
                  href={`https://www.figma.com/design/${tab.figmaEmbed.fileKey}/?node-id=${tab.figmaEmbed.nodeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[var(--brand)] hover:text-foreground transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Open in Figma →
                </a>
              </div>
            )}
          </div>
        )}

        {tab.note && (
          <p className="text-xs text-muted-foreground font-medium italic border-l-[3px] border-[var(--accent-yellow)] pl-3 py-1">
            {tab.note}
          </p>
        )}
      </div>
    </div>
  );
}

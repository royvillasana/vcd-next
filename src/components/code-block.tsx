import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/copy-button";

// Languages we use across module content
const SUPPORTED_LANGS = ["html", "css", "typescript", "tsx", "bash", "markdown", "json", "text"] as const;
type SupportedLang = typeof SUPPORTED_LANGS[number];

function normalizeLang(lang: string): SupportedLang {
  const map: Record<string, SupportedLang> = {
    js: "typescript",
    javascript: "typescript",
    ts: "typescript",
    md: "markdown",
    sh: "bash",
    shell: "bash",
  };
  const normalized = lang.toLowerCase();
  if (normalized in map) return map[normalized];
  if ((SUPPORTED_LANGS as readonly string[]).includes(normalized)) return normalized as SupportedLang;
  return "text";
}

interface Props {
  code: string;
  lang: string;
  label?: string;
}

export async function CodeBlock({ code, lang, label }: Props) {
  const language = normalizeLang(lang);

  const html = await codeToHtml(code, {
    lang: language,
    theme: "one-dark-pro",
  });

  return (
    <div className="group rounded-[18px] overflow-hidden border-[3px] border-[#191510] shadow-[3px_3px_0_#191510] text-[13px] leading-[1.65]">
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b-[3px] border-[#191510]"
        style={{ backgroundColor: "#1e2127" }}
      >
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-3">
          <CopyButton code={code} />
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest select-none">
            {label ?? (lang === "text" ? "plain text" : lang)}
          </span>
        </div>
      </div>

      {/* Highlighted code — Shiki inlines all colors.
          bg on the scroll container + min-w-max on the <pre> keep the dark
          background painted across the full scroll width (no blank gap). */}
      <div
        className="overflow-x-auto bg-[#282c34] [&>pre]:m-0 [&>pre]:min-w-max [&>pre]:p-5 [&>pre]:text-[13px] [&>pre]:leading-[1.65] [&>pre]:font-mono"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

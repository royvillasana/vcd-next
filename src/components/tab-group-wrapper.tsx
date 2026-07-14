import { codeToHtml } from "shiki";
import { TabGroup } from "@/components/tab-group";
import type { ConceptTab } from "@/lib/module-content";

const LANG_MAP: Record<string, string> = {
  js: "typescript",
  javascript: "typescript",
  ts: "typescript",
  md: "markdown",
  sh: "bash",
  shell: "bash",
};

function normalizeLang(lang: string): string {
  const supported = ["html", "css", "typescript", "tsx", "bash", "markdown", "json", "text", "powershell"];
  const normalized = lang.toLowerCase();
  if (normalized in LANG_MAP) return LANG_MAP[normalized];
  if (supported.includes(normalized)) return normalized;
  return "text";
}

interface Props {
  tabs: ConceptTab[];
}

export async function TabGroupWrapper({ tabs }: Props) {
  const rendered = await Promise.all(
    tabs.map(async (tab) => ({
      label: tab.label,
      body: tab.body,
      bullets: tab.bullets,
      image: tab.image,
      figmaEmbed: tab.figmaEmbed,
      frameworkCards: tab.frameworkCards,
      note: tab.note,
      codeBlocks: tab.codeBlocks
        ? await Promise.all(
            tab.codeBlocks.map(async (cb) => ({
              label: cb.label,
              content: cb.content,
              html: await codeToHtml(cb.content, {
                lang: normalizeLang(cb.lang),
                theme: "one-dark-pro",
              }),
            }))
          )
        : undefined,
    }))
  );

  return <TabGroup tabs={rendered} />;
}

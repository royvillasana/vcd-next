import { TransferClient } from "@/components/transfer-client";
import { allModules } from "@/lib/course-data";
import { moduleContent } from "@/lib/module-content";
import type { CatchUpModule } from "@/lib/progress-transfer";

export const metadata = {
  title: "Your progress — Design Engineering for UX Designers",
  description: "Move, back up, or restore your progress in the course.",
};

export default function TransferPage() {
  const modules: CatchUpModule[] = allModules.map((m) => {
    const content = moduleContent[m.slug];
    return {
      slug: m.slug,
      label: /^\d+$/.test(m.num) ? `Module ${m.num}` : m.num === "Pre" ? "Setup" : "Capstone",
      title: m.title,
      steps: content?.exercise.steps.length ?? 0,
      correct: (content?.quiz ?? []).map((q) => q.correct),
    };
  });
  return <TransferClient modules={modules} />;
}

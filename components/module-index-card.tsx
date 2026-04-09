import Link from "next/link";

import { TonePanel } from "@/components/tone-panel";
import type { ModuleDefinition } from "@/lib/module-content/types";

type ModuleIndexCardProps = {
  module: ModuleDefinition;
};

const statusLabel: Record<ModuleDefinition["status"], string> = {
  active: "Active",
  preview: "Preview",
  coming: "Coming soon",
};

export function ModuleIndexCard({ module }: ModuleIndexCardProps) {
  const isDisabled = module.status === "coming";

  const card = (
    <TonePanel tone={module.tone} className="card-shell flex h-full flex-col p-6">
      <div className="flex items-center gap-3">
        <span className="type-meta text-(--accent-strong)">
          Module {module.number}
        </span>
        {module.status !== "active" && (
          <span className="inline-flex rounded-full border border-(--border-strong) px-2.5 py-0.5 type-meta text-(--ink-body)">
            {statusLabel[module.status]}
          </span>
        )}
      </div>
      <h3 className="mt-3 type-concept text-(--ink-strong)">{module.title}</h3>
      <p className="mt-2 flex-1 type-body text-(--ink-body)">{module.summary}</p>
      <div className="mt-4 flex items-center justify-between type-caption text-(--ink-body)">
        <span>
          {module.lessons.length} lesson{module.lessons.length !== 1 ? "s" : ""}
        </span>
        <span>{module.weekRange}</span>
      </div>
    </TonePanel>
  );

  if (isDisabled) {
    return <div className="opacity-60">{card}</div>;
  }

  return (
    <Link
      href={`/modules/${module.slug}`}
      className="block transition-transform hover:scale-[1.01]"
    >
      {card}
    </Link>
  );
}

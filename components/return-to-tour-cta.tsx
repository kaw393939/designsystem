import Link from "next/link";

import { TonePanel } from "@/components/tone-panel";

const tourStepLabels: Record<string, string> = {
  signal: "Signal",
  archetype: "Archetype",
  style: "Style",
  proof: "Proof",
  build: "Build",
  publish: "Publish",
};

type ReturnToTourCTAProps = {
  /** Tour step slugs this module deepens */
  tourSteps: readonly string[];
};

export function ReturnToTourCTA({ tourSteps }: ReturnToTourCTAProps) {
  if (tourSteps.length === 0) return null;

  const primary = tourSteps[0];
  const label = tourStepLabels[primary] ?? primary;

  return (
    <TonePanel tone="reflection" className="mt-8 p-6">
      <p className="type-meta text-(--accent-strong)">Return to the tour</p>
      <p className="mt-2 type-body text-(--ink-body)">
        This module deepens concepts from the guided tour.{" "}
        {tourSteps.length === 1
          ? `Review the ${label} step to see how it fits.`
          : `Start with the ${label} step, then explore the others.`}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {tourSteps.map((step) => (
          <Link
            key={step}
            href={`/tour/${step}`}
            className="inline-flex rounded-md border border-(--border-strong) px-3 py-1.5 type-annotation font-semibold text-(--accent-strong) transition-colors hover:bg-(--surface-hover)"
          >
            {tourStepLabels[step] ?? step} step →
          </Link>
        ))}
      </div>
    </TonePanel>
  );
}

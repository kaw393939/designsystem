import Link from "next/link";

import { TonePanel } from "@/components/tone-panel";

type PersuasionMoveCardProps = {
  title: string;
  definition: string;
  application: string;
  example: string;
  tourStepHref: string;
  tourStepLabel: string;
};

export function PersuasionMoveCard({
  title,
  definition,
  application,
  example,
  tourStepHref,
  tourStepLabel,
}: PersuasionMoveCardProps) {
  return (
    <TonePanel tone="reading" className="p-6">
      <h3 className="type-concept text-(--ink-strong)">{title}</h3>
      <p className="mt-2 type-body text-(--ink-body)">{definition}</p>
      <p className="mt-3 type-caption text-(--signal)">
        <strong>Use this when:</strong> {application}
      </p>
      <p className="mt-2 type-caption text-(--ink-body)">
        <strong>Common mistake:</strong> {example}
      </p>
      <Link
        href={tourStepHref}
        className="mt-3 inline-flex type-annotation font-semibold text-(--accent-strong) underline-offset-4 hover:underline"
      >
        {tourStepLabel}
      </Link>
    </TonePanel>
  );
}

import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import { TonePanel } from "@/components/tone-panel";
import type { PanelTone } from "@/lib/theme-tokens";

type StudentFastPathStep = {
  title: string;
  summary: string;
};

type StudentFastPathAction = {
  label: string;
  href: string;
  kind?: "primary" | "secondary";
};

type StudentFastPathProps = {
  label?: string;
  title: string;
  summary: string;
  steps: readonly StudentFastPathStep[];
  primaryAction: StudentFastPathAction;
  secondaryAction?: StudentFastPathAction;
  tone?: PanelTone;
};

function getActionClassName(kind: StudentFastPathAction["kind"]) {
  return kind === "secondary" ? "action-secondary" : "action-primary";
}

export function StudentFastPath({
  label = "Fast student path",
  title,
  summary,
  steps,
  primaryAction,
  secondaryAction,
  tone = "next",
}: StudentFastPathProps) {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:items-start">
        <TonePanel tone={tone} className="p-5 lg:p-6">
          <p className="type-meta text-(--accent-strong)">{label}</p>
          <h2 className="mt-3 type-section text-balance text-(--ink-strong)">
            {title}
          </h2>
          <p className="mt-4 type-body text-(--ink-body)">{summary}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={primaryAction.href}
              className={getActionClassName(primaryAction.kind)}
            >
              {primaryAction.label}
            </Link>
            {secondaryAction ? (
              <Link
                href={secondaryAction.href}
                className={getActionClassName(secondaryAction.kind ?? "secondary")}
              >
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </TonePanel>
        <ContentGrid minCardWidth="15rem">
          {steps.map((step, index) => (
            <TonePanel key={step.title} tone="reading" className="card-shell p-5">
              <p className="type-meta text-(--accent-strong)">
                Step {index + 1}
              </p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">
                {step.title}
              </h2>
              <p className="mt-3 type-body text-(--ink-body)">{step.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </div>
    </section>
  );
}
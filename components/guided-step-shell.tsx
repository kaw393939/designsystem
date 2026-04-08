import type { ReactNode } from "react";
import Link from "next/link";

import { EditorialBand } from "@/components/editorial-band";
import { GuidedStepCompanion } from "@/components/guided-step-companion";
import { PageShell } from "@/components/page-shell";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { TonePanel } from "@/components/tone-panel";
import {
  guidedTourSteps,
  type GuidedTourStepId,
  type SiteRouteStatus,
  type TourRecordEntry,
} from "@/lib/site-navigation";

type GuidedStepAction = {
  href: string;
  label: string;
  kind?: "primary" | "secondary";
};

type GuidedStepShellProps = {
  eyebrow: string;
  title: string;
  summary: string;
  status: SiteRouteStatus;
  prerequisite: string;
  output: string;
  children: ReactNode;
  recordEntries: readonly TourRecordEntry[];
  currentStepId?: GuidedTourStepId;
  actions?: readonly GuidedStepAction[];
  heroVisual?: ReactNode;
  misconception?: ReactNode;
  formativeCheck?: ReactNode;
};

export function GuidedStepShell({
  eyebrow,
  title,
  summary,
  status,
  prerequisite,
  output,
  children,
  recordEntries,
  currentStepId,
  actions = [],
  heroVisual,
  misconception,
  formativeCheck,
}: GuidedStepShellProps) {
  const currentStepIndex = currentStepId
    ? guidedTourSteps.findIndex((step) => step.id === currentStepId)
    : -1;
  const progressLabel =
    currentStepIndex >= 0
      ? `Step ${currentStepIndex + 1} of ${guidedTourSteps.length}`
      : `Tour map · ${guidedTourSteps.length} moves`;

  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start xl:gap-12">
          <div className="measure-wide">
            <RouteStatusBadge status={status} />
            <p className="mt-4 type-meta text-(--accent-strong)">{eyebrow}</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">{title}</h1>
            <p className="mt-6 type-body text-(--ink-body)">{summary}</p>
            {actions.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <Link
                    key={action.href + action.label}
                    href={action.href}
                    className={action.kind === "secondary" ? "action-secondary" : "action-primary"}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="space-y-4">
            {heroVisual ? heroVisual : null}
            <TonePanel tone="synthesis" className="p-6">
              <p className="type-meta text-(--accent-strong)">{progressLabel}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.68)] p-4">
                  <p className="type-meta text-(--accent-strong)">Before you start</p>
                  <p className="mt-2 type-caption text-(--ink-body)">{prerequisite}</p>
                </div>
                <div className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.68)] p-4">
                  <p className="type-meta text-(--accent-strong)">Leave with</p>
                  <p className="mt-2 type-caption text-(--ink-body)">{output}</p>
                </div>
              </div>
            </TonePanel>
          </div>
        </div>
      </EditorialBand>

      <div className="xl:hidden">
        <GuidedStepCompanion
          mode="mobile"
          currentStepId={currentStepId}
          recordEntries={recordEntries}
          showBriefTab={false}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-12">
        <div className="space-y-8">
          {children}

          {misconception ? (
            <TonePanel tone="warning" className="p-6">
              <p className="type-meta text-(--signal)">Avoid</p>
              <div className="mt-3 type-body text-(--ink-body)">{misconception}</div>
            </TonePanel>
          ) : null}

          {formativeCheck ? (
            <TonePanel tone="next" className="p-6">
              <p className="type-meta text-(--accent-strong)">Quick check</p>
              <div className="mt-3 type-body text-(--ink-body)">{formativeCheck}</div>
            </TonePanel>
          ) : null}
        </div>

        <aside className="hidden xl:sticky xl:top-44 xl:z-30 xl:block xl:self-start">
          <GuidedStepCompanion
            mode="desktop"
            currentStepId={currentStepId}
            recordEntries={recordEntries}
            showBriefTab={false}
          />
        </aside>
      </div>
    </PageShell>
  );
}
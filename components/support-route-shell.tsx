import type { ReactNode } from "react";
import Link from "next/link";

import { EditorialBand } from "@/components/editorial-band";
import { JourneyReturnLink } from "@/components/journey-return-link";
import { PageShell } from "@/components/page-shell";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { TonePanel } from "@/components/tone-panel";
import type { SiteRouteStatus } from "@/lib/site-navigation";
import type { PanelTone } from "@/lib/theme-tokens";

type SupportRouteAction = {
  href: string;
  label: string;
  kind?: "primary" | "secondary";
};

type SupportRouteShellProps = {
  eyebrow: string;
  title: string;
  summary: string;
  status: SiteRouteStatus;
  tone?: PanelTone;
  useWhen: string;
  whatChanges: string;
  feedsLabel: string;
  returnHref: string;
  returnLabel: string;
  relatedHref?: string;
  relatedLabel?: string;
  actions?: readonly SupportRouteAction[];
  heroVisual?: ReactNode;
  children: ReactNode;
};

export function SupportRouteShell({
  eyebrow,
  title,
  summary,
  status,
  tone = "emphasis",
  useWhen,
  whatChanges,
  feedsLabel,
  returnHref,
  returnLabel,
  relatedHref,
  relatedLabel,
  actions = [],
  heroVisual,
  children,
}: SupportRouteShellProps) {
  return (
    <PageShell>
      <EditorialBand tone={tone} paddingScale="hero" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status={status} />
            <p className="mt-4 type-meta text-(--accent-strong)">{eyebrow}</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">{title}</h1>
            <p className="mt-6 type-body text-(--ink-body)">{summary}</p>
            {actions.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <Link
                    key={`${action.href}-${action.label}`}
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
            <TonePanel tone="reading" className="p-6">
              <div className="space-y-5">
                <div>
                  <p className="type-meta text-(--accent-strong)">Best for</p>
                  <p className="mt-2 type-body text-(--ink-body)">{useWhen}</p>
                </div>
                <div>
                  <p className="type-meta text-(--accent-strong)">Helps with</p>
                  <p className="mt-2 type-body text-(--ink-body)">{feedsLabel}</p>
                </div>
                <div>
                  <p className="type-meta text-(--accent-strong)">Leave with</p>
                  <p className="mt-2 type-body text-(--ink-body)">{whatChanges}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <JourneyReturnLink
                    fallbackHref={returnHref}
                    fallbackLabel={returnLabel}
                    className="action-primary"
                  />
                  {relatedHref && relatedLabel ? (
                    <Link href={relatedHref} className="action-secondary">
                      {relatedLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            </TonePanel>
          </div>
        </div>
      </EditorialBand>

      <div className="space-y-8">{children}</div>
    </PageShell>
  );
}
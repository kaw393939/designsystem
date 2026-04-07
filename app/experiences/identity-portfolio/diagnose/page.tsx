import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import { ConceptGrid, NextStepBlock } from "@/components/educational-primitives";
import { TonePanel } from "@/components/tone-panel";

import { decisionStudioScenarioItems, fieldGuideItems } from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/diagnose/";

export default function IdentityPortfolioDiagnosePage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity diagnose route" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Support route"
      title="Name the page problem before you try to fix it"
      dek="Come here when the portfolio is not landing and you need to identify whether the fix belongs to signal, style, proof, action, or follow-through."
      currentHref={currentHref}
      actions={[
        {
          label: "Fix the signal",
          href: "/experiences/identity-portfolio/signal/",
          kind: "primary",
        },
        {
          label: "See examples",
          href: "/experiences/identity-portfolio/examples/",
          kind: "secondary",
        },
      ]}
    >
      <ConceptGrid
        title="Pick the failure pattern closest to your page"
        summary="Start with the nearest failure. Each card points toward the route that should own the next repair."
        items={decisionStudioScenarioItems}
        columns={2}
      />

      <ContentGrid minCardWidth="18rem">
        {fieldGuideItems.map((item) => (
          <TonePanel key={item.title} tone="reading" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">Quick move</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            <Link href={item.href} className="action-secondary mt-5 inline-flex w-fit">
              Open route
            </Link>
          </TonePanel>
        ))}
      </ContentGrid>

      <NextStepBlock
        title="Name the failure, then return to the fix"
        summary="Once the problem is clear, move back to the route that owns the next decision and revise the page there."
        context="Diagnosis is only useful if it shortens the next revision."
        primaryAction={{
          label: "Go to signal",
          href: "/experiences/identity-portfolio/signal/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Open examples",
          href: "/experiences/identity-portfolio/examples/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}
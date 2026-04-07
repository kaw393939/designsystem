import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import {
  ComparisonGrid,
  PullInsight,
  SequenceTimeline,
} from "@/components/educational-primitives";
import { ProgressPathVisual } from "@/components/human-signal-visuals";
import { MediaBlock } from "@/components/media-block";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";

import {
  AIPortfolioPressureMap,
  IdentitySystemDiagram,
  comparisonColumns,
  comparisonRows,
  courseMapItems,
  moduleRoadmapItems,
  systemGuardrails,
} from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/system-map/";

export default function IdentityPortfolioSystemMapPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity system map" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Reference route"
      title="See the full model behind the route split"
      dek="This is the long view: the pressure map, the seven-layer system, and the route sequence that moved off the homepage so the student path could stay shorter."
      currentHref={currentHref}
      actions={[
        {
          label: "Return to start",
          href: "/experiences/identity-portfolio/",
          kind: "primary",
        },
        {
          label: "Open sources",
          href: "/experiences/identity-portfolio/sources/",
          kind: "secondary",
        },
      ]}
    >
      <CalloutBand label="Guardrails" title="The route map exists to reduce confusion, not to preserve every good idea on one page." tone="warning">
        <ul className="space-y-3 pl-5">
          {systemGuardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CalloutBand>

      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="proof" className="p-5">
            <ProgressPathVisual
              ariaLabel="Six-step path from identifying the need to publishing a portfolio system"
              steps={["Need", "Signal", "Style", "Proof", "Action", "Publish"]}
              palette="sky"
            />
          </TonePanel>
        }
        secondary={
          <TonePanel tone="reading" className="p-5">
            <AIPortfolioPressureMap />
            <p className="mt-4 type-caption text-(--ink-body)">
              Read this as a pressure map, not a prediction machine. Surface polish keeps getting cheaper; coherence, proof, and public follow-through do not.
            </p>
          </TonePanel>
        }
      />

      <ContentGrid minCardWidth="16rem">
        {moduleRoadmapItems.map((item) => (
          <TonePanel key={item.label} tone="next" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">{item.label}</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            <p className="mt-4 type-caption text-(--signal)">
              <strong>Output:</strong> {item.output}
            </p>
          </TonePanel>
        ))}
      </ContentGrid>

      <MediaBlock
        alignment="split"
        tone="proof"
        media={<IdentitySystemDiagram />}
        caption="The seven-layer operating model"
        credit="Teaching translation of docs/_research/identity-system-core.md"
        annotation={
          <p>
            You do not need every layer in your head at once. You need to know which layer the current route is trying to solve.
          </p>
        }
      />

      <SequenceTimeline
        title="Course map"
        summary="Move from the source argument to a public portfolio system without turning the homepage into the whole theory stack."
        mode="process"
        items={courseMapItems}
      />

      <ComparisonGrid
        title="The system changes what a portfolio is trying to do"
        legend="The key difference is not style alone. It is whether the site behaves like a coherent signal system."
        columns={comparisonColumns}
        rows={comparisonRows}
      />

      <PullInsight
        quote="Motivation shapes identity. Identity shapes perception. Perception supports trust. Trust makes action possible. Deployment compounds into opportunity."
        context="That is the logic behind the route split. The homepage no longer tries to teach every layer at once."
      />
    </IdentityRouteShell>
  );
}
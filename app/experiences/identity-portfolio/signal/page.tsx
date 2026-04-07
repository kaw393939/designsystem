import { CalloutBand } from "@/components/callout-band";
import {
  ConceptGrid,
  NextStepBlock,
  UnitRenderer,
} from "@/components/educational-primitives";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";

import {
  getAdaptedArchetypeUnit,
  moduleOnePrepItems,
  signalGuardrails,
} from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/signal/";

export default function IdentityPortfolioSignalPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity signal step" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Step 1"
      title="Choose the signal that should govern the first read"
      dek="Start with human need, choose the audience, and commit to the one archetype and promise that should organize the first read before you touch style, proof, or publishing."
      currentHref={currentHref}
      actions={[
        {
          label: "Continue to style",
          href: "/experiences/identity-portfolio/style/",
          kind: "primary",
        },
        {
          label: "Compare archetypes",
          href: "/experiences/identity-portfolio/labs/archetypes/",
          kind: "secondary",
        },
      ]}
    >
      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">What you are choosing</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              You are choosing the need-signal pair that makes the page readable.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              The homepage works better when one audience, one need, and one promise show up first. Secondary traits can appear later, but the first read needs one clear interpretive frame.
            </p>
          </TonePanel>
        }
        secondary={
          <CalloutBand label="Guardrails" title="Keep the signal stable before you scale the site." tone="warning">
            <ul className="space-y-3 pl-5">
              {signalGuardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
        }
      />

      <ConceptGrid
        title="Lock these three choices before you style anything"
        summary="If one of these stays vague, style and proof start drifting immediately."
        items={moduleOnePrepItems}
        columns={3}
      />

      <UnitRenderer unit={getAdaptedArchetypeUnit()} headingLevel={3} />

      <NextStepBlock
        title="Once the signal is stable, turn it into a first-screen visual direction"
        summary="The next step is not more theory. It is choosing the hierarchy, pacing, contrast, and imagery that make the signal visible fast."
        context="Move forward when the headline, audience, and archetype no longer contradict each other."
        primaryAction={{
          label: "Continue to style",
          href: "/experiences/identity-portfolio/style/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Open archetype lab",
          href: "/experiences/identity-portfolio/labs/archetypes/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}
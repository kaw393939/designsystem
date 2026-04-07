import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { NextStepBlock } from "@/components/educational-primitives";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";

import {
  PersuasionPatternBoard,
  persuasionPatternItems,
  proofGuardrails,
} from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/proof/";

export default function IdentityPortfolioProofPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity proof step" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Step 3"
      title="Put proof near the promise"
      dek="Choose the artifact, result, or receipt that reduces uncertainty quickly enough that the page no longer relies on adjectives to sound credible."
      currentHref={currentHref}
      actions={[
        {
          label: "Continue to build",
          href: "/experiences/identity-portfolio/build/",
          kind: "primary",
        },
        {
          label: "Open examples",
          href: "/experiences/identity-portfolio/examples/",
          kind: "secondary",
        },
      ]}
    >
      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="proof" className="p-5">
            <PersuasionPatternBoard />
            <p className="mt-4 type-caption text-(--ink-body)">
              Use these as honest trust moves, not as hacks. The point is to reduce uncertainty with visible evidence.
            </p>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Proof block rule</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Trust moves fastest when the claim and the receipt stay close together.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              If the strongest artifact is buried below the fold or separated from the promise by too much filler, the page starts sounding smarter than it looks.
            </p>
          </TonePanel>
        }
      />

      <CalloutBand label="Guardrails" title="Keep trust concrete and verifiable." tone="warning">
        <ul className="space-y-3 pl-5">
          {proofGuardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CalloutBand>

      <ContentGrid minCardWidth="18rem">
        {persuasionPatternItems.map((item) => (
          <TonePanel key={item.title} tone="proof" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">Influence pattern</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h2>
            <p className="mt-3 type-caption text-(--ink-body)">
              <strong>Show:</strong> {item.visualCue}
            </p>
            <p className="mt-3 type-caption text-(--signal)">
              <strong>Say:</strong> {item.vocabularyCue}
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              <strong>Avoid:</strong> {item.guardrail}
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              <strong>Example:</strong> {item.example}
            </p>
            <Link href={item.href} prefetch={false} className="action-secondary mt-5 inline-flex w-fit">
              Open related route
            </Link>
          </TonePanel>
        ))}
      </ContentGrid>

      <NextStepBlock
        title="Once proof is doing its job, assemble the page and the next step"
        summary="The build route turns the signal, the visual lane, and the proof choice into the actual page stack and CTA people can act on."
        context="Proof earns the read. Build makes the next move obvious."
        primaryAction={{
          label: "Continue to build",
          href: "/experiences/identity-portfolio/build/",
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
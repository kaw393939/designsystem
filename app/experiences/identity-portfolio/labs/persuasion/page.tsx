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
} from "../../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../../route-shell";

const currentHref = "/experiences/identity-portfolio/labs/persuasion/";

export default function IdentityPortfolioPersuasionLabPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity persuasion lab" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Optional lab"
      title="Build trust without turning the page into sales theater"
      dek="This lab breaks trust down into usable persuasion patterns without making the site louder or less honest."
      currentHref={currentHref}
      actions={[
        {
          label: "Return to proof",
          href: "/experiences/identity-portfolio/proof/",
          kind: "primary",
        },
        {
          label: "See examples",
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
              A principle only matters if it becomes a trust move you can actually build and defend.
            </p>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Trust pattern</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Begin with the doubt you need to remove.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              Pick one pattern that reduces uncertainty and makes the page easier to believe. If the move makes the page harder to trust or harder to use, it is the wrong move.
            </p>
          </TonePanel>
        }
      />

      <CalloutBand label="Guardrails" title="Make the trust move clearer, not pushier." tone="warning">
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
        title="Take one trust move back to the proof route"
        summary="Choose the pattern, then apply it where claim, artifact, and CTA sit together on the live page."
        context="The lab names the move. The proof route is where it becomes visible."
        primaryAction={{
          label: "Return to proof",
          href: "/experiences/identity-portfolio/proof/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "See examples",
          href: "/experiences/identity-portfolio/examples/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}
import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import { NextStepBlock } from "@/components/educational-primitives";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";

import {
  ScholarSignalConstellation,
  psychologyPrincipleItems,
} from "../../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../../route-shell";

const currentHref = "/experiences/identity-portfolio/labs/psychology/";

export default function IdentityPortfolioPsychologyLabPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity psychology lab" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Optional lab"
      title="Use psychology to explain what the page is doing"
      dek="This lab translates motivation, attention, identity, and trust into page decisions without disappearing into theory for theory's sake."
      currentHref={currentHref}
      actions={[
        {
          label: "Return to diagnose",
          href: "/experiences/identity-portfolio/diagnose/",
          kind: "primary",
        },
        {
          label: "Go to proof",
          href: "/experiences/identity-portfolio/proof/",
          kind: "secondary",
        },
      ]}
    >
      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="proof" className="p-5">
            <ScholarSignalConstellation />
            <p className="mt-4 type-caption text-(--ink-body)">
              Your page choices get easier to defend when you can trace them back to named ideas instead of vague design folklore.
            </p>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Read the problem through the principle</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Start with the friction the viewer is actually feeling.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              If the page is vague, start with attention and motivation. If the page is thin on trust, move to ethics, identity, and proof. Use the idea that helps the next revision.
            </p>
          </TonePanel>
        }
      />

      <ContentGrid minCardWidth="18rem">
        {psychologyPrincipleItems.map((item) => (
          <TonePanel key={item.title} tone="reading" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">{item.scholar}</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            <p className="mt-4 type-caption text-(--signal)">
              <strong>Use it like this:</strong> {item.pageMove}
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              <strong>IRL:</strong> {item.example}
            </p>
            <Link href={item.href} className="action-secondary mt-5 inline-flex w-fit">
              Open related route
            </Link>
          </TonePanel>
        ))}
      </ContentGrid>

      <NextStepBlock
        title="Take the principle back into the live route"
        summary="Once the concept clarifies the move, return to the route that owns the actual page decision."
        context="Theory earns its place when it shortens revision time."
        primaryAction={{
          label: "Return to diagnose",
          href: "/experiences/identity-portfolio/diagnose/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Go to proof",
          href: "/experiences/identity-portfolio/proof/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}
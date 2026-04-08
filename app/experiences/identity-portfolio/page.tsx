import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import {
  PortfolioComparisonVisual,
  StudentPortraitBadge,
} from "@/components/human-signal-visuals";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";

import {
  identityCoreRouteCards,
  identitySupportRouteCards,
  studentStoryItems,
} from "./content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "./route-shell";

const currentHref = "/experiences/identity-portfolio/";

export default function IdentityPortfolioExperiencePage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity Portfolio start" />;
  }

  const startExample = studentStoryItems[0];
  const supportCards = [
    identitySupportRouteCards[0],
    identitySupportRouteCards[1],
    identitySupportRouteCards[6],
  ];

  return (
    <IdentityRouteShell
      eyebrow="Identity course"
      title="Build a portfolio that actually says something"
      dek="Start with the need, lock the signal, make it visible, prove it, give it a next step, and put it into circulation until weak ties remember it."
      currentHref={currentHref}
      actions={[
        {
          label: "Start with the signal",
          href: "/experiences/identity-portfolio/signal/",
          kind: "primary",
        },
        {
          label: "Open the build path",
          href: "/experiences/identity-portfolio/build/",
          kind: "secondary",
        },
      ]}
    >
      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">
              Start here
            </p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Read the promise before you polish the surface.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              This page gives you the operating model: what the work helps with, what signal should lead, and which five decisions turn a polished page into something people can understand and remember.
            </p>
            <div className="mt-6 rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.76)] p-5">
              <StudentPortraitBadge
                name={startExample.name}
                label={startExample.role}
                palette={startExample.palette}
              />
              <p className="mt-4 type-caption text-(--signal)">
                <strong>Shift:</strong> {startExample.outcome}
              </p>
              <p className="mt-3 type-caption text-(--ink-body)">
                If the page looks finished but still fails to stick, start by tightening the need, signal, and first proof cue.
              </p>
            </div>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="proof" className="p-5">
            <PortfolioComparisonVisual
              ariaLabel="Comparison between a generic portfolio and a proof-driven identity portfolio"
              beforeLabel="Generic first read"
              afterLabel="Clear human signal"
            />
            <p className="mt-4 type-caption text-(--ink-body)">
              The whole system is built to make the first screen legible before the rest of the page expands.
            </p>
          </TonePanel>
        }
      />

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="type-meta text-(--accent-strong)">Core path</p>
          <h2 className="type-section text-balance text-(--ink-strong)">
            Five steps, one working system.
          </h2>
          <p className="measure-reading type-body text-(--ink-body)">
            Move through these in order if you want the shortest path from human need to a page people can understand, trust, and act on.
          </p>
        </div>
        <ContentGrid minCardWidth="16rem">
          {identityCoreRouteCards.map((card) => (
            <TonePanel key={card.href} tone="next" className="card-shell p-6">
              <p className="type-meta text-(--accent-strong)">{card.label}</p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{card.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{card.summary}</p>
              <Link href={card.href} className="action-secondary mt-5 inline-flex w-fit">
                Open step
              </Link>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Optional depth"
        title="Use support routes only when you hit a specific problem."
        tone="neutral"
      >
        <ContentGrid minCardWidth="17rem">
          {supportCards.map((card) => (
            <TonePanel key={card.href} tone="reading" className="card-shell p-6">
              <p className="type-meta text-(--accent-strong)">{card.label}</p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{card.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{card.summary}</p>
              <Link href={card.href} className="action-secondary mt-5 inline-flex w-fit">
                Open route
              </Link>
            </TonePanel>
          ))}
        </ContentGrid>
      </CalloutBand>
    </IdentityRouteShell>
  );
}
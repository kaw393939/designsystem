import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { NextStepBlock } from "@/components/educational-primitives";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";

import { designLineageItems, styleGuardrails } from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/style/";

export default function IdentityPortfolioStylePage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity style step" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Step 2"
      title="Pick the visual lane on purpose"
      dek="Turn the signal into hierarchy, pacing, contrast, imagery, and tone choices that make the page legible in the first few seconds."
      currentHref={currentHref}
      actions={[
        {
          label: "Continue to proof",
          href: "/experiences/identity-portfolio/proof/",
          kind: "primary",
        },
        {
          label: "Open archetype lab",
          href: "/experiences/identity-portfolio/labs/archetypes/",
          kind: "secondary",
        },
      ]}
    >
      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Visual lane</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Style should confirm the signal at a glance.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              Choose hierarchy, contrast, imagery, and pacing that match the promise you picked in signal. When the lane is coherent, proof and action read like continuation instead of correction.
            </p>
          </TonePanel>
        }
        secondary={
          <CalloutBand label="Guardrails" title="Do not let the visual layer contradict the signal." tone="warning">
            <ul className="space-y-3 pl-5">
              {styleGuardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
        }
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Swiss vs brutalist"
          title="See the contrast in one screen"
          body="Both can work. They just send different signals. Use Swiss when you need calm trust and quick clarity. Use brutalism when the work has edge and you want deliberate interruption."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <TonePanel tone="reading" className="overflow-hidden p-0">
            <div className="border-b border-(--border-neutral) bg-[rgba(255,255,255,0.88)] px-6 py-4">
              <p className="type-meta text-(--accent-strong)">Swiss clarity</p>
            </div>
            <div className="space-y-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(238,242,246,0.86))] px-6 py-7">
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                <div className="space-y-3">
                  <h3 className="type-section text-balance text-(--ink-strong)">
                    Clear signal. Calm proof. No wasted motion.
                  </h3>
                  <p className="type-body text-(--ink-body)">
                    Choose this when the page needs to feel composed, legible, and trustworthy in the first few seconds.
                  </p>
                </div>
                <div className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.88)] p-4">
                  <p className="type-meta text-(--accent-strong)">Proof block</p>
                  <p className="mt-2 type-caption text-(--ink-body)">
                    One screenshot, one caption, one result.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.74)] p-4 type-caption text-(--ink-body)">
                  Strong grid
                </div>
                <div className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.74)] p-4 type-caption text-(--ink-body)">
                  Quiet contrast
                </div>
                <div className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.74)] p-4 type-caption text-(--ink-body)">
                  Easy first read
                </div>
              </div>
            </div>
          </TonePanel>
          <TonePanel tone="proof" className="overflow-hidden p-0">
            <div className="border-b border-[rgba(255,255,255,0.18)] bg-(--ink-strong) px-6 py-4">
              <p className="type-meta text-white">Brutalist friction</p>
            </div>
            <div className="space-y-5 bg-[linear-gradient(180deg,rgba(22,26,29,1),rgba(42,47,51,1))] px-6 py-7 text-white">
              <div className="space-y-3">
                <p className="type-meta text-[rgba(255,255,255,0.72)]">High tension</p>
                <h3 className="type-section text-balance uppercase tracking-[0.08em] text-white">
                  Make the page bite back.
                </h3>
                <p className="type-body text-[rgba(255,255,255,0.82)]">
                  Choose this when the work carries critique, urgency, or edge and the page should interrupt the viewer on purpose.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.08)] p-4 type-caption uppercase tracking-[0.08em] text-white">
                  Heavy type
                </div>
                <div className="border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.08)] p-4 type-caption uppercase tracking-[0.08em] text-white">
                  Hard contrast
                </div>
                <div className="border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.08)] p-4 type-caption uppercase tracking-[0.08em] text-white">
                  Deliberate friction
                </div>
              </div>
              <div className="border-l-4 border-[rgba(255,255,255,0.68)] pl-4 type-caption text-[rgba(255,255,255,0.82)]">
                Good when you want critique or interruption. Bad when you actually need calm trust.
              </div>
            </div>
          </TonePanel>
        </div>
      </section>

      <ContentGrid minCardWidth="19rem">
        {designLineageItems.map((item) => (
          <TonePanel key={item.title} tone="synthesis" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">Style direction</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            <p className="mt-4 type-caption text-(--signal)">
              <strong>Signal:</strong> {item.visualSignal}
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              <strong>Example:</strong> {item.example}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={item.internalHref} prefetch={false} className="action-secondary">
                {item.internalLabel}
              </Link>
              <a href={item.externalHref} target="_blank" rel="noreferrer" className="action-secondary">
                {item.externalLabel}
              </a>
            </div>
          </TonePanel>
        ))}
      </ContentGrid>

      <NextStepBlock
        title="Once the first read is stable, earn trust near the promise"
        summary="The next route is about proof: which artifact, outcome, or receipt should sit close enough to the claim that belief arrives quickly."
        context="Perception gets the read started. Proof makes the signal worth acting on."
        primaryAction={{
          label: "Continue to proof",
          href: "/experiences/identity-portfolio/proof/",
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
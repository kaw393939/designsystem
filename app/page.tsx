import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  atlasHomeHighlights,
  designStyles,
  familyOverviews,
  heroExamples,
  selectionSteps,
} from "@/lib/archetype-atlas-content";
import { withBasePath } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Overview",
};

export default function HomePage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="measure-wide">
            <p className="type-meta text-(--accent-strong)">Brand archetype atlas</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
              Pick one brand personality, lock in a visual style, and build a site that lands on the first look.
            </h1>
            <p className="mt-6 type-body text-(--ink-body)">
              This is your practical field guide for building personal and business brand sites. You will learn how to choose a brand archetype (think: the core personality your site projects), pair it with a visual style, pick the right words and fonts, and turn those decisions into hero sections, proof blocks, and pages people actually trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/playbook" className="action-primary">
                Start the playbook
              </Link>
              <Link href="/archetypes" className="action-secondary">
                Browse all archetypes
              </Link>
            </div>
          </div>

          <figure className="atlas-figure atlas-figure--hero">
            <img
              src={withBasePath("/archetype-atlas/styles/swiss-grid.png")}
              alt="Swiss-grid style board used as the visual anchor for the archetype atlas overview."
              className="atlas-image"
            />
            <figcaption className="atlas-figure-caption">
              Strategy first: archetype, style lens, proof, then CTA.
            </figcaption>
          </figure>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="What this atlas does"
          title="It turns brand personality into concrete design moves."
          body="The goal is not to hand out personality labels. The goal is to help you choose one dominant signal — the first impression your site makes — pair it with a visual style, and build pages that feel intentional instead of mixed or generic."
        />
        <ContentGrid minCardWidth="17rem">
          {atlasHomeHighlights.map((item) => (
            <TonePanel key={item.title} tone="reading" className="card-shell p-6">
              <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Four cluster rooms"
          title="Four families instead of a flat list of twelve."
          body="Each family groups archetypes by the kind of emotional response they promise — safety, ambition, belonging, or authority. Starting from a family makes the comparison easier because you can see the trade-offs before you commit."
        />
        <ContentGrid minCardWidth="16rem">
          {familyOverviews.map((family) => (
            <TonePanel key={family.id} tone="synthesis" className="card-shell p-6">
              <p className="type-meta text-(--accent-strong)">{family.archetypesLabel}</p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{family.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{family.summary}</p>
              <Link href={`/archetypes#${family.id}`} className="action-secondary mt-5 inline-flex w-fit">
                Open this family
              </Link>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="How to choose"
          title="A good archetype decision is a sequence, not a vibe check."
          body="Start from what your audience needs to feel, pick the personality that delivers that feeling, translate it into real design choices, and only then decide whether the page should be crystal-clear or carry some deliberate tension."
        />
        <ContentGrid minCardWidth="18rem">
          {selectionSteps.map((step) => (
            <TonePanel key={step.title} tone="proof" className="card-shell p-6">
              <h2 className="type-concept text-(--ink-strong)">{step.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{step.summary}</p>
              <p className="mt-4 type-caption text-(--signal)">
                <strong>Prompt:</strong> {step.prompt}
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Style contrast"
          title="Swiss keeps it clean. Punk and brutalist add deliberate edge."
          body="If your page needs to be understood in seconds, start with Swiss grid or systems-modern structure — think clean lines, clear hierarchy. If you want to provoke curiosity, tension, or rebellious energy, lean into brutalist or punk styling on purpose — but keep at least one layer stable so the message still comes through."
        />
        <ContentGrid minCardWidth="17rem">
          {designStyles.slice(0, 4).map((style) => (
            <TonePanel key={style.slug} tone="reading" className="card-shell overflow-hidden p-0">
              <img src={withBasePath(style.imagePath)} alt={`${style.name} style board`} className="atlas-card-image" />
              <div className="p-6">
                <h2 className="type-concept text-(--ink-strong)">{style.name}</h2>
                <p className="mt-3 type-body text-(--ink-body)">{style.stance}</p>
                <p className="mt-3 type-caption text-(--signal)">
                  <strong>Best for:</strong> {style.bestFor}
                </p>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
        <div>
          <Link href="/design-styles" className="action-secondary inline-flex">
            Enter the style lab
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Live hero sections"
          title="Live coded hero sections, not just mood boards."
          body="Each example below is a real hero section — the first thing visitors see — so you can study how picking a different archetype changes the headline, the supporting text, the evidence strip, the call-to-action button, and the overall visual feel."
        />
        <ContentGrid minCardWidth="19rem">
          {heroExamples.slice(0, 3).map((example) => (
            <TonePanel key={example.slug} tone="synthesis" className="card-shell p-6">
              <p className="type-meta text-(--accent-strong)">
                {example.archetype} x {example.style}
              </p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{example.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{example.headline}</p>
              <p className="mt-3 type-caption text-(--ink-body)">{example.deck}</p>
            </TonePanel>
          ))}
        </ContentGrid>
        <div>
          <Link href="/hero-examples" className="action-primary inline-flex">
            Study the hero examples
          </Link>
        </div>
      </section>

      <CalloutBand
        label="Naming the contrast"
        title="Not muddying. Controlled friction."
        tone="warning"
      >
        <p>
          When a page needs intrigue, rebellion, or appetite, the design can add texture, interruption, and edge on purpose. The useful term is controlled friction: enough roughness to shape the feeling, but not so much that the signal becomes unreadable.
        </p>
      </CalloutBand>
    </PageShell>
  );
}

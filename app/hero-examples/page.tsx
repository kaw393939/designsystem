import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { heroExamples } from "@/lib/archetype-atlas-content";
import { withBasePath } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hero Examples",
};

export default function HeroExamplesPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">Live hero examples</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Real hero sections that show how picking a different archetype changes everything.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            These are live coded examples, not just mood boards. Study how the same basic ingredients — headline, supporting text, evidence, and call-to-action button — feel completely different when filtered through Sage, Hero, Outlaw, Creator, Magician, and Caregiver logic.
          </p>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="How to read them"
          title="The hero is where mixed signals become obvious."
          body="Each example keeps the same basic ingredients: eyebrow label, headline, deck (supporting paragraph), proof strip, and CTA (call-to-action button). What changes is the archetype and the visual style carrying it."
        />
      </section>

      <div className="grid gap-8">
        {heroExamples.map((example) => (
          <TonePanel key={example.slug} tone="reading" className="card-shell p-6">
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div className={`hero-example ${example.variantClassName}`}>
                <p className="hero-example__eyebrow">{example.eyebrow}</p>
                <h2 className="hero-example__headline">{example.headline}</h2>
                <p className="hero-example__deck">{example.deck}</p>
                <div className="hero-example__proof">{example.proofLabel}</div>
                <button type="button" className="hero-example__cta">
                  {example.cta}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="type-meta text-(--accent-strong)">
                    {example.archetype} x {example.style}
                  </p>
                  <h2 className="mt-2 type-section text-(--ink-strong)">{example.title}</h2>
                </div>
                <img src={withBasePath(example.imagePath)} alt={`${example.title} concept board`} className="atlas-image" />
                <div className="atlas-detail-card">
                  <h3 className="type-concept text-(--ink-strong)">Why it works</h3>
                  <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body)">
                    {example.whyItWorks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TonePanel>
        ))}
      </div>

      <CalloutBand label="Use this well" title="Copy, hierarchy, and proof must belong to the same person." tone="warning">
        <p>
          The most common failure is styling the hero as one archetype while writing the deck or CTA in another. If the headline sounds like Sage and the CTA sounds like generic startup enthusiasm, the signal breaks.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
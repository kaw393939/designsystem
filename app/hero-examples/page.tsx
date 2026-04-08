import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteStatusBadge } from "@/components/route-status-badge";
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
          <RouteStatusBadge status="Wrapper-specific" />
          <p className="mt-4 type-meta text-(--accent-strong)">Legacy continuity route</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            These older hero examples now point to the main examples pages.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Keep this gallery for older links or a hero-first archive view. The main examples
            family now splits proof structure from full student examples.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/examples/proof-blocks" className="action-primary">
              Open proof anatomy
            </Link>
            <Link href="/examples/student-exemplars" className="action-secondary">
              Open student exemplars
            </Link>
          </div>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="How to read them"
          title="Read these like fast side-by-side comparisons."
          body="Each example uses the same basic pieces: label, headline, supporting copy, proof section, and call to action. What changes is the archetype and style carrying them."
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

      <CalloutBand label="Use this well" title="The copy, hierarchy, and proof should sound like the same person." tone="warning">
        <p>
          If the headline sounds like Sage and the button sounds like generic hype, the vibe breaks.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
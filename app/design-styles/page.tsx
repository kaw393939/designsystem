import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { designStyles } from "@/lib/archetype-atlas-content";
import { withBasePath } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Style Lab",
};

export default function DesignStylesPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">Style lab</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Choose the visual style after you have locked in the archetype.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Swiss, brutalist, punk, editorial, and systems-modern are not brand personalities — they are visual styles, like camera lenses that change how the same subject looks. Each one shapes hierarchy, pacing, texture, and emotional pressure differently.
          </p>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Clarity vs. friction"
          title="Use style to control how fast the meaning lands."
          body="Swiss and systems-modern make things easy to understand fast. Punk, grunge, and brutalist styles (raw, unpolished, confrontational on purpose) can add energy and tension. The key: never be confusing by accident."
        />
        <div className="style-spectrum">
          <span>Clarity first</span>
          <span>Controlled friction</span>
        </div>
      </section>

      <ContentGrid minCardWidth="19rem">
        {designStyles.map((style) => (
          <TonePanel key={style.slug} tone="reading" className="card-shell overflow-hidden p-0">
            <img src={withBasePath(style.imagePath)} alt={`${style.name} style board`} className="atlas-card-image" />
            <div className="space-y-4 p-6">
              <div>
                <h2 className="type-section text-(--ink-strong)">{style.name}</h2>
                <p className="mt-3 type-body text-(--ink-body)">{style.stance}</p>
              </div>
              <div className="atlas-detail-card">
                <p className="type-caption text-(--signal)">
                  <strong>Clarifies:</strong> {style.clarifies}
                </p>
                <p className="mt-3 type-caption text-(--ink-body)">
                  <strong>Controlled friction:</strong> {style.controlledFriction}
                </p>
                <p className="mt-3 type-caption text-(--ink-body)">
                  <strong>Best for:</strong> {style.bestFor}
                </p>
                <p className="mt-3 type-caption text-(--ink-body)">
                  <strong>Watch out:</strong> {style.watchOut}
                </p>
                <p className="mt-3 type-caption text-(--ink-body)">
                  <strong>Font guidance:</strong> {style.fontGuidance}
                </p>
              </div>
              <div>
                <p className="type-concept text-(--ink-strong)">Good archetype pairings</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {style.pairings.map((pairing) => (
                    <span key={pairing} className="atlas-pill atlas-pill--neutral">{pairing}</span>
                  ))}
                </div>
              </div>
            </div>
          </TonePanel>
        ))}
      </ContentGrid>

      <CalloutBand label="Language" title="Not muddying. Controlled friction." tone="warning">
        <p>
          If the goal is curiosity, subculture, critique, or appetite, a page can use rougher texture, interruption, and anti-default composition on purpose. The standard is still coherence. The friction should intensify the signal, not erase it.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteStatusBadge } from "@/components/route-status-badge";
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
          <RouteStatusBadge status="Wrapper-specific" />
          <p className="mt-4 type-meta text-(--accent-strong)">Legacy continuity route</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            The design styles page has moved.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Keep this page for older links or the older board view. The main design-lineages room
            now lives under Browse.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/browse/design-lineages" className="action-primary">
              Go to the main page
            </Link>
            <Link href="/tour/style" className="action-secondary">
              Return to the style step
            </Link>
          </div>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Clarity vs. friction"
          title="Use style to control how fast people get the point."
          body="Swiss and systems-modern clarify fast. Punk, grunge, and brutalist styles add tension. Use friction on purpose, not by accident."
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

      <CalloutBand label="Language" title="Controlled friction, not random mess." tone="warning">
        <p>
          Rough texture, interruption, and anti-default composition can work. They still have to
          make sense. Friction should sharpen the vibe, not hide it.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
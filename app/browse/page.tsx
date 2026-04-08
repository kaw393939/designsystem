import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import { browseRoomCards } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Browse",
};

export default function BrowsePage() {
  return (
    <PageShell>
      <EditorialBand tone="synthesis" paddingScale="hero">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Optional reference" />
            <p className="mt-4 type-meta text-(--accent-strong)">Browse rooms</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
              Open one room to sharpen one decision.
            </h1>
            <p className="mt-6 type-body text-(--ink-body)">
              Browse is the support side of the tour. Pick the room that matches the decision you
              need to make, then go back to the main path.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/browse/archetypes" className="action-primary">
                Open the archetypes room
              </Link>
              <Link href="/tour/archetype" className="action-secondary">
                Return to the tour
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <RouteVisualPanel plan={routeVisualPlans.browse} />
            <TonePanel tone="reading" className="p-6">
              <p className="type-meta text-(--accent-strong)">How to use browse</p>
              <div className="mt-4 space-y-4 type-body text-(--ink-body)">
                <p>Open one room.</p>
                <p>Make the decision you came for.</p>
                <p>Go back to the tour before the browsing takes over.</p>
              </div>
            </TonePanel>
          </div>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="The rooms"
          title="Each room should help you make one clearer decision before you go back to the tour."
          body="Open the room that matches the decision you are trying to make, then leave once the brief is clearer." 
        />
        <ContentGrid minCardWidth="18rem">
          {browseRoomCards.map((room) => (
            <TonePanel key={room.id} tone={room.tone} className="p-6">
              <RouteStatusBadge status={room.status} />
              <h2 className="mt-4 type-concept text-(--ink-strong)">{room.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{room.summary}</p>
              <p className="mt-4 type-caption text-(--ink-body)">
                <strong>Best for:</strong> {room.useWhen}
              </p>
              <p className="mt-2 type-caption text-(--ink-body)">
                <strong>Leave with:</strong> {room.whatChanges}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={room.href} className="action-secondary">
                  {room.actionLabel}
                </Link>
                <Link href={room.returnHref} className="action-primary">
                  {room.returnLabel}
                </Link>
                <Link href={room.relatedHref} className="action-secondary">
                  {room.relatedLabel}
                </Link>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand label="Room rule" title="Browse should help the build, not replace it." tone="warning">
        <p>
          If a room does not change the brief, go back to the tour step first.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
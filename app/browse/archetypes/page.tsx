import type { Metadata } from "next";
import Link from "next/link";

import { ArchetypeDetailCard } from "@/components/archetype-detail-card";
import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { SupportRouteShell } from "@/components/support-route-shell";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypeProfiles,
  familyOverviews,
} from "@/lib/archetype-atlas-content";
import { routeVisualPlans } from "@/lib/route-imagery";
import { browseRoomCards } from "@/lib/site-navigation";

const room = browseRoomCards.find((card) => card.id === "browse-archetypes");

export const metadata: Metadata = {
  title: "Browse Archetypes",
};

export default function BrowseArchetypesPage() {
  if (!room) {
    throw new Error("Missing browse-archetypes room metadata.");
  }

  return (
    <SupportRouteShell
      eyebrow="Archetypes"
      title="Compare the big archetype families before you pick the label that sounds coolest."
      summary="Start with the families, then compare a few likely fits before you open the full profiles."
      status={room.status}
      tone="synthesis"
      useWhen={room.useWhen}
      whatChanges={room.whatChanges}
      feedsLabel={room.guidedStepLabel}
      returnHref={room.returnHref}
      returnLabel={room.returnLabel}
      relatedHref={room.relatedHref}
      relatedLabel={room.relatedLabel}
      actions={[
        { href: room.returnHref, label: room.returnLabel },
        { href: "/archetypes", label: "Open the full archetype index", kind: "secondary" },
      ]}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.browseArchetypes} />}
    >
      <CalloutBand
        label="Decision filter"
        title="Which archetype matches your signal?"
        tone="next"
      >
        <p>
          Review the profiles below, then{" "}
          <Link href="/tour/archetype" className="underline">
            return to the Archetype step
          </Link>{" "}
          to lock in your choice.
        </p>
      </CalloutBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="The four families"
          title="Start with the four families."
          body="Rule whole groups in or out before you get lost in twelve separate labels."
        />
        <ContentGrid minCardWidth="17rem">
          {familyOverviews.map((family) => (
            <TonePanel key={family.id} tone="reading" className="p-6">
              <p className="type-meta text-(--accent-strong)">{family.archetypesLabel}</p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{family.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{family.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="All 12 archetypes"
          title="Full profiles with psychology, brands, and visual identity."
          body="Each card shows the summary by default. Expand the sections to see the full psychology profile, brand examples, and design guidance."
        />
        <ContentGrid minCardWidth="20rem">
          {archetypeProfiles.map((profile) => (
            <ArchetypeDetailCard key={profile.slug} archetype={profile} />
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Ready to choose?"
        title="Leave with one choice, one reason, and one thing to avoid."
        tone="next"
      >
        <p>
          <Link href="/tour/archetype" className="underline">
            Return to the Archetype step →
          </Link>
        </p>
      </CalloutBand>

      <CalloutBand
        label="Course module"
        title="Module 1 covers archetype selection, congruence, and common traps."
        tone="synthesis"
      >
        <p>
          <Link href="/modules/web-presence-framework" className="underline">
            Open Module 1: Web Presence Framework →
          </Link>
        </p>
      </CalloutBand>
    </SupportRouteShell>
  );
}
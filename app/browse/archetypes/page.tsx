import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
import { withBasePath } from "@/lib/site-config";
import { browseRoomCards } from "@/lib/site-navigation";

const room = browseRoomCards.find((card) => card.id === "browse-archetypes");

const candidateSlugs = ["sage", "hero", "caregiver"];
const supportingProfiles = archetypeProfiles.filter((profile) =>
  candidateSlugs.includes(profile.slug),
);

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
          eyebrow="Compare the top three"
          title="Compare a few likely fits, not all twelve at once."
          body="These three often compete because they all sound competent in different ways. Listen for the tradeoff before you open a full profile."
        />
        <ContentGrid minCardWidth="18rem">
          {supportingProfiles.map((profile) => (
            <TonePanel key={profile.slug} tone="proof" className="overflow-hidden p-0">
              <Image
                src={withBasePath(profile.imagePath)}
                alt={`${profile.name} archetype portrait`}
                width={720}
                height={720}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <p className="type-meta text-(--accent-strong)">{profile.familyTitle}</p>
                <h2 className="mt-3 type-concept text-(--ink-strong)">{profile.name}</h2>
                <p className="mt-3 type-body text-(--ink-body)">{profile.corePromise}</p>
                <p className="mt-4 type-caption text-(--ink-body)">
                  <strong>Gift:</strong> {profile.gift}
                </p>
                <p className="mt-2 type-caption text-(--ink-body)">
                  <strong>Trap:</strong> {profile.trap}
                </p>
                <p className="mt-2 type-caption text-(--signal)">
                  <strong>Five-second read:</strong> {profile.fiveSecondTest}
                </p>
                <Link href={`/archetypes/${profile.slug}`} className="action-secondary mt-5 inline-flex">
                  Open full profile
                </Link>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="What this changes"
        title="Leave with one choice, one reason, and one thing to avoid."
        tone="next"
      >
        <p>
          Go back to the vibe step ready to name the vibe, why it fits, and what would make
          it collapse.
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
import type { Metadata } from "next";
import Image from "next/image";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { SupportRouteShell } from "@/components/support-route-shell";
import { TonePanel } from "@/components/tone-panel";
import { designStyles } from "@/lib/archetype-atlas-content";
import { routeVisualPlans } from "@/lib/route-imagery";
import { browseRoomCards } from "@/lib/site-navigation";
import { withBasePath } from "@/lib/site-config";
import Link from "next/link";

const room = browseRoomCards.find((card) => card.id === "browse-design-lineages");

const translationChecks = [
  {
    title: "Type choice",
    summary: "The typography should change with the direction, not just the mood words around it.",
  },
  {
    title: "Page pace",
    summary: "The direction should change how fast the page reads: quick, tense, or slower and more editorial.",
  },
  {
    title: "Image match",
    summary: "The images should support the same vibe as the headline instead of starting a second mood.",
  },
] as const;

export const metadata: Metadata = {
  title: "Browse Design Lineages",
};

export default function BrowseDesignLineagesPage() {
  if (!room) {
    throw new Error("Missing browse-design-lineages room metadata.");
  }

  return (
    <SupportRouteShell
      eyebrow="Design directions"
      title="Compare visual directions after the vibe is clear."
      summary="Use this room once you know the vibe and need to decide how clean, loud, or tense the page should feel."
      status={room.status}
      tone="reading"
      useWhen={room.useWhen}
      whatChanges={room.whatChanges}
      feedsLabel={room.guidedStepLabel}
      returnHref={room.returnHref}
      returnLabel={room.returnLabel}
      relatedHref={room.relatedHref}
      relatedLabel={room.relatedLabel}
      actions={[
        { href: room.returnHref, label: room.returnLabel },
        { href: "/design-styles", label: "Open the older style archive", kind: "secondary" },
      ]}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.designLineages} />}
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Visual directions"
          title="Compare the full range from clear to rough."
          body="Look at these as one choice: which direction explains fast, which adds friction, and which would clash with the vibe you already picked?"
        />
        <ContentGrid minCardWidth="18rem">
          {designStyles.slice(0, 4).map((style) => (
            <TonePanel key={style.slug} tone="reading" className="overflow-hidden p-0">
              <Image
                src={withBasePath(style.imagePath)}
                alt={`${style.name} style board`}
                width={720}
                height={540}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="type-concept text-(--ink-strong)">{style.name}</h2>
                <p className="mt-3 type-body text-(--ink-body)">{style.stance}</p>
                <p className="mt-4 type-caption text-(--ink-body)">
                  <strong>Best for:</strong> {style.bestFor}
                </p>
                <p className="mt-2 type-caption text-(--signal)">
                  <strong>Watch out:</strong> {style.watchOut}
                </p>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Three quick checks"
          title="Use three checks instead of endless style browsing."
          body="If the typography, pace, and images all pull the same way, the choice is probably working."
        />
        <ContentGrid minCardWidth="16rem">
          {translationChecks.map((item) => (
            <TonePanel key={item.title} tone="proof" className="p-6">
              <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="What this changes"
        title="Go back to the style step ready to pick one direction."
        tone="next"
      >
        <p>
          Go back to the style step with one direction, two clear no&apos;s, and a stronger idea of how the
          first screen should handle typography, layout, and imagery.
        </p>
      </CalloutBand>

      <CalloutBand
        label="Course module"
        title="Module 1 teaches design lineage as part of a coherent identity system."
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
import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { SupportRouteShell } from "@/components/support-route-shell";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import { browseRoomCards } from "@/lib/site-navigation";

const room = browseRoomCards.find((card) => card.id === "browse-sources");

const sourceClusters = [
  {
    title: "Workshop research",
    tier: "Direct working source",
    provenance: "Research notes, workshop logic, and tested step ordering.",
    proves: "This is the working chain behind the message-to-publish flow used across the site.",
  },
  {
    title: "Hero and the Outlaw spine",
    tier: "Book-based source",
    provenance: "Book transcript briefs and archetype-family notes.",
    proves: "This is where the main archetype family structure comes from.",
  },
  {
    title: "Review and usability stack",
    tier: "Review summary",
    provenance: "Curatorial review, accessibility review, UX journey review, and the action plan that followed.",
    proves: "These reviews shaped the page budgets, layout checks, and clarity rules.",
  },
  {
    title: "Teaching-model package",
    tier: "Teaching model",
    provenance: "Planning documents and page outlines for the current 6-step guided path.",
    proves: "This is the planning layer behind the current page structure.",
  },
] as const;

export const metadata: Metadata = {
  title: "Browse Sources",
};

export default function BrowseSourcesPage() {
  if (!room) {
    throw new Error("Missing browse-sources room metadata.");
  }

  return (
    <SupportRouteShell
      eyebrow="Sources"
      title="Open sources when you need to check where an idea came from."
      summary="Use this room to separate direct source material, research summaries, and teaching models."
      status={room.status}
      tone="reflection"
      useWhen={room.useWhen}
      whatChanges={room.whatChanges}
      feedsLabel={room.guidedStepLabel}
      returnHref={room.returnHref}
      returnLabel={room.returnLabel}
      relatedHref={room.relatedHref}
      relatedLabel={room.relatedLabel}
      actions={[
        { href: room.returnHref, label: room.returnLabel },
        { href: room.relatedHref, label: room.relatedLabel, kind: "secondary" },
      ]}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.sources} />}
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Source clusters"
          title="Use one board to see what kind of source you are looking at."
          body="The board groups the research trail into a few visible clusters so you can tell direct source material from interpretation or teaching models."
        />
        <ContentGrid minCardWidth="18rem">
          {sourceClusters.map((cluster) => (
            <TonePanel key={cluster.title} tone="reading" className="p-6">
              <p className="type-meta text-(--accent-strong)">{cluster.tier}</p>
              <h2 className="mt-4 type-concept text-(--ink-strong)">{cluster.title}</h2>
              <p className="mt-3 type-caption text-(--ink-body)">
                <strong>Comes from:</strong> {cluster.provenance}
              </p>
              <p className="mt-3 type-body text-(--ink-body)">{cluster.proves}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Reading rule"
        title="Use sources to verify something, then go back and keep building."
        tone="next"
      >
        <p>
          Answer the source question, then go back to the step or room that needed it.
        </p>
      </CalloutBand>

      <CalloutBand
        label="Course module"
        title="Module 2 teaches source evaluation and reading within AI foundations."
        tone="synthesis"
      >
        <p>
          <a href="/modules/ai-foundations" className="underline">
            Open Module 2: AI Foundations →
          </a>
        </p>
      </CalloutBand>
    </SupportRouteShell>
  );
}
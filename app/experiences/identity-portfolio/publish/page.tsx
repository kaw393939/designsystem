import { ContentGrid } from "@/components/content-grid";
import { ConceptGrid, NextStepBlock } from "@/components/educational-primitives";
import { MediaBlock } from "@/components/media-block";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";

import { WeakTieOpportunityMap, deploymentKitItems } from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/publish/";

const publishingMoves = [
  {
    title: "Publishing note",
    summary:
      "Translate the page into one short post: what changed, who it helps, and the proof you want people to notice.",
    tag: "Write this",
  },
  {
    title: "Meetup opener",
    summary:
      "Bring one sentence, one image, and one proof story so the conversation starts with signal instead of vague self-description.",
    tag: "Say this",
  },
  {
    title: "Follow-up script",
    summary:
      "Send the page after the conversation, ask what landed first, and tighten the next version around the repeated questions.",
    tag: "Loop this",
  },
] as const;

export default function IdentityPortfolioPublishPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity publish step" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Step 5"
      title="Publish the page into weak ties and real opportunities"
      dek="Turn the site into repeated public exposure through posts, conversations, follow-ups, and small talks so weak ties can actually remember and reuse the signal."
      currentHref={currentHref}
      actions={[
        {
          label: "See examples",
          href: "/experiences/identity-portfolio/examples/",
          kind: "primary",
        },
        {
          label: "Open sources",
          href: "/experiences/identity-portfolio/sources/",
          kind: "secondary",
        },
      ]}
    >
      <SplitLayout
        ratio="feature"
        primary={
          <MediaBlock
            tone="proof"
            alignment="split"
            media={<WeakTieOpportunityMap />}
            caption="From page to opportunity"
            credit="Publishing model for the identity course"
            annotation={
              <p>
                The portfolio becomes a system only when the page leaves the browser and enters real conversations.
              </p>
            }
          />
        }
        secondary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">What counts as publish</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Publishing is the repeat loop, not the victory lap.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              Keep the same signal across the page, the post, the conversation, and the follow-up. That repetition is what turns a clean portfolio into a career signal weak ties can remember and reuse.
            </p>
          </TonePanel>
        }
      />

      <ConceptGrid
        title="Publishing toolkit to keep in circulation"
        summary="These are the assets and habits that turn one page into repeated public exposure."
        items={deploymentKitItems}
        columns={2}
      />

      <ContentGrid minCardWidth="18rem">
        {publishingMoves.map((item) => (
          <TonePanel key={item.title} tone="proof" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">{item.tag}</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
          </TonePanel>
        ))}
      </ContentGrid>

      <NextStepBlock
        title="Use the examples and sources once the page is live"
        summary="Examples help you compare your finished page against stronger moves. Sources help when you need the longer theory trail behind the choices."
        context="Publishing closes the core path. After this, go sideways into examples, labs, or sources only when a live question shows up."
        primaryAction={{
          label: "See examples",
          href: "/experiences/identity-portfolio/examples/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Open sources",
          href: "/experiences/identity-portfolio/sources/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}
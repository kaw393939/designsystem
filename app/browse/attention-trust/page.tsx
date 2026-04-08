import type { Metadata } from "next";
import Image from "next/image";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { SupportRouteShell } from "@/components/support-route-shell";
import { TonePanel } from "@/components/tone-panel";
import { persuasionMethods } from "@/lib/persuasion-content";
import { routeVisualPlans } from "@/lib/route-imagery";
import { withBasePath } from "@/lib/site-config";
import { browseRoomCards } from "@/lib/site-navigation";

const room = browseRoomCards.find((card) => card.id === "browse-attention-trust");

const pageProblems = [
  {
    title: "Big claim, no evidence nearby",
    summary: "The page says trustworthy, strategic, or rigorous, but the visitor has to scroll too far to verify it.",
  },
  {
    title: "The next step sounds like a different page",
    summary: "The headline sets one tone, then the button drops into generic startup copy and breaks the mood.",
  },
  {
    title: "Proof is there, but hard to read",
    summary: "The page has logos, screenshots, or quotes, but none of them clearly tell the visitor why they matter here.",
  },
] as const;

function takeSentences(text: string, count = 1) {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, count).join(" ");
}

export const metadata: Metadata = {
  title: "Browse Attention and Trust",
};

export default function BrowseAttentionTrustPage() {
  if (!room) {
    throw new Error("Missing browse-attention-trust room metadata.");
  }

  return (
    <SupportRouteShell
      eyebrow="Attention and trust"
      title="Open this room when the page sounds confident before it earns trust."
      summary="Check the claim, the proof, and the next move on the same screen."
      status={room.status}
      tone="proof"
      useWhen={room.useWhen}
      whatChanges={room.whatChanges}
      feedsLabel={room.guidedStepLabel}
      returnHref={room.returnHref}
      returnLabel={room.returnLabel}
      relatedHref={room.relatedHref}
      relatedLabel={room.relatedLabel}
      actions={[
        { href: room.returnHref, label: room.returnLabel },
        { href: "/persuasion", label: "Open the longer persuasion guide", kind: "secondary" },
      ]}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.attentionTrust} />}
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Trust moves"
          title="Start with the trust moves that fix weak first screens most often."
          body="Pick the move that fits the promise: authority, social proof, or reciprocity."
        />
        <ContentGrid minCardWidth="18rem">
          {persuasionMethods.slice(0, 3).map((method) => (
            <TonePanel key={method.slug} tone="reading" className="overflow-hidden p-0">
              <Image
                src={withBasePath(method.imagePath)}
                alt={`${method.name} persuasion illustration`}
                width={720}
                height={540}
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <p className="type-meta text-(--accent-strong)">{method.name}</p>
                <h2 className="mt-3 type-concept text-(--ink-strong)">{method.tagline}</h2>
                <p className="mt-3 type-body text-(--ink-body)">{takeSentences(method.definition)}</p>
                <p className="mt-4 type-caption text-(--ink-body)">
                  <strong>Usually fits:</strong> {method.strongArchetypes.map((arch) => arch.name).join(", ")}
                </p>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Common page problems"
          title="Name the page problem before you add more trust signals."
          body="Most fixes come down to proof placement, proof clarity, or a next move that matches the page."
        />
        <ContentGrid minCardWidth="16rem">
          {pageProblems.map((problem) => (
            <TonePanel key={problem.title} tone="warning" className="p-6">
              <h2 className="type-concept text-(--ink-strong)">{problem.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{problem.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Ethics boundary"
        title="Use persuasion to make the value clearer, not to pressure people."
        tone="warning"
      >
        <p>
          If a persuasion move still sounds fair when you explain it out loud to the visitor, it is
          probably helping honestly. If it depends on confusion, missing information, or pressure,
          it does not belong near the proof step.
        </p>
      </CalloutBand>
    </SupportRouteShell>
  );
}
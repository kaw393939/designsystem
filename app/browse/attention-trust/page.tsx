import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { PersuasionMoveCard } from "@/components/persuasion-move-card";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { SupportRouteShell } from "@/components/support-route-shell";
import { TonePanel } from "@/components/tone-panel";
import { persuasionMethods } from "@/lib/persuasion-content";
import { routeVisualPlans } from "@/lib/route-imagery";
import { browseRoomCards } from "@/lib/site-navigation";
import Link from "next/link";

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

const attentionTrustPipeline = [
  {
    stage: "Attention",
    visitor: "Is this for me? Can I tell in 2 seconds?",
    tactics: "Clear headline, strong visual signal, audience-specific language.",
  },
  {
    stage: "Interest",
    visitor: "This might be useful. Tell me more.",
    tactics: "Expand on the promise with specifics, not adjectives.",
  },
  {
    stage: "Trust",
    visitor: "Can I believe this? Who else thinks so?",
    tactics: "Proof near the claim: testimonials, data, credentials, examples.",
  },
  {
    stage: "Action",
    visitor: "I'm ready. What do I do next?",
    tactics: "One clear CTA in the same voice as the rest of the page.",
  },
  {
    stage: "Advocacy",
    visitor: "This was worth it. I'll share or return.",
    tactics: "Deliver on the promise so the next visit or recommendation is earned.",
  },
] as const;

/** Map each persuasion method to its most relevant tour step */
const methodTourStepMap: Record<string, { href: string; label: string }> = {
  reciprocity: { href: "/tour/build", label: "Where this matters → Build step" },
  commitment: { href: "/tour/signal", label: "Where this matters → Signal step" },
  "social-proof": { href: "/tour/proof", label: "Where this matters → Proof step" },
  authority: { href: "/tour/proof", label: "Where this matters → Proof step" },
  liking: { href: "/tour/style", label: "Where this matters → Style step" },
  scarcity: { href: "/tour/publish", label: "Where this matters → Publish step" },
};

function takeSentences(text: string, count = 2) {
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
      {/* Attention → Trust pipeline */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="The pipeline"
          title="Every page moves a visitor through five stages — or loses them."
          body="Check which stage is leaking before you pick a fix."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {attentionTrustPipeline.map((stage, i) => (
            <TonePanel key={stage.stage} tone="reading" className="p-5">
              <p className="type-meta text-(--accent-strong)">{i + 1}. {stage.stage}</p>
              <p className="mt-2 type-body italic text-(--ink-body)">&ldquo;{stage.visitor}&rdquo;</p>
              <p className="mt-2 type-caption text-(--ink-body)">{stage.tactics}</p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* All 6 Cialdini persuasion moves */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Six persuasion moves"
          title="Pick the move that fits the promise your page is making."
          body="Each move works best at a specific stage in the pipeline. The link below each card connects to the tour step where you practice it."
        />
        <ContentGrid minCardWidth="18rem">
          {persuasionMethods.map((method) => {
            const mapping = methodTourStepMap[method.slug];
            return (
              <PersuasionMoveCard
                key={method.slug}
                title={method.name}
                definition={takeSentences(method.definition)}
                application={method.whyItWorks}
                example={method.commonMistake}
                tourStepHref={mapping?.href ?? "/tour"}
                tourStepLabel={mapping?.label ?? "Tour overview"}
              />
            );
          })}
        </ContentGrid>
      </section>

      {/* Common page problems */}
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

      <CalloutBand
        label="Return to the tour"
        title="Practice these moves in the guided tour."
        tone="next"
      >
        <p>
          <Link href="/tour/proof" className="underline">
            Continue to the Proof step →
          </Link>{" "}
          — where you place evidence beside the claim it supports.
        </p>
      </CalloutBand>

      <CalloutBand
        label="Course module"
        title="Module 5 covers evidence types, trust mechanics, and portfolio-as-proof."
        tone="synthesis"
      >
        <p>
          <Link href="/modules/identity-and-proof" className="underline">
            Open Module 5: Identity and Proof →
          </Link>
        </p>
      </CalloutBand>
    </SupportRouteShell>
  );
}
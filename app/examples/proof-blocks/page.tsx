import type { Metadata } from "next";
import Image from "next/image";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { ObjectLabel } from "@/components/object-label";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { SupportRouteShell } from "@/components/support-route-shell";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import { withBasePath } from "@/lib/site-config";
import { exampleSurfaceCards } from "@/lib/site-navigation";
import { proofBlockFields, workbookPrinciples } from "@/lib/web-presence-site-content";

const example = exampleSurfaceCards.find((card) => card.id === "examples-proof-blocks");

const proofCompare = {
  weak: {
    label: "Before",
    title: "Claim-heavy proof block",
    summary: "Trusted by leading brands. Strategic systems. End-to-end execution.",
    notes: [
      "No named artifact or outcome sits near the claim.",
      "The call to action could belong to any generic agency page.",
      "The visitor learns attitude but not why they should believe it.",
    ],
  },
  strong: {
    label: "After",
    title: "Evidence-first proof block",
    summary:
      "Shipped a portfolio system that cut recruiter confusion by replacing three mixed signals with one evidence-led first screen.",
    notes: [
      "One artifact is named and attached to a visible outcome.",
      "The annotation explains why the object belongs here.",
      "The call to action continues the same signal instead of switching voice midstream.",
    ],
  },
};

export const metadata: Metadata = {
  title: "Examples Proof Blocks",
};

export default function ExamplesProofBlocksPage() {
  if (!example) {
    throw new Error("Missing examples-proof-blocks metadata.");
  }

  return (
    <SupportRouteShell
      eyebrow="Examples · Proof blocks"
      title="Study how a proof block changes when the page stops using adjectives as a substitute for evidence."
      summary="Use this page to see how compact evidence, a clear label, and a matching call to action can make the same page feel more believable."
      status={example.status}
      tone="proof"
      useWhen="You already know the page's promise, but the proof block still feels vague, ornamental, or too far away from the claim."
      whatChanges="Which piece of evidence sits near the claim, how it is labeled, and whether the call to action sounds like the same vibe the page already introduced."
      feedsLabel="Feeds the proof step"
      returnHref={example.returnHref}
      returnLabel={example.returnLabel}
      relatedHref="/examples/student-exemplars"
      relatedLabel="Next related example: Student exemplars"
      actions={[
        { href: example.returnHref, label: example.returnLabel },
        { href: "/examples/student-exemplars", label: "Open student exemplars", kind: "secondary" },
      ]}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.proofBlocks} />}
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Before and after"
          title="Treat the before-and-after board as the main proof object for this page."
          body="One compare view is enough: the evidence gets named, the proof moves closer to the claim, and the call to action stops sounding generic."
        />
        <ObjectLabel
          title="Annotated before-and-after proof board"
          objectType="Interpreted synthesis"
          provenance="Compressed from the proof step, workbook principles, and real proof patterns used across the site."
          whyHere="It makes proof quality visible at a glance instead of asking the visitor to infer it from vibes."
          proves="A stronger proof block is not larger. It is better labeled, better placed, and more tightly matched to the claim."
          evidenceTier="Interpreted synthesis"
        />
        <Image
          src={withBasePath(routeVisualPlans.proofBlocks.imagePath)}
          alt={routeVisualPlans.proofBlocks.imageAlt}
          width={1400}
          height={900}
          className="w-full rounded-(--radius-card) border border-(--border-neutral) object-cover"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {[proofCompare.weak, proofCompare.strong].map((block, index) => (
            <TonePanel key={block.label} tone={index === 0 ? "warning" : "proof"} className="p-6">
              <p className="type-meta text-(--accent-strong)">{block.label}</p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{block.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{block.summary}</p>
              <ul className="mt-4 space-y-2 pl-5 type-caption text-(--ink-body)">
                {block.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </TonePanel>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Supporting lists"
          title="Use the anatomy lists to keep the compare board honest."
          body="These lists make the proof board more precise instead of competing with it for attention."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Portfolio proof anatomy</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {proofBlockFields.portfolio.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Three rules to keep</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {workbookPrinciples.map((principle) => (
                <li key={principle.title}>{principle.summary}</li>
              ))}
            </ul>
          </TonePanel>
        </div>
      </section>

      <CalloutBand
        label="What this changes"
        title="Return to the proof step ready to name the evidence, the caption, and the call to action in one sentence."
        tone="next"
      >
        <p>
          Go back to the proof step ready to point to one piece of evidence, say why it belongs near the
          promise, and rewrite the call to action in the same voice.
        </p>
      </CalloutBand>
    </SupportRouteShell>
  );
}
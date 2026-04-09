import type { Metadata } from "next";
import Image from "next/image";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { GuidedStepShell } from "@/components/guided-step-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  buildTourRecordEntries,
  getGuidedTourStep,
  guidedTourRecordExamples,
} from "@/lib/site-navigation";
import { designStyles } from "@/lib/archetype-atlas-content";
import { withBasePath } from "@/lib/site-config";
import Link from "next/link";

const step = getGuidedTourStep("style");

const translationChecklist = [
  {
    title: "Type",
    summary: "The headline font should carry the vibe while the paragraph text stays easy to trust and scan.",
  },
  {
    title: "Hierarchy",
    summary: "The first screen should prove what matters before it starts decorating.",
  },
  {
    title: "Imagery",
    summary: "Image choices should support the same promise as the headline instead of introducing a second mood.",
  },
  {
    title: "What to avoid",
    summary: "Name the directions that would be wrong so the build step has real constraints instead of vague preferences.",
  },
];

export const metadata: Metadata = {
  title: step.publicLabel,
};

export default function TourStylePage() {
  return (
    <GuidedStepShell
      eyebrow="Style step"
      title="Choose a look that matches the vibe instead of fighting it."
      summary="Style is how the message shows up on the page. Pick one direction, name what it changes, and be clear about what would feel wrong."
      status="Required in tour"
      prerequisite={step.prerequisite}
      output={step.output}
      currentStepId="style"
      recordEntries={buildTourRecordEntries(guidedTourRecordExamples.style, step.recordFields)}
      actions={[
        {
          href: "/tour/proof",
          label: "Next: add proof",
        },
        {
          href: "/browse/design-lineages",
          label: "Compare design directions",
          kind: "secondary",
        },
      ]}
      misconception={
        <p>
          Do not choose a style just because it looks cool on its own. It only works if it helps
          the same vibe survive the first glance and the first paragraph.
        </p>
      }
      formativeCheck={
        <p>
          Name the chosen direction and two directions that would be wrong for this page. If you
          cannot rule out the wrong ones, the choice is still too fuzzy.
        </p>
      }
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Visual directions"
          title="Choose one direction before the page starts sending mixed messages."
          body="These directions change how the message lands. They should sharpen the read, not replace the choice you already made in the last step."
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
          eyebrow="Translation checklist"
          title="A real style choice should change four things right away."
          body="A real choice changes the type, layout, images, and what you now rule out."
        />
        <ContentGrid minCardWidth="16rem">
          {translationChecklist.map((item) => (
            <TonePanel key={item.title} tone="proof" className="p-6">
              <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Why this matters"
        title="This choice sets up the next two steps."
        tone="next"
      >
        <p>
          Once the direction is clear, proof placement, image handling, and page pacing stop being
          guesses.
        </p>
      </CalloutBand>

      <TonePanel tone="synthesis" className="p-6">
        <p className="type-meta text-(--accent-strong)">Go deeper</p>
        <p className="mt-2 type-body text-(--ink-body)">
          Module 1: Web Presence Framework teaches visual direction as part
          of a coherent identity system across all six tour steps.
        </p>
        <Link
          href="/modules/web-presence-framework"
          className="action-secondary mt-4 inline-block"
        >
          Open Module 1 →
        </Link>
      </TonePanel>
    </GuidedStepShell>
  );
}
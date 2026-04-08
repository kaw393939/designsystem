import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { EditorialBand } from "@/components/editorial-band";
import {
  StudentPortraitBadge,
  StudioSceneVisual,
} from "@/components/human-signal-visuals";
import { LessonShell } from "@/components/lesson-shell";
import { MediaBlock } from "@/components/media-block";
import { PageShell } from "@/components/page-shell";
import { ProseBlock } from "@/components/prose-block";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { StudentFastPath } from "@/components/student-fast-path";
import { lessonNavItems } from "@/lib/layout-primitives-content";

const lessonReaders = [
  {
    name: "Jules",
    label: "Needs the lesson to feel paced, not dense",
    palette: "sage" as const,
  },
  {
    name: "Priya",
    label: "Needs proof blocks that support, not interrupt, the read",
    palette: "rose" as const,
  },
];

const lessonFastPathSteps = [
  {
    title: "Get oriented",
    summary:
      "Start with the opener and local navigation so you know the lesson arc before you read every paragraph.",
  },
  {
    title: "Watch how proof supports the read",
    summary:
      "Use the comparison and worked-example sections to see how support blocks help without interrupting the main explanation.",
  },
  {
    title: "End with a next move",
    summary:
      "A good lesson should close with reflection and a concrete next route, not just stop after the content dump.",
  },
] as const;

export default function LessonExamplePage() {
  return (
    <PageShell>
      <LessonShell localNav={lessonNavItems} progress="Lesson 2 of 6">
        <EditorialBand tone="reading" paddingScale="hero">
          <p className="type-meta text-(--accent-strong)">
            Lesson example
          </p>
          <h1 className="type-hero measure-hero mt-4 text-(--ink-strong)">
            A long lesson can stay readable and still feel alive.
          </h1>
          <ProseBlock lead className="mt-6">
            <p>
              Use this when the page has real explanation to carry. Keep the pace clear: orient,
              support, then end with a next move.
            </p>
          </ProseBlock>
        </EditorialBand>

        <CalloutBand
          label="Structural example"
          title="This page shows a reusable lesson layout, not the main proof pages."
          tone="warning"
        >
          <p>
            For the strongest proof examples, return to <Link href="/examples" className="underline hover:no-underline">/examples</Link> and open the proof walkthroughs first.
          </p>
        </CalloutBand>

        <StudentFastPath
          title="Use this page when you need a lesson that feels paced instead of overwhelming."
          summary="Get oriented first, watch how proof supports the read, then end on a real next move so the lesson keeps its momentum."
          steps={lessonFastPathSteps}
          primaryAction={{
            label: "Open reading-map example",
            href: "/examples/reading-map",
          }}
          secondaryAction={{
            label: "Back to module example",
            href: "/examples/module",
            kind: "secondary",
          }}
        />

        <section id="orientation" className="space-y-6">
          <SectionHeading
            eyebrow="Orientation"
            title="The lesson layout keeps orientation and reading width in the same frame."
            body="You should know where you are, how far you have left, and what section you are in without the navigation taking over."
          />
          <ProseBlock>
            <p>
              The line length is set intentionally, the rhythm stays steady, and the
              side navigation sits outside the main text so it helps instead of
              interrupting. On smaller screens, it drops inline instead of
              acting like sticky furniture.
            </p>
          </ProseBlock>
          <div className="grid gap-4 sm:grid-cols-2">
            {lessonReaders.map((reader) => (
              <StudentPortraitBadge
                key={reader.name}
                name={reader.name}
                label={reader.label}
                palette={reader.palette}
              />
            ))}
          </div>
        </section>

        <section id="comparison" className="space-y-6">
          <SectionHeading
            eyebrow="Comparison"
            title="Side-by-side layouts let explanation and support work together without fighting."
            body="One side can carry the main idea while the other gives proof, caution, or a quick example."
          />
          <SplitLayout
            ratio="feature"
            primary={
              <ProseBlock>
                <p>
                  Use the main side for the explanation people actually came
                  for. Let the side panel hold the proof, warning, or quick
                  shortcut.
                </p>
              </ProseBlock>
            }
            secondary={
              <CalloutBand
                label="Proof"
                title="The support side can stay short and still earn its place."
                tone="proof"
              >
                <p>
                  This side can hold evidence, a quick example, or nothing at
                  all. The layout keeps the relationship clear without forcing
                  fake symmetry.
                </p>
              </CalloutBand>
            }
          />
        </section>

        <section id="worked-example" className="space-y-6">
          <SectionHeading
            eyebrow="Worked example"
            title="Media and annotation move as one unit."
            body="Sometimes you need a visual bridge between explanation and action. Keep the caption and note attached so the point lands fast."
          />
          <MediaBlock
            alignment="split"
            tone="proof"
            media={
              <StudioSceneVisual
                ariaLabel="Lesson scene showing a person reading a structured lesson with proof and reflection cues"
                badges={["Context", "Proof", "Reflect"]}
                palette="sage"
              />
            }
            caption="Lesson support scene"
            credit="Lesson support sketch"
            annotation={
              <p>
                Keep the figure, caption, and note together so the support
                image feels intentional instead of floating around like filler.
              </p>
            }
          />
        </section>

        <section id="reflection" className="space-y-6">
          <SectionHeading
            eyebrow="Reflection"
            title="End with reflection and a real next move."
            body="The layout should carry the arc, not swallow it."
          />
          <CalloutBand
            label="Reflection"
            title="Ask what structure is solving for you now."
            tone="reflection"
          >
            <p>
              Which parts of this page are now handled by the layout,
              and which parts still need better lesson content?
            </p>
            <Link
              href="/examples/reading-map"
              className="action-secondary mt-5 w-fit"
            >
              Open reading-map example
            </Link>
          </CalloutBand>
        </section>
      </LessonShell>
    </PageShell>
  );
}

import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import {
  ProgressPathVisual,
  StudentPortraitBadge,
} from "@/components/human-signal-visuals";
import { MediaBlock } from "@/components/media-block";
import { PageShell } from "@/components/page-shell";
import { ProseBlock } from "@/components/prose-block";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { StudentFastPath } from "@/components/student-fast-path";
import { TonePanel } from "@/components/tone-panel";
import { moduleCards } from "@/lib/layout-primitives-content";

const moduleReaders = [
  {
    name: "Ava",
    label: "Needs the module promise in the first screen",
    palette: "sage" as const,
  },
  {
    name: "Rui",
    label: "Needs to know where to begin without hunting",
    palette: "sky" as const,
  },
];

const moduleFastPathSteps = [
  {
    title: "Read the promise first",
    summary:
      "The first screen should tell you what this module is about and why the sequence matters before you scan any cards.",
  },
  {
    title: "Check the route through the module",
    summary:
      "Use the overview cards to see how the lessons fit together and where your momentum should actually start.",
  },
  {
    title: "Keep moving",
    summary:
      "Treat this page like a module opener, then go straight into the lesson example instead of lingering on the overview forever.",
  },
] as const;

export default function ModuleExamplePage() {
  return (
    <PageShell>
      <EditorialBand tone="synthesis" paddingScale="hero">
        <p className="type-meta text-(--accent-strong)">
          Module overview example
        </p>
        <h1 className="type-hero measure-hero mt-4 text-(--ink-strong)">
          Use a module opener when the whole route needs to make sense fast.
        </h1>
        <ProseBlock lead className="mt-6">
          <p>
            This page is for the moment when someone lands cold and needs the
            big picture without reading a whole lesson first. The opener should
            make the promise, the order, and the first click obvious.
          </p>
        </ProseBlock>
      </EditorialBand>

      <StudentFastPath
        title="Use this page when you need a module opener that makes sense in one screen."
        summary="Read the promise, check the route through the module, then continue into the lesson so the overview stays directional instead of decorative."
        steps={moduleFastPathSteps}
        primaryAction={{
          label: "Open lesson example",
          href: "/examples/lesson",
        }}
        secondaryAction={{
          label: "Back to layouts",
          href: "/layouts",
          kind: "secondary",
        }}
      />

      <SplitLayout
        ratio="feature"
        primary={
          <div className="space-y-6">
            <ProseBlock>
              <p>
                Module pages need more horizontal room because they are holding
                multiple sub-parts at once. The layout should make the sequence
                feel easy, not wide just for the sake of being wide.
              </p>
              <p>
                When this page works, you can tell what the module is about,
                how the parts connect, and where to start without hunting.
              </p>
            </ProseBlock>
            <div className="grid gap-4 sm:grid-cols-2">
              {moduleReaders.map((reader) => (
                <StudentPortraitBadge
                  key={reader.name}
                  name={reader.name}
                  label={reader.label}
                  palette={reader.palette}
                />
              ))}
            </div>
          </div>
        }
        secondary={
          <CalloutBand
            label="Success criteria"
            title="The page should answer three things fast."
            tone="proof"
          >
            <ul className="space-y-2 pl-5">
              <li>What is this module trying to help me understand?</li>
              <li>How do the lessons fit together?</li>
              <li>What should I do first?</li>
            </ul>
          </CalloutBand>
        }
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Module cards"
          title="Overview cards can stay readable even when the page has a lot to hold."
          body="The grid does the structure, but the cards still need to feel like a route through the module rather than a pile of summaries."
        />
        <ContentGrid minCardWidth="16rem">
          {moduleCards.map((card) => (
            <TonePanel
              key={card.title}
              tone="reading"
              className="card-shell p-6"
            >
              <h2 className="type-concept text-(--ink-strong)">
                {card.title}
              </h2>
              <p className="mt-3 type-body text-(--ink-body)">
                {card.summary}
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <MediaBlock
        alignment="wide"
        tone="proof"
        media={
          <ProgressPathVisual
            ariaLabel="Module overview path from context to next step"
            steps={["Context", "Sequence", "Proof", "Start"]}
            palette="sage"
          />
        }
        caption="Module movement map"
        credit="Overview movement sketch"
        annotation="Use the wide media to carry sequence and momentum instead of leaving a giant proof rectangle in the middle of the page."
      />

      <CalloutBand
        label="Next step"
        title="Continue into the lesson shell example."
        tone="next"
      >
        <p>
          Use the overview to get your bearings, then move into the lesson
          before the opener turns into a parking lot.
        </p>
        <Link href="/examples/lesson" className="action-secondary mt-5 w-fit">
          Open lesson example
        </Link>
      </CalloutBand>
    </PageShell>
  );
}

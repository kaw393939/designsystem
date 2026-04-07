import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import {
  ProgressPathVisual,
  StudentPortraitBadge,
} from "@/components/human-signal-visuals";
import { PageShell } from "@/components/page-shell";
import { ProseBlock } from "@/components/prose-block";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { StudentFastPath } from "@/components/student-fast-path";
import { TonePanel } from "@/components/tone-panel";
import {
  automationNotes,
  operatingLoop,
  qualityBars,
  readingOrder,
} from "@/lib/site-content";

const processReaders = [
  {
    name: "Maya",
    label: "Needs to know what parts of the site are locked in vs. still changing",
    palette: "sage" as const,
  },
  {
    name: "Eli",
    label: "Needs to know which files actually define the final product",
    palette: "sky" as const,
  },
  {
    name: "Priya",
    label: "Needs proof that the quality checks match the live site",
    palette: "amber" as const,
  },
];

const processFastPathSteps = [
  {
    title: "Read the build loop",
    summary:
      "See how work moves from raw files to a published page someone else can trust.",
  },
  {
    title: "Check the status boundary",
    summary:
      "Open the status page so you can tell verified work from planned work before you reference either one.",
  },
  {
    title: "Look at the live pages",
    summary:
      "Jump into the recipe and homepage routes to see the real baseline this process protects.",
  },
] as const;

export default function ProcessPage() {
  return (
    <PageShell>
      <EditorialBand tone="synthesis" paddingScale="hero">
        <SectionHeading
          eyebrow="Process"
          title="How work goes from raw content to a site you can trust."
          body="Use this page when you need to know what to read, what to update, and what counts as done."
          headingLevel={1}
        />
        <ProseBlock className="mt-6">
          <p>
            This is not about bureaucracy. It is about knowing where the
            source of truth lives, how changes get reviewed, and what to
            check before you believe something is ready to ship.
          </p>
        </ProseBlock>
      </EditorialBand>

      <StudentFastPath
          title="Use this page when you need to know what is real, reviewed, and safe to build on."
          summary="Read the build loop, check which items are done on the status page, then look at the live pages so process becomes concrete."
        steps={processFastPathSteps}
        primaryAction={{
          label: "Review status",
          href: "/status",
        }}
        secondaryAction={{
          label: "Open live routes",
          href: "/recipes",
          kind: "secondary",
        }}
      />

      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">
              Why the process page matters
            </p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              A good process makes the work easier to trust — nothing more.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              This page keeps it practical: where the source of truth lives,
              how changes get reviewed, and what to check before shipping.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {processReaders.map((reader) => (
                <StudentPortraitBadge
                  key={reader.name}
                  name={reader.name}
                  label={reader.label}
                  palette={reader.palette}
                />
              ))}
            </div>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="proof" className="p-5">
            <ProgressPathVisual
              ariaLabel="Process path from source of truth to shipped proof"
              steps={["Read", "Build", "Review", "Ship"]}
              palette="sky"
            />
          </TonePanel>
        }
      />

      <SplitLayout
        ratio="feature"
        primary={
          <CalloutBand
            label="Build Loop"
            title="Work is only done when it has been reviewed and verified."
            tone="neutral"
          >
            <ol className="space-y-3 pl-5">
              {operatingLoop.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </CalloutBand>
        }
        secondary={
          <CalloutBand
            label="Reading Order"
            title="Start with these files, in this order."
            tone="reflection"
          >
            <ol className="space-y-3 pl-5">
              {readingOrder.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </CalloutBand>
        }
      />

      <ContentGrid minCardWidth="18rem">
        <CalloutBand
          label="Quality Checks"
          title="The exported, public-facing site is what gets tested."
          tone="proof"
        >
          <ul className="space-y-3 pl-5">
            {qualityBars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>

        <CalloutBand
          label="Automated Testing"
          title="These same quality checks also run automatically in CI."
          tone="next"
        >
          <ul className="space-y-3 pl-5">
            {automationNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>

        <TonePanel tone="reading" className="p-6">
          <p className="type-meta text-(--signal)">
            Where to check the live baseline
          </p>
          <h2 className="mt-2 type-concept text-(--ink-strong)">
            Check the shipped version, not just the plan.
          </h2>
          <p className="mt-3 type-body text-(--ink-body)">
            Review status first, then inspect the recipes guide and selected
            build output. That is where the current baseline stops being a
            promise and becomes something you can actually check.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/status" className="action-primary">
              Review status
            </Link>
            <Link href="/recipes" className="action-secondary">
              Open recipes guide
            </Link>
          </div>
        </TonePanel>
      </ContentGrid>
    </PageShell>
  );
}

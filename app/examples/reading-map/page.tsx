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
import { readingMapClusters } from "@/lib/layout-primitives-content";

const readingMapReaders = [
  {
    name: "Kira",
    label: "Needs a first route through the sources",
    palette: "sky" as const,
  },
  {
    name: "Mateo",
    label: "Needs context before a long list of references",
    palette: "amber" as const,
  },
];

const readingMapFastPathSteps = [
  {
    title: "Start with the suggested order",
    summary:
      "A reading map works when it gives you a first route through the material instead of dumping every source at once.",
  },
  {
    title: "Choose one cluster",
    summary:
      "Use the cluster cards to decide which lane you need right now rather than trying to process the whole library in one sitting.",
  },
  {
    title: "Return with purpose",
    summary:
      "The map should send you back to the course or guide pages with sharper context, not leave you wandering in references forever.",
  },
] as const;

export default function ReadingMapExamplePage() {
  return (
    <PageShell>
      <EditorialBand tone="next" paddingScale="hero">
        <p className="type-meta text-(--accent-strong)">
          Reading-map example
        </p>
        <h1 className="type-hero measure-hero mt-4 text-(--ink-strong)">
          A resource map should feel like a way in, not homework dumped on a page.
        </h1>
        <ProseBlock lead className="mt-6">
          <p>
            Use this when you need to guide someone into the material without
            turning the page into an academic wall. Start with one route, one
            reason, and one return path.
          </p>
        </ProseBlock>
      </EditorialBand>

      <CalloutBand
        label="Structural example"
        title="This page shows a resource-map layout, not the main proof pages."
        tone="warning"
      >
        <p>
          For the strongest proof examples, return to <Link href="/examples" className="underline hover:no-underline">/examples</Link> and open the proof walkthroughs first.
        </p>
      </CalloutBand>

      <StudentFastPath
        title="Use this page when you need a guided way into the reading instead of a giant source dump."
        summary="Start with the suggested order, pick one cluster, then return to the course or guide pages with a clearer sense of what matters."
        steps={readingMapFastPathSteps}
        primaryAction={{
          label: "Back to layout guide",
          href: "/layouts",
        }}
        secondaryAction={{
          label: "Review process",
          href: "/process",
          kind: "secondary",
        }}
      />

      <SplitLayout
        ratio="feature"
        primary={
          <div className="space-y-6">
            <ProseBlock>
              <p>
                A reading map clusters sources, suggests order, and keeps a strong next move
                without pretending every link matters equally.
              </p>
              <p>
                The page should feel inviting, not like a test.
              </p>
            </ProseBlock>
            <div className="grid gap-4 sm:grid-cols-2">
              {readingMapReaders.map((reader) => (
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
            label="Suggested order"
            title="Guide the first pass, then deepen."
            tone="reflection"
          >
            <ol className="space-y-2 pl-5">
              <li>Read the overview document first.</li>
              <li>Check the current review notes.</li>
              <li>Only then move into the next planning brief.</li>
            </ol>
          </CalloutBand>
        }
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Source clusters"
          title="Resource clusters can stay readable without turning into link soup."
          body="Sparse and dense clusters both collapse cleanly on small screens, but the clusters still need to feel like routes through the material."
        />
        <ContentGrid minCardWidth="17rem">
          {readingMapClusters.map((cluster) => (
            <TonePanel
              key={cluster.title}
              tone="reading"
              className="card-shell p-6"
            >
              <h2 className="type-concept text-(--ink-strong)">
                {cluster.title}
              </h2>
              <p className="mt-3 type-body text-(--ink-body)">
                {cluster.summary}
              </p>
              <ul className="mt-4 space-y-2 pl-5 type-caption text-(--ink-body)">
                {cluster.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <MediaBlock
        alignment="wide"
        tone="reflection"
        media={
          <ProgressPathVisual
            ariaLabel="Reading map path from first source to return path"
            steps={["Start", "Cluster", "Compare", "Return"]}
            palette="amber"
          />
        }
        caption="Reading-map movement visual"
        credit="Source-path sketch"
        annotation="Use the wide visual to suggest movement and return."
      />

      <CalloutBand
        label="Next step"
        title="Take the context back to a working page."
        tone="next"
      >
        <p>
          Use the map to sharpen what you need, then go back to the guide or
          course instead of circling the references forever.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/layouts" className="action-primary">
            Back to layout guide
          </Link>
          <Link href="/process" className="action-secondary">
            Review process
          </Link>
        </div>
      </CalloutBand>
    </PageShell>
  );
}

import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import {
  ProgressPathVisual,
  StudentPortraitBadge,
  StudioSceneVisual,
} from "@/components/human-signal-visuals";
import { LocalNav } from "@/components/local-nav";
import { MediaBlock } from "@/components/media-block";
import { PageShell } from "@/components/page-shell";
import { ProseBlock } from "@/components/prose-block";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { StudentFastPath } from "@/components/student-fast-path";
import { TonePanel } from "@/components/tone-panel";
import {
  examplePageCards,
  layoutPrimitiveNotes,
} from "@/lib/layout-primitives-content";

const layoutGuideNav = [
  {
    id: "frame-rules",
    label: "Frame rules",
    description: "How shell width and prose width coexist.",
  },
  {
    id: "primitive-map",
    label: "Primitive map",
    description: "What each reusable primitive is for.",
  },
  {
    id: "example-routes",
    label: "Example routes",
    description: "Which routes prove the primitives in practice.",
  },
  {
    id: "media-proof",
    label: "Media proof",
    description: "How media, annotation, and callouts fit together.",
  },
];

const layoutWitnesses = [
  {
    name: "Leah",
    label: "Needs a module page that scans clearly in 20 seconds",
    palette: "sage" as const,
  },
  {
    name: "Andre",
    label: "Needs side guidance without the page feeling crowded",
    palette: "sky" as const,
  },
  {
    name: "Tess",
    label: "Needs media and notes to feel like one argument",
    palette: "amber" as const,
  },
];

const layoutFastPathSteps = [
  {
    title: "Lock the frame",
    summary:
      "Start with the shell and prose rules so you know what should stay stable before you touch any page-specific content.",
  },
  {
    title: "Match the primitive",
    summary:
      "Use the primitive map to choose the right band, split, grid, or local nav instead of improvising layout from scratch.",
  },
  {
    title: "Copy a working route",
    summary:
      "Open one of the example pages and borrow the structure that already handles the teaching job cleanly.",
  },
] as const;

export default function LayoutsPage() {
  return (
    <PageShell>
      <EditorialBand tone="synthesis" paddingScale="hero">
        <p className="type-meta text-(--accent-strong)">
          Layout guide
        </p>
        <h1 className="type-hero measure-hero mt-4 text-(--ink-strong)">
          Use the layout system when the content is fine but the page still feels off.
        </h1>
        <ProseBlock lead className="mt-6">
          <p>
            This page is here for the moment when a page feels messy, flat, or
            weirdly crowded even though the content is basically right. Pick
            the right layout block, then let the structure do its job.
          </p>
        </ProseBlock>
      </EditorialBand>

      <StudentFastPath
        title="Use this page when something feels messy even though the content is fine."
        summary="Start with frame rules, then match the right layout block, then open a working example and borrow the structure that already scans well."
        steps={layoutFastPathSteps}
        primaryAction={{
          label: "Open module example",
          href: "/examples/module",
        }}
        secondaryAction={{
          label: "Browse recipe routes",
          href: "/recipes",
          kind: "secondary",
        }}
      />

      <SplitLayout
        ratio="feature"
        stackAt="xl"
        primary={
          <div className="space-y-12">
            <section id="frame-rules" className="space-y-6">
              <SectionHeading
                eyebrow="Frame Rules"
                title="Wide bands and reading-width blocks need to cooperate, not compete."
                body="Keep the outer frame stable and the reading calm so people know where to look first and where to slow down."
              />
              <TonePanel tone="neutral" className="p-6">
                <p className="type-meta text-(--accent-strong)">
                  What good structure feels like on first read
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {layoutWitnesses.map((witness) => (
                    <StudentPortraitBadge
                      key={witness.name}
                      name={witness.name}
                      label={witness.label}
                      palette={witness.palette}
                    />
                  ))}
                </div>
              </TonePanel>
              <SplitLayout
                ratio="feature"
                primary={
                  <CalloutBand
                    label="PageShell"
                    title="The frame owns the outside rhythm."
                    tone="reading"
                  >
                    Top-level pages should not freestyle their own outer width,
                    background, or shell padding. Keep that stable.
                  </CalloutBand>
                }
                secondary={
                  <CalloutBand
                    label="ProseBlock"
                    title="Long reads stay bounded without shrinking the whole page."
                    tone="proof"
                  >
                    Let the long explanation sit in reading width while bands,
                    grids, and media use the wider frame around it.
                  </CalloutBand>
                }
              />
            </section>

            <section id="primitive-map" className="space-y-6">
              <SectionHeading
                eyebrow="Primitive Map"
                title="Each primitive should solve one clear page problem."
                body="Use shells for the outside frame, prose and bands for pace, grids and splits for structure, and local nav only when the page actually needs help staying readable."
              />
              <ContentGrid minCardWidth="17rem">
                {layoutPrimitiveNotes.map((note) => (
                  <TonePanel
                    key={note.name}
                    tone={note.tone}
                    className="card-shell p-6"
                  >
                    <p className="type-meta text-(--accent-strong)">
                      Layout primitive
                    </p>
                    <h2 className="mt-3 type-concept text-(--ink-strong)">
                      {note.name}
                    </h2>
                    <p className="mt-3 type-body text-(--ink-body)">
                      {note.purpose}
                    </p>
                    <p className="mt-4 type-caption text-(--ink-muted)">
                      {note.proof}
                    </p>
                  </TonePanel>
                ))}
              </ContentGrid>
            </section>

            <section id="example-routes" className="space-y-6">
              <SectionHeading
                eyebrow="Example Routes"
                title="Three page types, one layout system."
                body="The goal is not a component gallery. The goal is to show that the same shell layer can support different teaching jobs without page-specific hacks."
              />
              <ContentGrid minCardWidth="18rem">
                {examplePageCards.map((page) => (
                  <TonePanel
                    key={page.title}
                    tone={page.tone}
                    className="card-shell p-6"
                  >
                    <h2 className="type-concept text-(--ink-strong)">
                      {page.title}
                    </h2>
                    <p className="mt-3 type-body text-(--ink-body)">
                      {page.summary}
                    </p>
                    <Link
                      href={page.href}
                      className="action-secondary mt-5 w-fit"
                    >
                      Open route
                    </Link>
                  </TonePanel>
                ))}
              </ContentGrid>
            </section>

            <section id="media-proof" className="space-y-6">
              <SectionHeading
                eyebrow="Media pairing"
                title="Image, caption, and note should read as one thought."
                body="Keep the visual, caption, and annotation together so the support lands fast instead of feeling stitched on after the fact."
              />
              <MediaBlock
                alignment="split"
                tone="proof"
                media={
                  <StudioSceneVisual
                    ariaLabel="Layout scene showing a shell, support card, and guided next step"
                    badges={["Frame", "Proof", "Move"]}
                    palette="sky"
                  />
                }
                caption="Structural scene for layout guidance"
                credit="Layout support sketch"
                annotation={
                  <p>
                    The point is not decoration. The point is showing that a
                    real visual, a real caption, and a real note can live
                    together without one-off wrappers.
                  </p>
                }
              />
              <TonePanel tone="proof" className="p-5">
                <ProgressPathVisual
                  ariaLabel="Layout path from orientation to action"
                  steps={["Orient", "Explain", "Show", "Act"]}
                  palette="sage"
                />
              </TonePanel>
            </section>
          </div>
        }
        secondary={
          <LocalNav
            items={layoutGuideNav}
            title="Layout guide"
            progress="Sprint 2"
          />
        }
      />
    </PageShell>
  );
}

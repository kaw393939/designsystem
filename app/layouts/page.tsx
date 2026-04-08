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
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
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
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Recommended support" />
            <p className="mt-4 type-meta text-(--accent-strong)">Support route · Layouts</p>
            <h1 className="type-hero measure-hero mt-4 text-(--ink-strong)">
              Use the layout guide when the content is fine but the page still feels messy.
            </h1>
            <ProseBlock lead className="mt-6">
              <p>
                Use this when the page idea is clear but the layout still feels flat, crowded, or
                hard to scan.
              </p>
            </ProseBlock>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tour/build" className="action-primary">
                Return to the build step
              </Link>
              <Link href="/recipes" className="action-secondary">
                Open recipes
              </Link>
            </div>
          </div>
          <RouteContextPanel
            tone="reading"
            eyebrow="Primary use"
            title="Use layout help to clean up the page, then go back to the main path."
            sections={[
              {
                label: "Open this when",
                content:
                  "The content and page job are mostly right, but width, spacing, hierarchy, or support placement are keeping the page from reading cleanly.",
              },
              {
                label: "This helps with",
                content:
                  "Shell decisions, layout blocks, local navigation, and how media and notes sit together on the same page.",
              },
              {
                label: "Best next move",
                content:
                  "Borrow the right layout pattern, then go back to build and apply the fix there.",
              },
            ]}
          />
        </div>
      </EditorialBand>

      <StudentFastPath
        label="Quick support path"
        title="Need to fix a page that feels messy, crowded, or hard to scan?"
        summary="Start with the frame rules, match the right layout block, then open a working example and borrow the structure that already scans well."
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
                title="Keep the frame steady so the page knows where to breathe."
                body="Keep the outer frame stable and the reading area calm so people know where to look first and where to slow down."
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
                title="Each layout block should solve one clear page problem."
                body="Use shells for the outer frame, prose and bands for pace, grids and splits for structure, and local nav only when the page really needs it."
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
                body="These routes show the same shell layer handling different teaching jobs without page-specific hacks."
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
                    A real visual, caption, and note should be able to live together without
                    one-off wrappers.
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
            progress="Recommended support"
          />
        }
      />
    </PageShell>
  );
}

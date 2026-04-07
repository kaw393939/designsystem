import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { LessonShell } from "@/components/lesson-shell";
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
import { UnitRenderer } from "@/components/educational-primitives";
import {
  contractBoundaryNotes,
  primitiveGuideNavItems,
  primitiveMapNotes,
} from "@/lib/educational-primitives-content";
import {
  getExperienceHomepageHref,
  getSelectedSiteBuildContext,
} from "@/lib/site-release";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

const primitiveReaders = [
  {
    name: "Teacher",
    label: "Needs blocks that keep the lesson on track",
    palette: "sage" as const,
  },
  {
    name: "Builder",
    label: "Needs a system that stays predictable when things change",
    palette: "sky" as const,
  },
  {
    name: "Student",
    label: "Needs the page to feel guided, not assembled from random parts",
    palette: "amber" as const,
  },
];

const primitiveFastPathSteps = [
  {
    title: "Learn the content vs. display split",
    summary:
      "See what gets stored as plain content and what the page figures out how to display on its own.",
  },
  {
    title: "Read what each block does",
    summary:
      "Use the block map to understand the specific job each teaching block handles for you as a learner.",
  },
  {
    title: "Look at real examples",
    summary:
      "Check out the rendered concept, assignment, and reading-map lessons so you can see — and feel — how it all comes together.",
  },
] as const;

export default function PrimitivesPage() {
  const context = getSelectedSiteBuildContext();
  const homepageHref = getExperienceHomepageHref(context);

  if (!context.routes.some((route) => route.id === "primitives")) {
    return (
      <PageShell>
        <CalloutBand
          label="Not available yet"
          title="This page is not active in the current version of the site."
          tone="next"
          titleAsPageHeading
        >
          <p>
            The teaching-blocks guide is coming soon. In the meantime, check
            out the recipes guide for ready-to-use page patterns, or head to
            the course homepage.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={homepageHref} className="action-primary">
              Open {context.experience.title}
            </Link>
            <Link href="/recipes" className="action-secondary">
              Open recipes guide
            </Link>
          </div>
        </CalloutBand>
      </PageShell>
    );
  }

  const conceptUnit = getSelectedReleaseUnit("concept-feedback-loops");
  const assignmentUnit = getSelectedReleaseUnit("assignment-field-observation");
  const readingMapUnit = getSelectedReleaseUnit("reading-map-design-ethics");

  return (
    <PageShell maxWidthClassName="max-w-7xl">
      <LessonShell localNav={primitiveGuideNavItems} progress="Building blocks">
        <EditorialBand tone="emphasis" paddingScale="hero">
          <p className="type-meta">Teaching blocks</p>
          <h1 className="type-hero measure-hero mt-4 text-balance">
            The reusable building blocks that make every lesson page feel
            guided instead of thrown together.
          </h1>
          <ProseBlock lead className="mt-6">
            <p>
              This page shows you how the teaching blocks — orientation,
              explanation, proof, and next steps — work together so each
              page feels clear and intentional. Think of them as the LEGO
              pieces that snap together to build any lesson.
            </p>
          </ProseBlock>
        </EditorialBand>

        <StudentFastPath
          title="Use this page when you want to understand how the teaching blocks actually work."
          summary="Learn what gets stored vs. what gets styled, read what each block is for, then look at real examples so the system clicks."
          steps={primitiveFastPathSteps}
          primaryAction={{
            label: "Open recipes guide",
            href: "/recipes",
          }}
          secondaryAction={{
            label: "Jump to Module 1",
            href: "/experiences/identity-portfolio/signal/",
            kind: "secondary",
          }}
        />

        <SplitLayout
          ratio="feature"
          primary={
            <TonePanel tone="reading" className="p-6">
              <p className="type-meta text-(--accent-strong)">
                What the primitive layer should protect
              </p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">
                These blocks matter because they keep the teaching flow intact even when content changes.
              </h2>
              <p className="mt-3 type-body text-(--ink-body)">
                When the blocks are well-defined, the page can evolve without
                losing its sense of direction. You — the learner — should
                experience this as "this page knows where it is going," not as
                a visible system of components.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {primitiveReaders.map((reader) => (
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
                ariaLabel="Primitive flow from orienting a learner to guiding their next move"
                steps={["Orient", "Explain", "Prove", "Guide"]}
                palette="sky"
              />
            </TonePanel>
          }
        />

        <section id="contract-boundary" className="space-y-6">
          <SectionHeading
            eyebrow="Content vs. Presentation"
            title="Content is stored simply — the page figures out how to display it."
            body="These notes explain the split: your content stays in plain fields and references, while the page automatically turns those fields into styled, interactive blocks. That way the look stays consistent even when someone updates the text."
          />
          <ContentGrid minCardWidth="17rem">
            {contractBoundaryNotes.map((note) => (
              <TonePanel
                key={note.title}
                tone={note.tone}
                className="card-shell p-6"
              >
                <h2 className="type-concept">{note.title}</h2>
                <p className="mt-3 type-body">{note.summary}</p>
              </TonePanel>
            ))}
          </ContentGrid>
        </section>

        <section id="primitive-map" className="space-y-6">
          <SectionHeading
            eyebrow="Block Map"
            title="The layout handles structure. The teaching blocks handle the learning flow."
            body="Each block has a narrow job: orient you, explain something, show an example, prompt reflection, or point you forward. They are designed to make a page feel deliberate, not decorated."
          />
          <ContentGrid minCardWidth="18rem">
            {primitiveMapNotes.map((note) => (
              <TonePanel
                key={note.name}
                tone={note.tone}
                className="card-shell p-6"
              >
                <p className="type-meta">Pedagogical layer</p>
                <h2 className="mt-3 type-concept">{note.name}</h2>
                <p className="mt-3 type-body">{note.purpose}</p>
              </TonePanel>
            ))}
          </ContentGrid>
        </section>

        <section id="unit-renderer" className="space-y-6">
          <CalloutBand
            label="How it works"
            title="One system reads the stored content and turns it into styled page blocks."
            tone="proof"
          >
            <p>
              The lessons below are stored as simple lists of content blocks.
              The page does not hand-arrange each piece. Instead, it runs
              every block through a single system that knows how to turn
              text, images, actions, and prompts into the right visual
              components automatically.
            </p>
          </CalloutBand>
        </section>

        <section id="concept-unit" className="space-y-6">
          <UnitRenderer unit={conceptUnit} headingLevel={2} />
        </section>

        <section id="assignment-unit" className="space-y-6">
          <UnitRenderer unit={assignmentUnit} headingLevel={2} />
        </section>

        <section id="reading-map-unit" className="space-y-6">
          <UnitRenderer unit={readingMapUnit} headingLevel={2} />
        </section>
      </LessonShell>
    </PageShell>
  );
}

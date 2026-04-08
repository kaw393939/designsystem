import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import {
  ComparisonGrid,
  NextStepBlock,
} from "@/components/educational-primitives";
import { StudentPortraitBadge } from "@/components/human-signal-visuals";
import { TonePanel } from "@/components/tone-panel";

import {
  comparisonColumns,
  comparisonRows,
  studentStoryItems,
} from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/examples/";

const exampleRouteCards = [
  {
    title: "Overview example",
    summary:
      "See a wide page that stays calm, directional, and clear instead of turning into a block pile.",
    href: "/examples/module/",
  },
  {
    title: "Lesson example",
    summary:
      "See a lesson page built for dense material that still needs pacing and emphasis.",
    href: "/examples/lesson/",
  },
  {
    title: "Recipes guide",
    summary:
      "Open page patterns you can borrow directly when you need structure faster than explanation.",
    href: "/recipes/",
  },
] as const;

export default function IdentityPortfolioExamplesPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity examples route" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Support route"
      title="See what gets clearer when the signal finally holds"
      dek="Open these examples when you need before-and-after evidence that shows what changes when one signal finally drives the page."
      currentHref={currentHref}
      actions={[
        {
          label: "Return to proof",
          href: "/experiences/identity-portfolio/proof/",
          kind: "primary",
        },
        {
          label: "Open recipes",
          href: "/recipes/",
          kind: "secondary",
        },
      ]}
    >
      <ContentGrid minCardWidth="18rem">
        {studentStoryItems.map((story) => (
          <TonePanel key={story.name} tone="reading" className="card-shell p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <StudentPortraitBadge
                name={story.name}
                label={story.role}
                palette={story.palette}
              />
              <p className="type-meta text-(--accent-strong)">{story.archetype}</p>
            </div>
            <p className="mt-3 type-body text-(--ink-body)">{story.startingPoint}</p>
            <p className="mt-4 type-caption text-(--signal)">
              <strong>Move:</strong> {story.move}
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              <strong>Shift:</strong> {story.outcome}
            </p>
          </TonePanel>
        ))}
      </ContentGrid>

      <ComparisonGrid
        title="The redesign changes what the portfolio is trying to do"
        legend="The difference is not just visual polish. It is whether the page behaves like one coherent signal system."
        columns={comparisonColumns}
        rows={comparisonRows}
      />

      <ContentGrid minCardWidth="18rem">
        {exampleRouteCards.map((card) => (
          <TonePanel key={card.href} tone="proof" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">More evidence</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{card.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{card.summary}</p>
            <Link href={card.href} className="action-secondary mt-5 inline-flex w-fit">
              Open page
            </Link>
          </TonePanel>
        ))}
      </ContentGrid>

      <NextStepBlock
        title="Use examples to sharpen the real page, not to avoid it"
        summary="Once you see the move clearly, go back to the live route that owns the fix and apply it there."
        context="The examples route is a mirror, not the main path."
        primaryAction={{
          label: "Return to proof",
          href: "/experiences/identity-portfolio/proof/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Open recipes",
          href: "/recipes/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}
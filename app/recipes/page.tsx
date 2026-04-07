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
import { pageRecipeSpecs } from "@/lib/page-recipes";
import {
  recipeExemplarCards,
  recipeGuideNotes,
} from "@/lib/recipe-exemplar-content";
import { getSelectedSiteBuildContext } from "@/lib/site-release";

function formatRequiredOrder() {
  return Object.values(pageRecipeSpecs).map((recipe) => ({
    id: recipe.id,
    label: recipe.label,
    order: recipe.orderedRequirements
      .map(
        (step) =>
          `${step.type}${step.count && step.count > 1 ? ` x${step.count}` : ""}`,
      )
      .join(" -> "),
  }));
}

const recipeStudents = [
  { name: "Ari", label: "Needs a concept page that feels teachable", palette: "sage" as const },
  { name: "Noor", label: "Needs an assignment flow that feels doable", palette: "amber" as const },
  { name: "Eli", label: "Needs a route that proves the system can ship", palette: "sky" as const },
];

const recipeFastPathSteps = [
  {
    title: "Pick the page job",
    summary:
      "Start with the guide notes so you know whether you need a lesson, concept, reading map, or another route type.",
  },
  {
    title: "Check the block order",
    summary:
      "Use the recipe coverage section to see the structure each page type expects before you start assembling content.",
  },
  {
    title: "Copy a working exemplar",
    summary:
      "Open an exemplar route and borrow the flow that already feels readable, grounded, and student-usable.",
  },
] as const;

const exemplarFallbackByHref = {
  "/recipes/feedback-loops": {
    href: "/examples/lesson",
    label: "Open lesson example",
  },
  "/recipes/public-space-observation": {
    href: "/examples/module",
    label: "Open module example",
  },
} as const;

export default function RecipesPage() {
  const recipeCoverage = formatRequiredOrder();
  const context = getSelectedSiteBuildContext();
  const activeRouteHrefs = new Set(context.routes.map((route) => route.href));
  const conceptExemplarIsActive = activeRouteHrefs.has("/recipes/feedback-loops");
  const lessonExemplarIsActive = activeRouteHrefs.has(
    "/recipes/public-space-observation",
  );

  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <p className="type-meta text-(--accent-strong)">
          Recipe guide
        </p>
        <h1 className="type-hero measure-hero mt-4 text-balance text-(--ink-strong)">
          Use these recipes when you need a page pattern that already knows how to teach.
        </h1>
        <ProseBlock lead className="mt-6">
          <p>
            This page is the shortcut when you know the page job but do not
            want to invent the structure from scratch. Pick the pattern, check
            the order, then borrow a working flow.
          </p>
        </ProseBlock>
      </EditorialBand>

      <StudentFastPath
        title="Use this page when you want a page pattern you can actually build from."
        summary="Start with the guide notes, check the recipe order, then open a working exemplar and copy the flow instead of guessing."
        steps={recipeFastPathSteps}
        primaryAction={
          conceptExemplarIsActive
            ? {
                label: "Open concept exemplar",
                href: "/recipes/feedback-loops",
              }
            : {
                label: "Open lesson example",
                href: "/examples/lesson",
              }
        }
        secondaryAction={
          lessonExemplarIsActive
            ? {
                label: "Open lesson exemplar",
                href: "/recipes/public-space-observation",
                kind: "secondary",
              }
            : {
                label: "Open module example",
                href: "/examples/module",
                kind: "secondary",
              }
        }
      />

      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">
              Why the recipe layer matters
            </p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              A recipe helps when it keeps the page clear from the first screen.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              You are not here to admire block order. You are here to tell
              whether the page opens clearly, whether the proof feels guided,
              and whether the next move is obvious. That is the job.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {recipeStudents.map((student) => (
                <StudentPortraitBadge
                  key={student.name}
                  name={student.name}
                  label={student.label}
                  palette={student.palette}
                />
              ))}
            </div>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="proof" className="p-5">
            <ProgressPathVisual
              ariaLabel="Recipe flow from brief to route"
              steps={["Brief", "Blocks", "Proof", "Route"]}
              palette="amber"
            />
          </TonePanel>
        }
      />

      <ContentGrid minCardWidth="17rem">
        {recipeGuideNotes.map((note) => (
          <TonePanel
            key={note.title}
            tone={note.tone}
            className="card-shell p-6"
          >
            <h2 className="type-concept text-(--ink-strong)">
              {note.title}
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              {note.summary}
            </p>
          </TonePanel>
        ))}
      </ContentGrid>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Recipe Coverage"
          title="Seven page types now share one reliable build pattern."
          body="The structure matters because it keeps pages readable as they scale, especially when the content gets dense or the route has to carry more than one job."
        />
        <ContentGrid minCardWidth="18rem">
          {recipeCoverage.map((recipe) => (
            <TonePanel
              key={recipe.id}
              tone="neutral"
              className="card-shell p-6"
            >
              <p className="type-meta text-(--accent-strong)">
                Required order
              </p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">
                {recipe.label}
              </h2>
              <p className="mt-3 type-caption text-(--ink-body)">
                {recipe.order}
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Exemplar Routes"
          title="Open a working page instead of guessing what this pattern should look like."
          body="If a dedicated recipe route is live, open it directly. If this release parks it, the button sends you to the closest active example so you still have something usable to copy from."
        />
        <ContentGrid minCardWidth="18rem">
          {recipeExemplarCards.map((card) => {
            const isActive = activeRouteHrefs.has(card.href);
            const fallback = exemplarFallbackByHref[
              card.href as keyof typeof exemplarFallbackByHref
            ];
            const destinationHref = isActive ? card.href : fallback.href;
            const actionLabel = isActive ? `Open ${card.title}` : fallback.label;

            return (
              <TonePanel
                key={card.href}
                tone={card.tone}
                className="card-shell p-6"
              >
                <p className="type-meta text-(--accent-strong)">
                  Recipe exemplar
                </p>
                <h2 className="mt-3 type-concept text-(--ink-strong)">
                  {card.title}
                </h2>
                <p className="mt-3 type-body text-(--ink-body)">
                  {card.summary}
                </p>
                {!isActive ? (
                  <p className="mt-4 type-caption text-(--signal)">
                    This release parks the dedicated exemplar, so the button
                    below opens the closest live page pattern.
                  </p>
                ) : null}
                <Link
                  href={destinationHref}
                  className="action-secondary mt-5 w-fit"
                >
                  {actionLabel}
                </Link>
              </TonePanel>
            );
          })}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Validation"
        title="These patterns are checked before you trust them."
        tone="proof"
      >
        <p>
          The checks still catch missing or misordered blocks before a page
          becomes the one you borrow. If a dedicated recipe route is parked in
          this release, this guide points you to the closest live example
          instead of a dead end.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/primitives" className="action-secondary">
            Review primitives guide
          </Link>
          <Link
            href={conceptExemplarIsActive ? "/recipes/feedback-loops" : "/examples/lesson"}
            className="action-primary"
          >
            {conceptExemplarIsActive ? "Open concept exemplar" : "Open lesson example"}
          </Link>
        </div>
      </CalloutBand>
    </PageShell>
  );
}

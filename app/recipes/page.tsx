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
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
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
  { name: "Eli", label: "Needs a page that proves the system can ship", palette: "sky" as const },
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
    title: "Copy a working example",
    summary:
      "Open an example page and borrow the flow that already feels readable, grounded, and student-usable.",
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
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Recommended support" />
            <p className="mt-4 type-meta text-(--accent-strong)">Support route · Recipes</p>
            <h1 className="type-hero measure-hero mt-4 text-balance text-(--ink-strong)">
              Use recipes when you already know what kind of page you are making and just need a pattern that works.
            </h1>
            <ProseBlock lead className="mt-6">
              <p>
                Come here after the main decision is clear. Borrow a working page pattern instead
                of guessing the structure from scratch.
              </p>
            </ProseBlock>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tour/build" className="action-primary">
                Return to the build step
              </Link>
              <Link href="/examples" className="action-secondary">
                Open the examples page
              </Link>
            </div>
          </div>
          <RouteContextPanel
            tone="reading"
            eyebrow="Primary use"
            title="Patterns you can actually borrow."
            sections={[
              {
                label: "Open this when",
                content:
                  "You already know whether the page is a lesson, concept, reading map, or something else and need a pattern that already works.",
              },
              {
                label: "This helps with",
                content:
                  "Build briefs, block order, and choosing which example is the best one to copy from.",
              },
              {
                label: "Best next move",
                content:
                  "Pick the pattern that fits, then go back to build and use it there.",
              },
            ]}
          />
        </div>
      </EditorialBand>

      <StudentFastPath
        label="Quick support path"
        title="Need a page pattern you can actually copy?"
        summary="Start with the guide notes, check the expected block order, then open a working example and borrow what already reads well."
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
              Why recipes help
            </p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              A recipe is useful when it makes the page clearer faster.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              Check whether the page opens clearly, whether the proof feels guided, and whether the
              next move is obvious.
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
          title="These page types already have working patterns."
          body="The structure matters because it keeps the page readable even when the content gets dense or the page has to do more than one job."
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
          title="Open a working page instead of guessing what the pattern should look like."
          body="If a dedicated recipe route is live, open it. If not, the button sends you to the closest active example so you still have something useful to copy from."
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
                    This version does not include the dedicated example, so the button
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
          These checks catch missing or misordered blocks before a page becomes worth borrowing.
          If a dedicated recipe page is not available in this version, this guide sends you to the
          closest live example instead.
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

import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import {
  ProgressPathVisual,
  StudioSceneVisual,
} from "@/components/human-signal-visuals";
import { LessonShell } from "@/components/lesson-shell";
import { PageShell } from "@/components/page-shell";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";
import { UnitRenderer } from "@/components/educational-primitives";
import {
  getBlockTitle,
  type EducationalUnitSpec,
} from "@/lib/educational-contracts";
import {
  assertValidUnitRecipe,
  buildRecipeLocalNavItems,
} from "@/lib/page-recipes";

type RecipePreface = {
  eyebrow: string;
  title: string;
  summary: string;
  note: string;
  palette?: "sage" | "sky" | "amber" | "rose";
  badges?: string[];
  steps?: string[];
  actions?: Array<{
    label: string;
    href: string;
    kind?: "primary" | "secondary";
  }>;
};

type RecipeExemplarPageProps = {
  unit: EducationalUnitSpec;
  progress: string;
  tocTitle: string;
  preface?: RecipePreface;
};

function buildDefaultPreface(unit: EducationalUnitSpec): RecipePreface {
  if (unit.kind === "lesson") {
    return {
      eyebrow: "Lesson page",
      title: `${unit.title} gives you a guided way in.`,
      summary:
        "Use this page when you want a clear arc, a usable pace, and a visible path from prompt to action.",
      note:
        "The structure matters because it keeps the lesson easy to enter, follow, and use.",
      palette: "amber",
      steps: ["Orient", "Notice", "Make", "Share"],
    };
  }

  if (unit.kind === "reading-map") {
    return {
      eyebrow: "Reading map",
      title: `${unit.title} gives you a way into the sources.`,
      summary:
        "A strong reading map gives you a first sequence, a reason each cluster matters, and a clean way back out.",
      note:
        "The point is guidance, not overwhelm.",
      palette: "sky",
      steps: ["Start", "Cluster", "Compare", "Return"],
    };
  }

  if (unit.kind === "assignment") {
    return {
      eyebrow: "Assignment page",
      title: `${unit.title} keeps the task concrete from the first screen.`,
      summary:
        "You should be able to see the task, understand the evidence you need, and picture the finished artifact without decoding internal language.",
      note:
        "The page should feel like real work in motion, not a schema exercise.",
      palette: "rose",
      badges: ["Observe", "Record", "Reflect"],
    };
  }

  return {
    eyebrow: "Concept page",
    title: `${unit.title} makes the idea usable fast.`,
    summary:
      "Start with why the idea matters, see one strong example, then go deeper once the core move is clear.",
    note:
      "This wrapper should introduce the page, preview the movement, and get out of the way.",
    palette: "sage",
    badges: ["Idea", "Proof", "Action"],
  };
}

function renderRecipeVisual(unit: EducationalUnitSpec, preface: RecipePreface) {
  if (unit.kind === "lesson" || unit.kind === "reading-map") {
    return (
      <ProgressPathVisual
        ariaLabel={`${preface.title} shown as a four-step learning path`}
        steps={preface.steps ?? ["Start", "Study", "Test", "Share"]}
        palette={preface.palette ?? "sky"}
      />
    );
  }

  return (
    <StudioSceneVisual
      ariaLabel={`${preface.title} illustrated as a person working through a proof-driven page`}
      badges={preface.badges ?? ["Signal", "Proof", "Action"]}
      palette={preface.palette ?? "sage"}
    />
  );
}

export function RecipeExemplarPage({
  unit,
  progress,
  tocTitle,
  preface,
}: RecipeExemplarPageProps) {
  assertValidUnitRecipe(unit);

  const resolvedPreface = preface ?? buildDefaultPreface(unit);
  const previewBlocks = unit.blocks
    .map((block) => getBlockTitle(block))
    .filter((title): title is string => Boolean(title))
    .slice(0, 4);

  return (
    <PageShell maxWidthClassName="max-w-7xl">
      <LessonShell
        localNav={buildRecipeLocalNavItems(unit)}
        progress={progress}
        tocTitle={tocTitle}
      >
        <div className="space-y-10">
          <SplitLayout
            ratio="feature"
            primary={
              <TonePanel tone="reading" className="p-8">
                <p className="type-meta text-(--accent-strong)">
                  {resolvedPreface.eyebrow}
                </p>
                <h1 className="mt-3 type-hero text-balance text-(--ink-strong)">
                  {resolvedPreface.title}
                </h1>
                <p className="mt-5 type-body text-(--ink-body)">
                  {resolvedPreface.summary}
                </p>
                <p className="mt-4 type-caption text-(--signal)">
                  {resolvedPreface.note}
                </p>
                {resolvedPreface.actions?.length ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {resolvedPreface.actions.map((action) => (
                      <Link
                        key={`${action.href}:${action.label}`}
                        href={action.href}
                        className={
                          action.kind === "secondary"
                            ? "action-secondary"
                            : "action-primary"
                        }
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </TonePanel>
            }
            secondary={
              <TonePanel tone="proof" className="p-5">
                {renderRecipeVisual(unit, resolvedPreface)}
              </TonePanel>
            }
          />
          <ContentGrid minCardWidth="16rem">
            {previewBlocks.map((title, index) => (
              <TonePanel key={title} tone="neutral" className="card-shell p-5">
                <p className="type-meta text-(--accent-strong)">
                  Page move {index + 1}
                </p>
                <h2 className="mt-3 type-concept text-(--ink-strong)">
                  {title}
                </h2>
                <p className="mt-3 type-caption text-(--ink-body)">
                  This block earns its place by moving the read forward.
                </p>
              </TonePanel>
            ))}
          </ContentGrid>
          <UnitRenderer unit={unit} headingLevel={2} />
        </div>
      </LessonShell>
    </PageShell>
  );
}

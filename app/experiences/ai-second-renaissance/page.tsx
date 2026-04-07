import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { PageShell } from "@/components/page-shell";
import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import {
  getExperienceHomepageHref,
  getSelectedSiteBuildContext,
} from "@/lib/site-release";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

export default function AiSecondRenaissanceExperiencePage() {
  const context = getSelectedSiteBuildContext();
  const homepageHref = getExperienceHomepageHref(context);

  if (
    !context.routes.some(
      (route) => route.id === "experience-ai-second-renaissance",
    )
  ) {
    return (
      <PageShell>
        <CalloutBand
          label="Start with the live experience"
          title="This AI history experience is parked in the current release, so it should not be your first stop right now."
          tone="next"
          titleAsPageHeading
        >
          <p>
            Open the active course experience first if you are following the
            student path, or use the recipes guide if you need a working page
            pattern to borrow.
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

  return (
    <RecipeExemplarPage
      unit={getSelectedReleaseUnit("print-to-ai-knowledge-shift")}
      progress="Enterprise AI and the Second Renaissance / Module 1"
      tocTitle="AI second renaissance proof"
      preface={{
        eyebrow: "Experience route",
        title: "Read the AI shift as an institutional story, not a hype cycle.",
        summary:
          "This experience starts where many students actually are: curious about AI, anxious about labor pressure, and unsure whether the right response is speed, skepticism, or strategy. The page reframes that tension through historical comparison, visible stakes, and practical signal-building.",
        note:
          "The goal is not to make AI feel magical. It is to help learners recognize pattern, power, and the kinds of human judgment that remain valuable when generation gets cheap.",
        palette: "sky",
        badges: ["History", "Labor", "Signal"],
      }}
    />
  );
}
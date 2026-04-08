import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { PageShell } from "@/components/page-shell";
import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import { lessonRecipeExemplar } from "@/lib/recipe-exemplar-content";
import {
  getExperienceHomepageHref,
  getSelectedSiteBuildContext,
} from "@/lib/site-release";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

export default function PublicSpaceObservationRecipePage() {
  const context = getSelectedSiteBuildContext();
  const homepageHref = getExperienceHomepageHref(context);

  if (
    !context.routes.some(
      (route) => route.id === "recipes-public-space-observation",
    )
  ) {
    return (
      <PageShell>
        <CalloutBand
          label="Use the live page instead"
          title="This lesson page is not available in this version, so start from a live page instead."
          tone="next"
          titleAsPageHeading
        >
          <p>
            Use the recipes guide if you need the pattern, or jump into the
            current experience if you want the working version.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/recipes" className="action-primary">
              Open recipes guide
            </Link>
            <Link href={homepageHref} className="action-secondary">
              Open {context.experience.title}
            </Link>
          </div>
        </CalloutBand>
      </PageShell>
    );
  }

  return (
    <RecipeExemplarPage
      unit={getSelectedReleaseUnit("recipe-lesson-public-space-observation")}
      progress={lessonRecipeExemplar.progress}
      tocTitle={lessonRecipeExemplar.tocTitle}
    />
  );
}

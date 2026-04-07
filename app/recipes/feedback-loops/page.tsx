import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { PageShell } from "@/components/page-shell";
import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import { conceptRecipeExemplar } from "@/lib/recipe-exemplar-content";
import {
  getExperienceHomepageHref,
  getSelectedSiteBuildContext,
} from "@/lib/site-release";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

export default function FeedbackLoopsRecipePage() {
  const context = getSelectedSiteBuildContext();
  const homepageHref = getExperienceHomepageHref(context);

  if (!context.routes.some((route) => route.id === "recipes-feedback-loops")) {
    return (
      <PageShell>
        <CalloutBand
          label="Use the live route instead"
          title="This concept page is parked in the current release, so start from a page that is actually live."
          tone="next"
          titleAsPageHeading
        >
          <p>
            Use the recipes guide for the pattern, or jump into the current
            experience if you want the real build flow.
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
      unit={getSelectedReleaseUnit("recipe-concept-feedback-loops")}
      progress={conceptRecipeExemplar.progress}
      tocTitle={conceptRecipeExemplar.tocTitle}
    />
  );
}

import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

import { BseaiRouteUnavailable, isBseaiRouteActive } from "../route-shell";

const currentHref = "/experiences/bseai/course-spine/";

export default function BseaiCourseSpinePage() {
  if (!isBseaiRouteActive(currentHref)) {
    return <BseaiRouteUnavailable title="BSEAI course spine" />;
  }

  return (
    <RecipeExemplarPage
      unit={getSelectedReleaseUnit("bseai-course-spine-overview")}
      progress="BSEAI / Course spine"
      tocTitle="Course spine"
      preface={{
        eyebrow: "Course spine",
        title:
          "Read the eight-course sequence as a progression of skills, not a loose list of requirements.",
        summary:
          "See how the public promise becomes a developmental sequence with visible outputs, stronger proof, and an honest placeholder for the final advanced slot.",
        note:
          "Choose legibility over catalog language. Each course should add a clearer capability surface.",
        palette: "amber",
        badges: ["Sequence", "Artifacts", "Proof"],
      }}
    />
  );
}
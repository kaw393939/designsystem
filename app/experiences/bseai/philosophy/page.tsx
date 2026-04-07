import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

import { BseaiRouteUnavailable, isBseaiRouteActive } from "../route-shell";

const currentHref = "/experiences/bseai/philosophy/";

export default function BseaiPhilosophyPage() {
  if (!isBseaiRouteActive(currentHref)) {
    return <BseaiRouteUnavailable title="BSEAI formation route" />;
  }

  return (
    <RecipeExemplarPage
      unit={getSelectedReleaseUnit("bseai-formation-model")}
      progress="BSEAI / Formation model"
      tocTitle="Formation model"
      preface={{
        eyebrow: "Formation route",
        title:
          "See the capacities the degree is trying to form before you reduce it to tools or catalog slots.",
        summary:
          "This route defines the judgment, proof, communication, and deployment model the rest of the experience has to make visible. It is the doctrinal center of the public site, not a side note.",
        note:
          "If this page gets vague, the rest of the degree starts sounding interchangeable with generic AI curriculum copy.",
        palette: "sage",
        badges: ["Judgment", "Proof", "Deployment"],
      }}
    />
  );
}
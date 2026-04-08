import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

import { BseaiRouteUnavailable, isBseaiRouteActive } from "../route-shell";

const currentHref = "/experiences/bseai/modules/";

export default function BseaiModulesPage() {
  if (!isBseaiRouteActive(currentHref)) {
    return <BseaiRouteUnavailable title="BSEAI module library" />;
  }

  return (
    <RecipeExemplarPage
      unit={getSelectedReleaseUnit("bseai-module-library")}
      progress="BSEAI / Module library"
      tocTitle="Module library"
      preface={{
        eyebrow: "Module library",
        title:
          "Browse the reusable learning blocks that let one teaching philosophy show up across multiple pages.",
        summary:
          "This library matters because the degree should scale through shared modules instead of rewriting the same teaching problem from scratch in every course or public page.",
        note:
          "Reusable does not mean generic. Each module still has to preserve a specific learning job.",
        palette: "sky",
        badges: ["Library", "Reuse", "Sequence"],
      }}
    />
  );
}
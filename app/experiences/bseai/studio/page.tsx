import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

import { BseaiRouteUnavailable, isBseaiRouteActive } from "../route-shell";

const currentHref = "/experiences/bseai/studio/";

export default function BseaiStudioPage() {
  if (!isBseaiRouteActive(currentHref)) {
    return <BseaiRouteUnavailable title="BSEAI studio route" />;
  }

  return (
    <RecipeExemplarPage
      unit={getSelectedReleaseUnit("bseai-studio-introduction")}
      progress="BSEAI / Studio entry"
      tocTitle="Studio entry"
      preface={{
        eyebrow: "Studio route",
        title:
          "Studio is where the degree stops sounding good and starts becoming publicly reviewable.",
        summary:
          "This page bridges the degree into signal, proof, build, and publish work so the program can show what students actually make, not just what it says it values.",
        note:
          "The portfolio is the first public-practice system, not a side assignment beside the curriculum.",
        palette: "rose",
        badges: ["Signal", "Proof", "Publish"],
        actions: [
          {
            label: "Open identity studio",
            href: "/experiences/identity-portfolio/",
            kind: "primary",
          },
          {
            label: "Go to signal step",
            href: "/experiences/identity-portfolio/signal/",
            kind: "secondary",
          },
        ],
      }}
    />
  );
}
import { RecipeExemplarPage } from "@/components/recipe-exemplar-page";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

import { BseaiRouteUnavailable, isBseaiRouteActive } from "../../route-shell";

const currentHref = "/experiences/bseai/courses/is117/";

export default function BseaiIs117Page() {
  if (!isBseaiRouteActive(currentHref)) {
    return <BseaiRouteUnavailable title="BSEAI IS117 route" />;
  }

  return (
    <RecipeExemplarPage
      unit={getSelectedReleaseUnit("is117-path-entry")}
      progress="BSEAI / IS117 wrapper"
      tocTitle="IS117 start"
      preface={{
        eyebrow: "Live wrapper",
        title:
          "IS117 is the first live path because it forces signal, proof, and public positioning before students hide behind more production.",
        summary:
          "This wrapper turns the broader studio doctrine into a first-semester plan with a strategy pack, an initial build, and an early publish-and-revise loop.",
        note:
          "The first move is defining the site before building it. The page should keep that boundary obvious.",
        palette: "sky",
        badges: ["Audit", "Signal", "Build"],
        actions: [
          {
            label: "Start the signal path",
            href: "/experiences/identity-portfolio/signal/",
            kind: "primary",
          },
          {
            label: "Open build step",
            href: "/experiences/identity-portfolio/build/",
            kind: "secondary",
          },
        ],
      }}
    />
  );
}
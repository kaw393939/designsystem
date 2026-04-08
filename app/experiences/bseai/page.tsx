import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { UnitRenderer } from "@/components/educational-primitives";
import { PageShell } from "@/components/page-shell";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

import { BseaiRouteUnavailable, isBseaiRouteActive } from "./route-shell";

const currentHref = "/experiences/bseai/";

export default function BseaiExperiencePage() {
  if (!isBseaiRouteActive(currentHref)) {
    return <BseaiRouteUnavailable title="BSEAI start page" />;
  }

  return (
    <PageShell>
      <div className="space-y-10">
        <UnitRenderer unit={getSelectedReleaseUnit("bseai-homepage")} headingLevel={2} />
        <CalloutBand
          label="Degree frame"
          title="Read the pillars before you mistake the program for a loose AI survey."
          tone="proof"
        >
          <p>
            The homepage should orient fast, but the degree only becomes legible
            when the public claims, learning model, and course spine line up.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/experiences/bseai/philosophy/" className="action-primary">
              Open teaching philosophy
            </Link>
            <Link href="/experiences/bseai/course-spine/" className="action-secondary">
              Open course spine
            </Link>
          </div>
        </CalloutBand>
        <UnitRenderer
          unit={getSelectedReleaseUnit("bseai-program-pillars")}
          headingLevel={2}
        />
      </div>
    </PageShell>
  );
}
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { UnitRenderer } from "@/components/educational-primitives";
import { PageShell } from "@/components/page-shell";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

import { BseaiRouteUnavailable, isBseaiRouteActive } from "../route-shell";

const currentHref = "/experiences/bseai/why-now/";

export default function BseaiWhyNowPage() {
  if (!isBseaiRouteActive(currentHref)) {
    return <BseaiRouteUnavailable title="BSEAI why-now page" />;
  }

  return (
    <PageShell>
      <div className="space-y-10">
        <UnitRenderer unit={getSelectedReleaseUnit("bseai-why-now")} headingLevel={2} />
        <CalloutBand
          label="Extended context"
          title="Use the broader renaissance comparison when you need the longer institutional frame."
          tone="reading"
        >
          <p>
            Start with the degree-specific claim, then widen into the printing-press-to-AI
            comparison so the stakes read as institutional change rather than gadget hype.
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
          unit={getSelectedReleaseUnit("print-to-ai-knowledge-shift")}
          headingLevel={2}
        />
      </div>
    </PageShell>
  );
}
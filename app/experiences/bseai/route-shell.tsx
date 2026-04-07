import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { PageShell } from "@/components/page-shell";
import {
  getExperienceHomepageHref,
  getSelectedSiteBuildContext,
} from "@/lib/site-release";

export function isBseaiRouteActive(href: string) {
  return getSelectedSiteBuildContext().routes.some((route) => route.href === href);
}

export function BseaiRouteUnavailable({ title }: { title: string }) {
  const context = getSelectedSiteBuildContext();
  const homepageHref = getExperienceHomepageHref(context);

  return (
    <PageShell>
      <CalloutBand
        label="Open the live experience"
        title={`${title} is parked in the current release, so start from the selected experience instead.`}
        tone="next"
        titleAsPageHeading
      >
        <p>
          This BSEAI route exists, but the current release is not exposing it as
          a live page. Open the active experience homepage first, or use the
          recipes guide while the selected release changes.
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
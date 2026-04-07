import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import { ReadingMapGrid } from "@/components/educational-primitives";
import { TonePanel } from "@/components/tone-panel";

import {
  fieldGuideItems,
  referenceLibraryClusters,
} from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/sources/";

export default function IdentityPortfolioSourcesPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity sources route" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Reference route"
      title="Follow the reading trail without losing the practical thread"
      dek="Follow the longer research trail here: the core documents, evidence base, and supporting readings behind the course decisions."
      currentHref={currentHref}
      actions={[
        {
          label: "Return to signal",
          href: "/experiences/identity-portfolio/signal/",
          kind: "primary",
        },
        {
          label: "Open system map",
          href: "/experiences/identity-portfolio/system-map/",
          kind: "secondary",
        },
      ]}
    >
      <ContentGrid minCardWidth="17rem">
        {fieldGuideItems.map((item) => (
          <TonePanel key={item.title} tone="neutral" className="card-shell p-6">
            <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            <Link href={item.href} className="action-secondary mt-5 inline-flex w-fit">
              Open route
            </Link>
          </TonePanel>
        ))}
      </ContentGrid>

      <ReadingMapGrid
        title="Open the cluster that matches the decision you are making"
        progression="These links are grouped by build problem so the reading trail stays connected to the page work."
        clusters={referenceLibraryClusters}
      />

      <TonePanel tone="reading" className="p-6">
        <p className="type-meta text-(--accent-strong)">Research stack</p>
        <h2 className="mt-3 type-concept text-(--ink-strong)">
          Start with the core research file.
        </h2>
        <p className="mt-3 type-body text-(--ink-body)">
          docs/_research/identity-system-core.md is the primary working model behind this experience. It explains the system in student language from need to opportunity.
        </p>
        <p className="mt-3 type-body text-(--ink-body)">
          Open docs/_research/identity.md when you want the longer evidence base, and docs/_research/mysystem.md when you want the shorter blueprint version.
        </p>
        <p className="mt-3 type-body text-(--ink-body)">
          The route set in this experience turns that stack into a usable build path: signal, style, proof, build, and publish.
        </p>
      </TonePanel>
    </IdentityRouteShell>
  );
}
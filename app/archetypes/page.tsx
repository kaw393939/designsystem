import type { Metadata } from "next";
import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypeProfiles,
  familyOverviews,
} from "@/lib/archetype-atlas-content";
import { withBasePath } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Archetypes",
  description:
    "Browse all twelve archetypes grouped by family. Each card links to a full deep-dive page with design guidance, visuals, and rhetoric.",
};

export default function ArchetypesIndexPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <RouteStatusBadge status="Wrapper-specific" />
          <p className="mt-4 type-meta text-(--accent-strong)">Legacy continuity route</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            The archetypes comparison page has moved.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Keep this page for older links or the atlas-style index. The main compare room now
            lives under Browse.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/browse/archetypes" className="action-primary">
              Go to the main page
            </Link>
            <Link href="/tour/archetype" className="action-secondary">
              Return to the archetype step
            </Link>
          </div>
        </div>
      </EditorialBand>

      {familyOverviews.map((family) => {
        const members = archetypeProfiles.filter(
          (p) => p.familyId === family.id,
        );
        return (
          <section key={family.id} id={family.id} className="space-y-6 scroll-mt-28">
            <SectionHeading
              eyebrow={family.archetypesLabel}
              title={family.title}
              body={family.summary}
            />
            <ContentGrid minCardWidth="18rem">
              {members.map((profile) => (
                <Link
                  key={profile.slug}
                  href={`/archetypes/${profile.slug}`}
                  className="group"
                >
                  <TonePanel
                    tone="reading"
                    className="card-shell overflow-hidden p-0 transition-shadow duration-200 group-hover:shadow-lg"
                  >
                    <img
                      src={withBasePath(profile.imagePath)}
                      alt={`${profile.name} archetype poster`}
                      className="atlas-card-image"
                    />
                    <div className="p-6 space-y-3">
                      <p className="type-meta text-(--accent-strong)">
                        {profile.familyTitle}
                      </p>
                      <h2 className="type-concept text-(--ink-strong) group-hover:text-(--accent-strong) transition-colors">
                        {profile.name}
                      </h2>
                      <p className="type-body text-(--ink-body) line-clamp-2">
                        {profile.corePromise}
                      </p>
                      <p className="type-caption text-(--signal)">
                        {profile.fiveSecondTest}
                      </p>
                    </div>
                  </TonePanel>
                </Link>
              ))}
            </ContentGrid>
          </section>
        );
      })}

      <EditorialBand tone="reflection" paddingScale="regular">
        <div className="measure-wide space-y-4">
          <h2 className="type-section text-(--ink-strong)">
            Pick one main archetype.
          </h2>
          <p className="type-body text-(--ink-body)">
            A page can have secondary traits, but the first read should still land as one clear
            archetype.
          </p>
          <p className="type-body text-(--ink-body)">
            <strong>Five-second test:</strong> if two people name two different archetypes, the work
            is not done.
          </p>
        </div>
      </EditorialBand>
    </PageShell>
  );
}
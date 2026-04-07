import type { Metadata } from "next";
import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypeProfiles,
  familyOverviews,
} from "@/lib/archetype-atlas-content";

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
          <p className="type-meta text-(--accent-strong)">Archetype atlas</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Twelve archetypes. Four families. One deep-dive page each.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Pick a family below to see its three archetypes side by side, or jump straight to any archetype for the full breakdown: the story behind it, which human needs it taps into, a design walkthrough, what would feel obviously wrong, and a live hero preview.
          </p>
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
                      src={profile.imagePath}
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

      <EditorialBand tone="reflection" paddingScale="reading">
        <div className="measure-wide space-y-4">
          <h2 className="type-section text-(--ink-strong)">
            A note on mixing
          </h2>
          <p className="type-body text-(--ink-body)">
            You will be tempted to pick two or three. Do not. A page can have secondary
            traits — a Sage-primary with slight Creator warmth, for example — but if the
            first read does not communicate one clear archetype, it communicates none.
          </p>
          <p className="type-body text-(--ink-body)">
            <strong>The test:</strong> show the page to someone for five seconds. Ask them
            to describe the feeling. If they say two different archetypes, the work is not
            done.
          </p>
        </div>
      </EditorialBand>
    </PageShell>
  );
}
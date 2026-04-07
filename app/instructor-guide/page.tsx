import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { SequenceTimeline } from "@/components/educational-primitives";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  degreeConnection,
  instructorMaterials,
  instructorPrompts,
  instructorSessionOneItems,
  instructorSessionTwoItems,
  instructorWatchFors,
} from "@/lib/web-presence-site-content";

export const metadata: Metadata = {
  title: "Instructor Guide",
};

export default function InstructorGuidePage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">Instructor session plan</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Two 80-minute sessions designed to force decisions, not drift into abstraction.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            The facilitator notes are explicit about the job: move students from abstract familiarity with archetypes and design language to concrete signal decisions they can turn into agent specs for the next three weeks.
          </p>
        </div>
      </EditorialBand>

      <SequenceTimeline
        title="Session 1 — signal and archetype"
        summary="The first session frames the two finals, forces archetype choices, writes both signal briefs, and makes students test those briefs through pair review."
        mode="process"
        items={instructorSessionOneItems}
      />

      <SequenceTimeline
        title="Session 2 — apply, audit, and plan"
        summary="The second session treats the live pages as evidence, audits them against the briefs, drafts proof blocks, and turns the gaps into weekly agent specs."
        mode="process"
        items={instructorSessionTwoItems}
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="What to watch for"
          title="The most common teaching problems are really decision problems."
          body="The session plan keeps returning to the same pattern: when a student cannot write a clear spec, they have not actually made the decision yet."
        />
        <ContentGrid minCardWidth="18rem">
          {instructorWatchFors.map((item) => (
            <TonePanel key={item} tone="reading" className="card-shell p-6">
              <p className="type-body text-(--ink-body)">{item}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <CalloutBand label="Prompts" title="Useful facilitation questions" tone="next">
          <ul className="space-y-3 pl-5">
            {instructorPrompts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>
        <CalloutBand label="Materials" title="What needs to be ready" tone="next">
          <ul className="space-y-3 pl-5">
            {instructorMaterials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>
      </div>

      <CalloutBand label="Degree connection" title="This unit is not just portfolio advice." tone="warning">
        <p>{degreeConnection}</p>
      </CalloutBand>
    </PageShell>
  );
}
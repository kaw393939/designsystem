import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { SequenceTimeline } from "@/components/educational-primitives";
import { PageShell } from "@/components/page-shell";
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { StudentFastPath } from "@/components/student-fast-path";
import { TonePanel } from "@/components/tone-panel";
import { guidedTourSteps, initialTourRecord } from "@/lib/site-navigation";
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

const instructorFastPathSteps = [
  {
    title: "Start from the tour map",
    summary:
      "Start class from the 6-step tour before you open any optional help or older archive page.",
  },
  {
    title: "Check the visible outputs",
    summary:
      "Use the brief fields on each page so feedback stays tied to audience, vibe, look, proof, build plan, and publish piece instead of vague opinions.",
  },
  {
    title: "Use support pages narrowly",
    summary:
      "Open browse, examples, or recipes only when they help with the exact step students are already on.",
  },
] as const;

const recordCrosswalk = initialTourRecord.map((entry) => {
  const updatedBy = guidedTourSteps
    .filter((step) => step.recordFields.includes(entry.id))
    .map((step) => step.publicLabel)
    .join(" and ");

  return {
    ...entry,
    updatedBy,
  };
});

export default function InstructorGuidePage() {
  return (
    <PageShell>
      <EditorialBand tone="reflection" paddingScale="hero">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Instructor only" />
            <p className="mt-4 type-meta text-(--accent-strong)">Teaching guide</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
              Teach from the same 6-step path students already use.
            </h1>
            <p className="mt-6 type-body text-(--ink-body)">
              Pace class around the public tour so critique stays attached to real decisions.
              Open browse, examples, or recipes only when a specific step needs backup.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tour" className="action-primary">
                Open the tour map
              </Link>
              <Link href="/tour/signal" className="action-secondary">
                Start at the signal step
              </Link>
            </div>
          </div>
          <RouteContextPanel
            tone="reading"
            eyebrow="How to use this page"
            title="Guide the class from here, not from a second path."
            sections={[
              {
                label: "Open it when",
                content:
                  "You are planning critique, prompts, or assignments around the public tour and want the teacher version in one place.",
              },
              {
                label: "Covers",
                content:
                  "The six tour steps, the brief fields students fill in on each page, and the support pages under browse, examples, and recipes.",
              },
              {
                label: "Check for",
                content:
                  "Does the page fit the audience? Is the vibe clear? Does the look match? Is the proof believable? Is the build plan specific? Does the publish asset still sound like the same page?",
              },
            ]}
          />
        </div>
      </EditorialBand>

      <StudentFastPath
        label="Fast instructor path"
        title="Run class through the public build path first."
        summary="Set the step, name the output students need, then bring in support only when the class is stuck on that exact decision."
        steps={instructorFastPathSteps}
        primaryAction={{
          label: "Open the tour map",
          href: "/tour",
        }}
        secondaryAction={{
          label: "Open student exemplars",
          href: "/examples/student-exemplars",
          kind: "secondary",
        }}
        tone="reflection"
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Teaching arc"
          title="Plan the class around two working sessions."
          body="Session one forces the core decisions. Session two audits the live pages and turns the gaps into next steps."
        />
      </section>

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
          eyebrow="Critique targets"
          title="Check the parts students should be able to point to by critique."
          body="Keep feedback tied to visible outputs, not general vibes about the page."
        />
        <ContentGrid minCardWidth="16rem">
          {recordCrosswalk.map((entry) => (
            <TonePanel key={entry.id} tone="neutral" className="card-shell p-5">
              <p className="type-meta text-(--accent-strong)">{entry.label}</p>
              <p className="mt-3 type-body text-(--ink-body)">
                By <strong>{entry.updatedBy}</strong>, this field should be filled in and usable in
                critique.
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Bounded support"
        title="Use browse, examples, and recipes only when the current step needs backup."
        tone="proof"
      >
        <p>
          Browse sharpens comparison and evidence. Examples show what changed on the page. Recipes
          help with structure once the page job is clear. None of them should replace the tour.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/browse" className="action-secondary">
            Open browse
          </Link>
          <Link href="/examples" className="action-secondary">
            Open examples
          </Link>
          <Link href="/recipes" className="action-primary">
            Open recipes
          </Link>
        </div>
      </CalloutBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="What to watch for"
          title="Most teaching problems start as unfinished decisions."
          body="When a student cannot write a clear spec, they usually have not really made the decision yet."
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
        <CalloutBand label="Prompts" title="Questions that help in critique" tone="next">
          <ul className="space-y-3 pl-5">
            {instructorPrompts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>
        <CalloutBand label="Materials" title="What should be ready" tone="next">
          <ul className="space-y-3 pl-5">
            {instructorMaterials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>
      </div>

      <CalloutBand label="Degree connection" title="This unit is bigger than portfolio advice." tone="warning">
        <p>{degreeConnection}</p>
      </CalloutBand>
    </PageShell>
  );
}
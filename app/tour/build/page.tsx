import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { GuidedStepShell } from "@/components/guided-step-shell";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import {
  buildTourRecordEntries,
  getGuidedTourStep,
  guidedTourRecordExamples,
} from "@/lib/site-navigation";
import {
  museumAuditItems,
  portfolioAuditItems,
  studioReviewCriteria,
  workbookChecklist,
} from "@/lib/web-presence-site-content";

const step = getGuidedTourStep("build");

export const metadata: Metadata = {
  title: step.publicLabel,
};

export default function TourBuildPage() {
  return (
    <GuidedStepShell
      eyebrow="Build step"
      title="Turn your decisions into a page plan someone could actually build."
      summary="Audit what you have, pick the biggest fix, and write a brief clear enough for a classmate or AI tool to follow."
      status="Required in tour"
      prerequisite={step.prerequisite}
      output={step.output}
      currentStepId="build"
      recordEntries={buildTourRecordEntries(guidedTourRecordExamples.build, step.recordFields)}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.build} />}
      actions={[
        {
          href: "/tour/publish",
          label: "Next: put it live",
        },
        {
          href: "/examples/student-exemplars",
          label: "See finished student examples",
          kind: "secondary",
        },
      ]}
      misconception={
        <p>
          Do not write the build brief like wishful thinking. If another person cannot tell what to
          build, it is still too vague.
        </p>
      }
      formativeCheck={
        <p>
          Hand the brief to someone else. If they cannot explain the page structure, proof
          placement, and next move without extra help, it is not ready yet.
        </p>
      }
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="What to check first"
          title="Start by naming what is strong, weak, and missing."
          body="Use these checklists to look at the live page before you write the revision plan."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Portfolio audit</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {portfolioAuditItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
          <TonePanel tone="proof" className="p-6">
            <p className="type-meta text-(--accent-strong)">Museum audit</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {museumAuditItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Build brief checklist"
          title="The plan needs clear boxes to fill in, not one big paragraph."
          body="These are the minimum pieces that make the build step usable and reviewable."
        />
        <ContentGrid minCardWidth="16rem">
          {workbookChecklist.map((item) => (
            <TonePanel key={item} tone="synthesis" className="p-6">
              <p className="type-body text-(--ink-body)">{item}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Studio review"
          title="The build step is done when someone else can review the page against the brief."
          body="These review questions keep the build tied to the earlier decisions instead of letting visual polish hide weak thinking."
        />
        <ContentGrid minCardWidth="18rem">
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Both products</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {studioReviewCriteria.both.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Portfolio review</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {studioReviewCriteria.portfolio.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Museum review</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {studioReviewCriteria.museum.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
        </ContentGrid>
      </section>

      <CalloutBand
        label="Build Rule"
        title="One important fix beats five vague goals."
        tone="next"
      >
        <p>
          Use the audit to name the one fix that would most improve the first read, then write the
          shortest brief that makes it buildable.
        </p>
      </CalloutBand>
    </GuidedStepShell>
  );
}
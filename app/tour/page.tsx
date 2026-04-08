import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { GuidedStepShell } from "@/components/guided-step-shell";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import { buildTourRecordEntries, guidedTourSteps } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Tour",
};

export default function TourPage() {
  return (
    <GuidedStepShell
      eyebrow="Guided build path"
      title="Follow the 6-step path that takes your site from rough idea to something you can share."
      summary="The tour is the main student path. Start here if you want a clear order, a running site brief, and a next move that actually makes sense."
      status="Required in tour"
      prerequisite="Know if you are starting fresh or jumping back in."
      output="A running site brief you can keep building on."
      recordEntries={buildTourRecordEntries()}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.tour} />}
      actions={[
        {
          href: "/tour/signal",
          label: "Start at step 1",
        },
        {
          href: "/tour/build",
          label: "Jump to build",
          kind: "secondary",
        },
      ]}
      misconception={
        <p>
          Do not disappear into extra rooms before you know who the page is for and what it needs
          to do. Browse helps once you already have a decision to sharpen.
        </p>
      }
      formativeCheck={
        <p>
          If you can say who the page is for, what you want people to get first, and which step
          you need next, you are in the right place.
        </p>
      }
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Tour map"
          title="Each step does one job and points to one useful support page."
          body="Each card tells you what decision the step settles and where to go if you need a comparison or example."
        />
        <ContentGrid minCardWidth="17rem">
          {guidedTourSteps.map((step, index) => (
            <TonePanel key={step.id} tone={index < 3 ? "reading" : "proof"} className="p-6">
              <RouteStatusBadge status="Required in tour" />
              <p className="mt-4 type-meta text-(--accent-strong)">Step {index + 1}</p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{step.publicLabel}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{step.summary}</p>
              <p className="mt-4 type-caption text-(--ink-body)">
                <strong>Prerequisite:</strong> {step.prerequisite}
              </p>
              <p className="mt-2 type-caption text-(--ink-body)">
                <strong>Output:</strong> {step.output}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={step.href} className="action-primary inline-flex">
                  Open step {index + 1}
                </Link>
                {step.supportHref ? (
                  <Link href={step.supportHref} className="action-secondary inline-flex">
                    {step.supportLabel}
                  </Link>
                ) : null}
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Older links"
        title="Playbook, workbook, and deliverables still work if an archive or handoff sends you there."
        tone="next"
      >
        <p>
          You do not need those pages to move through the tour. Use them only for comparison or
          archived links, then come back to the guided steps.
        </p>
        <p className="mt-4 type-caption text-(--ink-body)">
          Archive routes: <Link href="/playbook" className="underline hover:no-underline">playbook</Link>,{" "}
          <Link href="/workbook" className="underline hover:no-underline">workbook</Link>, and{" "}
          <Link href="/deliverables" className="underline hover:no-underline">deliverables</Link>.
        </p>
      </CalloutBand>
    </GuidedStepShell>
  );
}
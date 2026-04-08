import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { SequenceTimeline } from "@/components/educational-primitives";
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
  museumFailureModes,
  portfolioFailureModes,
  strongWorkItems,
  webPresenceProducts,
  webPresenceTimelineItems,
} from "@/lib/web-presence-site-content";

const step = getGuidedTourStep("publish");

export const metadata: Metadata = {
  title: step.publicLabel,
};

export default function TourPublishPage() {
  return (
    <GuidedStepShell
      eyebrow="Publish step"
      title="Put the page live and see if it still makes sense in the real world."
      summary="Publishing is part of the process, not a bonus round. This step turns the work into something people can actually open, react to, and remember."
      status="Required in tour"
      prerequisite={step.prerequisite}
      output={step.output}
      currentStepId="publish"
      recordEntries={buildTourRecordEntries(guidedTourRecordExamples.publish, step.recordFields)}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.publish} />}
      actions={[
        {
          href: "/examples",
          label: "See examples",
        },
        {
          href: "/tour",
          label: "Return to the tour map",
          kind: "secondary",
        },
      ]}
      misconception={
        <p>
          Do not treat going live as what happens after the design is done. The public version is
          what tells you what the page actually communicates.
        </p>
      }
      formativeCheck={
        <p>
          Say the live URL, the short spoken opener, and the one thing you will watch after
          launch. If you cannot name all three, this step is not done.
        </p>
      }
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Finish-line requirements"
          title="Keep the final version clear and easy to review."
          body="These requirements keep the finish line tied to one clear vibe, real proof, and a review method that still works outside the classroom."
        />
        <ContentGrid minCardWidth="20rem">
          {webPresenceProducts.map((product) => (
            <TonePanel key={product.title} tone="proof" className="p-6">
              <p className="type-meta text-(--accent-strong)">{product.audience}</p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">{product.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{product.summary}</p>
              <p className="mt-5 type-meta text-(--accent-strong)">Must do</p>
              <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body)">
                {product.mustDo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <SequenceTimeline
        title="Three-week publishing schedule"
        summary="Publishing turns an internal brief into something people can actually read and remember."
        mode="process"
        items={webPresenceTimelineItems}
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Strong work and weak work"
          title="By the end, it should be obvious what is working and what is still weak."
          body="Use these signs to tell whether the page is ready for public view or still needs another pass."
        />
        <ContentGrid minCardWidth="16rem">
          {strongWorkItems.map((item) => (
            <TonePanel key={item} tone="synthesis" className="p-5">
              <p className="type-body text-(--ink-body)">{item}</p>
            </TonePanel>
          ))}
        </ContentGrid>
        <div className="grid gap-6 lg:grid-cols-2">
          <CalloutBand label="Portfolio misses" title="Common portfolio mistakes" tone="reading">
            <ul className="space-y-3 pl-5">
              {portfolioFailureModes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
          <CalloutBand label="Museum misses" title="Common museum-site mistakes" tone="reading">
            <ul className="space-y-3 pl-5">
              {museumFailureModes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
        </div>
      </section>

      <CalloutBand
        label="Publish Rule"
        title="It only works if the same vibe survives in public."
        tone="warning"
      >
        <p>
          The page, the spoken opener, and the follow-up piece should all sound like the same
          person making the same promise. If they do not match, this step still has work left.
        </p>
      </CalloutBand>
    </GuidedStepShell>
  );
}
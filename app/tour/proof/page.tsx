import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
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
import { proofBlockFields, workbookPrinciples } from "@/lib/web-presence-site-content";

const step = getGuidedTourStep("proof");

export const metadata: Metadata = {
  title: step.publicLabel,
};

export default function TourProofPage() {
  return (
    <GuidedStepShell
      eyebrow="Proof step"
      title="Add proof near the main claim so people trust the page fast."
      summary="This is where you decide what evidence belongs near the promise, what the next step should sound like, and what proves the page is not all talk."
      status="Required in tour"
      prerequisite={step.prerequisite}
      output={step.output}
      currentStepId="proof"
      recordEntries={buildTourRecordEntries(guidedTourRecordExamples.proof, step.recordFields)}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.proof} />}
      actions={[
        {
          href: "/tour/build",
          label: "Next: turn it into a page",
        },
        {
          href: "/browse/attention-trust",
          label: "Open the trust and proof room",
          kind: "secondary",
        },
      ]}
      misconception={
        <p>
          Do not swap adjectives in for proof. If the page says &ldquo;trusted&rdquo; or &ldquo;innovative&rdquo; but
          shows nothing real nearby, people will not buy it.
        </p>
      }
      formativeCheck={
        <p>
          Point to the evidence that belongs closest to the main claim and explain why it has to
          be there instead of buried three scrolls later.
        </p>
      }
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="What proof should look like"
          title="Treat proof like evidence that sits near the promise."
          body="A proof block is not just a random testimonial area. It is the compact evidence that helps someone believe the page fast enough to keep reading."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <CalloutBand label="Portfolio proof" title="What the block needs" tone="next">
            <ul className="space-y-3 pl-5">
              {proofBlockFields.portfolio.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
          <CalloutBand label="Museum proof" title="What curatorial proof looks like" tone="next">
            <ul className="space-y-3 pl-5">
              {proofBlockFields.museum.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Proof principles"
          title="Three rules keep the evidence doing real work."
          body="These keep proof from turning into filler or drifting too far from the claim it supports."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {workbookPrinciples.map((principle) => (
            <CalloutBand key={principle.title} label={principle.title} title={principle.title} tone="reading">
              <p>{principle.summary}</p>
            </CalloutBand>
          ))}
        </div>
      </section>

      <CalloutBand
        label="Your call to action"
        title="The next step should sound like the same person the page just introduced."
        tone="warning"
      >
        <p>
          Keep the next step in the same voice the page has already established.
        </p>
      </CalloutBand>

      <TonePanel tone="synthesis" className="p-6">
        <p className="type-meta text-(--accent-strong)">Go deeper</p>
        <p className="mt-2 type-body text-(--ink-body)">
          Module 5: Identity and Proof covers evidence types, trust
          mechanics, and portfolio-as-proof in semester depth.
        </p>
        <a
          href="/modules/identity-and-proof"
          className="action-secondary mt-4 inline-block"
        >
          Open Module 5 →
        </a>
      </TonePanel>
    </GuidedStepShell>
  );
}
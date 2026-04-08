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
import { TonePanel } from "@/components/tone-panel";
import {
  museumFailureModes,
  portfolioFailureModes,
  strongWorkItems,
  webPresenceProducts,
  webPresenceTimelineItems,
} from "@/lib/web-presence-site-content";

export const metadata: Metadata = {
  title: "Deliverables",
};

export default function DeliverablesPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <RouteStatusBadge status="Wrapper-specific" />
          <p className="mt-4 type-meta text-(--accent-strong)">Legacy continuity route</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            This old deliverables page now points back to the publish step.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Keep this page for older links or the archived final-review view. The main finish line
            now lives in the Publish step.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tour/publish" className="action-primary">
              Open the publish step
            </Link>
            <Link href="/tour/build" className="action-secondary">
              Return to the build step
            </Link>
          </div>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <RouteContextPanel
          eyebrow="Continuity policy"
          title="Open this only for older links or comparison."
          tone="reflection"
          sections={[
            {
              label: "Open it when",
              content:
                "You landed on an older /deliverables link or need the archived final-review framing while comparing it with the main publish step.",
            },
            {
              label: "Go here now",
              content: (
                <>
                  Finish in <Link href="/tour/publish" className="underline hover:no-underline">/tour/publish</Link>,
                  or jump back to <Link href="/tour/build" className="underline hover:no-underline">/tour/build</Link>{" "}
                  if the build plan still needs work before publishing.
                </>
              ),
            },
            {
              label: "Why it remains",
              content:
                "The older flat deliverables brief is still here for continuity and comparison, but it no longer defines the main finish line.",
            },
          ]}
        />
      </section>

      <ContentGrid minCardWidth="20rem">
        {webPresenceProducts.map((product) => (
          <TonePanel key={product.title} tone="proof" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">{product.audience}</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">{product.title}</h2>
            <p className="mt-3 type-body text-(--ink-body)">{product.summary}</p>

            <p className="mt-5 type-meta text-(--accent-strong)">Must do</p>
            <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body)">
              {product.mustDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-5 type-meta text-(--accent-strong)">Submit</p>
            <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body)">
              {product.submit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-5 type-meta text-(--accent-strong)">Review</p>
            <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body)">
              {product.review.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
        ))}
      </ContentGrid>

      <SequenceTimeline
        title="Last 3 weeks"
        summary="The last three weeks are for tightening the signal, proof, and public readiness of the page, not endlessly reinventing it."
        mode="process"
        items={webPresenceTimelineItems}
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Strong work"
          title="Strong work is clear, believable, and backed up."
          body="Strong work says what it is trying to do, shows real evidence, gets more specific over time, and can explain the decisions behind it."
        />
        <ContentGrid minCardWidth="16rem">
          {strongWorkItems.map((item) => (
            <TonePanel key={item} tone="synthesis" className="card-shell p-5">
              <p className="type-body text-(--ink-body)">{item}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Common mistakes"
          title="Most weak finals fail because the signal or proof is shaky."
          body="These are the common misses. Knowing them early helps you fix the real problem instead of guessing."
        />
        <ContentGrid minCardWidth="19rem">
          <CalloutBand label="Portfolio" title="Common portfolio misses" tone="reading">
            <ul className="space-y-3 pl-5">
              {portfolioFailureModes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
          <CalloutBand label="Museum site" title="Common museum-site misses" tone="reading">
            <ul className="space-y-3 pl-5">
              {museumFailureModes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
        </ContentGrid>
      </section>

      <CalloutBand label="One reminder" title="The right person should get it, trust it, and know what to do next." tone="warning">
        <p>
          The page does not need to look impressive first. It needs to be clear, trustworthy, and
          easy to act on.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
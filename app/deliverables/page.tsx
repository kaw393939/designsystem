import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { SequenceTimeline } from "@/components/educational-primitives";
import { PageShell } from "@/components/page-shell";
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
          <p className="type-meta text-(--accent-strong)">Final deliverable brief</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Keep both finals concrete, public, and easy to evaluate.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            For your final presentations, you will show two live public sites on Zoom: a personal portfolio and a museum site. This page puts the submission requirements, review method, timeline, and common pitfalls in one place so nothing sneaks up on you.
          </p>
        </div>
      </EditorialBand>

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
        title="Three-week timeline"
        summary="The deliverable brief is explicit that the last three weeks are for coherence, proof, and final public readiness rather than for endless reinvention."
        mode="process"
        items={webPresenceTimelineItems}
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Strong work"
          title="Clarity, honesty, and visible proof matter more than perfect polish."
          body="The brief says strong work is work with a clear stated intention, real receipts, increasingly precise agent specs, and a student who can explain the decisions."
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
          eyebrow="Failure modes"
          title="Most weak finals fail at signal, proof, or curation — not at visual polish."
          body="These are the specific mistakes the brief warns about. Knowing them upfront helps you diagnose what to fix instead of guessing."
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

      <CalloutBand label="One reminder" title="The goal is understanding, trust, and action for the right person." tone="warning">
        <p>
          The brief closes on a blunt point: the system is not trying to make a page look impressive. It is trying to make the right person understand the student clearly, trust what they see, and know what to do next.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
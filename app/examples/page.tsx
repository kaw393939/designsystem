import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import {
  outcomeProofExampleCards,
  structuralExampleCards,
} from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Examples",
};

export default function ExamplesPage() {
  return (
    <PageShell>
      <EditorialBand tone="proof" paddingScale="hero">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Recommended support" />
            <p className="mt-4 type-meta text-(--accent-strong)">Example pages</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
              Use examples to see what changes on a real page.
            </h1>
            <p className="mt-6 type-body text-(--ink-body)">
              Come here when you want to see what changed, not just collect inspiration. Some
              examples show finished proof. Others show page patterns you can borrow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/examples/proof-blocks" className="action-primary">
                See how proof works
              </Link>
              <Link href="/examples/student-exemplars" className="action-secondary">
                Open student exemplars
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <RouteVisualPanel plan={routeVisualPlans.examples} />
            <TonePanel tone="reading" className="p-6">
              <p className="type-meta text-(--accent-strong)">How to use examples</p>
              <div className="mt-4 space-y-4 type-body text-(--ink-body)">
                <p>Check what changed.</p>
                <p>Borrow the pattern if it helps.</p>
                <p>Go back once the next move is clearer.</p>
              </div>
            </TonePanel>
          </div>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Outcome proof"
          title="These show what strong proof looks like in a finished page."
          body="Open these when you want to see whether the process actually changed the page, the proof, or the thinking behind it."
        />
        <ContentGrid minCardWidth="18rem">
          {outcomeProofExampleCards.map((example) => (
            <TonePanel key={example.id} tone={example.tone} className="p-6">
              <RouteStatusBadge status={example.status} />
              <p className="mt-4 type-meta text-(--accent-strong)">{example.category}</p>
              <h2 className="mt-2 type-concept text-(--ink-strong)">{example.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{example.summary}</p>
              <p className="mt-4 type-caption text-(--ink-body)">
                <strong>Study this for:</strong> {example.shows}
              </p>
              <p className="mt-2 type-caption text-(--ink-body)">
                <strong>Take back:</strong> {example.feedsBackTo}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={example.href} className="action-primary inline-flex">
                  {example.actionLabel}
                </Link>
                <Link href={example.returnHref} className="action-secondary inline-flex">
                  {example.returnLabel}
                </Link>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Page-pattern examples"
          title="These are page-pattern examples, not finished proof pages."
          body="Use these when you want to borrow a layout that already knows how to orient, pace, or guide a reader clearly."
        />
        <ContentGrid minCardWidth="18rem">
          {structuralExampleCards.map((example) => (
            <TonePanel key={example.id} tone={example.tone} className="p-6">
              <RouteStatusBadge status={example.status} />
              <p className="mt-4 type-meta text-(--accent-strong)">{example.category}</p>
              <h2 className="mt-4 type-concept text-(--ink-strong)">{example.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{example.summary}</p>
              <p className="mt-4 type-caption text-(--ink-body)">
                <strong>Study this for:</strong> {example.shows}
              </p>
              <p className="mt-2 type-caption text-(--ink-body)">
                <strong>Take back:</strong> {example.feedsBackTo}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={example.href} className="action-secondary inline-flex">
                  {example.actionLabel}
                </Link>
                <Link href={example.returnHref} className="action-secondary inline-flex">
                  {example.returnLabel}
                </Link>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand label="Archive" title="Older example links still work, but the strongest current proof pages are here." tone="warning">
        <p>
          Use <Link href="/hero-examples" className="underline hover:no-underline">/hero-examples</Link> if you need the older gallery. For the current proof walkthroughs, start with <Link href="/examples/proof-blocks" className="underline hover:no-underline">/examples/proof-blocks</Link> or <Link href="/examples/student-exemplars" className="underline hover:no-underline">/examples/student-exemplars</Link>.
        </p>
      </CalloutBand>
    </PageShell>
  );
}
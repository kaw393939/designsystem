import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { StudentPortfolioPreviewCard } from "@/components/student-portfolio-preview-card";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import {
  guidedTourSteps,
  siteEntryIntents,
} from "@/lib/site-navigation";
import { studentPortfolioPreviews } from "@/lib/student-portfolio-examples";

export const metadata: Metadata = {
  title: "Start",
};

export default function HomePage() {
  const supportIntents = siteEntryIntents.filter(
    (intent) => intent.id === "reference-browser" || intent.id === "instructor",
  );

  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Entry" />
            <p className="mt-4 type-meta text-(--accent-strong)">Step-by-step build path + extra help</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
              Pick the path that helps you build your site right now.
            </h1>
            <p className="mt-6 type-body text-(--ink-body)">
              Use the tour if you are starting from scratch or stuck. Open browse for
              extra comparisons. Open examples to see finished pages and proof. Build a site that
              feels clear, credible, and ready to share.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tour/signal" className="action-primary">
                Start my site
              </Link>
              <Link href="/tour/build" className="action-secondary">
                Jump back in
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <RouteVisualPanel plan={routeVisualPlans.start} />
            <TonePanel tone="synthesis" className="p-6">
              <p className="type-meta text-(--accent-strong)">The 6 steps</p>
              <ol className="mt-5 space-y-3">
                {guidedTourSteps.map((step, index) => (
                  <li
                    key={step.id}
                    className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.66)] px-4 py-4"
                  >
                    <div className="flex gap-3">
                      <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--border-neutral) text-sm font-semibold text-(--ink-body)">
                        {index + 1}
                      </span>
                      <div>
                        <p className="type-caption font-semibold text-(--ink-strong)">{step.publicLabel}</p>
                        <p className="mt-1 type-annotation text-(--ink-body)">{step.summary}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </TonePanel>
          </div>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Live outputs"
          title="Open finished student portfolios, not just description cards."
          body="These are full pages with their own visual systems and generated artwork. Use them to see how the same process can lead to very different public-facing portfolios."
        />
        <ContentGrid minCardWidth="20rem">
          {studentPortfolioPreviews.map((portfolio) => (
            <StudentPortfolioPreviewCard key={portfolio.slug} portfolio={portfolio} />
          ))}
        </ContentGrid>
        <div className="flex flex-wrap gap-3">
          <Link href="/examples/student-exemplars" className="action-primary inline-flex">
            Open student exemplars
          </Link>
          <Link href="/examples" className="action-secondary inline-flex">
            Open examples family
          </Link>
        </div>
      </section>

      <TonePanel tone="next" className="p-8">
        <p className="type-meta text-(--accent-strong)">Semester path</p>
        <h2 className="mt-3 type-concept text-(--ink-strong)">
          Follow the full course
        </h2>
        <p className="mt-3 type-body text-(--ink-body)">
          Work through the semester path from framework to professional practice,
          with AI foundations, prompting, and proof along the way.
        </p>
        <Link href="/modules" className="action-primary mt-5 inline-flex">
          Open course modules
        </Link>
      </TonePanel>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Need extra help?"
          title="Open support routes when you need comparisons or teaching help, not another restart."
          body="The main hero already handles starting fresh or jumping back in. Use these routes when you need reference depth or facilitation support."
        />
        <ContentGrid minCardWidth="17rem">
          {supportIntents.map((intent) => (
            <TonePanel key={intent.id} tone={intent.tone} className="card-shell p-6">
              <RouteStatusBadge status={intent.status} />
              <h2 className="mt-4 type-concept text-(--ink-strong)">{intent.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{intent.summary}</p>
              <Link href={intent.href} className="action-secondary mt-5 inline-flex w-fit">
                {intent.actionLabel}
              </Link>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand label="Guardrail" title="Do not open every room at once." tone="warning">
        <p>
          If you still do not know who the page is for, what problem it solves, or what people
          should get from it fast, go back to the tour first.
        </p>
      </CalloutBand>
    </PageShell>
  );
}

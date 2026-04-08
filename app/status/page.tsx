import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import {
  PortfolioComparisonVisual,
  StudentPortraitBadge,
} from "@/components/human-signal-visuals";
import { PageShell } from "@/components/page-shell";
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SplitLayout } from "@/components/split-layout";
import { SectionHeading } from "@/components/section-heading";
import { StudentFastPath } from "@/components/student-fast-path";
import { TonePanel } from "@/components/tone-panel";
import { completedItems, pendingItems } from "@/lib/site-content";

const statusReaders = [
  {
    name: "Nina",
    label: "Needs to know which parts of the site are ready to use right now",
    palette: "sage" as const,
  },
  {
    name: "Omar",
    label: "Needs to see the honest line between what is live and what is planned",
    palette: "amber" as const,
  },
];

const statusFastPathSteps = [
  {
    title: "Check what is done",
    summary:
      "Read the completed column first so you know which parts of the site you can rely on right now.",
  },
  {
    title: "Notice what is still in progress",
    summary:
      "Use the pending list to see what is not finished yet — so you do not confuse a plan with a shipped feature.",
  },
  {
    title: "Go back with the right expectations",
    summary:
      "Return to the live site knowing what is solid, what is partial, and what to skip for now.",
  },
] as const;

export default function StatusPage() {
  return (
    <PageShell>
      <EditorialBand tone="proof" paddingScale="hero">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Recommended support" />
            <div className="mt-4">
              <SectionHeading
                eyebrow="Support route · Status"
                title="Use status when you want the honest version of what is done and what is not."
                body="Built, tested, and selected routes count as dependable. Planned or half-finished work does not."
                headingLevel={1}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tour" className="action-primary">
                Open the tour map
              </Link>
              <Link href="/examples" className="action-secondary">
                Open examples
              </Link>
            </div>
          </div>
          <RouteContextPanel
            tone="reading"
            eyebrow="Primary use"
            title="Use status to separate the dependable baseline from future work."
            sections={[
              {
                label: "Open this when",
                content:
                  "You need to know which routes and support pages are dependable right now, which ones are still being hardened, and what should stay out of your assumptions for now.",
              },
              {
                label: "This helps with",
                content:
                  "The difference between live public routes, active support pages, continuity-only wrappers, and items that still belong to future release work.",
              },
              {
                label: "Best next move",
                content:
                  "Read the done and pending columns here, then go back to the live page you actually want to use with the right expectations.",
              },
            ]}
          />
        </div>
      </EditorialBand>

      <StudentFastPath
        label="Quick support path"
        title="Need the honest version, not the hype?"
        summary="Check what is done, note what is still pending, then go back to the live routes with a clean picture of what is actually dependable."
        steps={statusFastPathSteps}
        primaryAction={{
          label: "Open live homepage",
          href: "/",
        }}
        secondaryAction={{
          label: "Review exemplar routes",
          href: "/recipes",
          kind: "secondary",
        }}
        tone="proof"
      />

      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">
              Honest status is part of the product
            </p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              You need a clean line between what is solid and what is still just a plan.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              A polished site should not blur the line between finished work and future work.
            </p>
            <div className="mt-6 space-y-4">
              {statusReaders.map((reader) => (
                <StudentPortraitBadge
                  key={reader.name}
                  name={reader.name}
                  label={reader.label}
                  palette={reader.palette}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/" className="action-primary">
                Open live homepage
              </Link>
              <Link href="/recipes" className="action-secondary">
                Review exemplar routes
              </Link>
            </div>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="proof" className="p-5">
            <PortfolioComparisonVisual
              ariaLabel="Comparison between vague project claims and a clear status boundary"
              beforeLabel="Wishful roadmap"
              afterLabel="Verified baseline"
            />
          </TonePanel>
        }
      />

      <SplitLayout
        primary={
          <CalloutBand
            label="Done"
            title="Already dependable"
            tone="proof"
          >
            <ContentGrid minCardWidth="14rem" className="mt-4">
              {completedItems.map((item) => (
                <TonePanel key={item} tone="reading" className="card-shell p-4">
                  <p className="type-caption text-(--ink-body)">{item}</p>
                </TonePanel>
              ))}
            </ContentGrid>
          </CalloutBand>
        }
        secondary={
          <CalloutBand
            label="Not done yet"
            title="Still not there yet"
            tone="warning"
          >
            <ul className="space-y-3 pl-5">
              {pendingItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
        }
      />
    </PageShell>
  );
}

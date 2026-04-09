import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { ReturnToTourCTA } from "@/components/return-to-tour-cta";
import { TonePanel } from "@/components/tone-panel";
import { studioReviewCriteria } from "@/lib/web-presence-site-content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkpoint",
};

export default function StudioPublishCheckpointPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Checkpoint · Module 6
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Final portfolio review
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Walk through a classmate&apos;s site and answer: would you hire,
            trust, or follow this person based on the first ten seconds?
          </p>
        </div>
      </EditorialBand>

      {/* ── Peer review ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Peer review</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Open your classmate&apos;s live site. Do not read their
            documentation first — experience the site as a real visitor would.
          </li>
          <li>
            Spend ten seconds on the first screen. Write down: Who is this
            for? What do they promise? What archetype does the site project?
          </li>
          <li>
            Scroll through the page. Where is the proof? Does it support the
            promise?
          </li>
          <li>
            Now read their before/after documentation. Does the revision match
            the gap they identified? Did the change improve the page?
          </li>
          <li>
            Answer the central question: based on the first ten seconds, would
            you hire, trust, or follow this person?
          </li>
        </ol>
      </section>

      {/* ── Studio criteria ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Full course review criteria
        </h2>

        <div className="mt-4 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Both products
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
              {studioReviewCriteria.both.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Portfolio-specific
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
              {studioReviewCriteria.portfolio.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Museum-specific
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
              {studioReviewCriteria.museum.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </TonePanel>
        </div>
      </section>

      {/* ── Tour step mapping ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Self-assessment: tour step outputs
        </h2>
        <p className="mt-4 type-body text-(--ink-body)">
          Map every tour step to your final site. Is each output visible?
        </p>
        <ol className="mt-4 list-decimal pl-6 space-y-4 type-body text-(--ink-body)">
          <li>
            <strong className="text-(--ink-strong)">
              Signal: audience and promise are clear on the first screen.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              A visitor can name both within five seconds.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              Archetype: the site projects a coherent identity.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Headline, layout, color, and typography all belong to the same
              archetype.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              Style: visual direction matches the archetype.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              No signal fights the vibe. Layout, color, and type reinforce
              the chosen direction.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              Proof: evidence is visible and supports the promise.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Strongest proof is closest to the claim. No major gaps.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              Build: the page was built from a brief, not improvised.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              You can point to the brief and show how the build followed it.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              Publish: the page is live and you have measured it.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Deployed, tested with real viewers, and revised based on evidence.
            </p>
          </li>
        </ol>
      </section>

      {/* ── Return to tour ── */}
      <ReturnToTourCTA tourSteps={["build", "publish"]} />

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Module 6 complete. The full cycle — Signal → Archetype → Style →
          Proof → Build → Publish → Iterate — is now yours. The site is never
          done. That is the point.
        </p>
        <Link href="/modules" className="action-primary mt-4 inline-block">
          Back to modules →
        </Link>
      </TonePanel>
    </>
  );
}

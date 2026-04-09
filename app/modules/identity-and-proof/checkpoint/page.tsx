import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { ReturnToTourCTA } from "@/components/return-to-tour-cta";
import { TonePanel } from "@/components/tone-panel";
import { studioReviewCriteria } from "@/lib/web-presence-site-content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkpoint",
};

export default function IdentityProofCheckpointPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Checkpoint · Module 5
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Peer review: identity and proof
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Exchange your proof redesign with a classmate. Can they identify
            the identity system and verify the proof?
          </p>
        </div>
      </EditorialBand>

      {/* ── Peer exchange ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Peer exchange</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Swap your claim-evidence map and proof redesign with a partner.
            Read their materials before looking at their actual site.
          </li>
          <li>
            Now open their site. Spend five seconds on the first screen. Can
            you identify the identity system — audience, archetype, visual
            direction — from the first read alone?
          </li>
          <li>
            Walk through the proof section. Does each claim have supporting
            evidence? Is the strongest evidence closest to the promise?
          </li>
        </ol>
      </section>

      {/* ── Review questions ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Review questions
        </p>
        <ol className="mt-3 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Can you name the identity system — audience, archetype, and
            visual direction — from looking at the site?
          </li>
          <li>
            Do the identity signals align or contradict each other?
          </li>
          <li>
            Is there evidence visible before the first scroll?
          </li>
          <li>
            Where is the biggest gap between a claim and its proof?
          </li>
        </ol>
      </TonePanel>

      {/* ── Studio criteria ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Studio review criteria
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

      {/* ── Self-assessment ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Self-assessment</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-4 type-body text-(--ink-body)">
          <li>
            <strong className="text-(--ink-strong)">
              I can map a site&apos;s identity signals and find contradictions.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Audience, archetype, visual direction, and proof — each one either
              reinforces or undermines the others.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I can name five types of evidence and rank them by strength.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Case studies beat credentials. Metrics beat descriptions.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I can evaluate whether a portfolio proves what it claims.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Every claim needs evidence. Every orphaned proof element needs
              a claim to connect to.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I redesigned a proof section using the evidence tier framework.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Strongest evidence closest to the promise. Weakest evidence
              removed or strengthened.
            </p>
          </li>
        </ol>
      </section>

      {/* ── Return to tour ── */}
      <ReturnToTourCTA tourSteps={["proof"]} />

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Module 5 complete. You now have the identity-proof system: coherent
          signals, evidence that lands, and a portfolio that proves itself.
          Continue to Module 6 to learn the full build-review-publish cycle.
        </p>
        <Link
          href="/modules/studio-and-publish"
          className="action-primary mt-4 inline-block"
        >
          Continue to Module 6 →
        </Link>
      </TonePanel>
    </>
  );
}

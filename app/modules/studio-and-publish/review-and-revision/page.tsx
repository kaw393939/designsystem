import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Review and revision",
};

export default function ReviewAndRevisionPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 2 · Module 6
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Review and revision
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Studio critique as a skill — how to give feedback that moves work
            forward, and how to receive it without losing your way.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Building a page is half the work. The other half is learning from
          the gap between what you intended and what the page actually
          communicates. Review is how you find that gap. Revision is how you
          close it.
        </p>
      </TonePanel>

      {/* ── How to give feedback ── */}
      <section>
        <SectionHeading
          eyebrow="Giving"
          title="How to give feedback"
          body="Name the page job, check against the brief, suggest one concrete change."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Name the page job
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Before critiquing, state what you believe the page is trying to
              do. &ldquo;This page is trying to convince a hiring manager that
              you can lead design projects.&rdquo; If you are wrong, the
              feedback conversation starts with alignment rather than argument.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Check against the brief
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Good feedback is criteria-based, not taste-based. The brief
              defines the audience, archetype, proof elements, and promise.
              Check each one. &ldquo;The brief says Sage archetype but the
              layout feels Explorer&rdquo; is useful. &ldquo;I don&apos;t
              like the colors&rdquo; is not.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Suggest one concrete change
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              End with one specific, actionable suggestion. Not a redesign —
              a single move that would improve the page the most. &ldquo;Move
              the case study link above the fold&rdquo; is actionable.
              &ldquo;Make it better&rdquo; is not.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── How to receive feedback ── */}
      <section>
        <SectionHeading
          eyebrow="Receiving"
          title="How to receive feedback"
          body="Separate taste from criteria. You decide what to change."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Not all feedback is equal. Criteria-based feedback (&ldquo;the
            proof is below the fold&rdquo;) points to a verifiable gap
            between brief and build. Taste-based feedback (&ldquo;I would
            have used a different font&rdquo;) reflects the reviewer&apos;s
            preference, not a flaw in the page.
          </p>
          <TonePanel tone="reflection" className="p-6">
            <p className="type-body text-(--ink-body)">
              The reviewer does not own your page. You decide what to change.
              Revision is iteration, not surrender. The goal is to close the
              gap between intention and result — not to satisfy every opinion.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Peer review template ── */}
      <section>
        <SectionHeading
          eyebrow="Template"
          title="Peer review prompts"
          body="Structured questions for a productive studio review."
        />

        <div className="mt-6 space-y-3">
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">1.</span>{" "}
              What is the page job? (State it before reading the brief.)
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">2.</span>{" "}
              Does the first screen communicate the promise and archetype?
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">3.</span>{" "}
              Is evidence visible before the first scroll?
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">4.</span>{" "}
              Where is the biggest gap between the brief and the build?
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">5.</span>{" "}
              What one change would improve the page the most?
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Classroom frame ── */}
      <TonePanel tone="next" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Before next class
        </p>
        <p className="mt-2 type-body text-(--ink-body)">
          Revise your page based on the review you received. Document what you
          changed and why. Bring the before-and-after to class.
        </p>
        <a
          href="/modules/studio-and-publish/deployment-and-iteration"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 3 →
        </a>
      </TonePanel>
    </>
  );
}

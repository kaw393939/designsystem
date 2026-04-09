import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add proof and publish",
};

export default function ProofAndPublishPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 4 · Module 1
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Add proof and publish
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            What counts as proof, how to turn it into a build brief, and why
            publishing is a feedback loop — not a finish line.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson combines three tour steps — Proof, Build, and Publish —
          into a single pass. By the end you will know what evidence your site
          needs, how to hand that off as a build brief, and what happens after
          you hit deploy.
        </p>
      </TonePanel>

      {/* ── What counts as proof ── */}
      <section>
        <SectionHeading
          eyebrow="Proof"
          title="What counts as proof"
          body="Evidence tiers, trust signals, and where proof belongs on the page."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Proof is anything that makes the promise believable. A portfolio
            site needs proof that you can do the work: shipped projects,
            measurable outcomes, process documentation. A museum site needs
            proof of editorial judgment: curated collections, sourced content,
            visible research.
          </p>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Evidence tiers
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Not all proof carries the same weight. A live project link beats a
              screenshot. A screenshot beats a description. A description beats
              nothing. Place your strongest evidence closest to the promise.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Trust signals
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Trust is built by consistency. If the headline promises expertise,
              the proof must show expertise — not potential. If the archetype
              says Sage, the citations and source handling must be impeccable.
              Every mismatch costs trust.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── The build brief ── */}
      <section>
        <SectionHeading
          eyebrow="Build"
          title="The build brief as a handoff artifact"
          body="A build brief is not a to-do list. It is a contract between intention and execution."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            The brief captures everything the builder (or agent) needs to
            execute: the audience, the archetype, the visual direction, and the
            specific proof elements the page must include. If someone else read
            your brief, they should be able to build a recognizable version of
            the page without asking questions.
          </p>
          <p className="type-body text-(--ink-body)">
            You will write a full build brief in the practice activity. For now,
            understand that the brief is the pivot point: everything before it
            is decisions, and everything after it is execution.
          </p>
        </div>
      </section>

      {/* ── Publishing as a feedback loop ── */}
      <section>
        <SectionHeading
          eyebrow="Publish"
          title="Publishing is a feedback loop"
          body="The first deployment is not the end — it is the first measurement."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Publish, then watch. Does the page communicate the promise in the
            first five seconds? Does the proof appear before the visitor scrolls
            away? Does the visual direction match the archetype when seen on a
            real screen instead of a mockup?
          </p>
          <p className="type-body text-(--ink-body)">
            Every answer you dislike is a revision target, not a failure. The
            framework cycles: Signal → Archetype → Style → Proof → Build →
            Publish → measure → revise.
          </p>
        </div>
      </section>

      {/* ── Full walk-through links ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          For the full walk-throughs, see{" "}
          <Link
            href="/tour/proof"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Proof tour
          </Link>
          ,{" "}
          <Link
            href="/tour/build"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Build tour
          </Link>
          , and{" "}
          <Link
            href="/tour/publish"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Publish tour
          </Link>
          . To explore trust and proof patterns, visit{" "}
          <Link
            href="/browse/attention-trust"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the trust and proof room
          </Link>
          .
        </p>
      </TonePanel>

      {/* ── Classroom frame ── */}
      <TonePanel tone="next" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Before next class
        </p>
        <p className="mt-2 type-body text-(--ink-body)">
          Write a build brief before next class. You will hand it to a
          classmate for peer review.
        </p>
        <Link
          href="/modules/web-presence-framework/practice"
          className="action-primary mt-4 inline-block"
        >
          Continue to Practice →
        </Link>
      </TonePanel>
    </>
  );
}

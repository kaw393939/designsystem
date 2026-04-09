import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building proof that lands",
};

export default function BuildingProofPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 2 · Module 5
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Building proof that lands
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Types of evidence, where to place them, and the mechanics of trust
            — what makes proof believable versus what makes visitors
            suspicious.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Module 1 introduced evidence tiers and trust signals. This lesson
          goes deeper: the full taxonomy of proof, specific placement strategy,
          and the attention-trust arc that determines whether evidence
          registers or gets scrolled past.
        </p>
      </TonePanel>

      {/* ── Types of evidence ── */}
      <section>
        <SectionHeading
          eyebrow="Taxonomy"
          title="Types of evidence"
          body="Case studies, metrics, testimonials, process documentation, and credentials."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Case studies
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The strongest proof format for portfolios. A case study shows the
              problem, the process, and the result — letting the visitor verify
              competence rather than taking it on faith.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Metrics
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Numbers that demonstrate impact: conversion rates, load times,
              satisfaction scores. Effective when specific and verifiable.
              Suspect when vague or without context.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Testimonials
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Third-party validation. Strong when attributed to a named person
              with a role. Weak when anonymous or generic. The best
              testimonials reference the specific skill being claimed.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Process documentation
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Sketches, wireframes, decision logs, before/after comparisons.
              Process proof demonstrates thinking, not just output.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Credentials
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Education, certifications, affiliations. The weakest standalone
              proof — but essential context that frames everything else.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Placement strategy ── */}
      <section>
        <SectionHeading
          eyebrow="Strategy"
          title="Where proof belongs on the page"
          body="Proof relative to claims — placement determines whether evidence registers."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Place your strongest evidence closest to the promise. If the
            headline claims expertise, the first thing below it should
            demonstrate expertise — not describe it. Every scroll that
            separates a claim from its proof is a chance for the visitor to
            leave unconvinced.
          </p>
          <TonePanel tone="reflection" className="p-6">
            <p className="type-body text-(--ink-body)">
              Test: hide everything below the fold. Does the first screen
              contain at least one piece of real evidence? If not, the page is
              asking for trust before earning it.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Trust mechanics ── */}
      <section>
        <SectionHeading
          eyebrow="Mechanics"
          title="Trust mechanics"
          body="What makes evidence believable and what makes visitors suspicious."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Believable evidence
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Specific, verifiable, attributable. &ldquo;Increased sign-ups by
              34% over six months for Acme Corp&rdquo; beats &ldquo;helped
              companies grow.&rdquo; The visitor can check. That is the point.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Suspicious evidence
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Vague, anonymous, or disproportionate to the claim. A student
              portfolio claiming &ldquo;award-winning design&rdquo; without
              naming the award triggers skepticism rather than trust.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── The attention-trust arc ── */}
      <section>
        <SectionHeading
          eyebrow="Arc"
          title="The attention-trust arc"
          body="First scan → interest → investigation → trust."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Visitors do not arrive trusting your page. They arrive scanning.
            The arc moves from a quick first read (does this look credible?) to
            interest (I want to know more) to investigation (let me check the
            evidence) to trust (I believe this person can do what they claim).
            Your page must serve each stage in order.
          </p>
          <p className="type-body text-(--ink-body)">
            Most portfolios fail at the transition from scan to interest.
            The first read does not give the visitor enough reason to scroll.
            Fix the first read and the rest of the arc gets easier.
          </p>
        </div>
      </section>

      {/* ── Full walk-through links ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          For the full framework, see{" "}
          <Link
            href="/tour/proof"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Proof tour
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
          Audit the proof on your own site. For each claim, name the evidence
          that supports it. Where are the gaps?
        </p>
        <Link
          href="/modules/identity-and-proof/portfolio-as-proof"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 3 →
        </Link>
      </TonePanel>
    </>
  );
}

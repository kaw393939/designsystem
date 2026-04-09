import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Professional practice",
};

export default function ProfessionalPracticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 4 · Module 6
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Professional practice
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            A site is a living artifact, not a one-time project. Maintenance
            rhythm, content freshness, and knowing when your site needs to
            change because you have changed.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson is the only one in the course that looks past the
          semester. It treats your site as a professional tool you will
          maintain for years — not a class project you will abandon after
          grading.
        </p>
      </TonePanel>

      {/* ── Living artifact ── */}
      <section>
        <SectionHeading
          eyebrow="Mindset"
          title="A living artifact"
          body="The best professional site is the one that still represents you accurately."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            A portfolio from three years ago that still represents your work
            is more effective than a flashy site from last month that no longer
            reflects your direction. The goal is not constant redesign — it is
            ongoing alignment between who you are and what the page says.
          </p>
          <p className="type-body text-(--ink-body)">
            Every career has inflection points: a new role, a skill shift, a
            change in audience. At each one, the identity system needs a
            check: is the audience still right? Does the archetype still fit?
            Does the proof still support the promise?
          </p>
        </div>
      </section>

      {/* ── Maintenance rhythm ── */}
      <section>
        <SectionHeading
          eyebrow="Rhythm"
          title="What to check and when"
          body="Monthly, quarterly, and yearly maintenance keeps a site honest."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Monthly
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Broken links, outdated contact information, stale project
              descriptions. These are credibility leaks — small but corrosive.
              A five-minute check prevents the slow erosion of trust.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Quarterly
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Project recency: is the newest work still recent? Testimonial
              freshness: do the endorsements reflect current relationships?
              Technology: are dependencies current and the build still clean?
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Yearly
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Full identity check. Run the Signal → Archetype → Style →
              Proof audit from Module 1. Has your audience shifted? Has your
              work changed enough that the archetype no longer fits? This is
              the moment to decide: iterate or redesign.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Content freshness ── */}
      <section>
        <SectionHeading
          eyebrow="Freshness"
          title="When content goes stale"
          body="Credentials, projects, and testimonials all have expiration dates."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            A three-year-old case study is still valuable if the problem and
            solution are relevant. A three-year-old testimonial from a company
            that no longer exists is a liability. The test: if a visitor
            checked, would the evidence hold up? If not, replace it.
          </p>
          <TonePanel tone="warning" className="p-6">
            <p className="type-body text-(--ink-body)">
              A site that has not been updated in two years tells the visitor
              something — even if you did not intend the message. Stale content
              reads as abandoned ambition.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Career inflection points ── */}
      <section>
        <SectionHeading
          eyebrow="Change"
          title="Career inflection points"
          body="When a site needs to change because you have changed."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            A career pivot — from IC to manager, from agency to product, from
            one field to another — is an identity system change. The audience
            shifts, the proof requirements shift, and often the archetype
            shifts. Recognizing inflection points early lets you redesign
            deliberately instead of discovering the mismatch when it costs you
            an opportunity.
          </p>
          <TonePanel tone="reflection" className="p-6">
            <p className="type-body text-(--ink-body)">
              Ask yourself once a year: if I were hiring for my current role,
              would this site convince me? If the answer is no, the identity
              system is out of date.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Technology maintenance ── */}
      <section>
        <SectionHeading
          eyebrow="Technical"
          title="Technology maintenance"
          body="Dependencies, accessibility audits, and performance."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Keeping dependencies current is not glamorous but it is
            professional. Outdated libraries introduce security
            vulnerabilities. Broken builds mean the site cannot be updated
            when an opportunity arrives. A quarterly dependency check and an
            annual accessibility audit are the minimum maintenance for a
            professional site.
          </p>
        </div>
      </section>

      {/* ── Classroom frame ── */}
      <TonePanel tone="next" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Before next class
        </p>
        <p className="mt-2 type-body text-(--ink-body)">
          Write a one-page maintenance plan for your site. Include monthly,
          quarterly, and yearly checks. Name the first career inflection point
          that would trigger a redesign.
        </p>
        <a
          href="/modules/studio-and-publish/practice"
          className="action-primary mt-4 inline-block"
        >
          Continue to Practice →
        </a>
      </TonePanel>
    </>
  );
}

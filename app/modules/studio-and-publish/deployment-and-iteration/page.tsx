import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deployment and iteration",
};

export default function DeploymentAndIterationPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 3 · Module 6
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Deployment and iteration
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Publishing is the beginning of measurement, not the end of work.
            What to check after launch and how to decide what to fix.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson deepens the Publish tour step. You will learn what to
          check after a page goes live, how to measure the gap between
          intention and result, and when to iterate versus when to redesign.
        </p>
      </TonePanel>

      {/* ── What to check after launch ── */}
      <section>
        <SectionHeading
          eyebrow="Measurement"
          title="What to check after launch"
          body="Three questions that reveal whether the page is working."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Does the first read land?
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Ask someone who has never seen the page to look at it for five
              seconds. Can they state the audience, the promise, and the
              archetype? If not, the first screen needs work.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Does the proof register?
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              After 30 seconds on the page, can the visitor name one piece of
              evidence that supports the promise? If the proof is there but
              invisible, it is a placement problem. If it is not there, it is a
              content problem.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Do people take the intended action?
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The page has a job. If visitors are not clicking, scrolling, or
              contacting, the gap is between what the page asks and what the
              page earns. Trust precedes action.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Deciding what to fix ── */}
      <section>
        <SectionHeading
          eyebrow="Priority"
          title="Deciding what to fix"
          body="The biggest gap between intention and result."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            You will always find more to improve than you have time to fix.
            The rule: find the single biggest gap between what the page
            intends and what the page delivers. Fix that first. One high-impact
            change beats five minor tweaks.
          </p>
          <TonePanel tone="reflection" className="p-6">
            <p className="type-body text-(--ink-body)">
              If the first read does not land, no amount of footer polish will
              save the page. Work from the top of the funnel down: identity
              signal → proof placement → secondary content → details.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Iterate vs. redesign ── */}
      <section>
        <SectionHeading
          eyebrow="Decision"
          title="When to iterate vs. when to redesign"
          body="Small fixes compound. Full redesigns are expensive."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Iterate when
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The identity system is sound but proof placement, copy, or
              layout details are off. Small targeted changes — moving
              evidence above the fold, tightening the headline, swapping a
              weak image — can transform a page without starting over.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Redesign when
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The identity system itself is wrong. If the audience has changed,
              the archetype was never right, or the visual direction fights
              the promise, iteration cannot fix it. Redesign means revisiting
              Signal → Archetype → Style from the beginning.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Full walk-through link ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          For the full walk-through, see{" "}
          <Link
            href="/tour/publish"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Publish tour
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
          Deploy your revised page. Run the three-question check with someone
          who has not seen it. Document what you learn.
        </p>
        <Link
          href="/modules/studio-and-publish/professional-practice"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 4 →
        </Link>
      </TonePanel>
    </>
  );
}

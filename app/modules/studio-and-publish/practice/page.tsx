import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Practice",
};

export default function StudioPublishPracticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Practice · Module 6
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Publish a real revision
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Ship a meaningful change to your own site. Document the before and
            after, name the one biggest change, and identify what you would
            fix next.
          </p>
        </div>
      </EditorialBand>

      {/* ── Task ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Your task</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Choose one page on your site to revise. Pick the page where the
            gap between intention and result is largest — usually the homepage
            or primary landing page.
          </li>
          <li>
            Capture the &ldquo;before&rdquo; state: a screenshot and a
            one-paragraph description of what the page currently communicates
            in the first five seconds.
          </li>
          <li>
            Make the revision. Use everything from the course: identity
            signals, proof placement, archetype alignment, build brief,
            and the review feedback you received.
          </li>
          <li>
            Publish the revised page to your live site. This is not a mockup
            exercise — deploy the real change.
          </li>
          <li>
            Capture the &ldquo;after&rdquo; state: a screenshot and a
            one-paragraph description of what the page now communicates.
          </li>
          <li>
            Write a short reflection: What was the one biggest change? Why
            did it matter? What would you fix next?
          </li>
        </ol>
      </section>

      {/* ── Documentation template ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Before/after documentation
        </h2>
        <div className="mt-4 space-y-3">
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">
                Before:
              </span>{" "}
              Screenshot + one paragraph: what the page communicated in the
              first five seconds.
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">
                After:
              </span>{" "}
              Screenshot + one paragraph: what the page communicates now.
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">
                The one change:
              </span>{" "}
              Name the single most important change you made and why it
              matters.
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">
                Next fix:
              </span>{" "}
              What would you change next, and why did you not do it this time?
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Tips ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">Tips</p>
        <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
          <li>
            The revision does not need to be dramatic. Moving proof above the
            fold, tightening a headline, or aligning the visual direction with
            the archetype can transform a page without a redesign.
          </li>
          <li>
            Deploying forces accountability. A revision that lives on a local
            machine is a plan. A revision that lives on the internet is a
            decision.
          </li>
          <li>
            The &ldquo;next fix&rdquo; is as important as the change you made.
            It proves you can see further than one step ahead.
          </li>
        </ul>
      </TonePanel>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Bring your before/after documentation to class for the final
          checkpoint review.
        </p>
        <a
          href="/modules/studio-and-publish/checkpoint"
          className="action-primary mt-4 inline-block"
        >
          Continue to Checkpoint →
        </a>
      </TonePanel>
    </>
  );
}

import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "From brief to build",
};

export default function FromBriefToBuildPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 1 · Module 6
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            From brief to build
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Turning a build brief into a working page — decision hierarchy,
            constraints, and connecting to agentic workflow.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Module 1 introduced the build brief as a handoff artifact. This
          lesson goes deeper: how to read a brief, decide what to build first,
          work within constraints, and use agents as build partners.
        </p>
      </TonePanel>

      {/* ── Turning brief into structure ── */}
      <section>
        <SectionHeading
          eyebrow="Process"
          title="Reading a brief as a builder"
          body="The brief is a contract. Your job is to honor it, not interpret it creatively."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Start by identifying the non-negotiables: audience, archetype,
            proof elements, and the one-sentence promise. These are
            constraints, not suggestions. Everything else — layout details,
            color specifics, image choices — is a decision you make within
            those constraints.
          </p>
          <p className="type-body text-(--ink-body)">
            A good brief eliminates most decisions. A great brief makes the
            remaining decisions obvious. If you find yourself making choices
            the brief does not guide, the brief has a gap — go back and fill
            it before building.
          </p>
        </div>
      </section>

      {/* ── Decision hierarchy ── */}
      <section>
        <SectionHeading
          eyebrow="Hierarchy"
          title="What to build first"
          body="The first screen, then the proof section, then everything else."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              First screen
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The headline, the hero area, and the first signal. If the first
              screen does not communicate the promise and the archetype, nothing
              below it matters. Build this first and test it in isolation.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Proof section
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The first evidence block. Place your strongest proof closest to
              the promise. This is where trust is won or lost — build it second,
              before spending time on navigation or footer details.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Everything else
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Navigation, secondary sections, footer, about page. These
              matter, but they do not determine whether the visitor stays. Defer
              them until the first screen and proof section are solid.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Working with constraints ── */}
      <section>
        <SectionHeading
          eyebrow="Reality"
          title="Working with constraints"
          body="Time, skill, tools, and content gaps — every build has them."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            No build happens in ideal conditions. You will run out of time, lack
            a skill, hit a tool limitation, or discover that the content you
            need does not exist yet. The decision is always the same: what
            produces the strongest first read with the resources available?
          </p>
          <TonePanel tone="reflection" className="p-6">
            <p className="type-body text-(--ink-body)">
              Connecting to Module 3: this is where agentic workflow pays off.
              A clear brief given to an AI tool can handle layout scaffolding,
              content structure, and even first-draft copy — freeing you to
              focus on proof placement and identity alignment.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Full walk-through link ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          For the full walk-through, see{" "}
          <a
            href="/tour/build"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Build tour
          </a>
          .
        </p>
      </TonePanel>

      {/* ── Classroom frame ── */}
      <TonePanel tone="next" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Before next class
        </p>
        <p className="mt-2 type-body text-(--ink-body)">
          Take a build brief (yours or a classmate&apos;s) and build the first
          screen. Bring it to class for studio review.
        </p>
        <a
          href="/modules/studio-and-publish/review-and-revision"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 2 →
        </a>
      </TonePanel>
    </>
  );
}

import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Who is this for",
};

export default function WhoIsThisForPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 1 · Module 1
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Who is this for
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Every effective page starts with the same question: who will read
            this, and what do they need to believe?
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson unpacks the Signal step — the first move in the
          framework. By the end you will be able to name your audience, state
          their need, and write a one-sentence promise your site must keep.
        </p>
      </TonePanel>

      {/* ── The audience-first rule ── */}
      <section>
        <SectionHeading
          eyebrow="Principle"
          title="The audience-first rule"
          body="Name a person, not a demographic."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            &ldquo;Design professionals&rdquo; is a demographic.
            &ldquo;A hiring manager scanning portfolios during her lunch
            break&rdquo; is a person. The more specific the person, the sharper
            every decision that follows — layout, tone, proof placement, even
            how long the headline can be.
          </p>
          <p className="type-body text-(--ink-body)">
            You are not excluding everyone else. You are designing for the one
            person whose reaction matters most. If the page works for her, it
            will work for most people like her.
          </p>
        </div>
      </section>

      {/* ── What they need to believe ── */}
      <section>
        <SectionHeading
          eyebrow="Framework"
          title="What they need to believe"
          body="After the first read — before they scroll, before they click — what must be true in their mind?"
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Need
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The visitor arrives with a need — even if they cannot articulate
              it. A portfolio visitor needs to believe this person can do the
              work. A museum visitor needs to believe this site is worth their
              time.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Promise
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Your promise is what changes if they keep reading. It is not a
              tagline — it is the contract between the page and the person.
              &ldquo;You will see exactly what I can build and why it
              matters&rdquo; is a promise. &ldquo;Welcome to my portfolio&rdquo;
              is not.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Common mistakes ── */}
      <section>
        <SectionHeading
          eyebrow="Avoid"
          title="Common mistakes"
          body="Starting from what you want to show instead of what they need to see."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              &ldquo;I want to show my best work&rdquo;
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              That is your need, not theirs. Start instead with: what does the
              visitor need to see to trust you? The answer may include your best
              work — but it will be framed differently.
            </p>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              &ldquo;My audience is everyone&rdquo;
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              If you design for everyone, you design for no one. A page that
              tries to speak to every possible visitor ends up speaking to none
              of them with enough conviction to earn trust.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Full walk-through link ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          For the full walk-through of the Signal step, see{" "}
          <a
            href="/tour/signal"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Signal tour
          </a>
          . For a quick page opener example, see{" "}
          <a
            href="/examples"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the examples room
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
          Write down one sentence naming your audience and their need. Come to
          class ready to say it out loud.
        </p>
        <a
          href="/modules/web-presence-framework/pick-the-vibe"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 2 →
        </a>
      </TonePanel>
    </>
  );
}

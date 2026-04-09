import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { editorialRubric } from "@/lib/module-content/visual-ai";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial judgment",
};

export default function EditorialJudgmentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="synthesis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 3 · Module 4
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Editorial judgment
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Knowing how to generate an image is not the same as knowing when
            you should. This lesson is about the decision that comes before the
            prompt.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Every generated image carries an implicit claim: &ldquo;this is what
          this looks like.&rdquo; When the subject is conceptual, the claim is
          harmless. When the subject is a real person, place, or event — the
          claim is dangerous unless the image is real.
        </p>
      </TonePanel>

      {/* ── The trust test ── */}
      <section>
        <SectionHeading
          eyebrow="Principle"
          title="The trust test"
          body="A single framework for deciding whether to generate, photograph, or skip the image entirely."
        />

        <div className="mt-6 space-y-5">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Generate when the image is conceptual
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Concept illustrations, decorative heroes, abstract diagrams,
              mood-setting section dividers, mood boards during the Style step,
              placeholder art during development (replaced before publish), and
              pattern textures or abstract backgrounds — these are honest uses.
              The viewer understands they are seeing an illustration, not
              evidence.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Photograph when the image is evidentiary
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Real people, real places, real events. If the image would appear
              alongside a factual claim — someone&apos;s face, a building, a
              timeline of verified events — it must be a real photograph from a
              verified source. This includes testimonial photos, product shots,
              team photos, documentary images, and proof elements like portfolio
              pieces or case studies.
            </p>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Skip when the image adds nothing
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              A mediocre image is worse than whitespace. If you cannot produce
              something that genuinely helps the reader&apos;s understanding,
              good typography and negative space are more honest — and more
              effective.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── When to generate vs. photograph ── */}
      <section>
        <SectionHeading
          eyebrow="Decision matrix"
          title="When to generate vs. photograph"
          body="A quick reference for the two most common choices."
        />

        {/* Desktop table */}
        <div className="mt-6 hidden lg:block overflow-x-auto">
          <table className="w-full type-body text-(--ink-body) border-collapse">
            <thead>
              <tr className="border-b border-(--border-strong)">
                <th className="py-3 pr-6 text-left type-meta text-(--ink-strong)">
                  Situation
                </th>
                <th className="py-3 pr-6 text-left type-meta text-(--ink-strong)">
                  Use
                </th>
                <th className="py-3 text-left type-meta text-(--ink-strong)">
                  Why
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-soft)">
              <tr>
                <td className="py-3 pr-6">Section hero for a concept lesson</td>
                <td className="py-3 pr-6">Generate</td>
                <td className="py-3">
                  No factual claim. The image sets a mood.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Portrait of Alan Turing</td>
                <td className="py-3 pr-6">Photograph</td>
                <td className="py-3">
                  Real person. Generating a &ldquo;portrait&rdquo; of a real
                  person is fabrication.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Diagram of a neural network</td>
                <td className="py-3 pr-6">Generate or design</td>
                <td className="py-3">
                  Abstract concept. A clean generated diagram may work, but a
                  hand-designed SVG is even better.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Screenshot of a real product</td>
                <td className="py-3 pr-6">Screenshot</td>
                <td className="py-3">
                  Evidentiary. A generated version would be misleading.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-6">
                  Team photo for a case study
                </td>
                <td className="py-3 pr-6">Photograph</td>
                <td className="py-3">
                  Real people. Using generated faces would erode trust.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-6 space-y-4 lg:hidden">
          {[
            {
              situation: "Section hero for a concept lesson",
              use: "Generate",
              why: "No factual claim. The image sets a mood.",
            },
            {
              situation: "Portrait of Alan Turing",
              use: "Photograph",
              why: "Real person. Generating a portrait of a real person is fabrication.",
            },
            {
              situation: "Diagram of a neural network",
              use: "Generate or design",
              why: "Abstract concept. A clean generated diagram may work, but a hand-designed SVG is even better.",
            },
            {
              situation: "Screenshot of a real product",
              use: "Screenshot",
              why: "Evidentiary. A generated version would be misleading.",
            },
            {
              situation: "Team photo for a case study",
              use: "Photograph",
              why: "Real people. Using generated faces would erode trust.",
            },
          ].map((row) => (
            <TonePanel key={row.situation} tone="reading" className="p-5">
              <p className="type-meta text-(--accent-strong)">{row.use}</p>
              <p className="mt-1 font-semibold type-body text-(--ink-strong)">
                {row.situation}
              </p>
              <p className="mt-2 type-body text-(--ink-body)">{row.why}</p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Editorial rubric checklist ── */}
      <section>
        <SectionHeading
          eyebrow="Checklist"
          title="Editorial rubric"
          body="Run through these six questions before you publish any generated image."
        />

        <div className="mt-6 space-y-4">
          {editorialRubric.map((item, index) => (
            <TonePanel key={item.id} tone="reading" className="p-6">
              <p className="type-meta text-(--accent-strong)">
                {index + 1}. {item.question}
              </p>
              <p className="mt-2 type-body text-(--ink-body)">
                {item.guidance}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Three scenarios ── */}
      <section>
        <SectionHeading
          eyebrow="Practice"
          title="Apply the rubric: three scenarios"
          body="Walk through each scenario with the six-question rubric."
        />

        <div className="mt-6 space-y-5">
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Scenario A</p>
            <p className="mt-2 font-semibold type-body text-(--ink-strong)">
              You need a hero image for a lesson about backpropagation.
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The subject is conceptual — there is no factual claim. A concept
              illustration showing layered networks with signal flow is
              appropriate. Run the rubric: no real person, no misleading claim,
              decorative purpose, tone match supported by style cues.{" "}
              <strong className="text-(--ink-strong)">Generate.</strong>
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Scenario B</p>
            <p className="mt-2 font-semibold type-body text-(--ink-strong)">
              You want to show what the Dartmouth workshop looked like.
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The subject is historical — specific people at a specific place.
              A generated image would claim to depict something real. Use a
              documented photograph if available. If none exists, describe the
              event in text and use a conceptual illustration of the era
              instead.{" "}
              <strong className="text-(--ink-strong)">
                Photograph or describe in text.
              </strong>
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Scenario C</p>
            <p className="mt-2 font-semibold type-body text-(--ink-strong)">
              A student blog post needs a header image fast.
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Speed is not a justification for deception. If the blog post
              discusses a real topic with a real case study, a decorative
              abstract hero is fine — but a generated &ldquo;photo&rdquo; of
              the case study subjects is not. Run the rubric with every
              shortcut.{" "}
              <strong className="text-(--ink-strong)">
                Generate decorative only.
              </strong>
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Quality threshold ── */}
      <section>
        <SectionHeading
          eyebrow="Quality"
          title="The quality threshold"
          body="Generation is easy. Quality is not."
        />

        <TonePanel tone="warning" className="mt-6 p-6">
          <p className="type-body text-(--ink-body)">
            A generated image that is almost-right is often worse than no
            image. Subtle distortions — wrong number of fingers, smeared text,
            impossible reflections — activate the viewer&apos;s uncanny-valley
            response. If you cannot iterate to a clean result, use typography,
            whitespace, or a simple gradient. Your page&apos;s credibility
            depends on not publishing visual noise. See{" "}
            <Link
              href="/tour/proof"
              className="underline text-(--accent-strong) hover:text-(--accent-hover)"
            >
              the proof tour
            </Link>{" "}
            for how this course handles image quality decisions.
          </p>
        </TonePanel>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          You now have a framework for deciding when to generate, when to
          photograph, and when to skip. Next: put it all together in practice.
        </p>
        <Link
          href="/modules/visual-ai/practice"
          className="action-primary mt-4 inline-block"
        >
          Continue to Practice →
        </Link>
      </TonePanel>
    </>
  );
}

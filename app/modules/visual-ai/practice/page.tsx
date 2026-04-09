import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import { editorialRubric } from "@/lib/module-content/visual-ai";

export const metadata: Metadata = {
  title: "Practice",
};

export default function VisualAIPracticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Practice · Module 4
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Generate three hero images
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Apply what you learned in Lessons 1–3 by writing prompts, generating
            images, evaluating them against the editorial rubric, and iterating.
          </p>
        </div>
      </EditorialBand>

      {/* ── Task ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Your task</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Choose three pages from this course (or from a project of your own)
            that need a hero image.
          </li>
          <li>
            For each page, write a prompt using the{" "}
            <strong className="text-(--ink-strong)">six-part anatomy</strong>{" "}
            from Lesson 2 — subject, style, composition, mood, technical, and
            negative prompts.
          </li>
          <li>
            Generate the image. Then run the{" "}
            <strong className="text-(--ink-strong)">editorial rubric</strong>{" "}
            from Lesson 3. Record your answers for each question.
          </li>
          <li>
            <strong className="text-(--ink-strong)">Iterate at least once</strong>{" "}
            — refine, vary, or extend — and note what you changed and why.
          </li>
          <li>
            Write a one-paragraph annotation for each final image: what the
            prompt does, what the trade-offs are, and whether the image passed
            the rubric.
          </li>
        </ol>
      </section>

      {/* ── Rubric reminder ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Editorial rubric — quick reference
        </h2>
        <div className="mt-4 space-y-3">
          {editorialRubric.map((item, index) => (
            <TonePanel key={item.id} tone="reading" className="p-5">
              <p className="type-meta text-(--accent-strong)">
                {index + 1}. {item.question}
              </p>
              <p className="mt-1 type-caption text-(--ink-body)">
                {item.guidance}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Tips ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">Tips</p>
        <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
          <li>
            Start with the specificity ladder: write a vague prompt, then a
            better one, then the precise version.
          </li>
          <li>
            Use the cliché list as a negative checklist — if your result matches
            one of the four clichés, iterate.
          </li>
          <li>
            Record every prompt, even the bad ones. Iteration history is part of
            the deliverable.
          </li>
          <li>
            Time-box each image to 15 minutes. The goal is judgment, not
            perfection.
          </li>
        </ul>
      </TonePanel>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Once you have three annotated images with rubric evaluations, move to
          the checkpoint for peer review.
        </p>
        <a
          href="/modules/visual-ai/checkpoint"
          className="action-primary mt-4 inline-block"
        >
          Continue to Checkpoint →
        </a>
      </TonePanel>
    </>
  );
}

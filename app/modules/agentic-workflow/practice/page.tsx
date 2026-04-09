import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import { briefSections, briefRubric } from "@/lib/module-content/agentic-workflow";

export const metadata: Metadata = {
  title: "Practice",
};

export default function PracticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Practice · Module 3
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Practice: Write a build brief and test it
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Write a brief for a real page revision, give it to an AI tool, and
            evaluate what comes back using the rubric from Lesson 2.
          </p>
        </div>
      </EditorialBand>

      {/* ── Task ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Your task</h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 type-body text-(--ink-body)">
          <li>
            Pick a page from a site you have access to — your portfolio, a class
            project, or a template. Choose something that needs improvement.
          </li>
          <li>
            Write a build brief using the five-section template below. Fill in
            every section — do not skip constraints or acceptance criteria.
          </li>
          <li>
            Give the brief to an AI tool (ChatGPT, Claude, Copilot — any one).
            Paste the brief as your first message. Do not add extra context.
          </li>
          <li>
            Evaluate the output using the quality rubric. Write down which
            criteria the output meets and which it misses.
          </li>
          <li>
            Revise either the brief or the output (your choice) and note what
            changed.
          </li>
        </ol>
      </section>

      {/* ── Brief template ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Five-section brief template
        </h2>
        <p className="mt-2 type-body text-(--ink-body)">
          Copy this structure into a new document. Replace the example text with
          your own.
        </p>

        <div className="mt-6 space-y-4">
          {briefSections.map((section, index) => (
            <TonePanel key={section.id} tone="reading" className="p-5">
              <p className="font-semibold type-body text-(--ink-strong)">
                {index + 1}. {section.title}
              </p>
              <p className="mt-2 type-body text-(--ink-body)">
                {section.definition}
              </p>
              <p className="mt-2 type-caption text-(--ink-body) italic">
                Example: {section.example}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Evaluation rubric ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Evaluation rubric
        </h2>
        <p className="mt-2 type-body text-(--ink-body)">
          After you get the AI output, check it against each of these questions.
          A good output should pass all six.
        </p>

        <ol className="mt-6 space-y-4">
          {briefRubric.map((item, index) => (
            <li
              key={item.id}
              className="rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.56)] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--accent-strong) text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold type-body text-(--ink-strong)">
                    {item.question}
                  </p>
                  <p className="mt-1 type-caption text-(--ink-body)">
                    Tip: {item.tip}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Tips ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Tips for getting better results
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 type-body text-(--ink-body)">
          <li>
            Be specific in your constraints. &ldquo;Keep it short&rdquo; is
            vague. &ldquo;Maximum 150 words, no jargon, reading level
            grade 10&rdquo; is testable.
          </li>
          <li>
            If the first output misses the mark, revise the brief — not just
            the follow-up prompt. The brief is the lever.
          </li>
          <li>
            Check for hallucination. If the output includes facts, dates, or
            names, verify them before using the output.
          </li>
          <li>
            Start a new conversation if the model starts ignoring your
            constraints — the context window may have overflowed.
          </li>
        </ul>
      </TonePanel>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Bring your brief, the AI output, and your evaluation notes to the
          checkpoint session. You will trade briefs with a classmate and compare
          results.
        </p>
        <a
          href="/modules/agentic-workflow/checkpoint"
          className="action-primary mt-4 inline-block"
        >
          Continue to Checkpoint →
        </a>
      </TonePanel>
    </>
  );
}

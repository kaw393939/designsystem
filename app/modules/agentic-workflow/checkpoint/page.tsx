import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkpoint",
};

export default function CheckpointPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Checkpoint · Module 3
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Checkpoint: Trade briefs, compare outputs
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            The best way to learn what makes a good brief is to see what happens
            when someone else writes one for the same task.
          </p>
        </div>
      </EditorialBand>

      {/* ── Peer comparison ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Peer comparison</h2>

        <div className="mt-4 space-y-4">
          <ol className="list-decimal space-y-3 pl-6 type-body text-(--ink-body)">
            <li>
              Pair up with a classmate. Exchange your briefs from the practice
              exercise — do not share the AI output yet.
            </li>
            <li>
              Read your partner&apos;s brief. Without running it through an AI
              tool, predict what the output will look like. Write down your
              prediction in 2–3 sentences.
            </li>
            <li>
              Now share the actual AI outputs. Compare your prediction with what
              the AI produced. Where did the brief guide the output well? Where
              did it leave room for the AI to drift?
            </li>
            <li>
              Together, identify the single change to each brief that would most
              improve the output.
            </li>
          </ol>
        </div>
      </section>

      {/* ── Discussion questions ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Discussion questions
        </h2>

        <div className="mt-4 space-y-4">
          <TonePanel tone="reflection" className="p-6">
            <ol className="list-decimal space-y-4 pl-5 type-body text-(--ink-body)">
              <li>
                <strong className="text-(--ink-strong)">
                  Which section of the brief had the most impact on the output?
                </strong>
                <p className="mt-1 type-caption text-(--ink-body)">
                  Was it the role, the constraints, or the acceptance criteria?
                  Why?
                </p>
              </li>
              <li>
                <strong className="text-(--ink-strong)">
                  Did the AI hallucinate anything?
                </strong>
                <p className="mt-1 type-caption text-(--ink-body)">
                  If yes, what kind of claim did it invent? Could you have caught
                  it without checking?
                </p>
              </li>
              <li>
                <strong className="text-(--ink-strong)">
                  Would you put your name on the AI output as-is?
                </strong>
                <p className="mt-1 type-caption text-(--ink-body)">
                  If not, what would you change? Distinguish between problems in
                  the brief versus problems in the AI&apos;s execution.
                </p>
              </li>
              <li>
                <strong className="text-(--ink-strong)">
                  What surprised you about the difference between the two briefs&apos;
                  outputs?
                </strong>
                <p className="mt-1 type-caption text-(--ink-body)">
                  Same task, different briefs, different results. What does that
                  tell you about the role of the person writing the brief?
                </p>
              </li>
            </ol>
          </TonePanel>
        </div>
      </section>

      {/* ── Studio review ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Studio review</h2>

        <div className="mt-4 space-y-4">
          <p className="type-body text-(--ink-body)">
            As a class, review 2–3 brief/output pairs. For each one, answer:
          </p>

          <ul className="list-disc space-y-2 pl-6 type-body text-(--ink-body)">
            <li>
              Did the brief give the AI enough information to succeed?
            </li>
            <li>
              Did the constraints prevent the most common failure modes
              (hallucination, scope drift, wrong tone)?
            </li>
            <li>
              What is the minimum viable brief — the fewest sections you can
              write and still get a usable output?
            </li>
          </ul>

          <TonePanel tone="emphasis" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              The takeaway
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The brief is the product. The AI output is a draft. Your job is
              not to prompt better — it is to think more clearly about what you
              want before you ask.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Self-assessment ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Self-assessment</h2>

        <div className="mt-4 space-y-4">
          <p className="type-body text-(--ink-body)">
            Before moving on, check yourself against these three criteria:
          </p>

          <ol className="list-decimal space-y-4 pl-6 type-body text-(--ink-body)">
            <li>
              <strong className="text-(--ink-strong)">
                Can I explain the difference between a chatbot and an agent?
              </strong>
              <p className="mt-1 type-caption text-(--ink-body)">
                If not, revisit Lesson 1. The distinction is the foundation for
                everything in this module.
              </p>
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                Can I write a five-section brief from scratch?
              </strong>
              <p className="mt-1 type-caption text-(--ink-body)">
                Not from the template — from memory. If you need to look up the
                sections, practice once more.
              </p>
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                Can I identify at least one hallucination risk in any AI output?
              </strong>
              <p className="mt-1 type-caption text-(--ink-body)">
                The verification mindset is a habit, not a checklist. If you
                catch yourself trusting output without checking, pause.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          You now know how to write a brief, give it to an AI tool, and evaluate
          the result. That is the agentic workflow. Next up: Module 4 on visual
          AI — how to prompt for images with editorial judgment.
        </p>
        <Link
          href="/modules/visual-ai"
          className="action-primary mt-4 inline-block"
        >
          Continue to Module 4 →
        </Link>
      </TonePanel>
    </>
  );
}

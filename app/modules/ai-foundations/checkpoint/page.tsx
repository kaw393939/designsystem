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
            Checkpoint · Module 2
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Checkpoint: Explain it without jargon
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            The test of understanding is whether you can explain a concept to
            someone who has never heard of it — without using technical terms.
          </p>
        </div>
      </EditorialBand>

      {/* ── Self-check ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Self-check</h2>

        <div className="mt-4 space-y-4">
          <p className="type-body text-(--ink-body)">
            Pick one concept from this module and explain it to a classmate in
            plain language. Choose from:
          </p>

          <ul className="list-disc space-y-2 pl-6 type-body text-(--ink-body)">
            <li>
              <strong className="text-(--ink-strong)">Embedding</strong> — what
              it means for a word to become a list of numbers
            </li>
            <li>
              <strong className="text-(--ink-strong)">Latent space</strong> —
              the learned map of meaning that a model builds during training
            </li>
            <li>
              <strong className="text-(--ink-strong)">Transformer</strong> —
              the architecture behind GPT, Claude, and every modern language
              model
            </li>
            <li>
              <strong className="text-(--ink-strong)">Foundation model</strong>
              — a large model trained on broad data that can be adapted to many
              tasks
            </li>
          </ul>

          <TonePanel tone="emphasis" className="p-6">
            <p className="type-meta text-(--accent-strong)">The rule</p>
            <p className="mt-2 type-body text-(--ink-body)">
              Your explanation must make sense to someone who has never taken
              this course. Use an analogy, a comparison, or a story — not a
              definition.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Peer review ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Peer review</h2>

        <div className="mt-4 space-y-4">
          <p className="type-body text-(--ink-body)">
            Listen to a classmate&apos;s explanation. Then answer this question:
          </p>

          <TonePanel tone="reflection" className="p-6">
            <p className="text-center font-semibold type-body text-(--ink-strong)">
              &ldquo;Could someone who has never heard of AI understand
              this?&rdquo;
            </p>
          </TonePanel>

          <p className="type-body text-(--ink-body)">
            If the answer is no, help your classmate find where the explanation
            assumes knowledge the listener does not have. The goal is not to be
            simple — it is to be clear.
          </p>
        </div>
      </section>

      {/* ── Self-assessment rubric ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Self-assessment rubric
        </h2>

        <div className="mt-4 space-y-4">
          <p className="type-body text-(--ink-body)">
            After giving your explanation, check yourself against these three
            criteria:
          </p>

          <ol className="list-decimal space-y-4 pl-6 type-body text-(--ink-body)">
            <li>
              <strong className="text-(--ink-strong)">
                Did I name a specific concept, not just &ldquo;AI&rdquo;?
              </strong>
              <p className="mt-1 type-caption text-(--ink-body)">
                &ldquo;AI is cool&rdquo; is not an explanation.
                &ldquo;Embeddings turn words into numbers so the model can
                measure similarity&rdquo; is.
              </p>
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                Did I use an analogy or comparison instead of technical terms?
              </strong>
              <p className="mt-1 type-caption text-(--ink-body)">
                &ldquo;Think of latent space as a map where nearby locations
                have similar meanings&rdquo; works. &ldquo;A high-dimensional
                vector representation space&rdquo; does not.
              </p>
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                Did I connect it to something the listener already knows?
              </strong>
              <p className="mt-1 type-caption text-(--ink-body)">
                &ldquo;You know how autocomplete on your phone suggests the
                next word? That is the same prediction loop, just bigger&rdquo;
                — this connects new knowledge to existing experience.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          If you can explain these concepts clearly, you have the foundation for
          the rest of the course. Next up: Module 3 on agentic workflow — where
          you learn the difference between chatting with AI and orchestrating it
          with a brief.
        </p>
        <Link
          href="/modules/agentic-workflow"
          className="action-primary mt-4 inline-block"
        >
          Continue to Module 3 →
        </Link>
      </TonePanel>
    </>
  );
}

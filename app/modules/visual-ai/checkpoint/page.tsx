import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkpoint",
};

export default function VisualAICheckpointPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Checkpoint · Module 4
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Peer review: visual AI
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Exchange your three annotated images and prompts with a peer.
            Evaluate each other&apos;s work using the editorial rubric and the
            discussion questions below.
          </p>
        </div>
      </EditorialBand>

      {/* ── Peer exchange ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Peer exchange</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Share your three final images, prompts, iteration history, and
            rubric answers with a partner.
          </li>
          <li>
            For each of your partner&apos;s images, run the editorial rubric
            independently — do not read their answers first.
          </li>
          <li>
            Compare your rubric answers. Where you disagree, discuss why —
            the disagreement is often more instructive than the answer.
          </li>
        </ol>
      </section>

      {/* ── Discussion questions ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Discussion questions
        </p>
        <ol className="mt-3 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            <strong className="text-(--ink-strong)">Trust:</strong> Could any
            of these images be mistaken for a photograph of something real? If
            so, is that a problem in context?
          </li>
          <li>
            <strong className="text-(--ink-strong)">Specificity:</strong> Is
            the prompt specific enough that you could reproduce something
            similar? Did more specific prompts produce better images?
          </li>
          <li>
            <strong className="text-(--ink-strong)">Tone match:</strong> Do
            the generated images match the editorial tone of their target
            pages? Would a visitor notice a mismatch?
          </li>
          <li>
            <strong className="text-(--ink-strong)">Iteration:</strong> What
            was the most useful change made during iteration? What would you
            try next?
          </li>
          <li>
            <strong className="text-(--ink-strong)">First read:</strong> Does
            the image help the first read, or does it compete with the text?
            Would no image have been better?
          </li>
        </ol>
      </TonePanel>

      {/* ── Self-assessment ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Self-assessment</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-4 type-body text-(--ink-body)">
          <li>
            <strong className="text-(--ink-strong)">
              I can write a structured prompt using the six-part anatomy.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Subject, style, composition, mood, technical, negative — you can
              identify and use each part.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I can evaluate a generated image against an editorial rubric.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              You know when to generate, photograph, or skip — and you can
              justify the decision.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I understand why specificity produces better results.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              You can explain how prompt specificity narrows the model&apos;s
              search in latent space.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I can iterate meaningfully — refine, vary, or extend.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              You change one parameter at a time and learn from each iteration.
            </p>
          </li>
        </ol>
      </section>

      {/* ── Studio question ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Studio question
        </p>
        <p className="mt-2 type-body text-(--ink-body) italic">
          &ldquo;Would you put your name on this page with this image?&rdquo;
        </p>
        <p className="mt-3 type-body text-(--ink-body)">
          The editorial rubric is not a checklist to pass — it is a thinking
          tool. The most important skill this module teaches is not prompt
          engineering. It is the judgment to know when an image helps the reader
          and when it gets in the way.
        </p>
      </TonePanel>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Module 4 complete. You can now prompt for images, judge when
          generation helps, and spot when it hurts. Next up: Module 5 on
          identity and proof — building a coherent identity system and
          evidence strategy.
        </p>
        <Link
          href="/modules/identity-and-proof"
          className="action-primary mt-4 inline-block"
        >
          Continue to Module 5 →
        </Link>
      </TonePanel>
    </>
  );
}

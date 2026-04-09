import type { Metadata } from "next";
import Image from "next/image";

import { EditorialBand } from "@/components/editorial-band";
import { EmbeddingsDiagram } from "@/components/embeddings-diagram";
import { MathBlock } from "@/components/math-block";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How models learn",
};

export default function HowModelsLearnPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 2 · Module 2
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            How models learn
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            You do not need to be a mathematician. You need to understand what
            happens when you type a prompt — from words to numbers to meaning.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson walks through the pipeline step by step: words become
          numbers, numbers capture meaning, and the model uses that meaning to
          generate a response. Every concept here connects to something you will
          do when you write prompts.
        </p>
      </TonePanel>

      {/* ── Section 1: Words as numbers ── */}
      <section>
        <SectionHeading
          eyebrow="Step 1"
          title="Words as numbers"
          body="Each word gets turned into a list of numbers called an embedding. The numbers encode meaning, not just spelling."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            When you type a prompt, the model does not read words. It converts
            each token — roughly a word or word-piece — into a vector: a list of
            numbers that represents its meaning.
          </p>

          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">
              What an embedding looks like
            </p>
            <p className="mt-3 text-center type-body">
              <MathBlock
                tex="\\mathbf{e} = [e_1, e_2, \\ldots, e_n]"
                display
                label="A vector e is a list of numbers from e-1 to e-n"
              />
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              Each{" "}
              <MathBlock tex="e_i" label="e sub i" /> is a number. A typical
              model uses hundreds or thousands of dimensions — far more than we
              can picture, but the principle is the same as placing a pin on a
              map.
            </p>
          </TonePanel>

          <p className="type-body text-(--ink-body)">
            The key insight: words with similar meanings get similar numbers.
            &ldquo;Dog&rdquo; and &ldquo;puppy&rdquo; end up close together.
            &ldquo;Dog&rdquo; and &ldquo;spreadsheet&rdquo; are far apart.
            The model learns these positions during training — nobody hand-codes
            them.
          </p>
        </div>
      </section>

      {/* ── Section 2: Similarity as closeness ── */}
      <section>
        <SectionHeading
          eyebrow="Step 2"
          title="Similarity as closeness"
          body="Words that mean similar things end up near each other in this space. We measure closeness with cosine similarity."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            If two vectors point in nearly the same direction, their meanings
            are related. The technical name is <strong>cosine similarity</strong>
            : it measures the angle between two vectors.
          </p>

          <TonePanel tone="reading" className="p-6">
            <p className="text-center type-body">
              <MathBlock
                tex="\\text{similarity}(\\mathbf{a}, \\mathbf{b}) = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\| \\, \\|\\mathbf{b}\\|}"
                display
                label="Cosine similarity of vectors a and b equals the dot product of a and b divided by their magnitudes"
              />
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              Close to 1 means very similar. Close to 0 means unrelated. You
              never need to compute this yourself — the model does it billions
              of times during training and inference.
            </p>
          </TonePanel>

          <EmbeddingsDiagram />

          <p className="type-body text-(--ink-body)">
            The diagram above shows how embeddings power retrieval: your query
            becomes a vector, the system finds the nearest stored vectors, and
            those retrieved passages become context for the language model&apos;s
            response.
          </p>
        </div>
      </section>

      {/* ── Section 3: Latent space ── */}
      <section>
        <SectionHeading
          eyebrow="Step 3"
          title="Latent space — the learned map of meaning"
          body="Think of it as a map the model builds during training. Every word, sentence, and concept gets a location."
        />

        <Image
          src="/media/modules/generated/latent-space-landscape-v1.webp"
          alt="Visualization of a latent space landscape — a terrain map where nearby peaks represent similar concepts"
          width={960}
          height={480}
          loading="lazy"
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            The space of all embeddings forms what researchers call a{" "}
            <strong>latent space</strong>. &ldquo;Latent&rdquo; means hidden —
            these dimensions are not visible to us, but the model uses them
            constantly.
          </p>

          <p className="type-body text-(--ink-body)">
            Neighboring regions in latent space capture related ideas. Move in
            one direction and the tone shifts from formal to casual. Move in
            another and the topic shifts from cooking to chemistry. The model
            navigates this space every time it generates a word.
          </p>

          <TonePanel tone="reflection" className="p-6">
            <p className="type-meta text-(--accent-strong)">
              Why this matters for prompting
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              When you write a clear, specific prompt, you are giving the model
              better coordinates. Vague prompts land in a crowded region of
              latent space where many possible responses overlap. Specific
              prompts point to a smaller, more useful neighborhood.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Section 4: The pipeline ── */}
      <section>
        <SectionHeading
          eyebrow="Step 4"
          title="The pipeline: token → representation → attention → output"
          body="Here is what happens inside the model when you type a prompt."
        />

        <Image
          src="/media/modules/generated/representation-learning-bridge.webp"
          alt="Diagram showing the pipeline from text tokens through representation learning to model output"
          width={960}
          height={480}
          loading="lazy"
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <div className="mt-6 space-y-4">
          <ol className="space-y-6 type-body text-(--ink-body)">
            <li>
              <strong className="text-(--ink-strong)">1. Tokenization.</strong>{" "}
              Your text is split into tokens — roughly words or word-pieces. Each
              token gets an ID.
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                2. Embedding lookup.
              </strong>{" "}
              Each token ID is converted to a vector (the embedding). Now the
              model has numbers instead of text.
            </li>
            <li>
              <strong className="text-(--ink-strong)">3. Self-attention.</strong>{" "}
              The model looks at every token in relation to every other token.
              This is the &ldquo;attention&rdquo; in &ldquo;Attention Is All You
              Need.&rdquo; It lets the model understand context — what
              &ldquo;it&rdquo; refers to, which words modify which.
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                4. Feed-forward layers.
              </strong>{" "}
              The contextualized representations pass through dense layers that
              transform and combine information.
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                5. Output prediction.
              </strong>{" "}
              The model predicts the next most likely token. Then it feeds that
              prediction back in and repeats — one token at a time — until the
              response is complete.
            </li>
          </ol>

          <TonePanel tone="emphasis" className="p-6">
            <p className="type-body text-(--ink-body)">
              This entire pipeline runs in the Transformer architecture — the
              same design behind GPT, Claude, Gemini, and every modern
              foundation model. The details vary, but the pattern is always:
              tokenize, embed, attend, predict.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Section 5: Why this matters ── */}
      <section>
        <SectionHeading
          eyebrow="Takeaway"
          title="Why this matters for your work"
          body="Understanding the pipeline helps you write better prompts and evaluate model output more clearly."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            When you write a clear prompt, you are giving the model better
            coordinates to work with. When the model hallucinates, it is
            because it landed in a region of latent space where plausible-
            sounding text exists but truth does not.
          </p>

          <p className="type-body text-(--ink-body)">
            You do not need to understand the math to use these tools well. But
            knowing that the model works with learned representations —
            not understanding — helps you stay honest about what it can and
            cannot do.
          </p>
        </div>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Now you know how models turn words into meaning and meaning into
          responses. Next, meet the people who built these systems — and
          understand why their choices shaped the tools you use today.
        </p>
        <Link
          href="/modules/ai-foundations/the-people-who-built-this"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 3 →
        </Link>
      </TonePanel>
    </>
  );
}

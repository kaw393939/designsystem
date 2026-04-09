import type { Metadata } from "next";
import Image from "next/image";

import { EditorialBand } from "@/components/editorial-band";
import { PersonProfileGrid } from "@/components/person-profile-grid";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  comparisonRows,
  concepts,
} from "@/lib/module-content/agentic-workflow";
import { getPeopleByEraCluster } from "@/lib/module-content/ai-foundations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chatbot vs. agent",
};

/* ------------------------------------------------------------------ */
/*  Portrait helpers                                                  */
/* ------------------------------------------------------------------ */

const portraitSlugs = ["andrej-karpathy", "sam-altman", "dario-amodei"];

function selectedPortraits() {
  const all = getPeopleByEraCluster("Foundation models");
  return all
    .filter((p) => portraitSlugs.includes(p.id))
    .map((p) => ({
      name: p.name,
      era: p.era,
      role: p.role,
      summary: p.summary,
      imageSrc: p.portraitSrc,
    }));
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ChatbotVsAgentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="next" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 1 · Module 3
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Chatbot vs. agent
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            You have probably used ChatGPT. That is the chatbot pattern. There
            is a different way to work — and it changes what you can build.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson introduces the distinction between asking AI a question
          and giving it structured instructions. By the end, you will
          understand why the same tool can produce wildly different results
          depending on how you use it.
        </p>
      </TonePanel>

      {/* ── Key concepts ── */}
      <section>
        <SectionHeading
          eyebrow="Vocabulary"
          title="Key concepts"
          body="Six terms you will use throughout this module. Each one has a plain-language definition."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {concepts.map((c) => (
            <TonePanel key={c.id} tone="reading" className="p-5">
              <p className="font-semibold type-body text-(--ink-strong)">
                {c.term}
              </p>
              <p className="mt-2 type-caption text-(--ink-body)">
                {c.definition}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── What happens when you type a prompt ── */}
      <section>
        <SectionHeading
          eyebrow="Background"
          title="What happens when you type a prompt"
          body="A simplified version of the pipeline from Module 2 — just enough to explain why the model sounds confident even when wrong."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            When you type a prompt, the model converts your words to numbers,
            finds the region of its learned space that matches, and predicts the
            most likely next tokens — one at a time — until the response is
            complete.
          </p>
          <p className="type-body text-(--ink-body)">
            The key insight: <strong>the model predicts likely text, not true
            text.</strong> Confidence in the output comes from statistical
            patterns in training data, not from understanding or verification.
            This is why the same model can write a perfect email and fabricate a
            citation in the same session.
          </p>
        </div>
      </section>

      {/* ── The chatbot pattern ── */}
      <section>
        <SectionHeading
          eyebrow="Pattern 1"
          title="The chatbot pattern"
          body="How most people use AI: ask a question, get an answer, hope it is right."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            The chatbot pattern is conversational. You type a question, the
            model answers, you type a follow-up. It works like texting a
            knowledgeable friend — except the friend sometimes invents facts
            and never tells you when it is unsure.
          </p>

          <TonePanel tone="next" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              When the chatbot pattern works
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 type-body text-(--ink-body)">
              <li>Quick lookups you can verify (&ldquo;What is the CSS property for…&rdquo;)</li>
              <li>Brainstorming when you will filter the results yourself</li>
              <li>Casual exploration of an unfamiliar topic</li>
            </ul>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              When it breaks
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 type-body text-(--ink-body)">
              <li>Anything that needs to be <em>correct</em> — the model will not flag its own errors</li>
              <li>Anything that needs to be <em>consistent</em> — each response is stateless</li>
              <li>Anything that needs to be <em>buildable</em> — open-ended answers rarely match real constraints</li>
            </ul>
          </TonePanel>
        </div>
      </section>

      {/* ── The agent pattern ── */}
      <section>
        <SectionHeading
          eyebrow="Pattern 2"
          title="The agent pattern"
          body="What changes when you give AI a structured brief instead of an open question."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            The agent pattern replaces open conversation with structured
            instruction. Instead of &ldquo;Make my About page better,&rdquo;
            you give the model a brief that names the role, defines the scope,
            lists constraints, and includes acceptance criteria.
          </p>

          <TonePanel tone="emphasis" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              The loop: brief → orchestrate → verify
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 type-body text-(--ink-body)">
              <li>
                <strong>Brief:</strong> Write a document clear enough that a
                classmate could follow it.
              </li>
              <li>
                <strong>Orchestrate:</strong> Give the brief to the AI tool. Let
                it execute step by step.
              </li>
              <li>
                <strong>Verify:</strong> Check the output against the brief. Did
                it follow the constraints? Are the claims true?
              </li>
            </ol>
          </TonePanel>
        </div>
      </section>

      {/* ── Side-by-side comparison ── */}
      <section>
        <SectionHeading
          eyebrow="Comparison"
          title="Side by side"
          body="The same six dimensions, two different approaches."
        />

        <div className="mt-6 space-y-4">
          {/* Desktop: table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full border-collapse type-body">
              <thead>
                <tr className="border-b border-(--border-strong)">
                  <th className="p-3 text-left font-semibold text-(--ink-strong)">
                    Dimension
                  </th>
                  <th className="p-3 text-left font-semibold text-(--ink-strong)">
                    Chatbot pattern
                  </th>
                  <th className="p-3 text-left font-semibold text-(--ink-strong)">
                    Agent pattern
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.dimension}
                    className="border-b border-(--border-strong)/40"
                  >
                    <td className="p-3 font-medium text-(--ink-strong)">
                      {row.dimension}
                    </td>
                    <td className="p-3 text-(--ink-body)">{row.chatbot}</td>
                    <td className="p-3 text-(--ink-body)">{row.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="space-y-4 lg:hidden">
            {comparisonRows.map((row) => (
              <div
                key={row.dimension}
                className="rounded-(--radius-card) border border-(--border-strong) p-4"
              >
                <p className="font-semibold type-meta text-(--accent-strong)">
                  {row.dimension}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <p className="type-meta text-(--ink-strong)">Chatbot</p>
                    <p className="mt-1 type-caption text-(--ink-body)">
                      {row.chatbot}
                    </p>
                  </div>
                  <div>
                    <p className="type-meta text-(--ink-strong)">Agent</p>
                    <p className="mt-1 type-caption text-(--ink-body)">
                      {row.agent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why this matters for building sites ── */}
      <section>
        <SectionHeading
          eyebrow="Connection"
          title="Why this matters for building sites"
          body="Your build brief from the tour is already an AI brief — if you write it clearly enough."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            If you followed the tour, you already have a build brief. The same
            document that tells a classmate what to build can tell an AI tool
            what to build — as long as it is specific enough. The next lesson
            shows you exactly how to make it specific.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Image
              src="/media/modules/generated/era-7-foundation-models.webp"
              alt="Foundation models era — token embeddings radiating outward with human silhouettes at interfaces"
              width={480}
              height={320}
              loading="lazy"
              className="w-full rounded-(--radius-card)"
            />
            <Image
              src="/media/modules/generated/openai-public-ai.webp"
              alt="Modern AI research office representing the public AI deployment era"
              width={480}
              height={320}
              loading="lazy"
              className="w-full rounded-(--radius-card)"
            />
          </div>

          <PersonProfileGrid
            people={selectedPortraits()}
            className="mt-6"
          />
        </div>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          The difference is not the tool. It is the instruction. Next: how to
          write briefs that actually work.
        </p>
        <Link
          href="/modules/agentic-workflow/writing-briefs"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 2 →
        </Link>
      </TonePanel>
    </>
  );
}

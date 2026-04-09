import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { PersonProfileGrid } from "@/components/person-profile-grid";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { limitationCategories } from "@/lib/module-content/agentic-workflow";
import { getPeopleByEraCluster } from "@/lib/module-content/ai-foundations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "When AI helps and when it does not",
};

/* ------------------------------------------------------------------ */
/*  Portrait helper                                                   */
/* ------------------------------------------------------------------ */

function yudkowskyPortrait() {
  const all = getPeopleByEraCluster("Foundation models");
  return all
    .filter((p) => p.id === "eliezer-yudkowsky")
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

export default function HonestLimitsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="next" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 3 · Module 3
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            When AI helps and when it does not
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            AI tools are powerful, but they are not reliable in the way a
            calculator is reliable. Here is what to watch for.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson is about honest limits — not to discourage you from using
          AI, but to help you use it without getting burned. The verification
          mindset from Lesson 1 gets concrete here.
        </p>
      </TonePanel>

      {/* ── Hallucination ── */}
      <section>
        <SectionHeading
          eyebrow="Limit 1"
          title="Hallucination"
          body="The model generates text that sounds correct but is factually wrong or invented."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Why it happens: the model predicts likely next tokens, not true
            statements. It has no internal fact-checker. When the training data
            is sparse on a topic, the model fills in with plausible-sounding
            text — which can be entirely fiction.
          </p>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Concrete example
            </p>
            <p className="mt-2 type-body text-(--ink-body) italic">
              The model says: &ldquo;The CRAP test for evaluating web sources
              was developed by Dr. Sarah Johnson at Stanford University in
              2004.&rdquo;
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              It sounds authoritative. The acronym is real. But the name, the
              university, and the year are all invented. This is hallucination —
              confidently wrong output that you would only catch by checking.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              How to spot it
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 type-body text-(--ink-body)">
              <li>Check facts against primary sources, not just the model&apos;s output</li>
              <li>Watch for vague authority claims (&ldquo;research shows&rdquo;, &ldquo;experts agree&rdquo;)</li>
              <li>Be suspicious of perfect-sounding citations with specific names and dates</li>
              <li>If it sounds too clean, verify — real sources are messy</li>
            </ul>
          </TonePanel>
        </div>
      </section>

      {/* ── Context windows and memory ── */}
      <section>
        <SectionHeading
          eyebrow="Limit 2"
          title="Context windows and memory"
          body="The context window is the text the model can 'see' at once — and it is smaller than you think."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Every AI model has a fixed context window — the maximum amount of
            text it can process in a single conversation. When the conversation
            exceeds the window, the model silently drops earlier instructions.
            It does not tell you it has forgotten.
          </p>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Practical implication
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 type-body text-(--ink-body)">
              <li>
                Long conversations degrade — the model loses track of constraints
                you set 20 messages ago
              </li>
              <li>
                Structured briefs within the window work better than sprawling
                conversations
              </li>
              <li>
                If the output starts ignoring your instructions, the context
                window may have overflowed — start a new conversation with the
                brief
              </li>
            </ul>
          </TonePanel>
        </div>
      </section>

      {/* ── The verification mindset ── */}
      <section>
        <SectionHeading
          eyebrow="Mindset"
          title="The verification mindset"
          body="Check the output, not the confidence. The model sounds sure about everything — that is how it works."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Three questions to ask about any AI output before you use it:
          </p>

          <ol className="list-decimal space-y-3 pl-6 type-body text-(--ink-body)">
            <li>
              <strong className="text-(--ink-strong)">
                Does this match my brief?
              </strong>{" "}
              Check scope, constraints, and acceptance criteria.
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                Can I verify the claims?
              </strong>{" "}
              If the output states facts, can you confirm them from a source you
              trust?
            </li>
            <li>
              <strong className="text-(--ink-strong)">
                Would I put my name on this?
              </strong>{" "}
              If the answer is no, the output needs work — regardless of how
              polished it sounds.
            </li>
          </ol>

          <TonePanel tone="reflection" className="p-6">
            <p className="type-body text-(--ink-body)">
              <strong>Connection to the proof framework:</strong> In the tour,
              you learned that proof means real evidence — not claims that sound
              good. The same rule applies to AI output. If the model generates a
              testimonial, a statistic, or a citation, treat it as a draft until
              you verify it.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── When to use AI and when not to ── */}
      <section>
        <SectionHeading
          eyebrow="Categories"
          title="When to use AI and when not to"
          body="Three categories — helps, struggles, fails — so you know what to expect before you start."
        />

        <div className="mt-6 space-y-6">
          {limitationCategories.map((cat) => (
            <TonePanel key={cat.id} tone={cat.tone} className="p-6">
              <p className="font-semibold type-body text-(--ink-strong)">
                {cat.label}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 type-body text-(--ink-body)">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TonePanel>
          ))}
        </div>

        <div className="mt-8">
          <PersonProfileGrid people={yudkowskyPortrait()} />
        </div>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          The best use of AI is when you can verify the output. The worst is
          when you cannot tell whether it is right. Now put all three lessons
          into practice: write a brief, give it to an AI tool, and evaluate what
          comes back.
        </p>
        <Link
          href="/modules/agentic-workflow/practice"
          className="action-primary mt-4 inline-block"
        >
          Continue to Practice →
        </Link>
      </TonePanel>
    </>
  );
}

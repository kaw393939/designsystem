import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { SequenceTimeline } from "@/components/educational-primitives";
import { PageShell } from "@/components/page-shell";
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { StudentFastPath } from "@/components/student-fast-path";
import { TonePanel } from "@/components/tone-panel";
import { guidedTourSteps, initialTourRecord } from "@/lib/site-navigation";
import {
  degreeConnection,
  instructorMaterials,
  instructorPrompts,
  instructorSessionOneItems,
  instructorSessionTwoItems,
  instructorWatchFors,
} from "@/lib/web-presence-site-content";

export const metadata: Metadata = {
  title: "Instructor Guide",
};

const instructorFastPathSteps = [
  {
    title: "Start from the tour map",
    summary:
      "Start class from the 6-step tour before you open any optional help or older archive page.",
  },
  {
    title: "Check the visible outputs",
    summary:
      "Use the brief fields on each page so feedback stays tied to audience, vibe, look, proof, build plan, and publish piece instead of vague opinions.",
  },
  {
    title: "Use support pages narrowly",
    summary:
      "Open browse, examples, or recipes only when they help with the exact step students are already on.",
  },
] as const;

const recordCrosswalk = initialTourRecord.map((entry) => {
  const updatedBy = guidedTourSteps
    .filter((step) => step.recordFields.includes(entry.id))
    .map((step) => step.publicLabel)
    .join(" and ");

  return {
    ...entry,
    updatedBy,
  };
});

export default function InstructorGuidePage() {
  return (
    <PageShell>
      <EditorialBand tone="reflection" paddingScale="hero">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Instructor only" />
            <p className="mt-4 type-meta text-(--accent-strong)">Teaching guide</p>
            <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
              Teach from the same 6-step path students already use.
            </h1>
            <p className="mt-6 type-body text-(--ink-body)">
              Pace class around the public tour so critique stays attached to real decisions.
              Open browse, examples, or recipes only when a specific step needs backup.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tour" className="action-primary">
                Open the tour map
              </Link>
              <Link href="/tour/signal" className="action-secondary">
                Start at the signal step
              </Link>
            </div>
          </div>
          <RouteContextPanel
            tone="reading"
            eyebrow="How to use this page"
            title="Guide the class from here, not from a second path."
            sections={[
              {
                label: "Open it when",
                content:
                  "You are planning critique, prompts, or assignments around the public tour and want the teacher version in one place.",
              },
              {
                label: "Covers",
                content:
                  "The six tour steps, the brief fields students fill in on each page, and the support pages under browse, examples, and recipes.",
              },
              {
                label: "Check for",
                content:
                  "Does the page fit the audience? Is the vibe clear? Does the look match? Is the proof believable? Is the build plan specific? Does the publish asset still sound like the same page?",
              },
            ]}
          />
        </div>
      </EditorialBand>

      <StudentFastPath
        label="Fast instructor path"
        title="Run class through the public build path first."
        summary="Set the step, name the output students need, then bring in support only when the class is stuck on that exact decision."
        steps={instructorFastPathSteps}
        primaryAction={{
          label: "Open the tour map",
          href: "/tour",
        }}
        secondaryAction={{
          label: "Open student exemplars",
          href: "/examples/student-exemplars",
          kind: "secondary",
        }}
        tone="reflection"
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Teaching arc"
          title="Plan the class around two working sessions."
          body="Session one forces the core decisions. Session two audits the live pages and turns the gaps into next steps."
        />
      </section>

      <SequenceTimeline
        title="Session 1 — signal and archetype"
        summary="The first session frames the two finals, forces archetype choices, writes both signal briefs, and makes students test those briefs through pair review."
        mode="process"
        items={instructorSessionOneItems}
      />

      <SequenceTimeline
        title="Session 2 — apply, audit, and plan"
        summary="The second session treats the live pages as evidence, audits them against the briefs, drafts proof blocks, and turns the gaps into weekly agent specs."
        mode="process"
        items={instructorSessionTwoItems}
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Critique targets"
          title="Check the parts students should be able to point to by critique."
          body="Keep feedback tied to visible outputs, not general vibes about the page."
        />
        <ContentGrid minCardWidth="16rem">
          {recordCrosswalk.map((entry) => (
            <TonePanel key={entry.id} tone="neutral" className="card-shell p-5">
              <p className="type-meta text-(--accent-strong)">{entry.label}</p>
              <p className="mt-3 type-body text-(--ink-body)">
                By <strong>{entry.updatedBy}</strong>, this field should be filled in and usable in
                critique.
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Bounded support"
        title="Use browse, examples, and recipes only when the current step needs backup."
        tone="proof"
      >
        <p>
          Browse sharpens comparison and evidence. Examples show what changed on the page. Recipes
          help with structure once the page job is clear. None of them should replace the tour.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/browse" className="action-secondary">
            Open browse
          </Link>
          <Link href="/examples" className="action-secondary">
            Open examples
          </Link>
          <Link href="/recipes" className="action-primary">
            Open recipes
          </Link>
        </div>
      </CalloutBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="What to watch for"
          title="Most teaching problems start as unfinished decisions."
          body="When a student cannot write a clear spec, they usually have not really made the decision yet."
        />
        <ContentGrid minCardWidth="18rem">
          {instructorWatchFors.map((item) => (
            <TonePanel key={item} tone="reading" className="card-shell p-6">
              <p className="type-body text-(--ink-body)">{item}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <CalloutBand label="Prompts" title="Questions that help in critique" tone="next">
          <ul className="space-y-3 pl-5">
            {instructorPrompts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>
        <CalloutBand label="Materials" title="What should be ready" tone="next">
          <ul className="space-y-3 pl-5">
            {instructorMaterials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CalloutBand>
      </div>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Semester plan"
          title="Map the six modules across 16 weeks."
          body="Each row is one module. Prerequisites are strict where noted; everything else can flex to fit your section."
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left type-body">
            <thead>
              <tr className="border-b border-(--surface-rule)">
                <th className="py-3 pr-4 type-meta text-(--ink-subtle)">Weeks</th>
                <th className="py-3 pr-4 type-meta text-(--ink-subtle)">Module</th>
                <th className="py-3 pr-4 type-meta text-(--ink-subtle)">Focus</th>
                <th className="py-3 type-meta text-(--ink-subtle)">Key deliverable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--surface-rule)">
              <tr>
                <td className="py-3 pr-4 text-(--ink-subtle)">1–3</td>
                <td className="py-3 pr-4">
                  <Link href="/modules/web-presence-framework" className="underline">
                    Module 1: Web Presence Framework
                  </Link>
                </td>
                <td className="py-3 pr-4 text-(--ink-body)">Signal → Archetype → Style → Proof</td>
                <td className="py-3 text-(--ink-body)">Site audit + initial brief</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-(--ink-subtle)">4–5</td>
                <td className="py-3 pr-4">
                  <Link href="/modules/ai-foundations" className="underline">
                    Module 2: AI Foundations
                  </Link>
                </td>
                <td className="py-3 pr-4 text-(--ink-body)">AI history, how models learn, key people</td>
                <td className="py-3 text-(--ink-body)">Primary source summary</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-(--ink-subtle)">6–7</td>
                <td className="py-3 pr-4">
                  <Link href="/modules/agentic-workflow" className="underline">
                    Module 3: Agentic Workflow
                  </Link>
                </td>
                <td className="py-3 pr-4 text-(--ink-body)">Chatbot vs. agent, writing briefs, limits</td>
                <td className="py-3 text-(--ink-body)">AI-assisted build brief</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-(--ink-subtle)">8–9</td>
                <td className="py-3 pr-4">
                  <Link href="/modules/visual-ai" className="underline">
                    Module 4: Visual AI
                  </Link>
                </td>
                <td className="py-3 pr-4 text-(--ink-body)">Image prompting, editorial judgment</td>
                <td className="py-3 text-(--ink-body)">Generated hero image set</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-(--ink-subtle)">10–12</td>
                <td className="py-3 pr-4">
                  <Link href="/modules/identity-and-proof" className="underline">
                    Module 5: Identity and Proof
                  </Link>
                </td>
                <td className="py-3 pr-4 text-(--ink-body)">Identity signals, proof strategy, portfolio</td>
                <td className="py-3 text-(--ink-body)">Proof section redesign</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-(--ink-subtle)">13–16</td>
                <td className="py-3 pr-4">
                  <Link href="/modules/studio-and-publish" className="underline">
                    Module 6: Studio and Publish
                  </Link>
                </td>
                <td className="py-3 pr-4 text-(--ink-body)">Build, review, deploy, iterate, professional practice</td>
                <td className="py-3 text-(--ink-body)">Published site + portfolio review</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Teaching notes"
          title="What to know before each module."
          body="Prerequisites, in-class activities, homework, and common traps — in one place so you do not have to read every lesson page."
        />

        <ContentGrid minCardWidth="18rem">
          <TonePanel tone="neutral" className="card-shell p-6 space-y-3">
            <p className="type-meta text-(--accent-strong)">Module 1 — Web Presence Framework</p>
            <p className="type-body text-(--ink-body)">
              <strong>Prerequisites:</strong> None. This is the on-ramp.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>In class:</strong> Pair-review signal briefs, critique archetype choices against live pages, run a vibe-check exercise.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Homework:</strong> Complete the site audit, fill in the initial brief, and post the brief for peer review.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Watch for:</strong> Students who skip the audience step and jump straight to visual choices. Force them back to &quot;who is this for&quot; first.
            </p>
          </TonePanel>

          <TonePanel tone="neutral" className="card-shell p-6 space-y-3">
            <p className="type-meta text-(--accent-strong)">Module 2 — AI Foundations</p>
            <p className="type-body text-(--ink-body)">
              <strong>Prerequisites:</strong> None, but works best after Module 1 so students have a design context.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>In class:</strong> Walk through one primary source together. Discuss what &quot;training data&quot; means in plain language.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Homework:</strong> Write a one-page primary source summary linking an AI concept to the student&apos;s own site project.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Watch for:</strong> Students who treat AI as magic. Redirect to the &quot;how models learn&quot; lesson and the people behind the work.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Resequencing:</strong> Must precede Modules 3 and 4. Can overlap with Module 1 if needed.
            </p>
          </TonePanel>

          <TonePanel tone="neutral" className="card-shell p-6 space-y-3">
            <p className="type-meta text-(--accent-strong)">Module 3 — Agentic Workflow</p>
            <p className="type-body text-(--ink-body)">
              <strong>Prerequisites:</strong> Module 2 (students need the foundations before writing prompts).
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>In class:</strong> Live demo of chatbot vs. agent patterns. Students write one brief in class and test it.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Homework:</strong> Write an AI-assisted build brief for one section of their site.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Watch for:</strong> Students who paste raw AI output without editing. Make them annotate what they kept, changed, and discarded.
            </p>
          </TonePanel>

          <TonePanel tone="neutral" className="card-shell p-6 space-y-3">
            <p className="type-meta text-(--accent-strong)">Module 4 — Visual AI</p>
            <p className="type-body text-(--ink-body)">
              <strong>Prerequisites:</strong> Module 2, and ideally Module 3 (brief-writing skills help with image prompting).
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>In class:</strong> Run a prompt-and-critique loop: prompt, generate, critique as a group, revise. Repeat three times.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Homework:</strong> Generate a hero image set (3–5 images) that match the student&apos;s archetype and style direction.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Watch for:</strong> Students who accept the first output. Push them to iterate and explain why they chose the final set.
            </p>
          </TonePanel>

          <TonePanel tone="neutral" className="card-shell p-6 space-y-3">
            <p className="type-meta text-(--accent-strong)">Module 5 — Identity and Proof</p>
            <p className="type-body text-(--ink-body)">
              <strong>Prerequisites:</strong> Module 1 (students need a site direction before they can prove it works).
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>In class:</strong> Audit existing proof sections against the trust spectrum. Identify what is missing and what is unconvincing.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Homework:</strong> Redesign the proof section of the student&apos;s site. Ship the update.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Watch for:</strong> Generic testimonials and fake social proof. Push students toward evidence that is specific and verifiable.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Resequencing:</strong> Can run earlier if you move Module 1 forward. Flexible in order relative to Modules 3–4.
            </p>
          </TonePanel>

          <TonePanel tone="neutral" className="card-shell p-6 space-y-3">
            <p className="type-meta text-(--accent-strong)">Module 6 — Studio and Publish</p>
            <p className="type-body text-(--ink-body)">
              <strong>Prerequisites:</strong> Modules 1–5 (this is the capstone).
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>In class:</strong> Build sprint — students deploy, do peer code review, test on multiple devices, and iterate.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Homework:</strong> Ship the published site. Write a portfolio reflection linking decisions back to the brief.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Watch for:</strong> Students who rush deployment without testing. Require at least one round of peer review before final submission.
            </p>
            <p className="type-body text-(--ink-body)">
              <strong>Resequencing:</strong> Must be last. Everything else feeds into the final publish cycle.
            </p>
          </TonePanel>
        </ContentGrid>
      </section>

      <CalloutBand label="Degree connection" title="This unit is bigger than portfolio advice." tone="warning">
        <p>{degreeConnection}</p>
      </CalloutBand>
    </PageShell>
  );
}
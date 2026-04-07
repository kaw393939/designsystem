import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  ComparisonGrid,
  ConceptGrid,
  EditorialAside,
  GlossaryBlock,
  LessonHero,
  NextStepBlock,
  PullInsight,
  ReadingMapGrid,
  ReflectionPrompt,
  SectionBlock,
  SequenceTimeline,
  SourceAnchorGrid,
  SummaryGrid,
  UnitRenderer,
  VisualBreak,
  WhyItMatters,
  WorkedExample,
} from "@/components/educational-primitives";
import {
  assignmentUnit,
  conceptUnit,
  readingMapUnit,
} from "@/lib/educational-primitives-content";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => {
    const linkProps = { ...props };
    delete linkProps.prefetch;

    return (
      <a href={href} {...linkProps}>
        {children}
      </a>
    );
  },
}));

describe("educational primitives", () => {
  it("renders LessonHero with metadata, actions, and configurable heading level", () => {
    render(
      <LessonHero
        eyebrow="Lesson"
        title="Structured orientation matters."
        dek="A calm hero gives the learner the page job before they read deeply."
        metadata={[{ label: "Time", value: "6 minutes" }]}
        actions={[{ label: "Begin", href: "/process", kind: "primary" }]}
        headingLevel={2}
      />,
    );

    expect(screen.getByText("Lesson")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Structured orientation matters.",
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("6 minutes")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Begin" })).toHaveAttribute(
      "href",
      "/process",
    );
  });

  it("renders SectionBlock and WhyItMatters with meaningful section content", () => {
    render(
      <>
        <SectionBlock
          id="section-a"
          eyebrow="Definition"
          title="Make the job visible."
          summary="The learner should know what this section is doing."
        >
          <p>Body copy lives inside the section container.</p>
        </SectionBlock>
        <WhyItMatters
          title="Why now"
          summary="The first scan needs a reason to continue."
          stakes="Without stakes, the page feels like disconnected information."
          audience="Useful for novice readers."
          links={[{ label: "Skip ahead", href: "#next", kind: "secondary" }]}
        />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: "Make the job visible." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Body copy lives inside the section container."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Why now" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Useful for novice readers.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip ahead" })).toHaveAttribute(
      "href",
      "#next",
    );
  });

  it("renders ConceptGrid and SummaryGrid cards from structured items", () => {
    render(
      <>
        <ConceptGrid
          title="Signals"
          items={[
            {
              title: "Returned signal",
              summary: "The result feeds back in.",
              tag: "Core",
            },
            { title: "Delay", summary: "The effect shows up later." },
          ]}
        />
        <SummaryGrid
          title="Takeaways"
          items={[
            {
              title: "Name the signal",
              takeaway: "Identify what comes back into the system.",
            },
            {
              title: "Move next",
              takeaway: "Use the summary to close the lesson.",
              action: { label: "Continue", href: "/status", kind: "secondary" },
            },
          ]}
        />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: "Signals" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Returned signal")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Takeaways" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continue" })).toHaveAttribute(
      "href",
      "/status",
    );
  });

  it("renders ComparisonGrid with table semantics", () => {
    render(
      <ComparisonGrid
        title="Compare patterns"
        caption="Pattern comparison"
        columns={[
          { key: "a", label: "Pattern A" },
          { key: "b", label: "Pattern B" },
        ]}
        rows={[
          { label: "Signal", cells: ["Amplifies", "Stabilizes"] },
          { label: "Use", cells: ["Growth", "Correction"] },
        ]}
      />,
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Pattern A" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("rowheader", { name: "Signal" }),
    ).toBeInTheDocument();
  });

  it("renders SequenceTimeline and WorkedExample as ordered instructional steps", () => {
    render(
      <>
        <SequenceTimeline
          title="Process steps"
          mode="process"
          items={[
            {
              label: "1",
              title: "Frame the task",
              summary: "Name the output first.",
            },
            {
              label: "2",
              title: "Collect evidence",
              summary: "Gather only what supports the claim.",
            },
          ]}
        />
        <WorkedExample
          title="Worked example"
          prompt="Show how the method becomes evidence."
          steps={[
            { title: "Observe", body: "Notice one repeated behavior." },
            {
              title: "Interpret",
              body: "Explain why it might be happening.",
              outcome: "The claim stays grounded.",
            },
          ]}
          result="The learner sees how evidence becomes explanation."
        />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: "Process steps" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(4);
    expect(
      screen.getByText("The learner sees how evidence becomes explanation."),
    ).toBeInTheDocument();
  });

  it("renders EditorialAside and PullInsight with supporting context", () => {
    render(
      <>
        <EditorialAside title="Caution" icon="!">
          <p>
            Do not confuse repeated events with a loop unless the result changes
            the next condition.
          </p>
        </EditorialAside>
        <PullInsight
          quote="The next move matters more than the current snapshot."
          attribution="Teaching note"
          context="Useful as a scan-first sentence."
        />
      </>,
    );

    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Caution" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Teaching note")).toBeInTheDocument();
    expect(
      screen.getByText("Useful as a scan-first sentence."),
    ).toBeInTheDocument();
  });

  it("renders VisualBreak and ReflectionPrompt with optional supporting details", () => {
    render(
      <>
        <VisualBreak
          title="Pause before the rubric"
          body="A pacing break helps the learner shift tasks without losing the thread."
          visual={<div role="img" aria-label="Abstract pause visual" />}
        />
        <ReflectionPrompt
          title="Reflection"
          prompt="What part of your claim is observation and what part is interpretation?"
          questions={["Which detail matters most?", "What remains uncertain?"]}
          timeEstimate="5 minutes"
        />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: "Pause before the rubric" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Abstract pause visual" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Suggested time: 5 minutes")).toBeInTheDocument();
  });

  it("renders NextStepBlock with primary and secondary actions", () => {
    render(
      <NextStepBlock
        title="Move forward"
        summary="The next step should be specific."
        context="Use one clear action, not five equal choices."
        primaryAction={{
          label: "Go to process",
          href: "/process",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Review status",
          href: "/status",
          kind: "secondary",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Move forward" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to process" })).toHaveAttribute(
      "href",
      "/process",
    );
    expect(screen.getByRole("link", { name: "Review status" })).toHaveAttribute(
      "href",
      "/status",
    );
  });

  it("renders SourceAnchorGrid, ReadingMapGrid, and GlossaryBlock from normalized list shapes", () => {
    render(
      <>
        <SourceAnchorGrid
          title="Sources"
          items={[
            {
              title: "Case study",
              description: "Applied example",
              href: "https://example.com/case",
              type: "Case",
            },
          ]}
        />
        <ReadingMapGrid
          title="Reading map"
          clusters={[
            {
              title: "Start here",
              summary: "Frame the question first.",
              links: [
                {
                  label: "Brief",
                  href: "https://example.com/brief",
                  note: "Five minutes",
                  type: "Guide",
                },
              ],
            },
          ]}
        />
        <GlossaryBlock
          title="Glossary"
          terms={[
            { term: "Cue", definition: "A signal that shapes the next move." },
          ]}
        />
      </>,
    );

    expect(screen.getByRole("link", { name: "Open source" })).toHaveAttribute(
      "href",
      "https://example.com/case",
    );
    expect(screen.getByRole("link", { name: "Brief" })).toHaveAttribute(
      "href",
      "https://example.com/brief",
    );
    expect(screen.getByText("Cue")).toBeInTheDocument();
  });

  it("renders concept, assignment, and reading-map units through the shared block renderer", () => {
    render(
      <>
        <UnitRenderer unit={conceptUnit} headingLevel={2} />
        <UnitRenderer unit={assignmentUnit} headingLevel={2} />
        <UnitRenderer unit={readingMapUnit} headingLevel={2} />
      </>,
    );

    expect(
      screen.getByRole("heading", { name: conceptUnit.title, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: assignmentUnit.title, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: readingMapUnit.title, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Useful terms for this assignment"),
    ).toBeInTheDocument();
    expect(screen.getByText("Source anchors")).toBeInTheDocument();

    const readingMapHeading = screen.getByRole("heading", {
      name: "Cluster resources by job, not by arbitrary topic label.",
    });
    const readingMapSection = readingMapHeading.closest("section");
    expect(readingMapSection).not.toBeNull();
    expect(
      within(readingMapSection as HTMLElement).getByText("Core framing"),
    ).toBeInTheDocument();
  });
});

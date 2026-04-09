import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DiagnosticQuestionCard } from "@/components/diagnostic-question-card";
import { getQuestionsForStep } from "@/lib/diagnostic-questions";

describe("DiagnosticQuestionCard", () => {
  it("renders question, hint, and link", () => {
    render(
      <DiagnosticQuestionCard
        question="Not sure which archetype fits?"
        hint="Answer a few questions to narrow down your archetype."
        href="/experiences/identity-portfolio/diagnose"
        linkLabel="Try the diagnose tool →"
      />,
    );
    expect(screen.getByText("Not sure which archetype fits?")).toBeInTheDocument();
    expect(screen.getByText(/Answer a few questions/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Try the diagnose tool/ })).toHaveAttribute(
      "href",
      "/experiences/identity-portfolio/diagnose",
    );
  });
});

describe("getQuestionsForStep", () => {
  it("returns 3 questions for each tour step", () => {
    const steps = ["signal", "archetype", "style", "proof", "build", "publish"] as const;
    for (const step of steps) {
      const questions = getQuestionsForStep(step);
      expect(questions.length).toBe(3);
      for (const q of questions) {
        expect(q.stepSlug).toBe(step);
        expect(q.question).toBeTruthy();
        expect(q.href).toBeTruthy();
      }
    }
  });
});

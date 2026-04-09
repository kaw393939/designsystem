import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ChatbotVsAgentPage from "@/app/modules/agentic-workflow/chatbot-vs-agent/page";
import WritingBriefsPage from "@/app/modules/agentic-workflow/writing-briefs/page";
import HonestLimitsPage from "@/app/modules/agentic-workflow/honest-limits/page";
import PracticePage from "@/app/modules/agentic-workflow/practice/page";
import CheckpointPage from "@/app/modules/agentic-workflow/checkpoint/page";

describe("Agentic Workflow lesson pages", () => {
  it("Lesson 1 renders heading", () => {
    render(<ChatbotVsAgentPage />);
    expect(
      screen.getByRole("heading", { name: /chatbot vs\. agent/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 1 renders concept cards", () => {
    render(<ChatbotVsAgentPage />);
    expect(screen.getAllByText("Agent").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Orchestration").length).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 1 renders comparison table", () => {
    render(<ChatbotVsAgentPage />);
    expect(screen.getAllByText(/single response to single prompt/i).length).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 2 renders heading", () => {
    render(<WritingBriefsPage />);
    expect(
      screen.getByRole("heading", {
        name: /writing briefs ai can follow/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 2 renders brief anatomy sections", () => {
    render(<WritingBriefsPage />);
    expect(screen.getAllByText(/Role/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Acceptance criteria/i).length).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 3 renders heading", () => {
    render(<HonestLimitsPage />);
    expect(
      screen.getByRole("heading", {
        name: /when ai helps and when it does not/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 3 renders limitation categories", () => {
    render(<HonestLimitsPage />);
    expect(screen.getByText("AI helps")).toBeInTheDocument();
    expect(screen.getByText("AI struggles")).toBeInTheDocument();
    expect(screen.getByText("AI fails")).toBeInTheDocument();
  });

  it("Practice page renders heading and rubric", () => {
    render(<PracticePage />);
    expect(
      screen.getByRole("heading", {
        name: /write a build brief and test it/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    // Check rubric items are rendered
    expect(screen.getByText(/does it name the role/i)).toBeInTheDocument();
  });

  it("Checkpoint page renders heading and peer comparison", () => {
    render(<CheckpointPage />);
    expect(
      screen.getByRole("heading", {
        name: /trade briefs, compare outputs/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/pair up with a classmate/i)).toBeInTheDocument();
  });
});

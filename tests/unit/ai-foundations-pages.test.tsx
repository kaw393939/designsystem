import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WhereAiCameFromPage from "@/app/modules/ai-foundations/where-ai-came-from/page";
import HowModelsLearnPage from "@/app/modules/ai-foundations/how-models-learn/page";
import ThePeopleWhoBuiltThisPage from "@/app/modules/ai-foundations/the-people-who-built-this/page";
import PracticePage from "@/app/modules/ai-foundations/practice/page";
import CheckpointPage from "@/app/modules/ai-foundations/checkpoint/page";

describe("AI Foundations lesson pages", () => {
  it("Lesson 1 renders heading", () => {
    render(<WhereAiCameFromPage />);
    expect(
      screen.getByRole("heading", { name: /where ai came from/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 1 renders timeline sections", () => {
    render(<WhereAiCameFromPage />);
    const timelines = screen.getAllByRole("list", { name: /timeline/i });
    expect(timelines.length).toBeGreaterThanOrEqual(4);
  });

  it("Lesson 1 renders profile grids", () => {
    render(<WhereAiCameFromPage />);
    // Check that at least one person name from era 1 appears
    expect(screen.getByText("George Boole")).toBeInTheDocument();
    expect(screen.getByText("Alan Turing")).toBeInTheDocument();
  });

  it("Lesson 2 renders heading", () => {
    render(<HowModelsLearnPage />);
    expect(
      screen.getByRole("heading", { name: /how models learn/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 2 renders KaTeX math", () => {
    const { container } = render(<HowModelsLearnPage />);
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("Lesson 2 renders embeddings diagram", () => {
    const { container } = render(<HowModelsLearnPage />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("Lesson 3 renders heading", () => {
    render(<ThePeopleWhoBuiltThisPage />);
    expect(
      screen.getByRole("heading", {
        name: /the people who built this/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 3 renders institution profiles", () => {
    render(<ThePeopleWhoBuiltThisPage />);
    expect(screen.getByText("Bell Labs")).toBeInTheDocument();
    expect(screen.getByText("DARPA")).toBeInTheDocument();
  });

  it("Practice page renders heading and reading list", () => {
    render(<PracticePage />);
    expect(
      screen.getByRole("heading", { name: /summarize a primary source/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/computing machinery and intelligence/i)).toBeInTheDocument();
  });

  it("Checkpoint page renders heading and rubric", () => {
    render(<CheckpointPage />);
    expect(
      screen.getByRole("heading", { name: /explain it without jargon/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/did I name a specific concept/i)).toBeInTheDocument();
  });
});

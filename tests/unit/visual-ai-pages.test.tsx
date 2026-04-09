import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HowImageModelsSeePage from "@/app/modules/visual-ai/how-image-models-see/page";
import PromptingForImagesPage from "@/app/modules/visual-ai/prompting-for-images/page";
import EditorialJudgmentPage from "@/app/modules/visual-ai/editorial-judgment/page";
import PracticePage from "@/app/modules/visual-ai/practice/page";
import CheckpointPage from "@/app/modules/visual-ai/checkpoint/page";

describe("Visual AI lesson pages", () => {
  it("Lesson 1 renders heading", () => {
    render(<HowImageModelsSeePage />);
    expect(
      screen.getByRole("heading", { name: /how image models see/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 1 renders model comparison rows", () => {
    render(<HowImageModelsSeePage />);
    expect(screen.getAllByText("Style").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Composition").length).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 1 renders specificity ladder", () => {
    render(<HowImageModelsSeePage />);
    expect(screen.getByText("Vague")).toBeInTheDocument();
    expect(screen.getByText("Better")).toBeInTheDocument();
    expect(screen.getByText("Precise")).toBeInTheDocument();
  });

  it("Lesson 2 renders heading", () => {
    render(<PromptingForImagesPage />);
    expect(
      screen.getByRole("heading", {
        name: /prompting for images/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 2 renders prompt anatomy sections", () => {
    render(<PromptingForImagesPage />);
    expect(screen.getAllByText(/Subject/).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/Negative prompts/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 2 renders prompt examples", () => {
    render(<PromptingForImagesPage />);
    expect(
      screen.getAllByText(/Teaching point:/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 2 marks approximate prompts", () => {
    render(<PromptingForImagesPage />);
    expect(
      screen.getAllByText(/approximate prompt/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("Lesson 3 renders heading", () => {
    render(<EditorialJudgmentPage />);
    expect(
      screen.getByRole("heading", {
        name: /editorial judgment/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 3 renders editorial rubric", () => {
    render(<EditorialJudgmentPage />);
    expect(
      screen.getByText(/does this image need to be factually true/i),
    ).toBeInTheDocument();
  });

  it("Lesson 3 renders three scenarios", () => {
    render(<EditorialJudgmentPage />);
    expect(screen.getByText("Scenario A")).toBeInTheDocument();
    expect(screen.getByText("Scenario B")).toBeInTheDocument();
    expect(screen.getByText("Scenario C")).toBeInTheDocument();
  });

  it("Practice page renders heading and rubric", () => {
    render(<PracticePage />);
    expect(
      screen.getByRole("heading", {
        name: /generate three hero images/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does this image need to be factually true/i),
    ).toBeInTheDocument();
  });

  it("Checkpoint page renders heading and peer exchange", () => {
    render(<CheckpointPage />);
    expect(
      screen.getByRole("heading", {
        name: /peer review: visual ai/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/share your three final images/i),
    ).toBeInTheDocument();
  });
});

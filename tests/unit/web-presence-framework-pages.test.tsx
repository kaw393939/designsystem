import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WhoIsThisForPage from "@/app/modules/web-presence-framework/who-is-this-for/page";
import PickTheVibePage from "@/app/modules/web-presence-framework/pick-the-vibe/page";
import ChooseTheLookPage from "@/app/modules/web-presence-framework/choose-the-look/page";
import ProofAndPublishPage from "@/app/modules/web-presence-framework/proof-and-publish/page";
import PracticePage from "@/app/modules/web-presence-framework/practice/page";
import CheckpointPage from "@/app/modules/web-presence-framework/checkpoint/page";

describe("Web Presence Framework lesson pages", () => {
  it("Lesson 1 renders heading", () => {
    render(<WhoIsThisForPage />);
    expect(
      screen.getByRole("heading", { name: /who is this for/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 1 renders audience-first principle", () => {
    render(<WhoIsThisForPage />);
    expect(
      screen.getByText(/name a person, not a demographic/i),
    ).toBeInTheDocument();
  });

  it("Lesson 1 links to Signal tour", () => {
    render(<WhoIsThisForPage />);
    const link = screen.getByRole("link", { name: /the signal tour/i });
    expect(link).toHaveAttribute("href", "/tour/signal");
  });

  it("Lesson 2 renders heading", () => {
    render(<PickTheVibePage />);
    expect(
      screen.getByRole("heading", { name: /pick the vibe/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 2 links to archetype room", () => {
    render(<PickTheVibePage />);
    const links = screen.getAllByRole("link", { name: /archetype room/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute("href", "/browse/archetypes");
  });

  it("Lesson 3 renders heading", () => {
    render(<ChooseTheLookPage />);
    expect(
      screen.getByRole("heading", { name: /choose the look/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("Lesson 3 renders layout/color/typography signals", () => {
    render(<ChooseTheLookPage />);
    expect(screen.getByText("Layout")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Typography")).toBeInTheDocument();
  });

  it("Lesson 3 links to Style tour", () => {
    render(<ChooseTheLookPage />);
    const link = screen.getByRole("link", { name: /the style tour/i });
    expect(link).toHaveAttribute("href", "/tour/style");
  });

  it("Lesson 4 renders heading", () => {
    render(<ProofAndPublishPage />);
    expect(
      screen.getByRole("heading", {
        name: /add proof and publish/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("Lesson 4 links to Proof, Build, and Publish tours", () => {
    render(<ProofAndPublishPage />);
    expect(
      screen.getByRole("link", { name: /the proof tour/i }),
    ).toHaveAttribute("href", "/tour/proof");
    expect(
      screen.getByRole("link", { name: /the build tour/i }),
    ).toHaveAttribute("href", "/tour/build");
    expect(
      screen.getByRole("link", { name: /the publish tour/i }),
    ).toHaveAttribute("href", "/tour/publish");
  });

  it("Practice page renders heading and checklists", () => {
    render(<PracticePage />);
    expect(
      screen.getByRole("heading", { name: /audit a live site/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/hero image or top visual/i)).toBeInTheDocument();
    expect(
      screen.getByText(/homepage visual or hero/i),
    ).toBeInTheDocument();
  });

  it("Practice page renders both portfolio and museum checklists", () => {
    render(<PracticePage />);
    expect(screen.getByText(/call to action/i)).toBeInTheDocument();
    expect(
      screen.getByText(/visible proof of research or editorial judgment/i),
    ).toBeInTheDocument();
  });

  it("Checkpoint page renders heading and review questions", () => {
    render(<CheckpointPage />);
    expect(
      screen.getByRole("heading", {
        name: /peer review: site audit/i,
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does the visual direction match the stated archetype/i),
    ).toBeInTheDocument();
  });

  it("Checkpoint page renders studio review criteria", () => {
    render(<CheckpointPage />);
    expect(
      screen.getByText(/signal clarity/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/curatorial judgment/i),
    ).toBeInTheDocument();
  });
});

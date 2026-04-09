import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PersonProfileCard } from "@/components/person-profile-card";
import { PersonProfileGrid } from "@/components/person-profile-grid";

describe("PersonProfileCard", () => {
  it("renders name, era, role, and summary", () => {
    render(
      <PersonProfileCard
        name="Alan Turing"
        era="Field formation"
        role="Mathematician and computing pioneer"
        summary="Proposed the universal machine concept."
      />,
    );

    expect(screen.getByRole("heading", { name: "Alan Turing", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Field formation")).toBeInTheDocument();
    expect(screen.getByText("Mathematician and computing pioneer")).toBeInTheDocument();
    expect(screen.getByText("Proposed the universal machine concept.")).toBeInTheDocument();
  });

  it("renders fallback initial when no image provided", () => {
    render(
      <PersonProfileCard
        name="Ada Lovelace"
        era="Precursors"
        role="Mathematician"
        summary="Wrote the first algorithm."
      />,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders image when imageSrc provided", () => {
    render(
      <PersonProfileCard
        name="Alan Turing"
        era="Field formation"
        role="Pioneer"
        summary="Universal machine."
        imageSrc="/media/modules/portraits/alan-turing.webp"
      />,
    );

    const img = screen.getByRole("img", { name: "Alan Turing, Pioneer" });
    expect(img).toBeInTheDocument();
  });

  it("renders as link when url provided", () => {
    render(
      <PersonProfileCard
        name="Claude Shannon"
        era="Field formation"
        role="Information theorist"
        summary="Founded information theory."
        url="https://example.com"
      />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("PersonProfileGrid", () => {
  it("renders a grid of profile cards", () => {
    const people = [
      { name: "Alan Turing", era: "Era 2", role: "Pioneer", summary: "Universal machine." },
      { name: "Ada Lovelace", era: "Era 1", role: "Mathematician", summary: "First algorithm." },
    ];

    render(<PersonProfileGrid people={people} />);

    expect(screen.getByRole("heading", { name: "Alan Turing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmbeddingsDiagram } from "@/components/embeddings-diagram";

describe("EmbeddingsDiagram", () => {
  it("renders a figure with accessible title", () => {
    render(<EmbeddingsDiagram />);
    expect(screen.getByRole("figure")).toBeInTheDocument();
  });

  it("contains an SVG with role=img", () => {
    const { container } = render(<EmbeddingsDiagram />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("role")).toBe("img");
  });

  it("has a descriptive title element", () => {
    const { container } = render(<EmbeddingsDiagram />);
    const title = container.querySelector("title");
    expect(title?.textContent).toMatch(/embeddings/i);
  });

  it("renders a figcaption", () => {
    render(<EmbeddingsDiagram />);
    expect(screen.getByText(/schematic, not literal/i)).toBeInTheDocument();
  });
});

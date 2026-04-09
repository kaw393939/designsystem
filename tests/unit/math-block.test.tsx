import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MathBlock } from "@/components/math-block";

describe("MathBlock", () => {
  it("renders KaTeX output", () => {
    const { container } = render(<MathBlock tex="x^2" />);
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("renders with aria-label when provided", () => {
    const { container } = render(
      <MathBlock tex="e=mc^2" label="E equals m c squared" />,
    );
    const el = container.querySelector("[aria-label]");
    expect(el).not.toBeNull();
    expect(el?.getAttribute("aria-label")).toBe("E equals m c squared");
    expect(el?.getAttribute("role")).toBe("math");
  });

  it("renders display mode", () => {
    const { container } = render(<MathBlock tex="\\sum_{i=1}^n i" display />);
    expect(container.querySelector(".katex-display")).not.toBeNull();
  });

  it("does not throw on invalid LaTeX", () => {
    const { container } = render(<MathBlock tex="\\invalidcommand" />);
    // KaTeX renders error output rather than throwing
    expect(container.querySelector(".katex")).not.toBeNull();
  });
});

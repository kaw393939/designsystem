import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModuleLocalNav } from "@/components/module-local-nav";
import type { ModuleDefinition } from "@/lib/module-content/types";

const testModule: ModuleDefinition = {
  id: "ai-foundations",
  slug: "ai-foundations",
  number: 2,
  title: "AI Foundations",
  summary: "Understand where AI came from.",
  leaveWith: "A paper summary.",
  weekRange: "Weeks 4–5",
  status: "preview",
  tone: "reading",
  lessons: [
    { id: "l1", slug: "where-ai-came-from", title: "Where AI came from", summary: "Seven eras." },
    { id: "l2", slug: "how-models-learn", title: "How models learn", summary: "Vectors." },
  ],
  hasPractice: true,
  hasCheckpoint: true,
};

describe("ModuleLocalNav", () => {
  it("renders module title and number", () => {
    render(<ModuleLocalNav module={testModule} />);

    expect(screen.getByText("Module 2")).toBeInTheDocument();
    expect(screen.getByText("AI Foundations")).toBeInTheDocument();
  });

  it("renders overview link", () => {
    render(<ModuleLocalNav module={testModule} />);

    const link = screen.getByRole("link", { name: "Overview" });
    expect(link).toHaveAttribute("href", "/modules/ai-foundations");
  });

  it("renders lesson links with numbered labels", () => {
    render(<ModuleLocalNav module={testModule} />);

    expect(screen.getByRole("link", { name: "1. Where AI came from" })).toHaveAttribute(
      "href",
      "/modules/ai-foundations/where-ai-came-from",
    );
    expect(screen.getByRole("link", { name: "2. How models learn" })).toHaveAttribute(
      "href",
      "/modules/ai-foundations/how-models-learn",
    );
  });

  it("renders practice and checkpoint links", () => {
    render(<ModuleLocalNav module={testModule} />);

    expect(screen.getByRole("link", { name: "Practice" })).toHaveAttribute(
      "href",
      "/modules/ai-foundations/practice",
    );
    expect(screen.getByRole("link", { name: "Checkpoint" })).toHaveAttribute(
      "href",
      "/modules/ai-foundations/checkpoint",
    );
  });

  it("has an accessible navigation label", () => {
    render(<ModuleLocalNav module={testModule} />);

    expect(screen.getByRole("navigation", { name: "AI Foundations navigation" })).toBeInTheDocument();
  });
});

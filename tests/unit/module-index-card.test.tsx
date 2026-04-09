import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModuleIndexCard } from "@/components/module-index-card";
import type { ModuleDefinition } from "@/lib/module-content/types";

const activeModule: ModuleDefinition = {
  id: "ai-foundations",
  slug: "ai-foundations",
  number: 2,
  title: "AI Foundations",
  summary: "Understand where AI came from.",
  leaveWith: "A summary of a primary source paper.",
  weekRange: "Weeks 4–5",
  status: "active",
  tone: "reading",
  lessons: [
    { id: "l1", slug: "where-ai-came-from", title: "Where AI came from", summary: "Seven eras." },
    { id: "l2", slug: "how-models-learn", title: "How models learn", summary: "Vectors." },
  ],
  hasPractice: true,
  hasCheckpoint: true,
};

const comingModule: ModuleDefinition = {
  ...activeModule,
  id: "visual-ai",
  slug: "visual-ai",
  number: 4,
  title: "Visual AI",
  status: "coming",
};

describe("ModuleIndexCard", () => {
  it("renders module number, title, and summary", () => {
    render(<ModuleIndexCard module={activeModule} />);

    expect(screen.getByText("Module 2")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI Foundations", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Understand where AI came from.")).toBeInTheDocument();
  });

  it("shows lesson count and week range", () => {
    render(<ModuleIndexCard module={activeModule} />);

    expect(screen.getByText("2 lessons")).toBeInTheDocument();
    expect(screen.getByText("Weeks 4–5")).toBeInTheDocument();
  });

  it("links to module page when active", () => {
    render(<ModuleIndexCard module={activeModule} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/modules/ai-foundations");
  });

  it("renders as disabled when status is coming", () => {
    render(<ModuleIndexCard module={comingModule} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("hides status badge when module is active", () => {
    render(<ModuleIndexCard module={activeModule} />);

    expect(screen.queryByText("Active")).not.toBeInTheDocument();
  });
});

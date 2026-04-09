import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModuleShell } from "@/components/module-shell";
import type { ModuleDefinition } from "@/lib/module-content/types";

const testModule: ModuleDefinition = {
  id: "ai-foundations",
  slug: "ai-foundations",
  number: 2,
  title: "AI Foundations",
  summary: "Understand where AI came from.",
  leaveWith: "A summary of a primary source paper.",
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

describe("ModuleShell", () => {
  it("renders module title as h1", () => {
    render(<ModuleShell module={testModule} />);

    expect(
      screen.getByRole("heading", { name: "AI Foundations", level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders module number and week range", () => {
    render(<ModuleShell module={testModule} />);

    expect(screen.getByText("Module 2 · Weeks 4–5")).toBeInTheDocument();
  });

  it("renders lesson list", () => {
    render(<ModuleShell module={testModule} />);

    expect(screen.getByText("Where AI came from")).toBeInTheDocument();
    expect(screen.getByText("How models learn")).toBeInTheDocument();
  });

  it("renders practice and checkpoint links", () => {
    render(<ModuleShell module={testModule} />);

    const practiceLink = screen.getByRole("link", { name: "Practice" });
    expect(practiceLink).toHaveAttribute("href", "/modules/ai-foundations/practice");

    const checkpointLink = screen.getByRole("link", { name: "Checkpoint" });
    expect(checkpointLink).toHaveAttribute("href", "/modules/ai-foundations/checkpoint");
  });

  it("renders leave-with text", () => {
    render(<ModuleShell module={testModule} />);

    expect(screen.getByText("A summary of a primary source paper.")).toBeInTheDocument();
  });

  it("renders lesson links with correct hrefs", () => {
    render(<ModuleShell module={testModule} />);

    const links = screen.getAllByRole("link").filter((link) =>
      link.getAttribute("href")?.includes("/modules/ai-foundations/"),
    );
    expect(links.some((l) => l.getAttribute("href") === "/modules/ai-foundations/where-ai-came-from")).toBe(true);
    expect(links.some((l) => l.getAttribute("href") === "/modules/ai-foundations/how-models-learn")).toBe(true);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ReturnToTourCTA } from "@/components/return-to-tour-cta";
import { ModuleIndexCard } from "@/components/module-index-card";
import { allModules, getModule } from "@/lib/module-content";

describe("ReturnToTourCTA", () => {
  it("renders nothing when tourSteps is empty", () => {
    const { container } = render(<ReturnToTourCTA tourSteps={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a single tour step link", () => {
    render(<ReturnToTourCTA tourSteps={["proof"]} />);
    expect(screen.getByText("Return to the tour")).toBeInTheDocument();
    const link = screen.getByText("Proof step →");
    expect(link).toHaveAttribute("href", "/tour/proof");
  });

  it("renders multiple tour step links", () => {
    render(<ReturnToTourCTA tourSteps={["build", "publish"]} />);
    expect(screen.getByText("Build step →")).toHaveAttribute("href", "/tour/build");
    expect(screen.getByText("Publish step →")).toHaveAttribute("href", "/tour/publish");
  });
});

describe("ModuleIndexCard — Deepens label", () => {
  it("shows Deepens label for modules with tourSteps", () => {
    const mod = getModule("agentic-workflow")!;
    render(<ModuleIndexCard module={mod} />);
    expect(screen.getByText(/Deepens:/)).toBeInTheDocument();
    expect(screen.getByText(/Build/)).toBeInTheDocument();
  });

  it("shows multiple tour step names", () => {
    const mod = getModule("studio-and-publish")!;
    render(<ModuleIndexCard module={mod} />);
    expect(screen.getByText(/Deepens:.*Build.*Publish/)).toBeInTheDocument();
  });

  it("all modules now have tourSteps", () => {
    for (const mod of allModules) {
      expect(mod.tourSteps?.length).toBeGreaterThan(0);
    }
  });
});

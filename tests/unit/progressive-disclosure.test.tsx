import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProgressiveDisclosure } from "@/components/progressive-disclosure";
import { PsychologyPrincipleCard } from "@/components/psychology-principle-card";

describe("ProgressiveDisclosure", () => {
  it("renders with title and children", () => {
    render(
      <ProgressiveDisclosure title="Test section">
        <p>Inner content</p>
      </ProgressiveDisclosure>,
    );
    expect(screen.getByText("Test section")).toBeInTheDocument();
    expect(screen.getByText("Inner content")).toBeInTheDocument();
  });

  it("is closed by default", () => {
    render(
      <ProgressiveDisclosure title="Closed section">
        <p>Hidden</p>
      </ProgressiveDisclosure>,
    );
    const details = screen.getByText("Closed section").closest("details");
    expect(details).not.toHaveAttribute("open");
  });

  it("can render open by default", () => {
    render(
      <ProgressiveDisclosure title="Open section" defaultOpen>
        <p>Visible</p>
      </ProgressiveDisclosure>,
    );
    const details = screen.getByText("Open section").closest("details");
    expect(details).toHaveAttribute("open");
  });
});

describe("PsychologyPrincipleCard", () => {
  it("renders title, description, and application", () => {
    render(
      <PsychologyPrincipleCard
        title="Social Proof"
        description="People follow what others do."
        application="Show testimonials from peers near the CTA."
      />,
    );
    expect(screen.getByText("Social Proof")).toBeInTheDocument();
    expect(screen.getByText("People follow what others do.")).toBeInTheDocument();
    expect(screen.getByText(/Show testimonials from peers/)).toBeInTheDocument();
  });
});

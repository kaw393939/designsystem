import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GuidedStepShell } from "@/components/guided-step-shell";

vi.mock("@/components/page-shell", () => ({
  PageShell: ({ children }: { children: ReactNode }) => (
    <div data-testid="page-shell">{children}</div>
  ),
}));

vi.mock("@/components/site-journey-provider", () => ({
  useSiteJourney: () => ({
    currentPage: null,
    previousPage: null,
    recentPages: [],
    lastTourPage: null,
    lastSupportPage: null,
    briefCount: 0,
    setBriefCount: vi.fn(),
    hasHydrated: true,
    isResumeBandDismissed: false,
    dismissResumeBand: vi.fn(),
    restoreResumeBand: vi.fn(),
  }),
}));

describe("GuidedStepShell", () => {
  it("renders the shared guided frame, progress context, and record surface", () => {
    render(
      <GuidedStepShell
        eyebrow="Tour family"
        title="Move through the sequence that takes a site from signal to public proof."
        summary="A shared shell should carry the state and the next move."
        status="Required in tour"
        prerequisite="Choose the right lane from the lobby."
        output="Audience, signal, and proof decisions carried forward."
        currentStepId="signal"
        recordEntries={[
          {
            id: "audience",
            label: "Audience",
            value: "Prospective museum visitor",
            placeholder: "Not named yet.",
          },
        ]}
        actions={[{ href: "/playbook", label: "Start with the selection playbook" }]}
        misconception={<p>Do not browse first.</p>}
        formativeCheck={<p>Name the audience and promise.</p>}
      >
        <section>
          <h2>Tour map</h2>
          <p>Shared shell content.</p>
        </section>
      </GuidedStepShell>,
    );

    expect(screen.getByText("Required in tour")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Move through the sequence that takes a site from signal to public proof.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();
    expect(screen.getByText("Before you start")).toBeInTheDocument();
    expect(screen.getByText("Leave with")).toBeInTheDocument();
    expect(screen.getByText("Avoid")).toBeInTheDocument();
    expect(screen.getByText("Quick check")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pick the vibe" })).toHaveAttribute(
      "href",
      "/tour/archetype",
    );
    expect(screen.getByRole("link", { name: "See a quick page opener" })).toHaveAttribute(
      "href",
      "/examples/module",
    );
    expect(
      screen.getByRole("link", { name: "Start with the selection playbook" }),
    ).toHaveAttribute("href", "/playbook");
  });
});
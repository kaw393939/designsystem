import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ModuleShell } from "@/components/module-shell";
import type { ModuleDefinition } from "@/lib/module-content/types";

import SignalPage from "@/app/tour/signal/page";
import ArchetypePage from "@/app/tour/archetype/page";
import StylePage from "@/app/tour/style/page";
import ProofPage from "@/app/tour/proof/page";
import BuildPage from "@/app/tour/build/page";
import PublishPage from "@/app/tour/publish/page";

import BrowseArchetypesPage from "@/app/browse/archetypes/page";
import BrowseLineagesPage from "@/app/browse/design-lineages/page";
import BrowseAttentionPage from "@/app/browse/attention-trust/page";
import BrowseSourcesPage from "@/app/browse/sources/page";

import HomePage from "@/app/page";
import InstructorGuidePage from "@/app/instructor-guide/page";

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

/* ------------------------------------------------------------------ */
/*  Tour → Module cross-links                                         */
/* ------------------------------------------------------------------ */

describe("Tour → Module cross-links", () => {
  it("Signal page links to Module 1", () => {
    render(<SignalPage />);
    expect(screen.getAllByText(/go deeper/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("link", { name: /open module 1/i }),
    ).toHaveAttribute("href", "/modules/web-presence-framework");
  });

  it("Archetype page links to Module 1", () => {
    render(<ArchetypePage />);
    expect(
      screen.getByRole("link", { name: /open module 1/i }),
    ).toHaveAttribute("href", "/modules/web-presence-framework");
  });

  it("Style page links to Module 1", () => {
    render(<StylePage />);
    expect(screen.getByText(/go deeper/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open module 1/i }),
    ).toHaveAttribute("href", "/modules/web-presence-framework");
  });

  it("Proof page links to Module 5", () => {
    render(<ProofPage />);
    expect(screen.getByText(/go deeper/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open module 5/i }),
    ).toHaveAttribute("href", "/modules/identity-and-proof");
  });

  it("Build page links to Module 3 and Module 4", () => {
    render(<BuildPage />);
    expect(screen.getByText(/go deeper/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open module 3/i }),
    ).toHaveAttribute("href", "/modules/agentic-workflow");
    expect(
      screen.getByRole("link", { name: /open module 4/i }),
    ).toHaveAttribute("href", "/modules/visual-ai");
  });

  it("Publish page links to Module 6", () => {
    render(<PublishPage />);
    expect(screen.getByText(/go deeper/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open module 6/i }),
    ).toHaveAttribute("href", "/modules/studio-and-publish");
  });
});

/* ------------------------------------------------------------------ */
/*  Browse → Module cross-links                                        */
/* ------------------------------------------------------------------ */

describe("Browse → Module cross-links", () => {
  it("Archetypes room links to Module 1", () => {
    render(<BrowseArchetypesPage />);
    expect(
      screen.getByRole("link", { name: /open module 1.*web presence/i }),
    ).toHaveAttribute("href", "/modules/web-presence-framework");
  });

  it("Design Lineages room links to Module 1", () => {
    render(<BrowseLineagesPage />);
    expect(
      screen.getByRole("link", { name: /open module 1.*web presence/i }),
    ).toHaveAttribute("href", "/modules/web-presence-framework");
  });

  it("Attention & Trust room links to Module 5", () => {
    render(<BrowseAttentionPage />);
    expect(
      screen.getByRole("link", { name: /open module 5.*identity/i }),
    ).toHaveAttribute("href", "/modules/identity-and-proof");
  });

  it("Sources room links to Module 2", () => {
    render(<BrowseSourcesPage />);
    expect(
      screen.getByRole("link", { name: /open module 2.*ai foundations/i }),
    ).toHaveAttribute("href", "/modules/ai-foundations");
  });
});

/* ------------------------------------------------------------------ */
/*  Homepage modules entry                                             */
/* ------------------------------------------------------------------ */

describe("Homepage modules entry", () => {
  it("renders a course modules link", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("link", { name: /open course modules/i }),
    ).toHaveAttribute("href", "/modules");
  });
});

/* ------------------------------------------------------------------ */
/*  ModuleShell tour step panel                                        */
/* ------------------------------------------------------------------ */

describe("ModuleShell tour step references", () => {
  const moduleWithTourSteps: ModuleDefinition = {
    id: "web-presence-framework",
    slug: "web-presence-framework",
    number: 1,
    title: "Web Presence Framework",
    summary: "Build a site from audience to publish.",
    leaveWith: "A completed brief.",
    weekRange: "Weeks 1–3",
    status: "active",
    tone: "next",
    lessons: [
      { id: "l1", slug: "who-is-this-for", title: "Who is this for", summary: "Audience." },
    ],
    hasPractice: true,
    hasCheckpoint: true,
    tourSteps: ["signal", "archetype", "style"],
  };

  const moduleWithoutTourSteps: ModuleDefinition = {
    id: "ai-foundations",
    slug: "ai-foundations",
    number: 2,
    title: "AI Foundations",
    summary: "Understand where AI came from.",
    leaveWith: "A summary.",
    weekRange: "Weeks 4–5",
    status: "active",
    tone: "reading",
    lessons: [
      { id: "l1", slug: "where-ai-came-from", title: "Where AI came from", summary: "Eras." },
    ],
    hasPractice: true,
    hasCheckpoint: true,
  };

  it("renders tour step panel when tourSteps provided", () => {
    render(<ModuleShell module={moduleWithTourSteps} />);
    expect(screen.getByText(/where this fits in the tour/i)).toBeInTheDocument();
  });

  it("links to matched tour steps", () => {
    render(<ModuleShell module={moduleWithTourSteps} />);
    const link = screen.getByRole("link", { name: /figure out who it is for/i });
    expect(link).toHaveAttribute("href", "/tour/signal");
  });

  it("does not render tour panel when no tourSteps", () => {
    render(<ModuleShell module={moduleWithoutTourSteps} />);
    expect(screen.queryByText(/where this fits in the tour/i)).not.toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  Instructor guide week mapping                                      */
/* ------------------------------------------------------------------ */

describe("Instructor guide module-to-week mapping", () => {
  it("renders the semester plan table", () => {
    render(<InstructorGuidePage />);
    expect(screen.getByText(/map the six modules across 16 weeks/i)).toBeInTheDocument();
  });

  it("renders all six module rows", () => {
    render(<InstructorGuidePage />);
    expect(
      screen.getByRole("link", { name: /module 1.*web presence/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /module 2.*ai foundations/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /module 3.*agentic/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /module 4.*visual/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /module 5.*identity/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /module 6.*studio/i }),
    ).toBeInTheDocument();
  });

  it("renders teaching notes section", () => {
    render(<InstructorGuidePage />);
    expect(screen.getByText(/what to know before each module/i)).toBeInTheDocument();
  });

  it("renders per-module teaching cards", () => {
    render(<InstructorGuidePage />);
    expect(screen.getByText(/module 1 — web presence framework/i)).toBeInTheDocument();
    expect(screen.getByText(/module 6 — studio and publish/i)).toBeInTheDocument();
  });
});

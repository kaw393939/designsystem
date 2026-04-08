import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/site-header";
import { useSiteJourney } from "@/components/site-journey-provider";

const { usePathname } = vi.hoisted(() => ({
  usePathname: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname,
}));

vi.mock("@/components/site-journey-provider", () => ({
  useSiteJourney: vi.fn(),
}));

const mockedUseSiteJourney = vi.mocked(useSiteJourney);

function mockJourneyState(overrides: Partial<ReturnType<typeof useSiteJourney>> = {}) {
  mockedUseSiteJourney.mockReturnValue({
    currentPage: null,
    previousPage: null,
    recentPages: [],
    lastTourPage: null,
    lastSupportPage: null,
    briefCount: 0,
    setBriefCount: vi.fn(),
    hasHydrated: true,
    ...overrides,
  } as ReturnType<typeof useSiteJourney>);
}

describe("SiteHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    usePathname.mockReturnValue("/");
    mockJourneyState();
  });

  it("does not duplicate resume links on family landing pages", () => {
    usePathname.mockReturnValue("/");
    mockJourneyState({
      lastTourPage: {
        path: "/tour/style",
        title: "Choose the look",
        kind: "tour",
        visitedAt: 3,
      },
    });

    render(<SiteHeader />);

    expect(
      screen.queryByRole("link", { name: "Resume Choose the look" }),
    ).not.toBeInTheDocument();
  });

  it("does not show a resume action during active tour steps", () => {
    usePathname.mockReturnValue("/tour/archetype");
    mockJourneyState({
      currentPage: {
        path: "/tour/signal",
        title: "Figure out who it is for",
        kind: "tour",
        visitedAt: 1,
      },
      lastTourPage: {
        path: "/tour/signal",
        title: "Figure out who it is for",
        kind: "tour",
        visitedAt: 1,
      },
    });

    render(<SiteHeader />);

    expect(
      screen.queryByRole("link", { name: "Resume Figure out who it is for" }),
    ).not.toBeInTheDocument();
  });

  it("still shows a resume action on non-tour pages", () => {
    usePathname.mockReturnValue("/recipes");
    mockJourneyState({
      lastTourPage: {
        path: "/tour/archetype",
        title: "Pick the vibe",
        kind: "tour",
        visitedAt: 2,
      },
    });

    render(<SiteHeader />);

    const resumeLinks = screen.getAllByRole("link", { name: "Resume Pick the vibe" });

    expect(resumeLinks).toHaveLength(2);
    resumeLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/tour/archetype");
    });
  });
});
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GuidedStepCompanion } from "@/components/guided-step-companion";
import { useSiteJourney } from "@/components/site-journey-provider";

vi.mock("@/components/site-journey-provider", () => ({
  useSiteJourney: vi.fn(),
}));

const mockedUseSiteJourney = vi.mocked(useSiteJourney);

function createStorage() {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    get length() {
      return store.size;
    },
  } satisfies Storage;
}

describe("GuidedStepCompanion", () => {
  beforeEach(() => {
    mockedUseSiteJourney.mockReturnValue({
      currentPage: null,
      previousPage: null,
      recentPages: [],
      lastTourPage: null,
      lastSupportPage: null,
      briefCount: 2,
      setBriefCount: vi.fn(),
      hasHydrated: true,
      isResumeBandDismissed: false,
      dismissResumeBand: vi.fn(),
      restoreResumeBand: vi.fn(),
    } as ReturnType<typeof useSiteJourney>);

    Object.defineProperty(window, "localStorage", {
      value: createStorage(),
      configurable: true,
    });
  });

  it("uses a single mobile helper launcher instead of duplicate launch buttons", () => {
    render(
      <GuidedStepCompanion
        mode="mobile"
        currentStepId="signal"
        recordEntries={[
          {
            id: "audience",
            label: "Audience",
            placeholder: "Name the person you want to reach.",
            isCurrent: true,
          },
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: "Open tour helper" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open my brief" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Open the path" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open tour helper" }));

    expect(screen.getByRole("button", { name: "My brief" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "6-step path" })).toBeInTheDocument();
  });
});
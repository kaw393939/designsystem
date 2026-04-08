import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SiteJourneyProvider, useSiteJourney } from "@/components/site-journey-provider";
import { TourRecordPanel } from "@/components/tour-record-panel";
import { TOUR_BRIEF_STORAGE_KEY } from "@/lib/tour-brief-storage";

const { usePathname } = vi.hoisted(() => ({
  usePathname: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname,
}));

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

function BriefCountProbe() {
  const { briefCount } = useSiteJourney();

  return <output data-testid="brief-count">{briefCount}</output>;
}

const entries = [
  {
    id: "audience",
    label: "Audience",
    value: "Museum visitor who needs a clear first read.",
    placeholder: "Not named yet.",
    isCurrent: true,
  },
  {
    id: "proof-plan",
    label: "Proof plan",
    placeholder: "Not drafted yet.",
  },
] as const;

function renderPanel() {
  return render(
    <SiteJourneyProvider>
      <BriefCountProbe />
      <TourRecordPanel entries={entries} />
    </SiteJourneyProvider>,
  );
}

describe("TourRecordPanel", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/tour/audience");
    Object.defineProperty(window, "localStorage", {
      value: createStorage(),
      configurable: true,
    });
  });

  it("renders current values and placeholders inside the site journey provider", () => {
    renderPanel();

    expect(
      screen.getByRole("heading", { name: "What you have so far" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Audience")).toBeInTheDocument();
    expect(
      screen.getByText("Example: Museum visitor who needs a clear first read."),
    ).toBeInTheDocument();
    expect(screen.getByText("Working on this now")).toBeInTheDocument();
    expect(screen.getByLabelText("Proof plan")).toHaveAttribute(
      "placeholder",
      "Not drafted yet.",
    );
  });

  it("hydrates saved notes and updates the shared brief count without an update loop", async () => {
    window.localStorage.setItem(
      TOUR_BRIEF_STORAGE_KEY,
      JSON.stringify({
        audience: "Museum visitor who needs a clear first read.",
        "proof-plan": "Quote from a recent student.",
      }),
    );

    renderPanel();

    expect(
      await screen.findByDisplayValue("Museum visitor who needs a clear first read."),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Quote from a recent student."),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("brief-count")).toHaveTextContent("2");
    });
  });
});
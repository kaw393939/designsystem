import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocalNav } from "@/components/local-nav";

describe("LocalNav", () => {
  it("renders the nav title, progress label, and anchor links", () => {
    render(
      <LocalNav
        title="Lesson map"
        progress="Lesson 2 of 6"
        items={[
          {
            id: "orientation",
            label: "Orientation",
            description: "Set the stakes.",
          },
          { id: "reflection", label: "Reflection", current: true },
        ]}
      />,
    );

    expect(screen.getAllByText("Lesson 2 of 6").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole("heading", { name: "Lesson map" }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: "Orientation" })).toHaveAttribute(
      "href",
      "#orientation",
    );
    expect(screen.getByRole("link", { name: "Reflection" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByText("Set the stakes.")).toBeInTheDocument();
  });
});

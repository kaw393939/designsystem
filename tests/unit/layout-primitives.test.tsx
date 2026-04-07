import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LessonShell } from "@/components/lesson-shell";
import { PageShell } from "@/components/page-shell";
import { SplitLayout } from "@/components/split-layout";

describe("layout shells and primitives", () => {
  it("renders PageShell with a skip link and core landmarks", () => {
    render(
      <PageShell>
        <p>Shell body</p>
      </PageShell>,
    );

    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      within(screen.getByRole("main")).getByText("Shell body"),
    ).toBeInTheDocument();
  });

  it("supports LessonShell pages with no local navigation", () => {
    render(
      <LessonShell progress="Lesson 3 of 5">
        <p>Lesson body</p>
      </LessonShell>,
    );

    expect(
      screen.queryByRole("navigation", { name: "Lesson navigation" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Lesson 3 of 5")).toBeInTheDocument();
    expect(screen.getByText("Lesson body")).toBeInTheDocument();
  });

  it("falls back cleanly when SplitLayout has no secondary content", () => {
    const { container } = render(<SplitLayout primary={<p>Primary only</p>} />);

    expect(screen.getByText("Primary only")).toBeInTheDocument();
    expect(container.querySelectorAll(".grid")).toHaveLength(0);
  });
});

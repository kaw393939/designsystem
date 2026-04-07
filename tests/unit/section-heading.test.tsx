import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "@/components/section-heading";

describe("SectionHeading", () => {
  it("renders the eyebrow, title, and supporting body copy", () => {
    render(
      <SectionHeading
        eyebrow="Process"
        title="One operating loop"
        body="The files, not the chat, define what is approved."
      />,
    );

    expect(screen.getByText("Process")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "One operating loop", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The files, not the chat, define what is approved."),
    ).toBeInTheDocument();
  });

  it("supports top-level page headings when requested", () => {
    render(
      <SectionHeading
        eyebrow="Status"
        title="What is actually done"
        body="Use this component as a page hero only when the route has no other h1."
        headingLevel={1}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "What is actually done", level: 1 }),
    ).toBeInTheDocument();
  });
});

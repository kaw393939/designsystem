import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArchetypeDetailCard } from "@/components/archetype-detail-card";
import { PersuasionMoveCard } from "@/components/persuasion-move-card";
import { archetypeProfiles } from "@/lib/archetype-atlas-content";
import { persuasionMethods } from "@/lib/persuasion-content";

describe("ArchetypeDetailCard", () => {
  const profile = archetypeProfiles[0];

  it("renders archetype name and core desire", () => {
    render(<ArchetypeDetailCard archetype={profile} />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(profile.coreDesire))).toBeInTheDocument();
  });

  it("shows psychology profile in a collapsible section", () => {
    render(<ArchetypeDetailCard archetype={profile} />);
    expect(screen.getByText("Psychology profile")).toBeInTheDocument();
  });

  it("renders all 12 archetypes without error", () => {
    const { container } = render(
      <>
        {archetypeProfiles.map((a) => (
          <ArchetypeDetailCard key={a.slug} archetype={a} />
        ))}
      </>
    );
    expect(container.querySelectorAll("details").length).toBeGreaterThanOrEqual(12);
  });
});

describe("PersuasionMoveCard", () => {
  const method = persuasionMethods[0];

  it("renders method name and definition", () => {
    render(
      <PersuasionMoveCard
        title={method.name}
        definition={method.definition}
        application={method.whyItWorks}
        example={method.commonMistake}
        tourStepHref="/tour/build"
        tourStepLabel="Build step"
      />
    );
    expect(screen.getByText(method.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(method.definition.slice(0, 30)))).toBeInTheDocument();
  });

  it("renders tour step link", () => {
    render(
      <PersuasionMoveCard
        title={method.name}
        definition={method.definition}
        application={method.whyItWorks}
        example={method.commonMistake}
        tourStepHref="/tour/build"
        tourStepLabel="Build step"
      />
    );
    const link = screen.getByText("Build step");
    expect(link).toHaveAttribute("href", "/tour/build");
  });

  it("renders all 6 persuasion methods without error", () => {
    render(
      <>
        {persuasionMethods.map((m) => (
          <PersuasionMoveCard
            key={m.slug}
            title={m.name}
            definition={m.definition}
            application={m.whyItWorks}
            example={m.commonMistake}
            tourStepHref="/tour"
            tourStepLabel="Tour"
          />
        ))}
      </>
    );
    expect(screen.getAllByText("Tour")).toHaveLength(6);
  });
});

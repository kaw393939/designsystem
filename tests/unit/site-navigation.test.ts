import { describe, expect, it } from "vitest";

import {
  browseRoomCards,
  buildTourRecordEntries,
  outcomeProofExampleCards,
  getGuidedTourStep,
  guidedTourRecordExamples,
  structuralExampleCards,
} from "@/lib/site-navigation";

describe("site navigation guided-tour helpers", () => {
  it("returns canonical route metadata for guided steps", () => {
    expect(getGuidedTourStep("signal").href).toBe("/tour/signal");
    expect(getGuidedTourStep("build").href).toBe("/tour/build");
    expect(getGuidedTourStep("archetype").supportHref).toBe(
      "/browse/archetypes",
    );
    expect(getGuidedTourStep("publish").supportHref).toBe("/examples");
  });

  it("builds tour-record entries and highlights the field owned by the current step", () => {
    const styleStep = getGuidedTourStep("style");
    const entries = buildTourRecordEntries(
      guidedTourRecordExamples.style,
      styleStep.recordFields,
    );

    expect(entries.find((entry) => entry.id === "audience")?.value).toContain(
      "founder hiring a second engineer",
    );
    expect(
      entries.find((entry) => entry.id === "visual-direction")?.isCurrent,
    ).toBe(true);
    expect(entries.find((entry) => entry.id === "publish-asset")?.value).toBeUndefined();
  });

  it("exposes canonical browse rooms and separates outcome proof from structural examples", () => {
    expect(browseRoomCards.map((room) => room.href)).toEqual([
      "/browse/archetypes",
      "/browse/design-lineages",
      "/browse/attention-trust",
      "/browse/sources",
    ]);
    expect(outcomeProofExampleCards.map((card) => card.href)).toEqual([
      "/examples/proof-blocks",
      "/examples/student-exemplars",
    ]);
    expect(structuralExampleCards.map((card) => card.href)).toEqual([
      "/examples/lesson",
      "/examples/module",
      "/examples/reading-map",
    ]);
  });
});
import { describe, expect, it } from "vitest";

import {
  concepts,
  eras,
  getPeopleByEraCluster,
  institutionProfiles,
  peopleProfiles,
  readingList,
} from "@/lib/module-content/ai-foundations";

describe("ai-foundations data", () => {
  it("has 7 eras", () => {
    expect(eras).toHaveLength(7);
  });

  it("each era has at least 3 milestones", () => {
    for (const era of eras) {
      expect(era.milestones.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("has 20 people profiles", () => {
    expect(peopleProfiles).toHaveLength(20);
  });

  it("all people have unique ids", () => {
    const ids = peopleProfiles.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all people have portrait paths", () => {
    for (const person of peopleProfiles) {
      expect(person.portraitSrc).toMatch(/^\/media\/modules\/portraits\/.+\.webp$/);
    }
  });

  it("has 6 institution profiles", () => {
    expect(institutionProfiles).toHaveLength(6);
  });

  it("getPeopleByEraCluster filters correctly", () => {
    const precursors = getPeopleByEraCluster("Precursors");
    expect(precursors.length).toBeGreaterThanOrEqual(3);
    expect(precursors.every((p) => p.era === "Precursors")).toBe(true);
  });

  it("has at least 14 concept definitions", () => {
    expect(concepts.length).toBeGreaterThanOrEqual(14);
  });

  it("has 10 reading list entries", () => {
    expect(readingList).toHaveLength(10);
  });

  it("reading list entries have valid URLs", () => {
    for (const entry of readingList) {
      expect(entry.url).toMatch(/^https?:\/\//);
    }
  });
});

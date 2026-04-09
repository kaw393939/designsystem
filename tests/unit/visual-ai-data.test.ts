import { describe, expect, it } from "vitest";

import {
  commonCliches,
  editorialRubric,
  modelComparisonRows,
  promptAnatomySections,
  promptExamples,
  specificityLadder,
} from "@/lib/module-content/visual-ai";

describe("visual-ai data", () => {
  it("has 10 prompt examples", () => {
    expect(promptExamples).toHaveLength(10);
  });

  it("all prompt examples have unique ids", () => {
    const ids = promptExamples.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("prompt examples have required fields", () => {
    for (const example of promptExamples) {
      expect(example.prompt).toBeTruthy();
      expect(example.imageSrc).toBeTruthy();
      expect(example.imageAlt).toBeTruthy();
      expect(example.annotation).toBeTruthy();
      expect(example.category).toBeTruthy();
    }
  });

  it("has 5 model comparison rows", () => {
    expect(modelComparisonRows).toHaveLength(5);
  });

  it("comparison rows have both columns", () => {
    for (const row of modelComparisonRows) {
      expect(row.designerConcept).toBeTruthy();
      expect(row.whatModelSees).toBeTruthy();
    }
  });

  it("has 3 specificity levels", () => {
    expect(specificityLadder).toHaveLength(3);
  });

  it("specificity levels are vague → better → precise", () => {
    expect(specificityLadder[0].level).toBe("vague");
    expect(specificityLadder[1].level).toBe("better");
    expect(specificityLadder[2].level).toBe("precise");
  });

  it("specificity levels have prompt and annotation", () => {
    for (const level of specificityLadder) {
      expect(level.prompt).toBeTruthy();
      expect(level.annotation).toBeTruthy();
    }
  });

  it("has 6 prompt anatomy sections", () => {
    expect(promptAnatomySections).toHaveLength(6);
  });

  it("prompt anatomy sections have unique ids", () => {
    const ids = promptAnatomySections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("prompt anatomy sections have definition and example", () => {
    for (const section of promptAnatomySections) {
      expect(section.title).toBeTruthy();
      expect(section.definition).toBeTruthy();
      expect(section.example).toBeTruthy();
    }
  });

  it("has 4 common clichés", () => {
    expect(commonCliches).toHaveLength(4);
  });

  it("clichés have unique ids", () => {
    const ids = commonCliches.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has 6 editorial rubric items", () => {
    expect(editorialRubric).toHaveLength(6);
  });

  it("editorial rubric items have unique ids", () => {
    const ids = editorialRubric.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("rubric items have question and guidance", () => {
    for (const item of editorialRubric) {
      expect(item.question).toBeTruthy();
      expect(item.guidance).toBeTruthy();
    }
  });
});

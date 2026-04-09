import { describe, expect, it } from "vitest";

import {
  briefRubric,
  briefSections,
  comparisonRows,
  concepts,
  limitationCategories,
} from "@/lib/module-content/agentic-workflow";

describe("agentic-workflow data", () => {
  it("has 6 concepts", () => {
    expect(concepts).toHaveLength(6);
  });

  it("all concepts have unique ids", () => {
    const ids = concepts.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has 6 comparison rows", () => {
    expect(comparisonRows).toHaveLength(6);
  });

  it("comparison rows have chatbot and agent columns", () => {
    for (const row of comparisonRows) {
      expect(row.chatbot).toBeTruthy();
      expect(row.agent).toBeTruthy();
    }
  });

  it("has 5 brief sections", () => {
    expect(briefSections).toHaveLength(5);
  });

  it("brief sections have definition and example", () => {
    for (const section of briefSections) {
      expect(section.definition).toBeTruthy();
      expect(section.example).toBeTruthy();
    }
  });

  it("has 6 brief rubric items", () => {
    expect(briefRubric).toHaveLength(6);
  });

  it("rubric items have question and tip", () => {
    for (const item of briefRubric) {
      expect(item.question).toBeTruthy();
      expect(item.tip).toBeTruthy();
    }
  });

  it("has 3 limitation categories", () => {
    expect(limitationCategories).toHaveLength(3);
  });

  it("limitation categories have at least 4 items each", () => {
    for (const cat of limitationCategories) {
      expect(cat.items.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("limitation categories have unique ids", () => {
    const ids = limitationCategories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

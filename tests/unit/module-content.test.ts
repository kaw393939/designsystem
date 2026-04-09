import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { allModules, getModule, getModuleByNumber } from "@/lib/module-content";

describe("module-content registry", () => {
  it("contains six modules", () => {
    expect(allModules).toHaveLength(6);
  });

  it("all modules have unique slugs", () => {
    const slugs = allModules.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all modules have at least one lesson", () => {
    for (const mod of allModules) {
      expect(mod.lessons.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("getModule returns the correct module by slug", () => {
    const mod = getModule("ai-foundations");
    expect(mod?.title).toBe("AI Foundations");
    expect(mod?.number).toBe(2);
  });

  it("getModule returns undefined for unknown slug", () => {
    expect(getModule("nonexistent")).toBeUndefined();
  });

  it("getModuleByNumber returns the correct module", () => {
    const mod = getModuleByNumber(1);
    expect(mod?.slug).toBe("web-presence-framework");
  });

  it("modules are numbered sequentially from 1", () => {
    const numbers = allModules.map((m) => m.number);
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

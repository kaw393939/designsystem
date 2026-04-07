import { describe, expect, it } from "vitest";

import {
  buildAbsoluteSiteUrl,
  getPreviewBaseUrl,
  normalizeBasePath,
  normalizeRoute,
} from "@/lib/site-config";

describe("site-config helpers", () => {
  it("normalizes base paths and routes consistently", () => {
    expect(normalizeBasePath("")).toBe("");
    expect(normalizeBasePath("design-system")).toBe("/design-system");
    expect(normalizeBasePath("/design-system/")).toBe("/design-system");
    expect(normalizeRoute("process")).toBe("/process/");
    expect(normalizeRoute("/status/")).toBe("/status/");
  });

  it("builds preview and absolute site urls from the current environment", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/design-system";
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    expect(getPreviewBaseUrl()).toBe("http://127.0.0.1:3000/design-system");
    expect(buildAbsoluteSiteUrl("/tokens/")).toBe(
      "https://example.com/design-system/tokens/",
    );

    process.env.NEXT_PUBLIC_BASE_PATH = "";
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
  });
});

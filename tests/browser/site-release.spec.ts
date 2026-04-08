import { expect, test } from "@playwright/test";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("selected release keeps non-selected exemplar routes parked and reroutes recipes to live examples", async ({
  page,
}) => {
  await page.goto(getRoutePath("/recipes/"));

  await expect(
    page.getByRole("link", { name: "Open lesson example" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open concept exemplar" }),
  ).toHaveCount(0);

  await page.goto(getRoutePath("/primitives/"));
  await expect(
    page.getByRole("heading", {
      name: "The reusable building blocks that make every lesson page feel guided instead of thrown together.",
    }),
  ).toBeVisible();
});

test("selected release sitemap exposes the canonical public route-family surface", async ({
  page,
}) => {
  await page.goto(getRoutePath("/sitemap.xml"));

  const sitemapText = (await page.locator("body").textContent()) ?? "";

  expect(sitemapText).toContain("/process/");
  expect(sitemapText).toContain("/status/");
  expect(sitemapText).toContain("/tokens/");
  expect(sitemapText).toContain("/layouts/");
  expect(sitemapText).toContain("/primitives/");
  expect(sitemapText).toContain("/recipes/");
  expect(sitemapText).toContain("/recipes/feedback-loops/");
  expect(sitemapText).toContain("/recipes/public-space-observation/");
  expect(sitemapText).toContain("/examples/module/");
  expect(sitemapText).toContain("/examples/lesson/");
  expect(sitemapText).toContain("/examples/reading-map/");
  expect(sitemapText).not.toMatch(/https?:\/\/[^\/\s<]+\/archetypes\/(\s|$)/);
  expect(sitemapText).not.toMatch(/https?:\/\/[^\/\s<]+\/design-styles\/(\s|$)/);
  expect(sitemapText).not.toMatch(/https?:\/\/[^\/\s<]+\/persuasion\/(\s|$)/);
  expect(sitemapText).not.toContain("/experiences/identity-portfolio/");
  expect(sitemapText).not.toContain("/playbook/");
  expect(sitemapText).not.toContain("/workbook/");
  expect(sitemapText).not.toContain("/deliverables/");
});

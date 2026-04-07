import { expect, test } from "@playwright/test";

const parkedPrimitivesTitle =
  "This primitives page is parked in the current release, so do not treat it like the student starting point.";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("primitives guide renders unit-driven concept, assignment, and reading-map examples", async ({
  page,
}) => {
  await page.goto(getRoutePath("/primitives/"));

  const parkedHeading = page.getByRole("heading", {
    name: parkedPrimitivesTitle,
  });

  if (await parkedHeading.count()) {
    await expect(parkedHeading).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open recipes guide" }),
    ).toBeVisible();
    await expect(page.locator("a.action-primary").first()).toBeVisible();
    return;
  }

  await expect(
    page.getByRole("heading", {
      name: "Pedagogical primitives and unit-driven rendering now share one contract learners can actually feel.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Reusable primitives matter because they preserve the teaching arc under change.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Serialized content stays simple and the renderer derives runtime structure.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "The layout system now carries structure and the educational layer now carries pedagogy.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Open recipes guide" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Jump to Module 1" }),
  ).toBeVisible();
});

test("primitives guide preserves a single page-level h1 while rendering sample units below it", async ({
  page,
}) => {
  await page.goto(getRoutePath("/primitives/"));

  const h1Count = await page.locator("h1").count();
  expect(h1Count).toBe(1);

  const parkedHeading = page.getByRole("heading", {
    name: parkedPrimitivesTitle,
  });

  if (await parkedHeading.count()) {
    await expect(parkedHeading).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open recipes guide" }),
    ).toHaveAttribute("href", getRoutePath("/recipes/"));
    return;
  }

  await expect(
    page.getByRole("navigation", { name: "Lesson navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "One renderer now maps stored blocks into runtime component props.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Useful terms for this assignment"),
  ).toBeVisible();
});

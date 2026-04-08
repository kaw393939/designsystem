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
      name: "The reusable building blocks that make every lesson page feel guided instead of thrown together.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "These blocks matter because they keep the teaching flow intact even when content changes.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Content is stored simply \u2014 the page figures out how to display it.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "The layout handles structure. The teaching blocks handle the learning flow.",
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
}, testInfo) => {
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

  if (testInfo.project.name !== "mobile-chrome") {
    await expect(
      page.getByRole("navigation", { name: "Lesson navigation" }),
    ).toBeVisible();
  }
  await expect(
    page.getByRole("heading", {
      name: "One system reads the stored content and turns it into styled page blocks.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Useful terms for this assignment"),
  ).toBeVisible();
});

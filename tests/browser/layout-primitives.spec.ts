import { expect, test } from "@playwright/test";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("lesson example preserves landmarks, heading flow, and accessible local nav behavior", async ({
  page,
}, testInfo) => {
  await page.goto(getRoutePath("/examples/lesson/"));

  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toHaveAttribute("href", "#main-content");

  const headingLevels = await page
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((elements) =>
      elements.map((element) => Number(element.tagName.slice(1))),
    );

  expect(headingLevels.filter((level) => level === 1)).toHaveLength(1);
  expect(
    headingLevels.every((level) => level === 1 || level === 2),
  ).toBeTruthy();

  const localNav = page.getByRole("navigation", { name: "Lesson navigation" });

  if (testInfo.project.name === "mobile-chrome") {
    const comparisonSplit = page.locator("#comparison > div.grid").first();
    const comparisonColumns = await comparisonSplit.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
    );

    expect(comparisonColumns).toBe(1);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );

    expect(hasHorizontalOverflow).toBeFalsy();
  } else {
    await expect(localNav).toBeVisible();

    const navPosition = await localNav.evaluate(
      (element) => getComputedStyle(element).position,
    );

    expect(navPosition).toBe("sticky");

    const comparisonSplit = page.locator("#comparison > div.grid").first();
    const comparisonColumns = await comparisonSplit.evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
    );

    expect(comparisonColumns).toBe(2);
  }
});

test("module grids collapse on mobile and expand on desktop without rescue wrappers", async ({
  page,
}, testInfo) => {
  await page.goto(getRoutePath("/examples/module/"));

  const moduleGrid = page
    .locator("section div[style*='grid-template-columns']")
    .first();
  await expect(moduleGrid).toBeVisible();

  const gridColumnCount = await moduleGrid.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean)
        .length,
  );

  if (testInfo.project.name === "mobile-chrome") {
    expect(gridColumnCount).toBe(1);
  } else {
    expect(gridColumnCount).toBeGreaterThan(1);
  }

  await page.goto(getRoutePath("/status/"));
  await expect(
    page.getByRole("heading", {
      name: "You need a clean line between what is solid and what is still just a plan.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Sprint 2 layout primitives and shared page shells"),
  ).toBeVisible();
});

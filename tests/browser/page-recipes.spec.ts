import { expect, test } from "@playwright/test";

const parkedConceptTitle =
  "This concept page is parked in the current release, so start from a page that is actually live.";
const parkedLessonTitle =
  "This lesson page is parked in the current release, so start from the live route instead.";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("recipes guide exposes the typed contract model and dedicated exemplar routes", async ({
  page,
}) => {
  await page.goto(getRoutePath("/recipes/"));

  await expect(
    page.getByRole("heading", {
      name: "Use recipes when you already know what kind of page you are making and just need a pattern that works.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "These page types already have working patterns.",
    }),
  ).toBeVisible();

  const conceptExemplarLink = page.getByRole("link", {
    name: "Open concept exemplar",
  });
  const lessonFallbackLink = page.getByRole("link", {
    name: "Open lesson example",
  });

  if (await conceptExemplarLink.count()) {
    await expect(conceptExemplarLink.first()).toBeVisible();
  } else {
    await expect(lessonFallbackLink.first()).toBeVisible();
  }

  const lessonExemplarLink = page.getByRole("link", {
    name: "Open lesson exemplar",
  });
  const moduleFallbackLink = page.getByRole("link", {
    name: "Open module example",
  });

  if (await lessonExemplarLink.count()) {
    await expect(lessonExemplarLink.first()).toBeVisible();
  } else {
    await expect(moduleFallbackLink.first()).toBeVisible();
  }
});

test("concept and lesson exemplar routes load as standalone educational pages", async ({
  page,
}, testInfo) => {
  await page.goto(getRoutePath("/recipes/feedback-loops/"));

  const inactiveConceptHeading = page.getByRole("heading", {
    name: parkedConceptTitle,
  });

  if (await inactiveConceptHeading.count()) {
    await expect(inactiveConceptHeading).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open recipes guide" }),
    ).toBeVisible();
  } else {
    await expect(page.locator("h1")).toContainText(
      "A feedback loop changes what happens next, not just what happened before.",
    );
    if (testInfo.project.name !== "mobile-chrome") {
      await expect(
        page.getByRole("navigation", { name: "Concept page" }),
      ).toBeVisible();
    }
    await expect(
      page.getByRole("link", { name: "Open the lesson page" }),
    ).toBeVisible();

    const conceptH1Count = await page.locator("h1").count();
    expect(conceptH1Count).toBe(1);
  }

  await page.goto(getRoutePath("/recipes/public-space-observation/"));

  const inactiveLessonHeading = page.getByRole("heading", {
    name: parkedLessonTitle,
  });

  if (await inactiveLessonHeading.count()) {
    await expect(inactiveLessonHeading).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open recipes guide" }),
    ).toBeVisible();
    return;
  }

  await expect(page.locator("h1")).toContainText(
    "How to read a public square like a system.",
  );
  if (testInfo.project.name !== "mobile-chrome") {
    await expect(
      page.getByRole("navigation", { name: "Lesson page" }),
    ).toBeVisible();
  }
  await expect(
    page.getByRole("link", { name: "Open the concept page" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Method sources" }),
  ).toBeVisible();

  const lessonH1Count = await page.locator("h1").count();
  expect(lessonH1Count).toBe(1);
});

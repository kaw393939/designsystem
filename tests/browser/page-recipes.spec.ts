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
      name: "Use these recipes when you need a page pattern that already knows how to teach.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "Seven page types now share one reliable build pattern.",
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
    await expect(
      page
        .getByText(
          "This release parks the dedicated exemplar, so the button below opens the closest live page pattern.",
        )
        .first(),
    ).toBeVisible();
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
    await expect(
      page.getByRole("navigation", { name: "Concept page" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open the lesson page" }),
    ).toBeVisible();

    const conceptH1Count = await page.locator("h1").count();
    expect(conceptH1Count).toBe(1);

    if (testInfo.project.name === "mobile-chrome") {
      const conceptHeadingBox = await page.locator("h1").first().boundingBox();
      const conceptNavBox = await page
        .getByRole("navigation", { name: "Concept page" })
        .boundingBox();

      expect(conceptHeadingBox).not.toBeNull();
      expect(conceptNavBox).not.toBeNull();
      expect(conceptHeadingBox!.y).toBeLessThan(conceptNavBox!.y);
    }
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
  await expect(
    page.getByRole("navigation", { name: "Lesson page" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open the concept page" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Method sources" }),
  ).toBeVisible();

  const lessonH1Count = await page.locator("h1").count();
  expect(lessonH1Count).toBe(1);

  if (testInfo.project.name === "mobile-chrome") {
    const lessonHeadingBox = await page.locator("h1").first().boundingBox();
    const lessonNavBox = await page
      .getByRole("navigation", { name: "Lesson page" })
      .boundingBox();

    expect(lessonHeadingBox).not.toBeNull();
    expect(lessonNavBox).not.toBeNull();
    expect(lessonHeadingBox!.y).toBeLessThan(lessonNavBox!.y);
  }
});

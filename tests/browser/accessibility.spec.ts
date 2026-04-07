import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

const accessibilityAuditRoutes = [
  "/",
  "/process/",
  "/status/",
  "/primitives/",
  "/recipes/feedback-loops/",
  "/recipes/public-space-observation/",
];

test("representative routes pass the automated accessibility audit", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chrome",
    "Axe audits run once on the desktop baseline.",
  );

  for (const route of accessibilityAuditRoutes) {
    await page.goto(getRoutePath(route));

    const results = await new AxeBuilder({ page }).analyze();
    const violations = results.violations.map((violation) => ({
      route,
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map((node) => node.target.join(" ")),
    }));

    expect(violations).toEqual([]);
  }
});

test("skip link is the first keyboard target and moves focus into main content", async ({
  page,
}) => {
  await page.goto(getRoutePath("/"));

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("reduced-motion and forced-colors states keep the shell readable on the longest lesson flow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(getRoutePath("/recipes/public-space-observation/"));

  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(scrollBehavior).toBe("auto");

  const parkedHeading = page.getByRole("heading", {
    name: parkedLessonTitle,
  });
  const actionLink =
    (await parkedHeading.count()) > 0
      ? page.getByRole("link", { name: "Open recipes guide" })
      : page.getByRole("link", { name: "Open the concept page" });

  const actionTransitionDuration = await actionLink.evaluate(
    (element) => getComputedStyle(element).transitionDuration,
  );
  const primaryTransitionSeconds = Number.parseFloat(
    actionTransitionDuration.split(",")[0] ?? "1",
  );
  expect(primaryTransitionSeconds).toBeLessThanOrEqual(0.00002);

  await page.emulateMedia({ forcedColors: "active" });

  const shellShadow = await page
    .getByRole("banner")
    .evaluate((element) => getComputedStyle(element).boxShadow);
  expect(shellShadow).toBe("none");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(hasHorizontalOverflow).toBeFalsy();
});

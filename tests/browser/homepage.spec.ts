import { expect, test } from "@playwright/test";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("homepage exposes the identity course experience by default", async ({ page }) => {
  await page.goto(getRoutePath("/"));

  await expect(
    page.getByRole("heading", {
      name: "Build a portfolio that actually says something",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "See the course map" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Start with the signal" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "The start page should get you into the system fast.",
    ),
  ).toBeVisible();

  const startNavLink = page.getByRole("link", {
    name: "Start",
    exact: true,
  });
  await expect(startNavLink).toHaveAttribute("aria-current", "page");

  const signalNavLink = page.getByRole("link", {
    name: "Signal",
    exact: true,
  });
  await signalNavLink.click();

  await expect(signalNavLink).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("heading", {
      name: "Choose the signal that should govern the first read",
    }),
  ).toBeVisible();
});

test("documentation routes load from the exported site", async ({ page }) => {
  await page.goto(getRoutePath("/process/"));
  await expect(
    page.getByRole("heading", {
      name: "How work moves from source files to something you can trust.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/status/"));
  await expect(
    page.getByRole("heading", {
      name: "What is done, what is not, and where the line is.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tokens/"));
  await expect(
    page.getByRole("heading", {
      name: "Use tokens when the page feels off and you need to know why.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/layouts/"));
  await expect(
    page.getByRole("heading", {
      name: "Use the layout system when the content is fine but the page still feels off.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/primitives/"));
  await expect(
    page.getByRole("heading", {
      name: "This primitives page is parked in the current release, so do not treat it like the student starting point.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/recipes/"));
  await expect(
    page.getByRole("heading", {
      name: "Use these recipes when you need a page pattern that already knows how to teach.",
    }),
  ).toBeVisible();
});

test("example routes prove the shared primitive layer", async ({ page }) => {
  await page.goto(getRoutePath("/examples/module/"));
  await expect(
    page.getByRole("heading", {
      name: "Use a module opener when the whole route needs to make sense fast.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/examples/lesson/"));
  await expect(
    page.getByRole("heading", {
      name: "A long lesson can stay readable and still feel alive.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/examples/reading-map/"));
  await expect(
    page.getByRole("heading", {
      name: "A resource map should feel like a way in, not homework dumped on a page.",
    }),
  ).toBeVisible();
});

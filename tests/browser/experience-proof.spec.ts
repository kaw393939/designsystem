import { expect, test } from "@playwright/test";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("identity proof release renders the selected diagram route", async ({
  page,
}) => {
  test.skip(
    process.env.SITE_RELEASE_ID !== "identity-portfolio-system-proof-release",
    "Run only when the identity portfolio proof release is selected.",
  );

  await page.goto(getRoutePath("/experiences/identity-portfolio/signal/"));

  await expect(
    page.getByText("identity-portfolio-system-proof-release"),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Choose the signal that should govern the first read",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /primary archetype/i }),
  ).toBeVisible();
});

test("ai proof release renders the selected illustration and chart route", async ({
  page,
}) => {
  test.skip(
    process.env.SITE_RELEASE_ID !== "ai-second-renaissance-proof-release",
    "Run only when the AI second renaissance Sprint 9 proof release is selected.",
  );

  await page.goto(getRoutePath("/experiences/ai-second-renaissance/"));

  await expect(
    page.getByText("ai-second-renaissance-proof-release"),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /modern AI workspace/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /Two-bar chart/i }),
  ).toBeVisible();
});
import { expect, test } from "@playwright/test";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("selected release drives primary navigation and sitemap output", async ({
  page,
}) => {
  await page.goto(getRoutePath("/"));

  const identityNavLink = page.getByRole("link", {
    name: "Identity Portfolio",
    exact: true,
  });

  await expect(
    page.getByText("identity-portfolio-system-proof-release"),
  ).toBeVisible();
  await expect(identityNavLink).toBeVisible();
  await expect(identityNavLink).toHaveAttribute("aria-current", "page");

  await page.goto(getRoutePath("/status/"));
  await expect(
    page.getByRole("link", { name: "Status", exact: true }),
  ).toHaveAttribute("aria-current", "page");

  await page.goto(getRoutePath("/sitemap.xml"));
  await expect(page.locator("body")).toContainText("/experiences/identity-portfolio/");
  await expect(page.locator("body")).toContainText("/experiences/identity-portfolio/signal/");
  await expect(page.locator("body")).toContainText("/experiences/identity-portfolio/labs/archetypes/");
});

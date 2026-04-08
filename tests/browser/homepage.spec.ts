import { expect, test } from "@playwright/test";

function getRoutePath(route: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";

  if (route === "/") {
    return basePath ? `/${basePath}/` : "/";
  }

  return `${basePath ? `/${basePath}` : ""}${route}`;
}

test("homepage sorts visitor intent and exposes the route-family nav", async ({ page }, testInfo) => {
  await page.goto(getRoutePath("/"));

  await expect(
    page.getByRole("heading", {
      name: "Pick the path that helps you build your site right now.",
    }),
  ).toBeVisible();

  const startTourLink = page.getByRole("link", { name: "Start my site" }).first();
  await expect(startTourLink).toBeVisible();
  await expect(startTourLink).toHaveAttribute("href", /\/tour\/signal\/?$/);

  const resumeBuildLink = page.getByRole("link", { name: "Jump back in" }).first();
  await expect(resumeBuildLink).toBeVisible();
  await expect(resumeBuildLink).toHaveAttribute("href", /\/tour\/build\/?$/);

  await expect(
    page.getByRole("link", { name: "Browse extra help" }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Teach this in class" }).first(),
  ).toBeVisible();

  if (testInfo.project.name !== "mobile-chrome") {
    const startNavLink = page.getByRole("link", {
      name: "Start",
      exact: true,
    });
    await expect(startNavLink).toHaveAttribute("aria-current", "page");

    const browseNavLink = page.getByRole("link", {
      name: "Browse",
      exact: true,
    });
    await browseNavLink.click();

    await expect(browseNavLink).toHaveAttribute("aria-current", "page");
    await expect(
      page.getByRole("heading", {
        name: "Open one room to sharpen one decision.",
      }),
    ).toBeVisible();
  }
});

test("tour and examples family landings load from the exported site", async ({ page }) => {
  await page.goto(getRoutePath("/tour/"));
  await expect(
    page.getByRole("heading", {
      name: "Follow the 6-step path that takes your site from rough idea to something you can share.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Start at step 1" }),
  ).toBeVisible();

  await page.goto(getRoutePath("/examples/"));
  await expect(
    page.getByRole("heading", {
      name: "Use examples to see what changes on a real page.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open proof anatomy" }).first(),
  ).toBeVisible();
});

test("instructor and support routes expose their route-family roles", async ({ page }) => {
  await page.goto(getRoutePath("/instructor-guide/"));
  await expect(page.getByText("Instructor only")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Teach from the same 6-step path students already use.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open the tour map" }).first(),
  ).toBeVisible();

  const supportStatusBadge = page
    .locator("span")
    .filter({ hasText: /^Recommended support$/ })
    .first();

  await page.goto(getRoutePath("/recipes/"));
  await expect(supportStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Use recipes when you already know what kind of page you are making and just need a pattern that works.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/layouts/"));
  await expect(supportStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Use the layout guide when the content is fine but the page still feels messy.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tokens/"));
  await expect(supportStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Use the token guide when the page idea is clear but the vibe still feels off.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/process/"));
  await expect(supportStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Use process when you need to know what is real, reviewed, and safe to change.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/status/"));
  await expect(supportStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Use status when you want the honest version of what is done and what is not.",
    }),
  ).toBeVisible();
});

test("canonical browse rooms and outcome-proof examples load from the exported site", async ({ page }) => {
  await page.goto(getRoutePath("/browse/archetypes/"));
  await expect(
    page.getByRole("heading", {
      name: "Compare the big archetype families before you pick the label that sounds coolest.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/browse/design-lineages/"));
  await expect(
    page.getByRole("heading", {
      name: "Compare visual directions after the vibe is clear.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/browse/attention-trust/"));
  await expect(
    page.getByRole("heading", {
      name: "Open this room when the page sounds confident before it earns trust.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/browse/sources/"));
  await expect(
    page.getByRole("heading", {
      name: "Open sources when you need to check where an idea came from.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/examples/proof-blocks/"));
  await expect(
    page.getByRole("heading", {
      name: "Study how a proof block changes when the page stops using adjectives as a substitute for evidence.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/examples/student-exemplars/"));
  await expect(
    page.getByRole("heading", {
      name: "Look at finished examples to see how the choices connect.",
    }),
  ).toBeVisible();
});

test("legacy browse and gallery routes expose canonical family handoffs", async ({ page }) => {
  await page.goto(getRoutePath("/archetypes/"));
  await expect(
    page.getByRole("heading", {
      name: "The archetypes comparison page has moved.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/archetypes/sage/"));
  await expect(
    page.getByRole("heading", {
      name: "Sage",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/design-styles/"));
  await expect(
    page.getByRole("heading", {
      name: "The design styles page has moved.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/hero-examples/"));
  await expect(
    page.getByRole("heading", {
      name: "These older hero examples now point to the main examples pages.",
    }),
  ).toBeVisible();
});

test("canonical guided-tour steps load from the exported site", async ({ page }) => {
  await page.goto(getRoutePath("/tour/signal/"));
  await expect(
    page.getByRole("heading", {
      name: "Figure out who the page is for, what they need, and what they should get right away.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tour/archetype/"));
  await expect(
    page.getByRole("heading", {
      name: "Pick the vibe people should get first, then make sure your page can actually support it.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tour/style/"));
  await expect(
    page.getByRole("heading", {
      name: "Choose a look that matches the vibe instead of fighting it.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tour/proof/"));
  await expect(
    page.getByRole("heading", {
      name: "Add proof near the main claim so people trust the page fast.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tour/build/"));
  await expect(
    page.getByRole("heading", {
      name: "Turn your decisions into a page plan someone could actually build.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tour/publish/"));
  await expect(
    page.getByRole("heading", {
      name: "Put the page live and see if it still makes sense in the real world.",
    }),
  ).toBeVisible();
});

test.skip("tour worksheet keeps notes while you move between steps", async ({ page }) => {
  await page.goto(getRoutePath("/tour/signal/"));

  const audienceField = page.getByRole("textbox", { name: "Audience" });
  const needField = page.getByRole("textbox", { name: "Need" });

  await audienceField.fill(
    "A student applying for internships who needs to look real fast.",
  );
  await needField.fill(
    "Needs a portfolio that makes projects easy to trust right away.",
  );

  await page.getByRole("link", { name: "Next: pick the vibe" }).click();

  await expect(
    page.getByRole("textbox", { name: "Audience" }),
  ).toHaveValue(
    "A student applying for internships who needs to look real fast.",
  );
  await expect(page.getByRole("textbox", { name: "Need" })).toHaveValue(
    "Needs a portfolio that makes projects easy to trust right away.",
  );
});

test("legacy flat routes expose canonical tour handoffs", async ({ page }) => {
  const wrapperStatusBadge = page
    .locator("span")
    .filter({ hasText: /^Wrapper-specific$/ })
    .first();

  await page.goto(getRoutePath("/playbook/"));
  await expect(wrapperStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "This old playbook page now points back to the real tour steps.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open the signal step" }).first(),
  ).toBeVisible();

  await page.goto(getRoutePath("/workbook/"));
  await expect(wrapperStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "This old workbook page now points back to the proof and build steps.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open the proof step" }).first(),
  ).toBeVisible();

  await page.goto(getRoutePath("/deliverables/"));
  await expect(wrapperStatusBadge).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "This old deliverables page now points back to the publish step.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open the publish step" }).first(),
  ).toBeVisible();
});

test("documentation routes load from the exported site", async ({ page }) => {
  await page.goto(getRoutePath("/process/"));
  await expect(
    page.getByRole("heading", {
      name: "Use process when you need to know what is real, reviewed, and safe to change.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/status/"));
  await expect(
    page.getByRole("heading", {
      name: "Use status when you want the honest version of what is done and what is not.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/tokens/"));
  await expect(
    page.getByRole("heading", {
      name: "Use the token guide when the page idea is clear but the vibe still feels off.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/layouts/"));
  await expect(
    page.getByRole("heading", {
      name: "Use the layout guide when the content is fine but the page still feels messy.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/primitives/"));
  await expect(
    page.getByRole("heading", {
      name: "The reusable building blocks that make every lesson page feel guided instead of thrown together.",
    }),
  ).toBeVisible();

  await page.goto(getRoutePath("/recipes/"));
  await expect(
    page.getByRole("heading", {
      name: "Use recipes when you already know what kind of page you are making and just need a pattern that works.",
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

const previewPort = Number(process.env.SITE_PREVIEW_PORT || process.env.PORT || 3100);
const origin = `http://127.0.0.1:${previewPort}`;
/* eslint-disable @typescript-eslint/no-require-imports */
const { readFileSync, readdirSync } = require("node:fs");
const { join } = require("node:path");

const siteRegistry = JSON.parse(
  readFileSync("./content/registry/site-registry.json", "utf8"),
);

function getReleaseManifests() {
  return readdirSync("./content/releases")
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) =>
      JSON.parse(readFileSync(join("./content/releases", fileName), "utf8")),
    );
}

function normalizeBasePath(value = "") {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function buildPreviewUrl(route) {
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || "");
  const pathname = route === "/" ? "/" : `/${route.replace(/^\/+/, "")}`;

  return new URL(`${basePath}${pathname}`, origin).toString();
}

function getSelectedAuditRoutes() {
  const releases = new Map(
    getReleaseManifests().map((release) => [release.id, release]),
  );
  const routeById = new Map(
    siteRegistry.routes.map((route) => [route.id, route]),
  );
  const selectedReleaseId =
    process.env.SITE_RELEASE_ID || "phase-1-baseline-release";
  const selectedRelease = releases.get(selectedReleaseId);

  if (!selectedRelease) {
    throw new Error(
      `Unknown release ${selectedReleaseId} in Lighthouse configuration.`,
    );
  }

  return selectedRelease.routeIds.map((routeId) => {
    const route = routeById.get(routeId);

    if (!route) {
      throw new Error(
        `Release ${selectedRelease.id} references unknown route ${routeId}.`,
      );
    }

    return route.href;
  });
}

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: "node scripts/preview-export-runner.mjs",
      startServerReadyPattern: "Preview server listening on",
      url: getSelectedAuditRoutes().map(buildPreviewUrl),
    },
    assert: {
      assertions: {
        "categories:accessibility": [
          "error",
          {
            minScore: 0.95,
          },
        ],
        "categories:best-practices": [
          "error",
          {
            minScore: 0.9,
          },
        ],
        "categories:seo": [
          "error",
          {
            minScore: 0.9,
          },
        ],
        "categories:performance": "off",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};

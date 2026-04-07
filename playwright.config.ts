import { defineConfig, devices } from "@playwright/test";

import { getPreviewBaseUrl } from "./lib/site-config";

const previewPort = Number(process.env.SITE_PREVIEW_PORT || process.env.PORT || 3100);
const previewBaseUrl = getPreviewBaseUrl(
  `http://127.0.0.1:${previewPort}`,
);

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "html" : "list",
  use: {
    baseURL: previewBaseUrl,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npm run build && node scripts/preview-export-runner.mjs",
    env: {
      ...process.env,
      SITE_PREVIEW_PORT: `${previewPort}`,
      PORT: `${previewPort}`,
    },
    url: previewBaseUrl,
    reuseExistingServer:
      process.env.PLAYWRIGHT_REUSE_PREVIEW_SERVER === "1",
    timeout: 120000,
  },
});

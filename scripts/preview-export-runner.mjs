const previewPort = process.env.SITE_PREVIEW_PORT || process.env.PORT || "3100";

process.env.SITE_PREVIEW_PORT = previewPort;
process.env.PORT = previewPort;

await import("./preview-export.mjs");
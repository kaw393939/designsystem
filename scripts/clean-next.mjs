import { rm } from "node:fs/promises";

async function cleanBuildArtifact(pathname) {
  try {
    await rm(pathname, {
      recursive: true,
      force: true,
      maxRetries: 20,
      retryDelay: 100,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return;
    }

    throw error;
  }
}

await Promise.all([cleanBuildArtifact(".next"), cleanBuildArtifact("out")]);

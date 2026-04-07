import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const currentNodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
const supportedLtsMajors = new Set([20, 22, 24]);
const nextCliPath = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));

// Prefer Homebrew-installed LTS Node before falling back to npx
const brewNode22 = process.platform === "darwin"
  ? (existsSync("/opt/homebrew/opt/node@22/bin/node") ? "/opt/homebrew/opt/node@22/bin/node"
    : existsSync("/usr/local/opt/node@22/bin/node") ? "/usr/local/opt/node@22/bin/node"
    : null)
  : null;

const useCurrentNode = supportedLtsMajors.has(currentNodeMajor);
let command, commandArgs;

if (useCurrentNode) {
  command = process.execPath;
  commandArgs = [nextCliPath, "dev", ...args];
} else if (brewNode22) {
  console.warn(
    `Detected Node ${process.versions.node}. Using Homebrew node@22 at ${brewNode22}.`
  );
  command = brewNode22;
  commandArgs = [nextCliPath, "dev", ...args];
} else {
  const fallbackNodePackage = process.env.NEXT_DEV_NODE_PACKAGE || "node@22";
  console.warn(
    `Detected Node ${process.versions.node}. Falling back to npx ${fallbackNodePackage} (may be slow).`
  );
  command = process.platform === "win32" ? "npx.cmd" : "npx";
  commandArgs = ["-y", fallbackNodePackage, nextCliPath, "dev", ...args];
}

const child = spawn(command, commandArgs, {
  stdio: "inherit",
  env: process.env,
});

child.on("error", error => {
  console.error("Failed to start the Next.js dev server.", error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
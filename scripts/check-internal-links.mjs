#!/usr/bin/env node
/**
 * check-internal-links.mjs
 *
 * Crawls the static `out/` export directory, extracts every internal <a href>
 * from every HTML file, and verifies that each target resolves to an existing
 * HTML file in the export. Exits with code 1 if any broken links are found.
 *
 * Usage:
 *   node scripts/check-internal-links.mjs [--base-path /desgin_system]
 *
 * When --base-path is provided it simulates the GitHub Pages prefix: links
 * starting with that prefix are stripped before resolving against out/.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
let basePath = "";
const bpIdx = args.indexOf("--base-path");
if (bpIdx !== -1 && args[bpIdx + 1]) {
  basePath = args[bpIdx + 1].replace(/\/+$/, "");
}

const outDir = resolve(process.cwd(), "out");

// ── Collect every HTML file in out/ ──
function walkHtml(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkHtml(full));
    } else if (entry.name.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = walkHtml(outDir);

// Build a set of known paths (relative to outDir, as URL paths)
const knownPaths = new Set();
for (const file of htmlFiles) {
  // e.g. out/tour/signal/index.html → /tour/signal/
  let rel = file.slice(outDir.length); // /tour/signal/index.html
  if (rel.endsWith("/index.html")) {
    rel = rel.slice(0, -"index.html".length); // /tour/signal/
  }
  knownPaths.add(rel);
}
// Also add paths without trailing slash
for (const p of [...knownPaths]) {
  if (p.endsWith("/") && p.length > 1) {
    knownPaths.add(p.slice(0, -1));
  }
}

// Also check for non-HTML files (css, js, images, etc.)
function walkAll(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkAll(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

const allFiles = walkAll(outDir);
const knownFiles = new Set();
for (const file of allFiles) {
  knownFiles.add(file.slice(outDir.length));
}

// ── Extract href values from each HTML file ──
const hrefRegex = /<a\s[^>]*href="([^"#?]+)/gi;

const broken = [];
const missingBasePath = [];
let totalLinks = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const relFile = file.slice(outDir.length);
  let match;
  hrefRegex.lastIndex = 0;
  while ((match = hrefRegex.exec(html)) !== null) {
    let href = match[1];

    // Skip external links, mailto, tel, javascript
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;

    totalLinks++;

    // Detect links that should have basePath but don't
    if (basePath && href.startsWith("/") && !href.startsWith(basePath + "/") && href !== basePath) {
      // This is an absolute internal link missing the basePath prefix
      missingBasePath.push({ source: relFile, href: match[1] });
    }

    // Strip basePath prefix if present
    if (basePath && href.startsWith(basePath)) {
      href = href.slice(basePath.length) || "/";
    }

    // Resolve the link
    let target = href;
    if (!target.startsWith("/")) {
      // Relative link — resolve from the file's directory
      const fileDir = relFile.replace(/\/[^/]+$/, "");
      target = resolve(fileDir, target).replace(/\\/g, "/");
    }

    // Check if the target exists
    const targetWithSlash = target.endsWith("/") ? target : target + "/";
    const targetWithoutSlash = target.endsWith("/") ? target.slice(0, -1) : target;

    const found =
      knownPaths.has(target) ||
      knownPaths.has(targetWithSlash) ||
      knownPaths.has(targetWithoutSlash) ||
      knownFiles.has(target) ||
      knownFiles.has(targetWithSlash + "index.html");

    if (!found) {
      broken.push({ source: relFile, href: match[1], resolved: target });
    }
  }
}

// ── Report ──
console.log(`Scanned ${htmlFiles.length} HTML files, ${totalLinks} internal links.`);

let exitCode = 0;

if (missingBasePath.length > 0) {
  console.log(`\n❌ ${missingBasePath.length} link(s) missing basePath prefix "${basePath}":\n`);
  for (const { source, href } of missingBasePath) {
    console.log(`  ${source}`);
    console.log(`    href="${href}" → should start with "${basePath}"\n`);
  }
  exitCode = 1;
}

if (broken.length > 0) {
  console.log(`\n❌ ${broken.length} broken internal link(s):\n`);
  for (const { source, href, resolved } of broken) {
    console.log(`  ${source}`);
    console.log(`    href="${href}" → resolves to "${resolved}" (NOT FOUND)\n`);
  }
  exitCode = 1;
}

if (exitCode === 0) {
  console.log("✅ No broken internal links found.");
}
process.exit(exitCode);

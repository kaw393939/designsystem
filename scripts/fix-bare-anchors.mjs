#!/usr/bin/env node
/**
 * fix-bare-anchors.mjs
 *
 * Converts all bare <a href="/..."> tags (internal links) in app/ .tsx files
 * to <Link href="/..."> and adds `import Link from "next/link"` where needed.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

// Find all .tsx files in app/ that contain href="/ (internal links)
const files = execSync(
  'grep -rln \'href="/\' app/ --include="*.tsx"',
  { encoding: "utf8" },
)
  .trim()
  .split("\n")
  .filter(Boolean);

let totalFixed = 0;
let importsAdded = 0;

for (const file of files) {
  let content = readFileSync(file, "utf8");
  const original = content;

  // Match <a (with possible whitespace/newline) then attributes containing href="/..."
  // Replace <a that has an internal href with <Link, and its </a> with </Link>
  //
  // Strategy: find each <a ...> block with href="/", track the position, then find
  // the matching </a> and replace both.

  let changed = true;
  while (changed) {
    changed = false;

    // Find the next <a that has an internal href
    // Pattern: <a followed by attributes containing href="/
    const aTagRegex = /<a(\s[\s\S]*?href="\/[\s\S]*?)>/;
    const match = aTagRegex.exec(content);

    if (match) {
      const fullTag = match[0]; // e.g. <a\n          href="/tour/signal"\n          className="..."  >
      const tagStart = match.index;
      const tagEnd = tagStart + fullTag.length;

      // Check: does this href start with an internal path (not http)?
      const hrefMatch = /href="(\/[^"]*)"/.exec(fullTag);
      if (hrefMatch && !hrefMatch[1].startsWith("//")) {
        // Find the matching </a>
        const rest = content.slice(tagEnd);
        const closeIdx = rest.indexOf("</a>");
        if (closeIdx !== -1) {
          const closeStart = tagEnd + closeIdx;
          const closeEnd = closeStart + 4; // "</a>".length

          // Replace </a> with </Link>
          content =
            content.slice(0, closeStart) +
            "</Link>" +
            content.slice(closeEnd);

          // Replace <a with <Link in the opening tag
          const newTag = fullTag.replace(/^<a/, "<Link");
          content =
            content.slice(0, tagStart) +
            newTag +
            content.slice(tagStart + fullTag.length);

          changed = true;
          totalFixed++;
        }
      }
    }
  }

  if (content !== original) {
    // Add import Link from "next/link" if not present
    if (!content.includes('import Link from "next/link"') && !content.includes("import Link from 'next/link'")) {
      // Find the end of the import block: last line that starts with `import ` or is an
      // import continuation (e.g. `} from "..."`) — walk forward from each `import` to its `;`
      const lines = content.split("\n");
      let lastImportEnd = -1;
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trimStart();
        if (trimmed.startsWith("import ")) {
          // Walk forward to the semicolon that ends this import
          let j = i;
          while (j < lines.length && !lines[j].includes(";")) j++;
          lastImportEnd = j;
          i = j; // skip past
        }
      }
      if (lastImportEnd !== -1) {
        lines.splice(lastImportEnd + 1, 0, 'import Link from "next/link";');
        content = lines.join("\n");
      } else {
        content = 'import Link from "next/link";\n' + content;
      }
      importsAdded++;
    }

    writeFileSync(file, content, "utf8");
    const count = (content.match(/<Link/g) || []).length;
    console.log(`  ✓ ${file} (${count} Link tags total)`);
  }
}

console.log(`\nDone: ${totalFixed} <a> → <Link> conversions across ${files.length} files, ${importsAdded} imports added.`);

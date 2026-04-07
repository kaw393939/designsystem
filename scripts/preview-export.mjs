import http from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out");
const port = Number(process.env.SITE_PREVIEW_PORT || process.env.PORT || 3000);
const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || "");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webp": "image/webp",
};

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function safeResolve(relativePath) {
  const resolved = path.resolve(outDir, `.${relativePath}`);

  if (!resolved.startsWith(outDir)) {
    return null;
  }

  return resolved;
}

async function fileExists(filePath) {
  try {
    const fileStat = await stat(filePath);
    return fileStat.isFile();
  } catch {
    return false;
  }
}

async function resolveOutputFile(requestPath) {
  const candidates = [];

  if (requestPath.endsWith("/")) {
    candidates.push(`${requestPath}index.html`);
  } else {
    candidates.push(requestPath);
    candidates.push(`${requestPath}/index.html`);
  }

  for (const candidate of candidates) {
    const resolved = safeResolve(candidate);

    if (!resolved) {
      continue;
    }

    if (await fileExists(resolved)) {
      return resolved;
    }
  }

  return null;
}

function sendResponseHeaders(response, filePath, statusCode = 200) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = contentTypes[extension] || "application/octet-stream";

  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control":
      extension === ".html" ? "no-cache" : "public, max-age=0, must-revalidate",
  });
}

function getRequestPath(requestUrl) {
  const url = new URL(requestUrl || "/", "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);

  if (!basePath) {
    return { pathname };
  }

  if (pathname === "/") {
    return { redirect: `${basePath}/` };
  }

  if (pathname === basePath) {
    return { redirect: `${basePath}/` };
  }

  if (!(pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    return { pathname, notFound: true };
  }

  pathname = pathname.slice(basePath.length) || "/";

  return { pathname };
}

const server = http.createServer(async (request, response) => {
  const { pathname, redirect, notFound } = getRequestPath(request.url);

  if (redirect) {
    response.writeHead(308, { Location: redirect });
    response.end();
    return;
  }

  if (notFound) {
    const notFoundFile = safeResolve("/404.html");

    if (notFoundFile && existsSync(notFoundFile)) {
      sendResponseHeaders(response, notFoundFile, 404);
      if (request.method === "HEAD") {
        response.end();
        return;
      }

      createReadStream(notFoundFile).pipe(response);
      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const outputFile = await resolveOutputFile(pathname || "/");

  if (!outputFile) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  sendResponseHeaders(response, outputFile);

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(outputFile).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  const suffix = basePath ? `${basePath}/` : "/";
  console.log(`Preview server listening on http://127.0.0.1:${port}${suffix}`);
});

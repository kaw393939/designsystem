export function normalizeBasePath(value = ""): string {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

export function normalizeRoute(value = "/"): string {
  if (!value || value === "/") {
    return "/";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

export function normalizeSiteUrl(value = "https://example.com"): string {
  return value.endsWith("/") ? value : `${value}/`;
}

export function getPreviewBaseUrl(origin = "http://127.0.0.1:3000"): string {
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || "");
  const route = basePath ? `${basePath}/` : "/";

  return new URL(route, origin).toString().replace(/\/$/, "");
}

export function buildAbsoluteSiteUrl(route: string): string {
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || "");
  const siteUrl = normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  );
  const pathname =
    route === "/sitemap.xml" ? "/sitemap.xml" : normalizeRoute(route);

  return new URL(`${basePath}${pathname}`, siteUrl).toString();
}

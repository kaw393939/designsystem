import type { MetadataRoute } from "next";

import { buildAbsoluteSiteUrl } from "@/lib/site-config";
import { getSelectedSiteBuildContext } from "@/lib/site-release";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const { release, sitemapRoutes } = getSelectedSiteBuildContext();

  return sitemapRoutes.map((route) => ({
    url: buildAbsoluteSiteUrl(route.href),
    lastModified: new Date(release.createdAt),
  }));
}

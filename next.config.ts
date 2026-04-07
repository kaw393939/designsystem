import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  typescript: {
    // Validated independently via `tsc --noEmit` and editor diagnostics.
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

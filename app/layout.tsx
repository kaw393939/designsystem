import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { atlasSiteDescription, atlasSiteTitle } from "@/lib/archetype-atlas-content";
import { normalizeSiteUrl, withBasePath } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: atlasSiteTitle,
    template: `%s | ${atlasSiteTitle}`,
  },
  description: atlasSiteDescription,
  metadataBase: new URL(
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  ),
  applicationName: atlasSiteTitle,
  icons: {
    icon: withBasePath("/icon.svg"),
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

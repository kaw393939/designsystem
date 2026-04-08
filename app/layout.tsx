import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteJourneyProvider } from "@/components/site-journey-provider";
import { normalizeSiteUrl, withBasePath } from "@/lib/site-config";
import { primarySiteDescription, primarySiteTitle } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: {
    default: primarySiteTitle,
    template: `%s | ${primarySiteTitle}`,
  },
  description: primarySiteDescription,
  metadataBase: new URL(
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  ),
  applicationName: primarySiteTitle,
  icons: {
    icon: withBasePath("/icon.svg"),
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteJourneyProvider>{children}</SiteJourneyProvider>
      </body>
    </html>
  );
}

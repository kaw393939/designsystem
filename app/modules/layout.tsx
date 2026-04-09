import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "Course modules — follow the full semester path from framework through professional practice.",
};

export default function ModulesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

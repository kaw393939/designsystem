import { ModuleShell } from "@/components/module-shell";
import { getModule } from "@/lib/module-content";

const moduleData = getModule("studio-and-publish")!;

export default function StudioAndPublishPage() {
  return <ModuleShell module={moduleData} />;
}

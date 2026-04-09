import { ModuleShell } from "@/components/module-shell";
import { getModule } from "@/lib/module-content";

const moduleData = getModule("web-presence-framework")!;

export default function WebPresenceFrameworkPage() {
  return <ModuleShell module={moduleData} />;
}

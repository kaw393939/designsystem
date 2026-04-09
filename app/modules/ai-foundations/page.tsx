import { ModuleShell } from "@/components/module-shell";
import { getModule } from "@/lib/module-content";

const moduleData = getModule("ai-foundations")!;

export default function AiFoundationsPage() {
  return <ModuleShell module={moduleData} />;
}

import { ModuleShell } from "@/components/module-shell";
import { getModule } from "@/lib/module-content";

const moduleData = getModule("visual-ai")!;

export default function VisualAiPage() {
  return <ModuleShell module={moduleData} />;
}

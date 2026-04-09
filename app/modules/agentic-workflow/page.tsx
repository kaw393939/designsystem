import { ModuleShell } from "@/components/module-shell";
import { getModule } from "@/lib/module-content";

const moduleData = getModule("agentic-workflow")!;

export default function AgenticWorkflowPage() {
  return <ModuleShell module={moduleData} />;
}

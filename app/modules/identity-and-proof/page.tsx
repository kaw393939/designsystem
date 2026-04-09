import { ModuleShell } from "@/components/module-shell";
import { getModule } from "@/lib/module-content";

const moduleData = getModule("identity-and-proof")!;

export default function IdentityAndProofPage() {
  return <ModuleShell module={moduleData} />;
}

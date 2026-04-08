import type { PanelTone } from "@/lib/theme-tokens";

export type ModuleStatus = "active" | "preview" | "coming";

export type ModuleLesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
};

export type ModuleDefinition = {
  id: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
  leaveWith: string;
  weekRange: string;
  status: ModuleStatus;
  tone: PanelTone;
  lessons: readonly ModuleLesson[];
  hasPractice: boolean;
  hasCheckpoint: boolean;
};

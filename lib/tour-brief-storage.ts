import type { TourRecordFieldId } from "@/lib/site-navigation";

export const TOUR_BRIEF_STORAGE_KEY = "web-presence-workshop.site-brief.v1";

export type TourRecordDraft = Partial<Record<TourRecordFieldId, string>>;

function sanitizeTourRecordDraft(rawDraft: unknown): TourRecordDraft {
  if (!rawDraft || typeof rawDraft !== "object" || Array.isArray(rawDraft)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(rawDraft).filter(([, value]) => typeof value === "string"),
  ) as TourRecordDraft;
}

export function parseTourBriefDraft(rawDraft: string | null): TourRecordDraft {
  if (!rawDraft) {
    return {};
  }

  try {
    return sanitizeTourRecordDraft(JSON.parse(rawDraft) as unknown);
  } catch {
    return {};
  }
}

export function loadTourBriefDraft(storage?: Storage | null): TourRecordDraft {
  if (!storage) {
    return {};
  }

  return parseTourBriefDraft(storage.getItem(TOUR_BRIEF_STORAGE_KEY));
}

export function countFilledTourBriefFields(draft: TourRecordDraft) {
  return Object.values(draft).filter((value) => value?.trim().length).length;
}
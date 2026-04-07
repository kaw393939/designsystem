import { readFileSync } from "node:fs";
import { extname } from "node:path";

import {
  assertValidSiteSelection,
  type ResolvedVisualSelection,
  type SiteSelectionData,
} from "@/lib/site-release";
import {
  getVisualVersionAssetPath,
  parseVisualVersionReference,
  resolveFileBackedVisualVersionReference,
  type VisualClass,
  type VisualProvider,
} from "@/lib/visual-asset-workflow";

export type ResolvedVisualAsset = {
  ref: string;
  absolutePath: string;
  mediaType: string;
  inlineText?: string;
  dataUri?: string;
};

export type ResolvedSiteVisual = {
  id: string;
  reference: string;
  source: "fixture" | "file-backed";
  status: string;
  version?: string;
  visualClass?: VisualClass;
  provider?: VisualProvider;
  caption?: string;
  alt?: string;
  longDescription?: string;
  assetRefs: string[];
  primaryAsset: ResolvedVisualAsset | null;
};

const MEDIA_TYPES_BY_EXTENSION: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".json": "application/json",
  ".csv": "text/csv",
  ".txt": "text/plain",
  ".mmd": "text/plain",
};

function getMediaType(assetRef: string) {
  return MEDIA_TYPES_BY_EXTENSION[extname(assetRef).toLowerCase()] ?? "application/octet-stream";
}

function isInlineTextAsset(mediaType: string) {
  return mediaType === "image/svg+xml" || mediaType.startsWith("text/");
}

function getPreferredAssetRef(assetRefs: string[]) {
  const preferenceOrder = [
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".mmd",
    ".json",
    ".csv",
    ".txt",
  ];

  for (const extension of preferenceOrder) {
    const matchedRef = assetRefs.find((assetRef) =>
      assetRef.toLowerCase().endsWith(extension),
    );

    if (matchedRef) {
      return matchedRef;
    }
  }

  return assetRefs[0] ?? null;
}

function resolveVisualSelectionToRenderable(
  selection: ResolvedVisualSelection,
  options?: { workspaceRoot?: string },
) {
  if (selection.source === "fixture") {
    return {
      id: selection.visualId,
      reference: selection.reference,
      source: selection.source,
      status: selection.status,
      version: selection.version,
      visualClass: selection.visualClass,
      provider: selection.provider,
      assetRefs: selection.assetRefs ?? [],
      primaryAsset: null,
    } satisfies ResolvedSiteVisual;
  }

  const resolvedReference = resolveFileBackedVisualVersionReference(
    selection.reference,
    { workspaceRoot: options?.workspaceRoot },
  );
  const assetRefs = resolvedReference.artifact.data.assetRefs ?? [];
  const primaryAssetRef = getPreferredAssetRef(assetRefs);

  return {
    id: resolvedReference.artifact.data.id,
    reference: selection.reference,
    source: selection.source,
    status: resolvedReference.artifact.data.status,
    version: resolvedReference.artifact.data.version,
    visualClass: resolvedReference.artifact.data.visualClass,
    provider: resolvedReference.artifact.data.provider,
    caption: resolvedReference.artifact.data.caption,
    alt: resolvedReference.artifact.data.alt,
    longDescription: resolvedReference.artifact.data.longDescription,
    assetRefs,
    primaryAsset: primaryAssetRef
      ? (() => {
          const absolutePath = getVisualVersionAssetPath(
            resolvedReference.visualId,
            resolvedReference.version,
            primaryAssetRef,
            options?.workspaceRoot,
          );
          const mediaType = getMediaType(primaryAssetRef);
          const assetBuffer = readFileSync(absolutePath);

          return {
            ref: primaryAssetRef,
            absolutePath,
            mediaType,
            inlineText: isInlineTextAsset(mediaType)
              ? assetBuffer.toString("utf8")
              : undefined,
            dataUri: mediaType.startsWith("image/")
              ? `data:${mediaType};base64,${assetBuffer.toString("base64")}`
              : undefined,
          } satisfies ResolvedVisualAsset;
        })()
      : null,
  } satisfies ResolvedSiteVisual;
}

export function resolveVisualReferenceToRenderable(
  reference: string,
  options?: {
    data?: SiteSelectionData;
    experienceId?: string;
    releaseId?: string;
    workspaceRoot?: string;
  },
) {
  const parsedReference = parseVisualVersionReference(reference);

  if (parsedReference) {
    return resolveVisualSelectionToRenderable(
      {
        reference,
        visualId: parsedReference.visualId,
        version: parsedReference.version,
        status: "approved",
        source: "file-backed",
      },
      { workspaceRoot: options?.workspaceRoot },
    );
  }

  const selection = assertValidSiteSelection(options);
  const visualSelection = selection.resolvedVisualSelections.find(
    (entry) => entry.visualId === reference,
  );

  if (!visualSelection) {
    return null;
  }

  return resolveVisualSelectionToRenderable(visualSelection, {
    workspaceRoot: options?.workspaceRoot,
  });
}

export function getSelectedReleaseVisual(
  visualId: string,
  options?: {
    data?: SiteSelectionData;
    experienceId?: string;
    releaseId?: string;
    workspaceRoot?: string;
  },
) {
  const selection = assertValidSiteSelection(options);
  const visualSelections = selection.resolvedVisualSelections.filter(
    (entry) => entry.visualId === visualId,
  );

  if (!visualSelections.length) {
    throw new Error(
      `The selected release does not include a visual reference for ${visualId}.`,
    );
  }

  if (visualSelections.length > 1) {
    throw new Error(
      `The selected release resolves multiple visual references for ${visualId}, which should have been rejected during validation.`,
    );
  }

  return resolveVisualSelectionToRenderable(visualSelections[0]!, {
    workspaceRoot: options?.workspaceRoot,
  });
}
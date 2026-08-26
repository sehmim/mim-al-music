import type { Release } from "@/types/content";

/**
 * "EP" or "Single" for the card/badge meta line. `trackCount` is authored as
 * free text ("4 songs"), so the number is pulled out of it rather than compared
 * directly.
 */
export const releaseFormat = (release: Release): string => {
  if (release.trackList && release.trackList.length > 1) return "EP";
  const counted = Number.parseInt(String(release.trackCount ?? ""), 10);
  return Number.isFinite(counted) && counted > 1 ? "EP" : "Single";
};

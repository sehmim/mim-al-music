import type contentEn from "@/data/content.json";

export interface ReleaseAsset {
  type: string;
  url: string;
  caption?: string;
  alt?: string;
  duration?: string;
}

export interface ReleaseTrack {
  number: number;
  name: string;
  duration: string;
}

export interface ReleaseCredit {
  role: string;
  name: string;
  url?: string;
}

export interface Release {
  title: string;
  /** Display year, e.g. "2026". */
  date: string;
  image: string;
  description: string;
  slug: string;
  streamingUrl: string;
  appleMusicUrl?: string;
  youtubeMusicUrl?: string;
  duration?: string;
  plays?: string;
  /** Full ISO date, e.g. "2026-07-31". Used for schema.org datePublished. */
  releaseDate?: string;
  genre?: string;
  label?: string;
  collaborators?: string[];
  trackCount?: number;
  trackList?: ReleaseTrack[];
  credits?: ReleaseCredit[];
  seo?: { title?: string; description?: string; keywords?: string };
  blog: {
    content: string[];
    recordingNotes: string;
    inspiration?: string;
    musicVideo?: string;
    lyrics?: string;
    assets?: ReleaseAsset[];
  };
}

/**
 * The English file is the schema of record. The translated files are structurally
 * similar but not identical (Bengali carries fewer releases, and optional keys
 * differ per entry), so `releases` is typed explicitly instead of being inferred.
 */
export type SiteContent = Omit<typeof contentEn, "releases"> & {
  releases: Release[];
};

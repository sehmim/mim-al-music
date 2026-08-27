import type { Release } from "@/types/content";

const ARTIST = "MIM AL";

/** "3:45" / "14:35" -> "PT3M45S", the ISO 8601 form schema.org expects. */
export const toIsoDuration = (duration?: string): string | undefined => {
  if (!duration) return undefined;
  const parts = duration.split(":").map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  const [h, m, sec] = parts.length === 3 ? parts : [0, parts[0], parts[1]];
  return `PT${h ? `${h}H` : ""}${m}M${sec}S`;
};

export const releaseSeoTitle = (release: Release): string => {
  if (release.seo?.title) return release.seo.title;
  const year = release.releaseDate?.slice(0, 4) ?? release.date;
  const kind = release.trackList ? "EP" : "Single";
  return `${release.title} — ${ARTIST} ${kind} (${year})`;
};

export const releaseSeoDescription = (release: Release): string =>
  release.seo?.description ??
  `${release.title} by ${ARTIST} — ${release.description}. Stream it and read the story behind the release.`;

/**
 * schema.org for one release: a MusicAlbum when there is a tracklist, a
 * MusicRecording otherwise, wrapped in a @graph with the breadcrumb trail so
 * search engines can place the page inside the site.
 */
export const buildReleaseJsonLd = (release: Release, url: string) => {
  const artist = { "@type": "MusicGroup", name: ARTIST, url: "https://mimal.music" };
  const featured = release.credits
    ?.filter((c) => c.role.toLowerCase().startsWith("featuring"))
    .map((c) => ({ "@type": "MusicGroup", name: c.name, ...(c.url ? { sameAs: c.url } : {}) }));

  // Only real per-release URLs belong here — the Tidal artist-page fallback used
  // in the UI would be wrong as a sameAs for a single record.
  const sameAs = [
    release.streamingUrl,
    release.appleMusicUrl,
    release.youtubeMusicUrl,
    release.tidalUrl,
  ].filter(Boolean);

  const work = release.trackList
    ? {
        "@type": "MusicAlbum",
        albumProductionType: "https://schema.org/StudioAlbum",
        numTracks: release.trackList.length,
        track: release.trackList.map((t) => ({
          "@type": "MusicRecording",
          name: t.name,
          position: t.number,
          duration: toIsoDuration(t.duration),
          byArtist: artist,
        })),
      }
    : { "@type": "MusicRecording", duration: toIsoDuration(release.duration) };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...work,
        "@id": url,
        name: release.title,
        url,
        description: releaseSeoDescription(release),
        datePublished: release.releaseDate ?? release.date,
        genre: release.genre,
        inLanguage: "en",
        byArtist: featured?.length ? [artist, ...featured] : artist,
        ...(release.label ? { recordLabel: { "@type": "Organization", name: release.label } } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "MIM AL", item: "https://mimal.music" },
          { "@type": "ListItem", position: 2, name: "Releases", item: "https://mimal.music/#releases" },
          { "@type": "ListItem", position: 3, name: release.title, item: url },
        ],
      },
    ],
  };
};

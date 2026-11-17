/**
 * Head metadata for the live album page. Kept free of imports so
 * scripts/seo-build.mjs can load it on its own, the same way it loads
 * release-seo.ts, and prerender exactly what the page sets at runtime.
 */

const ARTIST_URL = "https://mimal.music";

interface LiveSeoSource {
  title: string;
  artist: string;
  year: string;
  releaseDate?: string;
  studio: string;
  city?: string;
  seo: { title: string; description: string; keywords?: string };
  albumLinks: Record<string, string>;
  songs: { title: string; youtubeUrl?: string; links?: Record<string, string> }[];
  lineup: { role: string; name: string }[];
}

export const liveSeoTitle = (live: LiveSeoSource): string => live.seo.title;

export const liveSeoDescription = (live: LiveSeoSource): string => live.seo.description;

/** schema.org MusicAlbum (live) plus the breadcrumb trail back to the home page. */
export const buildLiveJsonLd = (live: LiveSeoSource, url: string) => {
  const artist = { "@type": "MusicGroup", name: live.artist, url: ARTIST_URL };
  // Only links that point at this record; empty fields fall back to artist
  // pages in the UI, which would be wrong as a sameAs here.
  const sameAs = Object.values(live.albumLinks).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicAlbum",
        "@id": url,
        name: live.title,
        url,
        description: liveSeoDescription(live),
        albumProductionType: "https://schema.org/LiveAlbum",
        datePublished: live.releaseDate || live.year,
        inLanguage: "en",
        byArtist: artist,
        numTracks: live.songs.length,
        locationCreated: {
          "@type": "Place",
          name: live.studio,
          ...(live.city ? { address: live.city } : {}),
        },
        contributor: live.lineup.map((m) => ({ "@type": "Person", name: m.name, roleName: m.role })),
        track: live.songs.map((song, i) => ({
          "@type": "MusicRecording",
          name: song.title,
          position: i + 1,
          byArtist: artist,
          ...(song.youtubeUrl ? { url: song.youtubeUrl } : {}),
        })),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "MIM AL", item: ARTIST_URL },
          { "@type": "ListItem", position: 2, name: live.title, item: url },
        ],
      },
    ],
  };
};

import live from "@/data/live-breakglass.json";
import heroStill from "@/assets/breakglass/breakglass-hero.jpg";
import take1 from "@/assets/breakglass/breakglass-take-1.jpg";
import take2 from "@/assets/breakglass/breakglass-take-2.jpg";
import take3 from "@/assets/breakglass/breakglass-take-3.jpg";
import {
  APPLE_MUSIC_ARTIST_URL,
  SPOTIFY_ARTIST_URL,
  TIDAL_ARTIST_URL,
  YOUTUBE_ARTIST_URL,
} from "@/lib/links";

export type PlatformKey =
  | "spotify"
  | "appleMusic"
  | "youtubeMusic"
  | "youtube"
  | "tidal"
  | "amazonMusic"
  | "deezer"
  | "bandcamp"
  | "soundcloud";

export interface ResolvedPlatform {
  key: PlatformKey;
  label: string;
  url: string;
  /** True when the link points at this record, false when it falls back to the artist. */
  exact: boolean;
}

export interface LiveSong {
  id: string;
  number: number;
  title: string;
  duration: string;
  youtubeId: string | null;
  poster: string;
  links: Partial<Record<PlatformKey, string>>;
}

export const LIVE = live;

export const PLATFORM_LABELS: Record<PlatformKey, string> = {
  spotify: "Spotify",
  appleMusic: "Apple Music",
  youtubeMusic: "YouTube Music",
  youtube: "YouTube",
  tidal: "Tidal",
  amazonMusic: "Amazon Music",
  deezer: "Deezer",
  bandcamp: "Bandcamp",
  soundcloud: "SoundCloud",
};

/** Order the platforms appear in the album grid and the per-song drawer. */
const PLATFORM_ORDER: PlatformKey[] = [
  "spotify",
  "appleMusic",
  "youtubeMusic",
  "youtube",
  "tidal",
  "amazonMusic",
  "deezer",
  "bandcamp",
  "soundcloud",
];

/**
 * Where a platform button goes before the release links exist. Search pages
 * always resolve, where a guessed profile URL could 404. Bandcamp and
 * SoundCloud have no fallback: they only show once a real link is added.
 */
const ARTIST_FALLBACK: Partial<Record<PlatformKey, string>> = {
  spotify: SPOTIFY_ARTIST_URL,
  appleMusic: APPLE_MUSIC_ARTIST_URL,
  youtubeMusic: YOUTUBE_ARTIST_URL,
  youtube: "https://www.youtube.com/results?search_query=MIM+AL+live+at+Breakglass",
  tidal: TIDAL_ARTIST_URL,
  amazonMusic: "https://music.amazon.com/search/mim%20al",
  deezer: "https://www.deezer.com/search/mim%20al",
};

const POSTERS: Record<string, string> = {
  "take-1": take1,
  "take-2": take2,
  "take-3": take3,
};

export const HERO_STILL = heroStill;

/** Accepts watch, youtu.be, embed, shorts and live URLs, or a bare 11-character id. */
export const parseYoutubeId = (value?: string): string | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname.endsWith("youtu.be")) return url.pathname.slice(1, 12) || null;
    const v = url.searchParams.get("v");
    if (v) return v;
    const match = url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

export const SONGS: LiveSong[] = live.songs.map((song, i) => ({
  id: song.id,
  number: i + 1,
  title: song.title,
  duration: song.duration,
  youtubeId: parseYoutubeId(song.youtubeUrl),
  poster: POSTERS[song.poster] ?? heroStill,
  links: song.links as Partial<Record<PlatformKey, string>>,
}));

const resolve = (
  key: PlatformKey,
  ...candidates: (string | undefined)[]
): ResolvedPlatform | null => {
  const exact = candidates.find(Boolean);
  if (exact) return { key, label: PLATFORM_LABELS[key], url: exact, exact: true };
  const fallback = ARTIST_FALLBACK[key];
  return fallback ? { key, label: PLATFORM_LABELS[key], url: fallback, exact: false } : null;
};

const albumLinks = live.albumLinks as Partial<Record<PlatformKey, string>>;

/** Every platform the album can be heard on, best link first. */
export const albumPlatforms = (): ResolvedPlatform[] =>
  PLATFORM_ORDER.map((key) => resolve(key, albumLinks[key])).filter(
    (p): p is ResolvedPlatform => p !== null
  );

/**
 * Platforms for one song. The song's own link wins, then the album's, then the
 * artist fallback. YouTube points at the session video itself when there is one.
 */
export const songPlatforms = (song: LiveSong): ResolvedPlatform[] =>
  PLATFORM_ORDER.map((key) => {
    const video = key === "youtube" && song.youtubeId ? `https://www.youtube.com/watch?v=${song.youtubeId}` : undefined;
    return resolve(key, song.links[key], video, albumLinks[key]);
  }).filter((p): p is ResolvedPlatform => p !== null);

export const songPlatform = (song: LiveSong, key: PlatformKey): ResolvedPlatform | null =>
  songPlatforms(song).find((p) => p.key === key) ?? null;

export const albumPlatform = (key: PlatformKey): ResolvedPlatform | null =>
  albumPlatforms().find((p) => p.key === key) ?? null;

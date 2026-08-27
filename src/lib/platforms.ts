import { Apple, AudioLines, Play, Waves, Youtube } from "lucide-react";
import {
  APPLE_MUSIC_ARTIST_URL,
  SPOTIFY_ARTIST_URL,
  TIDAL_ARTIST_URL,
  YOUTUBE_ARTIST_URL,
} from "@/lib/links";
import type { Release } from "@/types/content";

export interface PlatformLink {
  label: string;
  url: string;
  /** Short line shown under the label in the listen modal. */
  blurb: string;
  Icon: typeof Play;
}

/** Artist profiles — the "Listen Now" modal on the hero. */
export const artistPlatforms: PlatformLink[] = [
  {
    label: "Spotify",
    url: SPOTIFY_ARTIST_URL,
    blurb: "Full discography & playlists",
    Icon: AudioLines,
  },
  {
    label: "Apple Music",
    url: APPLE_MUSIC_ARTIST_URL,
    blurb: "Every single & EP",
    Icon: Apple,
  },
  {
    label: "YouTube",
    url: YOUTUBE_ARTIST_URL,
    blurb: "Music videos & live takes",
    Icon: Youtube,
  },
  {
    label: "Tidal",
    url: TIDAL_ARTIST_URL,
    blurb: "Hi-fi streaming",
    Icon: Waves,
  },
];

/**
 * Per-release destinations. Spotify is the only link every entry is guaranteed
 * to carry; the rest appear when the release has them, and Tidal falls back to
 * the artist page so the record is still one tap away there.
 */
export const releasePlatforms = (release: Release): PlatformLink[] =>
  [
    {
      label: "Spotify",
      url: release.streamingUrl,
      blurb: "Stream the record",
      Icon: Play,
    },
    {
      label: "Apple Music",
      url: release.appleMusicUrl,
      blurb: "Listen on Apple Music",
      Icon: Apple,
    },
    {
      label: "YouTube Music",
      url: release.youtubeMusicUrl,
      blurb: "Listen on YouTube Music",
      Icon: Youtube,
    },
    {
      label: "Tidal",
      url: release.tidalUrl ?? TIDAL_ARTIST_URL,
      blurb: release.tidalUrl ? "Hi-fi streaming" : "Hi-fi streaming — artist page",
      Icon: Waves,
    },
  ].filter((link): link is PlatformLink => Boolean(link.url));

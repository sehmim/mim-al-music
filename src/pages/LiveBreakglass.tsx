import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Seo, { SITE_URL } from "@/components/Seo";
import CrackCanvas from "@/components/live/CrackCanvas";
import LiveVideo from "@/components/live/LiveVideo";
import PlatformDrawer from "@/components/live/PlatformDrawer";
import PlatformIcon from "@/components/live/PlatformIcon";
import AlbumDetails from "@/components/live/AlbumDetails";
import HeroRelease from "@/components/live/HeroRelease";
import Timecode from "@/components/live/Timecode";
import { useReleased } from "@/hooks/use-release";
import logo from "@/assets/logo-trim.png";
import { INSTAGRAM_URL, SPOTIFY_ARTIST_URL, YOUTUBE_ARTIST_URL } from "@/lib/links";
import {
  COVER,
  COVER_SMALL,
  HERO_STILL,
  LIVE,
  RELEASE_AT,
  SONGS,
  albumPlatform,
  albumPlatforms,
  songPlatform,
  songPlatforms,
  type LiveSong,
  type PlatformKey,
} from "@/lib/live-breakglass";
import { buildLiveJsonLd, liveSeoDescription, liveSeoTitle } from "@/lib/live-seo";
import "./live-breakglass.css";

const PAGE_URL = `${SITE_URL}${LIVE.path}`;
const JSON_LD = buildLiveJsonLd(LIVE, PAGE_URL);
const BAND_SIZE = `${LIVE.lineup.length}-piece band`;

/** Apple Music, YouTube Music and Tidal sit beside Spotify under each video. */
const SONG_SHORTCUTS: { key: PlatformKey; label: string }[] = [
  { key: "appleMusic", label: "Apple" },
  { key: "youtubeMusic", label: "YT Music" },
  { key: "tidal", label: "Tidal" },
];

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" className="lb-play-glyph" aria-hidden="true">
    <path d="M6 3.5v17a1 1 0 0 0 1.5.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 6 3.5z" />
  </svg>
);

const MoreGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
  </svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

const Take = ({ song, released }: { song: LiveSong; released: boolean }) => {
  const spotify = songPlatform(song, "spotify");

  return (
    <article className="lb-take" id={song.id}>
      <div className="lb-take-head">
        <span className="lb-tape">Take {pad(song.number)}</span>
        <h3 className="lb-take-title">{song.title}</h3>
        <p className="lb-take-meta">
          <span>Live</span>
          {song.duration && <span>{song.duration}</span>}
          <span>{LIVE.studio}</span>
          <span>{BAND_SIZE}</span>
        </p>
      </div>

      <div className="lb-frame-wrap">
        <LiveVideo title={song.title} youtubeId={song.youtubeId} poster={song.poster} />
      </div>

      <div className="lb-listen">
        {spotify && (
          <a className="lb-pill lb-pill-ink lb-listen-main" href={spotify.url} target="_blank" rel="noopener noreferrer">
            <PlatformIcon platform="spotify" />
            Spotify <small>{spotify.exact ? (released ? "Live version" : "Pre-save") : "Artist page"}</small>
          </a>
        )}
        <div className="lb-listen-alt">
          {SONG_SHORTCUTS.map(({ key, label }) => {
            const p = songPlatform(song, key);
            return p ? (
              <a key={key} className="lb-sq" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.label}>
                <PlatformIcon platform={key} />
                {label}
              </a>
            ) : null;
          })}
          <PlatformDrawer title={song.title} platforms={songPlatforms(song)}>
            <button type="button" className="lb-sq" aria-label={`More platforms for ${song.title}`}>
              <MoreGlyph />
              More
            </button>
          </PlatformDrawer>
        </div>
      </div>
    </article>
  );
};

/** Shows once the hero (with its own pre-save and signup) has scrolled away; hides over the stream section and footer. */
const useDock = () => {
  const heroRef = useRef<HTMLElement>(null);
  const albumRef = useRef<HTMLElement>(null);
  const footRef = useRef<HTMLElement>(null);
  const [heroGone, setHeroGone] = useState(false);
  const [albumIn, setAlbumIn] = useState(false);
  const [footIn, setFootIn] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const watch = (el: Element | null, fn: (e: IntersectionObserverEntry) => void, rootMargin?: string) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => fn(e), { rootMargin });
      o.observe(el);
      return o;
    };
    const observers = [
      watch(heroRef.current, (e) => setHeroGone(!e.isIntersecting)),
      watch(albumRef.current, (e) => setAlbumIn(e.isIntersecting), "0px 0px -20% 0px"),
      watch(footRef.current, (e) => setFootIn(e.isIntersecting)),
    ];
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return { heroRef, albumRef, footRef, dockOn: heroGone && !albumIn && !footIn };
};

const LiveBreakglass = () => {
  const { heroRef, albumRef, footRef, dockOn } = useDock();
  const released = useReleased(RELEASE_AT);
  const spotifyAlbum = albumPlatform("spotify");
  const otherPlatforms = albumPlatforms().filter((p) => p.key !== "spotify");
  const credits = [...LIVE.credits, { role: "Release", names: [LIVE.year] }];

  return (
    <div className="lb">
      <Seo
        title={liveSeoTitle(LIVE)}
        description={liveSeoDescription(LIVE)}
        path={LIVE.path}
        keywords={LIVE.seo.keywords}
        image={COVER}
        type="music.album"
        jsonLd={JSON_LD}
      />

      <header className="lb-bar">
        <div className="lb-wrap lb-bar-in">
          <Link className="lb-brand" to="/" aria-label="MIM AL home">
            <span className="lb-brand-logo" aria-hidden="true">
              <img src={logo} alt="" />
            </span>
            <span className="lb-brand-name">MIM AL</span>
          </Link>
          <span className="lb-crumb">{LIVE.path}</span>
          <a className="lb-pill lb-pill-cream lb-pill-sm" href="#listen">
            Listen
          </a>
        </div>
      </header>

      <main>
        <section className="lb-hero" id="top" ref={heroRef}>
          <div className="lb-hero-grid">
            <div className="lb-hero-media">
              <img
                className="lb-hero-img"
                src={HERO_STILL}
                alt={`Mim Al playing guitar live at ${LIVE.studio}`}
              />
              <CrackCanvas className="lb-crack" seed={7} x={0.16} y={0.2} rays={14} animate />
              <div className="lb-hero-shade" />
              <div className="lb-hero-glow" />
              <div className="lb-grain" />
              <div className="lb-hero-tags">
                <span className="lb-rec">
                  <i />
                  Rec
                </span>
                <Timecode className="lb-tc" />
              </div>
            </div>

            <div className="lb-hero-side lb-wrap">
              <div className="lb-hero-copy">
                <h1 className="lb-hero-title">
                  <span className="lb-t-kicker">{LIVE.artist}</span>
                  <span className="lb-t-at">Live at</span>
                  <span className="lb-t-big">Breakglass</span>
                  <span className="lb-t-big">Studios</span>
                </h1>
              </div>

              <HeroRelease released={released} />
            </div>
          </div>
        </section>

        <AlbumDetails released={released} />

        <section className="lb-session" id="session" aria-labelledby="lb-session-title">
          <div className="lb-wrap lb-sec-head">
            <h2 className="lb-sec-title" id="lb-session-title">
              The Session
            </h2>
            <span className="lb-eyebrow">{SONGS.length} takes · Full video</span>
          </div>
          {SONGS.map((song) => (
            <Take key={song.id} song={song} released={released} />
          ))}
        </section>

        <section className="lb-album" id="listen" ref={albumRef} aria-labelledby="lb-listen-title">
          <div className="lb-wrap">
            <div className="lb-sec-head">
              <h2 className="lb-sec-title" id="lb-listen-title">
                Stream the album
              </h2>
              <span className="lb-eyebrow">Live · {SONGS.length} songs</span>
            </div>

            {spotifyAlbum && (
              <a className="lb-feature" href={spotifyAlbum.url} target="_blank" rel="noopener noreferrer">
                <span className="lb-cover" aria-hidden="true">
                  <img src={COVER_SMALL} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="lb-feature-body">
                  <span className="lb-feature-plat">
                    <PlatformIcon platform="spotify" />
                    Spotify
                  </span>
                  <span className="lb-feature-title">{LIVE.title}</span>
                  <span className="lb-feature-meta">
                    {LIVE.artist} · Live album · {LIVE.year} · {SONGS.length} songs
                  </span>
                </span>
                <span className="lb-pill lb-pill-cream">
                  <PlayGlyph />
                  {!spotifyAlbum.exact ? "Follow on Spotify" : released ? "Play the album" : "Pre-save the album"}
                </span>
              </a>
            )}

            <ul
              className="lb-plats"
              // Three columns until there are enough platforms to fill rows of four.
              style={{ "--lb-plat-cols": otherPlatforms.length <= 6 ? 3 : 4 } as CSSProperties}
            >
              {otherPlatforms.map((p) => (
                <li key={p.key}>
                  <a className="lb-plat" href={p.url} target="_blank" rel="noopener noreferrer">
                    <PlatformIcon platform={p.key} />
                    <span className="lb-plat-name">{p.label}</span>
                    <span className="lb-plat-arrow" aria-hidden="true">
                      &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lb-trk" id="credits" aria-labelledby="lb-trk-title">
          <div className="lb-wrap">
            <div className="lb-sec-head">
              <h2 className="lb-sec-title" id="lb-trk-title">
                Track sheet
              </h2>
              <span className="lb-eyebrow">
                Breakglass{LIVE.city ? ` · ${LIVE.city}` : ""}
              </span>
            </div>
            <div className="lb-trk-grid">
              <p className="lb-notes">
                <strong>{LIVE.notesLead}</strong> {LIVE.notes}
              </p>
              <div className="lb-table-scroll">
                <table className="lb-table">
                  <thead>
                    <tr>
                      <th>Ch</th>
                      <th>Input</th>
                      <th>Played by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LIVE.lineup.map((member, i) => (
                      <tr key={member.role}>
                        <td className="lb-ch">{pad(i + 1)}</td>
                        <td>{member.role}</td>
                        <td className="lb-who">{member.name}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="lb-ch">{pad(LIVE.lineup.length + 1)}</td>
                      <td>Room L / R</td>
                      <td className="lb-who">Breakglass live room</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <dl className="lb-credits">
                {credits.map((c) => (
                  <div key={c.role}>
                    <dt>{c.role}</dt>
                    <dd>{c.names.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="lb-foot" ref={footRef}>
        <div className="lb-wrap lb-foot-in">
          <Link className="lb-brand" to="/">
            <span className="lb-brand-logo" aria-hidden="true">
              <img src={logo} alt="" />
            </span>
            <span className="lb-brand-name">MIM AL</span>
          </Link>
          <nav className="lb-foot-nav" aria-label="Footer">
            <Link to="/">Home</Link>
            <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noopener noreferrer">
              Spotify
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={YOUTUBE_ARTIST_URL} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </nav>
          <p className="lb-foot-small">
            mimal.music{LIVE.path} · © {LIVE.year} {LIVE.artist}
          </p>
        </div>
      </footer>

      {spotifyAlbum && (
        <div className="lb-dock" data-on={dockOn} aria-hidden={!dockOn}>
          <div className="lb-dock-in">
            <span className="lb-dock-cover" aria-hidden="true">
              <img src={COVER_SMALL} alt="" loading="lazy" decoding="async" />
            </span>
            <span className="lb-dock-txt">
              <strong>{LIVE.shortTitle}</strong>
              <span>
                {LIVE.artist} · {SONGS.length} songs
              </span>
            </span>
            <a
              className="lb-pill lb-pill-cream lb-pill-sm"
              href={spotifyAlbum.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={dockOn ? 0 : -1}
            >
              <PlatformIcon platform="spotify" />
              {released ? "Spotify" : "Pre-save"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveBreakglass;

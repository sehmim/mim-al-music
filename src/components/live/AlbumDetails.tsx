import { COVER, LIVE, RELEASE_DAY, SONGS } from "@/lib/live-breakglass";

const pad = (n: number) => String(n).padStart(2, "0");

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" className="lb-play-glyph" aria-hidden="true">
    <path d="M6 3.5v17a1 1 0 0 0 1.5.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 6 3.5z" />
  </svg>
);

/** The block under the hero: album art, what the record is, and the track list linking to each take. */
const AlbumDetails = ({ released }: { released: boolean }) => (
  <section className="lb-record" id="album" aria-labelledby="lb-record-title">
    <div className="lb-wrap lb-record-grid">
      <figure className="lb-record-art">
        <img
          src={COVER}
          alt={`${LIVE.artist}, ${LIVE.title} album cover: guitar pedalboards and cables on the studio floor`}
          width={1200}
          height={1200}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="lb-record-body">
        <span className="lb-eyebrow">
          The album · {released ? "Released" : "Out"} {RELEASE_DAY}
        </span>
        <h2 className="lb-sec-title" id="lb-record-title">
          {LIVE.title}
        </h2>
        <p className="lb-record-tagline">{LIVE.tagline}</p>

        <div className="lb-setlist-head">
          <span className="lb-eyebrow">Tracklist</span>
          <span className="lb-eyebrow">{SONGS.length} songs</span>
        </div>
        <ol className="lb-setlist">
          {SONGS.map((song) => (
            <li key={song.id}>
              <a href={`#${song.id}`}>
                <span className="lb-sl-n">{pad(song.number)}</span>
                <span className="lb-sl-t">{song.title}</span>
                {song.duration && <span className="lb-sl-d">{song.duration}</span>}
                <span className="lb-sl-p">
                  <PlayGlyph />
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="lb-record-actions">
          <a className="lb-pill lb-pill-cream" href={`#${SONGS[0].id}`}>
            <PlayGlyph />
            Watch the session
          </a>
          <a className="lb-pill lb-pill-ghost" href="#credits">
            Credits
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AlbumDetails;

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Music } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { releaseImages } from "@/lib/release-images";
import { releaseFormat } from "@/lib/release-format";
import { releasePlatforms } from "@/lib/platforms";
import ListenModal from "@/components/ListenModal";
import Seo, { SITE_URL } from "@/components/Seo";
import { buildReleaseJsonLd, releaseSeoDescription, releaseSeoTitle } from "@/lib/release-seo";
import logo from "@/assets/mim-al-logo.png";

const getYoutubeEmbedUrl = (url: string) => {
  if (!url || url === "#") return null;
  try {
    const parsed = new URL(url);
    let videoId = "";

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.replace("/", "");
    } else {
      videoId = parsed.searchParams.get("v") || "";
    }

    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-foreground/[0.28] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground/75">
    {children}
  </span>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="eyebrow mb-2.5 block tracking-[0.2em]">{children}</span>
);

const BlogPost = () => {
  const { content } = useLanguage();
  const { slug } = useParams();

  const release = content.releases.find((r) => r.slug === slug);
  const musicVideoEmbed = release?.blog?.musicVideo
    ? getYoutubeEmbedUrl(release.blog.musicVideo)
    : null;
  const coverImage = release ? releaseImages[release.image] : undefined;

  if (!release) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 font-hand text-2xl uppercase text-foreground">
            Release Not Found
          </h1>
          <Link to="/" className="btn-hero gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const badges = [release.date, releaseFormat(release), release.genre, release.duration].filter(
    Boolean
  ) as string[];
  const links = releasePlatforms(release);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={releaseSeoTitle(release)}
        description={releaseSeoDescription(release)}
        path={`/blog/${release.slug}`}
        keywords={release.seo?.keywords}
        image={coverImage}
        type={release.trackList ? "music.album" : "music.song"}
        jsonLd={buildReleaseJsonLd(release, `${SITE_URL}/blog/${release.slug}`)}
      />

      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-foreground/[0.12] bg-background/[0.82] px-5 py-3 backdrop-blur-lg">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="block h-[30px] w-[30px]" />
          <span className="font-hand text-base tracking-[0.06em]">MIM AL</span>
        </Link>
        <Link
          to="/#releases"
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All Releases
        </Link>
      </header>

      {/* Masthead — cover, credits and streaming links, above the fold */}
      <section className="px-5 pb-12 pt-6">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-start gap-8 md:grid-cols-2">
          <img
            src={coverImage}
            alt={`${release.title} cover art`}
            className="block aspect-square w-full border border-foreground/[0.14] object-cover"
          />

          <div>
            <span className="eyebrow mb-3 block tracking-[0.18em] text-foreground/50">Release</span>

            <div className="mb-4 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Pill key={badge}>{badge}</Pill>
              ))}
            </div>

            <h1 className="m-0 mb-3.5 font-hand text-[clamp(26px,5.4vw,42px)] uppercase leading-[1.08]">
              {release.title}
            </h1>

            <p className="mb-6 text-base leading-relaxed text-foreground/[0.66] [text-wrap:pretty]">
              {release.description}
            </p>

            {release.trackList && release.trackList.length > 0 && (
              <div className="mb-7">
                <SectionTitle>Tracklist</SectionTitle>
                <ol className="flex flex-col">
                  {release.trackList.map((track) => (
                    <li
                      key={track.number}
                      className="grid grid-cols-[26px_1fr_auto] items-center gap-3 border-t border-foreground/[0.12] py-3"
                    >
                      <span className="text-xs text-foreground/40">{track.number}</span>
                      <span className="text-[15px]">{track.name}</span>
                      <span className="text-xs text-foreground/40">{track.duration}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <SectionTitle>Listen</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {links.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The story — the part search engines actually index */}
      <article className="section-rule px-5 py-12">
        <div className="mx-auto max-w-[720px]">
          <div className="space-y-6">
            {release.blog.content.map((paragraph, index) => (
              <div
                key={index}
                className="text-[17px] leading-[1.65] text-foreground/[0.72] [&_a]:underline [&_a]:decoration-foreground/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-foreground [&_strong]:font-semibold [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>

          {release.blog.assets && release.blog.assets.length > 0 && (
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {release.blog.assets.map((asset, index) => (
                <div key={index} className="overflow-hidden border border-foreground/[0.14]">
                  {asset.type === "image" && (
                    <div>
                      <img
                        src={releaseImages[asset.url] || `/assets/${asset.url}`}
                        alt={asset.alt || asset.caption}
                        loading="lazy"
                        className="h-64 w-full object-cover"
                      />
                      <p className="p-3 text-xs text-foreground/50">{asset.caption}</p>
                    </div>
                  )}

                  {asset.type === "audio" && (
                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Music className="h-4 w-4" />
                        <span className="font-hand text-[15px] uppercase">Audio Preview</span>
                        {asset.duration && <Pill>{asset.duration}</Pill>}
                      </div>
                      <audio controls className="mb-3 w-full">
                        <source src={`/assets/${asset.url}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <p className="text-xs text-foreground/50">{asset.caption}</p>
                    </div>
                  )}

                  {asset.type === "video" && (
                    <div>
                      <video
                        controls
                        className="h-64 w-full object-cover"
                        poster={`/assets/${asset.url.replace(".mp4", "-thumb.jpg")}`}
                      >
                        <source src={`/assets/${asset.url}`} type="video/mp4" />
                        Your browser does not support the video element.
                      </video>
                      <div className="p-3">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="font-hand text-[15px] uppercase">Video</span>
                          {asset.duration && <Pill>{asset.duration}</Pill>}
                        </div>
                        <p className="text-xs text-foreground/50">{asset.caption}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {musicVideoEmbed && (
            <div className="mt-12">
              <SectionTitle>Video</SectionTitle>
              <div className="aspect-video w-full overflow-hidden border border-foreground/[0.14] bg-black">
                <iframe
                  className="h-full w-full"
                  src={musicVideoEmbed}
                  title={`${release.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {release.credits && release.credits.length > 0 && (
            <div className="mt-12">
              <SectionTitle>Credits</SectionTitle>
              <dl className="flex flex-col">
                {release.credits.map((credit, index) => (
                  <div
                    key={index}
                    className="border-t border-foreground/[0.12] py-3 sm:flex sm:gap-4"
                  >
                    <dt className="shrink-0 text-[13px] text-foreground/45 sm:w-64">
                      {credit.role}
                    </dt>
                    <dd className="text-[15px]">
                      {credit.url ? (
                        <a
                          href={credit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                        >
                          {credit.name}
                        </a>
                      ) : (
                        credit.name
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              {release.label && (
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-foreground/40">
                  {release.label} · ℗ {release.date} MIM AL
                </p>
              )}
            </div>
          )}

          <div className="mt-12 border border-foreground/[0.14] p-5">
            <SectionTitle>Recording Notes</SectionTitle>
            <div
              className="text-[15px] leading-[1.6] text-foreground/[0.66]"
              dangerouslySetInnerHTML={{ __html: release.blog.recordingNotes }}
            />
          </div>

          {release.blog.lyrics && (
            <div className="mt-12">
              <SectionTitle>Lyrics</SectionTitle>
              <pre className="whitespace-pre-wrap border border-foreground/[0.14] p-5 font-sans text-[15px] leading-[1.7] text-foreground/[0.66]">
                {release.blog.lyrics}
              </pre>
            </div>
          )}
        </div>
      </article>

      <section className="section-rule px-5 py-12">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="mb-3 font-hand text-[clamp(20px,3.8vw,30px)] uppercase leading-[1.08]">
            Ready to Experience the Music?
          </h2>
          <p className="mx-auto mb-6 max-w-[46ch] text-[15px] leading-[1.5] text-foreground/[0.55]">
            Stream &ldquo;{release.title}&rdquo; on all major platforms and dive into the full
            sonic experience.
          </p>
          <div className="flex flex-col flex-wrap justify-center gap-2 sm:flex-row">
            <ListenModal
              title={`Listen to ${release.title}`}
              description="Pick your platform and press play."
              links={links}
            >
              <button type="button" className="btn-hero gap-2">
                <Play className="h-4 w-4" />
                Listen Now
              </button>
            </ListenModal>
            <Link to="/#releases" className="btn-secondary gap-2">
              <ExternalLink className="h-4 w-4" />
              More Releases
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;

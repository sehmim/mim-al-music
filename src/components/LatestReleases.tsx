import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { releaseImages } from "@/lib/release-images";
import { releaseFormat } from "@/lib/release-format";

const LatestReleases = () => {
  const { content } = useLanguage();
  const releases = content.releases;

  return (
    <section id="releases" className="section-rule px-5 pb-16 pt-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="section-heading" style={{ fontSize: "clamp(30px, 7vw, 56px)" }}>
            Releases
          </h2>
          <span className="eyebrow shrink-0">{releases.length} records</span>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(150px, 47%), 1fr))" }}
        >
          {releases.map((release) => (
            <Link
              key={release.slug}
              to={`/blog/${release.slug}`}
              className="group relative block transition-transform duration-200 hover:-translate-y-[3px]"
            >
              <div className="relative aspect-square overflow-hidden border border-foreground/[0.12] bg-muted">
                <img
                  src={releaseImages[release.image]}
                  alt={release.title}
                  loading="lazy"
                  className="block h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/70 to-transparent to-[55%] p-2.5 opacity-0 transition-opacity duration-[260ms] group-hover:opacity-100">
                  <span className="text-[10px] uppercase tracking-[0.2em]">Read</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 px-0.5 pt-2.5">
                <span className="min-h-[2.5em] font-display text-xs uppercase leading-[1.25] tracking-[0.02em]">
                  {release.title}
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-foreground/40">
                  {[release.date, releaseFormat(release)].filter(Boolean).join(" · ")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;

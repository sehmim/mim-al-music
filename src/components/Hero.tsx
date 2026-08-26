import { useLanguage } from "@/contexts/LanguageContext";
import logoTile from "@/assets/mim-al-logo.png";
import logoTrim from "@/assets/logo-trim.png";
import { SPOTIFY_ARTIST_URL, INSTAGRAM_URL } from "@/lib/links";

const Hero = () => {
  const { content } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-[82vh] flex-col justify-center overflow-hidden px-5 pb-12 pt-4"
    >
      {/* Tiled logo wallpaper, faded out toward the centre so the wordmark reads */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[10%] opacity-[0.07]"
        style={{
          backgroundImage: `url(${logoTile})`,
          backgroundRepeat: "repeat",
          backgroundSize: "190px 190px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 10%, hsl(var(--background) / 0.15) 0%, hsl(var(--background) / 0.86) 55%, hsl(var(--background)) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        <img
          src={logoTrim}
          alt="MIM AL illustration"
          className="mim-up mx-auto mb-4 block w-[clamp(180px,52vw,320px)] max-w-full"
        />

        <h1
          className="mim-up m-0 mb-[18px] font-hand uppercase leading-[0.9]"
          style={{
            fontSize: "clamp(46px, 15vw, 152px)",
            animationDelay: "60ms",
          }}
        >
          {content.hero.title}
        </h1>

        <p className="mx-auto mb-[26px] max-w-[42ch] text-[clamp(15px,2.4vw,19px)] leading-[1.5] text-foreground/[0.66] [text-wrap:pretty]">
          {content.hero.subtitle}
        </p>

        <div className="flex w-full max-w-[420px] justify-center gap-2">
          <a
            href={SPOTIFY_ARTIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero flex-1 whitespace-nowrap"
          >
            {content.hero.buttons.primary}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-1 whitespace-nowrap"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

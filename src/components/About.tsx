import { useLanguage } from "@/contexts/LanguageContext";
import mimAlImg from "@/assets/mim-al.jpg";
import { SPOTIFY_ARTIST_URL } from "@/lib/links";

const About = () => {
  const { content } = useLanguage();

  return (
    <section id="about" className="section-rule px-5 py-11">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-5 md:grid-cols-2">
        <div>
          <h2 className="section-heading mb-3.5">{content.about.heading}</h2>

          {content.about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`mb-2.5 text-[15px] leading-[1.5] [text-wrap:pretty] ${
                index === 0 ? "text-foreground/[0.78]" : "text-foreground/[0.58]"
              }`}
            >
              {paragraph}
            </p>
          ))}

          <a
            href={SPOTIFY_ARTIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-2"
          >
            {content.about.buttons.secondary}
          </a>
        </div>

        <img
          src={mimAlImg}
          alt="Mim Al performing"
          loading="lazy"
          className="block aspect-[3/2] w-full border border-foreground/[0.14] object-cover object-[center_30%]"
        />
      </div>
    </section>
  );
};

export default About;

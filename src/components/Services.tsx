import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { content } = useLanguage();

  return (
    <section id="services" className="section-rule px-5 py-11">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-heading">{content.services.heading}</h2>
          <p className="max-w-[46ch] text-[13px] leading-[1.45] text-foreground/[0.55]">
            {content.services.subheading}
          </p>
        </div>

        <div
          className="grid gap-2.5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}
        >
          {content.services.offers.map((offer) => (
            <div
              key={offer.title}
              className="flex flex-col border border-foreground/[0.14] p-4 transition-colors hover:border-foreground/40"
            >
              <h3 className="m-0 mb-1.5 font-display text-[13px] uppercase">{offer.title}</h3>
              <p className="m-0 mb-3 text-[13px] leading-[1.45] text-foreground/[0.55]">
                {offer.description}
              </p>

              <ul className="mb-5 flex flex-1 flex-col gap-1.5">
                {offer.bullets.map((bullet: string) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-[12px] leading-[1.4] text-foreground/[0.6]"
                  >
                    <span aria-hidden className="text-foreground/30">
                      —
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {offer.ctas?.map((cta: { label: string; url: string }, i: number) => (
                  <a
                    key={cta.url}
                    href={cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={i === 0 ? "btn-hero" : "btn-secondary"}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <a
          href={content.services.primaryCta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-hero mt-4"
        >
          {content.services.primaryCta.label}
        </a>
      </div>
    </section>
  );
};

export default Services;

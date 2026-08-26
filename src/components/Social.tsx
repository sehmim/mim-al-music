import { useLanguage } from "@/contexts/LanguageContext";

const Social = () => {
  const { content } = useLanguage();

  return (
    <section id="follow" className="section-rule px-5 py-11">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="section-heading mb-4">{content.social.heading}</h2>

        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))" }}
        >
          {content.social.platforms.map((platform) => (
            <a
              key={platform.platform}
              href={platform.url}
              target={platform.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex min-h-[56px] items-center justify-between gap-3 border border-foreground/[0.14] px-4 py-3 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <span className="flex flex-col gap-0.5">
                <span className="font-hand text-[15px] uppercase">{platform.platform}</span>
                <span className="text-[11px] opacity-55">{platform.description}</span>
              </span>
              <span aria-hidden className="text-base leading-none">
                &#8599;
              </span>
            </a>
          ))}
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-foreground/35">
          {content.social.streaming.heading} — {content.social.streaming.platforms.join(", ")}
        </p>
      </div>
    </section>
  );
};

export default Social;

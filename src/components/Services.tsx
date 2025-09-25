import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useHighlight } from "@/hooks/use-highlight";

const Services = () => {
  const { content } = useLanguage();
  const { ref, isHighlighted } = useHighlight<HTMLDivElement>();

  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          {content.services.heading}
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mt-4">
          {content.services.subheading}
        </p>

        <div 
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 highlight-section ${
            isHighlighted ? 'highlighted' : ''
          }`}
        >
          {content.services.offers.map((offer: any, idx: number) => (
            <div key={idx} className="album-card p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-muted-foreground mb-4 flex-1">{offer.description}</p>
              <ul className="mb-6 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {offer.bullets.map((bullet: string, i: number) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                {offer.ctas?.map((cta: { label: string; url: string }, i: number) => (
                  <Button key={i} asChild variant={i === 0 ? "default" : "outline"}>
                    <a href={cta.url} target="_blank" rel="noreferrer">
                      {cta.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href={content.services.primaryCta.url} target="_blank" rel="noreferrer">
              {content.services.primaryCta.label}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;

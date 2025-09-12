import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Press = () => {
  const { content } = useLanguage();
  
  return (
    <section className="py-20 px-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          {content.press.heading}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.press.quotes.map((quote, index) => (
            <div key={index} className="album-card group text-center">
              <Quote className="w-8 h-8 mx-auto mb-6 text-primary electric-glow" />
              
              <blockquote className="text-lg font-medium text-foreground mb-6 leading-relaxed">
                "{quote.text}"
              </blockquote>
              
              <div className="space-y-1">
                <cite className="font-display font-bold text-primary not-italic">
                  {quote.author}
                </cite>
                <p className="text-sm text-muted-foreground">
                  {quote.role}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            {content.press.callToAction.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${content.press.callToAction.buttons.primary.email}`} 
              className="btn-hero inline-flex items-center justify-center"
            >
              {content.press.callToAction.buttons.primary.text}
            </a>
            <a 
              href={content.press.callToAction.buttons.secondary.url} 
              className="btn-secondary inline-flex items-center justify-center"
            >
              {content.press.callToAction.buttons.secondary.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Press;
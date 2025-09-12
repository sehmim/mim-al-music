import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import mimAlImg from "@/assets/mim-al.jpg";

const About = () => {
  const { content } = useLanguage();
  
  return (
    <section className="py-20 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          {content.about.heading}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              {content.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right-side Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <img
                src={mimAlImg}
                alt="Mim Al portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
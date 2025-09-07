import { Button } from "@/components/ui/button";
import { Music2, Zap, Heart } from "lucide-react";
import content from "@/data/content.json";

const iconMap = {
  Music2,
  Zap,
  Heart
};

const About = () => {
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
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="btn-hero">
                {content.about.buttons.primary}
              </Button>
              
              <Button className="btn-secondary">
                {content.about.buttons.secondary}
              </Button>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.about.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div key={index} className={`album-card text-center p-8 ${feature.icon === 'Heart' ? 'sm:col-span-2' : ''}`}>
                  <IconComponent className={`w-12 h-12 mx-auto mb-4 ${
                    feature.icon === 'Zap' ? 'text-secondary pink-glow' : 'text-primary electric-glow'
                  }`} />
                  <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
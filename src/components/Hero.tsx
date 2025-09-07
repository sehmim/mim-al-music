import { Button } from "@/components/ui/button";
import { Play, Music } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import content from "@/data/content.json";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      
      {/* Electric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow opacity-20 rounded-full blur-3xl" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <Music className="w-16 h-16 mx-auto mb-4 text-primary electric-glow" />
        </div>
        
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-display font-black mb-6 glitch"
          data-text={content.hero.title}
        >
          {content.hero.title}
        </h1>
        
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {content.hero.subtitle}
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {content.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="btn-hero group" size="lg">
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            {content.hero.buttons.primary}
          </Button>
          
          <Button className="btn-secondary" size="lg">
            {content.hero.buttons.secondary}
          </Button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
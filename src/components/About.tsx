import { Button } from "@/components/ui/button";
import { Music2, Zap, Heart } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          About the Artist
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mim Al isn't your typical rock artist. Born from the collision of raw emotion and electric experimentation, 
                this sound defies conventional boundaries and creates something entirely new.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a twist that keeps listeners guessing, Mim Al's music explores the spaces between chaos and control, 
                darkness and light, ordinary and extraordinary. Each track is a journey through uncharted sonic territory.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                From the raw energy of "CHICKEN WITH It's HEAD CUT OFF" to the introspective depths of "Dim Out the Lights," 
                every release challenges expectations and pushes the envelope of what rock music can be.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="btn-hero">
                Discover the Music
              </Button>
              
              <Button className="btn-secondary">
                Join the Club
              </Button>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="album-card text-center p-8">
              <Music2 className="w-12 h-12 mx-auto mb-4 text-primary electric-glow" />
              <h3 className="font-display font-bold text-lg mb-2">Unconventional Sound</h3>
              <p className="text-muted-foreground text-sm">
                Breaking rules and creating new ones
              </p>
            </div>
            
            <div className="album-card text-center p-8">
              <Zap className="w-12 h-12 mx-auto mb-4 text-secondary pink-glow" />
              <h3 className="font-display font-bold text-lg mb-2">Electric Energy</h3>
              <p className="text-muted-foreground text-sm">
                Raw power meets artistic precision
              </p>
            </div>
            
            <div className="album-card text-center p-8 sm:col-span-2">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary electric-glow" />
              <h3 className="font-display font-bold text-lg mb-2">Authentic Expression</h3>
              <p className="text-muted-foreground text-sm">
                Every note tells a story, every song reveals a truth
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
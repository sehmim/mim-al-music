import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import albumNotSoSpecial from "@/assets/album-not-so-special.jpg";
import albumDimOutLights from "@/assets/album-dim-out-lights.jpg";
import albumChickenHead from "@/assets/album-chicken-head.jpg";

const releases = [
  {
    title: "Not So Special",
    date: "Jan 17, 2025",
    image: albumNotSoSpecial,
    description: "A raw exploration of feeling ordinary in an extraordinary world",
    streamingUrl: "#"
  },
  {
    title: "Dim Out the Lights",
    date: "Feb 7, 2025",
    image: albumDimOutLights,
    description: "When darkness becomes your comfort zone",
    streamingUrl: "#"
  },
  {
    title: "CHICKEN WITH It's HEAD CUT OFF",
    date: "Mar 31, 2025",
    image: albumChickenHead,
    description: "Chaotic energy meets purposeful madness",
    streamingUrl: "#"
  }
];

const LatestReleases = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          Latest Releases
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <div key={index} className="album-card group">
              {/* Album Cover */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img 
                  src={release.image} 
                  alt={release.title}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="btn-hero">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              
              {/* Album Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">
                    {release.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {release.date}
                  </p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {release.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="btn-hero flex-1" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Stream Now
                  </Button>
                  
                  <Button variant="outline" size="sm" className="border-border hover:border-primary/50">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button className="btn-secondary" size="lg">
            View All Releases
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
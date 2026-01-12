import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import notSoSpecial from "@/assets/not-so-special.jpg";
import dimOutLights from "@/assets/dim-out-the-lights.jpg";
import chickenHead from "@/assets/chicken-with-head-cut-off.jpeg";
import bleezeImage from "@/assets/bleeze.jpg";
import noceboImage from "@/assets/nocebo.jpg";
import suddenConfusionImage from "@/assets/sudden-confusion.jpg";
import contrastInMayImage from "@/assets/contrast-in-may.jpg";
import ideaImage from "@/assets/idea.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const imageMap = {
  "not-so-special.jpg": notSoSpecial,
  "dim-out-the-lights.jpg": dimOutLights,
  "chicken-with-head-cut-off.jpeg": chickenHead,
  "bleeze.jpg": bleezeImage,
  "nocebo.jpg": noceboImage,
  "sudden-confusion.jpg": suddenConfusionImage,
  "contrast-in-may.jpg": contrastInMayImage,
  "idea.jpg": ideaImage
};

const LatestReleases = () => {
  const { content } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const displayedReleases = showAll ? content.releases : content.releases.slice(0, 3);

  // Listen for custom event to show all releases
  useEffect(() => {
    const handleShowAllReleases = () => {
      setShowAll(true);
    };

    window.addEventListener('showAllReleases', handleShowAllReleases);
    
    return () => {
      window.removeEventListener('showAllReleases', handleShowAllReleases);
    };
  }, []);

  // Mobile hover effect using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = cardRefs.current.findIndex(ref => ref === entry.target);
            if (cardIndex !== -1) {
              setActiveCard(cardIndex);
            }
          }
        });
      },
      {
        threshold: 0.6, // Trigger when 60% of the card is visible
        rootMargin: '-20% 0px -20% 0px' // Only trigger when card is in center area
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [displayedReleases]);

  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          Releases
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedReleases.map((release, index) => (
            <Link 
              key={index} 
              to={`/blog/${release.slug}`} 
              ref={(el) => (cardRefs.current[index] = el)}
              className={`album-card group block transition-all duration-500 ${
                activeCard === index 
                  ? 'scale-105 shadow-2xl shadow-primary/20 border-primary/50' 
                  : 'hover:scale-105'
              }`}
            >
              {/* Album Cover */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img 
                  src={imageMap[release.image]} 
                  alt={release.title}
                  className={`w-full aspect-square object-cover transition-transform duration-500 ${
                    activeCard === index 
                      ? 'scale-110' 
                      : 'group-hover:scale-110'
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-background/80 to-transparent transition-opacity duration-300 ${
                  activeCard === index 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100'
                }`} />
                
                {/* Play Button Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  activeCard === index 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <Button className="btn-hero">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              
              {/* Album Info */}
              <div className="">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">
                    {release.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {release.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Call to Action */}
        {content.releases.length > 3 && (
          <div className="text-center mt-16">
            <Button 
              className="btn-secondary" 
              size="lg"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View All Releases'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestReleases;

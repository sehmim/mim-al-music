import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, Play } from "lucide-react";
import content from "@/data/content.json";

const Tour = () => {
  // Sort shows: upcoming first, then past shows
  const sortedShows = [...content.tour.shows].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.year}`);
    const dateB = new Date(`${b.date} ${b.year}`);
    const now = new Date();
    
    const aIsPast = dateA < now;
    const bIsPast = dateB < now;
    
    // If one is past and one is future, future comes first
    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;
    
    // If both are past or both are future, sort by date
    return dateA.getTime() - dateB.getTime();
  });

  const isShowPast = (show: any) => {
    const showDate = new Date(`${show.date} ${show.year}`);
    return showDate < new Date();
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          {content.tour.heading}
        </h2>
        
        <div className="space-y-4 max-w-4xl mx-auto">
          {sortedShows.map((show, index) => {
            const isPast = isShowPast(show);
            return (
            <div key={index} className="album-card group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Date */}
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-display font-bold text-primary">
                      {show.date}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {show.year}
                    </div>
                  </div>
                  
                  <Calendar className="w-6 h-6 text-secondary hidden sm:block" />
                </div>
                
                {/* Venue Info */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {show.venue}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{show.city}</span>
                  </div>
                </div>
                
                {/* Status & Tickets */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isPast
                        ? "bg-muted text-muted-foreground"
                        : show.status === "Sold Out" 
                        ? "bg-destructive/20 text-destructive"
                        : show.status === "On Sale"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {isPast ? "Past Show" : show.status}
                    </span>
                  </div>
                  
                  <Button 
                    className={isPast ? "btn-secondary" : (show.status === "Sold Out" ? "opacity-50 cursor-not-allowed" : "btn-hero")}
                    disabled={show.status === "Sold Out" && !isPast}
                    size="sm"
                    onClick={() => {
                      if (isPast) {
                        // For past shows, could link to clips or social media
                        window.open(show.ticketUrl, '_blank');
                      } else {
                        // For future shows, link to tickets
                        window.open(show.ticketUrl, '_blank');
                      }
                    }}
                  >
                    {isPast ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        See Clips from Show
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4 mr-2" />
                        {show.status === "Sold Out" ? "Sold Out" : 
                         show.status === "Coming Soon" ? "Notify Me" : "Get Tickets"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        
        {/* Newsletter Signup for Tour Updates */}
        <div className="mt-16 text-center album-card max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-xl mb-4">
            {content.tour.newsletter.heading}
          </h3>
          <p className="text-muted-foreground mb-6">
            {content.tour.newsletter.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={content.tour.newsletter.placeholder}
              className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="btn-secondary">
              {content.tour.newsletter.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tour;
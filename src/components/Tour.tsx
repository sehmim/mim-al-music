import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, Play, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEmailCapture } from "@/hooks/use-email-capture";
import { useHighlight } from "@/hooks/use-highlight";

// Individual Tour Date Component
const TourDate = ({ show, language }: { 
  show: { 
    date: string; 
    year: string; 
    venue: string; 
    city: string; 
    status: string; 
    ticketUrl: string; 
  }; 
  language: string; 
}) => {
  const { ref, isHighlighted } = useHighlight<HTMLDivElement>();
  
  const isShowPast = (show: { date: string; year: string }) => {
    const showDate = new Date(`${show.date} ${show.year}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison
    return showDate < today;
  };

  const isPast = isShowPast(show);

  return (
    <div 
      ref={ref}
      className={`album-card group highlight-section ${!isPast ? 'upcoming-show' : ''} ${
        isHighlighted ? 'highlighted' : ''
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
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
          <div className="flex items-center justify-end min-w-[100px]">
            <span className={`status-badge ${
              isPast
                ? "bg-muted text-muted-foreground"
                : show.status === "Sold Out" 
                ? "bg-destructive/20 text-destructive"
                : show.status === "On Sale"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}>
              {isPast ? (
                language === 'fr' ? "Spectacle Passé" : 
                language === 'bn' ? "পাস্ট শো" : 
                "Past Show"
              ) : show.status}
            </span>
          </div>
          
          <Button 
            className={`${isPast ? "btn-secondary" : (show.status === "Sold Out" ? "opacity-50 cursor-not-allowed" : "btn-hero")} whitespace-nowrap`}
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
                {language === 'fr' ? "Clips du Spectacle" :
                 language === 'bn' ? "শো থেকে ক্লিপস" :
                 "Clips from the Show"}
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4 mr-2" />
                {show.status === "Sold Out" ? (
                  language === 'fr' ? "Épuisé" : 
                  language === 'bn' ? "বিক্রি শেষ" : 
                  "Sold Out"
                ) : 
                 show.status === "Coming Soon" ? (
                   language === 'fr' ? "Me Notifier" : 
                   language === 'bn' ? "আমাকে জানান" : 
                   "Notify Me"
                 ) : 
                 (language === 'fr' ? "Obtenir Billets" : 
                  language === 'bn' ? "টিকিট পান" : 
                  "Get Tickets")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Tour = () => {
  const { content, language } = useLanguage();
  const { email, isLoading, isSuccess, error, setEmail, submitEmail, handleKeyPress } = useEmailCapture();
  
  // Sort shows: latest to oldest (descending order)
  const sortedShows = [...content.tour.shows].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.year}`);
    const dateB = new Date(`${b.date} ${b.year}`);
    
    // Sort by date in descending order (latest first)
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          {content.tour.heading}
        </h2>
        
        <div className="space-y-4 max-w-4xl mx-auto">
          {sortedShows.map((show, index) => (
            <TourDate key={index} show={show} language={language} />
          ))}
        </div>
        
        {/* Newsletter Signup for Tour Updates */}
        <div className="mt-16 text-center album-card max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-xl mb-4">
            {content.tour.newsletter.heading}
          </h3>
          <p className="text-muted-foreground mb-6">
            {content.tour.newsletter.description}
          </p>
          
          {isSuccess ? (
            <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                {language === 'fr' ? "Merci ! Vous êtes abonné aux mises à jour de tournée." : 
                 language === 'bn' ? "ধন্যবাদ! আপনি ট্যুর আপডেটের জন্য সাবস্ক্রাইব করেছেন।" : 
                 "Thanks! You're subscribed to tour updates."}
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'tour')}
                  placeholder={content.tour.newsletter.placeholder}
                  className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                  }`}
                  disabled={isLoading}
                  aria-label="Email address for tour updates"
                  autoComplete="email"
                />
                {error && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
              <Button 
                className="btn-secondary"
                onClick={() => submitEmail('tour')}
                disabled={isLoading}
              >
                {isLoading ? (
                  language === 'fr' ? 'Abonnement...' : 
                  language === 'bn' ? 'সাবস্ক্রাইব হচ্ছে...' : 
                  'Subscribing...'
                ) : content.tour.newsletter.button}
              </Button>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default Tour;
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import content from "@/data/content.json";
import { useEmailCapture } from "@/hooks/use-email-capture";

const iconMap = {
  Music,
  Instagram,
  Twitter,
  Youtube,
  Mail
};

const Social = () => {
  const { email, isLoading, isSuccess, error, setEmail, submitEmail, handleKeyPress } = useEmailCapture();

  return (
    <section className="py-20 px-4 relative">
      {/* Electric Background Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 opacity-20 rounded-full blur-3xl gradient-glow-bg" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 opacity-15 rounded-full blur-3xl gradient-glow-bg" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          {content.social.heading}
        </h2>
        
        {/* Social Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 justify-items-center max-w-4xl mx-auto">
          {content.social.platforms.map((social, index) => {
            const IconComponent = iconMap[social.icon];
            const isEmail = social.platform === "Email";
            return (
              <a 
                key={index}
                href={social.url}
                className="album-card group text-center hover:scale-105 transition-transform duration-300 w-full max-w-sm"
              >
                <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary electric-glow group-hover:text-secondary transition-colors" />
                
                <h3 className="font-display font-bold text-lg mb-2">
                  {social.platform}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {social.description}
                </p>
                
                <div className="flex items-center justify-center gap-2 text-primary group-hover:text-secondary transition-colors">
                  <span className="text-sm font-medium">
                    {isEmail ? 'Contact' : 'Follow'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
        
        {/* Newsletter Signup */}
        <div className="text-center album-card max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-xl mb-4">
            {content.social.newsletter.heading}
          </h3>
          <p className="text-muted-foreground mb-6">
            {content.social.newsletter.description}
          </p>
          
          {isSuccess ? (
            <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Welcome to the club! Check your email for confirmation.</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'newsletter')}
                  placeholder={content.social.newsletter.placeholder}
                  className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                  }`}
                  disabled={isLoading}
                  aria-label="Email address for newsletter"
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
                className="btn-hero"
                onClick={() => submitEmail('newsletter')}
                disabled={isLoading}
              >
                {isLoading ? 'Joining...' : content.social.newsletter.button}
              </Button>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            {content.social.newsletter.disclaimer}
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default Social;
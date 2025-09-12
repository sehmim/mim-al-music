import { Button } from "@/components/ui/button";
import { 
  Music, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap = {
  Music,
  Instagram,
  Twitter,
  Youtube,
  Mail
};

const Social = () => {
  const { content } = useLanguage();

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
        
        
      </div>
    </section>
  );
};

export default Social;
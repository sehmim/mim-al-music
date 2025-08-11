import { Button } from "@/components/ui/button";
import { 
  Music, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail,
  ExternalLink
} from "lucide-react";

const Social = () => {
  const socialLinks = [
    {
      platform: "Spotify",
      icon: Music,
      url: "#",
      followers: "12K",
      description: "Latest tracks & playlists"
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: "#", 
      followers: "8.5K",
      description: "Behind the scenes"
    },
    {
      platform: "Twitter", 
      icon: Twitter,
      url: "#",
      followers: "5.2K", 
      description: "Real-time updates"
    },
    {
      platform: "YouTube",
      icon: Youtube,
      url: "#",
      followers: "15K",
      description: "Music videos & live sessions"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Electric Background Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-glow opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-glow opacity-15 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          Follow & Subscribe
        </h2>
        
        {/* Social Platforms Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a 
                key={index}
                href={social.url}
                className="album-card group text-center hover:scale-105 transition-transform duration-300"
              >
                <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary electric-glow group-hover:text-secondary transition-colors" />
                
                <h3 className="font-display font-bold text-lg mb-2">
                  {social.platform}
                </h3>
                
                <div className="text-secondary font-bold mb-2">
                  {social.followers} followers
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {social.description}
                </p>
                
                <div className="flex items-center justify-center gap-2 text-primary group-hover:text-secondary transition-colors">
                  <span className="text-sm font-medium">Follow</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
        
        {/* Newsletter Signup */}
        <div className="album-card max-w-3xl mx-auto text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-secondary pink-glow" />
          
          <h3 className="font-display font-bold text-2xl mb-4">
            Join the Club
          </h3>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get exclusive access to new releases, behind-the-scenes content, early ticket access, 
            and special fan-only experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
            />
            <Button className="btn-secondary" size="lg">
              Join Now
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            No spam, just the good stuff. Unsubscribe anytime.
          </p>
        </div>
        
        {/* Streaming Platforms */}
        <div className="mt-16 text-center">
          <h4 className="font-display font-bold text-xl mb-8 text-foreground">
            Stream Everywhere
          </h4>
          
          <div className="flex flex-wrap justify-center gap-4">
            {["Spotify", "Apple Music", "YouTube Music", "SoundCloud", "Bandcamp"].map((platform) => (
              <Button key={platform} variant="outline" className="border-border hover:border-primary/50">
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;
import { Music, Mail, MapPin } from "lucide-react";
import content from "@/data/content.json";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-8 h-8 text-primary electric-glow" />
              <span className="font-display font-bold text-2xl">{content.footer.brand.name}</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              {content.footer.brand.description}
            </p>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{content.footer.brand.location}</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">
              {content.footer.quickLinks.heading}
            </h4>
            <ul className="space-y-3">
              {content.footer.quickLinks.links.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-foreground">
              {content.footer.contact.heading}
            </h4>
            <div className="space-y-3">
              {content.footer.contact.emails.map((email, index) => (
                <a 
                  key={index}
                  href={`mailto:${email.address}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{email.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              {content.footer.legal.copyright}
            </div>
            
            <div className="flex gap-6 text-sm">
              {content.footer.legal.links.map((link, index) => (
                <a key={index} href={link.url} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
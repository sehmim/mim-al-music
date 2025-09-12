import { Music, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { content } = useLanguage();
  
  return (
    <footer className="py-16 px-4 border-t border-border relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Bottom Section */}
        <div className="pt-8 border-border">
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
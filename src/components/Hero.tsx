import { useLanguage } from '@/contexts/LanguageContext';
import { useHighlight } from '@/hooks/use-highlight';

const Hero = () => {
  const { content } = useLanguage();
  const { ref, isHighlighted } = useHighlight<HTMLDivElement>();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background GIF */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://i.imgur.com/EDC4KKj.gif"
          alt="MIM AL background animation"
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
          style={{
            filter: 'blur(2px)',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
          }}
        />
        {/* Additional blur overlay for edges */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 100%)'
          }}
        />
      </div>
      {/* Light glass + gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/10 to-background/30" />
      <div className="absolute inset-0 bg-background/5 backdrop-blur-sm" />
      
      {/* Electric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 opacity-30 rounded-full blur-3xl gradient-glow-bg" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 opacity-20 rounded-full blur-3xl gradient-glow-bg" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        {/* Title with Glass Background Wrapper */}
        <div 
          ref={ref}
          className={`bg-background/30 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-5 highlight-section ${
            isHighlighted ? 'highlighted' : ''
          }`}
        >
          <h1 
            className="text-6xl md:text-[12rem] lg:text-[16rem] xl:text-[16rem] font-display font-black glitch-static leading-none hero-title-enhanced"
            data-text={content.hero.title}
          >
            {content.hero.title}
            <span aria-hidden className="slice">{content.hero.title}</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { useLanguage } from '@/contexts/LanguageContext';
import { useHighlight } from '@/hooks/use-highlight';
import { Music, Instagram, Calendar, Play, Disc, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import mimAlImg from '@/assets/mim-al.jpg';
import chickenImg from '@/assets/chicken-with-head-cut-off.jpeg';

const Hero = () => {
  const { content } = useLanguage();
  const { ref, isHighlighted } = useHighlight<HTMLDivElement>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const latestRelease = content.releases[0];
  const upcomingShows = content.tour.shows.filter(show => show.status === 'New Show');
  const dec3Show = content.tour.shows.find(show => show.date === 'DEC 3' && show.year === '2025');

  const featuredItems = [
    {
      type: 'release',
      title: 'Latest Release',
      subtitle: latestRelease.title,
      image: chickenImg,
      link: latestRelease.streamingUrl,
      icon: Disc,
    },
    {
      type: 'shows',
      title: 'Upcoming Shows',
      subtitle: upcomingShows.length > 0 ? `${upcomingShows[0].date} @ ${upcomingShows[0].venue}` : 'No upcoming shows',
      image: mimAlImg,
      link: upcomingShows[0]?.ticketUrl || '#',
      icon: Calendar,
    },
    {
      type: 'video',
      title: 'Past Show',
      subtitle: dec3Show ? `${dec3Show.date} @ ${dec3Show.venue}` : 'Live Performance',
      videoUrl: dec3Show?.ticketUrl || '',
      icon: Play,
    },
    {
      type: 'artist',
      title: 'About the Artist',
      subtitle: 'MIM AL',
      image: mimAlImg,
      link: '#about',
      icon: Music,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);
  
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
        <div className="flex flex-col items-center gap-6">
          {/* Title Card */}
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

          {/* Linktree-style Links */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <a
              href="https://open.spotify.com/artist/4pRyem81jKHIJd1dhnwZ7T?si=BGu1jhJ8SnecT9Ca2HdvsQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-background/30 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl text-white font-semibold transition-all duration-300 hover:bg-background/50 hover:scale-105"
            >
              <Music className="w-5 h-5" />
              Spotify
            </a>
            <a
              href="https://www.instagram.com/mimthehuman/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-background/30 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl text-white font-semibold transition-all duration-300 hover:bg-background/50 hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
            <a
              href="https://music.youtube.com/channel/UCg4ay-Op0xNcciCRgCo6_cQ?si=uLZgUrAZNyLwwClh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-background/30 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl text-white font-semibold transition-all duration-300 hover:bg-background/50 hover:scale-105"
            >
              <Youtube className="w-5 h-5" />
              YouTube Music
            </a>
          </div>

          {/* Featured Gallery */}
          <div className="w-full max-w-xs mt-2 ">
            <div className="bg-background/30 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                {featuredItems.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.type === 'video' ? item.videoUrl : item.link}
                      target={item.link?.startsWith('#') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 translate-x-0'
                          : index < currentSlide
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                      }`}
                    >
                      {item.type === 'video' ? (
                        <div className="w-full h-full bg-black flex items-center justify-center relative">
                          <img
                            src={`https://img.youtube.com/vi/a3-yqYkVMjc/hqdefault.jpg`}
                            alt={item.subtitle}
                            className="w-full h-full object-cover opacity-70"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full relative">
                          <img
                            src={item.image}
                            alt={item.subtitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
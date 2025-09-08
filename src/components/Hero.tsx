 

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2 md:w-[120%] md:h-[120%] lg:w-full lg:h-full"
          src="https://www.youtube.com/embed/SGq1u1k5SOc?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=SGq1u1k5SOc&iv_load_policy=3&rel=0&playsinline=1&start=14"
          title="Background video"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          frameBorder="0"
        />
      </div>
      {/* Light glass + gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/10 to-background/30" />
      <div className="absolute inset-0 bg-background/5 backdrop-blur-sm" />
      
      {/* Electric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow opacity-20 rounded-full blur-3xl" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        {/* Title with Glass Background Wrapper */}
        <div className="bg-background/30 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-5">
          <h1 
            className="text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[16rem] font-display font-black glitch-static leading-none hero-title-enhanced"
            data-text="MIM AL"
          >
            MIM AL
            <span aria-hidden className="slice">MIM AL</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
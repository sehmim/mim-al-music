import { } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/lovable-uploads/dff4032f-bcbd-49ec-b564-9d592617c871.png)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/40" />
      
      {/* Electric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow opacity-20 rounded-full blur-3xl" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <h1 
          className="text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-display font-black glitch leading-none"
          data-text="MIM AL"
        >
          MIM AL
        </h1>
      </div>
    </section>
  );
};

export default Hero;
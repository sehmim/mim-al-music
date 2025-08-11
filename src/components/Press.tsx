import { Quote } from "lucide-react";

const Press = () => {
  const quotes = [
    {
      text: "Mim Al's sound is a revelation – raw, unfiltered, and absolutely electrifying.",
      author: "Rock & Sound Magazine",
      role: "Music Critics"
    },
    {
      text: "A twist on rock that we never saw coming. Brilliant and chaotic in all the right ways.",
      author: "Underground Music Review",
      role: "Featured Artist"
    },
    {
      text: "The future of rock music is here, and it sounds like nothing you've heard before.",
      author: "Alternative Press",
      role: "Editor's Pick"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center">
          Press & Reviews
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div key={index} className="album-card group text-center">
              <Quote className="w-8 h-8 mx-auto mb-6 text-primary electric-glow" />
              
              <blockquote className="text-lg font-medium text-foreground mb-6 leading-relaxed">
                "{quote.text}"
              </blockquote>
              
              <div className="space-y-1">
                <cite className="font-display font-bold text-primary not-italic">
                  {quote.author}
                </cite>
                <p className="text-sm text-muted-foreground">
                  {quote.role}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            Want to feature Mim Al? Get in touch for press kits and interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:press@mimal.music" 
              className="btn-hero inline-flex items-center justify-center"
            >
              Press Inquiries
            </a>
            <a 
              href="#" 
              className="btn-secondary inline-flex items-center justify-center"
            >
              Download Press Kit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Press;
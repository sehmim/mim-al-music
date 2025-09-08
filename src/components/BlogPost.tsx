import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, ExternalLink, Music, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import albumNotSoSpecial from "@/assets/album-not-so-special.jpg";
import albumDimOutLights from "@/assets/album-dim-out-lights.jpg";
import albumChickenHead from "@/assets/album-chicken-head.jpg";
import content from "@/data/content.json";

const imageMap = {
  "album-not-so-special.jpg": albumNotSoSpecial,
  "album-dim-out-lights.jpg": albumDimOutLights,
  "album-chicken-head.jpg": albumChickenHead
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const release = content.releases.find(r => r.slug === slug);
  
  if (!release) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Release Not Found</h1>
          <Button onClick={() => navigate("/")} className="btn-hero">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Calendar className="w-3 h-3 mr-1" />
                {release.date}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                {release.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {release.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="btn-hero"
                  onClick={() => window.open(release.streamingUrl, '_blank')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Stream Now
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={imageMap[release.image]} 
                alt={release.title}
                className="w-full aspect-square object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              {release.blog.content.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Inspiration Section */}
            <div className="mt-16 p-8 bg-muted/20 rounded-lg">
              <h3 className="text-xl font-display font-bold text-foreground mb-4">
                Lyrics
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {release.blog.inspiration}
              </p>
            </div>
            
            {/* Recording Notes */}
            <div className="mt-8 p-8 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="text-xl font-display font-bold text-foreground mb-4">
                Recording Notes
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {release.blog.recordingNotes}
              </p>
            </div>
            
            {/* Lyrics Section */}
            {release.blog.lyrics && (
              <div className="mt-16">
                <h3 className="text-2xl font-display font-bold text-foreground mb-8">
                  Lyrics
                </h3>
                <div className="bg-background border border-border rounded-lg p-8">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-muted-foreground leading-relaxed">
                    {release.blog.lyrics}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-t from-muted/20 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Ready to Experience the Music?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stream "{release.title}" on all major platforms and dive into the full sonic experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-hero" 
              size="lg"
              onClick={() => window.open(release.streamingUrl, '_blank')}
            >
              <Play className="w-5 h-5 mr-2" />
              Stream on Spotify
            </Button>
            <Button 
              variant="outline" 
              className="border-border hover:border-primary/50" 
              size="lg"
              onClick={() => navigate("/")}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              More Releases
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
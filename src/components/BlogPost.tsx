import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, ExternalLink, Music, Calendar, Smartphone, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import notSoSpecial from "@/assets/not-so-special.jpg";
import dimOutLights from "@/assets/dim-out-the-lights.jpg";
import chickenHead from "@/assets/chicken-with-head-cut-off.jpeg";
import bleezeImage from "@/assets/bleeze.jpg";
import noceboImage from "@/assets/nocebo.jpg";
import suddenConfusionImage from "@/assets/sudden-confusion.jpg";
import contrastInMayImage from "@/assets/contrast-in-may.jpg";
import ideaImage from "@/assets/idea.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const imageMap = {
  "not-so-special.jpg": notSoSpecial,
  "dim-out-the-lights.jpg": dimOutLights,
  "chicken-with-head-cut-off.jpeg": chickenHead,
  "bleeze.jpg": bleezeImage,
  "nocebo.jpg": noceboImage,
  "sudden-confusion.jpg": suddenConfusionImage,
  "contrast-in-may.jpg": contrastInMayImage,
  "idea.jpg": ideaImage
};

const BlogPost = () => {
  const { content } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const release = content.releases.find(r => r.slug === slug);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
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
          
          <div className="text-center max-w-3xl mx-auto">
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
            
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <Button 
                className="btn-hero flex-shrink-0"
                onClick={() => window.open(release.streamingUrl, '_blank')}
              >
                <Play className="w-4 h-4 mr-2" />
                Spotify
              </Button>
              {release.appleMusicUrl && (
                <Button 
                  variant="outline" 
                  className="border-border hover:border-primary/50 flex-shrink-0" 
                  onClick={() => window.open(release.appleMusicUrl, '_blank')}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Apple Music
                </Button>
              )}
              {release.youtubeMusicUrl && (
                <Button 
                  variant="outline" 
                  className="border-border hover:border-primary/50 flex-shrink-0" 
                  onClick={() => window.open(release.youtubeMusicUrl, '_blank')}
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube Music
                </Button>
              )}
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
                <div 
                  key={index} 
                  className="text-muted-foreground leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
            
            {/* Assets Gallery */}
            {release.blog.assets && release.blog.assets.length > 0 && (
              <div className="mt-16">
                <div className="grid md:grid-cols-2 gap-6">
                  {release.blog.assets.map((asset, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                      {asset.type === 'image' && (
                        <div>
                          <img 
                            src={imageMap[asset.url] || `/assets/${asset.url}`}
                            alt={asset.alt || asset.caption}
                            className="w-full h-64 object-cover"
                          />
                          <div className="p-4">
                            <p className="text-sm text-muted-foreground">{asset.caption}</p>
                          </div>
                        </div>
                      )}
                      
                      {asset.type === 'audio' && (
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Music className="w-5 h-5 text-primary" />
                            <span className="font-medium text-foreground">Audio Preview</span>
                            {asset.duration && (
                              <Badge variant="secondary">{asset.duration}</Badge>
                            )}
                          </div>
                          <audio controls className="w-full mb-3">
                            <source src={`/assets/${asset.url}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <p className="text-sm text-muted-foreground">{asset.caption}</p>
                        </div>
                      )}
                      
                      {asset.type === 'video' && (
                        <div>
                          <video 
                            controls 
                            className="w-full h-64 object-cover"
                            poster={`/assets/${asset.url.replace('.mp4', '-thumb.jpg')}`}
                          >
                            <source src={`/assets/${asset.url}`} type="video/mp4" />
                            Your browser does not support the video element.
                          </video>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-foreground">Video</span>
                              {asset.duration && (
                                <Badge variant="secondary">{asset.duration}</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{asset.caption}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recording Notes */}
            <div className="mt-8 p-8 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="text-xl font-display font-bold text-foreground mb-4">
                Recording Notes
              </h3>
              <div 
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: release.blog.recordingNotes }}
              />
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
            {release.appleMusicUrl && (
              <Button 
                variant="outline" 
                className="border-border hover:border-primary/50" 
                size="lg"
                onClick={() => window.open(release.appleMusicUrl, '_blank')}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Apple Music
              </Button>
            )}
            {release.youtubeMusicUrl && (
              <Button 
                variant="outline" 
                className="border-border hover:border-primary/50" 
                size="lg"
                onClick={() => window.open(release.youtubeMusicUrl, '_blank')}
              >
                <Youtube className="w-5 h-5 mr-2" />
                YouTube Music
              </Button>
            )}
            <Button 
              variant="outline" 
              className="border-border hover:border-primary/50" 
              size="lg"
              onClick={() => {
                navigate("/");
                // Small delay to ensure navigation completes, then trigger show all
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('showAllReleases'));
                }, 100);
              }}
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
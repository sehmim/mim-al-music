import { useLanguage } from "@/contexts/LanguageContext";
import { useHighlight } from "@/hooks/use-highlight";
import projectsData from "@/data/projects.json";

// Import project images
import sumAndSubstanceImg from "@/assets/sum-and-substance.jpg";
import sirLouieBandImg from "@/assets/sir-louie-band.png";
import spectralLightsImg from "@/assets/spectral-lights.jpg";
import mimthehumanImg from "@/assets/mimthehuman-placeholder.jpg";

// Create image mapping
const projectImages: { [key: string]: string } = {
  "sum-and-substance.jpg": sumAndSubstanceImg,
  "sir-louie-band.png": sirLouieBandImg,
  "spectral-lights.jpg": spectralLightsImg,
  "mimthehuman-placeholder.jpg": mimthehumanImg,
};

const OtherProjects = () => {
  const { content } = useLanguage();
  const { ref, isHighlighted } = useHighlight<HTMLDivElement>();

  return (
    <section className="py-20 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading text-center mb-12">
          {content.otherProjects?.heading || "Other Projects"}
        </h2>
        
        <div 
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 highlight-section ${
            isHighlighted ? 'highlighted' : ''
          }`}
        >
          {projectsData.projects.map((project, index) => (
            <div
              key={index}
              className="album-card group text-center hover:scale-105 transition-all duration-300"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={projectImages[project.projectImg] || project.projectImg}
                  alt={`${project.projectName} project image`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-xl font-display font-bold mb-2 text-primary group-hover:text-secondary transition-colors">
                {project.projectName}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-block text-sm px-4 py-2"
              >
                {content.otherProjects?.visitButton || "Visit Project"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProjects;

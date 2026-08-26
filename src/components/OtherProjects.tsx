import { useLanguage } from "@/contexts/LanguageContext";
import projectsData from "@/data/projects.json";

import sumAndSubstanceImg from "@/assets/sum-and-substance.jpg";
import sirLouieBandImg from "@/assets/sir-louie-band.png";
import spectralLightsImg from "@/assets/spectral-lights.jpg";
import mimthehumanImg from "@/assets/mimthehuman-placeholder.jpg";

const projectImages: Record<string, string> = {
  "sum-and-substance.jpg": sumAndSubstanceImg,
  "sir-louie-band.png": sirLouieBandImg,
  "spectral-lights.jpg": spectralLightsImg,
  "mimthehuman-placeholder.jpg": mimthehumanImg,
};

const OtherProjects = () => {
  const { content } = useLanguage();

  return (
    <section id="projects" className="section-rule px-5 py-11">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="section-heading mb-4">
          {content.otherProjects?.heading || "Other Projects"}
        </h2>

        <div
          className="grid gap-2.5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))" }}
        >
          {projectsData.projects.map((project) => (
            <a
              key={project.projectName}
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-foreground/[0.14] p-2.5 transition-colors hover:border-foreground/40"
            >
              <img
                src={projectImages[project.projectImg] || project.projectImg}
                alt={project.projectName}
                loading="lazy"
                className="block h-[68px] w-[68px] shrink-0 object-cover"
              />
              <div className="flex min-w-0 flex-col gap-[3px]">
                <span className="font-display text-[13px] uppercase">{project.projectName}</span>
                <span className="text-xs leading-[1.4] text-foreground/50">
                  {project.description}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProjects;

import ProjectCard, { ProjectProps } from '@/components/cards/ProjectCard';
import {
  featuredProjects as defaultFeaturedProjects,
  otherProjects as defaultOtherProjects,
} from '@/data';
import OtherProjectsDisclosure from '@/components/containers/OtherProjectsDisclosure';
import CardGrid from '@/components/containers/CardGrid';
import ProjectsSkipLink from '@/components/containers/ProjectsSkipLink';

interface ProjectsSectionProps {
  featuredProjects?: ProjectProps[];
  otherProjects?: ProjectProps[];
}

export default function ProjectsSection({
  featuredProjects = defaultFeaturedProjects,
  otherProjects = defaultOtherProjects,
}: ProjectsSectionProps) {
  const otherCount = otherProjects.length;

  return (
    <>
      <ProjectsSkipLink />
      <p id="projects-description" className="absolute left-[-9999px]" aria-hidden="true">
        Projects section
      </p>
      <div className="flex flex-col gap-8 md:gap-10">
        <CardGrid
          id="projects-grid"
          ariaLabel="Selected projects"
          ariaDescribedBy="projects-description"
          cellCount={featuredProjects.length}
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </CardGrid>

        {/*otherCount > 0 && (
          <OtherProjectsDisclosure count={otherCount}>
            {otherProjects.map((project) => (
              <div key={project.title}>
                <ProjectCard {...project} />
              </div>
            ))}
          </OtherProjectsDisclosure>
        )*/}
      </div>
    </>
  );
}

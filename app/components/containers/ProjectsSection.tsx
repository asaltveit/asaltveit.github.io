import ProjectCard, { ProjectProps } from '@/components/cards/ProjectCard';
import { featuredProjects as defaultFeaturedProjects } from '@/data';
import CardGrid from '@/components/containers/CardGrid';
import ProjectsSkipLink from '@/components/containers/ProjectsSkipLink';

interface ProjectsSectionProps {
  featuredProjects?: ProjectProps[];
}

export default function ProjectsSection({
  featuredProjects = defaultFeaturedProjects,
}: ProjectsSectionProps) {
  return (
    <>
      <ProjectsSkipLink />
      <p id="projects-description" className="sr-only">
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
      </div>
    </>
  );
}

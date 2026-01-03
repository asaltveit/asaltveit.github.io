import ProjectCard, { ProjectProps } from '@/components/cards/ProjectCard';

interface ProjectContainerProps {
    projects: ProjectProps[];
}

export default function ProjectsContainer({ projects = [] }: ProjectContainerProps) {
    return (
        <>
            <h2 className="sr-only">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map(({ title, dates, items, link, techStack = [], image, imageTitle }) => (
                    <ProjectCard
                        key={title}
                        title={title}
                        dates={dates}
                        items={items}
                        link={link}
                        techStack={techStack}
                        image={image}
                        imageTitle={imageTitle || `${title} screenshot`}
                    />
                ))}
            </div>
        </>
    );
}

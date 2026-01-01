import ProjectCard from '@/components/cards/ProjectCard';

interface ProjectProps {
    title: string;
    dates: string;
    items: string[];
    link: string;
    techStack?: string[];
    image?: string;
    imageTitle?: string;
}

interface ProjectContainerProps {
    projects: ProjectProps[];
}

export default function ProjectsContainer({ projects = [] }: ProjectContainerProps) {
    return (
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
    );
}

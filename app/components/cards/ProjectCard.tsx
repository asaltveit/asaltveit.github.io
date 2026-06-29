import { StaticImageData } from 'next/image';
import BaseCard from '@/components/cards/BaseCard';
import ProjectCardImage from '@/components/cards/ProjectCardImage';
import TechStackIcons from '@/components/cards/TechStackIcons';

export interface ProjectProps {
  title: string;
  dates: string;
  items: string[];
  link: string;
  image?: StaticImageData | string;
  imageTitle?: string;
  techStack?: string[];
}

export default function ProjectCard({
  title,
  dates,
  items,
  link,
  image,
  imageTitle,
  techStack = [],
}: ProjectProps) {
  return (
    <BaseCard
      title={title}
      dates={dates}
      items={items}
      link={link}
      footerContent={<TechStackIcons techStack={techStack} />}
    >
      <ProjectCardImage title={title} link={link} image={image} imageTitle={imageTitle} />
    </BaseCard>
  );
}

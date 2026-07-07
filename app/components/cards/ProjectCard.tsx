import { StaticImageData } from 'next/image';
import BaseCard from '@/components/cards/BaseCard';
import CardImage from '@/components/cards/CardImage';
import TechStackIcons from '@/components/cards/TechStackIcons';

export interface ProjectProps {
  title: string;
  dates: string;
  items: string[];
  link: string;
  image?: StaticImageData | string;
  imageTitle?: string;
  techStack?: string[];
  priority?: boolean;
}

export default function ProjectCard({
  title,
  dates,
  items,
  link,
  image,
  imageTitle,
  techStack = [],
  priority = false,
}: ProjectProps) {
  return (
    <BaseCard
      title={title}
      dates={dates}
      items={items}
      link={link}
      footerContent={<TechStackIcons techStack={techStack} />}
    >
      <CardImage title={title} link={link} image={image} imageTitle={imageTitle} variant="project" priority={priority} />
    </BaseCard>
  );
}

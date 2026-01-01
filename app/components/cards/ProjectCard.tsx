import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import BaseCard from '@/components/cards/BaseCard';
import TechStackIcons from '@/components/cards/TechStackIcons';
import { Code2 } from 'lucide-react';

interface ProjectCardProps {
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
  imageTitle = "project image",
  techStack = []
}: ProjectCardProps) {
  const imageContent = image ? (
    <Link 
      href={link} 
      aria-label={`image link to ${title}`}
      className="block w-full h-full hover:opacity-90 transition-opacity"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={image}
        alt={`${imageTitle} screenshot`}
        width={800}
        height={450}
        className="w-full h-full object-cover"
      />
    </Link>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
      <Code2 className="w-16 h-16 text-indigo-600 dark:text-indigo-300 opacity-50" />
    </div>
  );

  return (
    <BaseCard
      title={title}
      dates={dates}
      items={items}
      link={link}
      footerContent={<TechStackIcons techStack={techStack} />}
    >
      {imageContent}
    </BaseCard>
  );
}


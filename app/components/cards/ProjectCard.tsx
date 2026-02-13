'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import BaseCard from '@/components/cards/BaseCard';
import TechStackIcons from '@/components/cards/TechStackIcons';
import { Code2 } from 'lucide-react';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

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
  techStack = []
}: ProjectProps) {
  const defaultImageTitle = imageTitle || title;
  const imageContent = image ? (
    <Link 
      href={link} 
      aria-label={`image for ${title}`}
      className="block w-full h-full relative group focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-t-lg"
      target="_blank"
      rel="noopener noreferrer"
      onKeyDown={handleSpacebarKeyDown}
    >
      <div className="w-full h-full overflow-hidden rounded-t-lg relative z-0">
        <Image
          src={image}
          alt={`${defaultImageTitle} screenshot`}
          width={800}
          height={450}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus:scale-110"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-indigo-400 opacity-0 group-hover:opacity-40 group-focus:opacity-40 transition-opacity duration-300 rounded-t-lg pointer-events-none" />
      <div className="absolute inset-0 z-10 border-4 border-indigo-400 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-t-lg pointer-events-none" />
    </Link>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800">
      <Code2 className="w-16 h-16 text-indigo-300 opacity-50" />
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


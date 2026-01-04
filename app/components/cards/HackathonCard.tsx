'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import BaseCard from '@/components/cards/BaseCard';
import TechStackIcons from '@/components/cards/TechStackIcons';
import { Trophy, Users, Clock } from 'lucide-react';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

export interface HackathonProps {
  title: string;
  dates: string;
  items: string[];
  link?: string;
  image?: StaticImageData | string;
  imageTitle?: string;
  techStack?: string[];
  award?: string;
  teamSize?: number;
  duration?: string;
}

export default function HackathonCard({ 
  title, 
  dates, 
  items, 
  link, 
  image,
  imageTitle,
  techStack = [],
  award,
  teamSize,
  duration
}: HackathonProps) {
  const defaultImageTitle = imageTitle || title;
  const imageContent = image ? (
    link ? (
      <Link 
        href={link} 
        aria-label={`image for ${title}`}
        className="block w-full h-full relative group"
        target="_blank"
        rel="noopener noreferrer"
        onKeyDown={handleSpacebarKeyDown}
      >
        <Image
          src={image}
          alt={`${defaultImageTitle} screenshot`}
          width={800}
          height={450}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-400 opacity-0 group-hover:opacity-20 group-focus:opacity-20 transition-opacity duration-300" />
      </Link>
    ) : (
      <Image
        src={image}
        alt={`${defaultImageTitle} screenshot`}
        width={800}
        height={450}
        className="w-full h-full object-cover"
      />
    )
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 dark:from-yellow-800 dark:via-orange-800 dark:to-red-800">
      <Trophy className="w-16 h-16 text-yellow-600 dark:text-yellow-300 opacity-50" />
    </div>
  );

  const metadataItems = [];
  if (duration) {
    metadataItems.push(
      <div key="duration" className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>
    );
  }
  if (teamSize) {
    metadataItems.push(
      <div key="team" className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
        <Users className="w-4 h-4" />
        <span>{teamSize} {teamSize === 1 ? 'person' : 'people'}</span>
      </div>
    );
  }

  const footerContent = (
    <div className="space-y-3">
      {(award || metadataItems.length > 0) && (
        <div className="flex flex-wrap items-center gap-3">
          {award && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-md text-yellow-800 dark:text-yellow-300 text-sm font-semibold">
              <Trophy className="w-4 h-4" />
              <span>{award}</span>
            </div>
          )}
          {metadataItems}
        </div>
      )}
      {techStack.length > 0 && <TechStackIcons techStack={techStack} />}
    </div>
  );

  return (
    <BaseCard
      title={title}
      dates={dates}
      items={items}
      link={link}
      footerContent={footerContent}
    >
      {imageContent}
    </BaseCard>
  );
}


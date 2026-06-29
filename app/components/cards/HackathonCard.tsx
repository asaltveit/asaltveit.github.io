import { StaticImageData } from 'next/image';
import { Trophy, Users, Clock } from 'lucide-react';
import BaseCard from '@/components/cards/BaseCard';
import CardImage from '@/components/cards/CardImage';
import TechStackIcons from '@/components/cards/TechStackIcons';

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
  duration,
}: HackathonProps) {
  const metadataItems = [];
  if (duration) {
    metadataItems.push(
      <div key="duration" className="flex items-center gap-1.5 text-sm text-text-secondary">
        <Clock className="w-4 h-4" aria-hidden />
        <span>{duration}</span>
      </div>
    );
  }
  if (teamSize) {
    metadataItems.push(
      <div key="team" className="flex items-center gap-1.5 text-sm text-text-secondary">
        <Users className="w-4 h-4" aria-hidden />
        <span>
          {teamSize} {teamSize === 1 ? 'person' : 'people'}
        </span>
      </div>
    );
  }

  const footerContent = (
    <div className="space-y-3">
      {(award || metadataItems.length > 0) && (
        <div className="flex flex-wrap items-center gap-3">
          {award && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/15 rounded-md text-success text-sm font-semibold">
              <Trophy className="w-4 h-4" aria-hidden />
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
      noLinkNote={!link ? 'No project link available' : undefined}
      footerContent={footerContent}
    >
      <CardImage title={title} link={link} image={image} imageTitle={imageTitle} variant="hackathon" />
    </BaseCard>
  );
}

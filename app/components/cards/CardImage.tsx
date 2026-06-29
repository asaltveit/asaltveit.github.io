'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Code2, Trophy, LucideIcon } from 'lucide-react';
import { CardImageExternalLinkIndicator } from '@/components/cards/externalLinkIndicators';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

const CARD_IMAGE_SIZES = '(min-width: 768px) 50vw, 100vw';

type CardImageVariant = 'project' | 'hackathon';

const PLACEHOLDER_CONFIG: Record<
  CardImageVariant,
  { bgClass: string; Icon: LucideIcon }
> = {
  project: { bgClass: 'bg-accent', Icon: Code2 },
  hackathon: { bgClass: 'bg-success', Icon: Trophy },
};

interface CardImageProps {
  title: string;
  link?: string;
  image?: StaticImageData | string;
  imageTitle?: string;
  variant?: CardImageVariant;
}

export default function CardImage({
  title,
  link,
  image,
  imageTitle,
  variant = 'project',
}: CardImageProps) {
  const defaultImageTitle = imageTitle || title;
  const { bgClass, Icon } = PLACEHOLDER_CONFIG[variant];

  if (!image) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${bgClass}`}>
        <Icon className="w-16 h-16 text-surface opacity-70" aria-hidden />
      </div>
    );
  }

  const imageElement = (
    <Image
      src={image}
      alt={link ? '' : `${defaultImageTitle} screenshot`}
      width={800}
      height={450}
      sizes={CARD_IMAGE_SIZES}
      className="w-full h-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110 group-focus:scale-110 motion-reduce:group-hover:scale-100 motion-reduce:group-focus:scale-100"
    />
  );

  if (link) {
    return (
      <Link
        href={link}
        aria-label={`View ${title} (opens in new tab)`}
        className="block w-full h-full relative group focus:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-t-lg"
        target="_blank"
        rel="noopener noreferrer"
        onKeyDown={handleSpacebarKeyDown}
      >
        <div className="w-full h-full overflow-hidden rounded-t-lg relative z-0">
          {imageElement}
        </div>
        <div className="absolute inset-0 z-10 bg-accent opacity-0 group-hover:opacity-40 group-focus:opacity-40 transition-opacity duration-300 motion-reduce:transition-none rounded-t-lg pointer-events-none" />
        <div className="absolute inset-0 z-10 border-4 border-accent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 motion-reduce:transition-none rounded-t-lg pointer-events-none" />
        <CardImageExternalLinkIndicator />
      </Link>
    );
  }

  return imageElement;
}

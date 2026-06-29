'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { CardImageExternalLinkIndicator } from '@/components/cards/externalLinkIndicators';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

const CARD_IMAGE_SIZES = '(min-width: 768px) 50vw, 100vw';

interface ProjectCardImageProps {
  title: string;
  link: string;
  image?: StaticImageData | string;
  imageTitle?: string;
}

export default function ProjectCardImage({
  title,
  link,
  image,
  imageTitle,
}: ProjectCardImageProps) {
  const defaultImageTitle = imageTitle || title;

  if (!image) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-accent">
        <Code2 className="w-16 h-16 text-surface opacity-70" />
      </div>
    );
  }

  return (
    <Link
      href={link}
      aria-label={`View ${title} (opens in new tab)`}
      className="block w-full h-full relative group focus:outline-none focus:ring-4 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface rounded-t-lg"
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
          sizes={CARD_IMAGE_SIZES}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus:scale-110"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-accent opacity-0 group-hover:opacity-40 group-focus:opacity-40 transition-opacity duration-300 rounded-t-lg pointer-events-none" />
      <div className="absolute inset-0 z-10 border-4 border-accent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-t-lg pointer-events-none" />
      <CardImageExternalLinkIndicator />
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { TEXT_LINK_EXTERNAL_ICON_CLASS } from '@/components/cards/externalLinkIndicators';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

interface CardTitleLinkProps {
  title: string;
  link: string;
}

export default function CardTitleLink({ title, link }: CardTitleLinkProps) {
  return (
    <Link
      href={link}
      aria-label={`link to ${title} (opens in new tab)`}
      className="group inline-flex items-center gap-2 text-text-primary text-xl md:text-2xl font-bold hover:text-accent transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      onKeyDown={handleSpacebarKeyDown}
    >
      {title}
      <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
    </Link>
  );
}

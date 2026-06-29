'use client';

import Link from 'next/link';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

interface ExperienceLocationLinkProps {
  href: string;
  title: string;
  linkName?: string;
}

export default function ExperienceLocationLink({
  href,
  title,
  linkName,
}: ExperienceLocationLinkProps) {
  return (
    <Link
      href={href}
      aria-label={`link to ${title}`}
      className="md:hover:underline md:hover:underline-offset-5 md:no-underline underline underline-offset-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all"
      target="_blank"
      rel="noopener noreferrer"
      onKeyDown={handleSpacebarKeyDown}
    >
      {linkName || href}
    </Link>
  );
}

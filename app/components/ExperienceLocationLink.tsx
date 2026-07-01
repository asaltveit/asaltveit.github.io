'use client';

import Link from 'next/link';
import { handleSpacebarKeyDown } from '@/utils/keyboard';
import { TEXT_LINK_INTERACTIVE_CLASS } from '@/components/linkStyles';

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
      className={`underline underline-offset-4 md:no-underline ${TEXT_LINK_INTERACTIVE_CLASS}`}
      target="_blank"
      rel="noopener noreferrer"
      onKeyDown={handleSpacebarKeyDown}
    >
      {linkName || href}
    </Link>
  );
}

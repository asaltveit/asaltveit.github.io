'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { TEXT_LINK_EXTERNAL_ICON_CLASS } from '@/components/cards/externalLinkIndicators';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

const linkClassName =
  'group flex items-center text-accent gap-2 underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4';

export default function HeroSocialLinks() {
  return (
    <div className="flex gap-4">
      <Link
        className={linkClassName}
        href="https://www.linkedin.com/in/anna-saltveit-4a70b2184/"
        aria-label="link to LinkedIn (opens in new tab)"
        target="_blank"
        rel="noopener noreferrer"
        onKeyDown={handleSpacebarKeyDown}
      >
        LinkedIn
        <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
      </Link>
      <Link
        className={linkClassName}
        href="https://github.com/asaltveit"
        aria-label="link to Github (opens in new tab)"
        target="_blank"
        rel="noopener noreferrer"
        onKeyDown={handleSpacebarKeyDown}
      >
        Github
        <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
      </Link>
    </div>
  );
}

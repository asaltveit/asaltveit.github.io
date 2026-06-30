'use client';

import { ExternalLink } from 'lucide-react';
import { handleSpacebarKeyDown } from '@/utils/keyboard';
import { scrollIntoViewWithMotion } from '@/utils/scroll';
import { focusSectionHeading } from '@/utils/focusSection';
import { NAV_LINK_CLASS } from '@/components/linkStyles';
import { TEXT_LINK_EXTERNAL_ICON_CLASS } from '@/components/cards/externalLinkIndicators';

function DotSeparator() {
  return (
    <span className="text-text-secondary select-none px-1" aria-hidden>
      ·
    </span>
  );
}

export default function CompactNavBar() {
  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      scrollIntoViewWithMotion(mainContent, { block: 'start' });
    }
  };

  const handleAnnaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const about = document.getElementById('about');
    if (about) {
      scrollIntoViewWithMotion(about, { block: 'start' });
      focusSectionHeading('about');
    }
  };

  const handleSectionClick = (sectionId: string) => {
    requestAnimationFrame(() => focusSectionHeading(sectionId));
  };

  return (
    <nav
      aria-label="main navigation"
      role="navigation"
      className="compact-nav-bar h-12 bg-surface/80 backdrop-blur-md border-b border-border"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-2 focus:bg-accent focus:text-surface"
        aria-label="skip to main content"
        onClick={handleSkipClick}
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-full max-w-[68.75rem] items-center justify-center px-4 text-sm font-medium md:px-10">
        <a
          href="#about"
          aria-label="link to About section"
          className={NAV_LINK_CLASS}
          onClick={handleAnnaClick}
          onKeyDown={handleSpacebarKeyDown}
        >
          Anna
        </a>
        <DotSeparator />
        <a
          href="#projects"
          aria-label="link to Projects section"
          className={NAV_LINK_CLASS}
          onKeyDown={handleSpacebarKeyDown}
          onClick={() => handleSectionClick('projects')}
        >
          Projects
        </a>
        <DotSeparator />
        <a
          href="https://github.com/asaltveit"
          aria-label="link to Github (opens in new tab)"
          className={`group inline-flex items-center gap-1 ${NAV_LINK_CLASS}`}
          target="_blank"
          rel="noopener noreferrer"
          onKeyDown={handleSpacebarKeyDown}
        >
          Github
          <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
        </a>
      </div>
    </nav>
  );
}

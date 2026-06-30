'use client';

import { useEffect, useState } from 'react';
import { handleSpacebarKeyDown } from '@/utils/keyboard';
import { scrollIntoViewWithMotion } from '@/utils/scroll';
import { beginAutoScroll } from '@/utils/autoScrollLock';
import { focusSectionHeading } from '@/utils/focusSection';
import { NAV_LINK_CLASS } from '@/components/linkStyles';

interface NavLink {
  title: string;
  id: string;
}

interface CompactNavBarProps {
  links: NavLink[];
}

function getInitialActiveSectionId(links: NavLink[]): string {
  return links.length > 0 ? links[0].id : '';
}

export default function CompactNavBar({ links }: CompactNavBarProps) {
  const [activeSectionId, setActiveSectionId] = useState(() =>
    getInitialActiveSectionId(links)
  );

  useEffect(() => {
    const fromHash = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const sectionId = window.location.hash.slice(1);
        setActiveSectionId(sectionId);
        requestAnimationFrame(() => focusSectionHeading(sectionId));
      } else {
        setActiveSectionId(getInitialActiveSectionId(links));
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [links]);

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      scrollIntoViewWithMotion(mainContent, { block: 'start' });
    }
  };

  const handleSectionClick = (sectionId: string) => {
    beginAutoScroll();
    requestAnimationFrame(() => focusSectionHeading(sectionId));
  };

  return (
    <nav
      aria-label="main navigation"
      role="navigation"
      className="compact-nav-bar min-h-12 bg-surface/80 backdrop-blur-md border-b border-border"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-2 focus:bg-accent focus:text-surface"
        aria-label="skip to main content"
        onClick={handleSkipClick}
      >
        Skip to main content
      </a>
      <div className="mx-auto flex min-h-12 max-w-[68.75rem] flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-sm font-medium md:px-10">
        {links.map((link) => {
          const isActive = link.id === activeSectionId;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-label={`link to ${link.title} section`}
              aria-current={isActive ? 'page' : undefined}
              className={NAV_LINK_CLASS}
              onKeyDown={handleSpacebarKeyDown}
              onClick={() => handleSectionClick(link.id)}
            >
              {link.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

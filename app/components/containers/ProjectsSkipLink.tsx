'use client';

import { MouseEvent } from 'react';
import { scrollIntoViewWithMotion } from '@/utils/scroll';

export default function ProjectsSkipLink() {
  const handleSkipClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hackathonsGrid = document.getElementById('hackathons-grid');
    if (hackathonsGrid) {
      scrollIntoViewWithMotion(hackathonsGrid, { block: 'start' });
      const firstFocusable = hackathonsGrid.querySelector<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  };

  return (
    <a
      href="#hackathons-grid"
      aria-label="Skip to hackathons content"
      className="absolute left-[-9999px] focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-surface focus:rounded"
      onClick={handleSkipClick}
    >
      Skip to hackathons content
    </a>
  );
}

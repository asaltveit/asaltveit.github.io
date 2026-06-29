'use client';

import { useEffect, useRef, useState } from 'react';
import NavBar from '@/components/NavBar';
import CompactNavBar from '@/components/CompactNavBar';
import { useNavScrollState } from '@/utils/useNavScrollState';
import { prefersReducedMotion } from '@/utils/scroll';

interface NavLink {
  title: string;
  id: string;
}

interface ScrollAwareHeaderProps {
  links: NavLink[];
}

export default function ScrollAwareHeader({ links }: ScrollAwareHeaderProps) {
  const { variant } = useNavScrollState();
  const headerRef = useRef<HTMLElement>(null);
  const [fullNavHeight, setFullNavHeight] = useState(0);
  const isVisible = variant !== 'hidden';
  const reduceMotion = prefersReducedMotion();

  useEffect(() => {
    const header = headerRef.current;
    if (!header || variant !== 'full') return;

    const updateHeight = () => {
      setFullNavHeight(header.offsetHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [variant]);

  return (
    <>
      <header
        ref={headerRef}
        className={[
          'fixed top-0 inset-x-0 z-50 text-text-primary',
          reduceMotion ? '' : 'transition-transform duration-300 ease-in-out',
          isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!isVisible}
        inert={!isVisible}
      >
        {variant === 'compact' ? <CompactNavBar /> : <NavBar links={links} />}
      </header>
      <div
        aria-hidden
        className={reduceMotion ? '' : 'transition-[height] duration-300 ease-in-out'}
        style={{ height: variant === 'full' ? fullNavHeight : 0 }}
      />
    </>
  );
}

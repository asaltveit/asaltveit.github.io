'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import NavBar from '@/components/NavBar';
import CompactNavBar from '@/components/CompactNavBar';
import { useNavScrollState } from '@/utils/useNavScrollState';

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
  const [animateSpacer, setAnimateSpacer] = useState(false);
  const isVisible = variant !== 'hidden';

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header || variant !== 'full') {
      return;
    }

    const updateHeight = () => {
      setFullNavHeight(header.offsetHeight);
      setAnimateSpacer(true);
    };

    if (typeof ResizeObserver === 'undefined') {
      requestAnimationFrame(updateHeight);
      return;
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [variant]);

  const spacerHeight =
    variant === 'full'
      ? fullNavHeight > 0
        ? fullNavHeight
        : 'var(--full-nav-height)'
      : 0;

  return (
    <>
      <header
        ref={headerRef}
        className={[
          'fixed top-0 inset-x-0 z-50 text-text-primary',
          'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out',
          isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!isVisible}
        inert={!isVisible}
      >
        {variant === 'compact' ? <CompactNavBar links={links} /> : <NavBar links={links} />}
      </header>
      <div
        aria-hidden
        className={
          animateSpacer
            ? 'motion-safe:transition-[height] motion-safe:duration-300 motion-safe:ease-in-out'
            : undefined
        }
        style={{ height: spacerHeight }}
      />
    </>
  );
}

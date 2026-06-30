import { useEffect, useRef, useState } from 'react';
import { endAutoScroll, isAutoScrollActive, touchAutoScroll } from '@/utils/autoScrollLock';

export type NavScrollVariant = 'full' | 'compact' | 'hidden';

export const TOP_THRESHOLD = 10;

export function useNavScrollState(): { variant: NavScrollVariant } {
  const [variant, setVariant] = useState<NavScrollVariant>('full');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      const currentScrollY = window.scrollY;

      if (isAutoScrollActive()) {
        touchAutoScroll();
      }

      if (currentScrollY <= TOP_THRESHOLD) {
        endAutoScroll();
        setVariant('full');
      } else if (currentScrollY < lastScrollY.current) {
        setVariant(isAutoScrollActive() ? 'hidden' : 'compact');
      } else if (currentScrollY > lastScrollY.current) {
        setVariant('hidden');
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { variant };
}

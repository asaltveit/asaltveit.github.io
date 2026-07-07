"use client"

import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { scrollToTopWithMotion } from '@/utils/scroll';
import { TOP_THRESHOLD, useNavScrollState } from '@/utils/useNavScrollState';

const EXIT_MS = 300;

export default function BackToTopButton() {
  const { variant } = useNavScrollState();
  const [isPastTop, setIsPastTop] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [prevShouldShow, setPrevShouldShow] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldShow = isPastTop && variant !== 'compact';

  if (shouldShow !== prevShouldShow) {
    setPrevShouldShow(shouldShow);
    if (shouldShow) {
      setIsExiting(false);
    } else {
      setIsExiting(true);
    }
  }

  const isRendered = shouldShow || isExiting;
  const showExitingStyles = isExiting && !shouldShow;

  useEffect(() => {
    const update = () => {
      setIsPastTop(window.scrollY > TOP_THRESHOLD);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (shouldShow && exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, [shouldShow]);

  useEffect(() => {
    if (!isExiting || shouldShow) return;

    exitTimerRef.current = setTimeout(() => {
      setIsExiting(false);
      exitTimerRef.current = null;
    }, EXIT_MS);

    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [isExiting, shouldShow]);

  const scrollToTop = () => {
    scrollToTopWithMotion();
  };

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {shouldShow && <span>Back to top button available</span>}
      </div>
      {isRendered && (
        <button
          onClick={scrollToTop}
          className={[
            'fixed bottom-8 right-8 bg-accent hover:ring-4 hover:bg-accent-hover text-surface p-4 rounded-full shadow-2xl',
            'transition-all duration-300 motion-reduce:transition-none',
            'hover:scale-110 motion-reduce:hover:scale-100 hover:shadow-accent/50',
            'focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-hover z-50',
            showExitingStyles
              ? 'pointer-events-none opacity-0 translate-y-2 scale-95 motion-reduce:translate-y-0 motion-reduce:scale-100'
              : 'opacity-100 translate-y-0 scale-100',
          ].join(' ')}
          aria-label="Back to top"
          aria-hidden={showExitingStyles}
          type="button"
        >
          <ArrowUp size={24} className="text-surface" aria-hidden />
        </button>
      )}
    </>
  );
}

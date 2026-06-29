"use client"

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scrollToTopWithMotion } from '@/utils/scroll';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

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
        {isVisible && <span>Back to top button available</span>}
      </div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-accent hover:ring-4 hover:bg-accent-hover text-surface p-4 rounded-full shadow-2xl transition-all duration-300 motion-reduce:transition-none hover:scale-110 motion-reduce:hover:scale-100 hover:shadow-accent/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-hover z-50"
          aria-label="Back to top"
          type="button"
        >
          <ArrowUp size={24} className="text-surface" aria-hidden />
        </button>
      )}
    </>
  );
}

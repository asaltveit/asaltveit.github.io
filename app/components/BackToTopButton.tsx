"use client"

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

// TODO: Add tests


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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-white dark:bg-blue-600 hover:ring-4 hover:ring-blue-300 dark:hover:bg-blue-700 dark:text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:bg-blue-700 z-50"
      aria-label="Back to top"
    >
      <ArrowUp size={24} className="text-blue-600 dark:text-white" />
      <span className="sr-only">Top</span>
    </button>
  );
}


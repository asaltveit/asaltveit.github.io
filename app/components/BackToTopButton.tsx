"use client"

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';


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
          className="fixed bottom-8 right-8 bg-blue-600 hover:ring-4 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-700 z-50"
          aria-label="Back to top"
          type="button"
        >
          <ArrowUp size={24} className="text-white" />
        </button>
      )}
    </>
  );
}


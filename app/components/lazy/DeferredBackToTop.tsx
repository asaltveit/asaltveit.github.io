'use client';

import dynamic from 'next/dynamic';

const BackToTopButton = dynamic(() => import('@/components/BackToTopButton'), {
  ssr: false,
});

export default BackToTopButton;

'use client';

import dynamic from 'next/dynamic';

const SystemThemeSync = dynamic(() => import('@/components/SystemThemeSync'), {
  ssr: false,
});

export default SystemThemeSync;

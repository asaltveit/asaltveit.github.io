'use client';

import dynamic from 'next/dynamic';

const HackathonsSection = dynamic(() => import('@/components/containers/HackathonsSection'));

export default HackathonsSection;

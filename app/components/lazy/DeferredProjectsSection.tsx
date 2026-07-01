'use client';

import dynamic from 'next/dynamic';

const ProjectsSection = dynamic(() => import('@/components/containers/ProjectsSection'));

export default ProjectsSection;

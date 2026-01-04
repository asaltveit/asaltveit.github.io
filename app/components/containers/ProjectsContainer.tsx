'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';
import ProjectCard, { ProjectProps } from '@/components/cards/ProjectCard';
import { useGridColumns } from '@/utils/useGridColumns';

interface ProjectContainerProps {
    projects: ProjectProps[];
}

export default function ProjectsContainer({ projects = [] }: ProjectContainerProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
    const columns = useGridColumns(gridRef);

    useEffect(() => {
        cellRefs.current = cellRefs.current.slice(0, projects.length);
    }, [projects.length]);

    const getCurrentCellIndex = (): number => {
        return cellRefs.current.findIndex(cell => 
            cell === document.activeElement || cell?.contains(document.activeElement)
        );
    };

    const getGridPosition = (index: number): { row: number; col: number } => {
        return {
            row: Math.floor(index / columns),
            col: index % columns
        };
    };

    const getIndexFromPosition = (row: number, col: number): number => {
        return row * columns + col;
    };

    const focusCell = (index: number) => {
        if (index >= 0 && index < cellRefs.current.length) {
            const cell = cellRefs.current[index];
            if (cell) {
                // Find the first focusable element in the cell (usually a link)
                const focusableElement = cell.querySelector<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
                if (focusableElement) {
                    focusableElement.focus();
                } else {
                    cell.focus();
                }
            }
        }
    };

    const handleGridKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = getCurrentCellIndex();
        if (currentIndex === -1) return;

        const { row, col } = getGridPosition(currentIndex);
        let nextIndex = currentIndex;

        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                if (col < columns - 1) {
                    nextIndex = getIndexFromPosition(row, col + 1);
                } else if (row < Math.ceil(projects.length / columns) - 1) {
                    // Wrap to next row
                    nextIndex = getIndexFromPosition(row + 1, 0);
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (col > 0) {
                    nextIndex = getIndexFromPosition(row, col - 1);
                } else if (row > 0) {
                    // Wrap to previous row
                    nextIndex = getIndexFromPosition(row - 1, columns - 1);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextRow = row + 1;
                if (nextRow < Math.ceil(projects.length / columns)) {
                    nextIndex = getIndexFromPosition(nextRow, col);
                    // Ensure we don't go beyond the last item
                    if (nextIndex >= projects.length) {
                        nextIndex = projects.length - 1;
                    }
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (row > 0) {
                    nextIndex = getIndexFromPosition(row - 1, col);
                }
                break;
            case 'Home':
                e.preventDefault();
                nextIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                nextIndex = projects.length - 1;
                break;
            default:
                return; // Don't prevent default for other keys
        }

        if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < projects.length) {
            focusCell(nextIndex);
        }
    };

    const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const hackathonsGrid = document.getElementById('hackathons-grid');
        if (hackathonsGrid) {
            hackathonsGrid.focus();
            hackathonsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <a 
                href="#hackathons-grid" 
                aria-label="Skip to hackathons content" 
                className="absolute left-[-9999px] focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded"
                onClick={handleSkipClick}
            >
                Skip to hackathons content
            </a>
            <p id="projects-description" className="absolute left-[-9999px]" aria-hidden="true">Projects section</p>
            <div
                id="projects-grid"
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                role="grid"
                aria-label="Projects grid"
                aria-describedby="projects-description"
                onKeyDown={handleGridKeyDown}
                tabIndex={0}
            >
                {projects.map(({ title, dates, items, link, techStack = [], image, imageTitle }, index) => (
                    <div
                        key={title}
                        ref={(el) => { cellRefs.current[index] = el; }}
                        role="gridcell"
                        tabIndex={-1}
                    >
                        <ProjectCard
                            title={title}
                            dates={dates}
                            items={items}
                            link={link}
                            techStack={techStack}
                            image={image}
                            imageTitle={imageTitle}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

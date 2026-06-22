'use client';

import { useRef, useEffect, KeyboardEvent, useCallback } from 'react';
import ProjectCard, { ProjectProps } from '@/components/cards/ProjectCard';
import { useGridColumns } from '@/utils/useGridColumns';

interface ProjectContainerProps {
  featuredProjects?: ProjectProps[];
  otherProjects?: ProjectProps[];
}

export default function ProjectsContainer({
  featuredProjects = [],
  otherProjects = [],
}: ProjectContainerProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columns = useGridColumns(gridRef);

  useEffect(() => {
    cellRefs.current = cellRefs.current.slice(0, featuredProjects.length);
  }, [featuredProjects.length]);

  const getCurrentCellIndex = (): number => {
    return cellRefs.current.findIndex(
      (cell) => cell === document.activeElement || cell?.contains(document.activeElement)
    );
  };

  const getGridPosition = (index: number): { row: number; col: number } => {
    return {
      row: Math.floor(index / columns),
      col: index % columns,
    };
  };

  const getIndexFromPosition = (row: number, col: number): number => {
    return row * columns + col;
  };

  const focusCell = (index: number) => {
    if (index >= 0 && index < cellRefs.current.length) {
      const cell = cellRefs.current[index];
      if (cell) {
        const focusableElement = cell.querySelector<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
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
        } else if (row < Math.ceil(featuredProjects.length / columns) - 1) {
          nextIndex = getIndexFromPosition(row + 1, 0);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (col > 0) {
          nextIndex = getIndexFromPosition(row, col - 1);
        } else if (row > 0) {
          nextIndex = getIndexFromPosition(row - 1, columns - 1);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        {
          const nextRow = row + 1;
          if (nextRow < Math.ceil(featuredProjects.length / columns)) {
            nextIndex = getIndexFromPosition(nextRow, col);
            if (nextIndex >= featuredProjects.length) {
              nextIndex = featuredProjects.length - 1;
            }
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
        nextIndex = featuredProjects.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < featuredProjects.length) {
      focusCell(nextIndex);
    }
  };

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hackathonsGrid = document.getElementById('hackathons-grid');
    if (hackathonsGrid) {
      hackathonsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstFocusable = hackathonsGrid.querySelector<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  };

  const otherCount = otherProjects.length;

  const handleDetailsToggle = useCallback((e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget;
    if (!el.open) return;
    requestAnimationFrame(() => {
      const first = el.querySelector<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
      first?.focus();
    });
  }, []);

  return (
    <>
      <a
        href="#hackathons-grid"
        aria-label="Skip to hackathons content"
        className="absolute left-[-9999px] focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-surface focus:rounded"
        onClick={handleSkipClick}
      >
        Skip to hackathons content
      </a>
      <p id="projects-description" className="absolute left-[-9999px]" aria-hidden="true">
        Projects section
      </p>
      <div className="flex flex-col gap-8 md:gap-10">
        {featuredProjects.length > 0 && (
          <div
            id="projects-grid"
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            role="grid"
            aria-label="Selected projects"
            aria-describedby="projects-description"
            onKeyDown={handleGridKeyDown}
            tabIndex={-1}
          >
            {featuredProjects.map(({ title, dates, items, link, techStack = [], image, imageTitle }, index) => (
              <div
                key={title}
                ref={(el) => {
                  cellRefs.current[index] = el;
                }}
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
        )}

        {otherCount > 0 && (
          <details
            className="group rounded-lg border border-border bg-surface p-4 md:p-6 motion-safe:transition-colors"
            onToggle={handleDetailsToggle}
          >
            <summary className="cursor-pointer list-none text-text-primary text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="inline-block size-2 rounded-full bg-accent" />
                Other projects ({otherCount})
              </span>
              <span className="mt-1 block text-sm font-normal text-text-secondary">
                More work including tooling and this site — expand to view.
              </span>
            </summary>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-2 border-t border-border">
              {otherProjects.map(({ title, dates, items, link, techStack = [], image, imageTitle }) => (
                <div key={title}>
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
          </details>
        )}
      </div>
    </>
  );
}

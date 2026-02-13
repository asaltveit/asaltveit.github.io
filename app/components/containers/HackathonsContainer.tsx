'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';
import HackathonCard, { HackathonProps } from '@/components/cards/HackathonCard';
import { useGridColumns } from '@/utils/useGridColumns';

interface HackathonsContainerProps {
    hackathons: HackathonProps[];
}

export default function HackathonsContainer({ hackathons = [] }: HackathonsContainerProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
    const columns = useGridColumns(gridRef);

    useEffect(() => {
        cellRefs.current = cellRefs.current.slice(0, hackathons.length);
    }, [hackathons.length]);

    if (hackathons.length === 0) {
        return null;
    }

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
                } else if (row < Math.ceil(hackathons.length / columns) - 1) {
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
                if (nextRow < Math.ceil(hackathons.length / columns)) {
                    nextIndex = getIndexFromPosition(nextRow, col);
                    // Ensure we don't go beyond the last item
                    if (nextIndex >= hackathons.length) {
                        nextIndex = hackathons.length - 1;
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
                nextIndex = hackathons.length - 1;
                break;
            default:
                return; // Don't prevent default for other keys
        }

        if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < hackathons.length) {
            focusCell(nextIndex);
        }
    };

    return (
        <>
            <p id="hackathons-description" className="absolute left-[-9999px]" aria-hidden="true">Hackathons section</p>
            <div
                id="hackathons-grid"
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                role="grid"
                aria-label="Hackathons grid"
                aria-describedby="hackathons-description"
                onKeyDown={handleGridKeyDown}
                tabIndex={-1}
            >
                {hackathons.map(({ 
                    title, 
                    dates, 
                    items, 
                    link, 
                    techStack = [], 
                    image, 
                    imageTitle,
                    award,
                    teamSize,
                    duration
                }, index) => (
                    <div
                        key={title}
                        ref={(el) => { cellRefs.current[index] = el; }}
                        role="gridcell"
                        tabIndex={-1}
                    >
                        <HackathonCard
                            title={title}
                            dates={dates}
                            items={items}
                            link={link}
                            techStack={techStack}
                            image={image}
                            imageTitle={imageTitle}
                            award={award}
                            teamSize={teamSize}
                            duration={duration}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}


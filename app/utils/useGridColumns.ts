import { useEffect, useState, RefObject } from 'react';

/**
 * Custom hook to track the number of columns in a CSS grid.
 * Handles test environments and responsive breakpoints.
 * 
 * @param gridRef - Reference to the grid container element
 * @returns The current number of columns (defaults to 1)
 */
export function useGridColumns(gridRef: RefObject<HTMLDivElement | null>): number {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const updateColumns = () => {
            if (gridRef.current) {
                try {
                    const computedStyle = window.getComputedStyle(gridRef.current);
                    const gridTemplateColumns = computedStyle.gridTemplateColumns;
                    
                    // Handle test environment or when gridTemplateColumns is not available
                    if (gridTemplateColumns && gridTemplateColumns !== 'none' && gridTemplateColumns.trim() !== '') {
                        const columnCount = gridTemplateColumns.split(' ').length;
                        setColumns(columnCount);
                    } else {
                        // Fallback: use media query or default to 1 column
                        // In test environment, default to 1 column (mobile view)
                        if (typeof window !== 'undefined' && window.matchMedia) {
                            const isDesktop = window.matchMedia('(min-width: 768px)').matches;
                            setColumns(isDesktop ? 2 : 1);
                        } else {
                            setColumns(1);
                        }
                    }
                } catch (error) {
                    // Fallback for test environments where getComputedStyle might not work
                    if (typeof window !== 'undefined' && window.matchMedia) {
                        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
                        setColumns(isDesktop ? 2 : 1);
                    } else {
                        setColumns(1);
                    }
                }
            }
        };

        updateColumns();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateColumns);
            return () => window.removeEventListener('resize', updateColumns);
        }
    }, [gridRef]);

    return columns;
}


'use client';

import { useRef, useEffect, KeyboardEvent, FocusEvent, ReactNode, Children } from 'react';
import { useGridColumns } from '@/utils/useGridColumns';

interface CardGridProps {
  id: string;
  ariaLabel: string;
  ariaDescribedBy: string;
  children: ReactNode;
  cellCount: number;
}

export default function CardGrid({
  id,
  ariaLabel,
  ariaDescribedBy,
  children,
  cellCount,
}: CardGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columns = useGridColumns(gridRef);
  const childArray = Children.toArray(children);
  const keyboardNavEnabledRef = useRef(false);

  useEffect(() => {
    cellRefs.current = cellRefs.current.slice(0, cellCount);
  }, [cellCount]);

  const getCurrentCellIndex = (): number => {
    return cellRefs.current.findIndex(
      (cell) => cell === document.activeElement || cell?.contains(document.activeElement)
    );
  };

  const getGridPosition = (index: number): { row: number; col: number } => ({
    row: Math.floor(index / columns),
    col: index % columns,
  });

  const getIndexFromPosition = (row: number, col: number): number => row * columns + col;

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
        } else if (row < Math.ceil(cellCount / columns) - 1) {
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
          if (nextRow < Math.ceil(cellCount / columns)) {
            nextIndex = getIndexFromPosition(nextRow, col);
            if (nextIndex >= cellCount) {
              nextIndex = cellCount - 1;
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
        nextIndex = cellCount - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < cellCount) {
      focusCell(nextIndex);
    }
  };

  const handleFocusCapture = () => {
    keyboardNavEnabledRef.current = true;
  };

  const handleBlurCapture = (e: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as Node | null;
    if (!e.currentTarget.contains(relatedTarget)) {
      keyboardNavEnabledRef.current = false;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!keyboardNavEnabledRef.current) return;
    handleGridKeyDown(e);
  };

  if (cellCount === 0) {
    return null;
  }

  const rows: ReactNode[][] = [];
  for (let i = 0; i < cellCount; i += columns) {
    rows.push(childArray.slice(i, i + columns));
  }

  return (
    <div
      id={id}
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      role="grid"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {rows.map((rowChildren, rowIndex) => (
        <div key={rowIndex} role="row" className="contents">
          {rowChildren.map((child, colIndex) => {
            const index = rowIndex * columns + colIndex;
            return (
              <div
                key={index}
                ref={(el) => {
                  cellRefs.current[index] = el;
                }}
                role="gridcell"
                tabIndex={-1}
              >
                {child}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

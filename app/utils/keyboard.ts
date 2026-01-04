/**
 * Handles spacebar key press on links to activate them (same as Enter key).
 * Prevents default scrolling behavior and programmatically clicks the link.
 * 
 * @param e - The keyboard event from a link element
 */
export function handleSpacebarKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>): void {
  if (e.key === ' ' || e.key === 'Space') {
    e.preventDefault();
    e.currentTarget.click();
  }
}


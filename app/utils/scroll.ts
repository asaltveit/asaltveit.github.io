export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollIntoViewWithMotion(
  element: Element,
  options?: Omit<ScrollIntoViewOptions, 'behavior'>
): void {
  element.scrollIntoView({
    ...options,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

export function scrollToTopWithMotion(): void {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

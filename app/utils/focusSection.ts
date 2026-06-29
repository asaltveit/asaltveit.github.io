/** Move keyboard focus to a section's primary heading after in-page navigation. */
export function focusSectionHeading(sectionId: string): void {
  const heading = document.getElementById(`${sectionId}-heading`);
  if (heading) {
    heading.focus({ preventScroll: true });
    return;
  }

  const section = document.getElementById(sectionId);
  if (!section) return;

  const fallback = section.querySelector<HTMLElement>('h1, h2, h3');
  fallback?.focus({ preventScroll: true });
}

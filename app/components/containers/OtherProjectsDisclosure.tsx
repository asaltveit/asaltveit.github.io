'use client';

import { ReactNode, useCallback, SyntheticEvent } from 'react';

interface OtherProjectsDisclosureProps {
  count: number;
  children: ReactNode;
}

export default function OtherProjectsDisclosure({ count, children }: OtherProjectsDisclosureProps) {
  const handleDetailsToggle = useCallback((e: SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget;
    if (!el.open) return;
    requestAnimationFrame(() => {
      const first = el.querySelector<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
      first?.focus();
    });
  }, []);

  return (
    <details
      className="group rounded-lg border border-border bg-surface p-4 md:p-6 motion-safe:transition-colors"
      onToggle={handleDetailsToggle}
    >
        <summary className="cursor-pointer list-none text-text-primary text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="inline-block size-2 rounded-full bg-accent" />
            Other projects ({count})
          </span>
          <span className="mt-1 block text-sm font-normal text-text-secondary">
            More work including tooling and this site — expand to view.
          </span>
        </summary>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2 border-t border-border">
        {children}
      </div>
    </details>
  );
}

import { ExternalLink } from 'lucide-react';

/** Lucide icon classes for inline text links (card titles, footer, etc.). */
export const TEXT_LINK_EXTERNAL_ICON_CLASS =
  'w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity';

/** Subtle visual hint on hover/focus; “opens in new tab” is conveyed via the parent link’s accessible name. */
export function CardImageExternalLinkIndicator() {
  return (
    <div
      className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
      aria-hidden
    >
      <span className="flex rounded-sm bg-black/70 px-1 py-1 shadow-sm backdrop-blur-[1px]">
        <ExternalLink className="h-4 w-4 shrink-0 text-white/90" strokeWidth={2} aria-hidden />
      </span>
    </div>
  );
}

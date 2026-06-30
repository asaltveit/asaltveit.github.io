/** Accent text + underline on hover and keyboard focus, plus focus ring. */
export const TEXT_LINK_INTERACTIVE_CLASS =
  'rounded-sm outline-none transition-colors hover:text-accent hover:underline hover:underline-offset-4 hover:decoration-accent focus-visible:text-accent focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

/** In-page nav links: underlined on mobile; underline on hover/focus from md up. */
export const NAV_LINK_CLASS = `${TEXT_LINK_INTERACTIVE_CLASS} underline underline-offset-4 md:no-underline`;

/** Links shown in accent (hero): underlined on mobile; underline on hover/focus from md up. */
export const ACCENT_TEXT_LINK_CLASS = `${TEXT_LINK_INTERACTIVE_CLASS} text-accent underline underline-offset-4 md:no-underline`;

/** Accent external links with icon (hero social links, footer GitHub). */
export const ACCENT_EXTERNAL_LINK_CLASS = `group inline-flex items-center gap-2 ${ACCENT_TEXT_LINK_CLASS}`;

/** Body/card links starting from inherited primary text color. */
export const PRIMARY_TEXT_LINK_CLASS = TEXT_LINK_INTERACTIVE_CLASS;

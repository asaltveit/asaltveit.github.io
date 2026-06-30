'use client';

import { useRef, useEffect, useState } from 'react';
import { handleSpacebarKeyDown } from '@/utils/keyboard';
import { scrollIntoViewWithMotion } from '@/utils/scroll';
import { beginAutoScroll } from '@/utils/autoScrollLock';
import { focusSectionHeading } from '@/utils/focusSection';
import ThemeToggle from '@/components/ThemeToggle';
import { NAV_LINK_CLASS } from '@/components/linkStyles';

interface Link {
    title: string,
    id: string
}

interface NavBarProps {
    links: Link[]
    currentSectionId?: string
}

// Initial active section: same on server and first client render to avoid hydration mismatch.
function getInitialActiveSectionId(links: Link[], currentSectionId?: string): string {
    if (currentSectionId) return currentSectionId;
    return links.length > 0 ? links[0].id : '';
}

const MENU_FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function NavBar ({ links, currentSectionId } : NavBarProps) {
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuPanelRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSectionId, setActiveSectionId] = useState(() =>
        getInitialActiveSectionId(links, currentSectionId)
    );

    useEffect(() => {
        linkRefs.current = linkRefs.current.slice(0, links.length);
    }, [links.length]);

    // Sync active section from URL hash after mount (client-only) to avoid hydration mismatch.
    useEffect(() => {
        const fromHash = () => {
            if (typeof window !== 'undefined' && window.location.hash) {
                const sectionId = window.location.hash.slice(1);
                setActiveSectionId(sectionId);
                requestAnimationFrame(() => focusSectionHeading(sectionId));
            } else {
                setActiveSectionId(getInitialActiveSectionId(links, currentSectionId));
            }
        };
        fromHash();
        window.addEventListener('hashchange', fromHash);
        return () => window.removeEventListener('hashchange', fromHash);
    }, [links, currentSectionId]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, currentIndex: number) => {
        let nextIndex = currentIndex;

        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                nextIndex = (currentIndex + 1) % links.length;
                break;
            case 'ArrowLeft':
                e.preventDefault();
                nextIndex = (currentIndex - 1 + links.length) % links.length;
                break;
            case 'Home':
                e.preventDefault();
                nextIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                nextIndex = links.length - 1;
                break;
            case ' ':
            case 'Space':
                handleSpacebarKeyDown(e);
                return;
            default:
                return; // Don't prevent default for other keys
        }

        linkRefs.current[nextIndex]?.focus();
    };

    useEffect(() => {
        if (isMenuOpen && linkRefs.current[0]) {
            linkRefs.current[0].focus();
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const getMenuFocusables = () => {
            if (!menuPanelRef.current) return [];
            return Array.from(
                menuPanelRef.current.querySelectorAll<HTMLElement>(MENU_FOCUSABLE_SELECTOR)
            ).filter((el) => !el.hasAttribute('disabled'));
        };

        const onDocumentKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                setIsMenuOpen(false);
                menuButtonRef.current?.focus();
                return;
            }

            if (e.key !== 'Tab') return;

            const focusables = getMenuFocusables();
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onDocumentKeyDown);
        return () => document.removeEventListener('keydown', onDocumentKeyDown);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen((open) => !open);
    };

    const handleNavLinkClick = (sectionId: string) => {
        beginAutoScroll();
        setIsMenuOpen(false);
        requestAnimationFrame(() => focusSectionHeading(sectionId));
    };

    const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            scrollIntoViewWithMotion(mainContent, { block: 'start' });
        }
    };

   return (
        <nav aria-label="main navigation" role="navigation">
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-2 focus:bg-accent focus:text-surface"
                aria-label="skip to main content"
                onClick={handleSkipClick}
            >
                Skip to main content
            </a>
            <div className="max-w-screen-xl mx-auto px-4 pt-2 pb-1 md:p-4">
                <div className="flex items-center justify-between">
                    <ThemeToggle />
                    <div className="relative flex flex-col items-end md:static md:flex-row md:items-center">
                        <button 
                            ref={menuButtonRef}
                            data-collapse-toggle="navbar-solid-bg" 
                            type="button" 
                            className="relative z-50 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm text-text-primary md:hidden hover:bg-surface-hover hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                            aria-controls="navbar-solid-bg" 
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
                        >
                            <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                        <div 
                            ref={menuPanelRef}
                            className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute right-0 top-full z-40 mt-1 w-max max-w-[min(100vw-2rem,16rem)] rounded-lg border border-border bg-surface px-4 pt-2 pb-3 shadow-lg md:static md:top-auto md:right-auto md:z-auto md:mt-0 md:max-w-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
                            id="navbar-solid-bg"
                        >
                            <ul className="flex flex-col gap-0 font-medium md:flex-row md:space-x-8 rtl:space-x-reverse">
                                {
                                    links.map((link: Link, index: number) => {
                                        const isActive = link.id === activeSectionId;
                                        return (
                                            <li key={`${link.id}`}>
                                                <a 
                                                    href={`#${link.id}`} 
                                                    aria-label={`link to ${link.title} section`}
                                                    aria-current={isActive ? 'page' : undefined}
                                                    className={`block py-2.5 md:inline md:px-0 md:py-0 ${NAV_LINK_CLASS}`}
                                                    ref={(el) => { linkRefs.current[index] = el; }}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    onClick={() => handleNavLinkClick(link.id)}
                                                >
                                                    {link.title}
                                                </a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

'use client';

import { useRef, useEffect, useState } from 'react';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

interface Link {
    title: string,
    id: string 
}

interface NavBarProps {
    links: Link[]
    currentSectionId?: string
}

export default function NavBar ({ links, currentSectionId } : NavBarProps) {
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        linkRefs.current = linkRefs.current.slice(0, links.length);
    }, [links.length]);

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
            // Focus the first menu item when menu opens
            linkRefs.current[0].focus();
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getCurrentSectionId = () => {
        if (currentSectionId) return currentSectionId;
        if (typeof window !== 'undefined' && window.location.hash) {
            return window.location.hash.slice(1);
        }
        // Default to first link for test compatibility
        return links.length > 0 ? links[0].id : '';
    };

    const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

   return (
        <nav aria-label="main navigation" role="navigation">
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-2 focus:bg-white focus:text-black"
                aria-label="skip to main content"
                onClick={handleSkipClick}
            >
                Skip to main content
            </a>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="h-8" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"></span>
                </div>
                <button 
                    data-collapse-toggle="navbar-solid-bg" 
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" 
                    aria-controls="navbar-solid-bg" 
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                    aria-label="open main menu"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div 
                    className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} 
                    id="navbar-solid-bg"
                >
                    <ul role="menu" aria-orientation="horizontal" className="flex flex-col font-medium mt-4 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-transparent border-gray-700">
                        {
                            links.map((link: Link, index: number) => {
                                const isActive = link.id === getCurrentSectionId();
                                return (
                                    <li key={`${link.id}`} role="menuitem" aria-label={`includes link to ${link.title} section`}>
                                        <a 
                                            href={`#${link.id}`} 
                                            aria-label={`link to ${link.title} section`}
                                            aria-current={isActive ? 'page' : undefined}
                                            className=" underline underline-offset-4 md:no-underline hover:underline hover:underline-offset-4"
                                            ref={(el) => { linkRefs.current[index] = el; }}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
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
        </nav>
    )
}
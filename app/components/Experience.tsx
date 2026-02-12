'use client';

import Link from 'next/link';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

interface ExperienceProps {
    title: string;
    dates: string;
    items: string[];
    linkLocation?: string;
    linkName?: string;
  }

export default function Experience ({ title, dates, items, linkLocation, linkName } : ExperienceProps) {
    return (
        <div className="grid items-start justify-items-start">
            <h3 className="text-white text-xl md:text-2xl font-bold">
                {title}
            </h3>
            <time className="text-slate-400 text-lg md:text-xl pb-2">
                {dates}
            </time>
            {
                linkLocation &&
                <ul className='marker:text-green list-outside list-disc ml-6 text-white text-lg md:text-xl justify-items-start'>
                    <li >
                        <span className='mr-2' > Located at: </span>
                        <Link 
                            href={linkLocation}
                            aria-label={`link to ${title}`}
                            className='md:hover:underline md:hover:underline-offset-5 md:no-underline underline underline-offset-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all'
                            target="_blank"
                            rel="noopener noreferrer"
                            onKeyDown={handleSpacebarKeyDown}
                        >
                            {linkName || linkLocation}
                        </Link>
                    </li>
                </ul>
            }
            
            <ul className='marker:text-green list-outside list-disc ml-6 text-white text-lg md:text-xl justify-items-start'>
                {
                    items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                }
            </ul>
        </div>
    )
}
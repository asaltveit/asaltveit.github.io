import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface BaseCardProps {
  title: string;
  dates: string;
  items: string[];
  link?: string;
  children?: React.ReactNode; // For image or other content
  footerContent?: React.ReactNode; // For tech stack or other footer elements
}

export default function BaseCard({ 
  title, 
  dates, 
  items, 
  link, 
  children,
  footerContent 
}: BaseCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Image or placeholder section */}
      {children && (
        <div className="w-full aspect-video overflow-hidden flex-shrink-0">
          {children}
        </div>
      )}
      
      {/* Content section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          {link ? (
            <Link 
              href={link} 
              aria-label={`link to ${title}`}
              className="group inline-flex items-center gap-2 text-slate-700 dark:text-white text-xl md:text-2xl font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ) : (
            <div className="text-slate-700 dark:text-white text-xl md:text-2xl font-bold">
              {title}
            </div>
          )}
        </div>
        
        <div className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-4">
          {dates}
        </div>
        
        <ul className="list-outside list-disc ml-6 text-slate-700 dark:text-slate-200 text-base md:text-lg space-y-1.5 mb-4">
          {items.map((item: string, i: number) => (
            <li key={`${i}`}>{item}</li>
          ))}
        </ul>
        
        {/* Footer content: tech stack, etc. */}
        {footerContent && (
          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
}


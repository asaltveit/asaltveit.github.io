import CardTitleLink from '@/components/cards/CardTitleLink';

interface BaseCardProps {
  title: string;
  dates: string;
  items: string[];
  link?: string;
  /** When there is no link, optional note to show so users know it's intentional (e.g. "No project link available") */
  noLinkNote?: string;
  children?: React.ReactNode; // For image or other content
  footerContent?: React.ReactNode; // For tech stack or other footer elements
}

export default function BaseCard({ 
  title, 
  dates, 
  items, 
  link, 
  noLinkNote,
  children,
  footerContent 
}: BaseCardProps) {
  const description_words = ["Problem: ", "Solution: ", "Impact: "];
  return (
    <div className="bg-surface rounded-lg shadow-md hover:shadow-lg hover:bg-surface-hover transition-all duration-300 motion-reduce:transition-none overflow-hidden border border-border flex flex-col">
      {/* Image or placeholder section */}
      {children && (
        <div className="w-full aspect-video overflow-hidden flex-shrink-0">
          {children}
        </div>
      )}
      
      {/* Content section */}
      <div className="p-6 lg:p-8 flex flex-col flex-grow">
        <div className="mb-3">
          {link ? (
            <CardTitleLink title={title} link={link} />
          ) : (
            <div>
              <h3 className="text-text-primary text-h2 font-bold">
                {title}
              </h3>
              {noLinkNote && (
                <p className="text-text-secondary text-small mt-1">
                  {noLinkNote}
                </p>
              )}
            </div>
          )}
        </div>
        
        <time className="text-text-secondary text-small mb-4">
          {dates}
        </time>

        <div className="text-text-primary text-body leading-relaxed space-y-1.5 mb-4">
          {items.map((item: string, i: number) => (
            <div key={`${i}`}>
              <span className="font-semibold">{description_words[i]}</span>
              {item}
            </div>
          ))}
        </div>
        
        {/* Footer content: tech stack, etc. list-outside list-disc*/}
        {footerContent && (
          <div className="mt-auto pt-4 border-t border-border">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
}


import Link from 'next/link';

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
            <div className="text-slate-700 dark:text-white text-xl md:text-2xl font-bold">
                {title}
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-lg md:text-xl pb-2">
                {dates}
            </div>
            {
                linkLocation &&
                <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 dark:text-white text-lg md:text-xl justify-items-start'>
                    <li >
                        <span className='mr-2' > Located at: </span>
                        <Link 
                            href={linkLocation}
                            aria-label={`link to ${title}`}
                            className='md:hover:underline md:hover:underline-offset-5 md:no-underline underline underline-offset-5'
                        >
                            {linkName}
                        </Link>
                    </li>
                </ul>
            }
            
            <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 dark:text-white text-lg md:text-xl justify-items-start'>
                {
                    items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                }
            </ul>
        </div>
    )
}
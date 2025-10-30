import Link from 'next/link';

interface ProjectProps {
    title: string;
    dates: string;
    items: string[];
    link: string;
}

interface ProjectContainerProps {
    projects: ProjectProps[];
}

// TODO: Add tests
// What was this for on the items?  marker:text-green 

export default function ProjectContainer ({ projects=[] } : ProjectContainerProps) {
    return (
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-8 md:grid-rows-2 items-start">
            {projects.map(({ title, dates, items, link="#" })=>
                <div className="grid items-end md:pr-10" key={title}>
                    <div className="text-slate-700 dark:text-white text-xl md:text-2xl font-bold">
                        <Link href={link} aria-label={`link to ${title}`} className='underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4'> {title} </Link>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-lg md:text-xl pb-2">
                        {dates}
                    </div>
                    <ul className='list-outside list-disc ml-6 text-slate-700 dark:text-white text-lg md:text-xl justify-items-start'>
                        {
                            items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}
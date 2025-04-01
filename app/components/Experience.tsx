
interface ExperienceProps {
    title: string;
    dates: string;
    items: string[];
  }

export default function Experience ({ title, dates, items } : ExperienceProps) {
    return (
        <div className="grid items-start justify-items-start">
            <div className="text-slate-700 dark:text-white text-xl md:text-2xl font-bold">
                {title}
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-lg md:text-xl pb-2">
                {dates}
            </div>
            <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 dark:text-white text-lg md:text-xl justify-items-start'>
                {
                    items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                }
            </ul>
        </div>
    )
}
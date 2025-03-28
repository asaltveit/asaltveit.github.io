
interface ExperienceProps {
    title: string;
    dates: string;
    items: string[];
  }

export default function Experience ({ title, dates, items } : ExperienceProps) {
    return (
        <div className="grid items-start justify-items-start pb-8">
            <div className="text-slate-700 text-2xl font-bold">
                {title}
            </div>
            <div className="text-slate-500 text-xl pb-2">
                {dates}
            </div>
            <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 text-xl justify-items-start'>
                {
                    items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                }
            </ul>
        </div>
    )
}
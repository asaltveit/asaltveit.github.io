import ExperienceLocationLink from '@/components/ExperienceLocationLink';

interface ExperienceProps {
  title: string;
  dates: string;
  items: string[];
  linkLocation?: string;
  linkName?: string;
}

export default function Experience({
  title,
  dates,
  items,
  linkLocation,
  linkName,
}: ExperienceProps) {
  return (
    <div className="grid items-start justify-items-start">
      <h3 className="text-text-primary text-h1 md:text-2xl font-bold">{title}</h3>
      <time className="text-text-secondary text-lg md:text-xl pb-2">{dates}</time>
      {linkLocation && (
        <ul className="marker:text-success list-outside list-disc ml-6 text-text-secondary text-body md:text-xl justify-items-start">
          <li>
            <span className="mr-2"> Located at: </span>
            <ExperienceLocationLink
              href={linkLocation}
              title={title}
              linkName={linkName}
            />
          </li>
        </ul>
      )}

      <ul className="marker:text-success list-outside list-disc ml-6 text-text-primary text-body md:text-xl justify-items-start">
        {items.map((item: string, i: number) => (
          <li key={`${i}`}> {item} </li>
        ))}
      </ul>
    </div>
  );
}

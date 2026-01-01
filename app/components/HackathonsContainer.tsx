import HackathonCard from './cards/HackathonCard';

interface HackathonProps {
    title: string;
    dates: string;
    items: string[];
    link: string;
    techStack?: string[];
    image?: string;
    imageTitle?: string;
    award?: string;
    teamSize?: number;
    duration?: string;
}

interface HackathonsContainerProps {
    hackathons: HackathonProps[];
}

export default function HackathonsContainer({ hackathons = [] }: HackathonsContainerProps) {
    if (hackathons.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {hackathons.map(({ 
                title, 
                dates, 
                items, 
                link, 
                techStack = [], 
                image, 
                imageTitle,
                award,
                teamSize,
                duration
            }) => (
                <HackathonCard
                    key={title}
                    title={title}
                    dates={dates}
                    items={items}
                    link={link}
                    techStack={techStack}
                    image={image}
                    imageTitle={imageTitle || `${title} screenshot`}
                    award={award}
                    teamSize={teamSize}
                    duration={duration}
                />
            ))}
        </div>
    );
}


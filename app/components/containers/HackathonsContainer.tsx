import HackathonCard, { HackathonProps } from '@/components/cards/HackathonCard';

interface HackathonsContainerProps {
    hackathons: HackathonProps[];
}

export default function HackathonsContainer({ hackathons = [] }: HackathonsContainerProps) {
    if (hackathons.length === 0) {
        return null;
    }

    return (
        <>
            <h2 className="sr-only">Hackathons</h2>
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
        </>
    );
}


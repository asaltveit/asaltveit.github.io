import HackathonCard, { HackathonProps } from '@/components/cards/HackathonCard';
import { hackathons as defaultHackathons } from '@/data';
import CardGrid from '@/components/containers/CardGrid';

interface HackathonsSectionProps {
  hackathons?: HackathonProps[];
}

export default function HackathonsSection(props: HackathonsSectionProps = {}) {
  if ('hackathons' in props && props.hackathons === undefined) {
    return null;
  }

  const hackathons = props.hackathons ?? defaultHackathons;

  if (hackathons.length === 0) {
    return null;
  }

  return (
    <>
      <p id="hackathons-description" className="absolute left-[-9999px]" aria-hidden="true">
        Hackathons section
      </p>
      <CardGrid
        id="hackathons-grid"
        ariaLabel="Hackathons grid"
        ariaDescribedBy="hackathons-description"
        cellCount={hackathons.length}
      >
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.title} {...hackathon} />
        ))}
      </CardGrid>
    </>
  );
}

import { skillGroups } from '@/data';

export default function SkillsSection() {
  return (
    <div className="grid max-w-prose">
      {skillGroups.map((group, index) => (
        <div key={group.title}>
          <h3 className="text-text-primary text-h2 font-bold mb-3">{group.title}</h3>
          <p
            className={`text-text-primary text-body leading-relaxed ${
              index < skillGroups.length - 1 ? 'mb-6 md:mb-8' : ''
            }`}
          >
            {group.items}
          </p>
        </div>
      ))}
    </div>
  );
}

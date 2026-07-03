import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { TEXT_LINK_EXTERNAL_ICON_CLASS } from '@/components/cards/externalLinkIndicators';
import { PRIMARY_TEXT_LINK_CLASS } from '@/components/linkStyles';

interface CardTitleLinkProps {
  title: string;
  link: string;
}

export default function CardTitleLink({ title, link }: CardTitleLinkProps) {
  return (
    <h3 className="text-text-primary text-h2 font-bold">
      <Link
        href={link}
        aria-label={`link to ${title} (opens in new tab)`}
        className={`group inline-flex items-center gap-2 ${PRIMARY_TEXT_LINK_CLASS}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
        <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
      </Link>
    </h3>
  );
}

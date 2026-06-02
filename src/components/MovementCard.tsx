import Link from 'next/link';
import type { ReactNode } from 'react';

interface MovementCardProps {
  /** Small eyebrow label above the title. */
  title: ReactNode;
  /** The card's main heading. */
  children: ReactNode;
  href: string;
}

export function MovementCard({ title, children, href }: MovementCardProps) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      className="movement-card"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="movement-card__eyebrow">{title}</span>
      <span className="movement-card__title">{children}</span>
    </Link>
  );
}

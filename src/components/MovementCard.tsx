import React from 'react';
import { Card } from 'fumadocs-ui/components/card';

interface MovementCardProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  [key: string]: any;
}

export function MovementCard({ icon, title, children, ...props }: MovementCardProps) {
  return (
    <Card
      {...props}
      title={title}
      className={`movement-card group relative overflow-hidden px-8 py-6 ${props.className || ''}`}
    >
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0 flex items-center h-16">
          <span className="text-[2.5rem] block">{icon}</span>
        </div>
        <div>
          <div className="text-lg text-gray-300">{children}</div>
        </div>
      </div>
    </Card>
  );
} 
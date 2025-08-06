import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { Github, MessageCircle } from 'lucide-react';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="/icon-yellow.svg"
          alt="Movement Labs Logo"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        Movement Docs
      </>
    ),
  },
  links: [
    {
      type: 'icon',
      label: 'GitHub Repository',
      icon: <Github />,
      text: 'GitHub',
      url: 'https://github.com/movementlabsxyz/movement-docs',
    },
    {
      type: 'icon',
      label: 'Community Forum',
      icon: <MessageCircle />,
      text: 'Forum',
      url: 'https://forums.movementnetwork.xyz/',
    },
  ],
  // see https://fumadocs.dev/docs/ui/navigation/links
};

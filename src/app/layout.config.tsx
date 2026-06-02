import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
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
        <svg
          width="24"
          height="24"
          viewBox="0 0 44 44"
          fill="none"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M0 19.7041V43.6713H8.27348L12.4064 40.2081V23.2937L6.99916 15.7664L0 19.7041Z" fill="currentColor" />
          <path d="M19.5089 3.46707L15.8696 8.05539L31.4064 12.8044V33.6069L39.6684 33.6145L43.6674 30.2546V0L19.5089 3.46707Z" fill="currentColor" />
          <path d="M28.1039 37.1122V15.2459L13.2904 10.7303L9.68941 13.8453L15.709 22.226V40.5869H23.9595L28.1039 37.1122Z" fill="currentColor" />
        </svg>
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

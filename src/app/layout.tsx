import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Movement Docs',
    template: '%s | Movement Docs',
  },
  description: 'Start Building on the Movement Network',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-yellow.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Movement Docs',
    description: 'Start Building on the Movement Network',
    url: 'https://docs.movementnetwork.xyz',
    siteName: 'Movement Docs',
    images: [
      {
        url: '/img/movementlabs-social-card.png',
        width: 1200,
        height: 630,
        alt: 'Movement Labs Documentation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movement Docs',
    description: 'Documentation for Movement Labs - Building the future of blockchain interoperability',
    images: ['/img/movementlabs-social-card.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon-yellow.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

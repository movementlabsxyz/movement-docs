import type { MetadataRoute } from 'next';

// Pre-render at build time (required for `output: 'export'`).
export const dynamic = 'force-static';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.movementnetwork.xyz';

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

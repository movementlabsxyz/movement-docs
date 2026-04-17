import type { MetadataRoute } from 'next';
import { apiSource, devsSource, generalSource } from '@/lib/source';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.movementnetwork.xyz';

function toAbsolute(path: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...devsSource.getPages(),
    ...generalSource.getPages(),
    ...apiSource.getPages(),
  ];

  const seen = new Set<string>();
  const out: MetadataRoute.Sitemap = [];

  const add = (
    path: string,
    opts?: Pick<MetadataRoute.Sitemap[number], 'priority' | 'changeFrequency'>,
  ) => {
    const url = toAbsolute(path);
    if (seen.has(url)) return;
    seen.add(url);
    out.push({ url, ...opts });
  };

  add('/', { priority: 1, changeFrequency: 'weekly' });

  for (const page of pages) {
    add(page.url, { priority: 0.8, changeFrequency: 'weekly' });
  }

  return out;
}

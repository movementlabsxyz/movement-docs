import { devsSource } from '@/lib/source';
import { canonicalUrl } from '@/lib/get-llm-text';

// Static-export compatible — generated once at build time.
export const dynamic = 'force-static';
export const revalidate = false;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.movementnetwork.xyz';

function toAbsolute(path: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

const SECTIONS: { slug: string; title: string }[] = [
  { slug: 'devs', title: 'Developers' },
  { slug: 'general', title: 'General' },
  { slug: 'api', title: 'API' },
];

export async function GET() {
  // All sources share the same tree; one source enumerates every page once.
  const pages = devsSource.getPages();

  const header = `# Movement Network Documentation

> Movement is a native Move Layer 1 blockchain. This file is a concise index of the documentation, intended for LLMs and AI tools.

- Full text of every page: ${toAbsolute('/llms-full.txt')}
- Movement main site index: https://movementnetwork.xyz/llms.txt`;

  const body = SECTIONS.map(({ slug, title }) => {
    const lines = pages
      .filter((page) => Array.isArray(page.slugs) && page.slugs[0] === slug)
      .map((page) => {
        const desc = page.data.description ? `: ${page.data.description}` : '';
        return `- [${page.data.title}](${toAbsolute(canonicalUrl(page))})${desc}`;
      });
    return `## ${title}\n\n${lines.join('\n')}`;
  }).join('\n\n');

  return new Response(`${header}\n\n${body}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

import { devsSource } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

// Static-export compatible — generated once at build time.
export const dynamic = 'force-static';
export const revalidate = false;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.movementnetwork.xyz';

function toAbsolute(path: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

const header = `# Movement Network Documentation — Full Text

> Full text of every documentation page, concatenated for LLMs and AI tools.

- Concise index: ${toAbsolute('/llms.txt')}
- Movement main site index: https://movementnetwork.xyz/llms.txt

---
`;

export async function GET() {
  try {
    // All sources share the same `content/docs` tree, so a single source
    // already enumerates every page exactly once.
    const allPages = devsSource.getPages();

    if (allPages.length === 0) {
      return new Response('No pages found', {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    const scan = allPages.map(getLLMText);
    const scanned = await Promise.all(scan);

    return new Response(`${header}\n${scanned.join('\n\n')}`, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error generating LLM text:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Error generating documentation: ${errorMessage}`, { status: 500 });
  }
} 
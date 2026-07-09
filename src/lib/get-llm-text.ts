import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { remarkInclude } from 'fumadocs-mdx/config';
import { docs } from '@/.source';
import type { Page } from 'fumadocs-core/source';

const processor = remark()
  .use(remarkMdx)
  // needed for Fumadocs MDX
  .use(remarkInclude)
  .use(remarkGfm);

// The three Fumadocs sources all share the whole `content/docs` tree, so a
// page's `.url` carries a doubled section prefix (e.g. `/devs/devs/faq`).
// `.slugs` already includes the section folder, so the canonical site URL is
// simply `/` + slugs.
export function canonicalUrl(page: any): string {
  if (Array.isArray(page.slugs) && page.slugs.length > 0) {
    return `/${page.slugs.join('/')}`;
  }
  return page.url;
}

export async function getLLMText(page: any) {
  const title = page.data.title ?? canonicalUrl(page);
  const description = page.data.description ?? '';
  const url = canonicalUrl(page);

  try {
    const rawWithFrontmatter = page.data.content ?? page.data.body ?? '';
    // Strip the leading YAML frontmatter block; title/description are already
    // emitted in the heading below, so leaving it in just adds noise.
    const raw =
      typeof rawWithFrontmatter === 'string'
        ? rawWithFrontmatter.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
        : rawWithFrontmatter;
    if (raw && typeof raw === 'string') {
      const processed = await processor.process({
        path: page.data._file?.absolutePath,
        value: raw,
      });
      return `# ${title}
URL: ${url}

${String(processed.value)}`;
    }
  } catch (error) {
    console.error('Error processing page:', url, error);
  }

  // Fallback: metadata only when raw content is unavailable.
  return `# ${title}
URL: ${url}

${description}

[Content available at: ${url}]`;
} 
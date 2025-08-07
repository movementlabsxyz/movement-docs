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

export async function getLLMText(page: any) {
  try {
    // For now, just return the basic page info without processing MDX
    return `# ${page.data.title}
URL: ${page.url}

${page.data.description}

[Content available at: ${page.url}]`;
  } catch (error) {
    console.error('Error processing page:', page.url, error);
    return `# ${page.data.title}
URL: ${page.url}

${page.data.description}

[Error processing content]`;
  }
} 
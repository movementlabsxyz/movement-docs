import { devsSource, generalSource, apiSource } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

// cached forever
export const revalidate = false;

export async function GET() {
  try {
    // Get pages from all sources
    const devsPages = devsSource.getPages();
    const generalPages = generalSource.getPages();
    const apiPages = apiSource.getPages();
    
    const allPages = [...devsPages, ...generalPages, ...apiPages];
    console.log('Found pages:', allPages.length);
    
    if (allPages.length === 0) {
      return new Response('No pages found', {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    const scan = allPages.map(getLLMText);
    const scanned = await Promise.all(scan);

    return new Response(scanned.join('\n\n'), {
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
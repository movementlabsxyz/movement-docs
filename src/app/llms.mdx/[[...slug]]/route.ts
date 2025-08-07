import { type NextRequest, NextResponse } from 'next/server';
import { getLLMText } from '@/lib/get-llm-text';
import { devsSource, generalSource, apiSource } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  
  // Try to find the page in each source
  let page = null;
  
  if (slug && slug.length > 0) {
    // Try devs source first
    if (slug[0] === 'devs') {
      page = devsSource.getPage(slug);
    }
    // Try general source
    else if (slug[0] === 'general') {
      page = generalSource.getPage(slug);
    }
    // Try API source
    else if (slug[0] === 'api') {
      page = apiSource.getPage(slug);
    }
  }
  
  if (!page) notFound();

  return new NextResponse(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export function generateStaticParams() {
  const devsParams = devsSource.generateParams();
  const generalParams = generalSource.generateParams();
  const apiParams = apiSource.generateParams();
  
  return [...devsParams, ...generalParams, ...apiParams];
} 
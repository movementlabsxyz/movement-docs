import { devsSource } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  
  // Handle index page (no slug) and sub-pages
  // Based on available pages, we need to use ['devs'] for the main devs page
  const slug = params.slug ? ['devs', ...params.slug] : ['devs'];
  
  // Debug: Let's see what pages are available
  console.log('Devs slug:', slug);
  console.log('Available pages:', devsSource.generateParams());
  
  const page = devsSource.getPage(slug);
  if (!page) {
    console.log('Page not found for slug:', slug);
    notFound();
  }

  const MDXContent = page.data.body;

  // Check if this is the main devs index page
  const isMainPage = params.slug === undefined || params.slug.length === 0;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle className="text-black!">{page.data.title}</DocsTitle>
      <DocsDescription className="text-black!">{page.data.description}</DocsDescription>
      {!isMainPage && (
        <div className="docs-page-actions flex flex-row gap-2 items-center border-b pt-2 pb-6">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/movementlabsxyz/movement-docs/blob/main/content/docs/${page.path}`}
          />
        </div>
      )}
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(devsSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  // The Fumadocs sources share the whole `content/docs` tree, so
  // `generateParams()` returns every page (with the section folder name
  // as the first slug element). Keep only the `devs` section and strip
  // that redundant prefix — otherwise URLs would be
  // `/devs/devs/firstMoveContract`. The dynamic build masked this via
  // `rewriteUrls` in the layout, but static export needs correct slugs.
  return devsSource.generateParams()
    .filter((p) => Array.isArray(p.slug) && p.slug[0] === 'devs')
    .map((p) => ({ slug: p.slug.slice(1) }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug ? ['devs', ...params.slug] : ['devs'];
  const page = devsSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `https://docs.movementnetwork.xyz/devs${slug.length > 1 ? '/' + slug.slice(1).join('/') : ''}`,
      siteName: 'Movement Docs',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
    },
  };
} 
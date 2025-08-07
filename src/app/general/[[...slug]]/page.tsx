import { generalSource } from '@/lib/source';
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
  // Based on available pages, we need to use ['general'] for the main general page
  const slug = params.slug ? ['general', ...params.slug] : ['general'];
  
  const page = generalSource.getPage(slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  // Check if this is the main general index page
  const isMainPage = params.slug === undefined || params.slug.length === 0;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {!isMainPage && (
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
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
            a: createRelativeLink(generalSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return generalSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug ? ['general', ...params.slug] : ['general'];
  const page = generalSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `https://docs.movementnetwork.xyz/general${slug.length > 1 ? '/' + slug.slice(1).join('/') : ''}`,
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
      title: page.data.title,
      description: page.data.description,
      images: ['/img/movementlabs-social-card.png'],
    },
  };
} 
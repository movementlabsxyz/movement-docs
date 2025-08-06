import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { MovementCard } from '@/components/MovementCard';
import { APIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/source';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    MovementCard,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    ...components,
  };
}

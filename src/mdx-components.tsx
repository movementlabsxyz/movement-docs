import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { MovementCard } from '@/components/MovementCard';
import { CustomAPIPage } from '@/components/CustomAPIPage';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    MovementCard,
    APIPage: CustomAPIPage,
    ...components,
  };
}

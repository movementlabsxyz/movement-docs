import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { MovementCard } from '@/components/MovementCard';
import { CustomAPIPage } from '@/components/CustomAPIPage';
import { TokenDistributionChart } from '@/components/TokenDistributionChart';
import { CumulativeVestingChart } from '@/components/CumulativeVestingChart';
import { TokenomicsFlowDiagram } from '@/components/TokenomicsFlowDiagram';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    MovementCard,
    APIPage: CustomAPIPage,
    TokenDistributionChart,
    CumulativeVestingChart,
    TokenomicsFlowDiagram,
    ...components,
  };
}

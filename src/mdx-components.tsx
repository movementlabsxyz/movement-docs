import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { MovementCard } from '@/components/MovementCard';
import { CustomAPIPage } from '@/components/CustomAPIPage';
import { TokenDistributionChart } from '@/components/TokenDistributionChart';
import { CumulativeVestingChart } from '@/components/CumulativeVestingChart';
import { TokenomicsFlowDiagram } from '@/components/TokenomicsFlowDiagram';
import { StakeLifecycleDiagram } from '@/components/StakeLifecycleDiagram';
import { DelegationPoolDiagram } from '@/components/DelegationPoolDiagram';
import { LazySyncDiagram } from '@/components/LazySyncDiagram';
import { GapDiagram } from '@/components/GapDiagram';
import { SharesComparisonDiagram } from '@/components/SharesComparisonDiagram';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    MovementCard,
    APIPage: CustomAPIPage,
    TokenDistributionChart,
    CumulativeVestingChart,
    TokenomicsFlowDiagram,
    StakeLifecycleDiagram,
    DelegationPoolDiagram,
    LazySyncDiagram,
    GapDiagram,
    SharesComparisonDiagram,
    ...components,
  };
}

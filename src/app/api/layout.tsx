import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { apiSource } from '@/lib/source';

const sidebarTabs = [
  {
    title: 'Build',
    description: 'Developer Documentation',
    url: '/devs',
  },
  {
    title: 'Learn',
    description: 'General Documentation',
    url: '/general',
  },
  {
    title: 'API',
    description: 'API Documentation',
    url: '/api',
  },
];

function rewriteUrls(node: any, base: string): any {
  const newNode = { ...node };
  if (newNode.url) {
    // Check if this is an external URL (starts with http:// or https://)
    if (newNode.url.startsWith('http://') || newNode.url.startsWith('https://')) {
      // Keep external URLs as-is
      return newNode;
    }
    
    const parts = newNode.url.split('/');
    const filtered = parts.filter((p: string) => Boolean(p) && p !== 'api');
    newNode.url = [base, ...filtered].join('/');
    if (!newNode.url.startsWith('/')) newNode.url = '/' + newNode.url;
  }
  if (newNode.children) {
    newNode.children = newNode.children.map((child: any) => rewriteUrls(child, base));
  }
  if (newNode.index) {
    newNode.index = rewriteUrls(newNode.index, base);
  }
  return newNode;
}

const filterTree = (tree: any) => {
  if (!tree?.children) return tree;
  const apiNode = tree.children.find((child: any) => child.name === 'API');
  const filtered = {
    ...tree,
    children: apiNode ? [rewriteUrls(apiNode, '/api')] : [],
  };
  console.log('Filtered sidebar tree for /api:', JSON.stringify(filtered, null, 2));
  return filtered;
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-bg relative min-h-screen">
      <DocsLayout
        tree={filterTree(apiSource.pageTree)}
        {...baseOptions}
        sidebar={{
          tabs: sidebarTabs,
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
} 
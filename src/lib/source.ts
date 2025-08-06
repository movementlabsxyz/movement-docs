import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createOpenAPI, attachFile } from 'fumadocs-openapi/server';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
const baseSource = docs.toFumadocsSource();

export const devsSource = loader({
  // it assigns a URL to your pages
  baseUrl: '/devs',
  source: baseSource,
});

export const generalSource = loader({
  // it assigns a URL to your pages
  baseUrl: '/general',
  source: baseSource,
});

export const apiSource = loader({
  // it assigns a URL to your pages
  baseUrl: '/api',
  source: baseSource,
  pageTree: {
    // adds a badge to each page item in page tree
    attachFile,
  },
});

export const openapi = createOpenAPI();

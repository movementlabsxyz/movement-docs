import { devsSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(devsSource, {
  // https://docs.orama.com/open-source/supported-languages
  language: 'english',
});

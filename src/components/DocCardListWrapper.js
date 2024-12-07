import React from 'react';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

export default function DocCardListWrapper({ items }) {
  return <DocCardList items={items} />;
} 
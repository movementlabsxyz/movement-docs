import React from 'react';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

const truncateDescription = (description, maxLength = 100) => {
  if (!description) return description;
  if (description.length <= maxLength) return description;
  return `${description.substring(0, maxLength).trim()}...`;
};

export default function CustomDocCardList({ items }) {
  const sidebarItems = items || useCurrentSidebarCategory().items;
  
  // Process items to truncate descriptions
  const processedItems = sidebarItems.map(item => ({
    ...item,
    description: truncateDescription(item.description)
  }));
  
  return (
    <div className="custom-card-container">
      <DocCardList items={processedItems} />
    </div>
  );
} 
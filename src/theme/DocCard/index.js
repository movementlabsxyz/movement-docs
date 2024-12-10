// src/theme/DocCard/index.js
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import MovementIcon from '@site/src/components/MovementIcon';
import styles from './styles.module.css';

function CardContainer({href, children}) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg')}>
      {children}
    </Link>
  );
}

function CardLayout({href, icon, title, description}) {
  return (
    <CardContainer href={href}>
      <div className="movement-icon">
        <MovementIcon />
      </div>
      <div className="card__content">
        <div className="card__header">
          <h2 className={clsx('text--truncate')} title={title}>
            {title}
          </h2>
        </div>
        {description && (
          <div className="card__body">
            <p>{description}</p>
          </div>
        )}
      </div>
    </CardContainer>
  );
}

function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      href={href}
      title={item.label}
      description={item.description}
    />
  );
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
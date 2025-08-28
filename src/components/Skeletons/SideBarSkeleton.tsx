'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from '../SideBar/sideBar.module.css';
import skeleton from './skeletons.module.css';

export const SideBarSkeleton: React.FC<{ cards?: number }> = ({
  cards = 3,
}) => {
  return (
    <div className={styles.sidebar__list}>
      {Array.from({ length: cards }).map((_, i) => (
        <div className={styles.sidebar__item} key={i}>
          <Skeleton className={skeleton.sidebarCard} />
        </div>
      ))}
    </div>
  );
};

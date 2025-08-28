'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import skeleton from './skeletons.module.css';

export const FiltersSkeleton: React.FC = () => (
  <div className={skeleton.filters}>
    <Skeleton className={skeleton.filtersItem} />
    <Skeleton className={skeleton.filtersItem} />
    <Skeleton className={skeleton.filtersItem} />
  </div>
);

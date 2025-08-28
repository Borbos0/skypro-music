'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import skeleton from './skeletons.module.css';

export const HeaderSkeleton: React.FC = () => (
  <div className={skeleton.header}>
    <Skeleton className={skeleton.title} />
  </div>
);

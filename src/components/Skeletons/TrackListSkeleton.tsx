'use client';
import React from 'react';
import { TrackRowSkeleton } from './TrackRowSkeleton';

export const TrackListSkeleton: React.FC<{ rows?: number }> = ({
  rows = 10,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TrackRowSkeleton key={i} />
      ))}
    </>
  );
};

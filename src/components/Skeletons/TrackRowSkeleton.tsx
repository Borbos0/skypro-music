'use client';
import Skeleton from 'react-loading-skeleton';
import React from 'react';
import styles from '../Track/track.module.css';
import skeleton from './skeletons.module.css';

type Props = { showCover?: boolean };

export const TrackRowSkeleton: React.FC<Props> = ({ showCover = true }) => {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {showCover ? (
              <Skeleton className={skeleton.cover} />
            ) : (
              <Skeleton className={skeleton.icon} />
            )}
          </div>
          <div className={styles.track__titleText}>
            <div>
              <Skeleton className={skeleton.title} />
            </div>
            <div className={styles.track__titleTextSpan}>
              <Skeleton className={skeleton.subtitle} />
            </div>
          </div>
        </div>

        <div className={styles.track__author}>
          <Skeleton className={skeleton.author} />
        </div>

        <div className={styles.track__album}>
          <Skeleton className={skeleton.album} />
        </div>

        <div className={styles.track__time}>
          <Skeleton className={skeleton.time} />
        </div>
      </div>
    </div>
  );
};

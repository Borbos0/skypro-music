'use client';
import '@/app/globals.css';
import styles from './main/page.module.css';
import Navigation from '@/components/Navigation/Navigation';
import SideBar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';
import { ReactNode } from 'react';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';
import { useInitFavorites } from '@/hooks/useInitFavorites';

export default function MusicLayout({ children }: { children: ReactNode }) {
  useInitAuth();
  useInitFavorites();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Navigation />
          <div className={styles.main__centerblock}>{children}</div>
          <SideBar />
        </main>
        <Bar />
      </div>
    </div>
  );
}

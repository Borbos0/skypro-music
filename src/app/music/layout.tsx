'use client';
import '@/app/globals.css';
import styles from './main/page.module.css';
import Navigation from '@/components/Navigation/Navigation';
import SideBar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';
import { ReactNode } from 'react';

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div className={styles.main__centerblock}>{children}</div>
          <SideBar />
        </main>
        <Bar />
      </div>
    </div>
  );
}

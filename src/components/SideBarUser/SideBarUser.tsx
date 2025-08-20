'use client';
import { useAppSelector } from '@/store/store';
import styles from '../SideBar/sideBar.module.css';

export default function SideBarUser() {
  const username = useAppSelector((state) => state.auth.username);
  return (
    <p className={styles.sidebar__personalName}>{username || 'Инкогнито'}</p>
  );
}

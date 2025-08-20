'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { access } = useAppSelector((state) => state.auth);

  const logout = async () => {
    dispatch(clearUser());
    router.push('/music/main');
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>
      <div
        className={styles.nav__burger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div
        className={classnames(styles.nav__menu, {
          [styles.nav__menu_hidden]: !isOpen,
        })}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          {access && (
            <li className={styles.menu__item}>
              <Link href="/music/playlist" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          )}
          <li className={styles.menu__item}>
            {access ? (
              <p className={styles.menu__link} onClick={logout}>
                Выйти
              </p>
            ) : (
              <Link href="/auth/signin" className={styles.menu__link}>
                Войти
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

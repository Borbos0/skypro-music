import Image from 'next/image';
import Link from 'next/link';
import styles from './sideBar.module.css';
import { useRouter } from 'next/navigation';
import SideBarUser from '../SideBarUser/SideBarUser';
import { useAppSelector } from '@/store/store';
import Skeleton from 'react-loading-skeleton';
import { SideBarSkeleton } from '../Skeletons';
import skeleton from '../Skeletons/skeletons.module.css';

export default function SideBar() {
  const router = useRouter();
  const { fetchIsLoading } = useAppSelector((state) => state.tracks);
  const username = useAppSelector((state) => state.auth.username);

  const logout = () => {
    localStorage.removeItem('userId');
    router.replace('/auth/signin');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        {username ? (
          <SideBarUser />
        ) : (
          <p className={styles.sidebar__personalName}>
            <Skeleton className={skeleton.sidebarUser} />
          </p>
        )}
        <div className={styles.sidebar__icon} onClick={logout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        {fetchIsLoading ? (
          <SideBarSkeleton cards={3} />
        ) : (
          <div className={styles.sidebar__list}>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/1">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist01.png"
                  alt="day's playlist"
                  width={250}
                  height={170}
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/2">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist02.png"
                  alt="day's playlist"
                  width={250}
                  height={170}
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/music/category/3">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist03.png"
                  alt="day's playlist"
                  width={250}
                  height={170}
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

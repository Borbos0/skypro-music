'use client';

import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setFilterSearch } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.tracks.filters.search);

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={(e) => dispatch(setFilterSearch(e.target.value))}
      />
    </div>
  );
}

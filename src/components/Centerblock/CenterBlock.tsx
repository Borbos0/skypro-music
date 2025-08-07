import classnames from 'classnames';
import styles from './centerBlock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { Track as TrackType } from '@/sharedTypes/sharedTypes';

interface CenterBlockProps {
  data: TrackType[];
  isLoading: boolean;
  title?: string;
  error?: string;
}

export default function CenterBlock({
  data,
  isLoading,
  title,
  error,
}: CenterBlockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title || 'Треки'}</h2>
      <Filter tracks={data} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {error ? (
            <div className={styles.errorText}>
              {error || 'Ошибка загрузки треков'}
            </div>
          ) : isLoading ? (
            <div className={styles.loadingText}>Загрузка треков...</div>
          ) : data.length === 0 ? (
            <div className={styles.emptyText}>Нет треков в этой категории</div>
          ) : (
            data.map((track) => (
              <Track key={track._id} track={track} playlist={data} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

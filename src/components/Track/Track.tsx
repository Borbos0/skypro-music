'use client';

import { formatTime } from '@/utils/helper';
import Link from 'next/link';
import styles from './track.module.css';
import { Track as TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';

type trackTypeProp = {
  track: TrackType;
};

export default function Track({ track }: trackTypeProp) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isPlayingCurrent = currentTrack?._id === track._id && isPlay;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
  };

  return (
    <div
      key={track._id}
      className={styles.playlist__item}
      onClick={onClickTrack}
    >
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isPlayingCurrent ? (
              <div className={styles.circle} />
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}

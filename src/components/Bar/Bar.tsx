'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useLikeTrack } from '@/hooks/useLikeTracks';
import Skeleton from 'react-loading-skeleton';
import skeleton from '../Skeletons/skeletons.module.css';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const shuffle = useAppSelector((state) => state.tracks.isShuffle);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);

  const {
    isLike,
    toggleLike,
    isLoading: likeLoading,
    errorMsg,
  } = useLikeTrack(currentTrack);

  useEffect(() => {
    if (currentTrack) {
      dispatch(setIsPlay(false));
      setTimeout(() => dispatch(setIsPlay(true)), 50);
    }
  }, [currentTrack, dispatch]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlay) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== 'AbortError') {
            console.warn('Play error:', error);
          }
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    dispatch(setIsPlay(!isPlay));
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    setIsLoadedTrack(true);
  };

  const onEnded = () => {
    onNextTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
      setCurrentTime(inputTime);
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  if (!currentTrack) return null;
  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        autoPlay
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={handlePlayPause}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                </svg>
              </div>
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={classnames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  isLoop && styles.btnActive,
                )}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                onClick={onToggleShuffle}
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  shuffle && styles.btnActive,
                )}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  {currentTrack ? (
                    <svg className={styles.trackPlay__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  ) : (
                    <Skeleton className={skeleton.barImage} />
                  )}
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack ? (
                      currentTrack.author
                    ) : (
                      <Skeleton className={skeleton.barAuthor} />
                    )}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack ? (
                      currentTrack.album
                    ) : (
                      <Skeleton className={skeleton.barAlbum} />
                    )}
                  </Link>
                </div>
              </div>
              <div className={styles.trackPlay__actions}>
                <svg
                  className={classnames(
                    styles.trackPlay__likeSvg,
                    isLike && styles.liked,
                    likeLoading && styles.disabled,
                  )}
                  role="button"
                  onClick={() => {
                    if (!likeLoading) toggleLike();
                  }}
                  aria-label={
                    isLike ? 'Убрать из избранного' : 'Добавить в избранное'
                  }
                >
                  <use
                    xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

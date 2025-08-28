'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';

export const useInitFavorites = () => {
  const dispatch = useAppDispatch();
  const { access } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!access) return;
    getFavoriteTracks(access)
      .then(tracks => dispatch(setFavoriteTracks(tracks)))
  }, [access, dispatch]);

};

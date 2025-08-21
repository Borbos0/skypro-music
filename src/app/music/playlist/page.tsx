'use client';

import CenterBlock from '@/components/Centerblock/CenterBlock';
import { useAppSelector } from '@/store/store';

export default function Playlist() {
  const { fetchError, fetchIsLoading, favoriteTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <CenterBlock
      tracks={favoriteTracks}
      isLoading={fetchIsLoading}
      error={fetchError}
      title={'Избранные треки'}
    />
  );
}

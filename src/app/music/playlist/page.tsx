'use client';

import CenterBlock from '@/components/Centerblock/CenterBlock';
import { Track } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function Playlist() {
  const {
    fetchError,
    fetchIsLoading,
    favoriteTracks,
    filters,
    filteredTracks,
  } = useAppSelector((state) => state.tracks);

  const [playlist, setPlaylist] = useState<Track[]>([]);

  useEffect(() => {
    const currentPlaylist =
      filters.authors.length ||
      filters.genres.length ||
      Boolean(filters.years) ||
      Boolean(filters.search?.trim())
        ? filteredTracks
        : favoriteTracks;
    setPlaylist(currentPlaylist);
  }, [filteredTracks, favoriteTracks]);

  return (
    <CenterBlock
      pagePlaylist={favoriteTracks}
      tracks={playlist}
      isLoading={fetchIsLoading}
      error={fetchError}
      title={'Избранные треки'}
    />
  );
}

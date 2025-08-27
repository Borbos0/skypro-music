'use client';

import CenterBlock from '@/components/Centerblock/CenterBlock';
import { Track } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const { fetchError, fetchIsLoading, filteredTracks, allTracks, filters } =
    useAppSelector((state) => state.tracks);

  const [playlist, setPlaylist] = useState<Track[]>([]);

  useEffect(() => {
    const currentPlaylist =
      filters.authors.length || filters.genres.length || Boolean(filters.years)
        ? filteredTracks
        : allTracks;
    setPlaylist(currentPlaylist);
  }, [filteredTracks, allTracks]);
  return (
    <CenterBlock
      pagePlaylist={allTracks}
      tracks={playlist}
      isLoading={fetchIsLoading}
      error={fetchError}
      title={'Треки'}
    />
  );
}

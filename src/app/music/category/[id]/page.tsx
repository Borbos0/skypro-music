'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import CenterBlock from '@/components/Centerblock/CenterBlock';
import { getSelectionById, getTracks } from '@/services/tracks/tracksApi';
import { Track } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('Категория');
  const [error, setError] = useState('');
  const { filteredTracks, filters } = useAppSelector((state) => state.tracks);
  const hasFilters = Boolean(
    filters.authors.length || filters.genres.length || filters.years,
  );
  const displayTracks = hasFilters ? filteredTracks : tracks;

  useEffect(() => {
    if (!id) return;

    const realId = (parseInt(id.toString()) + 1).toString();

    setIsLoading(true);
    setError('');

    Promise.all([getSelectionById(realId), getTracks()])
      .then(([selection, allTracks]) => {
        const selectedIds: number[] = selection.items;
        const filteredTracks = allTracks.filter((track) =>
          selectedIds.includes(track._id),
        );
        setTracks(filteredTracks);
        setTitle(selection.name || 'Категория');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data?.message ?? 'Ошибка запроса');
          } else if (error.request) {
            setError('Нет соединения с сервером');
          } else {
            setError('Неизвестная ошибка');
          }
        } else {
          setError('Ошибка клиента');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <CenterBlock
      pagePlaylist={tracks}
      tracks={displayTracks}
      isLoading={isLoading}
      title={title}
      error={error}
    />
  );
}

'use client';

import CenterBlock from '@/components/Centerblock/CenterBlock';
import { useEffect, useState } from 'react';
import { Track } from '@/sharedTypes/sharedTypes';
import { getTracks } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then((res) => {
        setTracks(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError('Что-то с интернетом');
          } else {
            setError('Неизвестная ошибка');
          }
          console.log(error.config);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return <CenterBlock data={tracks} isLoading={isLoading} error={error} />;
}

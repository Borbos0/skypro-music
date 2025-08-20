import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { getUniqueValueByKey } from '@/utils/helper';
import { FilterProvider } from '../FilterContext/FilterContext';
import { Track } from '@/sharedTypes/sharedTypes';

interface Props {
  tracks: Track[];
}

export default function Filter({ tracks }: Props) {
  const authors = getUniqueValueByKey(tracks ?? [], 'author');
  const genres = getUniqueValueByKey(tracks ?? [], 'genre');
  const years = Array.from(
    new Set(
      getUniqueValueByKey(tracks ?? [], 'release_date').map(
        (date) => date.split('-')[0],
      ),
    ),
  );

  return (
    <FilterProvider>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <FilterItem label="исполнителю" values={authors} />
        <FilterItem label="году выпуска" values={years} />
        <FilterItem label="жанру" values={genres} />
      </div>
    </FilterProvider>
  );
}

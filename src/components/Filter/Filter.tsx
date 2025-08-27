import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { getUniqueValueByKey } from '@/utils/helper';
import { FilterProvider } from '../FilterContext/FilterContext';
import { Track } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYear,
} from '@/store/features/trackSlice';

interface Props {
  tracks: Track[];
}

export default function Filter({ tracks }: Props) {
  const dispatch = useAppDispatch();
  const { filters, pagePlaylist } = useAppSelector((state) => state.tracks);

  const source = pagePlaylist.length ? pagePlaylist : (tracks ?? []);
  const authors = getUniqueValueByKey(source, 'author');
  const genres = getUniqueValueByKey(source, 'genre');
  const years = Array.from(
    new Set(
      getUniqueValueByKey(source, 'release_date').map(
        (date) => date.split('-')[0],
      ),
    ),
  );

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectGenres = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };

  const onSelectYear = (year: string) => {
    dispatch(setFilterYear(year));
  };

  return (
    <FilterProvider>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <FilterItem
          label="исполнителю"
          values={authors}
          onSelect={onSelectAuthor}
          selectedValues={filters.authors}
        />
        <FilterItem
          label="году выпуска"
          values={years}
          onSelect={onSelectYear}
          selectedValues={filters.years ? [filters.years] : []}
        />
        <FilterItem
          label="жанру"
          values={genres}
          onSelect={onSelectGenres}
          selectedValues={filters.genres}
        />
      </div>
    </FilterProvider>
  );
}

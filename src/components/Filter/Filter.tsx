import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { getUniqueValueByKey } from '@/utils/helper';
import { data } from '@/data';
import { FilterProvider } from '../FilterContext/FilterContext';

export default function Filter() {
  const authors = getUniqueValueByKey(data, 'author');
  const genres = getUniqueValueByKey(data, 'genre');
  const years = Array.from(
    new Set(
      getUniqueValueByKey(data, 'release_date').map(
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

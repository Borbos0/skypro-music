'use client';

import { useFilterContext } from '../FilterContext/FilterContext';
import styles from './filterItem.module.css';
import classNames from 'classnames';

interface IFilterItemProps {
  label: string;
  values: string[];
}

export default function FilterItem({ label, values }: IFilterItemProps) {
  const { openItem, setOpenItem } = useFilterContext();
  const isOpen = openItem === label;

  const handleToggle = () => {
    setOpenItem(isOpen ? null : label);
  };

  return (
    <div className={styles.filter__itemWrapper}>
      <button
        className={classNames(styles.filter__button, {
          [styles.activeButton]: isOpen,
        })}
        onClick={handleToggle}
      >
        {label}
      </button>

      {isOpen && (
        <div className={styles.filter__list}>
          <ul className={styles.filter__scroll}>
            {values.map((value) => (
              <li key={value} className={styles.filter__listItem}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

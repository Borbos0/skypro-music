'use client';

import { useFilterContext } from '../FilterContext/FilterContext';
import styles from './filterItem.module.css';
import classNames from 'classnames';

interface IFilterItemProps {
  label: string;
  values: string[];
  onSelect: (value: string) => void;
  selectedValues?: string[];
}

export default function FilterItem({
  label,
  values,
  onSelect,
  selectedValues = [],
}: IFilterItemProps) {
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
              <li
                key={value}
                className={classNames(
                  styles.filter__listItem,
                  selectedValues?.includes(value) && styles.activeItem,
                )}
                onClick={() => onSelect(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

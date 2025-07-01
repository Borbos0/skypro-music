'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  openItem: string | null;
  setOpenItem: (label: string | null) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <FilterContext.Provider value={{ openItem, setOpenItem }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('Проблема с контекстом, файл FilterContext.tsx');
  }
  return context;
};

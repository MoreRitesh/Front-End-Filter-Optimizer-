import React, { createContext, useContext, useState } from 'react';
import { FilterState, DataContextType, Row } from '../utils/types';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Row[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 100;
  
  const updateFilter = (column: string, values: number[]) => {
    setFilters(prev => ({ ...prev, [column]: new Set(values) }));
    setCurrentPage(0);
  };

  const value = {
    data,
    setData,
    filters,
    updateFilter,
    currentPage,
    setCurrentPage,
    rowsPerPage
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
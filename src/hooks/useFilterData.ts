import { useMemo } from 'react';
import { FilterState, Row } from '../utils/types';
import { getAvailableOptions } from '../utils/filterUtils';

export const useFilterData = (data: Row[], filters: FilterState) => {
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    
    return data.filter(row => 
      Object.entries(filters).every(([column, selected]) => 
        selected.size === 0 || selected.has(row[column])
      )
    );
  }, [data, filters]);

  const availableOptions = useMemo(() => {
    return getAvailableOptions(data, filters);
  }, [data, filters]);

  return { filteredData, availableOptions };
};
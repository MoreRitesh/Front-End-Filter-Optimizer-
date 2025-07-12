import { FilterState, Row, AvailableOptions } from './types';

export const getAvailableOptions = (
  data: Row[],
  currentFilters: FilterState
): AvailableOptions => {
  if (data.length === 0) {
    return {};
  }
  
  const columns = Object.keys(data[0]);
  const result: AvailableOptions = {};
  
  columns.forEach(col => {
    const otherFilters = { ...currentFilters };
    delete otherFilters[col];
    
    let tempData = data;
    Object.entries(otherFilters).forEach(([c, selected]) => {
      if (selected.size > 0) {
        tempData = tempData.filter(row => selected.has(row[c]));
      }
    });
    
    const values = new Set<number>();
    tempData.forEach(row => values.add(row[col]));
    result[col] = Array.from(values).sort((a, b) => a - b);
  });
  
  return result;
};

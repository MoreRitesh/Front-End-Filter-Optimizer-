import React, { useEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { fetchDataset } from '../utils/dataUtils';
import FilterDropdown from './FilterDropdown';
import DataTable from './DataTable';
import { useFilterData } from '../hooks/useFilterData';

const Dashboard: React.FC = () => {
  const { data, setData, filters, updateFilter } = useData();
  const { availableOptions } = useFilterData(data, filters);

  // Load large dataset for real filter behavior
  useEffect(() => {
    const loadData = async () => {
      const dataset = await fetchDataset('large'); // ✅ load large dataset
      setData(dataset);
    };
    loadData();
  }, [setData]);

  const columns = useMemo(() => {
    return data[0] ? Object.keys(data[0]) : [];
  }, [data]);

  return (
    <div className="dashboard">
      <div className="filters-container">
        {columns.map((column) => (
          <FilterDropdown
            key={column}
            column={column}
            selected={filters[column] || new Set()}
            availableOptions={availableOptions[column] || []}
            onSelect={(values) => updateFilter(column, values)}
          />
        ))}
      </div>

      <DataTable />
    </div>
  );
};

export default Dashboard;

import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import TableRow from './TableRow';
import { useFilterData } from '../hooks/useFilterData';

const DataTable: React.FC = () => {
  const { 
    data,
    filters,
    currentPage, 
    setCurrentPage, 
    rowsPerPage 
  } = useData();
  
  const { filteredData } = useFilterData(data, filters);
  
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const pageData = useMemo(() => {
    const start = currentPage * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const columns = useMemo(() => {
    return data[0] ? Object.keys(data[0]) : [];
  }, [data]);

  return (
    <div className="data-table">
      <div className="pagination-controls">
        <button 
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          Previous
        </button>
        
        <span>Page {currentPage + 1} of {pageCount}</span>
        
        <button 
          disabled={currentPage >= pageCount - 1}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, index) => (
              <TableRow 
                key={`row-${index}`} 
                row={row} 
                columns={columns} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
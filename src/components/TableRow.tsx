import React from 'react';
import { Row } from '../utils/types';

interface TableRowProps {
  row: Row;
  columns: string[];
}

const TableRow: React.FC<TableRowProps> = ({ row, columns }) => {
  return (
    <tr>
      {columns.map(col => (
        <td key={`${col}-${row[col]}`}>{row[col]}</td>
      ))}
    </tr>
  );
};

export default TableRow;
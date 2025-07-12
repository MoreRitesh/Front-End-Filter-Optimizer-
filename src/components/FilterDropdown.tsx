import React, { useState, useMemo } from 'react';
import { AvailableOptions } from '../utils/types';

interface FilterDropdownProps {
  column: string;
  selected: Set<number>;
  availableOptions: number[];
  onSelect: (values: number[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  column, 
  selected, 
  availableOptions,
  onSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return availableOptions;
    return availableOptions.filter(opt => 
      opt.toString().includes(searchTerm)
    );
  }, [availableOptions, searchTerm]);

  const toggleOption = (value: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }
    onSelect(Array.from(newSelected));
  };

  return (
    <div className="filter-dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>
        {column} {selected.size > 0 ? `(${selected.size})` : ''}
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="options-list">
            {filteredOptions.map(opt => (
              <div key={opt} className="option-item">
                <input
                  type="checkbox"
                  id={`${column}-${opt}`}
                  checked={selected.has(opt)}
                  onChange={() => toggleOption(opt)}
                />
                <label htmlFor={`${column}-${opt}`}>{opt}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
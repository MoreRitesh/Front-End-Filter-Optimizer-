export type Row = Record<string, number>;
export type FilterState = Record<string, Set<number>>;
export type AvailableOptions = Record<string, number[]>;

export interface DataContextType {
  data: Row[];
  setData: React.Dispatch<React.SetStateAction<Row[]>>;
  filters: FilterState;
  updateFilter: (column: string, values: number[]) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
}

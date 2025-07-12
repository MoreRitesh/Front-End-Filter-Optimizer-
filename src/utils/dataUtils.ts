import { Row } from './types';

/**
 * Parses a CSV string into an array of Row objects.
 * Safely converts strings to numbers and logs invalid rows.
 */
export const parseCSV = (csv: string): Row[] => {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map((line, idx) => {
    const values = line.split(',').map(v => {
      const parsed = parseInt(v.trim(), 10);
      return isNaN(parsed) ? null : parsed;
    });

    // Log a warning if there's any invalid value
    if (values.includes(null)) {
      console.warn(`⚠️ CSV line ${idx + 2} contains invalid data:`, line);
    }

    const row: Row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] ?? NaN;
    });

    return row;
  });
};

/**
 * Fetches a dataset CSV ('small' or 'large') from the public folder
 * and parses it into structured data.
 * 
 * File path: public/data/dataset_small.csv or dataset_large.csv
 */
export const fetchDataset = async (dataset: 'small' | 'large'): Promise<Row[]> => {
  try {
    const response = await fetch(`/data/dataset_large.csv`);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }
    const csv = await response.text();
    return parseCSV(csv);
  } catch (error) {
    console.error("❌ Error loading dataset:", error);
    return [];
  }
};

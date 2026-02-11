import { type CSSProperties, type ReactNode } from 'react';

interface Column {
  key: string;
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  emptyMessage?: string;
}

export const DataTable = ({
  columns,
  data,
  emptyMessage = 'No data available',
}: DataTableProps) => {
  if (data.length === 0) {
    return (
      <div style={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} style={styles.tr}>
              {columns.map((col) => (
                <td key={col.key} style={styles.td}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  wrapper: {
    overflowX: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: 12,
    fontWeight: 600,
    color: '#718096',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    borderBottom: '2px solid #e2e8f0',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #edf2f7',
  },
  td: {
    padding: '12px 16px',
    fontSize: 14,
    color: '#2d3748',
  },
  empty: {
    padding: 40,
    textAlign: 'center' as const,
    color: '#a0aec0',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
};

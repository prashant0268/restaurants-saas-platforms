import type { CSSProperties, ReactNode } from 'react';
import type { PricingFeature } from '../../data/mockPricing';

interface FeatureComparisonTableProps {
  features: PricingFeature[];
}

const styles: Record<string, CSSProperties> = {
  container: {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    textAlign: 'center' as const,
    padding: '16px',
    borderBottom: '2px solid #e5e7eb',
    color: '#111827',
    fontWeight: 600,
    fontSize: '15px',
    backgroundColor: '#f9fafb',
  },
  thFeature: {
    textAlign: 'left' as const,
    padding: '16px 20px',
    borderBottom: '2px solid #e5e7eb',
    color: '#111827',
    fontWeight: 600,
    fontSize: '15px',
    backgroundColor: '#f9fafb',
    width: '45%',
  },
  td: {
    textAlign: 'center' as const,
    padding: '14px 16px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
  },
  tdFeature: {
    textAlign: 'left' as const,
    padding: '14px 20px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
    fontWeight: 500,
  },
  check: {
    color: '#0d9488',
    fontSize: '18px',
    fontWeight: 700,
  },
  dash: {
    color: '#d1d5db',
    fontSize: '18px',
  },
  text: {
    fontSize: '13px',
    color: '#6b7280',
  },
};

export const FeatureComparisonTable = ({ features }: FeatureComparisonTableProps) => {
  const renderCell = (value: boolean | string): ReactNode => {
    if (value === true) {
      return <span style={styles.check}>&#10003;</span>;
    }
    if (value === false) {
      return <span style={styles.dash}>&mdash;</span>;
    }
    return <span style={styles.text}>{value}</span>;
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thFeature}>Feature</th>
            <th style={styles.th}>Professional</th>
            <th style={styles.th}>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.name}>
              <td style={styles.tdFeature}>{feature.name}</td>
              <td style={styles.td}>{renderCell(feature.professional)}</td>
              <td style={styles.td}>{renderCell(feature.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

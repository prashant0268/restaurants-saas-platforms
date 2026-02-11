interface MetricsChartProps {
  title: string;
  height?: number;
  description?: string;
}

export const MetricsChart = ({
  title,
  height = 300,
  description,
}: MetricsChartProps) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        {description && <p style={styles.description}>{description}</p>}
      </div>
      <div
        style={{
          ...styles.placeholder,
          height,
        }}
      >
        <div style={styles.placeholderContent}>
          <span style={styles.placeholderIcon}>📊</span>
          <p style={styles.placeholderText}>Chart: {title}</p>
          <p style={styles.placeholderSubtext}>
            Integrate charting library (e.g., Recharts, Chart.js)
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#2d3748',
  },
  description: {
    margin: '4px 0 0',
    fontSize: 13,
    color: '#718096',
  },
  placeholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 6,
    border: '2px dashed #e2e8f0',
  },
  placeholderContent: {
    textAlign: 'center' as const,
  },
  placeholderIcon: {
    fontSize: 32,
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#4a5568',
    margin: '8px 0 4px',
  },
  placeholderSubtext: {
    fontSize: 12,
    color: '#a0aec0',
    margin: 0,
  },
};

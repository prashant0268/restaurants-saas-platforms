interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
}: StatsCardProps) => {
  const changeColor =
    changeType === 'positive'
      ? '#38a169'
      : changeType === 'negative'
        ? '#e53e3e'
        : '#718096';

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
        {icon && <span style={styles.icon}>{icon}</span>}
      </div>
      <div style={styles.value}>{value}</div>
      {change && (
        <div style={{ ...styles.change, color: changeColor }}>
          {change}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    border: '1px solid #e2e8f0',
    minWidth: 200,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    color: '#718096',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  icon: {
    fontSize: 20,
  },
  value: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: 4,
  },
  change: {
    fontSize: 13,
    fontWeight: 500,
  },
};

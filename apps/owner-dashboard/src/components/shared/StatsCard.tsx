interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export const StatsCard = ({ title, value, change, changeType = 'neutral' }: StatsCardProps) => {
  const changeColor = changeType === 'positive' ? '#22C55E' : changeType === 'negative' ? '#EF4444' : '#737373';

  return (
    <div style={styles.card}>
      <p style={styles.title}>{title}</p>
      <p style={styles.value}>{value}</p>
      {change && (
        <p style={{ ...styles.change, color: changeColor }}>{change}</p>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    border: '1px solid #E5E5E5',
    minWidth: 200,
  },
  title: {
    margin: 0,
    fontSize: 13,
    color: '#737373',
    marginBottom: 8,
  },
  value: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: '#171717',
  },
  change: {
    margin: 0,
    marginTop: 4,
    fontSize: 12,
  },
};

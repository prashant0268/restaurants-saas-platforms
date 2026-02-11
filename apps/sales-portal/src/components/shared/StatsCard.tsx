import type { CSSProperties, ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const styles: Record<string, CSSProperties> = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    flex: '1',
    minWidth: '200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#6b7280',
    margin: 0,
  },
  icon: {
    fontSize: '24px',
    opacity: 0.7,
  },
  value: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  trendPositive: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#059669',
  },
  trendNegative: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#dc2626',
  },
};

export const StatsCard = ({ title, value, icon, trend, color }: StatsCardProps) => {
  const cardStyle: CSSProperties = {
    ...styles.card,
    borderTop: color ? `3px solid ${color}` : undefined,
  };

  return (
    <div style={cardStyle}>
      <div style={styles.header}>
        <p style={styles.title}>{title}</p>
        {icon && <span style={styles.icon}>{icon}</span>}
      </div>
      <p style={styles.value}>{value}</p>
      {trend && (
        <span style={trend.isPositive ? styles.trendPositive : styles.trendNegative}>
          {trend.isPositive ? '+' : ''}{trend.value}% vs last month
        </span>
      )}
    </div>
  );
};

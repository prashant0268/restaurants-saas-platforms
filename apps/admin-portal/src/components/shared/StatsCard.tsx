import type { CSSProperties, ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: string;
}

const styles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '200px',
    flex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#6b7280',
    margin: 0,
  },
  value: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  trendUp: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#10b981',
  },
  trendDown: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#ef4444',
  },
  trendNeutral: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#6b7280',
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
};

const trendArrows: Record<string, string> = {
  up: '+',
  down: '-',
  neutral: '',
};

const trendStyles: Record<string, CSSProperties> = {
  up: styles.trendUp,
  down: styles.trendDown,
  neutral: styles.trendNeutral,
};

export const StatsCard = ({
  title,
  value,
  icon,
  trend,
  color = '#3b82f6',
}: StatsCardProps) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <p style={styles.title}>{title}</p>
        {icon && (
          <div style={{ ...styles.iconWrapper, backgroundColor: `${color}15`, color }}>
            {icon}
          </div>
        )}
      </div>
      <p style={styles.value}>{value}</p>
      {trend && (
        <span style={trendStyles[trend.direction]}>
          {trendArrows[trend.direction]}{Math.abs(trend.value)}% from last month
        </span>
      )}
    </div>
  );
};

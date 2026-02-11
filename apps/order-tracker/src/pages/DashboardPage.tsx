import { type CSSProperties, useState } from 'react';

interface StatItem {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
}

export const DashboardPage = () => {
  const [stats] = useState<StatItem[]>([
    { label: 'Active Deliveries', value: 24, trend: 'up' },
    { label: 'Avg Delivery Time', value: '28 min', trend: 'down' },
    { label: 'Orders Today', value: 187, trend: 'up' },
    { label: 'On-Time Rate', value: '94%', trend: 'neutral' },
    { label: 'Drivers Online', value: 12, trend: 'neutral' },
    { label: 'Pending Orders', value: 8, trend: 'down' },
  ]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Live Dashboard</h1>

      <div style={styles.statsBar}>
        {stats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <span style={styles.statValue}>{stat.value}</span>
            <span style={styles.statLabel}>{stat.label}</span>
            {stat.trend && (
              <span
                style={{
                  ...styles.statTrend,
                  color:
                    stat.trend === 'up'
                      ? '#22c55e'
                      : stat.trend === 'down'
                        ? '#ef4444'
                        : '#9ca3af',
                }}
              >
                {stat.trend === 'up' ? '+' : stat.trend === 'down' ? '-' : '~'}
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={styles.mapContainer}>
        <div style={styles.mapPlaceholder}>
          <span style={styles.mapText}>
            Live Delivery Map
          </span>
          <span style={styles.mapSubtext}>
            Map integration will render here (e.g., Google Maps / Mapbox)
          </span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    padding: 24,
  },
  heading: {
    margin: '0 0 20px',
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '16px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    position: 'relative',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  statTrend: {
    position: 'absolute',
    top: 12,
    right: 16,
    fontSize: 18,
    fontWeight: 700,
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    backgroundColor: '#e8edf2',
    borderRadius: 8,
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #bcc5d1',
  },
  mapText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#5a6577',
  },
  mapSubtext: {
    fontSize: 14,
    color: '#8899aa',
    marginTop: 8,
  },
};

import { type CSSProperties, useState } from 'react';

type TimeRange = '24h' | '7d' | '30d' | '90d';

interface MetricCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface DailyMetric {
  date: string;
  orders: number;
  avgDeliveryTime: number;
  completionRate: number;
}

const MOCK_METRICS: Record<TimeRange, MetricCard[]> = {
  '24h': [
    { label: 'Total Orders', value: '187', change: '+12%', positive: true },
    { label: 'Avg Delivery Time', value: '28 min', change: '-3 min', positive: true },
    { label: 'Completion Rate', value: '94.2%', change: '+1.1%', positive: true },
    { label: 'Cancelled Orders', value: '6', change: '+2', positive: false },
    { label: 'Avg Order Value', value: '$34.50', change: '+$2.10', positive: true },
    { label: 'Peak Hour Orders', value: '42/hr', change: '+5/hr', positive: true },
  ],
  '7d': [
    { label: 'Total Orders', value: '1,284', change: '+8%', positive: true },
    { label: 'Avg Delivery Time', value: '26 min', change: '-2 min', positive: true },
    { label: 'Completion Rate', value: '95.1%', change: '+0.5%', positive: true },
    { label: 'Cancelled Orders', value: '38', change: '-4', positive: true },
    { label: 'Avg Order Value', value: '$32.80', change: '-$0.50', positive: false },
    { label: 'Peak Hour Orders', value: '38/hr', change: '+2/hr', positive: true },
  ],
  '30d': [
    { label: 'Total Orders', value: '5,420', change: '+15%', positive: true },
    { label: 'Avg Delivery Time', value: '27 min', change: '-4 min', positive: true },
    { label: 'Completion Rate', value: '94.8%', change: '+2.0%', positive: true },
    { label: 'Cancelled Orders', value: '145', change: '-12', positive: true },
    { label: 'Avg Order Value', value: '$33.20', change: '+$1.30', positive: true },
    { label: 'Peak Hour Orders', value: '45/hr', change: '+8/hr', positive: true },
  ],
  '90d': [
    { label: 'Total Orders', value: '15,890', change: '+22%', positive: true },
    { label: 'Avg Delivery Time', value: '29 min', change: '-5 min', positive: true },
    { label: 'Completion Rate', value: '93.5%', change: '+3.2%', positive: true },
    { label: 'Cancelled Orders', value: '480', change: '-35', positive: true },
    { label: 'Avg Order Value', value: '$31.90', change: '+$0.80', positive: true },
    { label: 'Peak Hour Orders', value: '50/hr', change: '+10/hr', positive: true },
  ],
};

const MOCK_DAILY: DailyMetric[] = [
  { date: 'Mon', orders: 175, avgDeliveryTime: 26, completionRate: 95.2 },
  { date: 'Tue', orders: 192, avgDeliveryTime: 28, completionRate: 93.8 },
  { date: 'Wed', orders: 168, avgDeliveryTime: 25, completionRate: 96.0 },
  { date: 'Thu', orders: 205, avgDeliveryTime: 30, completionRate: 92.5 },
  { date: 'Fri', orders: 238, avgDeliveryTime: 32, completionRate: 91.0 },
  { date: 'Sat', orders: 256, avgDeliveryTime: 34, completionRate: 90.5 },
  { date: 'Sun', orders: 210, avgDeliveryTime: 29, completionRate: 94.0 },
];

export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const metrics = MOCK_METRICS[timeRange];
  const maxOrders = Math.max(...MOCK_DAILY.map((d) => d.orders));

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.heading}>Analytics</h1>
        <div style={styles.timeButtons}>
          {(['24h', '7d', '30d', '90d'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                ...styles.timeButton,
                backgroundColor: timeRange === range ? '#1a1a2e' : '#fff',
                color: timeRange === range ? '#fff' : '#555',
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.metricsGrid}>
        {metrics.map((metric) => (
          <div key={metric.label} style={styles.metricCard}>
            <span style={styles.metricLabel}>{metric.label}</span>
            <span style={styles.metricValue}>{metric.value}</span>
            <span
              style={{
                ...styles.metricChange,
                color: metric.positive ? '#16a34a' : '#dc2626',
              }}
            >
              {metric.change}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.chartSection}>
        <h2 style={styles.chartTitle}>Daily Order Volume (This Week)</h2>
        <div style={styles.chartContainer}>
          {MOCK_DAILY.map((day) => (
            <div key={day.date} style={styles.barGroup}>
              <span style={styles.barValue}>{day.orders}</span>
              <div
                style={{
                  ...styles.bar,
                  height: `${(day.orders / maxOrders) * 200}px`,
                }}
              />
              <span style={styles.barLabel}>{day.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.tableSection}>
        <h2 style={styles.chartTitle}>Daily Breakdown</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Day</th>
              <th style={styles.th}>Orders</th>
              <th style={styles.th}>Avg Delivery Time</th>
              <th style={styles.th}>Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DAILY.map((day) => (
              <tr key={day.date}>
                <td style={styles.td}>{day.date}</td>
                <td style={styles.td}>{day.orders}</td>
                <td style={styles.td}>{day.avgDeliveryTime} min</td>
                <td style={styles.td}>{day.completionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    padding: 24,
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  heading: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  timeButtons: {
    display: 'flex',
    gap: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
  },
  timeButton: {
    padding: '6px 14px',
    border: 'none',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    marginBottom: 32,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '16px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#888',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  metricChange: {
    fontSize: 13,
    fontWeight: 600,
  },
  chartSection: {
    marginBottom: 32,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1a1a2e',
    margin: '0 0 16px',
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 16,
    padding: '20px 24px',
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    height: 280,
  },
  barGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555',
  },
  bar: {
    width: '100%',
    maxWidth: 48,
    backgroundColor: '#3b82f6',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.3s ease',
  },
  barLabel: {
    fontSize: 12,
    color: '#888',
  },
  tableSection: {
    marginBottom: 24,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: 13,
    fontWeight: 600,
    color: '#555',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '12px 16px',
    fontSize: 14,
    color: '#333',
    borderBottom: '1px solid #f3f4f6',
  },
};

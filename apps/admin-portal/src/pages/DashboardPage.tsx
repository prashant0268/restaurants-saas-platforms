import type { CSSProperties } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';

const styles: Record<string, CSSProperties> = {
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  placeholder: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '48px 24px',
    textAlign: 'center' as const,
    color: '#9ca3af',
    fontSize: '14px',
    border: '1px dashed #e5e7eb',
  },
  activityItem: {
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
    color: '#374151',
  },
  alertItem: {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 500,
  },
  alertWarning: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  alertInfo: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  alertError: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
};

export const DashboardPage = () => {
  return (
    <PageContainer title="Dashboard">
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
        Platform Overview
      </h1>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        <StatsCard
          title="Total Restaurants"
          value="1,248"
          color="#3b82f6"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          title="Total Users"
          value="45,832"
          color="#10b981"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatsCard
          title="Total Orders"
          value="128,456"
          color="#f59e0b"
          trend={{ value: 5, direction: 'up' }}
        />
        <StatsCard
          title="Revenue"
          value="$2.4M"
          color="#8b5cf6"
          trend={{ value: 3, direction: 'down' }}
        />
      </div>

      {/* Charts + Activity */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Revenue & Orders Chart</h3>
          <div style={styles.placeholder}>
            Chart placeholder -- Integrate with charting library (e.g., Recharts)
            to display revenue trends and order volume over time
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Recent Activity</h3>
          <div style={styles.activityItem}>
            New restaurant &quot;Pizza Palace&quot; registered
          </div>
          <div style={styles.activityItem}>
            Driver John D. approved for onboarding
          </div>
          <div style={styles.activityItem}>
            Order #12456 flagged for review
          </div>
          <div style={styles.activityItem}>
            Support ticket #891 escalated
          </div>
          <div style={styles.activityItem}>
            Restaurant &quot;Sushi Hub&quot; suspended
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Alerts & Notifications</h3>
        <div style={{ ...styles.alertItem, ...styles.alertWarning }}>
          15 restaurants pending approval -- review required
        </div>
        <div style={{ ...styles.alertItem, ...styles.alertError }}>
          3 drivers reported for policy violations
        </div>
        <div style={{ ...styles.alertItem, ...styles.alertInfo }}>
          System maintenance scheduled for tonight at 2:00 AM UTC
        </div>
        <div style={{ ...styles.alertItem, ...styles.alertWarning }}>
          7 support tickets unresolved for more than 48 hours
        </div>
      </div>
    </PageContainer>
  );
};

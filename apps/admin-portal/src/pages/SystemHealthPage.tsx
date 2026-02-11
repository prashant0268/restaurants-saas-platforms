import type { CSSProperties } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';
import { StatusBadge } from '../components/shared/StatusBadge';

const styles: Record<string, CSSProperties> = {
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 24px 0',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
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
  serviceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  serviceName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
  },
  serviceLatency: {
    fontSize: '13px',
    color: '#6b7280',
    marginLeft: '12px',
  },
  logEntry: {
    padding: '10px 12px',
    borderRadius: '6px',
    marginBottom: '8px',
    fontSize: '13px',
    fontFamily: 'monospace',
    lineHeight: '1.5',
  },
  logInfo: {
    backgroundColor: '#f0fdf4',
    color: '#166534',
    borderLeft: '3px solid #22c55e',
  },
  logWarning: {
    backgroundColor: '#fefce8',
    color: '#854d0e',
    borderLeft: '3px solid #eab308',
  },
  logError: {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    borderLeft: '3px solid #ef4444',
  },
  logTime: {
    color: '#9ca3af',
    marginRight: '8px',
  },
};

export const SystemHealthPage = () => {
  return (
    <PageContainer title="System Health">
      <h1 style={styles.title}>System Health &amp; Monitoring</h1>

      {/* Health Stats */}
      <div style={styles.statsRow}>
        <StatsCard title="Uptime" value="99.97%" color="#10b981" />
        <StatsCard title="Avg Response Time" value="142ms" color="#3b82f6" />
        <StatsCard title="Error Rate" value="0.03%" color="#ef4444" />
        <StatsCard title="Active Connections" value="12,456" color="#8b5cf6" />
      </div>

      <div style={styles.grid}>
        {/* Service Status */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Service Status</h3>
          <div style={styles.serviceRow}>
            <div>
              <span style={styles.serviceName}>API Gateway</span>
              <span style={styles.serviceLatency}>42ms</span>
            </div>
            <StatusBadge status="active" label="Operational" />
          </div>
          <div style={styles.serviceRow}>
            <div>
              <span style={styles.serviceName}>Authentication Service</span>
              <span style={styles.serviceLatency}>28ms</span>
            </div>
            <StatusBadge status="active" label="Operational" />
          </div>
          <div style={styles.serviceRow}>
            <div>
              <span style={styles.serviceName}>Order Processing</span>
              <span style={styles.serviceLatency}>156ms</span>
            </div>
            <StatusBadge status="active" label="Operational" />
          </div>
          <div style={styles.serviceRow}>
            <div>
              <span style={styles.serviceName}>Payment Gateway</span>
              <span style={styles.serviceLatency}>234ms</span>
            </div>
            <StatusBadge status="pending" label="Degraded" />
          </div>
          <div style={styles.serviceRow}>
            <div>
              <span style={styles.serviceName}>Notification Service</span>
              <span style={styles.serviceLatency}>18ms</span>
            </div>
            <StatusBadge status="active" label="Operational" />
          </div>
          <div style={styles.serviceRow}>
            <div>
              <span style={styles.serviceName}>Cloud Storage</span>
              <span style={styles.serviceLatency}>95ms</span>
            </div>
            <StatusBadge status="active" label="Operational" />
          </div>
          <div style={styles.serviceRow}>
            <div>
              <span style={styles.serviceName}>Search Index</span>
              <span style={styles.serviceLatency}>67ms</span>
            </div>
            <StatusBadge status="active" label="Operational" />
          </div>
        </div>

        {/* Performance Charts */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Performance Metrics</h3>
          <div style={styles.placeholder}>
            Performance chart placeholder -- Display CPU usage, memory
            utilization, request throughput, and response time trends
            over the last 24 hours
          </div>
        </div>

        {/* System Logs */}
        <div style={{ ...styles.card, gridColumn: '1 / -1' }}>
          <h3 style={styles.cardTitle}>Recent System Logs</h3>
          <div style={{ ...styles.logEntry, ...styles.logInfo }}>
            <span style={styles.logTime}>[2026-02-09 14:30:22]</span>
            INFO: Deployment v2.4.1 completed successfully. All services restarted.
          </div>
          <div style={{ ...styles.logEntry, ...styles.logWarning }}>
            <span style={styles.logTime}>[2026-02-09 14:15:08]</span>
            WARN: Payment gateway response time exceeded 200ms threshold (234ms avg).
          </div>
          <div style={{ ...styles.logEntry, ...styles.logInfo }}>
            <span style={styles.logTime}>[2026-02-09 13:45:00]</span>
            INFO: Database backup completed. Size: 2.4GB. Duration: 45s.
          </div>
          <div style={{ ...styles.logEntry, ...styles.logError }}>
            <span style={styles.logTime}>[2026-02-09 12:30:15]</span>
            ERROR: Failed to process order #12460 -- Retry attempt 1/3 initiated.
          </div>
          <div style={{ ...styles.logEntry, ...styles.logInfo }}>
            <span style={styles.logTime}>[2026-02-09 12:00:00]</span>
            INFO: Scheduled maintenance window opened. Non-critical services paused.
          </div>
          <div style={{ ...styles.logEntry, ...styles.logWarning }}>
            <span style={styles.logTime}>[2026-02-09 11:22:33]</span>
            WARN: Memory usage on worker-3 reached 82%. Scaling up initiated.
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

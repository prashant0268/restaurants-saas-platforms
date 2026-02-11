import { type CSSProperties, useState } from 'react';

type AlertSeverity = 'critical' | 'warning' | 'info';
type AlertCategory = 'delayed' | 'escalation' | 'issue';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: AlertCategory;
  orderId?: string;
  restaurant?: string;
  timestamp: string;
  acknowledged: boolean;
}

const SEVERITY_STYLES: Record<AlertSeverity, { bg: string; border: string; text: string }> = {
  critical: { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626' },
  warning: { bg: '#fffbeb', border: '#fcd34d', text: '#d97706' },
  info: { bg: '#eff6ff', border: '#93c5fd', text: '#2563eb' },
};

const MOCK_ALERTS: Alert[] = [
  { id: '1', title: 'Order delayed 30+ minutes', description: 'ORD-042 at Pizza Palace has exceeded expected delivery time by 32 minutes.', severity: 'critical', category: 'delayed', orderId: 'ORD-042', restaurant: 'Pizza Palace', timestamp: '2 min ago', acknowledged: false },
  { id: '2', title: 'Customer escalation', description: 'Customer for ORD-038 has called twice about missing items.', severity: 'critical', category: 'escalation', orderId: 'ORD-038', restaurant: 'Burger Barn', timestamp: '5 min ago', acknowledged: false },
  { id: '3', title: 'Restaurant not responding', description: 'Sushi Stop has not confirmed 3 orders in the last 15 minutes.', severity: 'warning', category: 'issue', restaurant: 'Sushi Stop', timestamp: '8 min ago', acknowledged: false },
  { id: '4', title: 'Driver GPS signal lost', description: 'Driver Carlos R. last known location was 12 min ago.', severity: 'warning', category: 'issue', timestamp: '10 min ago', acknowledged: true },
  { id: '5', title: 'High order volume alert', description: 'Pizza Palace has received 15 orders in the last 30 minutes, exceeding normal capacity.', severity: 'info', category: 'issue', restaurant: 'Pizza Palace', timestamp: '15 min ago', acknowledged: true },
  { id: '6', title: 'Order delayed 20+ minutes', description: 'ORD-039 at Taco Town is 22 minutes past estimated delivery.', severity: 'warning', category: 'delayed', orderId: 'ORD-039', restaurant: 'Taco Town', timestamp: '18 min ago', acknowledged: false },
];

export const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'all'>('all');

  const filteredAlerts = alerts.filter(
    (a) => filterSeverity === 'all' || a.severity === filterSeverity,
  );

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    );
  };

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.heading}>
          Alerts
          {unacknowledgedCount > 0 && (
            <span style={styles.countBadge}>{unacknowledgedCount}</span>
          )}
        </h1>

        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value as AlertSeverity | 'all')}
          style={styles.select}
          aria-label="Filter by severity"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div style={styles.alertList}>
        {filteredAlerts.length === 0 && (
          <div style={styles.empty}>No alerts to display.</div>
        )}
        {filteredAlerts.map((alert) => {
          const severityStyle = SEVERITY_STYLES[alert.severity];
          return (
            <div
              key={alert.id}
              style={{
                ...styles.alertCard,
                backgroundColor: severityStyle.bg,
                borderLeftColor: severityStyle.border,
                opacity: alert.acknowledged ? 0.7 : 1,
              }}
            >
              <div style={styles.alertHeader}>
                <div>
                  <span
                    style={{
                      ...styles.severityLabel,
                      color: severityStyle.text,
                    }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                  <span style={styles.categoryLabel}>
                    {alert.category}
                  </span>
                </div>
                <span style={styles.timestamp}>{alert.timestamp}</span>
              </div>

              <h3 style={styles.alertTitle}>{alert.title}</h3>
              <p style={styles.alertDesc}>{alert.description}</p>

              <div style={styles.alertFooter}>
                <div style={styles.alertMeta}>
                  {alert.orderId && (
                    <span style={styles.metaTag}>{alert.orderId}</span>
                  )}
                  {alert.restaurant && (
                    <span style={styles.metaTag}>{alert.restaurant}</span>
                  )}
                </div>
                {!alert.acknowledged && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    style={styles.ackButton}
                  >
                    Acknowledge
                  </button>
                )}
                {alert.acknowledged && (
                  <span style={styles.ackLabel}>Acknowledged</span>
                )}
              </div>
            </div>
          );
        })}
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
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  heading: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  countBadge: {
    fontSize: 13,
    fontWeight: 700,
    color: '#fff',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #ddd',
    fontSize: 14,
    backgroundColor: '#fff',
  },
  alertList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  empty: {
    padding: 40,
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
  alertCard: {
    borderRadius: 8,
    padding: 20,
    borderLeft: '4px solid',
  },
  alertHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  categoryLabel: {
    fontSize: 11,
    color: '#888',
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  alertTitle: {
    margin: '0 0 6px',
    fontSize: 15,
    fontWeight: 600,
    color: '#1a1a2e',
  },
  alertDesc: {
    margin: '0 0 12px',
    fontSize: 13,
    color: '#555',
    lineHeight: 1.5,
  },
  alertFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertMeta: {
    display: 'flex',
    gap: 8,
  },
  metaTag: {
    fontSize: 11,
    padding: '3px 8px',
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 4,
    color: '#555',
    fontFamily: 'monospace',
  },
  ackButton: {
    fontSize: 12,
    padding: '6px 14px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 600,
  },
  ackLabel: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
};

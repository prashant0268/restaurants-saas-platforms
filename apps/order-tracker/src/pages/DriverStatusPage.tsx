import { type CSSProperties, useState } from 'react';

type DriverAvailability = 'online' | 'offline';
type DriverDeliveryStatus = 'idle' | 'en_route_pickup' | 'en_route_delivery' | 'returning';

interface Driver {
  id: string;
  name: string;
  availability: DriverAvailability;
  deliveryStatus: DriverDeliveryStatus;
  currentOrder: string | null;
  completedToday: number;
  rating: number;
}

const DELIVERY_STATUS_LABELS: Record<DriverDeliveryStatus, string> = {
  idle: 'Idle',
  en_route_pickup: 'En Route to Pickup',
  en_route_delivery: 'Delivering',
  returning: 'Returning',
};

const DELIVERY_STATUS_COLORS: Record<DriverDeliveryStatus, string> = {
  idle: '#9ca3af',
  en_route_pickup: '#f59e0b',
  en_route_delivery: '#3b82f6',
  returning: '#8b5cf6',
};

const MOCK_DRIVERS: Driver[] = [
  { id: '1', name: 'Carlos R.', availability: 'online', deliveryStatus: 'en_route_delivery', currentOrder: 'ORD-001', completedToday: 8, rating: 4.9 },
  { id: '2', name: 'Maria G.', availability: 'online', deliveryStatus: 'idle', currentOrder: null, completedToday: 5, rating: 4.7 },
  { id: '3', name: 'James W.', availability: 'online', deliveryStatus: 'en_route_pickup', currentOrder: 'ORD-003', completedToday: 6, rating: 4.8 },
  { id: '4', name: 'Priya S.', availability: 'offline', deliveryStatus: 'idle', currentOrder: null, completedToday: 10, rating: 4.9 },
  { id: '5', name: 'Ahmed K.', availability: 'online', deliveryStatus: 'returning', currentOrder: null, completedToday: 7, rating: 4.6 },
  { id: '6', name: 'Sophie L.', availability: 'online', deliveryStatus: 'en_route_delivery', currentOrder: 'ORD-004', completedToday: 4, rating: 4.5 },
  { id: '7', name: 'David T.', availability: 'offline', deliveryStatus: 'idle', currentOrder: null, completedToday: 0, rating: 4.8 },
  { id: '8', name: 'Lin Z.', availability: 'online', deliveryStatus: 'idle', currentOrder: null, completedToday: 9, rating: 4.7 },
];

export const DriverStatusPage = () => {
  const [drivers] = useState<Driver[]>(MOCK_DRIVERS);

  const onlineCount = drivers.filter((d) => d.availability === 'online').length;
  const activeCount = drivers.filter(
    (d) => d.deliveryStatus !== 'idle' && d.availability === 'online',
  ).length;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.heading}>Driver Status</h1>
        <div style={styles.summaryBadges}>
          <span style={styles.summaryBadge}>
            {onlineCount} Online
          </span>
          <span style={{ ...styles.summaryBadge, backgroundColor: '#dbeafe', color: '#1d4ed8' }}>
            {activeCount} Active
          </span>
        </div>
      </div>

      <div style={styles.grid}>
        {drivers.map((driver) => (
          <div
            key={driver.id}
            style={{
              ...styles.card,
              opacity: driver.availability === 'offline' ? 0.6 : 1,
            }}
          >
            <div style={styles.cardHeader}>
              <h3 style={styles.driverName}>{driver.name}</h3>
              <span
                style={{
                  ...styles.dot,
                  backgroundColor:
                    driver.availability === 'online' ? '#22c55e' : '#ef4444',
                }}
              />
            </div>

            <div
              style={{
                ...styles.deliveryBadge,
                backgroundColor: DELIVERY_STATUS_COLORS[driver.deliveryStatus],
              }}
            >
              {DELIVERY_STATUS_LABELS[driver.deliveryStatus]}
            </div>

            {driver.currentOrder && (
              <div style={styles.currentOrder}>
                Current: <strong>{driver.currentOrder}</strong>
              </div>
            )}

            <div style={styles.statsRow}>
              <div style={styles.stat}>
                <span style={styles.statValue}>{driver.completedToday}</span>
                <span style={styles.statLabel}>Completed</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>{driver.rating}</span>
                <span style={styles.statLabel}>Rating</span>
              </div>
            </div>
          </div>
        ))}
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
  },
  summaryBadges: {
    display: 'flex',
    gap: 8,
  },
  summaryBadge: {
    fontSize: 13,
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: 16,
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#1a1a2e',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
  },
  deliveryBadge: {
    fontSize: 12,
    fontWeight: 600,
    color: '#fff',
    padding: '4px 10px',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  currentOrder: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'monospace',
  },
  statsRow: {
    display: 'flex',
    gap: 24,
    marginTop: 4,
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
};

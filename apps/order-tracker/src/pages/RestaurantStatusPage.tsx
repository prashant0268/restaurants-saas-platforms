import { type CSSProperties, useState } from 'react';

type BusyStatus = 'busy' | 'normal' | 'slow';

interface RestaurantStatus {
  id: string;
  name: string;
  activeOrders: number;
  avgPrepTime: string;
  status: BusyStatus;
  isOpen: boolean;
}

const STATUS_STYLES: Record<BusyStatus, { bg: string; text: string }> = {
  busy: { bg: '#fef2f2', text: '#dc2626' },
  normal: { bg: '#f0fdf4', text: '#16a34a' },
  slow: { bg: '#fffbeb', text: '#d97706' },
};

const MOCK_RESTAURANTS: RestaurantStatus[] = [
  { id: '1', name: 'Pizza Palace', activeOrders: 12, avgPrepTime: '18 min', status: 'busy', isOpen: true },
  { id: '2', name: 'Burger Barn', activeOrders: 5, avgPrepTime: '12 min', status: 'normal', isOpen: true },
  { id: '3', name: 'Sushi Stop', activeOrders: 8, avgPrepTime: '25 min', status: 'busy', isOpen: true },
  { id: '4', name: 'Taco Town', activeOrders: 3, avgPrepTime: '10 min', status: 'normal', isOpen: true },
  { id: '5', name: 'Pasta Place', activeOrders: 0, avgPrepTime: '-- min', status: 'slow', isOpen: false },
  { id: '6', name: 'Wok Express', activeOrders: 6, avgPrepTime: '15 min', status: 'normal', isOpen: true },
  { id: '7', name: 'Salad Garden', activeOrders: 1, avgPrepTime: '8 min', status: 'slow', isOpen: true },
  { id: '8', name: 'BBQ Pit', activeOrders: 9, avgPrepTime: '22 min', status: 'busy', isOpen: true },
];

export const RestaurantStatusPage = () => {
  const [restaurants] = useState<RestaurantStatus[]>(MOCK_RESTAURANTS);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Restaurant Status</h1>

      <div style={styles.grid}>
        {restaurants.map((restaurant) => {
          const statusStyle = STATUS_STYLES[restaurant.status];
          return (
            <div
              key={restaurant.id}
              style={{
                ...styles.card,
                opacity: restaurant.isOpen ? 1 : 0.6,
              }}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.name}>{restaurant.name}</h3>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                  }}
                >
                  {restaurant.status}
                </span>
              </div>

              <div style={styles.statsRow}>
                <div style={styles.stat}>
                  <span style={styles.statValue}>{restaurant.activeOrders}</span>
                  <span style={styles.statLabel}>Active Orders</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statValue}>{restaurant.avgPrepTime}</span>
                  <span style={styles.statLabel}>Avg Prep Time</span>
                </div>
              </div>

              <div style={styles.openStatus}>
                <span
                  style={{
                    ...styles.dot,
                    backgroundColor: restaurant.isOpen ? '#22c55e' : '#ef4444',
                  }}
                />
                {restaurant.isOpen ? 'Open' : 'Closed'}
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
  heading: {
    margin: '0 0 20px',
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#1a1a2e',
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 12,
    textTransform: 'capitalize',
  },
  statsRow: {
    display: 'flex',
    gap: 24,
    marginBottom: 12,
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  openStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    color: '#555',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: 'inline-block',
  },
};

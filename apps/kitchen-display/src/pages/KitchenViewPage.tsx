import { type CSSProperties, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderCard } from '../components/OrderCard';
import { useKitchenStore } from '../stores/kitchenStore';
import type { Station } from '../stores/kitchenStore';

const STATION_TABS: { value: Station; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'grill', label: 'Grill' },
  { value: 'fry', label: 'Fry' },
  { value: 'salad', label: 'Salad' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'dessert', label: 'Dessert' },
];

export const KitchenViewPage = () => {
  const orders = useKitchenStore((s) => s.orders);
  const stationFilter = useKitchenStore((s) => s.stationFilter);
  const setStationFilter = useKitchenStore((s) => s.setStationFilter);
  const navigate = useNavigate();

  const filteredOrders = useMemo(() => {
    if (stationFilter === 'all') return orders;
    return orders.filter((order) =>
      order.items.some((item) => item.station === stationFilter),
    );
  }, [orders, stationFilter]);

  const sortedOrders = useMemo(() => {
    const statusPriority = { new: 0, in_progress: 1, ready: 2, completed: 3 };
    return [...filteredOrders].sort((a, b) => {
      const priorityDiff = statusPriority[a.status] - statusPriority[b.status];
      if (priorityDiff !== 0) return priorityDiff;
      return a.placedAt - b.placedAt;
    });
  }, [filteredOrders]);

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1 style={styles.title}>Kitchen Display</h1>
        <div style={styles.tabs}>
          {STATION_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStationFilter(tab.value)}
              style={{
                ...styles.tab,
                backgroundColor:
                  stationFilter === tab.value
                    ? '#3b82f6'
                    : 'rgba(255,255,255,0.1)',
                color:
                  stationFilter === tab.value
                    ? '#fff'
                    : 'rgba(255,255,255,0.7)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={styles.actions}>
          <button
            onClick={() => navigate('/settings')}
            style={styles.settingsButton}
          >
            Settings
          </button>
        </div>
      </div>

      <div style={styles.orderCount}>
        {sortedOrders.length} active order{sortedOrders.length !== 1 ? 's' : ''}
      </div>

      <div style={styles.grid}>
        {sortedOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/order/${order.id}`)}
            style={styles.cardWrapper}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(`/order/${order.id}`);
            }}
          >
            <OrderCard order={order} />
          </div>
        ))}
      </div>

      {sortedOrders.length === 0 && (
        <div style={styles.empty}>
          <span style={styles.emptyText}>No active orders</span>
          <span style={styles.emptySubtext}>
            {stationFilter !== 'all'
              ? `No orders for the ${stationFilter} station right now.`
              : 'Waiting for new orders to come in.'}
          </span>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    padding: 20,
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
  },
  tabs: {
    display: 'flex',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  actions: {
    display: 'flex',
    gap: 8,
  },
  settingsButton: {
    padding: '8px 16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.8)',
    border: 'none',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  orderCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 16,
  },
  cardWrapper: {
    cursor: 'pointer',
    outline: 'none',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80,
    gap: 8,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.5)',
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.3)',
  },
};

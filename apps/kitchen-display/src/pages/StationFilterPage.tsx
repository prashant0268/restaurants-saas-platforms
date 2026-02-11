import { type CSSProperties, useMemo } from 'react';
import { OrderCard } from '../components/OrderCard';
import { useKitchenStore } from '../stores/kitchenStore';
import type { Station } from '../stores/kitchenStore';

const STATIONS: { value: Exclude<Station, 'all'>; label: string; color: string }[] = [
  { value: 'grill', label: 'Grill', color: '#dc2626' },
  { value: 'fry', label: 'Fry', color: '#d97706' },
  { value: 'salad', label: 'Salad', color: '#16a34a' },
  { value: 'drinks', label: 'Drinks', color: '#2563eb' },
  { value: 'dessert', label: 'Dessert', color: '#a855f7' },
];

export const StationFilterPage = () => {
  const orders = useKitchenStore((s) => s.orders);
  const stationFilter = useKitchenStore((s) => s.stationFilter);
  const setStationFilter = useKitchenStore((s) => s.setStationFilter);

  const activeStation = stationFilter === 'all' ? null : stationFilter;

  const stationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const station of STATIONS) {
      counts[station.value] = orders.filter((o) =>
        o.items.some((item) => item.station === station.value),
      ).length;
    }
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!activeStation) return [];
    return orders.filter((o) =>
      o.items.some((item) => item.station === activeStation),
    );
  }, [orders, activeStation]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Station View</h1>

      <div style={styles.stationGrid}>
        {STATIONS.map((station) => (
          <button
            key={station.value}
            onClick={() =>
              setStationFilter(
                activeStation === station.value ? 'all' : station.value,
              )
            }
            style={{
              ...styles.stationCard,
              borderColor:
                activeStation === station.value
                  ? station.color
                  : 'rgba(255,255,255,0.1)',
              backgroundColor:
                activeStation === station.value
                  ? `${station.color}22`
                  : 'rgba(255,255,255,0.05)',
            }}
          >
            <span
              style={{
                ...styles.stationDot,
                backgroundColor: station.color,
              }}
            />
            <span style={styles.stationLabel}>{station.label}</span>
            <span style={styles.stationCount}>
              {stationCounts[station.value]} orders
            </span>
          </button>
        ))}
      </div>

      {activeStation && (
        <>
          <h2 style={styles.sectionTitle}>
            {STATIONS.find((s) => s.value === activeStation)?.label} Station Orders
          </h2>
          <div style={styles.orderGrid}>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          {filteredOrders.length === 0 && (
            <div style={styles.empty}>
              No active orders for this station.
            </div>
          )}
        </>
      )}

      {!activeStation && (
        <div style={styles.empty}>
          Select a station above to view its orders.
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
  title: {
    margin: '0 0 20px',
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
  },
  stationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 12,
    marginBottom: 28,
  },
  stationCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: 20,
    borderRadius: 10,
    border: '2px solid',
    cursor: 'pointer',
    transition: 'border-color 0.15s, background-color 0.15s',
  },
  stationDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    display: 'inline-block',
  },
  stationLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
  },
  stationCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 16px',
  },
  orderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 16,
  },
  empty: {
    padding: 60,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 16,
  },
};

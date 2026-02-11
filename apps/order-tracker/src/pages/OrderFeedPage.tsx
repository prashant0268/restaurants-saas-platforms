import { type CSSProperties, useMemo, useState } from 'react';

type OrderStatus = 'placed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
type OrderType = 'delivery' | 'pickup' | 'dine_in';

interface OrderItem {
  id: string;
  orderId: string;
  restaurant: string;
  customer: string;
  status: OrderStatus;
  type: OrderType;
  total: number;
  placedAt: string;
  items: number;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  placed: '#3b82f6',
  preparing: '#f59e0b',
  ready: '#22c55e',
  picked_up: '#8b5cf6',
  delivered: '#6b7280',
  cancelled: '#ef4444',
};

const MOCK_ORDERS: OrderItem[] = [
  { id: 'ORD-001', orderId: 'ORD-001', restaurant: 'Pizza Palace', customer: 'John D.', status: 'preparing', type: 'delivery', total: 32.50, placedAt: '2 min ago', items: 3 },
  { id: 'ORD-002', orderId: 'ORD-002', restaurant: 'Burger Barn', customer: 'Sarah M.', status: 'placed', type: 'pickup', total: 18.99, placedAt: '5 min ago', items: 2 },
  { id: 'ORD-003', orderId: 'ORD-003', restaurant: 'Sushi Stop', customer: 'Alex K.', status: 'ready', type: 'delivery', total: 54.00, placedAt: '12 min ago', items: 5 },
  { id: 'ORD-004', orderId: 'ORD-004', restaurant: 'Taco Town', customer: 'Emily R.', status: 'picked_up', type: 'delivery', total: 22.75, placedAt: '18 min ago', items: 4 },
  { id: 'ORD-005', orderId: 'ORD-005', restaurant: 'Pizza Palace', customer: 'Mike L.', status: 'delivered', type: 'delivery', total: 41.20, placedAt: '35 min ago', items: 3 },
  { id: 'ORD-006', orderId: 'ORD-006', restaurant: 'Burger Barn', customer: 'Lisa T.', status: 'cancelled', type: 'dine_in', total: 15.50, placedAt: '40 min ago', items: 1 },
];

export const OrderFeedPage = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<OrderType | 'all'>('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');

  const restaurants = useMemo(
    () => [...new Set(MOCK_ORDERS.map((o) => o.restaurant))],
    [],
  );

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      if (typeFilter !== 'all' && order.type !== typeFilter) return false;
      if (restaurantFilter !== 'all' && order.restaurant !== restaurantFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter, restaurantFilter]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Order Feed</h1>

      <div style={styles.filters}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
          style={styles.select}
          aria-label="Filter by status"
        >
          <option value="all">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="picked_up">Picked Up</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as OrderType | 'all')}
          style={styles.select}
          aria-label="Filter by type"
        >
          <option value="all">All Types</option>
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
          <option value="dine_in">Dine In</option>
        </select>

        <select
          value={restaurantFilter}
          onChange={(e) => setRestaurantFilter(e.target.value)}
          style={styles.select}
          aria-label="Filter by restaurant"
        >
          <option value="all">All Restaurants</option>
          {restaurants.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div style={styles.orderList}>
        {filteredOrders.length === 0 && (
          <div style={styles.empty}>No orders match the selected filters.</div>
        )}
        {filteredOrders.map((order) => (
          <div key={order.id} style={styles.orderRow}>
            <div style={styles.orderId}>{order.orderId}</div>
            <div style={styles.orderDetails}>
              <strong>{order.restaurant}</strong>
              <span style={styles.customerText}>{order.customer}</span>
            </div>
            <div style={styles.orderMeta}>
              <span>{order.items} items</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div style={styles.orderType}>
              {order.type.replace('_', ' ')}
            </div>
            <div
              style={{
                ...styles.statusBadge,
                backgroundColor: STATUS_COLORS[order.status],
              }}
            >
              {order.status.replace('_', ' ')}
            </div>
            <div style={styles.orderTime}>{order.placedAt}</div>
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
  heading: {
    margin: '0 0 20px',
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  filters: {
    display: 'flex',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  select: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #ddd',
    fontSize: 14,
    backgroundColor: '#fff',
    minWidth: 150,
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  empty: {
    padding: 40,
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '14px 20px',
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  orderId: {
    fontSize: 13,
    fontWeight: 700,
    color: '#1a1a2e',
    fontFamily: 'monospace',
    minWidth: 80,
  },
  orderDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  customerText: {
    fontSize: 13,
    color: '#666',
  },
  orderMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 2,
    fontSize: 13,
    color: '#444',
    minWidth: 80,
  },
  orderType: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: '#555',
    minWidth: 60,
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    padding: '4px 10px',
    borderRadius: 12,
    textTransform: 'capitalize',
    minWidth: 80,
    textAlign: 'center',
  },
  orderTime: {
    fontSize: 12,
    color: '#888',
    minWidth: 80,
    textAlign: 'right',
  },
};

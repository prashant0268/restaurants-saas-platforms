import { type CSSProperties, useEffect, useState } from 'react';
import type { KitchenOrder, OrderStatus } from '../stores/kitchenStore';
import { useKitchenStore } from '../stores/kitchenStore';
import { StationBadge } from './StationBadge';

interface OrderCardProps {
  order: KitchenOrder;
  compact?: boolean;
}

const getTimeSincePlaced = (placedAt: number): number => {
  return Math.floor((Date.now() - placedAt) / 60000);
};

const getTimeColor = (minutes: number): string => {
  if (minutes < 10) return '#16a34a';
  if (minutes <= 20) return '#d97706';
  return '#dc2626';
};

const getNextStatus = (current: OrderStatus): OrderStatus | null => {
  switch (current) {
    case 'new': return 'in_progress';
    case 'in_progress': return 'ready';
    case 'ready': return 'completed';
    case 'completed': return null;
  }
};

const getButtonLabel = (current: OrderStatus): string => {
  switch (current) {
    case 'new': return 'Start';
    case 'in_progress': return 'Mark Ready';
    case 'ready': return 'Complete';
    case 'completed': return 'Done';
  }
};

const STATUS_BORDER_COLORS: Record<OrderStatus, string> = {
  new: '#3b82f6',
  in_progress: '#f59e0b',
  ready: '#22c55e',
  completed: '#9ca3af',
};

const ORDER_TYPE_LABELS: Record<string, string> = {
  dine_in: 'Dine In',
  takeout: 'Takeout',
  delivery: 'Delivery',
};

export const OrderCard = ({ order, compact = false }: OrderCardProps) => {
  const updateOrderStatus = useKitchenStore((s) => s.updateOrderStatus);
  const [minutesElapsed, setMinutesElapsed] = useState(
    getTimeSincePlaced(order.placedAt),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesElapsed(getTimeSincePlaced(order.placedAt));
    }, 10000);
    return () => clearInterval(interval);
  }, [order.placedAt]);

  const timeColor = getTimeColor(minutesElapsed);
  const nextStatus = getNextStatus(order.status);

  const handleStatusChange = () => {
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        borderTopColor: STATUS_BORDER_COLORS[order.status],
      }}
    >
      <div style={styles.header}>
        <span style={styles.orderNumber}>{order.orderNumber}</span>
        <span style={{ ...styles.timer, color: timeColor }}>
          {minutesElapsed} min
        </span>
      </div>

      <div style={styles.meta}>
        <span style={styles.customerName}>{order.customerName}</span>
        <span style={styles.orderType}>
          {ORDER_TYPE_LABELS[order.orderType] ?? order.orderType}
        </span>
      </div>

      {!compact && (
        <div style={styles.itemList}>
          {order.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span style={styles.itemQty}>{item.quantity}x</span>
                <span style={styles.itemName}>{item.name}</span>
                <StationBadge station={item.station} />
              </div>
              {item.modifiers.length > 0 && (
                <div style={styles.modifiers}>
                  {item.modifiers.map((mod) => (
                    <span key={mod.name} style={styles.modifier}>
                      {mod.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!compact && order.specialInstructions && (
        <div style={styles.specialInstructions}>
          {order.specialInstructions}
        </div>
      )}

      {nextStatus && (
        <button
          onClick={handleStatusChange}
          style={{
            ...styles.statusButton,
            backgroundColor:
              order.status === 'new'
                ? '#3b82f6'
                : order.status === 'in_progress'
                  ? '#f59e0b'
                  : '#22c55e',
          }}
        >
          {getButtonLabel(order.status)}
        </button>
      )}
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderTop: '4px solid',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: 800,
    color: '#1a1a2e',
    fontFamily: 'monospace',
  },
  timer: {
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'monospace',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 13,
    fontWeight: 500,
    color: '#555',
  },
  orderType: {
    fontSize: 11,
    fontWeight: 600,
    padding: '2px 8px',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    borderTop: '1px solid #f0f0f0',
    paddingTop: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  itemQty: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1a1a2e',
    minWidth: 24,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 500,
    color: '#333',
    flex: 1,
  },
  modifiers: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    paddingLeft: 30,
  },
  modifier: {
    fontSize: 11,
    color: '#888',
    backgroundColor: '#f5f5f5',
    padding: '1px 6px',
    borderRadius: 3,
  },
  specialInstructions: {
    fontSize: 13,
    fontWeight: 600,
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: '8px 10px',
    borderRadius: 6,
    borderLeft: '3px solid #dc2626',
  },
  statusButton: {
    padding: '12px 16px',
    border: 'none',
    borderRadius: 6,
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
};

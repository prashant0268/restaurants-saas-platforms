import { type CSSProperties, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StationBadge } from '../components/StationBadge';
import { useKitchenStore } from '../stores/kitchenStore';
import type { OrderStatus } from '../stores/kitchenStore';

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
    case 'new': return 'Start Preparing';
    case 'in_progress': return 'Mark as Ready';
    case 'ready': return 'Complete Order';
    case 'completed': return 'Done';
  }
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  ready: 'Ready',
  completed: 'Completed',
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  new: '#3b82f6',
  in_progress: '#f59e0b',
  ready: '#22c55e',
  completed: '#9ca3af',
};

export const OrderCardPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const orders = useKitchenStore((s) => s.orders);
  const updateOrderStatus = useKitchenStore((s) => s.updateOrderStatus);

  const order = orders.find((o) => o.id === orderId);

  const [minutesElapsed, setMinutesElapsed] = useState(
    order ? getTimeSincePlaced(order.placedAt) : 0,
  );

  useEffect(() => {
    if (!order) return;
    const interval = setInterval(() => {
      setMinutesElapsed(getTimeSincePlaced(order.placedAt));
    }, 10000);
    return () => clearInterval(interval);
  }, [order]);

  if (!order) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>
          <span style={styles.notFoundText}>Order not found</span>
          <button onClick={() => navigate('/')} style={styles.backButton}>
            Back to Kitchen
          </button>
        </div>
      </div>
    );
  }

  const timeColor = getTimeColor(minutesElapsed);
  const nextStatus = getNextStatus(order.status);

  const handleStatusChange = () => {
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
      if (nextStatus === 'completed') {
        navigate('/');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          Back
        </button>
        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: STATUS_COLORS[order.status],
          }}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div style={styles.card}>
        <div style={styles.orderHeader}>
          <div>
            <span style={styles.orderNumber}>{order.orderNumber}</span>
            <span style={styles.customerName}>{order.customerName}</span>
          </div>
          <div style={styles.timerBlock}>
            <span style={{ ...styles.timerValue, color: timeColor }}>
              {minutesElapsed}
            </span>
            <span style={styles.timerLabel}>min</span>
          </div>
        </div>

        <div style={styles.orderType}>
          {order.orderType.replace('_', ' ').toUpperCase()}
        </div>

        {order.specialInstructions && (
          <div style={styles.specialInstructions}>
            <strong>Special Instructions:</strong> {order.specialInstructions}
          </div>
        )}

        <div style={styles.divider} />

        <h3 style={styles.itemsTitle}>
          Items ({order.items.length})
        </h3>

        <div style={styles.itemList}>
          {order.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <div style={styles.itemRow}>
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
              {item.specialInstructions && (
                <div style={styles.itemInstruction}>
                  {item.specialInstructions}
                </div>
              )}
            </div>
          ))}
        </div>

        {nextStatus && (
          <button
            onClick={handleStatusChange}
            style={{
              ...styles.actionButton,
              backgroundColor: STATUS_COLORS[order.status],
            }}
          >
            {getButtonLabel(order.status)}
          </button>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    padding: 20,
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 600,
    marginBottom: 20,
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  statusBadge: {
    fontSize: 13,
    fontWeight: 700,
    padding: '6px 14px',
    borderRadius: 16,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 28,
    width: '100%',
    maxWidth: 600,
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 36,
    fontWeight: 800,
    color: '#1a1a2e',
    fontFamily: 'monospace',
    display: 'block',
  },
  customerName: {
    fontSize: 16,
    color: '#555',
    display: 'block',
    marginTop: 4,
  },
  timerBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timerValue: {
    fontSize: 48,
    fontWeight: 800,
    fontFamily: 'monospace',
    lineHeight: 1,
  },
  timerLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: 600,
  },
  orderType: {
    fontSize: 12,
    fontWeight: 700,
    padding: '4px 10px',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    color: '#555',
    letterSpacing: 0.5,
    display: 'inline-block',
    marginBottom: 16,
  },
  specialInstructions: {
    fontSize: 15,
    fontWeight: 500,
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: '12px 16px',
    borderRadius: 8,
    borderLeft: '4px solid #dc2626',
    lineHeight: 1.5,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    margin: '8px 0 16px',
  },
  itemsTitle: {
    margin: '0 0 12px',
    fontSize: 16,
    fontWeight: 700,
    color: '#1a1a2e',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    marginBottom: 24,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  itemQty: {
    fontSize: 18,
    fontWeight: 800,
    color: '#1a1a2e',
    minWidth: 32,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
    flex: 1,
  },
  modifiers: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    paddingLeft: 40,
  },
  modifier: {
    fontSize: 13,
    color: '#666',
    backgroundColor: '#f5f5f5',
    padding: '3px 8px',
    borderRadius: 4,
  },
  itemInstruction: {
    fontSize: 13,
    color: '#d97706',
    paddingLeft: 40,
    fontStyle: 'italic',
  },
  actionButton: {
    width: '100%',
    padding: '16px 24px',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 800,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    padding: 60,
  },
  notFoundText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
  },
};

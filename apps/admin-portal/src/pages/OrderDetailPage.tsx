import type { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { StatusBadge } from '../components/shared/StatusBadge';

const styles: Record<string, CSSProperties> = {
  backBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
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
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
  },
  infoLabel: {
    color: '#6b7280',
    fontWeight: 500,
  },
  infoValue: {
    color: '#111827',
  },
  timelineContainer: {
    position: 'relative' as const,
    paddingLeft: '24px',
  },
  timelineLine: {
    position: 'absolute' as const,
    left: '7px',
    top: '8px',
    bottom: '8px',
    width: '2px',
    backgroundColor: '#e5e7eb',
  },
  timelineItem: {
    position: 'relative' as const,
    paddingBottom: '20px',
    paddingLeft: '8px',
  },
  timelineDot: {
    position: 'absolute' as const,
    left: '-21px',
    top: '4px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid #3b82f6',
    backgroundColor: '#ffffff',
  },
  timelineDotActive: {
    backgroundColor: '#3b82f6',
  },
  timelineLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 2px 0',
  },
  timelineTime: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
    color: '#374151',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0 0',
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
  },
};

interface TimelineEvent {
  label: string;
  time: string;
  completed: boolean;
}

const timelineEvents: TimelineEvent[] = [
  { label: 'Order Placed', time: 'Feb 9, 2026 12:30 PM', completed: true },
  { label: 'Confirmed by Restaurant', time: 'Feb 9, 2026 12:32 PM', completed: true },
  { label: 'Preparing', time: 'Feb 9, 2026 12:35 PM', completed: true },
  { label: 'Driver Assigned', time: 'Feb 9, 2026 12:45 PM', completed: true },
  { label: 'Picked Up', time: 'Feb 9, 2026 1:00 PM', completed: false },
  { label: 'Delivered', time: '--', completed: false },
];

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <PageContainer title="Order Detail">
      <button style={styles.backBtn} onClick={() => navigate('/orders')}>
        &larr; Back to Orders
      </button>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Order #{id} <StatusBadge status="in_progress" />
          </h1>
          <p style={styles.subtitle}>Placed on Feb 9, 2026 at 12:30 PM</p>
        </div>
      </div>

      <div style={styles.grid}>
        {/* Left Column */}
        <div>
          {/* Order Items */}
          <div style={{ ...styles.card, marginBottom: '24px' }}>
            <h3 style={styles.cardTitle}>Order Items</h3>
            <div style={styles.itemRow}>
              <span>2x Margherita Pizza (Large)</span>
              <span>$24.00</span>
            </div>
            <div style={styles.itemRow}>
              <span>1x Garlic Bread</span>
              <span>$5.50</span>
            </div>
            <div style={styles.itemRow}>
              <span>1x Caesar Salad</span>
              <span>$8.00</span>
            </div>
            <div style={styles.itemRow}>
              <span>Delivery Fee</span>
              <span>$3.99</span>
            </div>
            <div style={styles.itemRow}>
              <span>Service Fee</span>
              <span>$2.50</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total</span>
              <span>$43.99</span>
            </div>
          </div>

          {/* Order Info */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Order Information</h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Customer</span>
              <span style={styles.infoValue}>Alice Johnson</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Restaurant</span>
              <span style={styles.infoValue}>Pizza Palace</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Driver</span>
              <span style={styles.infoValue}>David Miller</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Delivery Address</span>
              <span style={styles.infoValue}>456 Oak Ave, New York, NY 10002</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Payment Method</span>
              <span style={styles.infoValue}>Visa ending 4242</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Special Instructions</span>
              <span style={styles.infoValue}>Extra napkins please</span>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Order Timeline</h3>
          <div style={styles.timelineContainer}>
            <div style={styles.timelineLine} />
            {timelineEvents.map((event) => (
              <div key={event.label} style={styles.timelineItem}>
                <div
                  style={{
                    ...styles.timelineDot,
                    ...(event.completed ? styles.timelineDotActive : {}),
                  }}
                />
                <p style={styles.timelineLabel}>{event.label}</p>
                <p style={styles.timelineTime}>{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

import { useParams } from 'react-router-dom';

export const OrderDetailPage = () => {
  const { orderId } = useParams();

  return (
    <div>
      <h1 style={styles.title}>Order #{orderId ?? 'N/A'}</h1>

      <div style={styles.grid}>
        {/* Order Info */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Order Information</h2>
          <div style={styles.infoRow}><span style={styles.label}>Status:</span><span style={styles.statusBadge}>Preparing</span></div>
          <div style={styles.infoRow}><span style={styles.label}>Type:</span><span>Delivery</span></div>
          <div style={styles.infoRow}><span style={styles.label}>Customer:</span><span>John Doe</span></div>
          <div style={styles.infoRow}><span style={styles.label}>Phone:</span><span>(555) 123-4567</span></div>
          <div style={styles.infoRow}><span style={styles.label}>Created:</span><span>Today at 2:30 PM</span></div>
        </div>

        {/* Delivery Info */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Delivery Details</h2>
          <div style={styles.infoRow}><span style={styles.label}>Address:</span><span>123 Main St, Apt 4B</span></div>
          <div style={styles.infoRow}><span style={styles.label}>Driver:</span><span>Assigned - Mike R.</span></div>
          <div style={styles.infoRow}><span style={styles.label}>Est. Delivery:</span><span>25 min</span></div>
          <div style={styles.infoRow}><span style={styles.label}>Instructions:</span><span>Leave at door</span></div>
        </div>
      </div>

      {/* Order Items */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Items</h2>
        <div style={styles.itemsList}>
          <div style={styles.item}><span>2x Margherita Pizza</span><span>$28.00</span></div>
          <div style={styles.item}><span>1x Caesar Salad</span><span>$12.00</span></div>
          <div style={styles.item}><span>1x Garlic Bread</span><span>$5.00</span></div>
        </div>
        <div style={styles.totalRow}><span style={styles.label}>Subtotal</span><span>$45.00</span></div>
        <div style={styles.totalRow}><span style={styles.label}>Tax</span><span>$3.60</span></div>
        <div style={styles.totalRow}><span style={styles.label}>Delivery Fee</span><span>$4.99</span></div>
        <div style={styles.totalRow}><span style={styles.label}>Tip</span><span>$5.00</span></div>
        <div style={{ ...styles.totalRow, fontWeight: 700 }}><span>Total</span><span>$58.59</span></div>
      </div>

      {/* Status Timeline */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Status Timeline</h2>
        <div style={styles.timeline}>
          <div style={styles.timelineItem}>Pending - 2:30 PM</div>
          <div style={styles.timelineItem}>Confirmed - 2:32 PM</div>
          <div style={styles.timelineItem}>Preparing - 2:35 PM</div>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.primaryBtn}>Mark as Ready</button>
        <button style={styles.secondaryBtn}>Cancel Order</button>
        <button style={styles.secondaryBtn}>Contact Customer</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5', fontSize: 14 },
  label: { color: '#737373' },
  statusBadge: { padding: '2px 8px', borderRadius: 4, backgroundColor: '#EDE9FE', color: '#8B5CF6', fontSize: 13 },
  itemsList: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  item: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5', fontSize: 14 },
  totalRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 },
  timeline: { display: 'flex', flexDirection: 'column', gap: 8 },
  timelineItem: { padding: '8px 12px', backgroundColor: '#F5F5F5', borderRadius: 6, fontSize: 13, borderLeft: '3px solid #FF6B35' },
  actions: { display: 'flex', gap: 12 },
  primaryBtn: { padding: '10px 20px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500 },
  secondaryBtn: { padding: '10px 20px', backgroundColor: '#fff', color: '#525252', border: '1px solid #E5E5E5', borderRadius: 6, cursor: 'pointer', fontSize: 14 },
};

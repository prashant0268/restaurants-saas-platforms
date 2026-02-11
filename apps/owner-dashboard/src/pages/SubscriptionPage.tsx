export const SubscriptionPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Subscription & Billing</h1>

      {/* Current Plan */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Current Plan</h2>
        <div style={styles.planCard}>
          <div><h3 style={styles.planName}>Professional</h3><p style={styles.planPrice}>$99/month</p></div>
          <button style={styles.upgradeBtn}>Upgrade to Enterprise</button>
        </div>
        <div style={styles.features}>
          <p style={styles.feature}>Unlimited menu items</p>
          <p style={styles.feature}>Up to 10 staff accounts</p>
          <p style={styles.feature}>Delivery management</p>
          <p style={styles.feature}>Reservations</p>
          <p style={styles.feature}>Basic analytics</p>
          <p style={styles.feature}>Marketing tools</p>
        </div>
        <p style={styles.renewalNote}>Next billing date: March 1, 2026</p>
      </div>

      {/* Billing History */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Billing History</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Date</th><th style={styles.th}>Description</th><th style={styles.th}>Amount</th><th style={styles.th}>Status</th></tr></thead>
          <tbody>
            <tr><td style={styles.td}>Feb 1, 2026</td><td style={styles.td}>Professional Plan - Monthly</td><td style={styles.td}>$99.00</td><td style={styles.td}>Paid</td></tr>
            <tr><td style={styles.td}>Jan 1, 2026</td><td style={styles.td}>Professional Plan - Monthly</td><td style={styles.td}>$99.00</td><td style={styles.td}>Paid</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  planCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFF5F0', borderRadius: 8, marginBottom: 16 },
  planName: { margin: 0, fontSize: 20, fontWeight: 700, color: '#FF6B35' },
  planPrice: { margin: '4px 0 0', fontSize: 14, color: '#525252' },
  upgradeBtn: { padding: '8px 16px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 },
  features: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 16 },
  feature: { margin: 0, fontSize: 14, padding: '4px 0', color: '#525252' },
  renewalNote: { fontSize: 13, color: '#737373' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #E5E5E5', fontSize: 13, color: '#737373' },
  td: { padding: '10px 12px', borderBottom: '1px solid #F5F5F5', fontSize: 13 },
};

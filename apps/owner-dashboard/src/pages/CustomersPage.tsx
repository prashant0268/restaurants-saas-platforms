export const CustomersPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Customer Insights</h1>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><p style={styles.statValue}>1,284</p><p style={styles.statLabel}>Total Customers</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>156</p><p style={styles.statLabel}>New This Month</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>72%</p><p style={styles.statLabel}>Return Rate</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>$48.50</p><p style={styles.statLabel}>Avg. Order Value</p></div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Top Customers</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Orders</th>
              <th style={styles.th}>Total Spent</th>
              <th style={styles.th}>Last Order</th>
              <th style={styles.th}>Loyalty Tier</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Sarah Johnson', orders: 42, spent: '$2,150', last: '2 days ago', tier: 'Gold' },
              { name: 'Mike Chen', orders: 38, spent: '$1,890', last: 'Yesterday', tier: 'Gold' },
              { name: 'Emily Davis', orders: 25, spent: '$1,200', last: '1 week ago', tier: 'Silver' },
              { name: 'James Wilson', orders: 18, spent: '$850', last: '3 days ago', tier: 'Bronze' },
            ].map((c) => (
              <tr key={c.name}>
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.orders}</td>
                <td style={styles.td}>{c.spent}</td>
                <td style={styles.td}>{c.last}</td>
                <td style={styles.td}><span style={styles.tierBadge}>{c.tier}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Demographics</h2>
        <div style={styles.chartPlaceholder}>Customer demographics charts (age, location, order frequency)</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  statsRow: { display: 'flex', gap: 16, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16, border: '1px solid #E5E5E5', textAlign: 'center' as const },
  statValue: { margin: 0, fontSize: 28, fontWeight: 700 },
  statLabel: { margin: '4px 0 0', fontSize: 13, color: '#737373' },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #E5E5E5', fontSize: 13, color: '#737373' },
  td: { padding: '10px 12px', borderBottom: '1px solid #F5F5F5', fontSize: 13 },
  tierBadge: { padding: '2px 8px', borderRadius: 4, backgroundColor: '#FEF3C7', color: '#D97706', fontSize: 12 },
  chartPlaceholder: { height: 200, backgroundColor: '#F5F5F5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#737373' },
};

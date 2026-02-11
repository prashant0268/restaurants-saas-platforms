import { StatsCard } from '../components/shared/StatsCard';

export const DashboardPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Dashboard</h1>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        <StatsCard title="Today's Revenue" value="$2,450" change="+12.5% vs yesterday" changeType="positive" />
        <StatsCard title="Active Orders" value="8" change="3 preparing, 5 delivering" changeType="neutral" />
        <StatsCard title="Total Orders Today" value="47" change="+8% vs last week" changeType="positive" />
        <StatsCard title="Avg Order Value" value="$52.13" change="-2.1% vs yesterday" changeType="negative" />
      </div>

      {/* Charts Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Revenue Overview</h2>
        <div style={styles.chartPlaceholder}>
          <p style={styles.placeholderText}>Revenue chart (Recharts line/bar chart)</p>
          <p style={styles.placeholderSubtext}>Daily revenue for the past 30 days</p>
        </div>
      </div>

      <div style={styles.twoCol}>
        {/* Recent Orders */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Orders</h2>
          <div style={styles.listPlaceholder}>
            {['ORD-ABC123 - $45.00 - Preparing', 'ORD-DEF456 - $32.50 - Out for Delivery', 'ORD-GHI789 - $67.25 - Delivered', 'ORD-JKL012 - $28.00 - Pending', 'ORD-MNO345 - $55.75 - Ready'].map((order) => (
              <div key={order} style={styles.listItem}>{order}</div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
          <div style={styles.actionsGrid}>
            <button style={styles.actionBtn}>Pause New Orders</button>
            <button style={styles.actionBtn}>Update Hours</button>
            <button style={styles.actionBtn}>Add Menu Item</button>
            <button style={styles.actionBtn}>View All Reviews</button>
            <button style={styles.actionBtn}>Send Promotion</button>
            <button style={styles.actionBtn}>Download Report</button>
          </div>
        </div>
      </div>

      {/* Popular Items */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Top Selling Items Today</h2>
        <div style={styles.chartPlaceholder}>
          <p style={styles.placeholderText}>Top selling items bar chart</p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  statsRow: { display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16, color: '#171717' },
  chartPlaceholder: { height: 200, backgroundColor: '#F5F5F5', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#737373', fontSize: 14 },
  placeholderSubtext: { color: '#A3A3A3', fontSize: 12 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  listPlaceholder: { display: 'flex', flexDirection: 'column', gap: 8 },
  listItem: { padding: '10px 12px', backgroundColor: '#FAFAFA', borderRadius: 6, fontSize: 13, color: '#525252' },
  actionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  actionBtn: { padding: '10px 16px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 },
};

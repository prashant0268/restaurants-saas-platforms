import { StatsCard } from '../components/shared/StatsCard';

export const FinancialPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Financial Reports</h1>

      <div style={styles.statsRow}>
        <StatsCard title="This Month Revenue" value="$48,750" change="+15.2% vs last month" changeType="positive" />
        <StatsCard title="Platform Commission" value="$4,875" change="10% rate" changeType="neutral" />
        <StatsCard title="Net Revenue" value="$43,875" change="+14.8%" changeType="positive" />
        <StatsCard title="Avg. Daily Revenue" value="$1,625" change="+8.5%" changeType="positive" />
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Revenue Trend</h2>
        <div style={styles.chartPlaceholder}>Monthly revenue line chart (Recharts)</div>
      </div>

      <div style={styles.grid}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Revenue Breakdown</h2>
          <div style={styles.breakdownRow}><span>Food Sales</span><span>$42,000</span></div>
          <div style={styles.breakdownRow}><span>Delivery Fees</span><span>$3,500</span></div>
          <div style={styles.breakdownRow}><span>Service Fees</span><span>$2,100</span></div>
          <div style={styles.breakdownRow}><span>Tips</span><span>$1,150</span></div>
          <div style={{ ...styles.breakdownRow, fontWeight: 700 }}><span>Total</span><span>$48,750</span></div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Expenses</h2>
          <div style={styles.breakdownRow}><span>Platform Commission</span><span>-$4,875</span></div>
          <div style={styles.breakdownRow}><span>Payment Processing</span><span>-$1,462</span></div>
          <div style={styles.breakdownRow}><span>Delivery Payouts</span><span>-$3,200</span></div>
          <div style={styles.breakdownRow}><span>Promotions/Discounts</span><span>-$890</span></div>
          <div style={{ ...styles.breakdownRow, fontWeight: 700 }}><span>Total Expenses</span><span>-$10,427</span></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Payout History</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Date</th><th style={styles.th}>Amount</th><th style={styles.th}>Status</th><th style={styles.th}>Reference</th></tr></thead>
          <tbody>
            <tr><td style={styles.td}>Feb 1, 2026</td><td style={styles.td}>$11,250</td><td style={styles.td}>Completed</td><td style={styles.td}>PAY-001</td></tr>
            <tr><td style={styles.td}>Jan 15, 2026</td><td style={styles.td}>$10,800</td><td style={styles.td}>Completed</td><td style={styles.td}>PAY-002</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  statsRow: { display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  chartPlaceholder: { height: 200, backgroundColor: '#F5F5F5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#737373' },
  breakdownRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F5F5F5', fontSize: 14 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #E5E5E5', fontSize: 13, color: '#737373' },
  td: { padding: '10px 12px', borderBottom: '1px solid #F5F5F5', fontSize: 13 },
};

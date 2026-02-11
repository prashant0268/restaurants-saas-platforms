export const OrdersPage = () => {
  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Orders</h1>
        <div style={styles.filters}>
          <button style={styles.filterBtn}>All</button>
          <button style={styles.filterBtnActive}>Active</button>
          <button style={styles.filterBtn}>Completed</button>
          <button style={styles.filterBtn}>Cancelled</button>
        </div>
      </div>

      {/* Live Orders Feed */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Live Orders</h2>
        <div style={styles.ordersGrid}>
          {[
            { id: 'ORD-001', customer: 'John D.', items: 3, total: '$45.00', status: 'Pending', time: '2 min ago' },
            { id: 'ORD-002', customer: 'Sarah M.', items: 2, total: '$32.50', status: 'Preparing', time: '8 min ago' },
            { id: 'ORD-003', customer: 'Mike R.', items: 5, total: '$67.25', status: 'Ready', time: '15 min ago' },
            { id: 'ORD-004', customer: 'Lisa K.', items: 1, total: '$28.00', status: 'Out for Delivery', time: '22 min ago' },
          ].map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <span style={styles.orderId}>{order.id}</span>
                <span style={styles.orderTime}>{order.time}</span>
              </div>
              <p style={styles.orderCustomer}>{order.customer}</p>
              <p style={styles.orderItems}>{order.items} items - {order.total}</p>
              <div style={styles.orderFooter}>
                <span style={styles.statusBadge}>{order.status}</span>
                <button style={styles.viewBtn}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order History Table */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Order History</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order #</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={styles.td} colSpan={6}>Order history data loads here...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: '#171717', margin: 0 },
  filters: { display: 'flex', gap: 8 },
  filterBtn: { padding: '6px 14px', border: '1px solid #E5E5E5', borderRadius: 6, backgroundColor: '#fff', cursor: 'pointer', fontSize: 13 },
  filterBtnActive: { padding: '6px 14px', border: 'none', borderRadius: 6, backgroundColor: '#FF6B35', color: '#fff', cursor: 'pointer', fontSize: 13 },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  ordersGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 },
  orderCard: { border: '1px solid #E5E5E5', borderRadius: 8, padding: 16 },
  orderHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  orderId: { fontWeight: 600, fontSize: 14 },
  orderTime: { fontSize: 12, color: '#737373' },
  orderCustomer: { margin: '4px 0', fontSize: 14 },
  orderItems: { margin: '4px 0', fontSize: 13, color: '#525252' },
  orderFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  statusBadge: { fontSize: 12, padding: '2px 8px', borderRadius: 4, backgroundColor: '#FFF5F0', color: '#FF6B35' },
  viewBtn: { fontSize: 12, padding: '4px 10px', border: '1px solid #E5E5E5', borderRadius: 4, backgroundColor: '#fff', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #E5E5E5', fontSize: 13, color: '#737373', fontWeight: 500 },
  td: { padding: '10px 12px', borderBottom: '1px solid #F5F5F5', fontSize: 13, color: '#525252' },
};

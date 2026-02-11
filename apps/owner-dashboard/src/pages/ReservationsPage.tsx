export const ReservationsPage = () => {
  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Reservations</h1>
        <button style={styles.addBtn}>+ New Reservation</button>
      </div>

      {/* Today's Summary */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}><p style={styles.statValue}>12</p><p style={styles.statLabel}>Today's Reservations</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>3</p><p style={styles.statLabel}>Upcoming (Next 2h)</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>45</p><p style={styles.statLabel}>Total Guests Today</p></div>
        <div style={styles.statCard}><p style={styles.statValue}>2</p><p style={styles.statLabel}>Cancelled</p></div>
      </div>

      {/* Reservations Table */}
      <div style={styles.section}>
        <div style={styles.filters}>
          <button style={styles.filterBtnActive}>Today</button>
          <button style={styles.filterBtn}>Tomorrow</button>
          <button style={styles.filterBtn}>This Week</button>
          <button style={styles.filterBtn}>All</button>
          <input style={styles.search} placeholder="Search by name or code..." />
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Guest</th>
              <th style={styles.th}>Party Size</th>
              <th style={styles.th}>Table</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: '6:00 PM', guest: 'Smith Family', size: 4, table: 'T-5', status: 'Confirmed' },
              { time: '6:30 PM', guest: 'Johnson, R.', size: 2, table: 'T-2', status: 'Confirmed' },
              { time: '7:00 PM', guest: 'Williams Party', size: 8, table: 'T-10', status: 'Pending' },
              { time: '7:30 PM', guest: 'Davis, M.', size: 3, table: 'T-7', status: 'Seated' },
            ].map((r) => (
              <tr key={r.guest}>
                <td style={styles.td}>{r.time}</td>
                <td style={styles.td}>{r.guest}</td>
                <td style={styles.td}>{r.size}</td>
                <td style={styles.td}>{r.table}</td>
                <td style={styles.td}><span style={styles.statusBadge}>{r.status}</span></td>
                <td style={styles.td}>
                  <button style={styles.actionBtn}>Seat</button>
                  <button style={styles.actionBtn}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: '#171717', margin: 0 },
  addBtn: { padding: '8px 16px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 },
  statsRow: { display: 'flex', gap: 16, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16, border: '1px solid #E5E5E5', textAlign: 'center' as const },
  statValue: { margin: 0, fontSize: 28, fontWeight: 700 },
  statLabel: { margin: '4px 0 0', fontSize: 13, color: '#737373' },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5' },
  filters: { display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' },
  filterBtn: { padding: '6px 14px', border: '1px solid #E5E5E5', borderRadius: 6, backgroundColor: '#fff', cursor: 'pointer', fontSize: 13 },
  filterBtnActive: { padding: '6px 14px', border: 'none', borderRadius: 6, backgroundColor: '#FF6B35', color: '#fff', cursor: 'pointer', fontSize: 13 },
  search: { marginLeft: 'auto', padding: '6px 12px', border: '1px solid #E5E5E5', borderRadius: 6, fontSize: 13, width: 220 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #E5E5E5', fontSize: 13, color: '#737373' },
  td: { padding: '10px 12px', borderBottom: '1px solid #F5F5F5', fontSize: 13 },
  statusBadge: { padding: '2px 8px', borderRadius: 4, backgroundColor: '#DCFCE7', color: '#16A34A', fontSize: 12 },
  actionBtn: { padding: '4px 8px', border: '1px solid #E5E5E5', borderRadius: 4, backgroundColor: '#fff', cursor: 'pointer', fontSize: 12, marginRight: 4 },
};

export const StaffPage = () => {
  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Staff Management</h1>
        <button style={styles.addBtn}>+ Add Staff</button>
      </div>

      <div style={styles.section}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Permissions</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Alex Manager', role: 'Manager', perms: 'Full Access', status: 'Active' },
              { name: 'Chef Mario', role: 'Chef', perms: 'Orders, Menu', status: 'Active' },
              { name: 'Server Lisa', role: 'Server', perms: 'Orders, Reservations', status: 'Active' },
              { name: 'Cashier Tom', role: 'Cashier', perms: 'Orders', status: 'Inactive' },
            ].map((s) => (
              <tr key={s.name}>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.role}</td>
                <td style={styles.td}>{s.perms}</td>
                <td style={styles.td}><span style={{ ...styles.badge, backgroundColor: s.status === 'Active' ? '#DCFCE7' : '#FEE2E2', color: s.status === 'Active' ? '#16A34A' : '#EF4444' }}>{s.status}</span></td>
                <td style={styles.td}><button style={styles.editBtn}>Edit</button> <button style={styles.editBtn}>Remove</button></td>
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
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #E5E5E5', fontSize: 13, color: '#737373' },
  td: { padding: '10px 12px', borderBottom: '1px solid #F5F5F5', fontSize: 13 },
  badge: { padding: '2px 8px', borderRadius: 4, fontSize: 12 },
  editBtn: { padding: '4px 8px', border: '1px solid #E5E5E5', borderRadius: 4, backgroundColor: '#fff', cursor: 'pointer', fontSize: 12, marginRight: 4 },
};

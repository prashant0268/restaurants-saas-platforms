export const SettingsPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Restaurant Settings</h1>

      {/* Restaurant Profile */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Restaurant Profile</h2>
        <div style={styles.formGrid}>
          <div style={styles.field}><label style={styles.label}>Restaurant Name</label><input style={styles.input} defaultValue="My Restaurant" /></div>
          <div style={styles.field}><label style={styles.label}>Phone</label><input style={styles.input} defaultValue="(555) 123-4567" /></div>
          <div style={styles.field}><label style={styles.label}>Email</label><input style={styles.input} defaultValue="contact@myrestaurant.com" /></div>
          <div style={styles.field}><label style={styles.label}>Website</label><input style={styles.input} defaultValue="https://myrestaurant.com" /></div>
        </div>
        <div style={styles.field}><label style={styles.label}>Description</label><textarea style={{ ...styles.input, height: 80 }} defaultValue="A great family restaurant..." /></div>
        <div style={styles.field}><label style={styles.label}>Cuisine Types</label><input style={styles.input} defaultValue="Italian, Pizza, Pasta" /></div>
      </div>

      {/* Operating Hours */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Operating Hours</h2>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <div key={day} style={styles.hoursRow}>
            <span style={styles.dayLabel}>{day}</span>
            <input style={styles.timeInput} type="time" defaultValue="11:00" />
            <span style={styles.timeSep}>to</span>
            <input style={styles.timeInput} type="time" defaultValue="22:00" />
            <label style={styles.closedLabel}><input type="checkbox" /> Closed</label>
          </div>
        ))}
      </div>

      {/* Delivery Settings */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Delivery Settings</h2>
        <div style={styles.formGrid}>
          <div style={styles.field}><label style={styles.label}>Delivery Radius (miles)</label><input style={styles.input} type="number" defaultValue="5" /></div>
          <div style={styles.field}><label style={styles.label}>Delivery Fee</label><input style={styles.input} defaultValue="$4.99" /></div>
          <div style={styles.field}><label style={styles.label}>Min. Order Amount</label><input style={styles.input} defaultValue="$15.00" /></div>
          <div style={styles.field}><label style={styles.label}>Free Delivery Minimum</label><input style={styles.input} defaultValue="$35.00" /></div>
        </div>
        <div style={styles.field}><label style={styles.label}>Estimated Delivery Time (minutes)</label><input style={styles.input} type="number" defaultValue="30" /></div>
      </div>

      {/* Order Settings */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Order Settings</h2>
        <label style={styles.toggleRow}><input type="checkbox" defaultChecked /> Enable Pickup Orders</label>
        <label style={styles.toggleRow}><input type="checkbox" defaultChecked /> Enable Dine-In Orders</label>
        <label style={styles.toggleRow}><input type="checkbox" /> Auto-Accept Orders</label>
        <label style={styles.toggleRow}><input type="checkbox" defaultChecked /> Enable Scheduled Orders</label>
        <div style={styles.field}><label style={styles.label}>Tax Rate (%)</label><input style={styles.input} type="number" defaultValue="8.0" /></div>
      </div>

      <button style={styles.saveBtn}>Save Settings</button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  field: { marginBottom: 16 },
  label: { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#525252' },
  input: { width: '100%', padding: '8px 12px', border: '1px solid #E5E5E5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' as const },
  hoursRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #F5F5F5' },
  dayLabel: { width: 100, fontSize: 14, fontWeight: 500 },
  timeInput: { padding: '6px 10px', border: '1px solid #E5E5E5', borderRadius: 4, fontSize: 13 },
  timeSep: { fontSize: 13, color: '#737373' },
  closedLabel: { marginLeft: 'auto', fontSize: 13, cursor: 'pointer' },
  toggleRow: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', fontSize: 14, cursor: 'pointer' },
  saveBtn: { padding: '10px 24px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500 },
};

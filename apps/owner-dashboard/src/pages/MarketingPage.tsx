export const MarketingPage = () => {
  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Marketing</h1>
        <button style={styles.addBtn}>+ Create Promotion</button>
      </div>

      {/* Active Promotions */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Active Promotions</h2>
        <div style={styles.promoGrid}>
          {[
            { name: '20% Off First Order', type: 'Percentage', code: 'FIRST20', uses: 156, expires: 'Mar 31' },
            { name: 'Free Delivery Weekend', type: 'Free Delivery', code: 'FREEDEL', uses: 89, expires: 'Ongoing' },
            { name: 'Buy 1 Get 1 Pizza', type: 'BOGO', code: 'BOGO2024', uses: 45, expires: 'Feb 28' },
          ].map((p) => (
            <div key={p.code} style={styles.promoCard}>
              <h3 style={styles.promoName}>{p.name}</h3>
              <p style={styles.promoType}>{p.type}</p>
              <div style={styles.promoDetails}>
                <span>Code: {p.code}</span>
                <span>{p.uses} uses</span>
              </div>
              <p style={styles.promoExpiry}>Expires: {p.expires}</p>
              <div style={styles.promoActions}>
                <button style={styles.editBtn}>Edit</button>
                <button style={styles.editBtn}>Deactivate</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Performance */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Promotion Performance</h2>
        <div style={styles.chartPlaceholder}>Promotion usage and revenue impact chart</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: '#171717', margin: 0 },
  addBtn: { padding: '8px 16px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  promoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 },
  promoCard: { padding: 16, border: '1px solid #E5E5E5', borderRadius: 8 },
  promoName: { margin: '0 0 4px', fontSize: 16, fontWeight: 600 },
  promoType: { margin: '0 0 12px', fontSize: 13, color: '#737373' },
  promoDetails: { display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 },
  promoExpiry: { fontSize: 12, color: '#737373', marginBottom: 12 },
  promoActions: { display: 'flex', gap: 8 },
  editBtn: { padding: '4px 10px', border: '1px solid #E5E5E5', borderRadius: 4, backgroundColor: '#fff', cursor: 'pointer', fontSize: 12 },
  chartPlaceholder: { height: 200, backgroundColor: '#F5F5F5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#737373' },
};

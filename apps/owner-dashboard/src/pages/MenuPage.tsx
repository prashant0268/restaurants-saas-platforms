export const MenuPage = () => {
  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Menu Management</h1>
        <button style={styles.addBtn}>+ Add Item</button>
      </div>

      {/* Categories */}
      <div style={styles.categoriesRow}>
        {['All', 'Appetizers', 'Mains', 'Pizzas', 'Salads', 'Desserts', 'Drinks'].map((cat) => (
          <button key={cat} style={cat === 'All' ? styles.catBtnActive : styles.catBtn}>{cat}</button>
        ))}
        <button style={styles.manageCatBtn}>Manage Categories</button>
      </div>

      {/* Menu Items Grid */}
      <div style={styles.itemsGrid}>
        {[
          { name: 'Margherita Pizza', price: '$14.00', category: 'Pizzas', available: true, popular: true },
          { name: 'Caesar Salad', price: '$12.00', category: 'Salads', available: true, popular: false },
          { name: 'Garlic Bread', price: '$5.00', category: 'Appetizers', available: true, popular: false },
          { name: 'Tiramisu', price: '$8.00', category: 'Desserts', available: false, popular: true },
          { name: 'Grilled Salmon', price: '$22.00', category: 'Mains', available: true, popular: true },
          { name: 'Lemonade', price: '$4.00', category: 'Drinks', available: true, popular: false },
        ].map((item) => (
          <div key={item.name} style={styles.menuCard}>
            <div style={styles.imgPlaceholder}>Image</div>
            <div style={styles.menuInfo}>
              <div style={styles.menuHeader}>
                <h3 style={styles.menuName}>{item.name}</h3>
                {item.popular && <span style={styles.popularBadge}>Popular</span>}
              </div>
              <p style={styles.menuCategory}>{item.category}</p>
              <div style={styles.menuFooter}>
                <span style={styles.menuPrice}>{item.price}</span>
                <div style={styles.menuActions}>
                  <span style={{ ...styles.availBadge, backgroundColor: item.available ? '#DCFCE7' : '#FEE2E2', color: item.available ? '#16A34A' : '#EF4444' }}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                  <button style={styles.editBtn}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: '#171717', margin: 0 },
  addBtn: { padding: '8px 16px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500 },
  categoriesRow: { display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' },
  catBtn: { padding: '6px 14px', border: '1px solid #E5E5E5', borderRadius: 20, backgroundColor: '#fff', cursor: 'pointer', fontSize: 13 },
  catBtnActive: { padding: '6px 14px', border: 'none', borderRadius: 20, backgroundColor: '#FF6B35', color: '#fff', cursor: 'pointer', fontSize: 13 },
  manageCatBtn: { padding: '6px 14px', border: '1px dashed #A3A3A3', borderRadius: 20, backgroundColor: '#fff', cursor: 'pointer', fontSize: 13, color: '#737373' },
  itemsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 },
  menuCard: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #E5E5E5', overflow: 'hidden' },
  imgPlaceholder: { height: 120, backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A3A3A3', fontSize: 14 },
  menuInfo: { padding: 16 },
  menuHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  menuName: { margin: 0, fontSize: 16, fontWeight: 600 },
  popularBadge: { fontSize: 11, padding: '2px 6px', borderRadius: 4, backgroundColor: '#FFF5F0', color: '#FF6B35' },
  menuCategory: { margin: '4px 0 12px', fontSize: 13, color: '#737373' },
  menuFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  menuPrice: { fontSize: 18, fontWeight: 700, color: '#171717' },
  menuActions: { display: 'flex', gap: 8, alignItems: 'center' },
  availBadge: { fontSize: 11, padding: '2px 6px', borderRadius: 4 },
  editBtn: { fontSize: 12, padding: '4px 10px', border: '1px solid #E5E5E5', borderRadius: 4, backgroundColor: '#fff', cursor: 'pointer' },
};

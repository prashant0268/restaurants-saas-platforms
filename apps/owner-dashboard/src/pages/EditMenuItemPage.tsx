import { useParams } from 'react-router-dom';

export const EditMenuItemPage = () => {
  const { itemId } = useParams();
  const isNew = !itemId;

  return (
    <div>
      <h1 style={styles.title}>{isNew ? 'Add Menu Item' : 'Edit Menu Item'}</h1>

      <div style={styles.form}>
        <div style={styles.grid}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Basic Info</h2>
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input style={styles.input} placeholder="Item name" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Description</label>
              <textarea style={{ ...styles.input, height: 80 }} placeholder="Item description" />
            </div>
            <div style={styles.fieldRow}>
              <div style={styles.field}>
                <label style={styles.label}>Price</label>
                <input style={styles.input} placeholder="$0.00" type="number" />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Category</label>
                <select style={styles.input}><option>Select category</option></select>
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Preparation Time (minutes)</label>
              <input style={styles.input} placeholder="15" type="number" />
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Image</h2>
            <div style={styles.imgUpload}>Click to upload image</div>
            <h2 style={{ ...styles.sectionTitle, marginTop: 24 }}>Dietary Info</h2>
            {['Vegetarian', 'Vegan', 'Gluten Free', 'Halal', 'Kosher'].map((d) => (
              <label key={d} style={styles.checkbox}><input type="checkbox" /> {d}</label>
            ))}
            <h2 style={{ ...styles.sectionTitle, marginTop: 24 }}>Tags</h2>
            <input style={styles.input} placeholder="Popular, New, Spicy..." />
          </div>
        </div>

        {/* Modifier Groups */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Modifier Groups</h2>
          <p style={styles.hint}>Add options like size, toppings, extras</p>
          <button style={styles.secondaryBtn}>+ Add Modifier Group</button>
        </div>

        <div style={styles.actions}>
          <button style={styles.primaryBtn}>{isNew ? 'Create Item' : 'Save Changes'}</button>
          <button style={styles.secondaryBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#171717' },
  form: { maxWidth: 900 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #E5E5E5', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16 },
  field: { marginBottom: 16 },
  fieldRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  label: { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#525252' },
  input: { width: '100%', padding: '8px 12px', border: '1px solid #E5E5E5', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' as const },
  imgUpload: { height: 150, border: '2px dashed #E5E5E5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A3A3A3', cursor: 'pointer' },
  checkbox: { display: 'block', marginBottom: 8, fontSize: 14, cursor: 'pointer' },
  hint: { fontSize: 13, color: '#737373', marginBottom: 12 },
  actions: { display: 'flex', gap: 12 },
  primaryBtn: { padding: '10px 24px', backgroundColor: '#FF6B35', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500 },
  secondaryBtn: { padding: '10px 24px', backgroundColor: '#fff', color: '#525252', border: '1px solid #E5E5E5', borderRadius: 6, cursor: 'pointer', fontSize: 14 },
};

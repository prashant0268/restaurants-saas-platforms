import type { CSSProperties } from 'react';
import { PageContainer } from '../components/layout/PageContainer';

const styles: Record<string, CSSProperties> = {
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 24px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    boxSizing: 'border-box' as const,
  },
  helpText: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '4px 0 0 0',
  },
  saveBtn: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '8px',
  },
  regionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
  },
  regionName: {
    fontWeight: 500,
    color: '#111827',
  },
  toggleBtn: {
    padding: '4px 12px',
    borderRadius: '9999px',
    border: 'none',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  toggleActive: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
};

export const SettingsPage = () => {
  return (
    <PageContainer title="Settings">
      <h1 style={styles.title}>Platform Settings</h1>

      <div style={styles.grid}>
        {/* Commission Settings */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Commission &amp; Fees</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Default Commission Rate (%)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="15"
              min="0"
              max="100"
            />
            <p style={styles.helpText}>
              Percentage taken from each order as platform commission
            </p>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Delivery Fee ($)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="3.99"
              min="0"
              step="0.01"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Service Fee ($)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="2.50"
              min="0"
              step="0.01"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Minimum Order Amount ($)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="10.00"
              min="0"
              step="0.01"
            />
          </div>
          <button style={styles.saveBtn}>Save Fee Settings</button>
        </div>

        {/* Operating Regions */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Operating Regions</h3>
          <div style={styles.regionItem}>
            <span style={styles.regionName}>New York, NY</span>
            <button style={{ ...styles.toggleBtn, ...styles.toggleActive }}>
              Active
            </button>
          </div>
          <div style={styles.regionItem}>
            <span style={styles.regionName}>Los Angeles, CA</span>
            <button style={{ ...styles.toggleBtn, ...styles.toggleActive }}>
              Active
            </button>
          </div>
          <div style={styles.regionItem}>
            <span style={styles.regionName}>Chicago, IL</span>
            <button style={{ ...styles.toggleBtn, ...styles.toggleActive }}>
              Active
            </button>
          </div>
          <div style={styles.regionItem}>
            <span style={styles.regionName}>Houston, TX</span>
            <button
              style={{
                ...styles.toggleBtn,
                backgroundColor: '#e5e7eb',
                color: '#374151',
              }}
            >
              Inactive
            </button>
          </div>
          <div style={styles.regionItem}>
            <span style={styles.regionName}>Miami, FL</span>
            <button
              style={{
                ...styles.toggleBtn,
                backgroundColor: '#fef3c7',
                color: '#92400e',
              }}
            >
              Coming Soon
            </button>
          </div>
          <button style={{ ...styles.saveBtn, marginTop: '16px' }}>
            Add Region
          </button>
        </div>

        {/* Order Settings */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Order Settings</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Max Delivery Radius (miles)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="10"
              min="1"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Order Timeout (minutes)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="5"
              min="1"
            />
            <p style={styles.helpText}>
              Time before unaccepted orders are automatically cancelled
            </p>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Default Currency</label>
            <select style={styles.select}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <button style={styles.saveBtn}>Save Order Settings</button>
        </div>

        {/* Driver Settings */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Driver Settings</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Driver Pay Per Delivery ($)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="5.00"
              min="0"
              step="0.01"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Driver Pay Per Mile ($)</label>
            <input
              type="number"
              style={styles.input}
              defaultValue="0.50"
              min="0"
              step="0.01"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Document Verification Required</label>
            <select style={styles.select}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button style={styles.saveBtn}>Save Driver Settings</button>
        </div>
      </div>
    </PageContainer>
  );
};

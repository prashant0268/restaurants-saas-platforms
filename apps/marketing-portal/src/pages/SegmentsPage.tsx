import { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { DataTable } from '../components/shared/DataTable';
import { StatsCard } from '../components/shared/StatsCard';

interface Segment {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  rules: string;
  lastUpdated: string;
  status: string;
}

const mockSegments: Segment[] = [
  {
    id: '1',
    name: 'Loyalty Members',
    description: 'Customers enrolled in loyalty program',
    contactCount: 4200,
    rules: 'loyalty_status = active',
    lastUpdated: '2026-02-08',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Brunch Lovers',
    description: 'Customers who order brunch 2+ times/month',
    contactCount: 1800,
    rules: 'brunch_orders >= 2 per month',
    lastUpdated: '2026-02-07',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Happy Hour Regulars',
    description: 'Frequent happy hour visitors',
    contactCount: 2100,
    rules: 'happy_hour_visits >= 3 per month',
    lastUpdated: '2026-02-06',
    status: 'Active',
  },
  {
    id: '4',
    name: 'New Customers',
    description: 'Signed up in the last 30 days',
    contactCount: 890,
    rules: 'signup_date > 30 days ago',
    lastUpdated: '2026-02-09',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Inactive Customers',
    description: 'No orders in the last 60 days',
    contactCount: 3400,
    rules: 'last_order_date > 60 days ago',
    lastUpdated: '2026-02-05',
    status: 'Active',
  },
  {
    id: '6',
    name: 'High Value Diners',
    description: 'Average order value above $75',
    contactCount: 1150,
    rules: 'avg_order_value > $75',
    lastUpdated: '2026-02-04',
    status: 'Active',
  },
  {
    id: '7',
    name: 'Vegan Diners',
    description: 'Customers who frequently order vegan items',
    contactCount: 620,
    rules: 'vegan_orders >= 50% of total',
    lastUpdated: '2026-02-03',
    status: 'Active',
  },
];

export const SegmentsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const totalContacts = mockSegments.reduce((sum, s) => sum + s.contactCount, 0);

  const columns = [
    {
      key: 'name' as const,
      header: 'Segment Name',
      render: (value: unknown) => (
        <strong style={{ color: '#2d3748' }}>{String(value)}</strong>
      ),
    },
    { key: 'description' as const, header: 'Description' },
    {
      key: 'contactCount' as const,
      header: 'Contacts',
      render: (value: unknown) => Number(value).toLocaleString(),
    },
    {
      key: 'rules' as const,
      header: 'Targeting Rules',
      render: (value: unknown) => (
        <code style={styles.ruleCode}>{String(value)}</code>
      ),
    },
    { key: 'lastUpdated' as const, header: 'Last Updated' },
  ];

  return (
    <PageContainer
      title="Customer Segments"
      subtitle="Manage audience segments and targeting rules"
    >
      {/* Stats */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Total Segments"
          value={mockSegments.length}
          icon="👥"
        />
        <StatsCard
          title="Total Contacts"
          value={totalContacts.toLocaleString()}
          change="Across all segments"
          changeType="neutral"
          icon="📋"
        />
        <StatsCard
          title="Avg Segment Size"
          value={Math.round(totalContacts / mockSegments.length).toLocaleString()}
          icon="📊"
        />
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <h2 style={styles.sectionTitle}>All Segments</h2>
        <button
          style={styles.createButton}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          + New Segment
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div style={styles.createForm}>
          <h3 style={styles.formTitle}>Create New Segment</h3>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Segment Name</label>
              <input type="text" style={styles.input} placeholder="e.g., Weekend Diners" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <input type="text" style={styles.input} placeholder="Brief description" />
            </div>
          </div>

          <h4 style={styles.rulesTitle}>Targeting Rules</h4>
          <div style={styles.ruleRow}>
            <select style={styles.ruleSelect}>
              <option>Order Frequency</option>
              <option>Average Order Value</option>
              <option>Last Order Date</option>
              <option>Signup Date</option>
              <option>Loyalty Status</option>
              <option>Cuisine Preference</option>
              <option>Location</option>
            </select>
            <select style={styles.ruleOperator}>
              <option>equals</option>
              <option>greater than</option>
              <option>less than</option>
              <option>contains</option>
              <option>is between</option>
            </select>
            <input type="text" style={styles.ruleValue} placeholder="Value" />
          </div>
          <button style={styles.addRuleButton}>+ Add Another Rule</button>

          <div style={styles.formActions}>
            <button style={styles.cancelButton} onClick={() => setShowCreateForm(false)}>
              Cancel
            </button>
            <button style={styles.saveButton}>Create Segment</button>
          </div>
        </div>
      )}

      {/* Segments Table */}
      <DataTable
        columns={columns}
        data={mockSegments}
        emptyMessage="No segments created yet."
      />
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
  createForm: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 24,
    marginBottom: 20,
  },
  formTitle: {
    margin: '0 0 16px',
    fontSize: 16,
    fontWeight: 600,
    color: '#2d3748',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 20,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: '#4a5568',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
  },
  rulesTitle: {
    margin: '0 0 12px',
    fontSize: 14,
    fontWeight: 600,
    color: '#4a5568',
  },
  ruleRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 12,
  },
  ruleSelect: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
  },
  ruleOperator: {
    width: 140,
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
  },
  ruleValue: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
  },
  addRuleButton: {
    background: 'none',
    border: 'none',
    color: '#6c63ff',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    padding: 0,
    marginBottom: 16,
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    color: '#4a5568',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
  },
  ruleCode: {
    fontSize: 12,
    backgroundColor: '#f7fafc',
    padding: '2px 6px',
    borderRadius: 4,
    color: '#6c63ff',
  },
};

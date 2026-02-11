import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';
import { StatsCard } from '../components/shared/StatsCard';

interface Promotion {
  id: string;
  code: string;
  description: string;
  type: string;
  discount: string;
  status: 'active' | 'expired' | 'scheduled' | 'draft';
  usageCount: number;
  maxUses: number;
  startDate: string;
  endDate: string;
}

const mockPromotions: Promotion[] = [
  {
    id: '1',
    code: 'LOVE20',
    description: "Valentine's Day 20% off",
    type: 'Percentage',
    discount: '20%',
    status: 'active',
    usageCount: 342,
    maxUses: 1000,
    startDate: '2026-02-01',
    endDate: '2026-02-14',
  },
  {
    id: '2',
    code: 'BRUNCH10',
    description: '$10 off weekend brunch',
    type: 'Fixed Amount',
    discount: '$10.00',
    status: 'active',
    usageCount: 189,
    maxUses: 500,
    startDate: '2026-01-15',
    endDate: '2026-03-01',
  },
  {
    id: '3',
    code: 'NEWUSER25',
    description: '25% off first order',
    type: 'Percentage',
    discount: '25%',
    status: 'active',
    usageCount: 1023,
    maxUses: 5000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  },
  {
    id: '4',
    code: 'SPRING15',
    description: 'Spring menu launch 15% off',
    type: 'Percentage',
    discount: '15%',
    status: 'scheduled',
    usageCount: 0,
    maxUses: 2000,
    startDate: '2026-03-01',
    endDate: '2026-04-01',
  },
  {
    id: '5',
    code: 'HOLIDAY50',
    description: 'Holiday special $50 off $200+',
    type: 'Fixed Amount',
    discount: '$50.00',
    status: 'expired',
    usageCount: 876,
    maxUses: 1000,
    startDate: '2025-12-20',
    endDate: '2026-01-05',
  },
];

export const PromotionsPage = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const activeCount = mockPromotions.filter((p) => p.status === 'active').length;
  const totalRedeemed = mockPromotions.reduce((sum, p) => sum + p.usageCount, 0);

  const columns = [
    {
      key: 'code',
      header: 'Code',
      render: (value: any, row: any) => (
        <button
          style={styles.linkButton}
          onClick={() => navigate(`/promotions/${row.id}`)}
        >
          {String(value)}
        </button>
      ),
    },
    { key: 'description', header: 'Description' },
    { key: 'type', header: 'Type' },
    { key: 'discount', header: 'Discount' },
    {
      key: 'status',
      header: 'Status',
      render: (value: any) => (
        <StatusBadge status={value as Promotion['status']} />
      ),
    },
    {
      key: 'usageCount',
      header: 'Used',
      render: (value: any, row: any) =>
        `${Number(value).toLocaleString()} / ${Number(row.maxUses).toLocaleString()}`,
    },
    { key: 'endDate', header: 'Expires' },
  ];

  return (
    <PageContainer
      title="Promotions"
      subtitle="Manage coupons and promotional offers"
    >
      {/* Stats */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Active Promotions"
          value={activeCount}
          icon="🎁"
        />
        <StatsCard
          title="Total Redemptions"
          value={totalRedeemed.toLocaleString()}
          change="+18% this month"
          changeType="positive"
          icon="🎟"
        />
        <StatsCard
          title="Revenue Impact"
          value="$12,450"
          change="Estimated from promotions"
          changeType="neutral"
          icon="💰"
        />
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <h2 style={styles.sectionTitle}>All Promotions</h2>
        <button
          style={styles.createButton}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          + New Promotion
        </button>
      </div>

      {/* Quick Create Form */}
      {showCreateForm && (
        <div style={styles.createForm}>
          <h3 style={styles.formTitle}>Create New Promotion</h3>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Promo Code</label>
              <input type="text" style={styles.input} placeholder="e.g., SUMMER20" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <input type="text" style={styles.input} placeholder="Short description" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Discount Type</label>
              <select style={styles.input}>
                <option>Percentage</option>
                <option>Fixed Amount</option>
                <option>Free Item</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Discount Value</label>
              <input type="text" style={styles.input} placeholder="e.g., 20% or $10" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Start Date</label>
              <input type="date" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>End Date</label>
              <input type="date" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Max Uses</label>
              <input type="number" style={styles.input} placeholder="e.g., 1000" />
            </div>
          </div>
          <div style={styles.formActions}>
            <button style={styles.cancelButton} onClick={() => setShowCreateForm(false)}>
              Cancel
            </button>
            <button style={styles.saveButton}>Create Promotion</button>
          </div>
        </div>
      )}

      {/* Promotions Table */}
      <DataTable
        columns={columns}
        data={mockPromotions}
        emptyMessage="No promotions created yet."
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    marginBottom: 16,
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
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#6c63ff',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    padding: 0,
    fontFamily: 'monospace',
  },
};

import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';
import { StatusBadge } from '../components/shared/StatusBadge';
import { MetricsChart } from '../components/shared/MetricsChart';
import { DataTable } from '../components/shared/DataTable';

interface UsageRecord {
  date: string;
  orderId: string;
  customer: string;
  orderTotal: string;
  discount: string;
}

const mockUsageHistory: UsageRecord[] = [
  { date: '2026-02-09', orderId: 'ORD-4521', customer: 'John D.', orderTotal: '$45.00', discount: '$9.00' },
  { date: '2026-02-09', orderId: 'ORD-4518', customer: 'Sarah M.', orderTotal: '$62.50', discount: '$12.50' },
  { date: '2026-02-08', orderId: 'ORD-4502', customer: 'Mike R.', orderTotal: '$38.00', discount: '$7.60' },
  { date: '2026-02-08', orderId: 'ORD-4499', customer: 'Lisa K.', orderTotal: '$55.00', discount: '$11.00' },
  { date: '2026-02-07', orderId: 'ORD-4487', customer: 'David P.', orderTotal: '$72.00', discount: '$14.40' },
];

export const PromotionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: Fetch promotion from Firestore by id
  const promotion = {
    id: id ?? '1',
    code: 'LOVE20',
    description: "Valentine's Day 20% off",
    type: 'Percentage',
    discount: '20%',
    status: 'active' as const,
    usageCount: 342,
    maxUses: 1000,
    startDate: '2026-02-01',
    endDate: '2026-02-14',
    minOrderAmount: '$25.00',
    maxDiscount: '$50.00',
    applicableTo: 'All Menu Items',
    createdBy: 'Marketing Admin',
  };

  const usagePercentage = ((promotion.usageCount / promotion.maxUses) * 100).toFixed(1);

  const usageColumns = [
    { key: 'date' as const, header: 'Date' },
    { key: 'orderId' as const, header: 'Order ID' },
    { key: 'customer' as const, header: 'Customer' },
    { key: 'orderTotal' as const, header: 'Order Total' },
    { key: 'discount' as const, header: 'Discount Applied' },
  ];

  return (
    <PageContainer
      title={`Promotion: ${promotion.code}`}
      subtitle={promotion.description}
    >
      {/* Back button */}
      <div style={styles.backRow}>
        <button style={styles.backButton} onClick={() => navigate('/promotions')}>
          &larr; Back to Promotions
        </button>
      </div>

      {/* Promotion Details Card */}
      <div style={styles.detailCard}>
        <div style={styles.detailGrid}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Status</span>
            <StatusBadge status={promotion.status} />
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Promo Code</span>
            <span style={styles.promoCode}>{promotion.code}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Discount Type</span>
            <span style={styles.detailValue}>{promotion.type}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Discount Value</span>
            <span style={styles.detailValue}>{promotion.discount}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Min Order</span>
            <span style={styles.detailValue}>{promotion.minOrderAmount}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Max Discount</span>
            <span style={styles.detailValue}>{promotion.maxDiscount}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Valid From</span>
            <span style={styles.detailValue}>{promotion.startDate}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Valid Until</span>
            <span style={styles.detailValue}>{promotion.endDate}</span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Applicable To</span>
            <span style={styles.detailValue}>{promotion.applicableTo}</span>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Total Redemptions"
          value={promotion.usageCount.toLocaleString()}
          change={`${usagePercentage}% of max capacity`}
          changeType="neutral"
          icon="🎟"
        />
        <StatsCard
          title="Remaining Uses"
          value={(promotion.maxUses - promotion.usageCount).toLocaleString()}
          icon="📊"
        />
        <StatsCard
          title="Revenue Generated"
          value="$15,390"
          change="From promo orders"
          changeType="positive"
          icon="💰"
        />
        <StatsCard
          title="Avg Order Value"
          value="$44.97"
          change="+12% vs non-promo"
          changeType="positive"
          icon="📈"
        />
      </div>

      {/* Usage Over Time Chart */}
      <div style={styles.section}>
        <MetricsChart
          title="Redemptions Over Time"
          description="Daily promotion usage since activation"
          height={260}
        />
      </div>

      {/* Usage History Table */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Usage History</h3>
        <DataTable
          columns={usageColumns}
          data={mockUsageHistory}
          emptyMessage="No usage records yet."
        />
      </div>
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  backRow: {
    marginBottom: 16,
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#6c63ff',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    padding: 0,
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 24,
    marginBottom: 24,
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 20,
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: '#a0aec0',
    textTransform: 'uppercase' as const,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 500,
    color: '#2d3748',
  },
  promoCode: {
    fontSize: 18,
    fontWeight: 700,
    color: '#6c63ff',
    fontFamily: 'monospace',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    margin: '0 0 12px',
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
  },
};

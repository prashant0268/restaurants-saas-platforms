import type { CSSProperties } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';

const styles: Record<string, CSSProperties> = {
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 24px 0',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
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
    margin: '0 0 16px 0',
  },
  placeholder: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '48px 24px',
    textAlign: 'center' as const,
    color: '#9ca3af',
    fontSize: '14px',
    border: '1px dashed #e5e7eb',
  },
  filterBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  filterSelect: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
};

const payoutColumns = [
  { key: 'restaurant', header: 'Restaurant', width: '25%' },
  { key: 'period', header: 'Period', width: '18%' },
  { key: 'grossRevenue', header: 'Gross Revenue', width: '15%' },
  { key: 'commission', header: 'Commission', width: '15%' },
  { key: 'netPayout', header: 'Net Payout', width: '15%' },
  { key: 'status', header: 'Status', width: '12%' },
];

export const FinancialPage = () => {
  const payoutData = [
    {
      restaurant: 'Pizza Palace',
      period: 'Jan 2026',
      grossRevenue: '$45,600',
      commission: '$6,840',
      netPayout: '$38,760',
      status: <StatusBadge status="completed" label="Paid" />,
    },
    {
      restaurant: 'Burger Barn',
      period: 'Jan 2026',
      grossRevenue: '$23,100',
      commission: '$3,465',
      netPayout: '$19,635',
      status: <StatusBadge status="pending" label="Pending" />,
    },
    {
      restaurant: 'Sushi Hub',
      period: 'Jan 2026',
      grossRevenue: '$32,100',
      commission: '$4,815',
      netPayout: '$27,285',
      status: <StatusBadge status="completed" label="Paid" />,
    },
  ];

  return (
    <PageContainer title="Financial">
      <h1 style={styles.title}>Financial Overview</h1>

      {/* Revenue Stats */}
      <div style={styles.statsRow}>
        <StatsCard
          title="Total Revenue"
          value="$2.4M"
          color="#10b981"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          title="Platform Commission"
          value="$360K"
          color="#3b82f6"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatsCard
          title="Pending Payouts"
          value="$84,200"
          color="#f59e0b"
        />
        <StatsCard
          title="Avg Commission Rate"
          value="15%"
          color="#8b5cf6"
        />
      </div>

      {/* Charts */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Revenue Trend</h3>
          <div style={styles.placeholder}>
            Revenue chart placeholder -- Line chart showing monthly revenue
            with breakdown by commission vs restaurant payouts
          </div>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Revenue by Region</h3>
          <div style={styles.placeholder}>
            Regional revenue chart placeholder -- Pie or bar chart showing
            revenue distribution across different operating regions
          </div>
        </div>
      </div>

      {/* Payouts Table */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
          Restaurant Payouts
        </h3>
        <div style={styles.filterBar}>
          <select style={styles.filterSelect}>
            <option value="">All Periods</option>
            <option value="jan-2026">January 2026</option>
            <option value="dec-2025">December 2025</option>
            <option value="nov-2025">November 2025</option>
          </select>
          <select style={styles.filterSelect}>
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <DataTable
          columns={payoutColumns}
          data={payoutData}
          emptyMessage="No payout records found"
        />
      </div>
    </PageContainer>
  );
};

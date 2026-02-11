import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';
import { StatsCard } from '../components/shared/StatsCard';

const styles: Record<string, CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  filterBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap' as const,
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    minWidth: '280px',
    outline: 'none',
  },
  filterSelect: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  viewBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
};

const columns = [
  { key: 'orderId', header: 'Order ID', width: '12%' },
  { key: 'customer', header: 'Customer', width: '15%' },
  { key: 'restaurant', header: 'Restaurant', width: '15%' },
  { key: 'status', header: 'Status', width: '12%' },
  { key: 'total', header: 'Total', width: '10%' },
  { key: 'driver', header: 'Driver', width: '12%' },
  { key: 'date', header: 'Date', width: '14%' },
  { key: 'actions', header: 'Actions', width: '10%' },
];

export const OrdersPage = () => {
  const navigate = useNavigate();

  const sampleData = [
    {
      orderId: '#ORD-12456',
      customer: 'Alice Johnson',
      restaurant: 'Pizza Palace',
      status: <StatusBadge status="delivered" />,
      total: '$34.50',
      driver: 'David M.',
      date: 'Feb 8, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/orders/12456')}>
          View
        </button>
      ),
    },
    {
      orderId: '#ORD-12457',
      customer: 'Bob Williams',
      restaurant: 'Burger Barn',
      status: <StatusBadge status="in_progress" />,
      total: '$22.00',
      driver: 'Sarah G.',
      date: 'Feb 9, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/orders/12457')}>
          View
        </button>
      ),
    },
    {
      orderId: '#ORD-12458',
      customer: 'Emma Davis',
      restaurant: 'Sushi Hub',
      status: <StatusBadge status="cancelled" />,
      total: '$56.75',
      driver: '--',
      date: 'Feb 9, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/orders/12458')}>
          View
        </button>
      ),
    },
    {
      orderId: '#ORD-12459',
      customer: 'Chris Lee',
      restaurant: 'Pizza Palace',
      status: <StatusBadge status="pending" />,
      total: '$18.25',
      driver: 'Unassigned',
      date: 'Feb 9, 2026',
      actions: (
        <button style={styles.viewBtn} onClick={() => navigate('/orders/12459')}>
          View
        </button>
      ),
    },
  ];

  return (
    <PageContainer title="Orders">
      <div style={styles.header}>
        <h1 style={styles.title}>Order Monitoring</h1>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <StatsCard title="Total Orders" value="128,456" color="#3b82f6" />
        <StatsCard title="Active Now" value="342" color="#10b981" />
        <StatsCard title="Cancelled Today" value="12" color="#ef4444" />
        <StatsCard title="Avg Order Value" value="$28.50" color="#8b5cf6" />
      </div>

      {/* Filters */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search by order ID, customer, or restaurant..."
          style={styles.searchInput}
        />
        <select style={styles.filterSelect}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select style={styles.filterSelect}>
          <option value="">All Restaurants</option>
          <option value="pizza-palace">Pizza Palace</option>
          <option value="burger-barn">Burger Barn</option>
          <option value="sushi-hub">Sushi Hub</option>
        </select>
        <select style={styles.filterSelect}>
          <option value="">Date Range</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Orders Table */}
      <DataTable
        columns={columns}
        data={sampleData}
        emptyMessage="No orders found"
      />
    </PageContainer>
  );
};

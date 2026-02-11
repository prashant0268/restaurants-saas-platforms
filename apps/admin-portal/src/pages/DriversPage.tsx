import type { CSSProperties } from 'react';
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
  actionBtn: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    marginRight: '6px',
  },
};

const columns = [
  { key: 'name', header: 'Name', width: '15%' },
  { key: 'email', header: 'Email', width: '18%' },
  { key: 'status', header: 'Status', width: '10%' },
  { key: 'documents', header: 'Documents', width: '12%' },
  { key: 'deliveries', header: 'Deliveries', width: '10%' },
  { key: 'rating', header: 'Rating', width: '10%' },
  { key: 'region', header: 'Region', width: '12%' },
  { key: 'actions', header: 'Actions', width: '13%' },
];

export const DriversPage = () => {
  const sampleData = [
    {
      name: 'David Miller',
      email: 'david.m@example.com',
      status: <StatusBadge status="active" />,
      documents: <StatusBadge status="approved" label="Verified" />,
      deliveries: '2,341',
      rating: '4.8',
      region: 'New York',
      actions: (
        <div>
          <button style={{ ...styles.actionBtn, backgroundColor: '#dbeafe', color: '#1e40af' }}>
            View
          </button>
          <button style={{ ...styles.actionBtn, backgroundColor: '#fee2e2', color: '#991b1b' }}>
            Suspend
          </button>
        </div>
      ),
    },
    {
      name: 'Sarah Garcia',
      email: 'sarah.g@example.com',
      status: <StatusBadge status="pending" />,
      documents: <StatusBadge status="pending" label="Under Review" />,
      deliveries: '0',
      rating: '--',
      region: 'Los Angeles',
      actions: (
        <div>
          <button style={{ ...styles.actionBtn, backgroundColor: '#d1fae5', color: '#065f46' }}>
            Approve
          </button>
          <button style={{ ...styles.actionBtn, backgroundColor: '#fee2e2', color: '#991b1b' }}>
            Reject
          </button>
        </div>
      ),
    },
    {
      name: 'Tom Wilson',
      email: 'tom.w@example.com',
      status: <StatusBadge status="suspended" />,
      documents: <StatusBadge status="approved" label="Verified" />,
      deliveries: '876',
      rating: '3.2',
      region: 'Chicago',
      actions: (
        <div>
          <button style={{ ...styles.actionBtn, backgroundColor: '#dbeafe', color: '#1e40af' }}>
            View
          </button>
          <button style={{ ...styles.actionBtn, backgroundColor: '#d1fae5', color: '#065f46' }}>
            Reactivate
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer title="Drivers">
      <div style={styles.header}>
        <h1 style={styles.title}>Driver Management</h1>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <StatsCard title="Total Drivers" value="2,434" color="#3b82f6" />
        <StatsCard title="Active Today" value="1,102" color="#10b981" />
        <StatsCard title="Pending Approval" value="34" color="#f59e0b" />
        <StatsCard title="Avg Rating" value="4.6" color="#8b5cf6" />
      </div>

      {/* Filters */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search drivers by name or email..."
          style={styles.searchInput}
        />
        <select style={styles.filterSelect}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending Approval</option>
          <option value="suspended">Suspended</option>
        </select>
        <select style={styles.filterSelect}>
          <option value="">All Regions</option>
          <option value="new-york">New York</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
        </select>
        <select style={styles.filterSelect}>
          <option value="">Document Status</option>
          <option value="verified">Verified</option>
          <option value="under-review">Under Review</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Drivers Table */}
      <DataTable
        columns={columns}
        data={sampleData}
        emptyMessage="No drivers found"
      />
    </PageContainer>
  );
};

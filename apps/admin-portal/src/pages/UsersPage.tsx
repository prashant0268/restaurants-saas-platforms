import type { CSSProperties } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';

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
    gap: '16px',
    marginBottom: '24px',
  },
  statBox: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '16px 24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    flex: 1,
  },
  statLabel: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 4px 0',
  },
  statValue: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
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
  { key: 'name', header: 'Name', width: '18%' },
  { key: 'email', header: 'Email', width: '22%' },
  { key: 'role', header: 'Role', width: '12%' },
  { key: 'status', header: 'Status', width: '10%' },
  { key: 'joined', header: 'Joined', width: '14%' },
  { key: 'orders', header: 'Orders', width: '10%' },
  { key: 'actions', header: 'Actions', width: '14%' },
];

export const UsersPage = () => {
  const sampleData = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Customer',
      status: <StatusBadge status="active" />,
      joined: 'Mar 12, 2025',
      orders: '47',
      actions: (
        <div>
          <button style={{ ...styles.actionBtn, backgroundColor: '#fee2e2', color: '#991b1b' }}>
            Ban
          </button>
        </div>
      ),
    },
    {
      name: 'Bob Williams',
      email: 'bob@example.com',
      role: 'Restaurant Owner',
      status: <StatusBadge status="active" />,
      joined: 'Jan 5, 2025',
      orders: '--',
      actions: (
        <div>
          <button style={{ ...styles.actionBtn, backgroundColor: '#fee2e2', color: '#991b1b' }}>
            Ban
          </button>
        </div>
      ),
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'Customer',
      status: <StatusBadge status="banned" />,
      joined: 'Feb 20, 2025',
      orders: '3',
      actions: (
        <div>
          <button style={{ ...styles.actionBtn, backgroundColor: '#d1fae5', color: '#065f46' }}>
            Unban
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer title="Users">
      <div style={styles.header}>
        <h1 style={styles.title}>Users</h1>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statBox}>
          <p style={styles.statLabel}>Total Users</p>
          <p style={styles.statValue}>45,832</p>
        </div>
        <div style={styles.statBox}>
          <p style={styles.statLabel}>Customers</p>
          <p style={styles.statValue}>42,150</p>
        </div>
        <div style={styles.statBox}>
          <p style={styles.statLabel}>Restaurant Owners</p>
          <p style={styles.statValue}>1,248</p>
        </div>
        <div style={styles.statBox}>
          <p style={styles.statLabel}>Banned</p>
          <p style={styles.statValue}>89</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search users by name or email..."
          style={styles.searchInput}
        />
        <select style={styles.filterSelect}>
          <option value="">All Roles</option>
          <option value="customer">Customer</option>
          <option value="restaurant_owner">Restaurant Owner</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>
        <select style={styles.filterSelect}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <DataTable
        columns={columns}
        data={sampleData}
        emptyMessage="No users found"
      />
    </PageContainer>
  );
};

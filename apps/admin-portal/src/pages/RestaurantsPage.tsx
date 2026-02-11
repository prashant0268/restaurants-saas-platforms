import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
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
  approveBtn: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  suspendBtn: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  viewBtn: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
};

const columns = [
  { key: 'name', header: 'Name', width: '20%' },
  { key: 'owner', header: 'Owner', width: '15%' },
  { key: 'status', header: 'Status', width: '12%' },
  { key: 'location', header: 'Location', width: '15%' },
  { key: 'orders', header: 'Orders', width: '10%' },
  { key: 'revenue', header: 'Revenue', width: '12%' },
  { key: 'actions', header: 'Actions', width: '16%' },
];

export const RestaurantsPage = () => {
  const navigate = useNavigate();

  const sampleData = [
    {
      name: 'Pizza Palace',
      owner: 'John Smith',
      status: <StatusBadge status="active" />,
      location: 'New York, NY',
      orders: '1,234',
      revenue: '$45,600',
      actions: (
        <div>
          <button
            style={{ ...styles.actionBtn, ...styles.viewBtn }}
            onClick={() => navigate('/restaurants/1')}
          >
            View
          </button>
          <button style={{ ...styles.actionBtn, ...styles.suspendBtn }}>
            Suspend
          </button>
        </div>
      ),
    },
    {
      name: 'Burger Barn',
      owner: 'Jane Doe',
      status: <StatusBadge status="pending" />,
      location: 'Los Angeles, CA',
      orders: '0',
      revenue: '$0',
      actions: (
        <div>
          <button
            style={{ ...styles.actionBtn, ...styles.viewBtn }}
            onClick={() => navigate('/restaurants/2')}
          >
            View
          </button>
          <button style={{ ...styles.actionBtn, ...styles.approveBtn }}>
            Approve
          </button>
        </div>
      ),
    },
    {
      name: 'Sushi Hub',
      owner: 'Mike Chen',
      status: <StatusBadge status="suspended" />,
      location: 'Chicago, IL',
      orders: '856',
      revenue: '$32,100',
      actions: (
        <div>
          <button
            style={{ ...styles.actionBtn, ...styles.viewBtn }}
            onClick={() => navigate('/restaurants/3')}
          >
            View
          </button>
          <button style={{ ...styles.actionBtn, ...styles.approveBtn }}>
            Reactivate
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer title="Restaurants">
      <div style={styles.header}>
        <h1 style={styles.title}>Restaurants</h1>
      </div>

      {/* Search and Filter Bar */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search restaurants by name, owner, or location..."
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
          <option value="northeast">Northeast</option>
          <option value="southeast">Southeast</option>
          <option value="midwest">Midwest</option>
          <option value="west">West</option>
        </select>
      </div>

      {/* Restaurants Table */}
      <DataTable
        columns={columns}
        data={sampleData}
        emptyMessage="No restaurants found"
      />
    </PageContainer>
  );
};

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useCampaignStore } from '../stores/campaignStore';

type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'scheduled';

const statusFilters: Array<{ value: CampaignStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All Campaigns' },
  { value: 'active', label: 'Active' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'draft', label: 'Draft' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
];

export const CampaignsPage = () => {
  const { campaigns, fetchCampaigns, filter, setFilter } = useCampaignStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const filteredCampaigns =
    filter === 'all'
      ? campaigns
      : campaigns.filter((c) => c.status === filter);

  const columns = [
    {
      key: 'name',
      header: 'Campaign Name',
      render: (value: any, row: any) => (
        <button
          style={styles.linkButton}
          onClick={() => navigate(`/campaigns/${row.id}`)}
        >
          {String(value)}
        </button>
      ),
    },
    { key: 'channel', header: 'Channel' },
    {
      key: 'status',
      header: 'Status',
      render: (value: any) => (
        <StatusBadge status={value as CampaignStatus} />
      ),
    },
    { key: 'audience', header: 'Audience' },
    {
      key: 'sentCount',
      header: 'Sent',
      render: (value: any) => Number(value).toLocaleString(),
    },
    {
      key: 'openedCount',
      header: 'Opened',
      render: (value: any) => Number(value).toLocaleString(),
    },
    { key: 'createdAt', header: 'Created' },
  ];

  return (
    <PageContainer
      title="Campaigns"
      subtitle="Manage all your marketing campaigns"
    >
      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.filters}>
          {statusFilters.map((f) => (
            <button
              key={f.value}
              style={{
                ...styles.filterButton,
                ...(filter === f.value ? styles.filterButtonActive : {}),
              }}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          style={styles.createButton}
          onClick={() => navigate('/campaigns/new')}
        >
          + New Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <DataTable
        columns={columns}
        data={filteredCampaigns}
        emptyMessage={
          filter === 'all'
            ? 'No campaigns yet. Create your first campaign!'
            : `No ${filter} campaigns found.`
        }
      />
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  filters: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    color: '#4a5568',
  },
  filterButtonActive: {
    backgroundColor: '#6c63ff',
    borderColor: '#6c63ff',
    color: '#ffffff',
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
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#6c63ff',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    padding: 0,
    textDecoration: 'underline',
  },
};

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';
import { MetricsChart } from '../components/shared/MetricsChart';
import { useCampaignStore } from '../stores/campaignStore';

const recentActivity = [
  { id: '1', action: 'Campaign "Weekend Brunch" sent', time: '2 hours ago' },
  { id: '2', action: 'New segment "Vegan Diners" created', time: '5 hours ago' },
  { id: '3', action: 'A/B test completed for "Menu Launch"', time: '1 day ago' },
  { id: '4', action: 'Promotion "LOVE20" activated', time: '1 day ago' },
  { id: '5', action: 'Email template "Spring Menu" published', time: '2 days ago' },
];

export const DashboardPage = () => {
  const { campaigns, fetchCampaigns } = useCampaignStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const totalSent = campaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const totalDelivered = campaigns.reduce((sum, c) => sum + c.deliveredCount, 0);
  const totalOpened = campaigns.reduce((sum, c) => sum + c.openedCount, 0);

  const topCampaignColumns = [
    { key: 'name' as const, header: 'Campaign' },
    {
      key: 'status' as const,
      header: 'Status',
      render: (value: unknown) => (
        <StatusBadge status={value as 'active' | 'paused' | 'draft' | 'completed' | 'scheduled'} />
      ),
    },
    { key: 'channel' as const, header: 'Channel' },
    { key: 'sentCount' as const, header: 'Sent' },
    { key: 'openedCount' as const, header: 'Opened' },
    { key: 'clickedCount' as const, header: 'Clicked' },
  ];

  return (
    <PageContainer title="Dashboard" subtitle="Campaign overview and key metrics">
      {/* Key Metrics */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Active Campaigns"
          value={activeCampaigns.length}
          change="+2 this week"
          changeType="positive"
          icon="📣"
        />
        <StatsCard
          title="Total Sent"
          value={totalSent.toLocaleString()}
          change="+12% vs last month"
          changeType="positive"
          icon="📤"
        />
        <StatsCard
          title="Delivered"
          value={totalDelivered.toLocaleString()}
          change="98.1% delivery rate"
          changeType="positive"
          icon="✅"
        />
        <StatsCard
          title="Opened"
          value={totalOpened.toLocaleString()}
          change="45.2% open rate"
          changeType="positive"
          icon="👁"
        />
      </div>

      {/* Performance Chart */}
      <div style={styles.section}>
        <MetricsChart
          title="Campaign Performance Over Time"
          description="Sent, delivered, opened, and clicked metrics over the last 30 days"
          height={280}
        />
      </div>

      {/* Top Campaigns Table */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Top Campaigns</h2>
          <button
            style={styles.viewAllButton}
            onClick={() => navigate('/campaigns')}
          >
            View All
          </button>
        </div>
        <DataTable
          columns={topCampaignColumns}
          data={campaigns.slice(0, 5)}
          emptyMessage="No campaigns yet. Create your first campaign!"
        />
      </div>

      {/* Recent Activity */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        <div style={styles.activityList}>
          {recentActivity.map((item) => (
            <div key={item.id} style={styles.activityItem}>
              <span style={styles.activityDot} />
              <span style={styles.activityAction}>{item.action}</span>
              <span style={styles.activityTime}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    margin: '0 0 12px',
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
  },
  viewAllButton: {
    padding: '8px 16px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
  },
  activityList: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 16,
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 0',
    borderBottom: '1px solid #edf2f7',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#6c63ff',
    flexShrink: 0,
  },
  activityAction: {
    flex: 1,
    fontSize: 14,
    color: '#2d3748',
  },
  activityTime: {
    fontSize: 12,
    color: '#a0aec0',
    whiteSpace: 'nowrap',
  },
};

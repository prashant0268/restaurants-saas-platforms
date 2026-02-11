import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';
import { StatusBadge } from '../components/shared/StatusBadge';
import { MetricsChart } from '../components/shared/MetricsChart';
import { useCampaignStore } from '../stores/campaignStore';

export const CampaignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedCampaign, selectCampaign, fetchCampaigns, clearSelection } =
    useCampaignStore();

  useEffect(() => {
    fetchCampaigns().then(() => {
      if (id) selectCampaign(id);
    });
    return () => clearSelection();
  }, [id, fetchCampaigns, selectCampaign, clearSelection]);

  if (!selectedCampaign) {
    return (
      <PageContainer title="Campaign Detail">
        <div style={styles.notFound}>
          <h3>Campaign not found</h3>
          <button style={styles.backButton} onClick={() => navigate('/campaigns')}>
            Back to Campaigns
          </button>
        </div>
      </PageContainer>
    );
  }

  const openRate =
    selectedCampaign.sentCount > 0
      ? ((selectedCampaign.openedCount / selectedCampaign.sentCount) * 100).toFixed(1)
      : '0';

  const clickRate =
    selectedCampaign.openedCount > 0
      ? ((selectedCampaign.clickedCount / selectedCampaign.openedCount) * 100).toFixed(1)
      : '0';

  const deliveryRate =
    selectedCampaign.sentCount > 0
      ? ((selectedCampaign.deliveredCount / selectedCampaign.sentCount) * 100).toFixed(1)
      : '0';

  return (
    <PageContainer
      title={selectedCampaign.name}
      subtitle={`Campaign ID: ${selectedCampaign.id}`}
    >
      {/* Campaign Info Bar */}
      <div style={styles.infoBar}>
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>Status</span>
          <StatusBadge status={selectedCampaign.status} />
        </div>
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>Channel</span>
          <span style={styles.infoValue}>{selectedCampaign.channel}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>Audience</span>
          <span style={styles.infoValue}>{selectedCampaign.audience}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>Created</span>
          <span style={styles.infoValue}>{selectedCampaign.createdAt}</span>
        </div>
        <div style={styles.infoActions}>
          <button
            style={styles.editButton}
            onClick={() => navigate(`/campaigns/new?edit=${selectedCampaign.id}`)}
          >
            Edit
          </button>
          <button style={styles.pauseButton}>
            {selectedCampaign.status === 'paused' ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>

      {/* Delivery Metrics */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Sent"
          value={selectedCampaign.sentCount.toLocaleString()}
          icon="📤"
        />
        <StatsCard
          title="Delivered"
          value={selectedCampaign.deliveredCount.toLocaleString()}
          change={`${deliveryRate}% delivery rate`}
          changeType="positive"
          icon="✅"
        />
        <StatsCard
          title="Opened"
          value={selectedCampaign.openedCount.toLocaleString()}
          change={`${openRate}% open rate`}
          changeType="positive"
          icon="👁"
        />
        <StatsCard
          title="Clicked"
          value={selectedCampaign.clickedCount.toLocaleString()}
          change={`${clickRate}% click rate`}
          changeType="positive"
          icon="🖱"
        />
      </div>

      {/* Engagement Over Time */}
      <div style={styles.section}>
        <MetricsChart
          title="Engagement Over Time"
          description="Opens and clicks tracked over campaign duration"
          height={280}
        />
      </div>

      {/* Device & Location Breakdown */}
      <div style={styles.chartsRow}>
        <div style={styles.halfChart}>
          <MetricsChart
            title="Device Breakdown"
            description="Opens by device type"
            height={220}
          />
        </div>
        <div style={styles.halfChart}>
          <MetricsChart
            title="Location Breakdown"
            description="Engagement by geographic region"
            height={220}
          />
        </div>
      </div>

      {/* Activity Log */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Campaign Activity Log</h3>
        <div style={styles.activityLog}>
          <div style={styles.logItem}>
            <span style={styles.logTime}>2026-02-09 10:00</span>
            <span>Campaign sent to {selectedCampaign.sentCount.toLocaleString()} recipients</span>
          </div>
          <div style={styles.logItem}>
            <span style={styles.logTime}>2026-02-09 09:55</span>
            <span>Campaign approved and queued</span>
          </div>
          <div style={styles.logItem}>
            <span style={styles.logTime}>2026-02-08 16:30</span>
            <span>Campaign content finalized</span>
          </div>
          <div style={styles.logItem}>
            <span style={styles.logTime}>2026-02-08 14:00</span>
            <span>Campaign created</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  infoBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: '#a0aec0',
    textTransform: 'uppercase' as const,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 500,
    color: '#2d3748',
    textTransform: 'capitalize' as const,
  },
  infoActions: {
    marginLeft: 'auto',
    display: 'flex',
    gap: 8,
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
  },
  pauseButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    color: '#4a5568',
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
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 24,
  },
  halfChart: {
    minWidth: 0,
  },
  activityLog: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 16,
  },
  logItem: {
    display: 'flex',
    gap: 16,
    padding: '10px 0',
    borderBottom: '1px solid #edf2f7',
    fontSize: 14,
    color: '#2d3748',
  },
  logTime: {
    fontSize: 12,
    color: '#a0aec0',
    whiteSpace: 'nowrap',
    minWidth: 140,
  },
  notFound: {
    textAlign: 'center' as const,
    padding: 60,
    color: '#718096',
  },
  backButton: {
    marginTop: 12,
    padding: '10px 20px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
  },
};

import type { CSSProperties } from 'react';
import { Header } from '../components/layout/Header';
import { FeatureList } from '../components/shared/FeatureList';
import { mockCampaigns } from '../data/mockDemoData';

const channels = [
  { name: 'Instagram', emoji: '\u{1F4F7}', followers: '12.4K followers' },
  { name: 'Facebook', emoji: '\u{1F44D}', followers: '8.7K followers' },
  { name: 'TikTok', emoji: '\u{1F3A5}', followers: '24.6K followers' },
  { name: 'YouTube', emoji: '\u{1F4FA}', followers: '3.8K subscribers' },
  { name: 'Google', emoji: '\u{1F50D}', followers: '3.2K reviews' },
  { name: 'Yelp', emoji: '\u{1F4CD}', followers: '2.1K reviews' },
  { name: 'Email', emoji: '\u{1F4E7}', followers: '5.8K subscribers' },
];

const features = [
  'Multi-channel campaign builder',
  'A/B testing & optimization',
  'Audience segmentation',
  'Automated scheduling',
  'ROI tracking & attribution',
  'AI content suggestions',
];

const statusColors: Record<string, { bg: string; text: string }> = {
  active: { bg: '#dcfce7', text: '#16a34a' },
  scheduled: { bg: '#dbeafe', text: '#2563eb' },
  completed: { bg: '#f3f4f6', text: '#6b7280' },
};

const styles: Record<string, CSSProperties> = {
  page: {
    padding: 0,
    width: '100%',
    overflowX: 'hidden',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  channelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  channelCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'center',
  },
  channelIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: '#ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
  },
  channelInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  channelName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  channelFollowers: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  campaignGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
  },
  campaignCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  campaignHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  campaignName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  campaignDate: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  badgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  channelBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    fontSize: '12px',
    fontWeight: 500,
  },
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '8px',
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    padding: '8px 4px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
  },
  metricValue: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  metricLabel: {
    fontSize: '11px',
    color: '#6b7280',
    margin: 0,
  },
  featureSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #e5e7eb',
  },
  featureSectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
};

const formatMetric = (value: number): string => {
  if (value === 0) return '\u2014';
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

export const SocialMediaPage = () => {
  return (
    <div style={styles.page}>
      <Header
        title="Social Media Manager"
        subtitle="Create, schedule, and track campaigns across all channels"
      />

      <h2 style={styles.sectionTitle}>Connected Channels</h2>
      <div style={styles.channelGrid}>
        {channels.map((channel) => (
          <div key={channel.name} style={styles.channelCard}>
            <div style={styles.channelIcon}>{channel.emoji}</div>
            <div style={styles.channelInfo}>
              <p style={styles.channelName}>{channel.name}</p>
              <p style={styles.channelFollowers}>{channel.followers}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Campaigns</h2>
      <div style={styles.campaignGrid}>
        {mockCampaigns.map((campaign) => {
          const statusStyle = statusColors[campaign.status] ?? statusColors.completed;
          return (
            <div key={campaign.id} style={styles.campaignCard}>
              <div style={styles.campaignHeader}>
                <div>
                  <p style={styles.campaignName}>{campaign.name}</p>
                  <p style={styles.campaignDate}>{campaign.startDate} — {campaign.endDate}</p>
                </div>
                <div style={styles.badgeRow}>
                  <span style={styles.channelBadge}>{campaign.channel}</span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text,
                      textTransform: 'capitalize',
                    }}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>
              <div style={styles.metricsRow}>
                <div style={styles.metricItem}>
                  <p style={styles.metricValue}>{formatMetric(campaign.sent)}</p>
                  <p style={styles.metricLabel}>Sent</p>
                </div>
                <div style={styles.metricItem}>
                  <p style={styles.metricValue}>{formatMetric(campaign.opened)}</p>
                  <p style={styles.metricLabel}>Opened</p>
                </div>
                <div style={styles.metricItem}>
                  <p style={styles.metricValue}>{formatMetric(campaign.clicked)}</p>
                  <p style={styles.metricLabel}>Clicked</p>
                </div>
                <div style={styles.metricItem}>
                  <p style={styles.metricValue}>{formatMetric(campaign.converted)}</p>
                  <p style={styles.metricLabel}>Converted</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.featureSection}>
        <h3 style={styles.featureSectionTitle}>Platform Features</h3>
        <FeatureList features={features} />
      </div>
    </div>
  );
};

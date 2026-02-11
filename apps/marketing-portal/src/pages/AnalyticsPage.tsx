import { PageContainer } from '../components/layout/PageContainer';
import { StatsCard } from '../components/shared/StatsCard';
import { MetricsChart } from '../components/shared/MetricsChart';
import { DataTable } from '../components/shared/DataTable';

interface ChannelMetric {
  channel: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  conversionRate: string;
}

const channelMetrics: ChannelMetric[] = [
  {
    channel: 'Email',
    sent: 15200,
    delivered: 14900,
    opened: 6800,
    clicked: 2100,
    converted: 890,
    conversionRate: '5.9%',
  },
  {
    channel: 'SMS',
    sent: 8400,
    delivered: 8300,
    opened: 7200,
    clicked: 1800,
    converted: 620,
    conversionRate: '7.4%',
  },
  {
    channel: 'Push Notification',
    sent: 12000,
    delivered: 11800,
    opened: 4500,
    clicked: 1200,
    converted: 450,
    conversionRate: '3.8%',
  },
  {
    channel: 'In-App Message',
    sent: 6500,
    delivered: 6500,
    opened: 5200,
    clicked: 2800,
    converted: 1100,
    conversionRate: '16.9%',
  },
];

const channelColumns = [
  { key: 'channel' as const, header: 'Channel' },
  {
    key: 'sent' as const,
    header: 'Sent',
    render: (v: unknown) => Number(v).toLocaleString(),
  },
  {
    key: 'delivered' as const,
    header: 'Delivered',
    render: (v: unknown) => Number(v).toLocaleString(),
  },
  {
    key: 'opened' as const,
    header: 'Opened',
    render: (v: unknown) => Number(v).toLocaleString(),
  },
  {
    key: 'clicked' as const,
    header: 'Clicked',
    render: (v: unknown) => Number(v).toLocaleString(),
  },
  {
    key: 'converted' as const,
    header: 'Converted',
    render: (v: unknown) => Number(v).toLocaleString(),
  },
  { key: 'conversionRate' as const, header: 'Conv. Rate' },
];

export const AnalyticsPage = () => {
  const totalSent = channelMetrics.reduce((sum, m) => sum + m.sent, 0);
  const totalConverted = channelMetrics.reduce((sum, m) => sum + m.converted, 0);
  const overallConvRate = ((totalConverted / totalSent) * 100).toFixed(1);

  return (
    <PageContainer
      title="Marketing Analytics"
      subtitle="Engagement, conversion, and retention insights"
    >
      {/* Top-Level KPIs */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Total Messages Sent"
          value={totalSent.toLocaleString()}
          change="+22% vs last month"
          changeType="positive"
          icon="📤"
        />
        <StatsCard
          title="Overall Open Rate"
          value="56.3%"
          change="+3.2% vs last month"
          changeType="positive"
          icon="👁"
        />
        <StatsCard
          title="Click-Through Rate"
          value="18.8%"
          change="+1.5% vs last month"
          changeType="positive"
          icon="🖱"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${overallConvRate}%`}
          change="+0.8% vs last month"
          changeType="positive"
          icon="🎯"
        />
      </div>

      {/* Engagement Over Time */}
      <div style={styles.section}>
        <MetricsChart
          title="Engagement Funnel Over Time"
          description="Sent > Delivered > Opened > Clicked > Converted - last 30 days"
          height={300}
        />
      </div>

      {/* Channel Performance Table */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Channel Performance Breakdown</h3>
        <DataTable
          columns={channelColumns}
          data={channelMetrics}
        />
      </div>

      {/* Charts Row */}
      <div style={styles.chartsRow}>
        <div style={styles.halfChart}>
          <MetricsChart
            title="Retention Cohort Analysis"
            description="Customer return rate by acquisition cohort"
            height={260}
          />
        </div>
        <div style={styles.halfChart}>
          <MetricsChart
            title="Revenue Attribution"
            description="Revenue attributed to marketing campaigns"
            height={260}
          />
        </div>
      </div>

      {/* More Charts */}
      <div style={styles.chartsRow}>
        <div style={styles.halfChart}>
          <MetricsChart
            title="Customer Lifetime Value Trend"
            description="Average CLV over the past 6 months"
            height={240}
          />
        </div>
        <div style={styles.halfChart}>
          <MetricsChart
            title="Best Send Times"
            description="Engagement rates by day of week and hour"
            height={240}
          />
        </div>
      </div>

      {/* Additional Metrics */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Retention Metrics</h3>
        <div style={styles.statsGrid}>
          <StatsCard
            title="30-Day Retention"
            value="68.4%"
            change="+2.1% vs prior period"
            changeType="positive"
            icon="🔄"
          />
          <StatsCard
            title="Repeat Order Rate"
            value="42.7%"
            change="+4.3% vs last month"
            changeType="positive"
            icon="🔁"
          />
          <StatsCard
            title="Churn Rate"
            value="8.2%"
            change="-1.1% vs last month"
            changeType="positive"
            icon="📉"
          />
          <StatsCard
            title="NPS Score"
            value="72"
            change="+5 vs last quarter"
            changeType="positive"
            icon="⭐"
          />
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
};

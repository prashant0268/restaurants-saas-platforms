import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { StatsCard } from '../components/shared/StatsCard';
import { PipelineStage } from '../components/shared/PipelineStage';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useLeadsStore } from '../stores/leadsStore';
import type { LeadStatus } from '../stores/leadsStore';

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1400px',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  section: {
    marginBottom: '32px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  viewAllLink: {
    fontSize: '14px',
    color: '#3b82f6',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    background: 'none',
    border: 'none',
  },
  pipelineRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const,
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 16px',
    borderBottom: '2px solid #e5e7eb',
    color: '#6b7280',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
  },
  targetBar: {
    marginTop: '16px',
  },
  targetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  targetLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  targetValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  progressBarBg: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  rowClickable: {
    cursor: 'pointer',
  },
};

const pipelineStages: { stage: string; status: LeadStatus; color: string }[] = [
  { stage: 'New', status: 'new', color: '#3b82f6' },
  { stage: 'Contacted', status: 'contacted', color: '#f59e0b' },
  { stage: 'Qualified', status: 'qualified', color: '#8b5cf6' },
  { stage: 'Demo', status: 'demo', color: '#ec4899' },
  { stage: 'Converted', status: 'converted', color: '#10b981' },
  { stage: 'Lost', status: 'lost', color: '#ef4444' },
];

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { leads } = useLeadsStore();

  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === 'converted').length;
  const conversionRate = totalLeads > 0
    ? Math.round((convertedLeads / totalLeads) * 100)
    : 0;
  const totalPipelineValue = leads
    .filter((l) => l.status !== 'lost' && l.status !== 'converted')
    .reduce((sum, l) => sum + l.estimatedValue, 0);
  const monthlyTarget = 5000;
  const currentRevenue = leads
    .filter((l) => l.status === 'converted')
    .reduce((sum, l) => sum + l.estimatedValue, 0);
  const targetProgress = Math.round((currentRevenue / monthlyTarget) * 100);

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <>
      <Header title="Dashboard" />
      <div style={styles.container}>
        <div style={styles.statsRow}>
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            color="#3b82f6"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Pipeline Value"
            value={`$${totalPipelineValue.toLocaleString()}/mo`}
            color="#8b5cf6"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            color="#10b981"
            trend={{ value: 3, isPositive: true }}
          />
          <StatsCard
            title="Converted This Month"
            value={convertedLeads}
            color="#f59e0b"
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        <div style={styles.section}>
          <div style={styles.card}>
            <div style={styles.targetHeader}>
              <p style={styles.targetLabel}>Monthly Revenue Target</p>
              <p style={styles.targetValue}>
                ${currentRevenue.toLocaleString()} / ${monthlyTarget.toLocaleString()}
              </p>
            </div>
            <div style={styles.progressBarBg}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${Math.min(targetProgress, 100)}%`,
                }}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              {targetProgress}% of target reached
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Pipeline Overview</h3>
          </div>
          <div style={styles.pipelineRow}>
            {pipelineStages.map(({ stage, status, color }) => {
              const stageLeads = leads.filter((l) => l.status === status);
              const stageValue = stageLeads.reduce((sum, l) => sum + l.estimatedValue, 0);
              const maxCount = Math.max(
                ...pipelineStages.map(
                  (s) => leads.filter((l) => l.status === s.status).length
                ),
                1
              );
              return (
                <PipelineStage
                  key={stage}
                  stage={stage}
                  count={stageLeads.length}
                  value={stageValue}
                  color={color}
                  percentage={(stageLeads.length / maxCount) * 100}
                />
              );
            })}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Recent Leads</h3>
            <button
              style={styles.viewAllLink}
              onClick={() => navigate('/leads')}
            >
              View All Leads
            </button>
          </div>
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Restaurant</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Value</th>
                  <th style={styles.th}>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    style={styles.rowClickable}
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <td style={styles.td}>{lead.restaurantName}</td>
                    <td style={styles.td}>{lead.contactName}</td>
                    <td style={styles.td}>
                      <StatusBadge status={lead.status} />
                    </td>
                    <td style={styles.td}>${lead.estimatedValue}/mo</td>
                    <td style={styles.td}>{lead.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

import { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { DataTable } from '../components/shared/DataTable';
import { StatusBadge } from '../components/shared/StatusBadge';
import { StatsCard } from '../components/shared/StatsCard';
import { MetricsChart } from '../components/shared/MetricsChart';

interface ABTest {
  id: string;
  name: string;
  campaign: string;
  status: 'active' | 'completed' | 'draft';
  variantA: string;
  variantB: string;
  variantARate: string;
  variantBRate: string;
  winner: string;
  startDate: string;
  endDate: string;
}

const mockTests: ABTest[] = [
  {
    id: '1',
    name: 'Subject Line Test - Brunch',
    campaign: 'Weekend Brunch Special',
    status: 'completed',
    variantA: 'Your Weekend Brunch Awaits!',
    variantB: '20% Off Brunch This Saturday',
    variantARate: '42.3%',
    variantBRate: '51.8%',
    winner: 'B',
    startDate: '2026-02-01',
    endDate: '2026-02-07',
  },
  {
    id: '2',
    name: 'CTA Button Color',
    campaign: 'Valentine\'s Day Dinner',
    status: 'active',
    variantA: 'Red CTA Button',
    variantB: 'Purple CTA Button',
    variantARate: '18.5%',
    variantBRate: '22.1%',
    winner: '-',
    startDate: '2026-02-08',
    endDate: '2026-02-14',
  },
  {
    id: '3',
    name: 'Send Time Optimization',
    campaign: 'Loyalty Points Reminder',
    status: 'completed',
    variantA: 'Morning (9 AM)',
    variantB: 'Evening (6 PM)',
    variantARate: '38.2%',
    variantBRate: '44.6%',
    winner: 'B',
    startDate: '2026-01-15',
    endDate: '2026-01-22',
  },
  {
    id: '4',
    name: 'Personalization Test',
    campaign: 'New Menu Launch',
    status: 'draft',
    variantA: 'Generic greeting',
    variantB: 'First name personalization',
    variantARate: '-',
    variantBRate: '-',
    winner: '-',
    startDate: '',
    endDate: '',
  },
];

export const ABTestingPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const activeTests = mockTests.filter((t) => t.status === 'active').length;
  const completedTests = mockTests.filter((t) => t.status === 'completed').length;

  const columns = [
    {
      key: 'name' as const,
      header: 'Test Name',
      render: (value: unknown) => (
        <strong style={{ color: '#2d3748' }}>{String(value)}</strong>
      ),
    },
    { key: 'campaign' as const, header: 'Campaign' },
    {
      key: 'status' as const,
      header: 'Status',
      render: (value: unknown) => (
        <StatusBadge status={value as ABTest['status']} />
      ),
    },
    { key: 'variantARate' as const, header: 'Variant A' },
    { key: 'variantBRate' as const, header: 'Variant B' },
    {
      key: 'winner' as const,
      header: 'Winner',
      render: (value: unknown) => (
        <span
          style={{
            fontWeight: 600,
            color: String(value) === '-' ? '#a0aec0' : '#38a169',
          }}
        >
          {String(value) === '-' ? 'Pending' : `Variant ${String(value)}`}
        </span>
      ),
    },
  ];

  return (
    <PageContainer
      title="A/B Testing"
      subtitle="Create and manage split tests for campaigns"
    >
      {/* Stats */}
      <div style={styles.statsGrid}>
        <StatsCard
          title="Active Tests"
          value={activeTests}
          icon="🔬"
        />
        <StatsCard
          title="Completed Tests"
          value={completedTests}
          icon="✅"
        />
        <StatsCard
          title="Avg Lift"
          value="+14.2%"
          change="From winning variants"
          changeType="positive"
          icon="📈"
        />
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <h2 style={styles.sectionTitle}>All A/B Tests</h2>
        <button
          style={styles.createButton}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          + New A/B Test
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div style={styles.createForm}>
          <h3 style={styles.formTitle}>Create New A/B Test</h3>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Test Name</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Subject Line Test"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Campaign</label>
              <select style={styles.input}>
                <option>Select a campaign...</option>
                <option>Weekend Brunch Special</option>
                <option>Valentine's Day Dinner</option>
                <option>New Menu Launch</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Test Variable</label>
              <select style={styles.input}>
                <option>Subject Line</option>
                <option>CTA Button</option>
                <option>Send Time</option>
                <option>Content Layout</option>
                <option>Personalization</option>
                <option>Image</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Traffic Split</label>
              <select style={styles.input}>
                <option>50/50</option>
                <option>70/30</option>
                <option>80/20</option>
              </select>
            </div>
          </div>
          <div style={styles.variantsSection}>
            <h4 style={styles.variantsTitle}>Variants</h4>
            <div style={styles.variantRow}>
              <div style={styles.variantBox}>
                <span style={styles.variantLabel}>Variant A (Control)</span>
                <textarea
                  style={styles.variantInput}
                  placeholder="Describe or paste variant A content..."
                  rows={3}
                />
              </div>
              <div style={styles.variantBox}>
                <span style={styles.variantLabel}>Variant B (Challenger)</span>
                <textarea
                  style={styles.variantInput}
                  placeholder="Describe or paste variant B content..."
                  rows={3}
                />
              </div>
            </div>
          </div>
          <div style={styles.formActions}>
            <button
              style={styles.cancelButton}
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
            <button style={styles.saveButton}>Create Test</button>
          </div>
        </div>
      )}

      {/* Tests Table */}
      <DataTable
        columns={columns}
        data={mockTests}
        emptyMessage="No A/B tests created yet."
      />

      {/* Active Test Performance */}
      <div style={styles.section}>
        <MetricsChart
          title="Active Test Performance: CTA Button Color"
          description="Variant A (Red) vs Variant B (Purple) - Click-through rate over time"
          height={280}
        />
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
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: '#2d3748',
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
  createForm: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    padding: 24,
    marginBottom: 20,
  },
  formTitle: {
    margin: '0 0 16px',
    fontSize: 16,
    fontWeight: 600,
    color: '#2d3748',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    marginBottom: 20,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: '#4a5568',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
  },
  variantsSection: {
    marginBottom: 20,
  },
  variantsTitle: {
    margin: '0 0 12px',
    fontSize: 14,
    fontWeight: 600,
    color: '#4a5568',
  },
  variantRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  variantBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  variantLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: '#718096',
  },
  variantInput: {
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'inherit',
    resize: 'vertical' as const,
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    color: '#4a5568',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#6c63ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
  },
  section: {
    marginTop: 24,
  },
};

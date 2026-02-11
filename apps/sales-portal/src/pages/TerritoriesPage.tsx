import type { CSSProperties } from 'react';
import { Header } from '../components/layout/Header';
import { StatsCard } from '../components/shared/StatsCard';

interface Territory {
  id: string;
  name: string;
  region: string;
  assignedRep: string;
  totalLeads: number;
  activeDeals: number;
  convertedDeals: number;
  revenue: number;
  targetRevenue: number;
}

const mockTerritories: Territory[] = [
  {
    id: '1',
    name: 'Northeast',
    region: 'NY, NJ, CT, MA, PA',
    assignedRep: 'Sarah Johnson',
    totalLeads: 45,
    activeDeals: 12,
    convertedDeals: 8,
    revenue: 892,
    targetRevenue: 1500,
  },
  {
    id: '2',
    name: 'Southeast',
    region: 'FL, GA, NC, SC, VA',
    assignedRep: 'Mike Chen',
    totalLeads: 38,
    activeDeals: 9,
    convertedDeals: 6,
    revenue: 594,
    targetRevenue: 1200,
  },
  {
    id: '3',
    name: 'Midwest',
    region: 'IL, OH, MI, WI, IN',
    assignedRep: 'Emily Davis',
    totalLeads: 32,
    activeDeals: 7,
    convertedDeals: 5,
    revenue: 445,
    targetRevenue: 1000,
  },
  {
    id: '4',
    name: 'West Coast',
    region: 'CA, WA, OR, NV, AZ',
    assignedRep: 'James Wilson',
    totalLeads: 52,
    activeDeals: 15,
    convertedDeals: 10,
    revenue: 1190,
    targetRevenue: 2000,
  },
  {
    id: '5',
    name: 'Central',
    region: 'TX, CO, MO, KS, OK',
    assignedRep: 'Lisa Martinez',
    totalLeads: 28,
    activeDeals: 6,
    convertedDeals: 4,
    revenue: 346,
    targetRevenue: 800,
  },
];

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
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  addButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  territoryName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  region: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  repName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    padding: '4px 12px',
    borderRadius: '9999px',
  },
  metricsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  },
  metric: {
    flex: 1,
    textAlign: 'center' as const,
  },
  metricValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 2px 0',
  },
  metricLabel: {
    fontSize: '11px',
    fontWeight: 500,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: 0,
  },
  revenueBar: {
    marginTop: '4px',
  },
  revenueHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  revenueLabel: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  revenueValue: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  progressBarBg: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
};

export const TerritoriesPage = () => {
  const totalTerritories = mockTerritories.length;
  const totalLeads = mockTerritories.reduce((sum, t) => sum + t.totalLeads, 0);
  const totalRevenue = mockTerritories.reduce((sum, t) => sum + t.revenue, 0);
  const totalTarget = mockTerritories.reduce((sum, t) => sum + t.targetRevenue, 0);

  return (
    <>
      <Header title="Territories" />
      <div style={styles.container}>
        <div style={styles.statsRow}>
          <StatsCard
            title="Total Territories"
            value={totalTerritories}
            color="#3b82f6"
          />
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            color="#8b5cf6"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}/mo`}
            color="#10b981"
          />
          <StatsCard
            title="Target Achievement"
            value={`${Math.round((totalRevenue / totalTarget) * 100)}%`}
            color="#f59e0b"
          />
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Territory Management</h3>
            <button style={styles.addButton}>+ Add Territory</button>
          </div>
          <div style={styles.grid}>
            {mockTerritories.map((territory) => {
              const achievementPercent = Math.round(
                (territory.revenue / territory.targetRevenue) * 100
              );
              const barColor = achievementPercent >= 75
                ? '#10b981'
                : achievementPercent >= 50
                ? '#f59e0b'
                : '#ef4444';

              return (
                <div key={territory.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div>
                      <h4 style={styles.territoryName}>{territory.name}</h4>
                      <p style={styles.region}>{territory.region}</p>
                    </div>
                    <span style={styles.repName}>{territory.assignedRep}</span>
                  </div>
                  <div style={styles.metricsRow}>
                    <div style={styles.metric}>
                      <p style={styles.metricValue}>{territory.totalLeads}</p>
                      <p style={styles.metricLabel}>Leads</p>
                    </div>
                    <div style={styles.metric}>
                      <p style={styles.metricValue}>{territory.activeDeals}</p>
                      <p style={styles.metricLabel}>Active</p>
                    </div>
                    <div style={styles.metric}>
                      <p style={styles.metricValue}>{territory.convertedDeals}</p>
                      <p style={styles.metricLabel}>Converted</p>
                    </div>
                  </div>
                  <div style={styles.revenueBar}>
                    <div style={styles.revenueHeader}>
                      <p style={styles.revenueLabel}>Revenue Target</p>
                      <p style={styles.revenueValue}>
                        ${territory.revenue} / ${territory.targetRevenue}
                      </p>
                    </div>
                    <div style={styles.progressBarBg}>
                      <div
                        style={{
                          ...styles.progressBarFill,
                          width: `${Math.min(achievementPercent, 100)}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

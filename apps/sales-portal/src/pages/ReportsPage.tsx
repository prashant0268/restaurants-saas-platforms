import type { CSSProperties } from 'react';
import { Header } from '../components/layout/Header';
import { StatsCard } from '../components/shared/StatsCard';

interface TeamMember {
  id: string;
  name: string;
  territory: string;
  leadsAssigned: number;
  dealsClosed: number;
  revenue: number;
  conversionRate: number;
  target: number;
}

interface MonthlyForecast {
  month: string;
  projected: number;
  actual?: number;
  target: number;
}

const teamPerformance: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    territory: 'Northeast',
    leadsAssigned: 28,
    dealsClosed: 8,
    revenue: 892,
    conversionRate: 29,
    target: 1500,
  },
  {
    id: '2',
    name: 'Mike Chen',
    territory: 'Southeast',
    leadsAssigned: 22,
    dealsClosed: 6,
    revenue: 594,
    conversionRate: 27,
    target: 1200,
  },
  {
    id: '3',
    name: 'Emily Davis',
    territory: 'Midwest',
    leadsAssigned: 18,
    dealsClosed: 5,
    revenue: 445,
    conversionRate: 28,
    target: 1000,
  },
  {
    id: '4',
    name: 'James Wilson',
    territory: 'West Coast',
    leadsAssigned: 35,
    dealsClosed: 10,
    revenue: 1190,
    conversionRate: 29,
    target: 2000,
  },
  {
    id: '5',
    name: 'Lisa Martinez',
    territory: 'Central',
    leadsAssigned: 15,
    dealsClosed: 4,
    revenue: 346,
    conversionRate: 27,
    target: 800,
  },
];

const monthlyForecasts: MonthlyForecast[] = [
  { month: 'Sep 2025', projected: 2800, actual: 2650, target: 3000 },
  { month: 'Oct 2025', projected: 3100, actual: 3250, target: 3000 },
  { month: 'Nov 2025', projected: 3400, actual: 3100, target: 3500 },
  { month: 'Dec 2025', projected: 2900, actual: 2750, target: 3500 },
  { month: 'Jan 2026', projected: 3600, actual: 3467, target: 4000 },
  { month: 'Feb 2026', projected: 4200, target: 4500 },
  { month: 'Mar 2026', projected: 4800, target: 5000 },
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
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
  cardFullWidth: {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 20px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '14px 16px',
    borderBottom: '2px solid #e5e7eb',
    color: '#6b7280',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    backgroundColor: '#f9fafb',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
  },
  barChart: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  barRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  barLabel: {
    width: '80px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    flexShrink: 0,
  },
  barContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  barBg: {
    width: '100%',
    height: '12px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative' as const,
  },
  barValues: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#6b7280',
  },
  performanceBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  perfName: {
    width: '140px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    flexShrink: 0,
  },
  perfBarBg: {
    flex: 1,
    height: '24px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative' as const,
  },
  perfBarFill: {
    height: '100%',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '8px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ffffff',
    transition: 'width 0.3s ease',
  },
  perfValue: {
    width: '80px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    textAlign: 'right' as const,
    flexShrink: 0,
  },
};

export const ReportsPage = () => {
  const totalRevenue = teamPerformance.reduce((sum, m) => sum + m.revenue, 0);
  const totalDeals = teamPerformance.reduce((sum, m) => sum + m.dealsClosed, 0);
  const totalLeads = teamPerformance.reduce((sum, m) => sum + m.leadsAssigned, 0);
  const avgConversion = Math.round(
    teamPerformance.reduce((sum, m) => sum + m.conversionRate, 0) /
    teamPerformance.length
  );

  return (
    <>
      <Header title="Reports" />
      <div style={styles.container}>
        <div style={styles.statsRow}>
          <StatsCard
            title="Total Team Revenue"
            value={`$${totalRevenue.toLocaleString()}/mo`}
            color="#3b82f6"
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Deals Closed"
            value={totalDeals}
            color="#10b981"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Active Leads"
            value={totalLeads}
            color="#8b5cf6"
          />
          <StatsCard
            title="Avg Conversion Rate"
            value={`${avgConversion}%`}
            color="#f59e0b"
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Team Performance</h3>
            <div>
              {teamPerformance.map((member) => {
                const percent = Math.round(
                  (member.revenue / member.target) * 100
                );
                const barColor = percent >= 75
                  ? '#10b981'
                  : percent >= 50
                  ? '#f59e0b'
                  : '#ef4444';

                return (
                  <div key={member.id} style={styles.performanceBar}>
                    <span style={styles.perfName}>{member.name}</span>
                    <div style={styles.perfBarBg}>
                      <div
                        style={{
                          ...styles.perfBarFill,
                          width: `${Math.min(percent, 100)}%`,
                          backgroundColor: barColor,
                        }}
                      >
                        {percent}%
                      </div>
                    </div>
                    <span style={styles.perfValue}>
                      ${member.revenue}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Monthly Forecast</h3>
            <div style={styles.barChart}>
              {monthlyForecasts.map((forecast) => {
                const maxValue = Math.max(
                  ...monthlyForecasts.map((f) =>
                    Math.max(f.projected, f.actual ?? 0, f.target)
                  )
                );

                return (
                  <div key={forecast.month} style={styles.barRow}>
                    <span style={styles.barLabel}>{forecast.month}</span>
                    <div style={styles.barContainer}>
                      <div style={styles.barBg}>
                        {forecast.actual !== undefined && (
                          <div
                            style={{
                              position: 'absolute',
                              height: '100%',
                              width: `${(forecast.actual / maxValue) * 100}%`,
                              backgroundColor: '#3b82f6',
                              borderRadius: '6px',
                              opacity: 0.8,
                            }}
                          />
                        )}
                        <div
                          style={{
                            position: 'absolute',
                            height: '100%',
                            width: `${(forecast.projected / maxValue) * 100}%`,
                            backgroundColor:
                              forecast.actual !== undefined
                                ? 'transparent'
                                : '#93c5fd',
                            borderRadius: '6px',
                            border:
                              forecast.actual !== undefined
                                ? '2px dashed #93c5fd'
                                : 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div style={styles.barValues}>
                        <span>
                          {forecast.actual !== undefined
                            ? `Actual: $${forecast.actual}`
                            : `Projected: $${forecast.projected}`}
                        </span>
                        <span>Target: ${forecast.target}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ ...styles.section, marginTop: '24px' }}>
          <h3 style={styles.sectionTitle}>Detailed Team Metrics</h3>
          <div style={styles.cardFullWidth}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Sales Rep</th>
                  <th style={styles.th}>Territory</th>
                  <th style={styles.th}>Leads</th>
                  <th style={styles.th}>Deals Closed</th>
                  <th style={styles.th}>Revenue</th>
                  <th style={styles.th}>Conversion</th>
                  <th style={styles.th}>Target</th>
                  <th style={styles.th}>Achievement</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((member) => {
                  const achievement = Math.round(
                    (member.revenue / member.target) * 100
                  );
                  return (
                    <tr key={member.id}>
                      <td style={{ ...styles.td, fontWeight: 600 }}>
                        {member.name}
                      </td>
                      <td style={styles.td}>{member.territory}</td>
                      <td style={styles.td}>{member.leadsAssigned}</td>
                      <td style={styles.td}>{member.dealsClosed}</td>
                      <td style={{ ...styles.td, fontWeight: 600, color: '#059669' }}>
                        ${member.revenue}/mo
                      </td>
                      <td style={styles.td}>{member.conversionRate}%</td>
                      <td style={styles.td}>${member.target}/mo</td>
                      <td
                        style={{
                          ...styles.td,
                          fontWeight: 600,
                          color: achievement >= 75 ? '#059669' : achievement >= 50 ? '#d97706' : '#dc2626',
                        }}
                      >
                        {achievement}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
